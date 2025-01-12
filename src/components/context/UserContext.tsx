import React, { createContext, useState, useEffect } from 'react';
import { Auth, getAuth, onAuthStateChanged } from 'firebase/auth';
import { doc, DocumentData, DocumentSnapshot, getDoc, onSnapshot } from 'firebase/firestore';
import { db } from '@/app/firebase/config';
import { TbLoader3 } from 'react-icons/tb';

// Defining user data type from Firestore
interface UserDataType {
  img: string;
  doc: any;
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  qrgId: string;
  accountType: string;
  phoneNumber: string;
  gender: string;
  address: string;
  state: string;
  postalCode: string;
  country: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube: string;
  linkedin: string;
  website: string;
}

// Updating the UserContextState interface to match user data type
interface UserContextState {
  user: UserDataType | null;
  isLoading: boolean;
}

export const UserContext = createContext<UserContextState>({
  user: null,
  isLoading: true,
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserDataType | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null); // Add error state
  const [unsubscribeSnapshot, setUnsubscribeSnapshot] = useState<() => void>(() => {});

  useEffect(() => {
    const auth: Auth = getAuth();
    const unsubscribeAuth = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setIsLoading(true); // Set loading to true when starting data fetch
        try {
          await fetchUser(currentUser.uid);
        } catch (error) {
          setError('Error fetching user data');
        }
        setIsLoading(false); // Set loading to false after data fetch

        // Listener for changes in Firestore user document
        const userDocRef = doc(db, 'users', currentUser.uid);
        const unsubscribe = onSnapshot(userDocRef, (doc: DocumentSnapshot<DocumentData>) => {
          if (doc.exists()) {
            const updatedUserData = doc.data() as UserDataType;
            setUser(updatedUserData);
          }
        });
        setUnsubscribeSnapshot(() => unsubscribe); // Save unsubscribe function
      } else {
        setUser(null);
        setIsLoading(false); // Set loading to false when user is not logged in
      }
    });

    return () => {
      unsubscribeAuth();
      if (unsubscribeSnapshot) {
        unsubscribeSnapshot(); // Call the unsubscribe function when component unmounts
      }
    };
  }, []);

  const fetchUser = async (userId: string) => {
    const userDocRef = doc(db, 'users', userId);
    const docSnap: DocumentSnapshot<DocumentData> = await getDoc(userDocRef);
    if (docSnap.exists()) {
      const userData = docSnap.data() as UserDataType;
      setUser(userData);
    } else {
      throw new Error('User document not found');
    }
  };

  if (isLoading && user !== null) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-white text-center">
        <TbLoader3
          className="animate-spin text-blue text-7xl font-semibold text-center"
        />
      </div>
    );
  }

  if (error) {
    return <div>Error: {error}</div>; // Render error message
  }

  return <UserContext.Provider value={{ user, isLoading }}>{children}</UserContext.Provider>;
};
