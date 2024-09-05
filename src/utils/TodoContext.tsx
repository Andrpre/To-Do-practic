import React, {
  createContext,
  useContext,
  useReducer,
  ReactNode,
  useEffect,
} from "react";
import { Todo } from "../types/types";
import { Button, Snackbar } from "@mui/material";
import ReplayIcon from "@mui/icons-material/Replay";

interface List {
  id: number;
  name: string;
  todos: Todo[];
  deleted: boolean;
}

interface TodoContextType {
  lists: List[];
  activeListId: number;
  addTask: (text: string, important: boolean) => void;
  removeTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  clearCompletedTodos: () => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  sortTodos: (
    type: "important" | "date",
    order: "asc" | "desc"
  ) => void;
  updateTodosOrder: (newOrder: Todo[]) => void;
  addList: (name: string) => void;
  removeList: (listId: number) => void;
  switchList: (listId: number) => void;
}

const TodoContext = createContext<
  TodoContextType | undefined
>(undefined);

// Дефолтное состояние
const initialState = {
  lists: [
    { id: 1, name: "main", todos: [], deleted: false },
  ],
  activeListId: 1,
  snackbar: {
    open: false,
    message: null,
    action: null,
  },
};

// Действия для редьюсера
const actionTypes = {
  ADD_TASK: "ADD_TASK",
  REMOVE_TASK: "REMOVE_TASK",
  TOGGLE_COMPLETE: "TOGGLE_COMPLETE",
  CLEAR_COMPLETED: "CLEAR_COMPLETED",
  UPDATE_TODO: "UPDATE_TODO",
  UPDATE_TODOS_ORDER: "UPDATE_TODOS_ORDER",
  ADD_LIST: "ADD_LIST",
  REMOVE_LIST: "REMOVE_LIST",
  SWITCH_LIST: "SWITCH_LIST",
  SHOW_SNACKBAR: "SHOW_SNACKBAR",
  HIDE_SNACKBAR: "HIDE_SNACKBAR",
  UNDO_ACTION: "UNDO_ACTION",
  RESTORE_LISTS: "RESTORE_LISTS",
};

// Редьюсер для обработки состояния
const todoReducer = (state: TodoContextType, action) => {
  switch (action.type) {
    case actionTypes.ADD_TASK:
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload.text,
        important: action.payload.important,
        completed: false,
        deleted: false,
      };
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? { ...list, todos: [newTodo, ...list.todos] }
            : list
        ),
      };

    case actionTypes.REMOVE_TASK:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.payload.id
                    ? { ...todo, deleted: true }
                    : todo
                ),
              }
            : list
        ),
      };

    case actionTypes.TOGGLE_COMPLETE:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.payload.id
                    ? {
                        ...todo,
                        completed: !todo.completed,
                      }
                    : todo
                ),
              }
            : list
        ),
      };

    case actionTypes.CLEAR_COMPLETED:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.completed
                    ? { ...todo, deleted: true }
                    : todo
                ),
              }
            : list
        ),
      };

    case actionTypes.UPDATE_TODO:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.payload.id
                    ? { ...todo, ...action.payload.updates }
                    : todo
                ),
              }
            : list
        ),
      };

    case actionTypes.UPDATE_TODOS_ORDER:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? { ...list, todos: action.payload.newOrder }
            : list
        ),
      };

    case actionTypes.ADD_LIST:
      const newList: List = {
        id: Date.now(),
        name: action.payload.name,
        todos: [],
        deleted: false,
      };
      return {
        ...state,
        lists: [...state.lists, newList],
        activeListId: newList.id,
      };

    case actionTypes.REMOVE_LIST:
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.payload.listId
            ? { ...list, deleted: true }
            : list
        ),
        activeListId: 1, // Возвращаемся к главному списку
      };

    case actionTypes.SWITCH_LIST:
      return {
        ...state,
        activeListId: action.payload.listId,
      };

    case actionTypes.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message,
          action: action.undoAction || null,
        },
      };

    case actionTypes.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };

    case actionTypes.RESTORE_LISTS:
      return {
        ...state,
        lists: action.payload.lists, // Восстанавливаем списки
      };

    case actionTypes.UNDO_ACTION:
      if (action.undoType === actionTypes.REMOVE_TASK) {
        return {
          ...state,
          lists: state.lists.map((list) =>
            list.id === state.activeListId
              ? {
                  ...list,
                  todos: list.todos.map((todo) =>
                    todo.id === action.payload.id
                      ? { ...todo, deleted: false }
                      : todo
                  ),
                }
              : list
          ),
        };
      }

      if (action.undoType === actionTypes.CLEAR_COMPLETED) {
        return {
          ...state,
          lists: state.lists.map((list) =>
            list.id === state.activeListId
              ? {
                  ...list,
                  todos: list.todos.map((todo) =>
                    todo.completed
                      ? { ...todo, deleted: false }
                      : todo
                  ),
                }
              : list
          ),
        };
      }

      if (action.undoType === actionTypes.REMOVE_LIST) {
        return {
          ...state,
          lists: state.lists.map((list) =>
            list.id === action.payload.listId
              ? { ...list, deleted: false }
              : list
          ),
        };
      }

      return state;

    default:
      return state;
  }
};

export const TodoProvider: React.FC<{
  children: ReactNode;
}> = ({ children }) => {
  const [state, dispatch] = useReducer(
    todoReducer,
    initialState
  );

  // Логика для сохранения данных в localStorage при изменении списков
  useEffect(() => {
    const savedLists = localStorage.getItem("lists");
    if (savedLists) {
      dispatch({
        type: actionTypes.RESTORE_LISTS,
        payload: { lists: JSON.parse(savedLists) },
      });
    }

    const savedActiveListId =
      localStorage.getItem("activeListId");
    if (savedActiveListId) {
      dispatch({
        type: actionTypes.SWITCH_LIST,
        payload: { listId: Number(savedActiveListId) },
      });
    }
  }, []);

  useEffect(() => {
    const filteredLists = lists
      .filter((list) => !list.deleted)
      .map((list) => ({
        ...list,
        todos: list.todos.filter((todo) => !todo.deleted),
      }));

    localStorage.setItem(
      "lists",
      JSON.stringify(filteredLists)
    );
  }, [lists]);

  useEffect(() => {
    localStorage.setItem(
      "activeListId",
      String(activeListId)
    );
  }, [activeListId]);

  const activeList = lists.find(
    (list) => list.id === activeListId
  );

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
                todo.id === id
                  ? { ...todo, completed: !todo.completed }
                  : todo
              ),
            }
          : list
      )
    );
  };

  const removeTask = (id: number) => {
    const taskToRemove = activeList?.todos.find(
      (todo) => todo.id === id
    );
    if (!taskToRemove) return;

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === id
                  ? { ...todo, deleted: true }
                  : todo
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
                todo.id === id
                  ? { ...todo, deleted: false }
                  : todo
              ),
            }
          : list
      )
    );

    handleCloseSnackbar();
  };

  const clearCompletedTodos = () => {
    if (!activeList) return;

    const completedTodos = activeList.todos.filter(
      (todo) => todo.completed
    );
    if (completedTodos.length === 0) return;

    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.completed
                  ? { ...todo, deleted: true }
                  : todo
              ),
            }
          : list
      )
    );

    handleCloseSnackbar();
    showSnackbar(
      "all completed tasks deleted",
      undoClearCompleted
    );
  };

  const undoClearCompleted = () => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.completed
                  ? { ...todo, deleted: false }
                  : todo
              ),
            }
          : list
      )
    );

    handleCloseSnackbar();
  };

  const updateTodo = (
    id: number,
    updates: Partial<Todo>
  ) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === activeListId
          ? {
              ...list,
              todos: list.todos.map((todo) =>
                todo.id === id
                  ? { ...todo, ...updates }
                  : todo
              ),
            }
          : list
      )
    );
  };

  const sortTodos = (
    type: "important" | "date",
    order: "asc" | "desc"
  ) => {
    setLists((prevLists) =>
      prevLists.map((list) => {
        if (list.id !== activeListId) return list;

        const activeTodos = list.todos.filter(
          (todo) => !todo.completed
        );
        const completedTodos = list.todos.filter(
          (todo) => todo.completed
        );

        const sortFunction = (a: Todo, b: Todo) => {
          let comparison = 0;
          if (type === "important") {
            comparison =
              Number(a.important) - Number(b.important);
          } else if (type === "date") {
            comparison = a.id - b.id;
          }
          return order === "asc" ? comparison : -comparison;
        };

        const sortedActiveTodos =
          activeTodos.sort(sortFunction);

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
        list.id === activeListId
          ? { ...list, todos: [...newOrder] }
          : list
      )
    );
  };

  const addList = (name: string) => {
    const newList: List = {
      id: Date.now(),
      name,
      todos: [],
      deleted: false,
    };
    setLists((prevLists) => [...prevLists, newList]);
    setActiveListId(newList.id);
  };

  const removeList = (listId: number) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, deleted: true }
          : list
      )
    );

    setActiveListId(1);
    handleCloseSnackbar();
    showSnackbar("list deleted", () => restoreList(listId));
  };

  const restoreList = (listId: number) => {
    setLists((prevLists) =>
      prevLists.map((list) =>
        list.id === listId
          ? { ...list, deleted: false }
          : list
      )
    );

    setActiveListId(listId);
    handleCloseSnackbar();
  };

  const switchList = (listId: number) => {
    setActiveListId(listId);
  };

  const showSnackbar = (
    message: string,
    action?: () => void
  ) => {
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
    throw new Error(
      "useTodo must be used within a TodoProvider"
    );
  }
  return context;
};
