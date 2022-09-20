import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../assets";
import SocialButton from "../../components/SocialButton/SocialButton";
import { useAuth } from "../../context/AuthContext";
import { useNotification } from "../../context/NotificationContext";

import styles from "./Login.module.css";
import "./Login.css";

function LoginScreen() {
  const auth = useAuth();
  const { user } = useAuth();
  const { notify } = useNotification();
  const navigate = useNavigate();
  async function handleGoogleLogin() {
    auth.signin("google", () => {
      console.log(auth.user);
    });
  }

  useEffect(() => {
    if (user !== null) {
      notify({
        title: "Login Successful",
        type: "success",
      });
      navigate("/dashboard", { replace: true });
    }
  }, [user]);

  useEffect(() => {
    const localStorageUser = JSON.parse(
      localStorage.getItem("@portarethinkacademy:user")!
    );
    if (localStorageUser) {
      auth.setCurrentUser(localStorageUser);
    }
    if (auth.user) {
      // navigate("/dashboard", { replace: true });
    }
  }, [auth, navigate]);
  return (
    <div className={styles.login_container}>
      <div className={styles.login_inner}>
        <img
          className={styles.login_inner_logo}
          src={Images.logoRethink}
          alt=""
        />
        <h1 className={styles.login_inner_title}>
          Portal <span>Rethink</span> Academy
        </h1>
        <img className={styles.login_inner_arrow} src={Images.raArrow} alt="" />
      </div>
      <div className={styles.login_main}>
        <div className={styles.login_main_inner}>
          <img
            className={styles.login_main_img}
            src={Images.ratRa}
            alt="RA RAT"
          />
          <h3 className={styles.login_main_headline}>Faça seu login</h3>
          <SocialButton onClick={handleGoogleLogin} type="secundary" />
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
