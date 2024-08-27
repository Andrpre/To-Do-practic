import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
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

const TodoList: React.FC = () => {
  const { todos, clearCompletedTodos, updateTodosOrder } =
    useTodo();

  // Обрабатываем перетаскивание только активных задач
  const handleDragDrop = (results: DropResult) => {
    const { source, destination } = results;

    if (!destination) return;
    if (source.index === destination.index) return;

    // Создаем новый массив только для активных задач
    const currentTodos = todos.filter(
      (task) => !task.completed
    );

    // Меняем порядок активных задач
    const [reorderedTask] = currentTodos.splice(
      source.index,
      1
    );
    currentTodos.splice(
      destination.index,
      0,
      reorderedTask
    );

    // Обновляем массив в глобальном состоянии
    const reorderedTodos = [
      ...currentTodos, // Сначала активные
      ...todos.filter((task) => task.completed), // Завершенные остаются на месте
    ];

    updateTodosOrder(reorderedTodos);
  };

  const currentTodos = todos.filter(
    (task) => !task.completed
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
              {currentTodos.length !== 0 ? (
                currentTodos.map((todo, index) => (
                  <Draggable
                    draggableId={String(todo.id)}
                    key={todo.id}
                    index={index}
                  >
                    {(provided) => (
                      <Box
                        key={todo.id}
                        {...provided.dragHandleProps}
                        {...provided.draggableProps}
                        ref={provided.innerRef}
                      >
                        <TodoItem todo={todo} />
                      </Box>
                    )}
                  </Draggable>
                ))
              ) : (
                <Box>no one task</Box>
              )}
              {provided.placeholder}
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
