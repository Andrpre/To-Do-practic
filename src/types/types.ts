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

export interface TodoState {
  lists: List[];
  activeListId: number;
}

export type TodoAction =
  | { type: "ADD_TASK"; text: string; important: boolean }
  | { type: "REMOVE_TASK"; id: number }
  | { type: "TOGGLE_COMPLETE"; id: number }
  | { type: "CLEAR_COMPLETED_TODOS" }
  | {
      type: "UPDATE_TODO";
      id: number;
      updates: Partial<Todo>;
    }
  | {
      type: "SORT_TODOS";
      sortBy: "important" | "date";
      order: "asc" | "desc";
    }
  | { type: "UPDATE_TODOS_ORDER"; newOrder: Todo[] }
  | { type: "ADD_LIST"; name: string }
  | { type: "REMOVE_LIST"; id: number }
  | { type: "SWITCH_LIST"; id: number }
  | { type: "RESTORE_TASK"; id: number }
  | { type: "RESTORE_LIST"; id: number };

export interface TodoContextType {
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
