import React, { useState } from "react";
import {
  Box,
  Checkbox,
  Link,
  ListItemText,
  Tooltip,
  Typography,
  Zoom,
} from "@mui/material";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import style from "./style.module.scss";

const Header: React.FC = () => {
  const [logoDone, setLogoDone] = useState<boolean>(false);

  const handleLogoClick = () => {
    setLogoDone((prev) => !prev);
  };

  return (
    <section className={style.header}>
      <Tooltip
        disableInteractive={false}
        disableFocusListener={true}
        open={logoDone}
        title={
          <Link
            href="https://t.me/Andrpre"
            color="inherit"
            variant="body2"
            sx={{ fontWeight: 400 }}
            target="_blank"
          >
            @Andrpre
          </Link>
        }
        placement="right"
        TransitionComponent={Zoom}
        arrow
      >
        <Box className={style.logo} onClick={handleLogoClick}>
          <Checkbox
            checked={logoDone}
            disableRipple
            icon={
              <RadioButtonUncheckedIcon sx={{ color: "var(--text-color)" }} />
            }
            checkedIcon={
              <RadioButtonCheckedIcon sx={{ color: "var(--text-color)" }} />
            }
          />
          <ListItemText
            primary={
              <Typography
                className={style.logo__text}
                sx={{
                  fontSize: "24px",
                  textDecoration: logoDone ? "line-through" : "none",
                }}
              >
                To-Do practic
              </Typography>
            }
            sx={{
              textDecoration: logoDone ? "line-through" : "none",
            }}
          />
        </Box>
      </Tooltip>
    </section>
  );
};

export default Header;
