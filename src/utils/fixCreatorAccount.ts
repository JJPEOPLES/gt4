import { doc, setDoc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db } from '../firebase';

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
    // First check the special document
    const usersRef = doc(db, 'users', 'creator-account-check');
    const docSnap = await getDoc(usersRef);
    
    if (docSnap.exists() && docSnap.data().creatorInitialized) {
      const creatorUid = docSnap.data().creatorUid;
      
      // Get the creator user document
      const creatorDocRef = doc(db, 'users', creatorUid);
      const creatorDocSnap = await getDoc(creatorDocRef);
      
      if (creatorDocSnap.exists()) {
        const creatorData = creatorDocSnap.data();
        
        // Check if the creator has the isCreator flag
        if (!creatorData.isCreator) {
          // Fix the creator document
          await setDoc(creatorDocRef, {
            ...creatorData,
            isCreator: true
          });
          
          return {
            success: true,
            message: "Fixed creator account: Added missing isCreator flag",
            creatorInfo: {
              email: creatorData.email,
              uid: creatorUid,
              displayName: creatorData.displayName
            }
          };
        }
        
        return {
          success: true,
          message: "Creator account is valid",
          creatorInfo: {
            email: creatorData.email,
            uid: creatorUid,
            displayName: creatorData.displayName
          }
        };
      } else {
        // The creator document doesn't exist, but we have a reference to it
        // Let's look for other potential creator accounts
        const result = await findPotentialCreatorAccounts();
        
        if (result.found) {
          // Update the creator-account-check document
          await setDoc(usersRef, {
            creatorInitialized: true,
            creatorUid: result.uid,
            initializedAt: new Date(),
            note: 'Fixed by findAndFixCreatorAccount'
          });
          
          return {
            success: true,
            message: "Fixed creator account: Updated creator reference",
            creatorInfo: {
              email: result.email || 'unknown@example.com',
              uid: result.uid || 'unknown-uid',
              displayName: result.displayName || 'Prime'
            }
          };
        } else {
          return {
            success: false,
            message: "Creator account reference exists but no valid creator account found"
          };
        }
      }
    } else {
      // No creator-account-check document, let's look for potential creator accounts
      const result = await findPotentialCreatorAccounts();
      
      if (result.found) {
        // Create the creator-account-check document
        await setDoc(usersRef, {
          creatorInitialized: true,
          creatorUid: result.uid,
          initializedAt: new Date(),
          note: 'Created by findAndFixCreatorAccount'
        });
        
        return {
          success: true,
          message: "Fixed creator account: Created creator reference",
          creatorInfo: {
            email: result.email || 'unknown@example.com',
            uid: result.uid || 'unknown-uid',
            displayName: result.displayName || 'Prime'
          }
        };
      } else {
        return {
          success: false,
          message: "No creator account found"
        };
      }
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
 * Find potential creator accounts
 * This function will search for users with isCreator=true or displayName="Prime"
 * 
 * @returns Promise<{found: boolean, uid?: string, email?: string, displayName?: string}> - Result of the search
 */
const findPotentialCreatorAccounts = async (): Promise<{
  found: boolean, 
  uid?: string, 
  email?: string,
  displayName?: string
}> => {
  try {
    // First look for users with isCreator=true
    const usersCollection = collection(db, 'users');
    const creatorQuery = query(usersCollection, where('isCreator', '==', true), limit(1));
    const creatorSnapshot = await getDocs(creatorQuery);
    
    if (!creatorSnapshot.empty) {
      const creatorDoc = creatorSnapshot.docs[0];
      const creatorData = creatorDoc.data();
      
      return {
        found: true,
        uid: creatorDoc.id,
        email: creatorData.email,
        displayName: creatorData.displayName
      };
    }
    
    // Then look for users with displayName="Prime"
    const primeQuery = query(usersCollection, where('displayName', '==', 'Prime'), limit(1));
    const primeSnapshot = await getDocs(primeQuery);
    
    if (!primeSnapshot.empty) {
      const primeDoc = primeSnapshot.docs[0];
      const primeData = primeDoc.data();
      
      // Update the user to be a creator if they're not already
      if (!primeData.isCreator) {
        await setDoc(doc(db, 'users', primeDoc.id), {
          ...primeData,
          isCreator: true
        });
      }
      
      return {
        found: true,
        uid: primeDoc.id,
        email: primeData.email,
        displayName: primeData.displayName
      };
    }
    
    return { found: false };
  } catch (err) {
    console.error("Error finding potential creator accounts:", err);
    return { found: false };
  }
};