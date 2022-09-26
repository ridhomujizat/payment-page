import React from "react";
import { Box } from "@mui/material";
import Sidebar from "../../components/sidebar";
import { Helmet } from "react-helmet";
export default function Dashboard({ children, title }) {
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{title} | {import.meta.env.VITE_APP_NAME}</title>
        {/* <link rel="canonical" href="http://mysite.com/example" /> */}
      </Helmet>
      <Box sx={style.wrapper}>
        <Sidebar />
        <Box sx={style.whitespace} />
        <Box sx={style.content}>{children}</Box>
      </Box>
    </>
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
    p: "20px",
  },
};
