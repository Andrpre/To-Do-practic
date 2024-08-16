import React from "react";
import {
  ListItemText,
  IconButton,
  Checkbox,
  Tooltip,
  Zoom,
  ListItemButton,
  ListItem,
  Chip,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import style from "./style.module.scss";
import { Todo, TodoPriority } from "../../App";

interface TodoItemProps {
  todo: Todo;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleComplete,
  removeTodo,
}) => {
  return (
    <ListItem
      disableGutters={true}
      className={style["tasks-item"]}
      secondaryAction={
        <>
          {todo.priority !== TodoPriority.NO_PRIORITY && (
            <Chip
              sx={{ backgroundColor: "#9EFFA3" }}
              label={todo.priority}
            />
          )}
          <IconButton
            edge="end"
            aria-label="comments"
            onClick={() => removeTodo(todo.id)}
          >
            <Tooltip
              title="Удалить задачу"
              placement="right"
              TransitionComponent={Zoom}
              arrow
            >
              <CloseIcon
                sx={{ color: "var(--main-color)" }}
              />
            </Tooltip>
          </IconButton>
        </>
      }
      disablePadding
    >
      <ListItemButton
        dense={true}
        onClick={() => toggleComplete(todo.id)}
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
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
