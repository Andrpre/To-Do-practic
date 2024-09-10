import { TodoAction, TodoState, Todo, List } from "../types/types";

// Инициализация состояния из localStorage
export const initializeState = (): TodoState => {
  const savedLists = localStorage.getItem("lists");
  const savedActiveListId = localStorage.getItem("activeListId");

  return {
    lists: savedLists
      ? JSON.parse(savedLists)
      : [{ id: 1, name: "main", todos: [], deleted: false }],
    activeListId: savedActiveListId ? Number(savedActiveListId) : 1,
    snackbar: {
      open: false,
      message: "",
      key: 0,
      undoAction: () => {},
    },
  };
};

// Утилитарная функция для обновления списка
const updateList = (
  lists: List[],
  activeListId: number,
  updater: (todos: Todo[]) => Todo[]
) =>
  lists.map((list) =>
    list.id === activeListId ? { ...list, todos: updater(list.todos) } : list
  );

// Утилитарная функция для изменения конкретного todo
const updateTodo = (
  todos: Todo[],
  todoId: number,
  updater: (todo: Todo) => Todo
) => todos.map((todo) => (todo.id === todoId ? updater(todo) : todo));

export const todoReducer = (state: TodoState, action: TodoAction) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, (todos) => [
          {
            id: Date.now(),
            text: action.text,
            important: action.important,
            completed: false,
            deleted: false,
          },
          ...todos,
        ]),
      };

    case "REMOVE_TASK":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, (todos) =>
          updateTodo(todos, action.id, (todo) => ({ ...todo, deleted: true }))
        ),
      };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, (todos) =>
          updateTodo(todos, action.id, (todo) => ({
            ...todo,
            completed: !todo.completed,
          }))
        ),
      };

    case "CLEAR_COMPLETED_TODOS":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, (todos) =>
          todos.map((todo) =>
            todo.completed ? { ...todo, deleted: true } : todo
          )
        ),
      };

    case "UNDO_CLEAR_COMPLETED":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, (todos) =>
          todos.map((todo) =>
            todo.deleted && todo.deleted ? { ...todo, deleted: false } : todo
          )
        ),
      };

    case "UPDATE_TODO":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, (todos) =>
          updateTodo(todos, action.id, (todo) => ({
            ...todo,
            ...action.updates,
          }))
        ),
      };

    case "UPDATE_TODOS_ORDER":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, () => [
          ...action.newOrder,
        ]),
      };

    case "ADD_LIST":
      const newListId = Date.now();
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: newListId, name: action.name, todos: [], deleted: false },
        ],
        activeListId: newListId,
      };

    case "REMOVE_LIST":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.id ? { ...list, deleted: true } : list
        ),
        activeListId: 1,
      };

    case "RESTORE_LIST":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === action.id ? { ...list, deleted: false } : list
        ),
        activeListId: action.id,
      };

    case "RESTORE_TASK":
      return {
        ...state,
        lists: updateList(state.lists, state.activeListId, (todos) =>
          updateTodo(todos, action.id, (todo) => ({ ...todo, deleted: false }))
        ),
      };

    case "SWITCH_LIST":
      return {
        ...state,
        activeListId: action.id,
      };

    case "LOAD_LISTS":
      return {
        ...state,
        lists: action.lists,
      };

    case "SHOW_SNACKBAR":
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message,
          key: state.snackbar.key + 1,
          undoAction: action.action,
        },
      };

    case "CLOSE_SNACKBAR":
      return {
        ...state,
        snackbar: {
          ...state.snackbar,
          open: false,
        },
      };

    default:
      return state;
  }
};
