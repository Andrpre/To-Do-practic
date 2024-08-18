import React from "react";

import {
  ListItemText,
  IconButton,
  Checkbox,
  Tooltip,
  Zoom,
  ListItemButton,
  ListItem,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import style from "./style.module.scss";
import { Todo, TodoPriority } from "../../App";
import { useForm } from "react-hook-form";
import { useTodo } from "../../utils/TodoContext";
import Priority from "../priority/Priority";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleComplete, removeTask } =
    useTodo();
  const { control } = useForm({
    defaultValues: {
      priority: todo.priority,
    },
  });
  return (
    <ListItem
      disableGutters={true}
      disablePadding={true}
      className={style["tasks-item"]}
      sx={{
        outline:
          todo.priority === TodoPriority.URGENT
            ? "2px solid var(--urgent-priority-color)"
            : "",
        outlineOffset: "-2px",
      }}
      secondaryAction={
        <>
          <Priority
            control={control}
            todoId={todo.id}
            isCompact={true}
          />
          <Tooltip
            title="delete task"
            placement="right"
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton
              edge="end"
              aria-label="delete"
              onClick={() => removeTask(todo.id)}
            >
              <CloseIcon
                sx={{ color: "var(--main-color)" }}
              />
            </IconButton>
          </Tooltip>
        </>
      }
    >
      <ListItemButton
        dense={true}
        onClick={() => toggleComplete(todo.id)}
        sx={{ paddingRight: "80px !important" }}
      >
        <Checkbox
          checked={todo.completed}
          disableRipple
          edge="start"
          icon={
            <RadioButtonUncheckedIcon
              sx={{ color: "var(--main-color)" }}
            />
          }
          checkedIcon={
            <RadioButtonCheckedIcon
              sx={{ color: "var(--main-color)" }}
            />
          }
        />
        <ListItemText
          primary={todo.text}
          sx={{
            textDecoration: todo.completed
              ? "line-through"
              : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
