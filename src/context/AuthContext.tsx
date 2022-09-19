import { createContext, useContext } from "react";

export type TypeProvider = "google" | "github";

export interface ICurrentUser {
  name: string;
  avatarUrl: string;
  email: string;
  type?: TypeProvider;
  id: string;
  role: string;
  main: "ENGINEERING" | "DESIGN" | "PRODUCT";
  level: number;
  exp: number;
}

interface AuthContextType {
  user: ICurrentUser;
  signin: (type: TypeProvider, callback: VoidFunction) => void;
  signout: (callback: VoidFunction) => void;
  setCurrentUser: (user: ICurrentUser) => void;
}

const AuthContext = createContext<AuthContextType>(null!);

AuthContext.displayName = "AuthProvider";
function useAuth() {
  return useContext(AuthContext);
}

export { AuthContext, useAuth };
