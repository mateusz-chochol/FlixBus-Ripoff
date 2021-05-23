import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
import firebase from 'firebase/app';
import { auth } from '../firebase';

const signup = (email: string, password: string) => {
  return auth.createUserWithEmailAndPassword(email, password);
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
  currentUser: firebase.User | null,
  userTokenResult: firebase.auth.IdTokenResult | undefined,
  signup: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  login: (email: string, password: string) => Promise<firebase.auth.UserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
}

const AuthContext = createContext<AuthValues>({
  currentUser: null,
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
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [userTokenResult, setUserTokenResult] = useState<firebase.auth.IdTokenResult | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(true);

  const value: AuthValues = {
    currentUser,
    userTokenResult,
    signup,
    login,
    logout,
    resetPassword,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setCurrentUser(user);
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
