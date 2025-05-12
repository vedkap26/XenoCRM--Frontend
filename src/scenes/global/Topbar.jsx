import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import GoogleIcon from '@mui/icons-material/Google';
import { useNavigate } from "react-router-dom";
import useGoogleAuth from '../../hooks/useGoogleAuth'

import { getAuth } from 'firebase/auth'

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const { user, isLoading, signIn, signOut } = useGoogleAuth()
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >

      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>



        <IconButton
          onClick={() => {
            if (user) {
              signOut();           
              navigate("/login");   
            } else {
              signIn();            
            }
          }}
        >
          <Typography
            variant="h5"
            color={theme.palette.mode === "dark" ? "#ffffff" : "#000000"}
          >
            {user ? "Logout" : "SignIn with Google"}
          </Typography>
          <GoogleIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
