import React from "react";
import { Box, Avatar, Typography } from "@mui/material";

const Menu = ({ title, children, isOpen }) => {
  return (
    <Box sx={[{ marginY: "20px" }, !isOpen && { marginTop: "50px" }]}>
      <Typography
        sx={[
          { fontWeight: "700", marginX: "12px" },
          !isOpen && { display: "none" },
        ]}
      >
        {title}
      </Typography>
      {children}
    </Box>
  );
};

export default Menu;
