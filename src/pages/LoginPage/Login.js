import React, { useState } from "react";
import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  Grid,
  Box,
  Card,
  CardContent,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LockRoundedIcon from "@mui/icons-material/LockRounded";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputAdornment from "@mui/material/InputAdornment";
import styled from "@emotion/styled/macro";
import { useNavigate } from "react-router-dom";
import nokia_logo from "../../Assests/images/nokia_logo.svg";
import "../LoginPage/Login.css";

const StyledLabel = styled.span`
  font-size: 14px;
  font-family: Century Gothic;
`;

const LoginPage = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);

  const handleEmailChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSignIn();
  };

  const navigate = useNavigate();

  const handleSignIn = async () => {
    console.log("username", username, "password", password);
    try {
      const response = await fetch(
        "http://localhost:8085/api/users/login",
        // "http://wfm-user-mgmnt.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/users/login",
         {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const token = await response.json();
        localStorage.setItem("token", JSON.stringify(token));
        const newtoken = localStorage.getItem("token");
        if (newtoken) {
          const parsedToken = JSON.parse(newtoken); 
          props.handleLoginSuccess(parsedToken.username, parsedToken.role);          
          if(parsedToken.role === "Normal User" ){
            navigate("/dashboard");
          }else{
            navigate("/home");
          }
             
        }
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error logging in");
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url(${require("../../Assests/images/image5.jpg")})`,
        backgroundSize: "cover",
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 20,
          left: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          src={nokia_logo}
          alt="Nokia Logo"
          style={{ width: "175px", height: "40px", marginRight: 10 }}
          className="nokia-logo"
        />
        <Typography
          variant="h6"
          style={{
            font: "normal normal 25px Century Gothic",
            letterSpacing: "0px",
            color: "#FFF",
            opacity: 1,
            marginTop: "40px",
          }}
          className="onetouch-gsd"
        >
          <span style={{ fontWeight: "bold" }}>OneTouch</span> GSD
        </Typography>
      </div>
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100vh", backgroundRepeat: "no-repeat" }}
      >
        <Grid item xs={7} md={4} p={4}></Grid>
        <Grid item xs={5} md={4} p={4} borderRadius={4} elevation={10}>
          <Card className="card">
            <CardContent>
              <Typography
                sx={{ font: "normal normal bold 28px/23px Century Gothic" }}
                variant="h4"
                align="center"
                mb={3}
                color="white"
              >
                Login
              </Typography>
              <form
                sx={{ font: "normal normal bold 28px/23px Century Gothic" }}
                onSubmit={handleSubmit}
              >
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <PersonIcon sx={{ color: "#333160", mr: 1, my: 0.5 }} />
                  <TextField className="customText"
                    fullWidth
                    type="email"
                    value={username}
                    autoComplete="off"
                    onChange={handleEmailChange}
                    id="input-with-sx1"
                    label="Enter User Name"
                    variant="standard"
                  />
                </Box>
                <Box sx={{ display: "flex", alignItems: "flex-end" }}>
                  <LockRoundedIcon sx={{ color: "#333160", mr: 1, my: 0.5 }} />
                  <TextField className="customText"
                    fullWidth
                    value={password}
                    onChange={handlePasswordChange}
                    type={showPassword ? "text" : "password"}
                    id="input-with-sx"
                    label="Enter Password"
                    variant="standard"
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          {showPassword ? (
                            <VisibilityOff
                              sx={{ color: "#333160" }}
                              onClick={handleShowPassword}
                            />
                          ) : (
                            <Visibility
                              sx={{ color: "#333160" }}
                              onClick={handleShowPassword}
                            />
                          )}
                        </InputAdornment>
                      ),
                    }}
                  />
                </Box>
                <Box container mt={1}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <FormControlLabel
                        className="textStyles"
                        control={
                          <Checkbox
                            sx={{
                              font: "normal normal normal 1px / 1px Century Gothic",
                              letterSpacing: "0px",
                              color: "#687DAD",
                              opacity: 1,
                            }}
                          />
                        }
                        label={<StyledLabel>Remember me</StyledLabel>}
                        sx={{
                          font: "normal normal normal 14px / 14px Century Gothic",
                          letterSpacing: "0px",
                          color: "#687DAD",
                          opacity: 1,
                        }}
                      />
                    </Grid>
                  </Grid>
                </Box>

                <Button
                  className="loginButton"
                  type="submit"
                  variant="contained"
                  onClick={handleSignIn}
                  fullWidth
                  sx={{
                    mt: 2,
                    mb: 2,
                    bgcolor: "#2E4053",
                    color: "#FFFFFF",
                    "&:hover": { bgcolor: "#2E4053" },
                    textTransform: "capitalize",
                    opacity: 1,
                  }}
                >
                  Sign in
                </Button>
                {error && (
                  <Typography variant="body2" color="error" align="center">
                    {error}
                  </Typography>
                )}
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default LoginPage;
