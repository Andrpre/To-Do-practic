import React, {
  createContext,
  useReducer,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import { Todo, TodoContextType } from "../types/types";
import { todoReducer, initializeState } from "../utils/todoReducer";
import { Button, Snackbar } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(todoReducer, undefined, initializeState);

  // Сохранение списков в localStorage при изменениях
  useEffect(() => {
    const filteredLists = state.lists
      .filter((list) => !list.deleted)
      .map((list) => ({
        ...list,
        todos: list.todos.filter((todo) => !todo.deleted),
      }));
    localStorage.setItem("lists", JSON.stringify(filteredLists));
  }, [state.lists]);

  // Сохранение активного списка в localStorage
  useEffect(() => {
    localStorage.setItem("activeListId", String(state.activeListId));
  }, [state.activeListId]);

  const addTask = (text: string, important: boolean) => {
    dispatch({ type: "ADD_TASK", text, important });
  };

  const toggleComplete = (id: number) => {
    dispatch({ type: "TOGGLE_COMPLETE", id });
  };

  const removeTask = (id: number) => {
    const taskToRemove = state.lists
      .find((list) => list.id === state.activeListId)
      ?.todos.find((todo) => todo.id === id);
    if (!taskToRemove) return;

    dispatch({ type: "REMOVE_TASK", id });
    showSnackbar("Task deleted", () => restoreTask(id));
  };

  const restoreTask = (id: number) => {
    dispatch({ type: "RESTORE_TASK", id });
    handleCloseSnackbar();
  };

  const clearCompletedTodos = () => {
    const completedTodos = state.lists
      .find((list) => list.id === state.activeListId)
      ?.todos.filter((todo) => todo.completed);
    if (!completedTodos || completedTodos.length === 0) return;

    dispatch({ type: "CLEAR_COMPLETED_TODOS" });
    showSnackbar("All completed tasks deleted", () => undoClearCompleted());
  };

  const undoClearCompleted = () => {
    dispatch({ type: "UNDO_CLEAR_COMPLETED" });
    handleCloseSnackbar();
  };

  const updateTodo = (id: number, updates: Partial<Todo>) => {
    dispatch({ type: "UPDATE_TODO", id, updates });
  };

  const updateTodosOrder = (newOrder: Todo[]) => {
    dispatch({ type: "UPDATE_TODOS_ORDER", newOrder });
  };

  const addList = (name: string) => {
    dispatch({ type: "ADD_LIST", name });
  };

  const removeList = (id: number) => {
    dispatch({ type: "REMOVE_LIST", id });
    showSnackbar("List deleted", () => restoreList(id));
  };

  const restoreList = (id: number) => {
    dispatch({ type: "RESTORE_LIST", id });
    handleCloseSnackbar();
  };

  const switchList = (id: number) => {
    dispatch({ type: "SWITCH_LIST", id });
  };

  const showSnackbar = (message: string, action: () => void) => {
    dispatch({ type: "SHOW_SNACKBAR", message, action });
  };

  const handleCloseSnackbar = () => {
    dispatch({ type: "CLOSE_SNACKBAR" });
  };

  return (
    <TodoContext.Provider
      value={{
        ...state,
        addTask,
        toggleComplete,
        removeTask,
        clearCompletedTodos,
        updateTodo,
        updateTodosOrder,
        addList,
        removeList,
        switchList,
      }}
    >
      {children}
      <Snackbar
        key={state.snackbar.key}
        open={state.snackbar.open}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        message={state.snackbar.message}
        action={
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
            onClick={state.snackbar.undoAction}
            endIcon={<ReplayIcon />}
          >
            undo
          </Button>
        }
      />
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error("useTodo must be used within a TodoProvider");
  }
  return context;
};
