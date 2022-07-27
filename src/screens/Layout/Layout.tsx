import { Outlet } from "react-router-dom";
import RequireAuth from "../../services/auth";

// Componentes
import { Header, Menu } from "./components";

// Styles
import styles from "./Layout.module.css";

function Layout() {
  return (
    <RequireAuth>
      <div className={styles.layout_container}>
        <Menu />
        <div className={styles.layout_container_content}>
          <Header />
          <Outlet />
        </div>
      </div>
    </RequireAuth>
  );
}

export default Layout;
