import { TextArea, TextField, Button, ButtonGroup } from "@midas-ds/components";
import styles from "./EditTaskForm.module.css";
import type { Todo } from "../types/types";
import { Pencil } from "lucide-react";
import { useState } from "react";

interface EditTaskFormProps {
  todoId: string;
  todos: Todo[];
  editTitle: (id: string, title: string) => void;
  editDescription: (id: string, description: string) => void;
}

export const EditTaskForm = ({
  todoId,
  todos,
  editTitle,
  editDescription,
}: EditTaskFormProps) => {
  const todo = todos.find((item) => item.id === todoId);
  const [editMode, setEditMode] = useState(false);
  const [formTitle, setFormTitle] = useState(todo?.title || "");
  const [formDescription, setFormDescription] = useState(
    todo?.description || "",
  );

  if (!todo) {
    return null;
  }

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    editTitle(todo.id, formTitle);
    editDescription(todo.id, formDescription);
    setEditMode(false);
  };

  if (editMode)
    return (
      <div className={styles.panelContainer}>
        <TextField
          label="Titel"
          value={formTitle}
          onChange={(value) => setFormTitle(value)}
        />

        <TextArea
          label="Beskrivning"
          value={formDescription}
          onChange={(value) => setFormDescription(value)}
        />

        <Button variant="primary" onPress={handleSave}>
          Spara
        </Button>
      </div>
    );

  return (
    <div className={styles.panelContainer}>
      <TextField isReadOnly label="Titel" value={formTitle} />

      <TextArea isReadOnly label="Beskrivning" value={formDescription} />

      <Button variant="tertiary" icon={Pencil} onPress={handleEdit}>
        Redigera
      </Button>
    </div>
  );
};
