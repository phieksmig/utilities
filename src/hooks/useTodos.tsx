// useTodos.ts
import { useState, useEffect } from "react";
import { type Todo, type Priority } from "../types/types";

/**
 * Single source of truth for localStorage key to ensure consistency
 * across all todo persistence operations
 */
const STORAGE_KEY = "todos";

/**
 * Custom hook for managing todos with localStorage persistence
 * Initializes todos from localStorage on mount and syncs all state changes to storage
 */
export function useTodos() {
  /**
   * Initialize todos state from localStorage, or empty array if no stored data exists
   * This runs once on component mount
   */
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem(STORAGE_KEY);
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  /**
   * Effect to persist todos to localStorage whenever the todos array changes
   * This keeps localStorage in sync with the component state
   */
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  /**
   * Adds a new todo to the beginning of the todos array
   * Uses crypto.randomUUID() for unique IDs
   */
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

  /**
   * Edits an existing todo by its id
   * Updates title, description, and priority while keeping other properties intact
   */
  const editTodo = (
    id: string,
    title: string,
    description: string,
    priority: Priority,
  ) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              title,
              description: description || undefined,
              priority,
            }
          : todo,
      ),
    );
  };

  /**
   * Toggles the isCompleted status of a todo by its id
   */
  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo,
      ),
    );
  };

  /**
   * Removes a todo from the array by its id
   */
  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return { todos, addTodo, editTodo, toggleTodo, deleteTodo };
}
