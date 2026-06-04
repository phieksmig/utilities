import styles from "./Todo.module.css";
import { AddTaskForm } from "../components/AddTaskForm";
import { Trash2 } from "lucide-react";
import { useTodos } from "../hooks/useTodos";
import { Button, Checkbox, Heading } from "@midas-ds/components";

export default function Todo() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();
  const activeTodos = todos.filter((todo) => !todo.isCompleted);

  return (
    <div className={styles.mainContainer}>
      <AddTaskForm addTodo={addTodo} />
      <Heading level={3}>Dina uppgifter</Heading>
      {activeTodos.length === 0 ? (
        <p>Inga uppgifter kvar, bra jobbat!</p>
      ) : (
        activeTodos.map((todo) => (
          <div key={todo.id} className={styles.todoList}>
            <Checkbox
              isSelected={todo.isCompleted}
              onChange={() => toggleTodo(todo.id)}
            >
              {todo.title}
            </Checkbox>
            <p>{todo.description}</p>

            <Button
              variant="icon"
              icon={Trash2}
              onClick={() => deleteTodo(todo.id)}
            ></Button>
          </div>
        ))
      )}
    </div>
  );
}
