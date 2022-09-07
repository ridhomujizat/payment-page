import React, { useState } from "react";
import { Box, Avatar, Typography, Collapse } from "@mui/material";
import { useHistory } from "react-router-dom";
import TitleGroup from "./TitleGroup";
import ItemMenu from "./ItemMenu";

import MenuList from "../../config/MenuSideBarAdmin";

import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PersonIcon from "@mui/icons-material/Person";

export default function index() {
  const [open, setOpen] = useState(false);
  const history = useHistory();
  const [currentPath, setCurrentPath] = useState(history.location.pathname);

  return (
    <Box
      sx={[style.sidebar, open ? style.openSidebar : style.closeSidebar]}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <Collapse
        in={open}
        collapsedSize={45}
        orientation="horizontal"
        sx={{ ".MuiCollapse-wrapperInner": { width: "100%" },  ".MuiCollapse-wrapper": { width: "100%" } }}
      >
        <AddShoppingCartIcon sx={{ fontSize: "30px", color: "#03b6fc" }} />

        {/* Avatar */}
        <Box sx={[open ? style.avatar : style.avatarClose]}>
          <Avatar sx={{ bgcolor: (v) => v.palette.primary.contrast }}>
            <PersonIcon />
          </Avatar>
          <Box sx={[!open && style.hidden]}>
            <Typography>Person</Typography>
            <Typography sx={{ fontSize: "12px" }}>Admin</Typography>
          </Box>
        </Box>

        {/* Menu  */}
        {MenuList.map((val, index) => (
          <TitleGroup title={val.title} key={index} isOpen={open}>
            {val.list.map((v, i) => (
              <ItemMenu
                key={i}
                active={v.path === currentPath}
                text={v.label}
                Icon={v.icon}
                onClick={() => {
                  setCurrentPath(v.path);
                  history.push(v.path);
                }}
                isOpen={open}
              />
            ))}
          </TitleGroup>
        ))}
      </Collapse>
    </Box>
  );
}

const style = {
  hidden: {
    display: "none",
  },
  sidebar: {
    position: "absolute",
    zIndex: "99",
    left: 0,
    top: 0,
    height: "100vh",
    backgroundColor: "rgba(255,255,255,0.5)",
    backdropFilter: "blur(3px)",
    padding: "20px 15px",
    transition: (theme) =>
      theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
  },
  openSidebar: {
    width: "240px",
  },
  closeSidebar: {
    width: "unset",
    borderRight: ".1px solid rgba(0,0,0,.08)",
  },
  avatar: {
    bgcolor: "#F2F3F5",
    marginTop: "20px",
    padding: "15px 10px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  avatarClose: {
    marginTop: "20px",
    paddingY: "16px",
  },
};
