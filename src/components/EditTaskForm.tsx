import { TextArea, TextField } from "@midas-ds/components";
import { useTodos } from "../hooks/useTodos";
import styles from "./EditTaskForm.module.css";

interface EditTaskFormProps {
  todoId: string;
}

export const EditTaskForm = ({ todoId }: EditTaskFormProps) => {
  const { todos, editTitle, editDescription } = useTodos();
  const todo = todos.find((item) => item.id === todoId);

  if (!todo) {
    return null;
  }

  return (
    <div className={styles.panelContainer}>
      <TextField
        label="Titel"
        value={todo.title}
        onChange={(value) => editTitle(todo.id, value)}
      />
      <TextArea
        label="Beskrivning"
        value={todo.description}
        onChange={(value) => editDescription(todo.id, value)}
      />
    </div>
  );
};
