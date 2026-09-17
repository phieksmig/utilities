import logoLarge from "../assets/logo_large.svg";
import logoSmall from "../assets/logo_small.svg";
import styles from "./Logo.module.css";

type LogoComponentProps = {
  size?: "small" | "large";
  className?: string;
};

export const LogoComponent = ({
  size = "large",
  className,
}: LogoComponentProps) => {
  const logo = size === "small" ? logoSmall : logoLarge;

  return (
    <div
      className={[styles.logoContainer, className].filter(Boolean).join(" ")}
    >
      <img src={logo} alt="Midas Design System Logo" className={styles.logo} />
    </div>
  );
};
