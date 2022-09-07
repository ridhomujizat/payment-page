import React from "react";
import { Box, Typography, Breadcrumbs } from "@mui/material";
import Layout from "./index";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

export default function TitleDashboard({ title, breadcumbs, children }) {
  return (
    <Layout>
      <Box sx={{ width: "100%" }}>
        <Box sx={{marginBottom: "20px"}}>
          <Typography as="h1" sx={{ fontSize: "25px", fontWeight: "700" }}>
            {title}
          </Typography>
          <Breadcrumbs
            aria-label="breadcrumb"
            separator={<NavigateNextIcon fontSize="small" />}
            sx={{fontSize: "12px"}}
          >
            <span>Information</span>
            <span>Shipping</span>
            <span>Payment</span>
          </Breadcrumbs>
        </Box>

        {children}
      </Box>
    </Layout>
  );
}
