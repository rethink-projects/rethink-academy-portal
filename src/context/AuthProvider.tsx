import React, { useState } from "react";
import firebaseInstance from "../services";
import { AuthContext, ICurrentUser, TypeProvider } from "./AuthContext";
import { getUserFromBackend } from "../services/backend/UserService";

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<ICurrentUser>(null!);

  let setCurrentUser = (user: ICurrentUser) => {
    setUser(user);
  };

  let signin = async (
    type: TypeProvider = "google",
    callback: VoidFunction
  ) => {
    const userFromFirebase = await firebaseInstance.loginWithFirebase(type);
    const backendUser = await getUserFromBackend(userFromFirebase.email);

    const newUser = {
      ...userFromFirebase,
      name: backendUser.name + " " + backendUser.surname,
      id: backendUser.id,
      role: backendUser.role,
      main: backendUser.main,
      level: backendUser.level,
      exp: backendUser.exp,
    };

    setUser(newUser);

    localStorage.setItem("@portarethinkacademy:user", JSON.stringify(newUser));
    callback();
  };

  let signout = (callback: VoidFunction) => {
    setUser(null!);
    localStorage.removeItem("@portarethinkacademy:user");
    callback();
  };

  let value = { user, signin, signout, setCurrentUser };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;
