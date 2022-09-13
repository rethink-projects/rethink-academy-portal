import {
  Auth,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { TypeProvider } from "../../context/AuthContext";

const getProvider = (
  type: TypeProvider
): GoogleAuthProvider | GithubAuthProvider => {
  return type === "google"
    ? new GoogleAuthProvider()
    : new GithubAuthProvider();
};

type firebaseUser = {
  avatarUrl: string;
  name: string;
  email: string;
};

const signinWithProvider = async (
  auth: Auth,
  provider: GoogleAuthProvider | GithubAuthProvider
): Promise<firebaseUser> => {
  try {
    const response = await signInWithPopup(auth, provider);
    const currentUser: firebaseUser = {
      avatarUrl: response.user.photoURL!,
      name: response.user.displayName!,
      email: response.user.email!,
    };
    return currentUser;
  } catch (error: any) {
    return error;
  }
};

export const loginWithFirebase = async (type: TypeProvider) => {
  const auth = getAuth();
  const provider = getProvider(type);
  return signinWithProvider(auth, provider);
};
