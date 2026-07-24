import { createContext, ReactNode, useContext, useMemo, useState } from "react";

type AuthContextValue = {
  currentUserEmail: string | null;
  isLoggedIn: boolean;
  login: (email: string) => boolean;
  register: (email: string) => boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function AuthProvider({ children }: { children: ReactNode }) {
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [registeredEmails, setRegisteredEmails] = useState<string[]>([]);

  const normalizeEmail = (email: string) => email.trim().toLowerCase();

  const value = useMemo(
    () => ({
      currentUserEmail,
      isLoggedIn,
      login: (email: string) => {
        const normalizedEmail = normalizeEmail(email);
        const isRegistered = registeredEmails.includes(normalizedEmail);

        if (!isRegistered) {
          return false;
        }

        setCurrentUserEmail(normalizedEmail);
        setIsLoggedIn(true);
        return true;
      },
      register: (email: string) => {
        const normalizedEmail = normalizeEmail(email);
        const isAlreadyRegistered = registeredEmails.includes(normalizedEmail);

        if (isAlreadyRegistered) {
          return false;
        }

        setRegisteredEmails((previousRegisteredEmails) => [
          ...previousRegisteredEmails,
          normalizedEmail,
        ]);
        setCurrentUserEmail(normalizedEmail);
        setIsLoggedIn(true);
        return true;
      },
      logout: () => {
        setCurrentUserEmail(null);
        setIsLoggedIn(false);
      },
    }),
    [currentUserEmail, isLoggedIn, registeredEmails],
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
