import {
  Select,
  MenuItem,
  Chip,
  FormControl,
  Tooltip,
  IconButton,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
import KeyboardCapslockIcon from "@mui/icons-material/KeyboardCapslock";
import RemoveIcon from "@mui/icons-material/Remove";

import { Controller } from "react-hook-form";
import { TodoPriority } from "../../App";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";

interface IPriorityProps {
  control: any;
  todoId?: number;
  isCompact?: boolean;
}

const Priority: React.FC<IPriorityProps> = ({
  control,
  todoId,
  isCompact = false,
}) => {
  const { updateTodo } = useTodo();
  return (
    <FormControl size="small">
      <Controller
        name="priority"
        control={control}
        render={({ field }) => (
          <Select
            {...field}
            value={field.value}
            onChange={(e) => {
              const value = e.target.value as TodoPriority;
              field.onChange(value);
              todoId &&
                updateTodo(todoId, {
                  priority: e.target.value as TodoPriority,
                });
            }}
            displayEmpty
            inputProps={{
              "aria-label": "Without label",
              IconComponent: isCompact
                ? () => null
                : ExpandMoreIcon,
              sx: {
                padding: isCompact ? "0 !important" : "8px",
              },
            }}
            className={
              isCompact
                ? style["priority-compact"]
                : style.priority
            }
          >
            <MenuItem value={TodoPriority.NO_PRIORITY}>
              {isCompact ? (
                <Tooltip
                  title="no priority"
                  placement="left"
                  arrow
                >
                  <IconButton>
                    <RemoveIcon />
                  </IconButton>
                </Tooltip>
              ) : (
                <Chip
                  icon={<RemoveIcon fontSize="small" />}
                  label={TodoPriority.NO_PRIORITY}
                />
              )}
            </MenuItem>

            <MenuItem value={TodoPriority.LOW}>
              {isCompact ? (
                <Tooltip title="low" placement="left" arrow>
                  <IconButton>
                    <ExpandMoreIcon
                      className={
                        style[
                          `priority-compact-${TodoPriority.LOW}`
                        ]
                      }
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Chip
                  sx={{
                    backgroundColor:
                      "var(--low-priority-bg)",
                    color: "var(--low-priority-color)",
                  }}
                  icon={<ExpandMoreIcon fontSize="small"/>}
                  label={TodoPriority.LOW}
                />
              )}
            </MenuItem>

            <MenuItem value={TodoPriority.MEDIUM}>
              {isCompact ? (
                <Tooltip
                  title="medium"
                  placement="left"
                  arrow
                >
                  <IconButton>
                    <KeyboardCapslockIcon
                      className={
                        style[
                          `priority-compact-${TodoPriority.MEDIUM}`
                        ]
                      }
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Chip
                  sx={{
                    backgroundColor:
                      "var(--medium-priority-bg)",
                    color: "var(--medium-priority-color)",
                  }}
                  icon={<KeyboardCapslockIcon fontSize="small"/>}
                  label={TodoPriority.MEDIUM}
                />
              )}
            </MenuItem>

            <MenuItem value={TodoPriority.HIGH}>
              {isCompact ? (
                <Tooltip
                  title="high"
                  placement="left"
                  arrow
                >
                  <IconButton>
                    <KeyboardDoubleArrowUpIcon
                      className={
                        style[
                          `priority-compact-${TodoPriority.HIGH}`
                        ]
                      }
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Chip
                  sx={{
                    backgroundColor:
                      "var(--high-priority-bg)",
                    color: "var(--high-priority-color)",
                  }}
                  icon={<KeyboardDoubleArrowUpIcon fontSize="small"/>}
                  label={TodoPriority.HIGH}
                />
              )}
            </MenuItem>

            <MenuItem value={TodoPriority.URGENT}>
              {isCompact ? (
                <Tooltip
                  title="urgent"
                  placement="left"
                  arrow
                >
                  <IconButton>
                    <LocalFireDepartmentIcon
                      className={
                        style[
                          `priority-compact-${TodoPriority.URGENT}`
                        ]
                      }
                    />
                  </IconButton>
                </Tooltip>
              ) : (
                <Chip
                  sx={{
                    backgroundColor:
                      "var(--urgent-priority-bg)",
                    color: "var(--urgent-priority-color)",
                  }}
                  icon={<LocalFireDepartmentIcon fontSize="small"/>}
                  label={TodoPriority.URGENT}
                />
              )}
            </MenuItem>
          </Select>
        )}
      />
    </FormControl>
  );
};

export default Priority;
