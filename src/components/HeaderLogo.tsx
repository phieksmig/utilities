"use client";

import { LogoComponent } from "./Logo.tsx";
import styles from "./HeaderLogo.module.css";

export const HeaderLogo = () => (
  <>
    <LogoComponent variant="small" className={styles.mobile} />
    <LogoComponent variant="large" className={styles.desktop} />
    <LogoComponent variant="stacked" className={styles.largeMobile} />
  </>
);
