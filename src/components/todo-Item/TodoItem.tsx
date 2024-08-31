import React from "react";

import {
  ListItemText,
  Checkbox,
  ListItemButton,
  ListItem,
} from "@mui/material";

import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

import style from "./style.module.scss";
import { Todo } from "../../App";
import { useTodo } from "../../utils/TodoContext";
import TodoOptions from "../todo-options/TodoOptions";

interface ITodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const { toggleComplete } = useTodo();
  return (
    <ListItem
      disableGutters={true}
      disablePadding={true}
      className={style["tasks-item"]}
      secondaryAction={<TodoOptions todo={todo} />}
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
          disableTypography={true}
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
