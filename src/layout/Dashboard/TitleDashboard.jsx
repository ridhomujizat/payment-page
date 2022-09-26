import React from "react";
import { Box, Typography, Breadcrumbs, TextField } from "@mui/material";
import Layout from "./index";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function TitleDashboard({ title, breadcumbs, children }) {
  return (
    <Layout title={title}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ marginBottom: "20px" }}>
          <Typography as="h1" sx={{ fontSize: "30px", fontWeight: "700" }}>
            {title}
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{ fontSize: "12px" }}
          >
            {breadcumbs?.map((val) => (
              <span>{val.title}</span>
            ))}
          </Breadcrumbs>
          {/* <TextField 
            placeholder="Search...."
            fullWidth
            sx={{
              my: "10px",
              maxWidth: "600px",
              bgcolor: "rgba(0,0,0,0.05)"
            }}
          /> */}
        </Box>

        {children}
      </Box>
    </Layout>
  );
}
