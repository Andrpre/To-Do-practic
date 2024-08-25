import { FormControl, ToggleButton } from "@mui/material";

import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";

import { Controller } from "react-hook-form";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";
import { useState } from "react";

interface IImportantLabel {
  control: any;
  todoId?: number;
  isCompact?: boolean;
}

const ImportantLabel: React.FC<IImportantLabel> = ({
  control,
  todoId,
  isCompact = false,
}) => {
  const { updateTodo } = useTodo();
  const [selected, setSelected] = useState(false);

  return (
    <FormControl size="small">
      <Controller
        name="important"
        control={control}
        render={({ field }) => (
          <ToggleButton
            {...field}
            value={field.value}
            selected={selected}
            onChange={() => {
              setSelected(!selected);
            }}
            // className={
            //   isCompact ? style["important-compact"] : ""
            // }
            className={style["important-compact"]}
          >
            <LocalFireDepartmentIcon />
          </ToggleButton>
        )}
      />
    </FormControl>
  );
};

export default ImportantLabel;
