import { supabase } from '../supabase';

/**
 * Check if the current user is a creator
 * @returns Promise<boolean> - Whether the current user is a creator
 */
export const checkIfCreator = async (): Promise<boolean> => {
  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      console.log("checkIfCreator: No session found");
      return false;
    }
    
    console.log("checkIfCreator: User ID:", session.user.id);
    
    // Check if user is creator - use RPC for direct database access
    const { data, error } = await supabase
      .from('profiles')
      .select('is_creator')
      .eq('id', session.user.id)
      .single();
    
    console.log("checkIfCreator: Data:", data);
    console.log("checkIfCreator: Error:", error);
    
    if (error) {
      console.error('Error checking creator status:', error);
      return false;
    }
    
    // Check if the is_creator field is true
    return data?.is_creator === true;
  } catch (err) {
    console.error('Error checking creator status:', err);
    return false;
  }
};

/**
 * Get the current user's profile
 * @returns Promise<UserProfile | null> - The user's profile or null if not logged in
 */
export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  isCreator: boolean;
  joinedAt: Date;
  artworksCount: number;
  collaborationsCount: number;
}

export const getCurrentUserProfile = async (): Promise<UserProfile | null> => {
  try {
    // Get the current session
    const { data: { session } } = await supabase.auth.getSession();
    
    if (!session?.user) {
      return null;
    }
    
    // Get user profile
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', session.user.id)
      .single();
    
    if (error) {
      console.error('Error getting user profile:', error);
      return null;
    }
    
    if (!data) {
      return null;
    }
    
    return {
      uid: data.id,
      displayName: data.display_name,
      email: data.email,
      isCreator: data.is_creator,
      joinedAt: new Date(data.joined_at),
      artworksCount: data.artworks_count,
      collaborationsCount: data.collaborations_count
    };
  } catch (err) {
    console.error('Error getting user profile:', err);
    return null;
  }
};