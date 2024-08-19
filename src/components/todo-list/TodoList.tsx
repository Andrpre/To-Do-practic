import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Link,
  List,
  Tooltip,
  Zoom,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";
import TodoItem from "../todo-Item/TodoItem";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";

const TodoList: React.FC = () => {
  const { todos, clearCompletedTodos } = useTodo();
  const currentTodos = todos.filter(
    (task) => task.completed === false
  );
  const completedTodos = todos.filter(
    (task) => task.completed
  );

  return (
    <>
      {currentTodos.length !== 0 ? (
        <List
          className={style["tasks"]}
          sx={{ padding: 0 }}
        >
          {currentTodos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </List>
      ) : (
        <Box>no one task</Box>
      )}
      {completedTodos.length !== 0 && (
        <Box className={style.completed}>
          <Accordion
            className={style.completed__tasks}
            disableGutters={true}
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
          >
            <Box className={style.completed__summary}>
              <AccordionSummary
                sx={{
                  padding: 0,
                  minHeight: "auto",
                  color: "var(--main-color)",
                  justifyContent: "start",
                  flex: 1,
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
              <Tooltip
                title="delete all completed tasks"
                placement="right"
                TransitionComponent={Zoom}
                arrow
              >
                <Link
                  sx={{
                    color: "var(--main-color)",
                  }}
                  component="button"
                  onClick={() => clearCompletedTodos()}
                >
                  clear all
                </Link>
              </Tooltip>
            </Box>
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
                  <TodoItem key={todo.id} todo={todo} />
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
