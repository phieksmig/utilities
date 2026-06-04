import styles from "./Todo.module.css";
import { AddTaskForm } from "../components/AddTaskForm";
import { useTodos } from "../hooks/useTodos";
import { Accordion, AccordionItem, Heading } from "@midas-ds/components";
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
        </div>
        {activeTodos.length === 0 ? (
          <p>Inga uppgifter kvar, bra jobbat!</p>
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
