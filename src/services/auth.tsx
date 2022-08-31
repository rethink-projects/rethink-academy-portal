import { useEffect } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { ICurrentUser, useAuth } from "../context/AuthContext";

type RequireAuthType = {
  children: JSX.Element;
};

function RequireAuth({ children }: RequireAuthType) {
  let location = useLocation();
  const auth = useAuth();

  const localStorageUser: ICurrentUser = JSON.parse(
    localStorage.getItem("@portarethinkacademy:user")!
  );

  useEffect(() => {
    if (localStorageUser) {
      auth.setCurrentUser(localStorageUser);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!localStorageUser) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
}

export default RequireAuth;
