import React, { useState, useEffect, useCallback } from "react";
import {
  Box,
  Chip,
  Tabs,
  Tab,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Snackbar,
  ListItemText,
  Checkbox,
} from "@mui/material";
import { styled } from "@mui/system";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import HandymanRoundedIcon from "@mui/icons-material/HandymanRounded";
import "../OnboardingScreen/OnBoarding.css";

const tabStyle = {
  textAlign: "left",
  color: "#fff",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontSize: "12px",
  opacity: 1,
};
const textStyle = {
  position: "relative",
  textAlign: "left",
  color: "#fff",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontSize: "16px",
  opacity: 1,
};

const StyledTextField = styled(TextField)({
  textAlign: "left",
  color: "#FFFFFF",
  font: "Raleway",
  fontSize: "16px",
  opacity: 0.6,
  left: "1px",
  "& label": {
    // <--- Add this
    color: "#FFFFFF",
  },
});

const StyledButton = styled(Button)({
  "&.reset": {
    background:
      "transparent linear-gradient(116deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 5px #00000029",
    border: "1px solid #150B35",
    borderRadius: "10px",
    opacity: 1,
    top: "0px",
    left: "50px",
    width: "110px",
    height: "49px",
    margin: "5px",
    color: "#EDF2F5",
  },
  "&.execute": {
    background:
      "transparent linear-gradient(116deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
    boxShadow: "0px 0px 5px #00000029",
    border: "1px solid #150B35",
    borderRadius: "10px",
    opacity: 1,
    top: "0px",
    left: "50px",
    width: "110px",
    height: "49px",
    margin: "5px",
    color: "#EDF2F5",
  }
});

function OnboardScreen({ dataAdd }) {
  const [state, setState] = useState({
    selectedTab: 0,
    selectedTool1: "",
    open: false,
    vertical: "top",
    horizontal: "center",
    addClientName: "",
    addProjectName: "",
    addSelectedTools: [],
    addPreSelectedTools: [],
    storeButton: false,
    storeMakePostCall: false,
    submitMakePostCall: false,
    isClicked: false,
  });
  const { vertical, horizontal, open } = state;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSelectChange = (event) => {
    const { value, label } = event.target;
    setState((prevState) => ({
      ...prevState,
      selectedTool1: value,
      // selectedTool1Label: label, // Update the label of the selected tool
    }));
  };

  const handleToolChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      addSelectedTools: event.target.value,
    }));
  };

  const handlePreToolChange = (event) => {
    setState((prevState) => ({
      ...prevState,
      addPreSelectedTools:
        typeof event.target.value === "string"
          ? event.target.value.split(",")
          : event.target.value,
    }));
  };

  const handleSubmitClick = useCallback(
    (newState) => () => {
      setState((prevState) => ({
        ...prevState,
        ...newState,
        open: true,
        submitMakePostCall: true,
        isClicked: true,
      }));
    },
    []
  );

  const handleStoreClick = useCallback(
    (newState) => () => {
      setState((prevState) => ({
        ...prevState,
        ...newState,
        open: true,
        storeMakePostCall: true,
        isClicked: true,
      }));
      window.location.reload();
    },
    []
  );

  useEffect(() => {
    const executePostRequest = async (payload) => {
      try {
        const response = await fetch(
          "http://localhost:8010/api/saveToolConfig",
          // "http://wfm-toolconfig.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/saveToolConfig",

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          const result = await response.json();
        } else {
          const result = await response.text();
          console.log("Error executing data:", result);
        }
      } catch (error) {
        console.error("Error executing data:", error);
      }
    };

    if (state.submitMakePostCall) {
      const payload = {
        toolname: state.selectedTool1,
        predefinedtools: state.addSelectedTools
          .map((tool) => tool.name)
          .join(", "),
      };
      executePostRequest(payload);
      setState((prevState) => ({
        ...prevState,
        submitMakePostCall: false,
      }));
      handleClear();
    }
  }, [state.submitMakePostCall, state.selectedTool1, state.addSelectedTools]);

  useEffect(() => {
    const storePostRequest = async (payload) => {
      try {
        const response = await fetch(
          "http://localhost:8090/api/updatecpt",
          // "http://wfm-toolconfig.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/updatecpt",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          }
        );
        if (response.ok) {
          const result = await response.json();
        } else {
          const result = await response.text();
          console.log("Error storing data:", result);
        }
      } catch (error) {
        console.error("Error storing data:", error);
      }
    };

    if (state.storeMakePostCall) {
      const payload = {
        clientName: state.addClientName,
        projectName: state.addProjectName,
        tools: state.addPreSelectedTools.map((tool) => ({
          toolName: tool.name,
        })),
      };
      storePostRequest(payload);
      setState((prevState) => ({
        ...prevState,
        storeMakePostCall: false,
      }));
      handleClear();
    }
  }, [
    state.storeMakePostCall,
    state.addClientName,
    state.addProjectName,
    state.addPreSelectedTools,
  ]);

  const handleClear = () => {
    setState((prevState) => ({
      ...prevState,
      addClientName: "",
      addProjectName: "",
      addSelectedTools: [],
      addPreSelectedTools: [],
      selectedTool1: "",
    }));
  };

  const handleTabChange = (event, newValue) => {
    setState((prevState) => ({
      ...prevState,
      selectedTab: newValue,
    }));
  };

  const handleClose = () => {
    setState((prevState) => ({
      ...prevState,
      open: false,
    }));
  };

  const isSubmitButtonDisabled =
    !state.selectedTool1 || state.addSelectedTools.length === 0;
  const isStoreButtonDisabled =
    !state.addClientName ||
    !state.addProjectName ||
    state.addPreSelectedTools.length === 0;

  const preSelectedMessage = () => {
    if (state.addPreSelectedTools.length === 0) {
      return "";
    }

    const toolNames = state.addPreSelectedTools
      .map((tool) => tool.name)
      .join(", ");
    return state.addPreSelectedTools.length === 1
      ? `${toolNames} was selected for configuration`
      : `${toolNames} were selected for configuration`;
  };

  return (    
    <div className="onboardStyle">      
        <Grid container
          spacing={2}
          style={{  marginLeft: "2px" }}>
          <Tabs
            value={state.selectedTab}
            onChange={handleTabChange}
            aria-label="configuration tabs"
          >
            <Tab label="Addition-Client/Project/Tools" style={tabStyle} />
            <Tab label="Tools Configuration" style={tabStyle} />
          </Tabs>
          </Grid>
          <Grid
          container
          spacing={2}
          style={{ marginTop: "30px", marginLeft: "0px" }}
        >
          {state.selectedTab === 0 && (
            <>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className="nokia">
                  <FormControl
                    fullWidth
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <ManageAccountsRoundedIcon
                          sx={{
                            marginRight: 8,
                            color: "#8ba5e1",
                            width: "53px",
                            height: "50px",
                          }}
                          fontSize="small"
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Box>
                          <FormControl variant="filled" sx={{ minWidth: 246 }}>
                            <StyledTextField
                              autoComplete="off"
                              label="Client Name"
                              value={state.addClientName}
                              name="addClientName"
                              onChange={handleChange}
                              variant="filled"
                              InputLabelProps={{
                                sx: {
                                  color: "#FFFFF",
                                },
                              }}
                            ></StyledTextField>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid></Grid>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className="nokia">
                  <FormControl
                    fullWidth
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <AccountTreeRoundedIcon
                          style={{
                            marginRight: 8,
                            color: "#8ba5e1",
                            width: "53px",
                            height: "50px",
                          }}
                          fontSize="small"
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Box>
                          <FormControl variant="filled" sx={{ minWidth: 246 }}>
                            <StyledTextField
                              autoComplete="off"
                              label="Project Name"
                              value={state.addProjectName}
                              name="addProjectName"
                              onChange={handleChange}
                              variant="filled"
                              InputLabelProps={{
                                sx: {
                                  color: "#FFFFF",
                                },
                              }}
                            ></StyledTextField>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                    <Grid></Grid>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className="nokia">
                  <FormControl
                    fullWidth
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <ConstructionRoundedIcon
                          style={{
                            marginRight: 8,
                            color: "#8ba5e1",
                            width: "53px",
                            height: "50px",
                          }}
                          fontSize="small"
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Box>
                          <FormControl variant="filled" sx={{ minWidth: 246 }}>
                            <InputLabel
                              style={{ color: "#a9c2ff" }}
                              id="demo-simple-select-label"
                            >
                              Tools to Configure
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select-filled"
                              multiple
                              value={state.addPreSelectedTools}
                              onChange={handlePreToolChange}
                              renderValue={(selected) => (
                                <div
                                  style={{
                                    whiteSpace: "break-spaces",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {selected
                                    .map((tool) => {
                                      if (tool.name === "PCI")
                                        return "PCI-Anomaly";
                                      if (tool.name === "RSI")
                                        return "RSI-Anomaly";
                                      if (tool.name === "Output")
                                        return "PCI-RSI Anomaly";
                                      return tool.name;
                                    })
                                    .join(", ")}
                                </div>
                              )}
                            >
                              {dataAdd.map((tool) => (
                                <MenuItem key={tool.id} value={tool}>
                                  <Checkbox
                                    checked={
                                      state.addPreSelectedTools.indexOf(tool) >
                                      -1
                                    }
                                  />
                                  <ListItemText
                                    primary={
                                      tool.name === "PCI"
                                        ? "PCI-Anomaly"
                                        : tool.name === "RSI"
                                        ? "RSI-Anomaly"
                                        : tool.name === "Output"
                                        ? "PCI-RSI Anomaly"
                                        : tool.name
                                    }
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledButton className="execute" onClick={handleClear}>
                  RESET
                </StyledButton>
                <StyledButton
                  className="execute"
                  onClick={handleStoreClick({
                    vertical: "top",
                    horizontal: "right",
                  })}
                  disabled={isStoreButtonDisabled}
                >
                  STORE
                </StyledButton>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  onClose={handleClose}
                  message="Successfully Stored"
                  key={state.vertical + state.horizontal}
                  autoHideDuration={3000}
                />
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "38px", marginLeft: "18px" }}
              >
                <div style={textStyle}>
                  <span>Pre Sequential Tools Selected: </span>
                  {state.addPreSelectedTools.map((tool) => (
                    <Chip
                      // label={tool.name}
                      label={
                        tool.name === 'PCI' ? 'PCI-Anomaly' :
                        tool.name === 'RSI' ? 'RSI-Anomaly' :
                        tool.name === 'Output' ? 'PCI-RSI Anomaly' : tool.name
                      }
                      key={tool.id}
                      style={{ margin: "5px" }}
                      color="primary"
                    />
                  ))}
                </div>
              </Grid>
            </>
          )}
          {state.selectedTab === 1 && (
            <>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className="nokia">
                  <FormControl
                    fullWidth
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <ConstructionRoundedIcon
                          style={{
                            marginRight: 8,
                            color: "#8ba5e1",
                            width: "53px",
                            height: "50px",
                          }}
                          fontSize="small"
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Box>
                          <FormControl variant="filled" sx={{ minWidth: 246 }}>
                            <InputLabel
                              style={{ color: "#a9c2ff" }}
                              id="demo-simple-select-label"
                            >
                              Tools to Configure
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select-filled"
                              value={state.selectedTool1}
                              onChange={handleSelectChange}
                              // style={{ color: "#a9c2ff" }}
                            >
                              {dataAdd.map((tool) => (
                                <MenuItem key={tool.id} value={tool.name}>
                                  {tool.name === "PCI"
                                    ? "PCI-Anomaly"
                                    : tool.name === "RSI"
                                    ? "RSI-Anomaly"
                                    : tool.name === "Output"
                                    ? "PCI-RSI Anomaly"
                                    : tool.name}
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <Box className="nokia">
                  <FormControl
                    fullWidth
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={2}>
                        <HandymanRoundedIcon
                          style={{
                            marginRight: 8,
                            color: "#8ba5e1",
                            width: "53px",
                            height: "50px",
                          }}
                          fontSize="small"
                        />
                      </Grid>
                      <Grid item xs={10}>
                        <Box>
                          <FormControl variant="filled" sx={{ minWidth: 246 }}>
                            <InputLabel
                              style={{ color: "#a9c2ff" }}
                              id="demo-simple-select-label"
                            >
                              Pre Sequential Tools
                            </InputLabel>
                            <Select
                              labelId="demo-simple-select-label"
                              id="demo-simple-select-filled"
                              multiple
                              value={state.addSelectedTools}
                              onChange={handleToolChange}
                              renderValue={(selected) => (
                                <div
                                  style={{
                                    whiteSpace: "break-spaces",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                  }}
                                >
                                  {/* {selected.map((tool) => tool.name).join(", ")} */}
                                  {selected
                                    .map((tool) => {
                                      if (tool.name === "PCI")
                                        return "PCI-Anomaly";
                                      if (tool.name === "RSI")
                                        return "RSI-Anomaly";
                                      if (tool.name === "Output")
                                        return "PCI-RSI Anomaly";
                                      return tool.name;
                                    })
                                    .join(", ")}
                                </div>
                              )}
                            >
                              {dataAdd.map((t) => (
                                <MenuItem key={t.id} value={t}>
                                  <Checkbox
                                    checked={
                                      state.addSelectedTools.indexOf(t) > -1
                                    }
                                  />
                                  <ListItemText
                                    primary={
                                      t.name === "PCI"
                                        ? "PCI-Anomaly"
                                        : t.name === "RSI"
                                        ? "RSI-Anomaly"
                                        : t.name === "Output"
                                        ? "PCI-RSI Anomaly"
                                        : t.name
                                    }
                                  />
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                        </Box>
                      </Grid>
                    </Grid>
                  </FormControl>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}></Grid>
              <Grid item xs={12} sm={6} md={4} lg={3}>
                <StyledButton className="execute" onClick={handleClear}>
                  RESET
                </StyledButton>
                <StyledButton
                  className="execute"
                  // className={state.isClicked ? "execute-clicked" : "execute"}
                  onClick={handleSubmitClick({
                    vertical: "top",
                    horizontal: "right",
                  })}
                  disabled={isSubmitButtonDisabled}
                >
                  SUBMIT
                </StyledButton>
                <Snackbar
                  anchorOrigin={{ vertical, horizontal }}
                  open={open}
                  onClose={handleClose}
                  message="Successfully Submitted"
                  key={state.vertical + state.horizontal}
                  autoHideDuration={3000}
                />
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "38px", marginLeft: "18px" }}
              >
                <div style={textStyle}>
                  <span style={textStyle}>Tools Selected to Configure:</span>

                  {state.selectedTool1 && (
                    <Chip
                      label={
                        state.selectedTool1 === 'PCI' ? 'PCI-Anomaly' :
                        state.selectedTool1 === 'RSI' ? 'RSI-Anomaly' :
                        state.selectedTool1 === 'Output' ? 'PCI-RSI Anomaly' : state.selectedTool1
                      }
                      key={state.selectedTool1}
                      style={{ margin: "5px" }}
                      color="primary"
                    />
                  )}
                </div>
              </Grid>
              <Grid
                container
                spacing={2}
                style={{ marginTop: "38px", marginLeft: "18px" }}
              >
                <div style={textStyle}>
                  <span>Pre Sequential Tools Selected: </span>
                  {state.addSelectedTools.map((tool) => (
                    <Chip
                      label={
                        tool.name === 'PCI' ? 'PCI-Anomaly' :
                        tool.name === 'RSI' ? 'RSI-Anomaly' :
                        tool.name === 'Output' ? 'PCI-RSI Anomaly' : tool.name
                      }
                      key={tool.id}
                      style={{ margin: "5px" }}
                      color="primary"
                    />
                  ))}
                </div>
              </Grid>
            </>
          )}
        </Grid>     
    </div>
  );
}

export default OnboardScreen;
