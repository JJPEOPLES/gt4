import { getAuth, updatePassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';

// Default fallback credentials
const FALLBACK_EMAIL = 'prime@gt4.k2lang.org';
const FALLBACK_PASSWORD = 'GT4PrimeCreator!';
const NEW_PASSWORD = 'password123'; // Simple password that's easy to remember

/**
 * Reset the creator account password to a known value
 * This function will attempt to find the creator account and reset its password
 * 
 * @returns Promise<{success: boolean, message: string}> - Result of the password reset attempt
 */
export const resetCreatorPassword = async (): Promise<{success: boolean, message: string}> => {
  try {
    // Try to find the creator account
    const creatorInfo = await findCreatorAccount();
    
    if (!creatorInfo) {
      return { 
        success: false, 
        message: "No creator account found. Please initialize one first." 
      };
    }
    
    // Try to log in with various possible passwords
    const auth = getAuth();
    let loggedIn = false;
    
    // Try the default password
    try {
      await signInWithEmailAndPassword(auth, creatorInfo.email, FALLBACK_PASSWORD);
      loggedIn = true;
    } catch (err) {
      console.log("Failed to log in with default password, trying alternatives...");
    }
    
    // Try 'password123'
    if (!loggedIn) {
      try {
        await signInWithEmailAndPassword(auth, creatorInfo.email, 'password123');
        loggedIn = true;
      } catch (err) {
        console.log("Failed to log in with 'password123'");
      }
    }
    
    // Try 'admin123'
    if (!loggedIn) {
      try {
        await signInWithEmailAndPassword(auth, creatorInfo.email, 'admin123');
        loggedIn = true;
      } catch (err) {
        console.log("Failed to log in with 'admin123'");
      }
    }
    
    if (!loggedIn) {
      return { 
        success: false, 
        message: "Could not log in with any known passwords. Try using password reset via email." 
      };
    }
    
    // Now that we're logged in, update the password
    if (auth.currentUser) {
      await updatePassword(auth.currentUser, NEW_PASSWORD);
      
      return { 
        success: true, 
        message: `Password reset to '${NEW_PASSWORD}'. You can now log in with this password.` 
      };
    } else {
      return { 
        success: false, 
        message: "Failed to get current user after login." 
      };
    }
  } catch (err: any) {
    console.error("Error in password reset:", err);
    return { 
      success: false, 
      message: `Password reset failed: ${err.message || 'Unknown error'}` 
    };
  }
};

/**
 * Find the creator account
 * This is a simplified version of the findCreatorAccount function
 */
const findCreatorAccount = async (): Promise<{email: string, uid: string} | null> => {
  try {
    // First check the creator-account-check document
    const creatorCheckRef = doc(db, 'users', 'creator-account-check');
    const creatorCheckSnap = await getDoc(creatorCheckRef);
    
    if (creatorCheckSnap.exists() && creatorCheckSnap.data().creatorInitialized) {
      const creatorUid = creatorCheckSnap.data().creatorUid;
      
      // Get the creator user document
      const creatorDocRef = doc(db, 'users', creatorUid);
      const creatorDocSnap = await getDoc(creatorDocRef);
      
      if (creatorDocSnap.exists()) {
        return {
          email: creatorDocSnap.data().email,
          uid: creatorUid
        };
      }
    }
    
    // Search for users with isCreator=true
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('isCreator', '==', true), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const creatorDoc = querySnapshot.docs[0];
      return {
        email: creatorDoc.data().email,
        uid: creatorDoc.id
      };
    }
    
    // Search for users with displayName="Prime"
    const primeQuery = query(usersRef, where('displayName', '==', 'Prime'), limit(1));
    const primeSnapshot = await getDocs(primeQuery);
    
    if (!primeSnapshot.empty) {
      const primeDoc = primeSnapshot.docs[0];
      return {
        email: primeDoc.data().email,
        uid: primeDoc.id
      };
    }
    
    return null;
  } catch (err) {
    console.error("Error finding creator account:", err);
    return null;
  }
};