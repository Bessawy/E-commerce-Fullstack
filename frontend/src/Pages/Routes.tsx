import IconButton from "@mui/material/IconButton";
import ModeNightIcon from "@mui/icons-material/ModeNight";
import LightModeIcon from "@mui/icons-material/LightMode";
import { useAppDispatch, useAppSelector } from "../reduxhook/hooks";
import { toggleThemeMode } from "../redux/reducers/themeModeReducer";
import {
  AppBar,
  Badge,
  Box,
  ClickAwayListener,
  Grid,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { Container } from "@mui/system";
import { useEffect, useRef, useState } from "react";

import { navMenuType } from "../Types/routes";
import { JWTLogin, signOutUser } from "../redux/reducers/userReducer";
import { FlexBox, StyledBadge } from "../Styles/Themes/styledComp";
import DrawerComp from "../features/drawer/drawerComp";

export const Routes = () => {
  const mode = useAppSelector((state) => state.themeReducer) as
    | "dark"
    | "light";

  const dispatch = useAppDispatch();

  const toggleTheme = () => {
    dispatch(toggleThemeMode());
  };

  const user = useAppSelector((state) => state.userReducer);
  const cart = useAppSelector((state) => state.cartReducer);
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [cartItems, setCartItems] = useState<number>(0);
  const [menu, setMenu] = useState<navMenuType[]>([]);
  const [open, setOpen] = useState<boolean>(false);

  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("md"));
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Tab") {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === "Escape") {
      setOpen(false);
    }
  }

  useEffect(() => {
    dispatch(JWTLogin());
  }, [dispatch]);

  useEffect(() => {
    let count = 0;
    cart.forEach((item) => {
      count += item.count;
    });
    setCartItems(count);
  }, [cart]);

  useEffect(() => {
    const signedinMenu = [
      {
        id: 2,
        state: "Sign out",
        action: () => {
          dispatch(signOutUser());
          navigate("/");
        },
      },
      {
        id: 3,
        state: "Profile",
        action: () => {
          navigate("/profile");
        },
      },
    ];

    const guestMenu = [
      {
        id: 0,
        state: "Sign in",
        action: () => {
          navigate("/signin");
        },
      },
      {
        id: 1,
        state: "Sign up",
        action: () => {
          navigate("/signup");
        },
      },
    ];

    if (user.id === 0) {
      setMenu(guestMenu);
    } else {
      setMenu(signedinMenu);
    }
  }, [user, dispatch, navigate]);

  return (
    <div className="root">
      <AppBar style={{ margin: 0, padding: 0 }}>
        <Toolbar
          sx={{
            margin: 0,
            bgcolor: "background.default",
            color: "text.primary",
            boxShadow: 3,
            p: 0,
          }}
        >
          {isMatch ? (
            <>
              <DrawerComp menu={menu} avatar={user.avatar}/>
                <NavLink to="/">
                {" "}
                <Box
                  className="logo_img"
                  sx={{ width: 230, height: 50}}
                ></Box>
              </NavLink>
              <IconButton sx={{ marginLeft: "auto" }} onClick={toggleTheme}>
                {mode === "dark" ? <ModeNightIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton
                sx={{ marginRight: 3 }}
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <Badge
                  badgeContent={cartItems}
                  color="warning"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  {" "}
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
              
            </>
          ) : (
            <>
              <NavLink to="/">
                {" "}
                <Box
                  className="logo_img"
                  sx={{ width: 230, height: 50, marginRight: 10 }}
                ></Box>
              </NavLink>
              <Typography>
                <NavLink to="/"> Home </NavLink>
              </Typography>
              <Typography sx={{ ml: 2 }}>
                <NavLink to="/products"> Products </NavLink>
              </Typography>
              <IconButton sx={{ marginLeft: "auto" }} onClick={toggleTheme}>
                {mode === "dark" ? <ModeNightIcon /> : <LightModeIcon />}
              </IconButton>
              <IconButton
                sx={{ marginRight: 3 }}
                onClick={() => {
                  navigate("/cart");
                }}
              >
                <Badge
                  badgeContent={cartItems}
                  color="warning"
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                  }}
                >
                  {" "}
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              <FlexBox>
                <IconButton
                  ref={anchorRef}
                  id="composition-button"
                  onClick={() => setOpen((prevOpen) => !prevOpen)}
                  aria-controls={open ? "composition-menu" : undefined}
                  aria-expanded={open ? "true" : undefined}
                  aria-haspopup="true"
                >
                  <StyledBadge
                    variant="dot"
                    color={user.id ? "success" : "error"}
                    badgeContent=""
                  >
                    {user.avatar ? (
                      <Box
                        component="img"
                        sx={{ width: 50, height: 50, borderRadius: 25 }}
                        src={user.avatar}
                      ></Box>
                    ) : (
                      <Box
                        className="login_img"
                        sx={{ width: 50, height: 50 }}
                      ></Box>
                    )}
                  </StyledBadge>
                </IconButton>
                <Popper
                  open={open}
                  anchorEl={anchorRef.current}
                  role={undefined}
                  placement="bottom"
                  transition
                  disablePortal
                >
                  {({ TransitionProps, placement }) => (
                    <Grow
                      {...TransitionProps}
                      style={{
                        transformOrigin:
                          placement === "bottom-start"
                            ? "left top"
                            : "left bottom",
                      }}
                    >
                      <Paper sx={{ marginTop: 1 }}>
                        <Box borderBottom={1}>
                          <Typography textAlign="center">
                            {" "}
                            {user.name}{" "}
                          </Typography>
                        </Box>

                        <ClickAwayListener onClickAway={handleClose}>
                          <MenuList
                            autoFocusItem={open}
                            id="composition-menu"
                            aria-labelledby="composition-button"
                            onKeyDown={handleListKeyDown}
                          >
                            {menu.map((item) => {
                              return (
                                <MenuItem
                                  key={item.state}
                                  onClick={() => {
                                    item.action();
                                  }}
                                >
                                  <Typography variant="subtitle2">
                                    {item.state}
                                  </Typography>
                                </MenuItem>
                              );
                            })}
                          </MenuList>
                        </ClickAwayListener>
                      </Paper>
                    </Grow>
                  )}
                </Popper>
              </FlexBox>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Outlet />
      
      <footer>
        <Paper sx={{ marginTop: 10, paddingBottom: 10, paddingTop: 6 }}>
          <Container maxWidth="lg">
            <Typography variant="subtitle2">
              <Grid container spacing={3}>
                <Grid item xs={4}>
                  <Box borderBottom={1} marginBottom={2}>
                    {" "}
                    Help
                  </Box>
                  <Box>
                    <NavLink to="/contact"> Contact </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/support"> Support </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/privacy"> Privacy </NavLink>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box borderBottom={1} marginBottom={2}>
                    Account
                  </Box>
                  <Box>
                    <NavLink to="/signin"> Login </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/signup"> Register </NavLink>
                  </Box>
                </Grid>
                <Grid item xs={4}>
                  <Box borderBottom={1} marginBottom={2}>
                    Navigate
                  </Box>
                  <Box>
                    <NavLink to="/"> Home </NavLink>
                  </Box>
                  <Box>
                    <NavLink to="/products"> Products </NavLink>
                  </Box>
                </Grid>
              </Grid>
              <Box textAlign="center" sx={{ margin: 4 }} fontWeight={400}>
                <b>AMR</b> Shopping Center &copy; {new Date().getFullYear()}
              </Box>
            </Typography>
          </Container>
        </Paper>
      </footer>
    </div>
  );
};
