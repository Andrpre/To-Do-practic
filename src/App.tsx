import Header from "./components/header/Header";
import TodoList from "./components/todo-list/TodoList";
import AddTodo from "./components/add-todo/AddTodo";
import "./styles/App.scss";
import { TodoProvider } from "./utils/TodoContext";
import { Box } from "@mui/material";

export interface Todo {
  id: number;
  text: string;
  important: boolean;
  completed: boolean;
  deleted: boolean;
}

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Box className="container">
        <Header />
        <Box component="section" className="main">
          <AddTodo />
          <TodoList />
        </Box>
      </Box>
    </TodoProvider>
  );
};

export default App;
