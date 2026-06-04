import { Panel } from "@midas-ds/layout";
import { TextArea, TextField } from "@midas-ds/components";
import styles from "./DetailsPanel.module.css";
import { useState } from "react";
import { useTodos } from "../hooks/useTodos";

interface DetailsPanelProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTodoId: string | null;
}

export const DetailsPanel = ({
  isOpen,
  onOpenChange,
  selectedTodoId,
}: DetailsPanelProps) => {
  const { todos, editTitle, editDescription } = useTodos();
  const todo = selectedTodoId
    ? todos.find((item) => item.id === selectedTodoId)
    : undefined;
  const [title, setTitle] = useState(todo?.title ?? "");
  const [description, setDescription] = useState(todo?.description ?? "");

  if (!todo) {
    return null;
  }

  return (
    <Panel
      id="detaljer"
      title="Detaljer"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
    >
      <div className={styles.panelContainer}>
        <TextField
          label="Titel"
          value={title}
          onChange={(value) => {
            setTitle(value);
            editTitle(todo.id, value);
          }}
        />
        <TextArea
          label="Beskrivning"
          value={description}
          onChange={(value) => {
            setDescription(value);
            editDescription(todo.id, value);
          }}
        />
      </div>
    </Panel>
  );
};
