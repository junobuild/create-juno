import { Login } from "@/components/login";
import { Logout } from "@/components/logout";
import { onAuthStateChange, type User } from "@junobuild/core";
import { createContext, useEffect, useState, type ReactNode } from "react";
import { Passkey } from "@/components/passkey/passkey";

export const AuthContext = createContext<{ user: User | undefined | null }>({
  user: undefined,
});

interface AuthProps {
  children: ReactNode;
}

export const Auth = ({ children }: AuthProps) => {
  const [user, setUser] = useState<User | undefined | null>(undefined);

  useEffect(() => {
    const sub = onAuthStateChange((user) => {
      setUser(user);
    });

    return () => {
      sub();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>
      {user !== undefined && user !== null ? (
        <div>
          {children}

          <Logout />
        </div>
      ) : (
        <div className="gap flex flex-col">
          <Passkey />
          <Login />
        </div>
      )}
    </AuthContext.Provider>
  );
};
