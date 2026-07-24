import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AuthContextValue = {
  currentUserEmail: string | null;
  currentUserPassword: string | null;
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  register: (email: string, password: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [currentUserPassword, setCurrentUserPassword] = useState<string | null>(
    null,
  );
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, string>>(
    {},
  );

  const normalizeEmail = (email: string) => email.trim().toLowerCase();

  const value = useMemo(
    () => ({
      currentUserEmail,
      currentUserPassword,
      isLoggedIn,
      login: (email: string, password: string) => {
        const normalizedEmail = normalizeEmail(email);
        const registeredPassword = registeredUsers[normalizedEmail];

        if (!registeredPassword || registeredPassword !== password) {
          return false;
        }

        setCurrentUserEmail(normalizedEmail);
        setCurrentUserPassword(password);
        setIsLoggedIn(true);
        return true;
      },
      register: (email: string, password: string) => {
        const normalizedEmail = normalizeEmail(email);
        const isAlreadyRegistered = normalizedEmail in registeredUsers;

        if (isAlreadyRegistered) {
          return false;
        }

        setRegisteredUsers((previousRegisteredUsers) => ({
          ...previousRegisteredUsers,
          [normalizedEmail]: password,
        }));
        setCurrentUserEmail(normalizedEmail);
        setCurrentUserPassword(password);
        setIsLoggedIn(true);
        return true;
      },
      logout: () => {
        setCurrentUserEmail(null);
        setCurrentUserPassword(null);
        setIsLoggedIn(false);
      },
    }),
    [currentUserEmail, currentUserPassword, isLoggedIn, registeredUsers],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
