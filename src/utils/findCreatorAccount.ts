import { collection, query, where, getDocs, doc, getDoc, limit } from 'firebase/firestore';
import { db } from '../firebase';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';

/**
 * Find the creator account information
 * This function will search for the account with isCreator=true
 * 
 * @returns Promise<{email: string, uid: string} | null> - Creator account info or null if not found
 */
export const findCreatorAccount = async (): Promise<{email: string, uid: string} | null> => {
  try {
    // First, check if we have a record of the creator account
    const creatorCheckRef = doc(db, 'users', 'creator-account-check');
    const creatorCheckSnap = await getDoc(creatorCheckRef);
    
    if (creatorCheckSnap.exists() && creatorCheckSnap.data().creatorInitialized) {
      const creatorUid = creatorCheckSnap.data().creatorUid;
      
      // Get the creator user document
      const creatorDocRef = doc(db, 'users', creatorUid);
      const creatorDocSnap = await getDoc(creatorDocRef);
      
      if (creatorDocSnap.exists()) {
        const creatorData = creatorDocSnap.data();
        return {
          email: creatorData.email,
          uid: creatorUid
        };
      }
    }
    
    // If we don't have a record or it's incomplete, search for users with isCreator=true
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('isCreator', '==', true), limit(1));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const creatorDoc = querySnapshot.docs[0];
      const creatorData = creatorDoc.data();
      
      return {
        email: creatorData.email,
        uid: creatorDoc.id
      };
    }
    
    // If we still haven't found it, search for users with displayName="Prime"
    const primeQuery = query(usersRef, where('displayName', '==', 'Prime'), limit(1));
    const primeSnapshot = await getDocs(primeQuery);
    
    if (!primeSnapshot.empty) {
      const primeDoc = primeSnapshot.docs[0];
      const primeData = primeDoc.data();
      
      return {
        email: primeData.email,
        uid: primeDoc.id
      };
    }
    
    // Last resort: Get all users and check each one
    const allUsersQuery = query(usersRef, limit(20)); // Limit to first 20 users to avoid excessive reads
    const allUsersSnapshot = await getDocs(allUsersQuery);
    
    if (!allUsersSnapshot.empty) {
      console.log(`Checking ${allUsersSnapshot.size} users for creator status...`);
      
      for (const userDoc of allUsersSnapshot.docs) {
        // Skip the creator-account-check document
        if (userDoc.id === 'creator-account-check') continue;
        
        const userData = userDoc.data();
        console.log(`Checking user: ${userData.email || 'unknown email'}`);
        
        // Check for any indicators this might be the creator
        if (
          userData.isCreator === true || 
          userData.displayName === 'Prime' ||
          userData.email?.includes('prime') ||
          userData.email?.includes('admin') ||
          userData.email?.includes('creator')
        ) {
          return {
            email: userData.email,
            uid: userDoc.id
          };
        }
      }
    }
    
    return null;
  } catch (err) {
    console.error("Error finding creator account:", err);
    return null;
  }
};