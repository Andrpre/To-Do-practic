import { MenuItem, ToggleButton, Tooltip, Zoom } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { Controller } from "react-hook-form";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";
import { Todo } from "../../types/types";
import { useCallback } from "react";

interface IImportantLabel {
  control: any;
  todo?: Todo;
  inTask?: boolean;
  onClose?: () => void;
}

const ImportantLabel: React.FC<IImportantLabel> = ({
  control,
  todo,
  inTask = false,
  onClose,
}) => {
  const { updateTodo } = useTodo();

  const handleToggle = useCallback(
    (value: boolean, field: any) => {
      const newValue = !value;
      field.onChange(newValue); // Изменение значения через react-hook-form
      if (todo?.id) {
        updateTodo(todo.id, { important: newValue }); // Обновляем задачу
      }
      if (onClose) onClose(); // Закрываем меню после клика
    },
    [todo, updateTodo, onClose]
  );

  return (
    <Controller
      name="important"
      control={control}
      render={({ field }) => {
        return inTask ? (
          <MenuItem
            {...field}
            value={field.value}
            sx={{
              color: "var(--main-color)",
            }}
            onClick={() => handleToggle(field.value, field)}
          >
            <LocalFireDepartmentIcon
              sx={{ marginRight: "7px" }}
              fontSize="small"
            />{" "}
            important
          </MenuItem>
        ) : (
          <Tooltip
            title="mark important"
            placement={"top"}
            TransitionComponent={Zoom}
            arrow
          >
            <ToggleButton
              {...field}
              value={field.value}
              selected={field.value}
              color="important"
              onChange={() => handleToggle(field.value, field)}
              sx={{
                backgroundColor: "var(--main-bg)",
                "&.Mui-selected": {
                  backgroundColor: "var(--main-bg)",
                },
              }}
              className={style.important}
            >
              <LocalFireDepartmentIcon />
            </ToggleButton>
          </Tooltip>
        );
      }}
    />
  );
};

export default ImportantLabel;
