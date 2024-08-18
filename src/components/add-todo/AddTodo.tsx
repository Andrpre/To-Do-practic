import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  IconButton,
  Tooltip,
  Zoom,
  Box,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import style from "./style.module.scss";
import { TodoPriority } from "../../App";
import { useTodo } from "../../utils/TodoContext";
import TodoOptions from "../todo-options/TodoOptions";

const AddTodo: React.FC = () => {
  const { addTask } = useTodo();
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
    addTask(data.text, data.priority);
    reset();
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
            title="add task"
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
      <TodoOptions control={control} />
    </form>
  );
};

export default AddTodo;
