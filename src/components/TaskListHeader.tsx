import { Badge, Heading } from "@midas-ds/components";
import styles from "./TaskListHeader.module.css";

type TaskListHeaderProps = {
  count: number;
};

export const TaskListHeader = ({ count }: TaskListHeaderProps) => {
  return (
    <div className={styles.taskListHeader}>
      <Heading level={3}>Dina uppgifter</Heading>
      <Badge>{count}</Badge>
    </div>
  );
};
