import { onAuthStateChange } from "@junobuild/core";
import PropTypes from "prop-types";
import { createContext, useEffect, useState } from "react";
import { Login } from "./Login";
import { Logout } from "./Logout";
import { Passkey } from "./passkey/Passkey";

export const AuthContext = createContext();

export const Auth = ({ children }) => {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const sub = onAuthStateChange((user) => setUser(user));

    return () => sub();
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

Auth.propTypes = {
  children: PropTypes.node.isRequired,
};
