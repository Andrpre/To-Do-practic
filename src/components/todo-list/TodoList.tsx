import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  List,
  Tooltip,
  Zoom,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import TodoItem from "../todo-Item/TodoItem";
import style from "./style.module.scss";
import { Todo } from "../../App";

interface TodoListProps {
  todos: Todo[];
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
  clearCompletedTodos: () => void;
  updateTodo: (id: number, updates: Partial<Todo>) => void;
}

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleComplete,
  removeTodo,
  clearCompletedTodos,
  updateTodo,
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
              todo={todo}
              toggleComplete={toggleComplete}
              removeTodo={removeTodo}
              updateTodo={updateTodo}
            />
          ))}
        </List>
      ) : (
        <Box>no one task</Box>
      )}
      {completedTodos.length !== 0 && (
        <Box className={style.completed}>
          <Tooltip
            title="delete all completed tasks"
            placement="right"
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton
              type="button"
              className={style.completed__delete}
              sx={{
                backgroundColor: "var(--main-bg)",
                color: "var(--main-color)",
                borderRadius: "var(--main-radius)",
                position: "absolute",
                padding: "5px",
              }}
              children={<DeleteIcon fontSize="small" />}
              onClick={() => clearCompletedTodos()}
            />
          </Tooltip>
          <Accordion
            className={style.completed__tasks}
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
                    todo={todo}
                    toggleComplete={toggleComplete}
                    removeTodo={removeTodo}
                    updateTodo={updateTodo}
                  />
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </>
  );
};

export default TodoList;
