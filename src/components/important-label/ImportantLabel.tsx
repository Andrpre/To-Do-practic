import { ToggleButton, Tooltip, Zoom } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { Controller } from "react-hook-form";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";
import clsx from "clsx";

interface IImportantLabel {
  control: any;
  todoId?: number;
  inTask?: boolean;
}

const ImportantLabel: React.FC<IImportantLabel> = ({
  control,
  todoId,
  inTask = false,
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
          todoId &&
            updateTodo(todoId, {
              important: newValue,
            });
        };

        return (
          <Tooltip
            title="mark important"
            placement={inTask ? "left" : "top"}
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
                  ? clsx(
                      style.important,
                      style["important-compact"]
                    )
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
