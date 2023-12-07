"use client";
import React, { useState } from "react";
import { createContext } from "react";

type UserAuth = {
  name: string;
  email: string;
  token: string;
  isAuthenticated: boolean;
};
type AuthContextT = {
  user: UserAuth;
  setUser: React.Dispatch<React.SetStateAction<UserAuth>>;
};
const initalValue = {
  name: "",
  email: "",
  password: "",
  token: "",
  isAuthenticated: false,
};

const AuthContext = createContext<AuthContextT>({
  user: initalValue,
  setUser: () => {},
});
const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserAuth>(initalValue);
  return (
    <AuthContext.Provider value={{ user: user, setUser: setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  if (AuthContext === null)
    throw new Error("useAuth must be used within AuthProvider");
  const { user, setUser } = React.useContext<AuthContextT>(AuthContext);
  return { user: user, setUser: setUser };
};

export default AuthProvider;
