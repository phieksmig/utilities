import type { ReactNode } from "react";
import styles from "./BigText.module.css";

export const BigText = ({ children }: { children: ReactNode }) => {
  return <div className={styles.text}>{children}</div>;
};
