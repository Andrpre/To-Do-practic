import React from "react";

import {
  ListItemText,
  IconButton,
  Checkbox,
  Tooltip,
  Zoom,
  ListItemButton,
  ListItem,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";

import style from "./style.module.scss";
import { Todo, TodoPriority } from "../../App";
import { useForm, Controller } from "react-hook-form";
import { useTodo } from "../../utils/TodoContext";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const { toggleComplete, removeTask, updateTodo } =
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
          <FormControl size="small">
            <Controller
              name="priority"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  className={style["tasks-item__priority"]}
                  value={field.value}
                  onChange={(e) => {
                    field.onChange(
                      e.target.value as TodoPriority
                    );
                    updateTodo(todo.id, {
                      priority: e.target
                        .value as TodoPriority,
                    });
                  }}
                  displayEmpty
                  inputProps={{
                    "aria-label": "Without label",
                    IconComponent: () => null,
                    sx: { padding: "0 !important" },
                  }}
                >
                  <MenuItem
                    value={TodoPriority.NO_PRIORITY}
                  >
                    <Tooltip
                      title="no priority"
                      placement="left"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton>
                        <RemoveIcon
                          className={
                            style[
                              `tasks-item__priority-${TodoPriority.NO_PRIORITY}`
                            ]
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value={TodoPriority.LOW}>
                    <Tooltip
                      title="low"
                      placement="left"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton>
                        <ExpandMoreIcon
                          className={
                            style[
                              `tasks-item__priority-${TodoPriority.LOW}`
                            ]
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value={TodoPriority.MEDIUM}>
                    <Tooltip
                      title="medium"
                      placement="left"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton>
                        <KeyboardCapslockIcon
                          className={
                            style[
                              `tasks-item__priority-${TodoPriority.MEDIUM}`
                            ]
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value={TodoPriority.HIGH}>
                    <Tooltip
                      title="high"
                      placement="left"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton>
                        <KeyboardDoubleArrowUpIcon
                          className={
                            style[
                              `tasks-item__priority-${TodoPriority.HIGH}`
                            ]
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                  <MenuItem value={TodoPriority.URGENT}>
                    <Tooltip
                      title="urgent"
                      placement="left"
                      TransitionComponent={Zoom}
                      arrow
                    >
                      <IconButton>
                        <LocalFireDepartmentIcon
                          className={
                            style[
                              `tasks-item__priority-${TodoPriority.URGENT}`
                            ]
                          }
                        />
                      </IconButton>
                    </Tooltip>
                  </MenuItem>
                </Select>
              )}
            />
          </FormControl>
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
