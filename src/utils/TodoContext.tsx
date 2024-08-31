import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { Todo } from "../App";
import { Button, Snackbar } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface TodoContextType {
  todos: Todo[];
  addTask: (text: string, important: boolean) => void;
  removeTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  clearCompletedTodos: () => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  sortTodos: (type: "important" | "date", order: "asc" | "desc") => void;
  updateTodosOrder: (newOrder: Todo[]) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [undoAction, setUndoAction] = useState<(() => void) | null>(null);
  const [snackbarKey, setSnackbarKey] = useState<number>(0);

  useEffect(() => {
    const savedTodos = localStorage.getItem("todos");
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTask = (text: string, important: boolean) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      important,
      completed: false,
      deleted: false,
    };
    setTodos([newTodo, ...todos]);
  };

  const toggleComplete = (id: number) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const removeTask = (id: number) => {
    const taskToRemove = todos.find((todo) => todo.id === id);
    if (!taskToRemove) return;

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, deleted: true } : todo))
    );

    handleCloseSnackbar();
    showSnackbar("task deleted", () => restoreTask(id));
  };

  const restoreTask = (id: number) => {
    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, deleted: false } : todo))
    );

    handleCloseSnackbar();
  };

  const clearCompletedTodos = () => {
    const completedTodos = todos.filter((todo) => todo.completed);
    if (completedTodos.length === 0) return;

    setTodos(
      todos.map((todo) => (todo.completed ? { ...todo, deleted: true } : todo))
    );

    handleCloseSnackbar();
    showSnackbar("all completed tasks deleted", undoClearCompleted);
  };

  const undoClearCompleted = () => {
    setTodos(
      todos.map((todo) => (todo.completed ? { ...todo, deleted: false } : todo))
    );

    handleCloseSnackbar();
  };

  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => (todo.id === id ? { ...todo, ...updates } : todo))
    );
  };

  const sortTodos = (type: "important" | "date", order: "asc" | "desc") => {
    setTodos((prevTodos) => {
      const activeTodos = prevTodos.filter((todo) => !todo.completed);
      const completedTodos = prevTodos.filter((todo) => todo.completed);

      const sortFunction = (a: Todo, b: Todo) => {
        let comparison = 0;
        if (type === "important") {
          comparison = Number(a.important) - Number(b.important);
        } else if (type === "date") {
          comparison = a.id - b.id;
        }
        return order === "asc" ? comparison : -comparison;
      };

      const sortedActiveTodos = activeTodos.sort(sortFunction);

      return [...sortedActiveTodos, ...completedTodos];
    });
  };

  const updateTodosOrder = (newOrder: Todo[]) => {
    setTodos([...newOrder]);
  };

  const showSnackbar = (message: string, action?: () => void) => {
    setSnackbarMessage(message);
    setUndoAction(() => action || null);
    setSnackbarOpen(true);
    setSnackbarKey((prevKey) => prevKey + 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
    setTodos((prevTodos) => prevTodos.filter((todo) => !todo.deleted));
  };

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
        updateTodosOrder,
      }}
    >
      {children}
      <Snackbar
        key={snackbarKey}
        open={snackbarOpen}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          undoAction && (
            <Button
              sx={{
                backgroundColor: "var(--main-bg)",
                ":hover": {
                  backgroundColor: "var(--main-bg)",
                  filter: "brightness(90%)",
                },
                textTransform: "none",
                color: "var(--text-color)",
              }}
              size="small"
              onClick={undoAction}
              endIcon={<ReplayIcon />}
            >
              undo
            </Button>
          )
        }
      />
    </TodoContext.Provider>
  );
};

// Кастомный хук для использования контекста
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
