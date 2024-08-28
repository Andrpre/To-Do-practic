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
import { Todo } from "../../App";
import { useForm } from "react-hook-form";
import { useTodo } from "../../utils/TodoContext";
import ImportantLabel from "../important-label/ImportantLabel";

interface ITodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<ITodoItemProps> = ({ todo }) => {
  const { toggleComplete, removeTask } = useTodo();
  const { control } = useForm({
    defaultValues: {
      important: todo.important,
    },
  });
  return (
    <ListItem
      disableGutters={true}
      disablePadding={true}
      className={style["tasks-item"]}
      secondaryAction={
        <>
          <ImportantLabel
            control={control}
            todoId={todo.id}
            inTask={true}
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
                sx={{
                  color: todo.important
                    ? "var(--important-color)"
                    : "var(--main-color)",
                }}
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
            textDecoration: todo.completed
              ? "line-through"
              : "none",
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
