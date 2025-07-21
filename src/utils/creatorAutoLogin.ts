import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { initializeApp } from 'firebase/app';

// Default fallback credentials - these will be used if no creator account is found
// You should replace these with your actual credentials
const FALLBACK_EMAIL = 'prime@gt4.k2lang.org';
const FALLBACK_PASSWORD = 'GT4PrimeCreator!';

/**
 * Auto-login as the creator
 * This function will attempt to find the creator account and log in automatically
 * 
 * @returns Promise<{success: boolean, message: string}> - Result of the auto-login attempt
 */
export const creatorAutoLogin = async (): Promise<{success: boolean, message: string}> => {
  try {
    // Check if Firebase is properly configured
    try {
      const auth = getAuth();
      if (!auth) {
        throw new Error("Firebase Auth not initialized");
      }
    } catch (err) {
      console.error("Firebase Auth error:", err);
      return {
        success: false,
        message: "Firebase is not properly configured. Please check your Firebase settings."
      };
    }
    
    // Try to find the creator account
    const creatorInfo = await findCreatorAccount();
    
    if (!creatorInfo) {
      console.log("No creator account found, using fallback credentials");
      return loginWithCredentials(FALLBACK_EMAIL, FALLBACK_PASSWORD);
    }
    
    // Try to log in with the found email and the default password
    return loginWithCredentials(creatorInfo.email, FALLBACK_PASSWORD);
  } catch (err: any) {
    console.error("Error in auto-login:", err);
    
    // Check for specific Firebase errors
    if (err.code === 'auth/api-key-not-valid') {
      return {
        success: false,
        message: "Firebase API key is not valid. Please check your Firebase configuration."
      };
    }
    
    return { 
      success: false, 
      message: `Auto-login failed: ${err.message || 'Unknown error'}. Please try manual login.` 
    };
  }
};

/**
 * Attempt to log in with the given credentials
 */
const loginWithCredentials = async (email: string, password: string): Promise<{success: boolean, message: string}> => {
  try {
    const auth = getAuth();
    await signInWithEmailAndPassword(auth, email, password);
    
    return { 
      success: true, 
      message: "Successfully logged in as creator!" 
    };
  } catch (err: any) {
    console.error("Login error:", err);
    
    // If the error is about wrong password, we'll try the alternative password
    if (err.code === 'auth/wrong-password' && password !== 'password123') {
      console.log("Trying alternative password...");
      return loginWithCredentials(email, 'password123');
    }
    
    return { 
      success: false, 
      message: `Login failed: ${err.message || 'Unknown error'}` 
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