import { Box } from "@mui/material";
import Header from "./components/header/Header";
import TodoList from "./components/todo-list/TodoList";
import AddTodo from "./components/add-todo/AddTodo";
import TaskLists from "./components/task-lists/TaskLists";
import { TodoProvider } from "./utils/TodoContext";
import "./styles/App.scss";

const App: React.FC = () => {
  return (
    <TodoProvider>
      <Box className="container">
        <Header />
        <Box component="section" className="main">
          <TaskLists />
          <AddTodo />
          <TodoList />
        </Box>
      </Box>
    </TodoProvider>
  );
};

export default App;
