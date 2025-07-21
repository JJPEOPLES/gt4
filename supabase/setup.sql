-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  email TEXT NOT NULL,
  is_creator BOOLEAN DEFAULT FALSE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  artworks_count INTEGER DEFAULT 0,
  collaborations_count INTEGER DEFAULT 0,
  CONSTRAINT display_name_unique UNIQUE (display_name)
);

-- Create system_settings table
CREATE TABLE IF NOT EXISTS system_settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create artworks table
CREATE TABLE IF NOT EXISTS artworks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  creator_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  image_url TEXT,
  is_collaborative BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create collaborators table
CREATE TABLE IF NOT EXISTS collaborators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  artwork_id UUID REFERENCES artworks(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  joined_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT unique_collaboration UNIQUE (artwork_id, user_id)
);

-- Create RLS policies

-- Profiles table policies
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Anyone can read profiles
CREATE POLICY "Profiles are viewable by everyone" 
  ON profiles FOR SELECT 
  USING (true);

-- Users can update their own profiles
CREATE POLICY "Users can update their own profiles" 
  ON profiles FOR UPDATE 
  USING (auth.uid() = id);

-- Only service role can insert profiles (handled by triggers)
CREATE POLICY "Only service role can insert profiles" 
  ON profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- System settings table policies
ALTER TABLE system_settings ENABLE ROW LEVEL SECURITY;

-- Anyone can read system settings
CREATE POLICY "System settings are viewable by everyone" 
  ON system_settings FOR SELECT 
  USING (true);

-- Only creators can update system settings
CREATE POLICY "Only creators can update system settings" 
  ON system_settings FOR UPDATE 
  USING (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_creator = true
  ));

-- Only creators can insert system settings
CREATE POLICY "Only creators can insert system settings" 
  ON system_settings FOR INSERT 
  WITH CHECK (EXISTS (
    SELECT 1 FROM profiles 
    WHERE profiles.id = auth.uid() 
    AND profiles.is_creator = true
  ));

-- Artworks table policies
ALTER TABLE artworks ENABLE ROW LEVEL SECURITY;

-- Anyone can read artworks
CREATE POLICY "Artworks are viewable by everyone" 
  ON artworks FOR SELECT 
  USING (true);

-- Creators and artwork owners can update artworks
CREATE POLICY "Creators and owners can update artworks" 
  ON artworks FOR UPDATE 
  USING (
    auth.uid() = creator_id 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_creator = true
    )
  );

-- Authenticated users can insert artworks
CREATE POLICY "Authenticated users can insert artworks" 
  ON artworks FOR INSERT 
  WITH CHECK (auth.uid() = creator_id);

-- Creators and artwork owners can delete artworks
CREATE POLICY "Creators and owners can delete artworks" 
  ON artworks FOR DELETE 
  USING (
    auth.uid() = creator_id 
    OR EXISTS (
      SELECT 1 FROM profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.is_creator = true
    )
  );

-- Collaborators table policies
ALTER TABLE collaborators ENABLE ROW LEVEL SECURITY;

-- Anyone can read collaborators
CREATE POLICY "Collaborators are viewable by everyone" 
  ON collaborators FOR SELECT 
  USING (true);

-- Artwork owners and creators can manage collaborators
CREATE POLICY "Artwork owners and creators can manage collaborators" 
  ON collaborators FOR ALL 
  USING (
    EXISTS (
      SELECT 1 FROM artworks 
      WHERE artworks.id = collaborators.artwork_id 
      AND (
        artworks.creator_id = auth.uid() 
        OR EXISTS (
          SELECT 1 FROM profiles 
          WHERE profiles.id = auth.uid() 
          AND profiles.is_creator = true
        )
      )
    )
  );

-- Create functions and triggers

-- Function to update artworks count for a user
CREATE OR REPLACE FUNCTION update_artworks_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles
    SET artworks_count = artworks_count + 1
    WHERE id = NEW.creator_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles
    SET artworks_count = artworks_count - 1
    WHERE id = OLD.creator_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update artworks count
CREATE TRIGGER update_artworks_count_trigger
AFTER INSERT OR DELETE ON artworks
FOR EACH ROW
EXECUTE FUNCTION update_artworks_count();

-- Function to update collaborations count for a user
CREATE OR REPLACE FUNCTION update_collaborations_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE profiles
    SET collaborations_count = collaborations_count + 1
    WHERE id = NEW.user_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE profiles
    SET collaborations_count = collaborations_count - 1
    WHERE id = OLD.user_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update collaborations count
CREATE TRIGGER update_collaborations_count_trigger
AFTER INSERT OR DELETE ON collaborators
FOR EACH ROW
EXECUTE FUNCTION update_collaborations_count();

-- Function to handle user creation
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, display_name, email, is_creator, joined_at)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'display_name', 'User'),
    NEW.email,
    FALSE,
    NOW()
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger for new user creation
CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();