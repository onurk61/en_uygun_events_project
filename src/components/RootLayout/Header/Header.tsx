import React, { useEffect, useState } from "react";
import { Box, Button, Grid, ListItemIcon, ListItemText } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
import "./Header.scss";
import IconComp from "../../../utils/IconComp";

interface HeaderProps {
  setShowMenu: () => void;
  showMenu: boolean;
}

const Header: React.FC<HeaderProps> = ({ setShowMenu, showMenu }) => {
  const { t } = useTranslation();
  let currentLang = localStorage.getItem("currentLang");
  const [selectedIndex, setSelectedIndex] = useState(1);
  const [anchorElProfile, setAnchorElProfile] = useState<any>(null);
  const openProfile = Boolean(anchorElProfile);

  useEffect(() => {
    handleOnClickLanguage(currentLang === "tr" ? "tr" : "en-US");
  }, [currentLang]);

  const handleOnClickLanguage = (languageSelection: string) => {
    setSelectedIndex(() => (languageSelection === "tr" ? 1 : 0));
    localStorage.setItem("currentLang", languageSelection);
    i18n.changeLanguage(languageSelection);
  };

  return (
    <Paper className="header-paper">
      <Grid container display="flex" alignItems="center">
        <Grid item container justifyContent="space-between">
          <Grid item xs={6} display="flex" alignItems="center"></Grid>
          <Grid
            item
            xs={6}
            display="flex"
            alignItems="center"
            justifyContent="end"
            gap="1.5rem"
          >
            <Button
              aria-controls="menu-profile"
              aria-haspopup="true"
              aria-expanded={openProfile ? "true" : undefined}
              onClick={(event) => setAnchorElProfile(event.currentTarget)}
              color="inherit"
              size="small"
              sx={{ p: "10px", textTransform: "none", color: "#1F384C" }}
            >
              <Avatar
                style={{ marginRight: "10px" }}
                alt=""
                src="https://picsum.photos/id/237/200/300"
              />
              Onur Kanca
            </Button>
            <Menu
              id="menu-profile"
              anchorEl={anchorElProfile}
              open={openProfile}
              onClose={() => setAnchorElProfile(null)}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
            >
              <MenuItem
                onClick={() =>
                  handleOnClickLanguage(selectedIndex === 0 ? "tr" : "en-US")
                }
              >
                <IconComp icon="world" size="22" />
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                  width="100%"
                  sx={{ fontSize: "14px", color: "#91A1A9" }}
                >
                  <ListItemText primary={"Language"} />
                  <span style={{ marginLeft: "auto" }}>
                    {selectedIndex === 0 ? "EN" : "TR"}
                  </span>
                </Box>
              </MenuItem>
              <MenuItem>
                <IconComp icon="product" size="22" />
                <ListItemText primary={t("log-out")} />
              </MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default Header;
