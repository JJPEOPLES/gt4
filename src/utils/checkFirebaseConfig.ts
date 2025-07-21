import { getAuth } from 'firebase/auth';
import { getFirestore, collection, getDocs, limit, query } from 'firebase/firestore';

/**
 * Check if the Firebase configuration is valid
 * This function will attempt to make a simple Firebase request to verify the configuration
 * 
 * @returns Promise<{valid: boolean, message: string}> - Result of the configuration check
 */
export const checkFirebaseConfig = async (): Promise<{valid: boolean, message: string}> => {
  try {
    // Check Firebase Auth
    const auth = getAuth();
    if (!auth) {
      return {
        valid: false,
        message: "Firebase Auth is not initialized properly."
      };
    }
    
    // Check Firestore
    const db = getFirestore();
    if (!db) {
      return {
        valid: false,
        message: "Firebase Firestore is not initialized properly."
      };
    }
    
    // Try to make a simple Firestore query
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, limit(1));
      await getDocs(q);
    } catch (err: any) {
      console.error("Firestore query error:", err);
      
      if (err.code === 'permission-denied') {
        return {
          valid: false,
          message: "Firebase security rules are preventing access. Check your Firestore rules."
        };
      }
      
      if (err.code === 'invalid-argument' || err.message?.includes('api-key-not-valid')) {
        return {
          valid: false,
          message: "Firebase API key is not valid. Check your Firebase configuration."
        };
      }
      
      return {
        valid: false,
        message: `Firestore error: ${err.message || 'Unknown error'}`
      };
    }
    
    return {
      valid: true,
      message: "Firebase configuration is valid."
    };
  } catch (err: any) {
    console.error("Firebase configuration check error:", err);
    
    return {
      valid: false,
      message: `Firebase configuration error: ${err.message || 'Unknown error'}`
    };
  }
};