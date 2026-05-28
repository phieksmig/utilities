import Logo from "../assets/midas_crown.svg";
import styles from "./Logo.module.css";

export const LogoComponent = () => {
  return (
    <div className={styles.logoContainer}>
      <img src={Logo} alt="Midas Design System Logo" className={styles.logo} />
    </div>
  );
};
