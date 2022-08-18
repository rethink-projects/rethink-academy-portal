import React, { useState } from "react";
import firebaseInstance from "../services";
import { AuthContext, ICurrentUser, TypeProvider } from "./AuthContext";
import { getUserFromBackend } from "../services/backend/UserService";

function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = useState<ICurrentUser>(null!);

  let setCurrentUser = (user: ICurrentUser) => {
    setUser(user);
  };

  let signin = async (type: TypeProvider, callback: VoidFunction) => {
    const userFromFirebase = await firebaseInstance.loginWithFirebase("google");
    const backendUser = await getUserFromBackend(userFromFirebase.email);
    setUser({
      ...userFromFirebase,
      id: backendUser.id,
      role: backendUser.role,
      title: backendUser.title,
    });
    localStorage.setItem("@portarethinkacademy:user", JSON.stringify(user));
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
