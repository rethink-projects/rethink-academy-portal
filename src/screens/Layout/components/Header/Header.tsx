import { NotesOutlined } from "@mui/icons-material";
import ButtonWithIcon from "../../../../components/ButtonWithIcon/ButtonWithIcon";
import styles from "./Header.module.css";

function Header() {
  return (
    <div className={styles.header_container}>
      <div className={styles.header_inner}>
        <ButtonWithIcon
          icon={<NotesOutlined />}
          position='left'
          text='Notas'
          size='small'
          type='secondary'
        />
      </div>
    </div>
  );
}

export default Header;
