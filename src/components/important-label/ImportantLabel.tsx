import { MenuItem, ToggleButton, Tooltip, Zoom } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { Controller } from "react-hook-form";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";
import clsx from "clsx";
import { Todo } from "../../types/types";

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

  return (
    <Controller
      name="important"
      control={control}
      render={({ field }) => {
        const handleToggle = () => {
          const newValue = !field.value; // Используем значение из формы
          field.onChange(newValue); // Изменяем значение через react-hook-form
          todo?.id &&
            updateTodo(todo.id, {
              important: newValue,
            });
          // Закрываем меню после клика
          if (onClose) {
            onClose();
          }
        };

        return inTask ? (
          <MenuItem
            {...field}
            value={field.value}
            sx={{
              color: "var(--main-color)",
            }}
            onClick={handleToggle}
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
              onChange={handleToggle}
              sx={
                inTask
                  ? {
                      borderRadius: "50%",
                    }
                  : {
                      backgroundColor: "var(--main-bg)",
                      "&.Mui-selected": {
                        backgroundColor: "var(--main-bg)",
                      },
                    }
              }
              className={
                inTask
                  ? clsx(style.important, style["important-compact"])
                  : style.important
              }
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
