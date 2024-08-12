import React, { useState } from "react";
import {
  TextField,
  IconButton,
  Tooltip,
  Zoom,
} from "@mui/material";
import KeyboardReturnIcon from "@mui/icons-material/KeyboardReturn";
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
    </form>
  );
};

export default AddTodo;
