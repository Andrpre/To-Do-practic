import React from "react";
import { Box, Typography } from "@mui/material";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import style from "./style.module.scss";

const Header: React.FC = () => {
    return (
        <section className={style.header}>
            <div className={style.logo}>
                <RadioButtonUncheckedIcon fontSize="medium" color="inherit" />
                <Typography className={style.logo__text} sx={{ fontSize: "24px" }}>
                    To-Do practic
                </Typography>
            </div>
        </section>
    );
};

export default Header;
