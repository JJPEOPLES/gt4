import { supabase } from '../supabase';

/**
 * Fix creator status for a user
 * @param userId - The user ID to set as creator
 * @returns Promise<boolean> - Whether the operation was successful
 */
export const fixCreatorStatus = async (userId: string): Promise<boolean> => {
  try {
    // Update the user's profile to set is_creator to true
    const { data, error } = await supabase
      .from('profiles')
      .update({ is_creator: true })
      .eq('id', userId);
    
    if (error) {
      console.error('Error fixing creator status:', error);
      return false;
    }
    
    console.log('Creator status fixed for user:', userId);
    return true;
  } catch (err) {
    console.error('Error fixing creator status:', err);
    return false;
  }
};

/**
 * Get all users from the database
 * @returns Promise<any[]> - Array of user profiles
 */
export const getAllUsers = async (): Promise<any[]> => {
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*');
    
    if (error) {
      console.error('Error getting users:', error);
      return [];
    }
    
    return data || [];
  } catch (err) {
    console.error('Error getting users:', err);
    return [];
  }
};