// src/context/TodoContext.tsx
import React, { ReactNode, useReducer, useState, createContext, useContext, useEffect } from "react";
import { Snackbar, Button } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";
import { todoReducer, initialState } from "../utils/todoReducer";
import { TodoContextType } from "../types/types";

// Создаем контекст
export const TodoContext = createContext<TodoContextType | undefined>(undefined);

// Кастомный хук для использования контекста
export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};

// Провайдер для контекста
export const TodoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [undoAction, setUndoAction] = useState<(() => void) | null>(null);
  const [snackbarKey, setSnackbarKey] = useState<number>(0);

  // Загружаем данные из localStorage при загрузке компонента
  useEffect(() => {
    const savedLists = localStorage.getItem("lists");
    const savedActiveListId = localStorage.getItem("activeListId");

    if (savedLists) {
      dispatch({ type: "LOAD_LISTS", lists: JSON.parse(savedLists) });
    }
    if (savedActiveListId) {
      dispatch({ type: "SWITCH_LIST", id: Number(savedActiveListId) });
    }
  }, []);

  // Сохраняем данные в localStorage при изменении списка задач или активного списка
  useEffect(() => {
    localStorage.setItem("lists", JSON.stringify(state.lists));
    localStorage.setItem("activeListId", String(state.activeListId));
  }, [state.lists, state.activeListId]);

  // Закрытие Snackbar
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  // Показ Snackbar
  const showSnackbar = (message: string, action?: () => void) => {
    setSnackbarMessage(message);
    setUndoAction(() => action || null);
    setSnackbarOpen(true);
    setSnackbarKey((prevKey) => prevKey + 1);
  };

  return (
    <TodoContext.Provider
      value={{
        lists: state.lists,
        activeListId: state.activeListId,
        addTask: (text, important) => {
          dispatch({ type: "ADD_TASK", text, important });
          showSnackbar("Task added");
        },
        removeTask: (id) => {
          const task = state.lists.find((list) => list.id === state.activeListId)?.todos.find((todo) => todo.id === id);
          dispatch({ type: "REMOVE_TASK", id });
          showSnackbar("Task deleted", () => {
            dispatch({ type: "RESTORE_TASK", id });
          });
        },
        toggleComplete: (id) => dispatch({ type: "TOGGLE_COMPLETE", id }),
        clearCompletedTodos: () => {
          dispatch({ type: "CLEAR_COMPLETED_TODOS" });
          showSnackbar("All completed tasks deleted", () => {
            dispatch({ type: "UNDO_CLEAR_COMPLETED" });
          });
        },
        updateTodo: (id, updates) => dispatch({ type: "UPDATE_TODO", id, updates }),
        sortTodos: (type, order) => dispatch({ type: "SORT_TODOS", sortBy: type, order }),
        updateTodosOrder: (newOrder) => dispatch({ type: "UPDATE_TODOS_ORDER", newOrder }),
        addList: (name) => {
          dispatch({ type: "ADD_LIST", name });
          showSnackbar("List added");
        },
        removeList: (listId) => {
          dispatch({ type: "REMOVE_LIST", id: listId });
          showSnackbar("List deleted", () => {
            dispatch({ type: "RESTORE_LIST", id: listId });
          });
        },
        switchList: (listId) => dispatch({ type: "SWITCH_LIST", id: listId }),
      }}
    >
      {children}
      <Snackbar
        key={snackbarKey}
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
        action={
          undoAction && (
            <Button color="inherit" size="small" onClick={undoAction}>
              <ReplayIcon />
              Undo
            </Button>
          )
        }
      />
    </TodoContext.Provider>
  );
};

export default TodoProvider;
