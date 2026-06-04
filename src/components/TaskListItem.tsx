import { Button, Checkbox } from "@midas-ds/components";
import { Trash2 } from "lucide-react";
import styles from "./TaskListItem.module.css";

type TaskListItemProps = {
  title: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
};

export const TaskListItem = ({
  title,
  isCompleted,
  onToggle,
  onDelete,
}: TaskListItemProps) => {
  return (
    <div className={styles.taskListItem}>
      <Checkbox isSelected={isCompleted} onChange={onToggle}>
        {title}
      </Checkbox>
      <Button variant="icon" icon={Trash2} onClick={onDelete}></Button>
    </div>
  );
};
