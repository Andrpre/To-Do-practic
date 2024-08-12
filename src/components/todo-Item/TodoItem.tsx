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

interface TodoItemProps {
  id: number;
  text: string;
  completed: boolean;
  toggleComplete: (id: number) => void;
  removeTodo: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  toggleComplete,
  removeTodo,
}) => {
  return (
    <ListItem
      disableGutters={true}
      className={style["tasks-item"]}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={() => removeTodo(id)}
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
      }
      disablePadding
    >
      <ListItemButton
        dense={true}
        onClick={() => toggleComplete(id)}
      >
        <Checkbox
          checked={completed}
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
          primary={text}
          sx={{
            textDecoration: completed
              ? "line-through"
              : "none",
          }}
        />
      </ListItemButton>
    </ListItem>
  );
};

export default TodoItem;
