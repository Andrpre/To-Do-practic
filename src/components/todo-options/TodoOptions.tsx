import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Zoom,
} from "@mui/material";
import React, { useState } from "react";
import { Control } from "react-hook-form";

import TuneIcon from "@mui/icons-material/Tune";

import SortTodos from "../sort-todos/SortTodos";
import style from "./style.module.scss";
import { TodoPriority } from "../../App";
import { useTodo } from "../../utils/TodoContext";
import Priority from "../priority/Priority";

interface TodoOptionsProps {
  control: Control<{
    text: string;
    priority: TodoPriority;
  }>;
}

const TodoOptions: React.FC<TodoOptionsProps> = ({
  control,
}) => {
  const { todos } = useTodo();
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const openOptions = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const hasActiveTasks =
    todos.filter((todo) => !todo.completed).length > 1;

  return (
    <Box className={style.options}>
      <Tooltip
        title="options"
        placement="top"
        TransitionComponent={Zoom}
        arrow
      >
        <IconButton
          sx={{
            backgroundColor: "var(--main-bg)",
            borderRadius: "var(--main-radius)",
            color: "inherit",
          }}
          id="basic-button-options"
          aria-controls={
            openOptions ? "basic-menu-options" : undefined
          }
          aria-haspopup="true"
          aria-expanded={openOptions ? "true" : undefined}
          onClick={handleClick}
        >
          <TuneIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-options"
        anchorEl={anchorEl}
        open={openOptions}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-options",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
      <Tooltip
        title="set priority"
        placement="left"
        TransitionComponent={Zoom}
        arrow
      >
        <MenuItem disableGutters={true}>
          <Priority control={control} />
        </MenuItem>
        </Tooltip>
      </Menu>
      {hasActiveTasks && <SortTodos />}
    </Box>
  );
};

export default TodoOptions;
