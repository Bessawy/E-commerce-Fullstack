import {
  Box,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React, { useState } from "react";
import HomeIcon from "@mui/icons-material/Home";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import InventoryIcon from "@mui/icons-material/Inventory";

import { navMenuType } from "../../Types/routes";
import { FlexBox } from "../../Styles/Themes/styledComp";

const DrawerComp = (props: { menu: navMenuType[]; avatar: string }) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Drawer open={open} onClose={() => setOpen(false)}>
      <FlexBox sx={{margin: 2}}>
          {props.avatar ? (
            <Box
              component="img"
              sx={{ width: 50, height: 50, borderRadius: 25 }}
              src={props.avatar}
            ></Box>
          ) : (
            <Box className="login_img" sx={{ width: 50, height: 50 }}></Box>
          )}
        </FlexBox>
        <List sx={{ minWidth: 200 }}>
          <ListItemButton
            onClick={() => {
              navigate("/");
            }}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText>Home</ListItemText>
          </ListItemButton>
          <ListItemButton
            onClick={() => {
              navigate("/products");
            }}
          >
            <ListItemIcon>
              <InventoryIcon />
            </ListItemIcon>
            <ListItemText>Products</ListItemText>
          </ListItemButton>
        </List>
        <Divider />
        <List>
          {props.menu.map((item) => {
            return (
              <ListItemButton
                key={item.id}
                onClick={() => {
                  item.action();
                }}
              >
                <ListItemIcon>
                  <InventoryIcon />
                </ListItemIcon>
                <ListItemText>{item.state}</ListItemText>
              </ListItemButton>
            );
          })}
        </List>
      </Drawer>
      <IconButton
        onClick={() => {
          setOpen(!open);
        }}
      >
        <MenuIcon />
      </IconButton>
    </React.Fragment>
  );
};

export default DrawerComp;
