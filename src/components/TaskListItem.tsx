import { Button, Checkbox } from "@midas-ds/components";
import { Trash2 } from "lucide-react";
import styles from "./TaskListItem.module.css";

type TaskListItemProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
  onOpenDetails?: (todoId: string) => void;
};

export const TaskListItem = ({
  id,
  title,
  isCompleted,
  onToggle,
  onDelete,
  onOpenDetails,
}: TaskListItemProps) => {
  return (
    <div
      className={styles.taskListItem}
      role="button"
      onClick={() => onOpenDetails?.(id)}
    >
      <span onClick={(e) => e.stopPropagation()}>
        <Checkbox isSelected={isCompleted} onChange={onToggle}>
          {title}
        </Checkbox>
      </span>
      <Button
        variant="icon"
        icon={Trash2}
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
      ></Button>
    </div>
  );
};
