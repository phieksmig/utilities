import { HeaderActions, type HeaderActionsProps } from "@midas-ds/layout";
import styles from "./StackedHeaderActions.module.css";

export const StackedHeaderActions = ({
  children,
  className,
}: HeaderActionsProps) => (
  <HeaderActions
    className={`${styles.stacked}${className ? ` ${className}` : ""}`}
  >
    {children}
  </HeaderActions>
);
