import { Link } from "react-router-dom";
import Images from "../../../../assets";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import { useAuth } from "../../../../context/AuthContext";
import styles from "./Header.module.css";

function Header() {
  const { user } = useAuth();

  return (
    <div className={styles.header_container}>
      <div className={styles.header_inner}>
        <Link to="/dashboard/notas">
          <ButtonWithIcon
            icon={<img src={Images.icons.IconEdit} alt="Notas" />}
            position="left"
            text={
              user && user.role === "AMBASSADOR" ? "Notas privadas" : "Notas"
            }
            size="block"
            type="secondary"
          />
        </Link>
      </div>
    </div>
  );
}

export default Header;
