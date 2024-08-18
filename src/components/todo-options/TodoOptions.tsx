import { Box } from "@mui/material";
import React from "react";
import { Control } from "react-hook-form";

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

  const hasActiveTasks =
    todos.filter((todo) => !todo.completed).length > 1;

  return (
    <Box className={style.options}>
      <Priority control={control} />
      {hasActiveTasks && <SortTodos />}
    </Box>
  );
};

export default TodoOptions;
