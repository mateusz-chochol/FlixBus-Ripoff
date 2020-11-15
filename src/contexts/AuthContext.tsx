import React, {
  createContext,
  useContext,
  useState,
  useEffect
} from 'react';
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
  currentUser: firebase.default.User | null,
  signup: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>,
  login: (email: string, password: string) => Promise<firebase.default.auth.UserCredential>,
  logout: () => Promise<void>,
  resetPassword: (email: string) => Promise<void>,
}

const AuthContext = createContext<AuthValues>({
  currentUser: null,
  signup,
  login,
  logout,
  resetPassword,
});

export const useAuth = () => {
  return useContext(AuthContext);
}

export const AuthProvider: React.FC<{ children: any }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<firebase.default.User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const value: AuthValues = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
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
