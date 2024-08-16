import React, { useState } from "react";
import Header from "./components/header/Header";
import TodoList from "./components/todo-list/TodoList";
import AddTodo from "./components/add-todo/AddTodo";
import "./styles/App.scss";

export interface Todo {
  id: number;
  text: string;
  priority: TodoPriority;
  completed: boolean;
}

export enum TodoPriority {
  NO_PRIORITY = "no priority",
  LOW = "low",
  MEDIUM = "medium",
  HIGH = "high",
  URGENT = "urgent",
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const addTodo = (
    text: string,
    priority: TodoPriority
  ) => {
    const newTodo: Todo = {
      id: Date.now(),
      text,
      priority,
      completed: false,
    };
    setTodos([...todos, newTodo]);
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

  const removeTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompletedTodos = () => {
    setTodos(
      todos.filter((todo) => todo.completed !== true)
    );
  };

  return (
    <div className="container">
      <Header />
      <section className="main">
        <AddTodo addTodo={addTodo} />
        <TodoList
          todos={todos}
          toggleComplete={toggleComplete}
          removeTodo={removeTodo}
          clearCompletedTodos={clearCompletedTodos}
        />
      </section>
    </div>
  );
};

export default App;
