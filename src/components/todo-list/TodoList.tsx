import React, { useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Link,
  List,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TodoItem from "../todo-Item/TodoItem";
import style from "./style.module.scss";
import Player from "lottie-react";
import animationData from "../../lotties/all-tasks-completed.json";
import { useTodo } from "../../utils/TodoContext";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

const TodoList: React.FC = () => {
  const { lists, activeListId, clearCompletedTodos, updateTodosOrder } =
    useTodo();
  // Состояние для управления раскрытием Accordion
  const [expanded, setExpanded] = useState<boolean>(false);

  const activeList = lists.find((list) => list.id === activeListId);

  const currentTodos = activeList?.todos.filter(
    (task) => !task.completed && !task.deleted
  );
  const completedTodos = activeList?.todos.filter(
    (task) => task.completed && !task.deleted
  );

  // Обрабатываем перетаскивание только активных задач
  const handleDragDrop = (results: DropResult) => {
    const { source, destination } = results;

    if (!destination || source.index === destination.index) return;

    // Создаем новый массив только для активных задач
    const todos = [...(currentTodos || [])];

    // Меняем порядок активных задач
    const [reorderedTask] = todos.splice(source.index, 1);
    todos.splice(destination.index, 0, reorderedTask);

    // Обновляем массив в глобальном состоянии
    const reorderedTodos = [
      ...todos, // Сначала активные
      ...(activeList?.todos.filter((task) => task.completed) || []), // Завершенные остаются на месте
    ];

    updateTodosOrder(reorderedTodos);
  };

  const toggleAccordion = () => {
    setExpanded((prev) => !prev);
  };

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
              {currentTodos?.length ? (
                currentTodos?.map((todo, index) => (
                  <Draggable
                    draggableId={String(todo.id)}
                    key={todo.id}
                    index={index}
                  >
                    {(provided) => (
                      <Box
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
                <Box className={style["all-tasks-completed"]}>
                  <Player
                    autoplay
                    loop={false}
                    animationData={animationData}
                    style={{ width: "20px" }}
                  />
                  <Typography variant="body2">all tasks completed</Typography>
                </Box>
              )}
              {provided.placeholder}
            </List>
          )}
        </Droppable>
      </DragDropContext>

      {completedTodos?.length !== 0 && (
        <Box className={style.completed}>
          <Accordion
            className={style.completed__tasks}
            disableGutters
            sx={{
              backgroundColor: "transparent",
              boxShadow: "none",
            }}
            expanded={expanded}
            onChange={toggleAccordion}
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
                {completedTodos?.length} completed
              </AccordionSummary>
              {expanded && (
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
              )}
            </Box>
            <AccordionDetails
              sx={{
                padding: 0,
              }}
            >
              <List className={style.tasks} sx={{ padding: 0 }}>
                {completedTodos?.map((todo) => (
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
