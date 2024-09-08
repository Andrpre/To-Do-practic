// src/reducer/todoReducer.ts
import { List, Todo } from "../types/types";

// Описание типов экшенов
type Action =
  | { type: "ADD_TASK"; text: string; important: boolean }
  | { type: "REMOVE_TASK"; id: number }
  | { type: "TOGGLE_COMPLETE"; id: number }
  | { type: "CLEAR_COMPLETED_TODOS" }
  | { type: "UNDO_CLEAR_COMPLETED" }
  | { type: "UPDATE_TODO"; id: number; updates: Partial<Todo> }
  | { type: "SORT_TODOS"; sortBy: "important" | "date"; order: "asc" | "desc" }
  | { type: "UPDATE_TODOS_ORDER"; newOrder: Todo[] }
  | { type: "ADD_LIST"; name: string }
  | { type: "REMOVE_LIST"; id: number }
  | { type: "RESTORE_LIST"; id: number }
  | { type: "RESTORE_TASK"; id: number }
  | { type: "SWITCH_LIST"; id: number }
  | { type: "LOAD_LISTS"; lists: List[] };

// Начальное состояние
export const initialState = {
  lists: [
    { id: 1, name: "main", todos: [], deleted: false },
  ],
  activeListId: 1,
};

// Редуктор
export const todoReducer = (state: typeof initialState, action: Action) => {
  switch (action.type) {
    case "ADD_TASK":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: [
                  { id: Date.now(), text: action.text, important: action.important, completed: false, deleted: false },
                  ...list.todos,
                ],
              }
            : list
        ),
      };

    case "REMOVE_TASK":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.id ? { ...todo, deleted: true } : todo
                ),
              }
            : list
        ),
      };

    case "TOGGLE_COMPLETE":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
                ),
              }
            : list
        ),
      };

    case "CLEAR_COMPLETED_TODOS":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.completed ? { ...todo, deleted: true } : todo
                ),
              }
            : list
        ),
      };

    case "UNDO_CLEAR_COMPLETED":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.deleted ? { ...todo, deleted: false } : todo
                ),
              }
            : list
        ),
      };

    case "UPDATE_TODO":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.id ? { ...todo, ...action.updates } : todo
                ),
              }
            : list
        ),
      };

    case "SORT_TODOS":
      return {
        ...state,
        lists: state.lists.map((list) => {
          if (list.id !== state.activeListId) return list;

          const activeTodos = list.todos.filter((todo) => !todo.completed);
          const completedTodos = list.todos.filter((todo) => todo.completed);

          const sortFunction = (a: Todo, b: Todo) => {
            let comparison = 0;
            if (action.sortBy === "important") {
              comparison = Number(a.important) - Number(b.important);
            } else if (action.sortBy === "date") {
              comparison = a.id - b.id;
            }
            return action.order === "asc" ? comparison : -comparison;
          };

          const sortedActiveTodos = activeTodos.sort(sortFunction);

          return {
            ...list,
            todos: [...sortedActiveTodos, ...completedTodos],
          };
        }),
      };

    case "UPDATE_TODOS_ORDER":
      return {
        ...state,
        lists: state.lists.map((list) =>
          list.id === state.activeListId ? { ...list, todos: [...action.newOrder] } : list
        ),
      };

    case "ADD_LIST":
      return {
        ...state,
        lists: [
          ...state.lists,
          { id: Date.now(), name: action.name, todos: [], deleted: false },
        ],
        activeListId: Date.now(),
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
        lists: state.lists.map((list) =>
          list.id === state.activeListId
            ? {
                ...list,
                todos: list.todos.map((todo) =>
                  todo.id === action.id ? { ...todo, deleted: false } : todo
                ),
              }
            : list
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

    default:
      return state;
  }
};
