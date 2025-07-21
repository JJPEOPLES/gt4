import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs, limit } from 'firebase/firestore';
import { db, auth } from '../firebase';

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
    // First, check if there are any existing users with isCreator=true
    const usersCollection = collection(db, 'users');
    const creatorQuery = query(usersCollection, where('isCreator', '==', true), limit(1));
    const creatorSnapshot = await getDocs(creatorQuery);
    
    if (!creatorSnapshot.empty) {
      console.error('A creator account already exists in the database');
      return false;
    }
    
    // Check if the creator account already exists in our special document
    const usersRef = doc(db, 'users', 'creator-account-check');
    const docSnap = await getDoc(usersRef);
    
    if (docSnap.exists() && docSnap.data().creatorInitialized) {
      console.error('Creator account has already been initialized');
      return false;
    }
    
    // Check if a user with displayName "Prime" already exists
    const primeQuery = query(usersCollection, where('displayName', '==', 'Prime'), limit(1));
    const primeSnapshot = await getDocs(primeQuery);
    
    if (!primeSnapshot.empty) {
      console.error('A user with displayName "Prime" already exists');
      return false;
    }
    
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Update profile with displayName "Prime"
    await updateProfile(user, { displayName: "Prime" });
    
    // Create user document in Firestore with isCreator flag
    const userProfile = {
      displayName: "Prime",
      email,
      isCreator: true,
      joinedAt: new Date(),
      artworksCount: 0,
      collaborationsCount: 0
    };
    
    await setDoc(doc(db, 'users', user.uid), userProfile);
    
    // Mark that the creator account has been initialized
    await setDoc(doc(db, 'users', 'creator-account-check'), {
      creatorInitialized: true,
      creatorUid: user.uid,
      initializedAt: new Date()
    });
    
    console.log("Creator account created successfully");
    return true;
  } catch (err: any) {
    console.error("Error creating creator account:", err);
    
    // Check for specific Firebase errors
    if (err.code === 'auth/email-already-in-use') {
      console.error('Email already in use. Try a different email address.');
    } else if (err.code === 'auth/invalid-email') {
      console.error('Invalid email format.');
    } else if (err.code === 'auth/weak-password') {
      console.error('Password is too weak.');
    } else if (err.code === 'auth/operation-not-allowed') {
      console.error('Email/password accounts are not enabled in Firebase.');
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
    // First check the special document
    const usersRef = doc(db, 'users', 'creator-account-check');
    const docSnap = await getDoc(usersRef);
    
    if (docSnap.exists() && docSnap.data().creatorInitialized) {
      return true;
    }
    
    // If the special document doesn't exist, check for any users with isCreator=true
    const usersCollection = collection(db, 'users');
    const creatorQuery = query(usersCollection, where('isCreator', '==', true), limit(1));
    const creatorSnapshot = await getDocs(creatorQuery);
    
    if (!creatorSnapshot.empty) {
      // We found a creator account, let's create the special document
      const creatorDoc = creatorSnapshot.docs[0];
      await setDoc(doc(db, 'users', 'creator-account-check'), {
        creatorInitialized: true,
        creatorUid: creatorDoc.id,
        initializedAt: new Date(),
        note: 'Auto-created by isCreatorAccountInitialized'
      });
      return true;
    }
    
    // Check for any users with displayName "Prime"
    const primeQuery = query(usersCollection, where('displayName', '==', 'Prime'), limit(1));
    const primeSnapshot = await getDocs(primeQuery);
    
    if (!primeSnapshot.empty) {
      // We found a Prime user, let's mark them as creator and create the special document
      const primeDoc = primeSnapshot.docs[0];
      const primeData = primeDoc.data();
      
      // Update the user to be a creator if they're not already
      if (!primeData.isCreator) {
        await setDoc(doc(db, 'users', primeDoc.id), {
          ...primeData,
          isCreator: true
        });
      }
      
      // Create the special document
      await setDoc(doc(db, 'users', 'creator-account-check'), {
        creatorInitialized: true,
        creatorUid: primeDoc.id,
        initializedAt: new Date(),
        note: 'Auto-created by isCreatorAccountInitialized for Prime user'
      });
      
      return true;
    }
    
    return false;
  } catch (err) {
    console.error("Error checking creator account:", err);
    return false;
  }
};