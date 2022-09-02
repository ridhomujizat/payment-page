import React from "react";
import { Container, Box, Typography } from "@mui/material";

export default function Microsite() {
  return (
    <Container>
      <Box sx={style.wrapper}>
        <Box sx={style.formWrapper}>
          <Typography sx={style.title}>Name interaksi</Typography>
        </Box>
        <Box sx={style.pricing}>sss</Box>
      </Box>
    </Container>
  );
}

const style = {
  wrapper: {
    display: "flex",
    width: "100%",
    marginTop: "10px",
  },
  formWrapper: {
    width: "70%",
  },
  pricing: {
    width: "30%",
  },
  title: {},
};
