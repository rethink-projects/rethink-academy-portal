import Images from "../../assets";
import SocialButton from "../../components/SocialButton/SocialButton";

import styles from "./Login.module.css";

function LoginScreen() {
  return (
    <div className={styles.login_container}>
      <div className={styles.login_inner}>
        <img
          className={styles.login_inner_logo}
          src={Images.logoRethink}
          alt=''
        />
        <h1 className={styles.login_inner_title}>
          Portal <span>Rethink</span> Academy
        </h1>
        <img className={styles.login_inner_arrow} src={Images.raArrow} alt='' />
      </div>
      <div className={styles.login_main}>
        <div className={styles.login_main_inner}>
          <img
            className={styles.login_main_img}
            src={Images.ratRa}
            alt='RA RAT'
          />
          <h3 className={styles.login_main_headline}>Faça seu login</h3>
          <SocialButton type='secundary' />
        </div>
      </div>
    </div>
  );
}

export default LoginScreen;
