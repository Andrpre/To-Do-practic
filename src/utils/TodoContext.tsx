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

interface List {
  id: number;
  name: string;
  todos: Todo[];
}

interface TodoContextType {
  lists: List[];
  activeListId: number;
  addTask: (text: string, important: boolean) => void;
  removeTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  clearCompletedTodos: () => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  sortTodos: (type: "important" | "date", order: "asc" | "desc") => void;
  updateTodosOrder: (newOrder: Todo[]) => void;
  addList: (name: string) => void;
  removeList: (listId: number) => void;
  switchList: (listId: number) => void;
}

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [lists, setLists] = useState<List[]>([
    { id: 1, name: "main", todos: [] },
  ]); // Основной список по умолчанию
  const [activeListId, setActiveListId] = useState<number>(1); // Текущий активный список
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [undoAction, setUndoAction] = useState<(() => void) | null>(null);
  const [snackbarKey, setSnackbarKey] = useState<number>(0);

  useEffect(() => {
    const savedLists = localStorage.getItem("lists");
    if (savedLists) {
      setLists(JSON.parse(savedLists));
    }
    
    const savedActiveListId = localStorage.getItem("activeListId");
    if (savedActiveListId) {
      setActiveListId(Number(savedActiveListId));
    }
  }, []);

  useEffect(() => {
    // Фильтруем удаленные задачи перед сохранением
    const filteredLists = lists.map(list => ({
      ...list,
      todos: list.todos.filter(todo => !todo.deleted),
    }));

    localStorage.setItem("lists", JSON.stringify(filteredLists));
  }, [lists]);
  
  useEffect(() => {
    localStorage.setItem("activeListId", String(activeListId));
  }, [activeListId]);
  

  const activeList = lists.find((list) => list.id === activeListId);

  const addTask = (text: string, important: boolean) => {
    if (!activeList) return;

    const newTodo: Todo = {
      id: Date.now(),
      text,
      important,
      completed: false,
      deleted: false,
    };

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? { ...list, todos: [newTodo, ...list.todos] }
          : list
      )
    );
  };

  const toggleComplete = (id: number) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
              ),
            }
          : list
      )
    );
  };

  const removeTask = (id: number) => {
    const taskToRemove = activeList?.todos.find((todo) => todo.id === id);
    if (!taskToRemove) return;

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === id ? { ...todo, deleted: true } : todo
              ),
            }
          : list
      )
    );

    handleCloseSnackbar();
    showSnackbar("task deleted", () => restoreTask(id));
  };

  const restoreTask = (id: number) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === id ? { ...todo, deleted: false } : todo
              ),
            }
          : list
      )
    );

    handleCloseSnackbar();
  };

  const clearCompletedTodos = () => {
    if (!activeList) return;

    const completedTodos = activeList.todos.filter((todo) => todo.completed);
    if (completedTodos.length === 0) return;

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.completed ? { ...todo, deleted: true } : todo
              ),
            }
          : list
      )
    );

    handleCloseSnackbar();
    showSnackbar("all completed tasks deleted", undoClearCompleted);
  };

  const undoClearCompleted = () => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.completed ? { ...todo, deleted: false } : todo
              ),
            }
          : list
      )
    );

    handleCloseSnackbar();
  };

  const updateTodo = (id: number, updates: Partial<Todo>) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === id ? { ...todo, ...updates } : todo
              ),
            }
          : list
      )
    );
  };

  const sortTodos = (type: "important" | "date", order: "asc" | "desc") => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id !== activeListId) return list;

        const activeTodos = list.todos.filter((todo) => !todo.completed);
        const completedTodos = list.todos.filter((todo) => todo.completed);

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

        return {
          ...list,
          todos: [...sortedActiveTodos, ...completedTodos],
        };
      })
    );
  };

  const updateTodosOrder = (newOrder: Todo[]) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId ? { ...list, todos: [...newOrder] } : list
      )
    );
  };

  const addList = (name: string) => {
    const newList: List = { id: Date.now(), name, todos: [] };
    setLists((prevLists) => [...prevLists, newList]);
    setActiveListId(newList.id);
  };

  const removeList = (listId: number) => {
    setLists((prevLists) => prevLists.filter((list) => list.id !== listId));
    setActiveListId(1); // Возвращаемся к основному списку
  };

  const switchList = (listId: number) => {
    setActiveListId(listId);
  };

  const showSnackbar = (message: string, action?: () => void) => {
    setSnackbarMessage(message);
    setUndoAction(() => action || null);
    setSnackbarOpen(true);
    setSnackbarKey((prevKey) => prevKey + 1);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <TodoContext.Provider
      value={{
        lists,
        activeListId,
        addTask,
        removeTask,
        toggleComplete,
        clearCompletedTodos,
        updateTodo,
        sortTodos,
        updateTodosOrder,
        addList,
        removeList,
        switchList,
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
