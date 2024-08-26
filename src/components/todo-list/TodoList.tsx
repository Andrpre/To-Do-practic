import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Collapse,
  Link,
  List,
  Tooltip,
  Zoom,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodoItem from "../todo-Item/TodoItem";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { TransitionGroup } from "react-transition-group";

const TodoList: React.FC = () => {
  const { todos, clearCompletedTodos, updateTodosOrder } = useTodo();

  const handleDragDrop = (results: DropResult) => {
    const { source, destination, type } = results;

    if(!destination) return;
    if(source.index === destination.index) return;
    if(type === "group") {
      const reorderedTodos = [...todos];

      const [removedTask] = reorderedTodos.splice(source.index, 1);
      reorderedTodos.splice(destination.index, 0, removedTask);

      return updateTodosOrder(reorderedTodos);
    }
  }

  const currentTodos = todos.filter(
    (task) => task.completed === false
  );
  const completedTodos = todos.filter(
    (task) => task.completed
  );

  return (
    <>
      <DragDropContext onDragEnd={handleDragDrop}>
        <Droppable droppableId="ROOT" type="group">
          {(provided) => (
            <List
              className={style.tasks}
              sx={{ padding: 0 }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              <TransitionGroup component={null}>
                {currentTodos.length !== 0 ? (
                  currentTodos.map((todo, index) => (
                    <Draggable
                      draggableId={String(todo.id)}
                      key={todo.id}
                      index={index}
                    >
                      {(provided) => (
                        <Collapse
                          key={todo.id}
                          in
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <TodoItem todo={todo} />
                        </Collapse>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <Collapse component="li" in>
                    <Box>no one task</Box>
                  </Collapse>
                )}
                {provided.placeholder}
              </TransitionGroup>
            </List>
          )}
        </Droppable>
      </DragDropContext>
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
                className={style.tasks}
                sx={{ padding: 0 }}
              >
                <TransitionGroup component={null}>
                  {completedTodos.map((todo) => (
                    <Collapse key={todo.id} in>
                      <TodoItem todo={todo} />
                    </Collapse>
                  ))}
                </TransitionGroup>
              </List>
            </AccordionDetails>
          </Accordion>
        </Box>
      )}
    </>
  );
};

export default TodoList;
