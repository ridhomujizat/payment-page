import React from "react";
import { Box, Typography } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

export default function Status({ price, status }) {
  return (
    <>
      <Box sx={[style.statusBox]}>
        {/* <Typography sx={{ fontSize: "40px", fontWeight: "bold" }}>
          <span style={{ fontSize: "20px" }}>Rp</span> {price}
        </Typography> */}
      </Box>
      <Typography sx={{fontWeight: "bold"}}>
        Status Pembayaran: {" "}
        <span style={{ textTransform: "capitalize" }}>{status}</span>
      </Typography>
    </>
  );
}

const style = {
  statusBox: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: "20px",
    widht: "100%",
    p: "30px",
    borderRadius: "8px",
  },
};
