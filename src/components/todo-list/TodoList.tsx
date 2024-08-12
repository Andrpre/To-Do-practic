import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  List,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodoItem from "../todo-Item/TodoItem";
import style from "./style.module.scss";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  removeTodo,
}) => {
  const currentTodos = todos.filter(
    (task) => task.completed === false
  );
  const completedTodos = todos.filter(
    (task) => task.completed === true
  );

  return (
    <>
      {currentTodos.length !== 0 ? (
        <List
          className={style["tasks"]}
          sx={{ padding: 0 }}
        >
          {currentTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              {...todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
            />
          ))}
        </List>
      ) : (
        <div>no one task</div>
      )}
      {completedTodos.length !== 0 && (
        <div>
          <Accordion
            className={style.completed}
            disableGutters={true}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <AccordionSummary
              sx={{
                padding: 0,
                minHeight: "auto",
                color: "var(--main-color)",
                justifyContent: "start",
              }}
              expandIcon={
                <ExpandMoreIcon
                  sx={{
                    color: "var(--main-color)",
                  }}
                />
              }
            >
              {completedTodos.length} completed
            </AccordionSummary>
            <AccordionDetails
              sx={{
                padding: 0,
              }}
            >
              <List
                className={style["tasks"]}
                sx={{ padding: 0 }}
              >
                {completedTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    {...todo}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                  />
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </div>
      )}
    </>
  );
};

export default TodoList;
