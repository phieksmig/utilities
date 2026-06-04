import styles from "./Todo.module.css";
import { AddTaskForm } from "../components/AddTaskForm";
import { useTodos } from "../hooks/useTodos";
import {
  Accordion,
  AccordionItem,
  Heading,
  Badge,
  Text,
} from "@midas-ds/components";
import { TaskListItem } from "../components/TaskListItem";

export default function Todo() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const activeTodos = todos.filter((todo) => !todo.isCompleted);

  return (
    <div className={styles.mainContainer}>
      <Accordion isContained>
        <AccordionItem id="add-task" title="Lägg till uppgift">
          <AddTaskForm addTodo={addTodo} />
        </AccordionItem>
      </Accordion>
      <div className={styles.todoList}>
        <div className={styles.todoListHeader}>
          <Heading level={3}>Dina uppgifter</Heading>
          <Badge>{activeTodos.length}</Badge>
        </div>
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
              onToggle={() => toggleTodo(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
