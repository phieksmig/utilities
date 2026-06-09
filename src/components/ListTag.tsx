import styles from "./ListTag.module.css";

type ListTagProps = {
  children: React.ReactNode;
};

export const ListTag = ({ children }: ListTagProps) => {
  return <div className={styles.listTag}>{children}</div>;
};
