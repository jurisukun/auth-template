import { useState, createContext, useEffect } from "react";
import { CheckAuth } from "./CheckAuth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <CheckAuth>{children}</CheckAuth>
    </AuthContext.Provider>
  );
};
