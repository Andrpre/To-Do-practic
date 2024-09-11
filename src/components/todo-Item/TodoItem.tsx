import React, { useCallback } from "react";

import {
  ListItemText,
  Checkbox,
  ListItemButton,
  ListItem,
} from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import style from "./style.module.scss";
import { Todo } from "../../types/types";
import { useTodo } from "../../utils/TodoContext";
import TodoOptions from "../todo-options/TodoOptions";

interface ITodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const { toggleComplete } = useTodo();

  const handleToggleComplete = useCallback(() => {
    toggleComplete(todo.id);
  }, [todo.id, toggleComplete]);

  return (
    <ListItem
      disableGutters
      disablePadding
      className={style["tasks-item"]}
      secondaryAction={<TodoOptions todo={todo} />}
    >
      <ListItemButton
        dense
        onClick={handleToggleComplete}
        sx={{ paddingRight: "80px !important" }}
      >
        <Checkbox
          checked={todo.completed}
          disableRipple
          edge="start"
          icon={
            <RadioButtonUncheckedIcon
              sx={{
                color: todo.important
                  ? "var(--important-color)"
                  : "var(--main-color)",
              }}
            />
          }
          checkedIcon={
            <RadioButtonCheckedIcon
              sx={{
                color: todo.important
                  ? "var(--important-color)"
                  : "var(--main-color)",
              }}
            />
          }
        />
        <ListItemText
          disableTypography
          sx={{
            textDecoration: todo.completed ? "line-through" : "none",
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: todo.important
              ? "var(--important-color)"
              : "var(--main-color)",
          }}
        >
          {todo.text}
        </ListItemText>
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
