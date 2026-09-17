"use client";

import { LogoComponent } from "./Logo.tsx";
import styles from "./HeaderLogo.module.css";

export const HeaderLogo = () => (
  <>
    <LogoComponent size="small" className={styles.mobile} />
    <LogoComponent size="large" className={styles.desktop} />
  </>
);
