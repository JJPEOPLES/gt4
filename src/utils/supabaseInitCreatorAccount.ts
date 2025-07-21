import { supabase } from '../supabase';

/**
 * Initialize the Prime creator account
 * This function should be run only once by the administrator
 * 
 * @param email - The email for the creator account
 * @param password - The password for the creator account
 * @returns Promise<boolean> - Whether the account was created successfully
 */
export const initCreatorAccount = async (email: string, password: string): Promise<boolean> => {
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
    
    // Check if the system_settings table has a creator_account entry
    const { data: settingsData, error: settingsError } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'creator_account')
      .limit(1);
    
    if (settingsError) throw settingsError;
    
    if (settingsData && settingsData.length > 0 && settingsData[0].value.initialized) {
      console.error('Creator account has already been initialized');
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
    const { error: insertSettingsError } = await supabase
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
    
    if (insertSettingsError) throw insertSettingsError;
    
    console.log("Creator account created successfully");
    return true;
  } catch (err: any) {
    console.error("Error creating creator account:", err);
    
    // Check for specific Supabase errors
    if (err.code === '23505') {
      console.error('Email already in use. Try a different email address.');
    } else if (err.code === 'auth/invalid-email') {
      console.error('Invalid email format.');
    } else if (err.code === 'auth/weak-password') {
      console.error('Password is too weak.');
    }
    
    throw err; // Re-throw the error so we can handle it in the UI
  }
};

/**
 * Check if the creator account has been initialized
 * 
 * @returns Promise<boolean> - Whether the creator account has been initialized
 */
export const isCreatorAccountInitialized = async (): Promise<boolean> => {
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
    
    if (creatorData && creatorData.length > 0) {
      // We found a creator, let's create the system setting
      const { error: insertError } = await supabase
        .from('system_settings')
        .insert([
          {
            key: 'creator_account',
            value: {
              initialized: true,
              creator_id: creatorData[0].id,
              initialized_at: new Date().toISOString(),
              note: 'Auto-created by isCreatorAccountInitialized'
            }
          }
        ]);
      
      if (insertError) console.error("Error creating system setting:", insertError);
      
      return true;
    }
    
    return false;
  } catch (err) {
    console.error("Error checking creator account:", err);
    return false;
  }
};

/**
 * Find and fix creator account issues
 * This utility will search for creator accounts and fix any inconsistencies
 * 
 * @returns Promise<{success: boolean, message: string, creatorInfo?: {email: string, uid: string}}> - Result of the fix operation
 */
export const findAndFixCreatorAccount = async (): Promise<{
  success: boolean, 
  message: string, 
  creatorInfo?: {email: string, uid: string, displayName: string}
}> => {
  try {
    // Check the system_settings table
    const { data: settingsData, error: settingsError } = await supabase
      .from('system_settings')
      .select('value')
      .eq('key', 'creator_account')
      .limit(1);
    
    if (settingsError) throw settingsError;
    
    if (settingsData && settingsData.length > 0 && settingsData[0].value.initialized) {
      const creatorId = settingsData[0].value.creator_id;
      
      // Get the creator profile
      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', creatorId)
        .single();
      
      if (profileError) {
        if (profileError.code === 'PGRST116') {
          // Profile not found, let's look for other potential creators
          return await findPotentialCreator();
        }
        throw profileError;
      }
      
      // Check if the creator has the is_creator flag
      if (!profileData.is_creator) {
        // Fix the profile
        const { error: updateError } = await supabase
          .from('profiles')
          .update({ is_creator: true })
          .eq('id', creatorId);
        
        if (updateError) throw updateError;
        
        return {
          success: true,
          message: "Fixed creator account: Added missing is_creator flag",
          creatorInfo: {
            email: profileData.email,
            uid: profileData.id,
            displayName: profileData.display_name
          }
        };
      }
      
      return {
        success: true,
        message: "Creator account is valid",
        creatorInfo: {
          email: profileData.email,
          uid: profileData.id,
          displayName: profileData.display_name
        }
      };
    } else {
      // No system setting found, let's look for potential creators
      return await findPotentialCreator();
    }
  } catch (err: any) {
    console.error("Error fixing creator account:", err);
    return {
      success: false,
      message: `Error fixing creator account: ${err.message || 'Unknown error'}`
    };
  }
};

/**
 * Find a potential creator account
 * 
 * @returns Promise<{success: boolean, message: string, creatorInfo?: {email: string, uid: string, displayName: string}}> - Result of the search
 */
const findPotentialCreator = async (): Promise<{
  success: boolean, 
  message: string, 
  creatorInfo?: {email: string, uid: string, displayName: string}
}> => {
  try {
    // Look for users with is_creator = true
    const { data: creatorData, error: creatorError } = await supabase
      .from('profiles')
      .select('*')
      .eq('is_creator', true)
      .limit(1);
    
    if (creatorError) throw creatorError;
    
    if (creatorData && creatorData.length > 0) {
      // Create the system setting
      const { error: insertError } = await supabase
        .from('system_settings')
        .insert([
          {
            key: 'creator_account',
            value: {
              initialized: true,
              creator_id: creatorData[0].id,
              initialized_at: new Date().toISOString(),
              note: 'Auto-created by findPotentialCreator'
            }
          }
        ]);
      
      if (insertError) console.error("Error creating system setting:", insertError);
      
      return {
        success: true,
        message: "Fixed creator account: Created creator reference",
        creatorInfo: {
          email: creatorData[0].email,
          uid: creatorData[0].id,
          displayName: creatorData[0].display_name
        }
      };
    }
    
    // Look for users with display_name = "Prime"
    const { data: primeData, error: primeError } = await supabase
      .from('profiles')
      .select('*')
      .eq('display_name', 'Prime')
      .limit(1);
    
    if (primeError) throw primeError;
    
    if (primeData && primeData.length > 0) {
      // Update the user to be a creator
      const { error: updateError } = await supabase
        .from('profiles')
        .update({ is_creator: true })
        .eq('id', primeData[0].id);
      
      if (updateError) throw updateError;
      
      // Create the system setting
      const { error: insertError } = await supabase
        .from('system_settings')
        .insert([
          {
            key: 'creator_account',
            value: {
              initialized: true,
              creator_id: primeData[0].id,
              initialized_at: new Date().toISOString(),
              note: 'Auto-created by findPotentialCreator for Prime user'
            }
          }
        ]);
      
      if (insertError) console.error("Error creating system setting:", insertError);
      
      return {
        success: true,
        message: "Fixed creator account: Updated Prime user to creator",
        creatorInfo: {
          email: primeData[0].email,
          uid: primeData[0].id,
          displayName: primeData[0].display_name
        }
      };
    }
    
    return {
      success: false,
      message: "No creator account found"
    };
  } catch (err: any) {
    console.error("Error finding potential creator:", err);
    return {
      success: false,
      message: `Error finding potential creator: ${err.message || 'Unknown error'}`
    };
  }
};