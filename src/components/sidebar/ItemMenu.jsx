import React from "react";
import { Box, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";

export default function ItemMenu({ active, Icon, text, onClick, isOpen }) {
  return (
    <Box
      sx={{
        cursor: "pointer",
        bgcolor: (v) => (active ? v.palette.primary.contrast : "transparent"),
        display: "flex",
        alignItems: "center",
        p: "10px",
        borderRadius: "8px",
        gap: "15px",
        marginY: "5px",
        color: (v) => (active ? v.palette.primary.main : "#637381"),
        "&:hover": {
          bgcolor: (v) => (active ? v.palette.primary.contrast : "#F2F3F5"),
        },
      }}
      onClick={onClick}
    >
      <Icon />
      <Typography sx={[{ color: "inherit", whiteSpace: "nowrap" }, !isOpen && { display: "none" }]}>
        {text}
      </Typography>
    </Box>
  );
}
