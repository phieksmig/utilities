import { Heading } from "@midas-ds/components";
import styles from "./TaskListHeader.module.css";
import { ListTag } from "./ListTag";

type TaskListHeaderProps = {
  count: number;
};

export const TaskListHeader = ({ count }: TaskListHeaderProps) => {
  return (
    <div className={styles.taskListHeader}>
      <Heading level={3}>Dina uppgifter</Heading>
      <ListTag>{count}</ListTag>
    </div>
  );
};
