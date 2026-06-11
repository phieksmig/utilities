import { Button, Checkbox } from "@midas-ds/components";
import { usePanels } from "@midas-ds/layout";
import { Trash2 } from "lucide-react";
import { EditTaskForm } from "./EditTaskForm";
import styles from "./TaskListItem.module.css";
import type { Todo } from "../types/types";

type TaskListItemProps = {
  id: string;
  title: string;
  isCompleted: boolean;
  onToggle: () => void;
  onDelete: () => void;
  todos: Todo[];
  editTitle: (id: string, title: string) => void;
  editDescription: (id: string, description: string) => void;
};

export const TaskListItem = ({
  id,
  title,
  isCompleted,
  onToggle,
  onDelete,
  todos,
  editTitle,
  editDescription,
}: TaskListItemProps) => {
  const { addPanel } = usePanels();

  const handleOpenDetails = () => {
    addPanel({
      id: "todo-details",
      title: "Detaljer",
      children: (
        <EditTaskForm
          todoId={id}
          todos={todos}
          editTitle={editTitle}
          editDescription={editDescription}
        />
      ),
    });
  };

  return (
    <div
      className={styles.taskListItem}
      role="button"
      onClick={handleOpenDetails}
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
