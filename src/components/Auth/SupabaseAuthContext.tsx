import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../../supabase';
import { User, Session } from '@supabase/supabase-js';

interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  isCreator: boolean;
  joinedAt: Date;
  artworksCount: number;
  collaborationsCount: number;
}

interface AuthContextType {
  currentUser: User | null;
  userProfile: UserProfile | null;
  isLoading: boolean;
  error: string | null;
  signUp: (email: string, password: string, displayName: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  logOut: () => Promise<void>;
  isCreator: boolean;
}

const SupabaseAuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(SupabaseAuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const SupabaseAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  const [session, setSession] = useState<Session | null>(null);

  // Check if username is valid and available
  const checkUsernameAvailability = async (username: string): Promise<boolean> => {
    // Check for reserved username "Prime" (case insensitive)
    if (username.toLowerCase() === 'prime') {
      throw new Error('The username "Prime" is reserved for the creator of GT4.');
    }
    
    // Check minimum length
    if (username.length < 3) {
      throw new Error('Username must be at least 3 characters long.');
    }
    
    // Check for valid characters (letters, numbers, underscores)
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      throw new Error('Username can only contain letters, numbers, and underscores.');
    }
    
    // Check if username is already taken by another user
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('display_name', username)
      .limit(1);
    
    if (error) {
      throw new Error(`Error checking username: ${error.message}`);
    }
    
    if (data && data.length > 0) {
      throw new Error('This username is already taken. Please choose another one.');
    }
    
    return true;
  };

  const signUp = async (email: string, password: string, displayName: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      // Validate username
      await checkUsernameAvailability(displayName);
      
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
          }
        }
      });
      
      if (authError) throw authError;
      
      if (authData.user) {
        // Create user profile in the profiles table
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              display_name: displayName,
              email,
              is_creator: false,
              joined_at: new Date().toISOString(),
              artworks_count: 0,
              collaborations_count: 0
            }
          ]);
        
        if (profileError) throw profileError;
        
        setUserProfile({
          uid: authData.user.id,
          displayName,
          email,
          isCreator: false,
          joinedAt: new Date(),
          artworksCount: 0,
          collaborationsCount: 0
        });
      }
    } catch (err: any) {
      setError(err.message);
      console.error('Sign up error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setError(null);
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      console.error('Sign in error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const logOut = async () => {
    setError(null);
    
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err: any) {
      setError(err.message);
      console.error('Sign out error:', err);
    }
  };

  // Initialize creator account
  const initCreatorAccount = async (email: string, password: string): Promise<boolean> => {
    try {
      // Check if a creator account already exists
      const { data: creatorData, error: creatorError } = await supabase
        .from('profiles')
        .select('id')
        .eq('is_creator', true)
        .limit(1);
      
      if (creatorError) throw creatorError;
      
      if (creatorData && creatorData.length > 0) {
        console.error('A creator account already exists');
        return false;
      }
      
      // Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: "Prime",
          }
        }
      });
      
      if (authError) throw authError;
      
      if (!authData.user) {
        throw new Error('Failed to create user');
      }
      
      // Create user profile in the profiles table
      const { error: profileError } = await supabase
        .from('profiles')
        .insert([
          {
            id: authData.user.id,
            display_name: "Prime",
            email,
            is_creator: true,
            joined_at: new Date().toISOString(),
            artworks_count: 0,
            collaborations_count: 0
          }
        ]);
      
      if (profileError) throw profileError;
      
      // Create a record in the system_settings table to mark that creator has been initialized
      const { error: settingsError } = await supabase
        .from('system_settings')
        .insert([
          {
            key: 'creator_account',
            value: {
              initialized: true,
              creator_id: authData.user.id,
              initialized_at: new Date().toISOString()
            }
          }
        ]);
      
      if (settingsError) throw settingsError;
      
      console.log("Creator account created successfully");
      return true;
    } catch (err) {
      console.error("Error creating creator account:", err);
      return false;
    }
  };

  // Check if creator account has been initialized
  const isCreatorAccountInitialized = async (): Promise<boolean> => {
    try {
      // Check the system_settings table
      const { data, error } = await supabase
        .from('system_settings')
        .select('value')
        .eq('key', 'creator_account')
        .limit(1);
      
      if (error) throw error;
      
      if (data && data.length > 0 && data[0].value.initialized) {
        return true;
      }
      
      // If no setting found, check if any user has is_creator = true
      const { data: creatorData, error: creatorError } = await supabase
        .from('profiles')
        .select('id')
        .eq('is_creator', true)
        .limit(1);
      
      if (creatorError) throw creatorError;
      
      return creatorData && creatorData.length > 0;
    } catch (err) {
      console.error("Error checking creator account:", err);
      return false;
    }
  };

  // Listen for auth state changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setCurrentUser(session?.user || null);
        
        if (session?.user) {
          try {
            // Get user profile from the profiles table
            const { data, error } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single();
            
            if (error) throw error;
            
            if (data) {
              setUserProfile({
                uid: data.id,
                displayName: data.display_name,
                email: data.email,
                isCreator: data.is_creator,
                joinedAt: new Date(data.joined_at),
                artworksCount: data.artworks_count,
                collaborationsCount: data.collaborations_count
              });
              setIsCreator(data.is_creator);
            } else {
              // If profile doesn't exist, create one
              const { error: insertError } = await supabase
                .from('profiles')
                .insert([
                  {
                    id: session.user.id,
                    display_name: session.user.user_metadata.display_name || 'User',
                    email: session.user.email,
                    is_creator: false,
                    joined_at: new Date().toISOString(),
                    artworks_count: 0,
                    collaborations_count: 0
                  }
                ]);
              
              if (insertError) throw insertError;
              
              setUserProfile({
                uid: session.user.id,
                displayName: session.user.user_metadata.display_name || 'User',
                email: session.user.email || '',
                isCreator: false,
                joinedAt: new Date(),
                artworksCount: 0,
                collaborationsCount: 0
              });
              setIsCreator(false);
            }
          } catch (err) {
            console.error('Error fetching user profile:', err);
          }
        } else {
          setUserProfile(null);
          setIsCreator(false);
        }
        
        setIsLoading(false);
      }
    );

    // Initial session check
    const getInitialSession = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      setSession(session);
      setCurrentUser(session?.user || null);
      setIsLoading(false);
    };

    getInitialSession();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const value = {
    currentUser,
    userProfile,
    isLoading,
    error,
    signUp,
    signIn,
    logOut,
    isCreator
  };

  return (
    <SupabaseAuthContext.Provider value={value}>
      {children}
    </SupabaseAuthContext.Provider>
  );
};

export default SupabaseAuthContext;