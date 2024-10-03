import React, { useState, useEffect } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { Grid } from "@mui/material";
import TextField from "@mui/material/TextField";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import DashboardRoundedIcon from "@mui/icons-material/DashboardRounded";
import AdminPanelSettingsRoundedIcon from "@mui/icons-material/AdminPanelSettingsRounded";
import InsightsRoundedIcon from "@mui/icons-material/InsightsRounded";
import { Home, MenuBook, Search, Notifications } from "@mui/icons-material";
import Chip from "@mui/material/Chip";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import nokia_logo from "../../Assests/images/nokia_logo.svg";
import "../HeaderBar/headerBar.css";

import { Link, useNavigate, useLocation } from "react-router-dom";
import Snackbar from "@mui/material/Snackbar";

const homeChipStyle = {
  position: "relative",
  background: "#121452",
  border: "1px solid #3F3B96",
  color: "#FFFFFF",
  borderRadius: "20px",
  opacity: 1,
  letterSpacing: "0px",
  textTransform: "uppercase",
  textAlign: "left",
  fontFamily: "Raleway",
};

const buttonStyle = {
  color: "#97B5F9",
  opacity: 1,
  letterSpacing: "0px",
  textTransform: "uppercase",
  textAlign: "center",
  position: "relative",
};

const logocontent = {
  width: "160px",
  borderRight: "2px solid #2E32A0",
  marginRight: "25px",
};

function HeaderBar({ handleLogoutApp, selectedChip }) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [open, setOpen] = useState(false);
  const [selectedChipState, setSelectedChipState] = useState(selectedChip);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [showMenu, setShowMenu] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [roles, setRoles] = useState([
    { value: "Normal User", label: "Normal User" },
    { value: "Admin", label: "Admin" },
    // { value: "Super Admin", label: "Super Admin" },
  ]);
  const [usernameLoc, setUserNameLoc] = useState("");
  const [roleLoc, setRoleLoc] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  // const [showStatistics, setShowStatistics] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const userData = localStorage.getItem("token");
    if (userData) {
      const data = JSON.parse(userData);
      setUserNameLoc(data.username);
      setRoleLoc(data.role);
      // if (data.role === "Normal User") {
      //   setSelectedChipState("dashboard");
      //   navigate("/dashboard", { replace: true });
      // }
    } else {
      console.log("No User data found");
    }
  }, []);

  useEffect(() => {
    if (roleLoc === "Normal User") {
      setSelectedChipState("dashboard");
      navigate("/dashboard", { replace: true });
    }
  }, [roleLoc]);

  const handleChipClick = (chip, path) => {
    setSelectedChipState(chip);
    navigate(path, { replace: true });
    // if (chip === "dashboard") {
    //   setShowStatistics(true);
    // }
  };

  const handleDrawerToggle = () => {
    setOpen(!open);
    setAnchorEl(null);
    setShowMenu(false);
  };
  const [state, setState] = useState({
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const handleUserChange = (event) => {
    setUsername(event.target.value);
    validateInputFields();
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
    validateInputFields();
  };

  const handleChangeRole = (event) => {
    setRole(event.target.value);
    validateInputFields();
  };

  const validateInputFields = () => {
    if (username && role && password) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  };

  const handleAddUser = async () => {
    try {
      const requestBody = {
        username,
        role,
        password,
      };

      const response = await fetch(
        "http://localhost:8085/api/users/signup",
        // "http://wfm-user-mgmnt.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      const result = await response.json();
      setSnackbarMessage("User added successfully!");
      setOpenSnackbar(true);
      localStorage.setItem("username", result.username);
      localStorage.setItem("role", result.role);
      setUsername("");
      setRole("");
      setPassword("");
    } catch (error) {
      console.error("Error adding user:", error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
    setShowMenu(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
    setShowMenu(false);
  };

  const handleLogout = async () => {
    try {
      const requestBody = {
        username: usernameLoc,
      };

      const response = await fetch(
        "http://localhost:8085/api/users/logout",
        // "http://wfm-user-mgmnt.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/users/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(requestBody),
        }
      );

      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      localStorage.removeItem("token");
      // localStorage.removeItem("processedData");
      // localStorage.removeItem("toolnames");
      handleLogoutApp();
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: "#2c2d69", boxShadow: "none", padding: "2px" }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <div style={logocontent}>
              <img src={nokia_logo} alt="Nokia Logo" className="logoImg" />
              <br />
              <div className="logoText">
                OneTouch GSD <div>NPO Framework </div>
              </div>
            </div>
            <div style={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              <div>
                <Box sx={{ flexGrow: 1 }} />
                {roleLoc === "Super Admin" || roleLoc === "Admin" ? (
                  <>
                    <HomeButton
                      to={location.pathname === "/home" ? "/home" : ""}
                      label="Home"
                      selected={location.pathname.substring(1) === "home"}
                      onClick={() => handleChipClick("home", "/home")}
                    />
                    <AdminButton
                      to={location.pathname === "/onboard" ? "/onboard" : ""}
                      label="Onboarding"
                      selected={location.pathname.substring(1) === "onboard"}
                      onClick={() => handleChipClick("onboard", "/onboard")}
                    />
                    <StatisticsButton
                      to={
                        location.pathname === "/statistics" ? "/statistics" : ""
                      }
                      label="Statistics"
                      selected={location.pathname.substring(1) === "statistics"}
                      onClick={() =>
                        handleChipClick("statistics", "/statistics")
                      }
                    />
                    <DashboardButton
                      to={
                        location.pathname === "/dashboard" ? "/dashboard" : ""
                      }
                      label="Dashboard"
                      selected={location.pathname.substring(1) === "dashboard"}
                      onClick={() => handleChipClick("dashboard", "/dashboard")}
                    />
                  </>
                ) : (
                  <>
                    <DashboardButton
                      to={
                        location.pathname === "/dashboard" ? "/dashboard" : ""
                      }
                      label="Dashboard"
                      selected={location.pathname.substring(1) === "dashboard"}
                      onClick={() => handleChipClick("dashboard", "/dashboard")}
                    />
                  </>
                )}
              </div>
            </div>
            <div
              style={{
                color: "#8BA5E1",
                font: "Roboto, Helvetica, Arial, sans-serif",
                marginRight: "5px",
                opacity: 1,
              }}
            >
              <Stack spacing={2}>
                <span>Welcome {roleLoc}</span>
              </Stack>
            </div>
            <div style={{ flexGrow: 0 }}>
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <AccountCircleIcon sx={{ color: "white" }} />
              </IconButton>
              <IconButton color="inherit">
                <Notifications />
              </IconButton>
              <IconButton color="inherit">
                <Search />
              </IconButton>

              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={showMenu && Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem>
                  <Stack spacing={2}>
                    <span>{usernameLoc}</span>
                    <span>{roleLoc}</span>
                  </Stack>
                </MenuItem>
                <Divider />
                {roleLoc !== "Normal User" ? (
                  <MenuItem onClick={handleDrawerToggle}>
                    <AccountCircleIcon color="inherit" />
                    Manage Users
                  </MenuItem>
                ) : null}
                <Divider />
                <MenuItem onClick={handleLogout}>
                  <LogoutRoundedIcon color="inherit" />
                  Logout
                </MenuItem>
              </Menu>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleDrawerToggle}
        sx={{
          "& .MuiDrawer-paper": {
            top: 0,
            width: 500,
            height: "100%",
            background:
              "transparent linear-gradient(90deg, #1c0f45 0%, #2e2a48 55%, #100d1f 100%) 0% 0% no-repeat padding-box",
            boxShadow: "0px 10px 20px #00000029",
            opacity: 1,
          },
        }}
      >
        <div
          style={{
            zIndex: 1,
          }}
          role="presentation"
        >
          <List>
            <ListItem disablePadding>
              <Grid container spacing={2}>
                <Grid ml={2} item xs={12}>
                  <h3
                    sx={{
                      fontFamily: "normal normal bold Century Gothic",
                      letterSpacing: "0px",
                      color: "#FFFFFFCC",
                      opacity: 1,
                    }}
                  >
                    Add User
                  </h3>
                  <hr style={{ width: "440px" }}></hr>
                </Grid>
                <Grid sx={{ color: "#4c5089" }} ml={2} item xs={12}>
                  User Email ID
                </Grid>
                <Grid ml={2} item xs={12}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    autoComplete="off"
                    value={username}
                    onChange={handleUserChange}
                    sx={{
                      width: "440px",
                      height: "48px",
                      background:
                        "transparent linear-gradient(180deg, #403480 0%, #141653 100%) 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 5px #00000080",
                      borderRadius: "8px",
                      opacity: 1,
                      color: "#4c5089",
                    }}
                  />
                </Grid>
                <Grid sx={{ color: "#4c5089" }} ml={2} item xs={12}>
                  Role
                </Grid>
                <Grid ml={2} item xs={12}>
                  <Select
                    sx={{
                      width: "440px",
                      height: "48px",
                      background:
                        "transparent linear-gradient(180deg, #403480 0%, #141653 100%) 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 5px #00000080",
                      borderRadius: "8px",
                      opacity: 1,
                      color: "#4c5089",
                    }}
                    value={role}
                    onChange={handleChangeRole}
                  >
                    {roles.map((roleOption) => (
                      <MenuItem key={roleOption.value} value={roleOption.value}>
                        {roleOption.label}
                      </MenuItem>
                    ))}
                  </Select>
                </Grid>
                <Grid sx={{ color: "#4c5089" }} ml={2} item xs={12}>
                  New Password
                </Grid>
                <Grid ml={2} item xs={12}>
                  <TextField
                    id="outlined-basic"
                    variant="outlined"
                    autoComplete="off"
                    value={password}
                    onChange={handlePasswordChange}
                    sx={{
                      width: "440px",
                      height: "48px",
                      background:
                        "transparent linear-gradient(180deg, #403480 0%, #141653 100%) 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 5px #00000080",
                      borderRadius: "8px",
                      opacity: 1,
                      color: "#4c5089",
                    }}
                  />
                </Grid>
                <Grid ml={2} item xs={12}>
                  <Button
                    sx={{
                      width: "440px",
                      height: "48px",
                      fontFamily:
                        "normal normal normal 16px/14px Century Gothic",
                      background:
                        "transparent linear-gradient(96deg, #7a045d 0%, #b135a1 52%, #9959ec 100%) 0% 0% no-repeat padding-box",
                      boxShadow: "0px 0px 5px #00000029",
                      borderRadius: "10px",
                      opacity: 1,
                      textTransform: "capitalize",
                    }}
                    variant="contained"
                    onClick={handleAddUser}
                    disabled={isButtonDisabled}
                  >
                    ADD
                  </Button>
                  <Snackbar
                    open={openSnackbar}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{ vertical: "top", horizontal: "center" }}
                    message={snackbarMessage}
                    autoHideDuration={3000}
                  ></Snackbar>
                </Grid>
              </Grid>
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
}
const HomeButton = ({ to, label, selected, onClick }) => {
  return selected ? (
    <Chip
      component={Link}
      to={to}
      avatar={
        <Avatar>
          <Home fontSize="small" />
        </Avatar>
      }
      label={label}
      color="primary"
      style={homeChipStyle}
    />
  ) : (
    <IconButton style={buttonStyle} onClick={onClick}>
      <Home fontSize="small" />
      <Typography variant="button" component="span">
        {label}
      </Typography>
    </IconButton>
  );
};
const AdminButton = ({ to, label, selected, onClick }) => {
  return selected ? (
    <Chip
      component={Link}
      to={to}
      avatar={
        <Avatar>
          <AdminPanelSettingsRoundedIcon fontSize="small" />
        </Avatar>
      }
      label={label}
      color="primary"
      style={homeChipStyle}
    />
  ) : (
    <IconButton onClick={onClick} style={buttonStyle}>
      <AdminPanelSettingsRoundedIcon fontSize="small" />
      <Typography variant="button" component="span">
        {label}
      </Typography>
    </IconButton>
  );
};

const DashboardButton = ({ to, label, selected, onClick }) => {
  return selected ? (
    <Chip
      component={Link}
      to={to}
      avatar={
        <Avatar>
          <DashboardRoundedIcon fontSize="small" />
        </Avatar>
      }
      label={label}
      color="primary"
      style={homeChipStyle}
    />
  ) : (
    <IconButton onClick={onClick} style={buttonStyle}>
      <DashboardRoundedIcon fontSize="small" />{" "}
      <Typography variant="button" component="span">
        {label}
      </Typography>
    </IconButton>
  );
};

const StatisticsButton = ({ to, label, selected, onClick }) => {
  return selected ? (
    <Chip
      component={Link}
      to={to}
      avatar={
        <Avatar>
          <InsightsRoundedIcon fontSize="small" />
        </Avatar>
      }
      label={label}
      color="primary"
      style={homeChipStyle}
    />
  ) : (
    <IconButton onClick={onClick} style={buttonStyle}>
      <InsightsRoundedIcon fontSize="small" />
      <Typography variant="button" component="span">
        {label}
      </Typography>
    </IconButton>
  );
};

export default HeaderBar;
