import React from "react";
import { Container, Box } from "@mui/material";

export default function Centering({ children }) {
  return (
    <Container>
      <Box
        sx={{ display: "flex", justifyContent: "center",  height: "100vh", width: "100%" }}
      >
        {children}
      </Box>
    </Container>
  );
}
