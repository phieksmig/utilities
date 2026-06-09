import { Button, ButtonGroup, TextField } from "@midas-ds/components";
import { useState } from "react";
import type { Priority } from "../types/types";
import styles from "./AddTaskForm.module.css";

type AddTaskFormProps = {
  addTodo: (title: string, description: string, priority: Priority) => void;
};

export const AddTaskForm = ({ addTodo }: AddTaskFormProps) => {
  //States
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<Priority>("medium");

  const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title.trim()) return;

    addTodo(title, description, priority);

    // Nollställ formulär
    setTitle("");
    setDescription("");
    setPriority("medium");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.form}>
        <TextField
          label="Lägg till uppgift"
          value={title}
          onChange={(value) => setTitle(value)}
          required
        />
        <ButtonGroup>
          <Button variant="primary" type="submit">
            Lägg till
          </Button>
        </ButtonGroup>
      </div>
    </form>
  );
};
