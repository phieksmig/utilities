// useTodos.ts
import { useState } from "react";
import { type Todo, type Priority } from "../types/types";

const STORAGE_KEY = "todos";
export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const addTodo = (title: string, description: string, priority: Priority) => {
    const newTodo: Todo = {
      id: crypto.randomUUID(),
      title,
      description: description || undefined,
      isCompleted: false,
      priority,
      createdAt: new Date().toLocaleDateString(),
    };
    setTodos((prev) => [newTodo, ...prev]);
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, toggleTodo, deleteTodo };
}
