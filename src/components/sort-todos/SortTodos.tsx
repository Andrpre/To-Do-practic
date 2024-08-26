import React, { useState } from "react";
import {
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Zoom,
} from "@mui/material";
import ImportExportRoundedIcon from "@mui/icons-material/ImportExportRounded";
import SouthRoundedIcon from "@mui/icons-material/SouthRounded";
import NorthRoundedIcon from "@mui/icons-material/NorthRounded";
import style from "./style.module.scss";
import { useTodo } from "../../utils/TodoContext";

const SortTodos: React.FC = () => {
  const { sortTodos } = useTodo();
  const [anchorEl, setAnchorEl] =
    useState<null | HTMLElement>(null);

  const openSort = Boolean(anchorEl);

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortImportantDesc = () => {
    sortTodos("important", "desc");
    handleClose();
  };

  const handleSortImportantAsc = () => {
    sortTodos("important", "asc");
    handleClose();
  };

  const handleSortDateDesc = () => {
    sortTodos("date", "desc");
    handleClose();
  };

  const handleSortDateAsc = () => {
    sortTodos("date", "asc");
    handleClose();
  };

  return (
    <Box>
      <Tooltip
        title="sort"
        placement="top"
        TransitionComponent={Zoom}
        arrow
      >
        <IconButton
          className={style.sort__button}
          sx={{
            backgroundColor: "var(--main-bg)",
            borderRadius: "var(--main-radius)",
            color: "inherit",
          }}
          id="basic-button-sort"
          aria-controls={
            openSort ? "basic-menu-sort" : undefined
          }
          aria-haspopup="true"
          aria-expanded={openSort ? "true" : undefined}
          onClick={handleClick}
        >
          <ImportExportRoundedIcon />
        </IconButton>
      </Tooltip>
      <Menu
        id="basic-menu-sort"
        anchorEl={anchorEl}
        open={openSort}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button-sort",
        }}
      >
        <Tooltip
          title="important first"
          placement="right"
          TransitionComponent={Zoom}
          arrow
        >
          <MenuItem onClick={handleSortImportantDesc}>
            <ListItemIcon>
              <SouthRoundedIcon
                fontSize="small"
                sx={{ color: "var(--text-color)" }}
              />
            </ListItemIcon>
            <ListItemText>important</ListItemText>
          </MenuItem>
        </Tooltip>
        <Tooltip
          title="not important first"
          placement="right"
          TransitionComponent={Zoom}
          arrow
        >
          <MenuItem onClick={handleSortImportantAsc}>
            <ListItemIcon>
              <NorthRoundedIcon
                fontSize="small"
                sx={{ color: "var(--text-color)" }}
              />
            </ListItemIcon>
            <ListItemText>important</ListItemText>
          </MenuItem>
        </Tooltip>
        <Divider />
        <Tooltip
          title="new first"
          placement="right"
          TransitionComponent={Zoom}
          arrow
        >
          <MenuItem onClick={handleSortDateDesc}>
            <ListItemIcon>
              <SouthRoundedIcon
                fontSize="small"
                sx={{ color: "var(--text-color)" }}
              />
            </ListItemIcon>
            <ListItemText>date</ListItemText>
          </MenuItem>
        </Tooltip>
        <Tooltip
          title="old ones first"
          placement="right"
          TransitionComponent={Zoom}
          arrow
        >
          <MenuItem onClick={handleSortDateAsc}>
            <ListItemIcon>
              <NorthRoundedIcon
                fontSize="small"
                sx={{ color: "var(--text-color)" }}
              />
            </ListItemIcon>
            <ListItemText>date</ListItemText>
          </MenuItem>
        </Tooltip>
      </Menu>
    </Box>
  );
};

export default SortTodos;
