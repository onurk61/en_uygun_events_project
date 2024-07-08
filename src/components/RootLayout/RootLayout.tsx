import { Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import { styled } from "@mui/material/styles";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import LeftSideBar from "./LeftSideBar/LeftSideBar";
import Header from "./Header/Header";

const drawerWidth = 240;

type AppBarProps = {
  open: boolean;
};

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  marginLeft: drawerWidth,
  width: `calc(100% - ${theme.spacing(8.3)} + 1px)`,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const RootLayout: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/") {
      navigate("/home");
    }
  }, [location, navigate]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{ backgroundColor: "white" }}>
        <Toolbar>
          <Grid
            container
            direction="row"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
          >
            <Grid item xs={12}>
              <Header setShowMenu={() => setOpen(!open)} showMenu={open} />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <LeftSideBar setShowMenu={() => setOpen(!open)} showMenu={open} />
      <Box component="main" sx={{ flexGrow: 1, padding: "36px" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
};

export default RootLayout;
