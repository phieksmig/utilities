import styles from "./Todo.module.css";
import { AddTaskForm } from "../components/AddTaskForm";
import { useTodos } from "../hooks/useTodos";
import {
  Accordion,
  toastQueue,
  AccordionItem,
  Text,
  Modal,
  Button,
  ButtonGroup,
} from "@midas-ds/components";
import { TaskListItem } from "../components/TaskListItem";
import { TaskListHeader } from "../components/TaskListHeader";
import { useOutletContext } from "react-router";
import { useState } from "react";
import { getRandomSuccessMessage } from "../utils/toastMessages";

type OutletContext = {
  openDetails: () => void;
};

export default function Todo() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const activeTodos = todos.filter((todo) => !todo.isCompleted);
  const { openDetails } = useOutletContext<OutletContext>();

  const [open, setOpen] = useState(false);
  const [todoIdToDelete, setTodoIdToDelete] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    toggleTodo(id);
    toastQueue.add(
      { type: "success", message: getRandomSuccessMessage() },
      { timeout: 5000 },
    );
  };

  const handleDelete = (id: string) => {
    setTodoIdToDelete(id);
    setOpen(true);
  };

  return (
    <div className={styles.mainContainer}>
      <Accordion isContained>
        <AccordionItem id="add-task" title="Lägg till uppgift">
          <AddTaskForm addTodo={addTodo} />
        </AccordionItem>
      </Accordion>
      <div className={styles.todoList}>
        <TaskListHeader count={activeTodos.length} />
        {activeTodos.length === 0 ? (
          <div className={styles.emptyState}>
            <Text>Inga uppgifter kvar, bra jobbat!</Text>
          </div>
        ) : (
          activeTodos.map((todo) => (
            <TaskListItem
              key={todo.id}
              title={todo.title}
              isCompleted={todo.isCompleted}
              onToggle={() => handleToggle(todo.id)}
              onDelete={() => handleDelete(todo.id)}
              onOpenDetails={openDetails}
            />
          ))
        )}
      </div>
      <Modal title="Radera uppgift" isOpen={open} onOpenChange={setOpen}>
        <Text>Är du säker på att du vill radera uppgiften?</Text>
        <ButtonGroup>
          <Button
            variant="danger"
            onPress={() => {
              if (todoIdToDelete) {
                deleteTodo(todoIdToDelete);
                setOpen(false);
              }
            }}
          >
            Radera
          </Button>
          <Button variant="secondary" slot={"close"}>
            Avbryt
          </Button>
        </ButtonGroup>
      </Modal>
    </div>
  );
}
