import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";
import { Todo, TodoPriority } from "../App";

interface TodoContextType {
  todos: Todo[];
  addTask: (text: string, priority: TodoPriority) => void;
  removeTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  clearCompletedTodos: () => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  sortTodos: (
    type: "priority" | "date",
    order: "asc" | "desc"
  ) => void;
}

const TodoContext = createContext<
  TodoContextType | undefined
>(undefined);

// Провайдер контекста
export const TodoProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTask = (
    text: string,
    priority: TodoPriority
  ) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      priority,
      completed: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  const removeTask = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompletedTodos = () => {
    setTodos(
      todos.filter((todo) => todo.completed !== true)
    );
  };

  const updateTodo = (
    id: number,
    updates: Partial<Todo>
  ) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, ...updates } : todo
      )
    );
  };

  const sortTodos = (
    type: "priority" | "date",
    order: "asc" | "desc"
  ) => {
    setTodos((prevTodos) => {
      const activeTodos = prevTodos.filter(
        (todo) => !todo.completed
      );
      const completedTodos = prevTodos.filter(
        (todo) => todo.completed
      );

      const sortFunction = (a: Todo, b: Todo) => {
        let comparison = 0;
        if (type === "priority") {
          const priorityValues = {
            [TodoPriority.NO_PRIORITY]: 0,
            [TodoPriority.LOW]: 1,
            [TodoPriority.MEDIUM]: 2,
            [TodoPriority.HIGH]: 3,
            [TodoPriority.URGENT]: 4,
          };

          comparison =
            priorityValues[a.priority] -
            priorityValues[b.priority];

          return order === "asc" ? comparison : -comparison;
        } else if (type === "date") {
          comparison = a.id - b.id;

          return order === "asc" ? comparison : -comparison;
        }

        return 0;
      };

      const sortedActiveTodos =
        activeTodos.sort(sortFunction);

      return [...sortedActiveTodos, ...completedTodos];
    });
  };
  // const sortTodos = (
  //     type: "priority" | "date",
  //     order: "asc" | "desc"
  //   ) => {
  //     setTodos((prevTodos) => {
  //       const sortesTask = [...prevTodos]
  //         .filter((todo) => todo.completed !== true)
  //         .sort((a, b) => {
  //           let comparison = 0;

  //           if (type === "priority") {
  //             const priorityValues = {
  //               [TodoPriority.NO_PRIORITY]: 0,
  //               [TodoPriority.LOW]: 1,
  //               [TodoPriority.MEDIUM]: 2,
  //               [TodoPriority.HIGH]: 3,
  //               [TodoPriority.URGENT]: 4,
  //             };
  //             comparison =
  //               priorityValues[a.priority] -
  //               priorityValues[b.priority];
  //           } else if (type === "date") {
  //             comparison = a.id - b.id;
  //           }

  //           return order === "asc" ? comparison : -comparison;
  //         });
  //         return [...prevTodos, ...sortesTask];
  //     });
  //   };

  return (
    <TodoContext.Provider
      value={{
        todos,
        addTask,
        removeTask,
        toggleComplete,
        clearCompletedTodos,
        updateTodo,
        sortTodos,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

// Кастомный хук для использования контекста
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error(
      "useTodo must be used within a TodoProvider"
    );
  }
  return context;
};
