import logoLarge from "../assets/logo_large.svg";
import logoSmall from "../assets/logo_small.svg";
import logoStacked from "../assets/logo_stacked.svg";
import styles from "./Logo.module.css";

type LogoComponentProps = {
  variant?: "small" | "large" | "stacked";
  className?: string;
};

export const LogoComponent = ({
  variant = "large",
  className,
}: LogoComponentProps) => {
  const logo =
    variant === "small"
      ? logoSmall
      : variant === "stacked"
        ? logoStacked
        : logoLarge;

  return (
    <div className={[className].filter(Boolean).join(" ")}>
      <img src={logo} alt="Midas Design System Logo" className={styles.logo} />
    </div>
  );
};
