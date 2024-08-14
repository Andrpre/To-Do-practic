import React, { useState } from "react";
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
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import style from "./style.module.scss";

interface AddTodoProps {
  addTodo: (text: string) => void;
}

const AddTodo: React.FC<AddTodoProps> = ({ addTodo }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      addTodo(text);
      setText("");
    }
  };

  const isEmpty = text.length === 0;

  return (
    <form onSubmit={handleSubmit} className={style.form}>
      <Box className={style["form__add-task"]}>
        <TextField
          size="small"
          color="info"
          className={style.form__input}
          value={text}
          autoFocus={true}
          onChange={(e) => setText(e.target.value)}
          placeholder="Add new task"
          fullWidth
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
          <Select
            defaultValue=""
            onChange={() => {}}
            displayEmpty
            inputProps={{ "aria-label": "Without label" }}
            IconComponent={ExpandCircleDownIcon}
            sx={{ height: "40px", minWidth: "120px" }}
          >
            <MenuItem value="">no priority</MenuItem>
            <MenuItem value={20}>
              <Chip
                sx={{ backgroundColor: "#9EFFA3" }}
                label="low"
              />
            </MenuItem>
            <MenuItem value={30}>
              <Chip
                sx={{ backgroundColor: "#C3BEFF" }}
                label="medium"
              />
            </MenuItem>
            <MenuItem value={40}>
              <Chip
                sx={{ backgroundColor: "#FAFFA2" }}
                label="high"
              />
            </MenuItem>
            <MenuItem value={50}>
              <Chip
              icon={<LocalFireDepartmentIcon color="error"/>}
                sx={{ backgroundColor: "#FFA2A2" }}
                label="urgent"
              />
            </MenuItem>
          </Select>
        </FormControl>
      </Box>
    </form>
  );
};

export default AddTodo;
