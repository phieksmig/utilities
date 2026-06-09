// types.ts
export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  title: string;
  description?: string;
  isCompleted: boolean;
  priority: Priority;
  createdAt: string;
}
