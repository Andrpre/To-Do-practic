import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  TextField,
  IconButton,
  Tooltip,
  Zoom,
  Box,
  FormControl,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
import style from "./style.module.scss";
import { TodoPriority } from "../../App";
import { useTodo } from "../../utils/TodoContext";
import TodoOptions from "../todo-options/TodoOptions";
import ImportantLabel from "../important-label/ImportantLabel";

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
    if (data.text.trim().length !== 0) {
      addTask(data.text, data.priority);
      reset();
    }
  };

  const isEmpty = watch("text").trim().length === 0;

  return (
    <FormControl
      component="form"
      size="small"
      required={true}
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
        <ImportantLabel control={control} />
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
    </FormControl>
  );
};

export default AddTodo;
