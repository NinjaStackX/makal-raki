import Link from "next/link";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import BtnAuth from "./BtnAuth";
import { useUser } from "@/lib/useUser";

const Header = async () => {
  const { user } = await useUser();
  return (
    <header className={styles.header}>
      <Navbar isAdmin={user?.role === "ADMIN"} />
      <div className={styles.right}>
        <BtnAuth />
      </div>
    </header>
  );
};

export default Header;
