"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import Collapse from "@mui/material/Collapse";
import Tooltip from "@mui/material/Tooltip";
import { primaryNavItems,secondaryNavItems } from "./Navbar";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create(["width", "background-color"], {
    easing: theme.transitions.easing.easeOut,
    duration: theme.transitions.duration.enteringScreen,
  }),
  backgroundColor: "#19243A",
  overflowX: "hidden",
  borderRight: "1px solid transparent",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create(["width", "background-color"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  backgroundColor: "#19243A",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  transition: "width 0.3s",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Layout({ children }) {
    const theme = useTheme();
    const pathname = usePathname();

    const [optionalOptionOpen, setOptionalOptionOpen] = useState(false);

    const [open, setOpen] = useState(() => {
    const savedState = localStorage.getItem("drawerState");
    return savedState ? JSON.parse(savedState) : false;
    });

  const handleClick = () => {
    setOptionalOptionOpen(!optionalOptionOpen);
  };

  useEffect(() => {
    localStorage.setItem("drawerState", JSON.stringify(open));
  }, [open]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  //   const filteredPrimaryNavItems =
  //     isAdminCheck === "true"
  //       ? primaryNavItems
  //       : primaryNavItems.filter(
  //           (item) => item.id === 2 || item.id === 3 || item.id === 4
  //         );

  //   const filteredSecondaryNavItems =
  //     isAdminCheck === "true" ? secondaryNavItems : null;

  return (
    <Box
      sx={{ display: "flex", backgroundColor: "#0E1526", minHeight: "100vh" }}
    >
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "#19243A" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: "none" }),
            }}
          >
            <MenuIcon />
          </IconButton>

          {/* <NavBar /> */}
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon sx={{ color: "white" }} />
            ) : (
              <ChevronLeftIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>

        <List sx={{ marginTop: "20px" }}>
          {primaryNavItems?.map((item, index) => (
            <ListItem key={index} disablePadding sx={{ display: "block" }}>
              <Link href={item?.pathName} style={{ textDecoration: "none" }}>
                <Tooltip title={open ? "" : item?.name} arrow placement="top">
                  <ListItemButton
                    sx={{
                      minHeight: 48,
                      justifyContent: open ? "initial" : "center",
                      px: 2.5,
                      transition: "all 0.2s ease",
                      backgroundColor: pathname?.includes(item.pathName)
                        ? "#0E152661!important"
                        : "inherit",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        mr: open ? 3 : "auto",
                        justifyContent: "center",
                        transition: "all 0.2s ease",
                      }}
                    >
                      {item?.icon}
                    </ListItemIcon>
                    <ListItemText
                      primary={item?.name}
                      sx={{
                        opacity: open ? 1 : 0,
                        color: "#BEBEBE",
                        transition: "all 0.7s ease",
                      }}
                    />
                  </ListItemButton>
                </Tooltip>
              </Link>
            </ListItem>
          ))}

          <ListItem>
            <Box
              sx={{
                width: "100%",
                backgroundColor: "#1C2641",
                borderRadius: "4px",
              }}
            >

                <ListItemButton
                onClick={handleClick}
                sx={{
                    minHeight: 48,
                    justifyContent: open ? "initial" : "center",
                    backgroundColor: "#0E1526!important",
                    borderRadius: "4px",
                    px: 2.5,
                    paddingLeft: `${open ? "5px" : "auto"}`,
                    transition: "all 0.2s ease",
                }}
                >
                <ListItemIcon
                    sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                    transition: "all 0.2s ease",
                    }}
                >
                    {optionalOptionOpen ? (
                    <ExpandLess sx={{ color: "#0278AD" }} />
                    ) : (
                    <ExpandMore sx={{ color: "#0278AD" }} />
                    )}
                  </ListItemIcon>

                  <ListItemText
                    primary="অন্যান্য"
                    sx={{
                      opacity: open ? 1 : 0,
                      color: "#BEBEBE",
                      transition: "all 0.2s ease",
                    }}
                  />
                </ListItemButton>
            

              <Collapse in={optionalOptionOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {secondaryNavItems?.map((item, index) => (
                    <ListItem
                      key={index}
                      disablePadding
                      sx={{ display: "block" }}
                    >
                      <Link
                        href={item?.pathName}
                        style={{ textDecoration: "none" }}
                      >
                        <Tooltip
                          title={open ? "" : item?.name}
                          arrow
                          placement="top"
                        >
                          <ListItemButton
                            sx={{
                              minHeight: 48,
                              justifyContent: open ? "initial" : "center",
                              px: 2.5,
                              transition: "all 0.2s ease",
                              backgroundColor: pathname?.includes(
                                item?.pathName
                              )
                                ? "#0E152661!important"
                                : "inherit",
                            }}
                          >
                            <ListItemIcon
                              sx={{
                                minWidth: 0,
                                mr: open ? 3 : "auto",
                                justifyContent: "center",
                                transition: "all 0.3s ease",
                              }}
                            >
                              {item?.icon}
                            </ListItemIcon>
                            <ListItemText
                              primary={item?.name}
                              sx={{
                                opacity: open ? 1 : 0,
                                color: "#BEBEBE",
                                transition: "all 0.3s ease",
                              }}
                            />
                          </ListItemButton>
                        </Tooltip>
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </Box>
          </ListItem>
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        {children}
      </Box>
    </Box>
  );
}
