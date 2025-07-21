import React, { createContext, useState, useEffect, useContext } from 'react';
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged,
  updateProfile,
  User
} from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { db, auth } from '../../firebase';

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

export interface UserProfile {
  uid: string;
  displayName: string;
  email: string;
  isCreator: boolean;
  joinedAt: Date;
  artworksCount: number;
  collaborationsCount: number;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreator, setIsCreator] = useState(false);
  
  // Special function to create the Prime creator account (for admin use only)
  const createCreatorAccount = async (email: string, password: string) => {
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with displayName "Prime"
      await updateProfile(user, { displayName: "Prime" });
      
      // Create user document in Firestore with isCreator flag
      const userProfile: Omit<UserProfile, 'uid'> = {
        displayName: "Prime",
        email,
        isCreator: true, // This is the creator account
        joinedAt: new Date(),
        artworksCount: 0,
        collaborationsCount: 0
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
      
      console.log("Creator account created successfully");
      return true;
    } catch (err) {
      console.error("Error creating creator account:", err);
      return false;
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      
      if (user) {
        try {
          // Get user profile from Firestore
          const userDoc = await getDoc(doc(db, 'users', user.uid));
          
          if (userDoc.exists()) {
            const userData = userDoc.data() as Omit<UserProfile, 'uid'>;
            // Handle the joinedAt field which might be a Firestore Timestamp or a Date
            let joinedAtDate: Date;
            if (userData.joinedAt) {
              if (userData.joinedAt instanceof Date) {
                joinedAtDate = userData.joinedAt;
              } else if (typeof userData.joinedAt.toDate === 'function') {
                joinedAtDate = userData.joinedAt.toDate();
              } else {
                joinedAtDate = new Date(); // Fallback
              }
            } else {
              joinedAtDate = new Date(); // Fallback
            }
            
            setUserProfile({
              uid: user.uid,
              ...userData,
              joinedAt: joinedAtDate
            });
            setIsCreator(userData.isCreator);
          } else {
            // This shouldn't happen normally, but just in case
            console.error('User document not found in Firestore');
          }
        } catch (err) {
          console.error('Error fetching user profile:', err);
        }
      } else {
        setUserProfile(null);
        setIsCreator(false);
      }
      
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

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
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('displayName', '==', username));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
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
      
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Update profile with displayName
      await updateProfile(user, { displayName });
      
      // Create user document in Firestore
      const userProfile: Omit<UserProfile, 'uid'> = {
        displayName,
        email,
        isCreator: false, // Only the original creator is marked as true
        joinedAt: new Date(),
        artworksCount: 0,
        collaborationsCount: 0
      };
      
      await setDoc(doc(db, 'users', user.uid), userProfile);
      
      setUserProfile({
        uid: user.uid,
        ...userProfile
      });
      
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
      await signInWithEmailAndPassword(auth, email, password);
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
      await signOut(auth);
    } catch (err: any) {
      setError(err.message);
      console.error('Sign out error:', err);
    }
  };

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
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;