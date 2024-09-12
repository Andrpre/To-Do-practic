export interface Todo {
  id: number;
  text: string;
  important: boolean;
  completed: boolean;
  deleted: boolean;
}

export interface List {
  id: number;
  name: string;
  todos: Todo[];
  deleted: boolean;
}

interface Snackbar {
  open: boolean;
  message: string;
  key: number;
  undoAction: () => void;
}

export interface TodoState {
  lists: List[];
  activeListId: number;
  snackbar: Snackbar;
}

export type TodoAction =
  | { type: "ADD_TASK"; text: string; important: boolean }
  | { type: "REMOVE_TASK"; id: number }
  | { type: "TOGGLE_COMPLETE"; id: number }
  | { type: "CLEAR_COMPLETED_TODOS" }
  | { type: "UNDO_CLEAR_COMPLETED" }
  | { type: "UPDATE_TODO"; id: number; updates: Partial<Todo> }
  | { type: "UPDATE_TODOS_ORDER"; newOrder: Todo[] }
  | { type: "ADD_LIST"; name: string }
  | { type: "REMOVE_LIST"; id: number }
  | { type: "RESTORE_LIST"; id: number }
  | { type: "RESTORE_TASK"; id: number }
  | { type: "SWITCH_LIST"; id: number }
  | { type: "LOAD_LISTS"; lists: List[] }
  | { type: "SHOW_SNACKBAR"; message: string; action: () => void }
  | { type: "CLOSE_SNACKBAR" };

export interface TodoContextType {
  lists: List[];
  activeListId: number;
  addTask: (text: string, important: boolean) => void;
  removeTask: (id: number) => void;
  toggleComplete: (id: number) => void;
  clearCompletedTodos: () => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
  updateTodosOrder: (newOrder: Todo[]) => void;
  addList: (name: string) => void;
  removeList: (listId: number) => void;
  switchList: (listId: number) => void;
}

export interface IFormInput {
  text: string;
  important: boolean;
}