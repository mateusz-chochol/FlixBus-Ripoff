import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase';
import { usersRef } from 'api/firestoreCollectionsRefs';

interface User extends firebase.User {
  balance: number
}

const signup = async (email: string, password: string) => {
  const registeredUser = await auth.createUserWithEmailAndPassword(email, password);

  if (registeredUser.user) {
    await usersRef.doc(registeredUser.user.uid).set({
      balance: 0,
    })
  }

  return registeredUser;
}

const login = (email: string, password: string) => {
  return auth.signInWithEmailAndPassword(email, password);
}

const logout = () => {
  return auth.signOut();
}

const resetPassword = (email: string) => {
  return auth.sendPasswordResetEmail(email);
}

interface AuthValues {
  currentUser: User | null,
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>> | null,
  userTokenResult: firebase.auth.IdTokenResult | undefined,
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
}

const AuthContext = createContext<AuthValues>({
  currentUser: null,
  setCurrentUser: null,
  userTokenResult: undefined,
  signup,
  login,
  logout,
  resetPassword,
});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userTokenResult, setUserTokenResult] = useState<firebase.auth.IdTokenResult | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const value: AuthValues = {
    currentUser,
    setCurrentUser,
    userTokenResult,
    signup,
    login,
    logout,
    resetPassword,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userData = (await usersRef.doc(user.uid).get()).data()

        setCurrentUser({
          ...user,
          balance: userData ? userData.balance : 0,
        });
      }
      else {
        setCurrentUser(null);
      }
      setUserTokenResult(await user?.getIdTokenResult());
      setLoading(false);
    });

    return unsubscribe;
  }, [])

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
