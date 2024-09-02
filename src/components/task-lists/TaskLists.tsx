import {
  Chip,
  IconButton,
  ListItem,
  Stack,
  Tooltip,
  Zoom,
} from "@mui/material";
import { useTodo } from "../../utils/TodoContext";
import style from "./style.module.scss";

import ClearRoundedIcon from "@mui/icons-material/ClearRounded";
import AddRoundedIcon from "@mui/icons-material/AddRounded";

const TaskLists: React.FC = () => {
  const { lists, activeListId, switchList, addList, removeList } = useTodo();
  const visibleLists = lists.filter((list) => !list.deleted);

  return (
    <Stack direction="row" component="ul" className={style.lists}>
      {visibleLists.map((list) => (
        <ListItem
          key={list.id}
          className={style.lists__item}
          sx={{ width: "auto", padding: "0" }}
        >
          <Chip
            label={list.name}
            onClick={
              list.id === activeListId ? undefined : () => switchList(list.id)
            }
            onDelete={list.id === 1 ? undefined : () => removeList(list.id)}
            sx={
              list.id === activeListId
                ? {
                    outline: "2px solid var(--main-color)",
                    color: "var(--main-color)",
                  }
                : {
                    "&:hover": {
                      backgroundColor: "var(--main-bg)",
                      filter: "brightness(95%)",
                    },
                  }
            }
            deleteIcon={
              <Tooltip
                title="delete list"
                placement="top"
                TransitionComponent={Zoom}
                arrow
              >
                <ClearRoundedIcon />
              </Tooltip>
            }
          />
        </ListItem>
      ))}
      <Tooltip
        title="add new list"
        placement="top"
        TransitionComponent={Zoom}
        arrow
      >
        <IconButton
          aria-label="add new list"
          sx={{
            backgroundColor: "var(--main-color)",
            color: "var(--main-bg)",
            "&:hover": {
              backgroundColor: "var(--main-color)",
              filter: "brightness(90%)",
            },
          }}
          onClick={() => addList(prompt("Enter new list name") || "New List")}
        >
          <AddRoundedIcon />
        </IconButton>
      </Tooltip>
    </Stack>
  );
};

export default TaskLists;
