import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  IconButton,
  Tooltip,
  Zoom,
  FormControl,
  Select,
  MenuItem,
  Box,
  Chip,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import ExpandCircleDownIcon from "@mui/icons-material/ExpandCircleDown";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import style from "./style.module.scss";
import { TodoPriority } from "../../App";

interface AddTodoProps {
  addTodo: (text: string, priority: TodoPriority) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const { handleSubmit, control, reset, watch } = useForm({
    defaultValues: {
      text: "",
      priority: TodoPriority.NO_PRIORITY,
    },
  });

  const onSubmit = (data: {
    text: string;
    priority: TodoPriority;
  }) => {
    addTodo(data.text, data.priority);
    reset(); // сброс формы после отправки
  };

  const isEmpty = watch("text").trim().length === 0;

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.form}
    >
      <Box className={style["form__add-task"]}>
        <Controller
          name="text"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              size="small"
              color="info"
              className={style.form__input}
              autoFocus={true}
              placeholder="Add new task"
              fullWidth
            />
          )}
        />
        {!isEmpty && (
          <Tooltip
            title="Добавить задачу"
            placement="right"
            TransitionComponent={Zoom}
            arrow
          >
            <IconButton
              type="submit"
              className={style.form__button}
              disabled={isEmpty}
              color="primary"
              sx={{
                backgroundColor: "var(--main-color)",
                color: "var(--main-bg)",
                borderRadius: "var(--main-radius)",
              }}
              children={<KeyboardReturnIcon />}
            />
          </Tooltip>
        )}
      </Box>
      <Box className={style.form__options}>
        <FormControl size="small">
          <Controller
            name="priority"
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
                displayEmpty
                inputProps={{
                  "aria-label": "Without label",
                }}
                IconComponent={ExpandCircleDownIcon}
                sx={{ height: "40px", minWidth: "120px" }}
              >
                <MenuItem value={TodoPriority.NO_PRIORITY}>
                  {TodoPriority.NO_PRIORITY}
                </MenuItem>
                <MenuItem value={TodoPriority.LOW}>
                  <Chip
                    sx={{ backgroundColor: "#9EFFA3" }}
                    label={TodoPriority.LOW}
                  />
                </MenuItem>
                <MenuItem value={TodoPriority.MEDIUM}>
                  <Chip
                    sx={{ backgroundColor: "#C3BEFF" }}
                    label={TodoPriority.MEDIUM}
                  />
                </MenuItem>
                <MenuItem value={TodoPriority.HIGH}>
                  <Chip
                    sx={{ backgroundColor: "#FAFFA2" }}
                    label={TodoPriority.HIGH}
                  />
                </MenuItem>
                <MenuItem value={TodoPriority.URGENT}>
                  <Chip
                    icon={
                      <LocalFireDepartmentIcon color="error" />
                    }
                    sx={{ backgroundColor: "#FFA2A2" }}
                    label={TodoPriority.URGENT}
                  />
                </MenuItem>
              </Select>
            )}
          />
        </FormControl>
      </Box>
    </form>
  );
};

export default AddTodo;
