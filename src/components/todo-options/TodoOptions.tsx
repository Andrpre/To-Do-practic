import { useForm } from "react-hook-form";
import { useTodo } from "../../utils/TodoContext";
import { Todo } from "../../App";
import {
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useState } from "react";

import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";
import ImportantLabel from "../important-label/ImportantLabel";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";

interface ITodoOptions {
  todo: Todo;
}

const TodoOptions: React.FC<ITodoOptions> = ({ todo }) => {
  const { removeTask } = useTodo();
  const { control } = useForm({
    defaultValues: {
      important: todo.important,
    },
  });

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const openOptions = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Tooltip
        title="options"
        placement="right"
        TransitionComponent={Zoom}
        arrow
      >
        <IconButton
          size="large"
          aria-label="options"
          id="todo-button-options"
          aria-controls={openOptions ? "todo-menu-options" : undefined}
          aria-haspopup="true"
          aria-expanded={openOptions ? "true" : undefined}
          onClick={handleClick}
          sx={{
            color: todo.important
              ? "var(--important-color)"
              : "var(--main-color)",
          }}
        >
          <MoreVertRoundedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="todo-menu-options"
        anchorEl={anchorEl}
        open={openOptions}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "todo-button-options",
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
        <ImportantLabel
          control={control}
          todo={todo}
          inTask={true}
          onClose={handleClose}
        />
        <Divider />
        <MenuItem
          aria-label="delete"
          onClick={() => removeTask(todo.id)}
          sx={{
            color: "var(--main-color)",
          }}
        >
          <DeleteRoundedIcon sx={{ marginRight: "7px" }} fontSize="small" />
          delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default TodoOptions;
