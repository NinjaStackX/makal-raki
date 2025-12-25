import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import BtnAuth from "./BtnAuth";
import { getServerData } from "@/serverActions/tools";

const Header = async () => {
  const user = await getServerData();

  return (
    <header className={styles.header}>
      <Navbar isAdmin={user?.userRole === "ADMIN"} />
      <div className={styles.right}>
        <BtnAuth />
      </div>
    </header>
  );
};

export default Header;
