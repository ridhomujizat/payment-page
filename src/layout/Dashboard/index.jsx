import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/sidebar";

export default function Dashboard({ children }) {
  return (
    <Box sx={style.wrapper}>
      <Sidebar />
      <Box sx={style.whitespace} />
      <Box sx={style.content}>{children}</Box>
    </Box>
  );
}

const style = {
  wrapper: {
    display: "flex",
    width: "100%",
  },
  whitespace: {
    width: "80px",
    minWidth: "80px",
  },
  content: {
    flex: 1,
    p: "20px"
  },
};
