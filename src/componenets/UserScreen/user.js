import React, { useState, useEffect, useMemo, useCallback } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import Cron from "react-cron-generator";
import cronParser from "cron-parser";
import "../../componenets/CronGenerator/cronGenerator.css";
import { format, parse } from "date-fns";
import { styled } from "@mui/system";
import ManageAccountsRoundedIcon from "@mui/icons-material/ManageAccountsRounded";
import AccountTreeRoundedIcon from "@mui/icons-material/AccountTreeRounded";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import ConstructionRoundedIcon from "@mui/icons-material/ConstructionRounded";
import "./User.css";
import { CircularProgress } from "@mui/material";
import ExecuteToolInfo from "../../componenets/ExecuteToolInfo/ExecuteToolInfo";
import { useNavigate } from "react-router-dom";
import UserSummary from "../../componenets/UserSummary/UserSummary";

const textStyle = {
  position: "relative",
  textAlign: "left",
  color: "#fff",
  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
  fontSize: "16px",
  opacity: 1,
};

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
      "transparent linear-gradient(116deg, #5B6E9A 0%, #707070 52%, #5B6E9A 100%) 0% 0% no-repeat padding-box",
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
  "&.execute-clicked": {
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
});

function UserScreen({ data, executeData, isExecuting, setIsExecuting }) {
  const [selectedCname, setSelectedCname] = useState("");
  const [selectedPname, setSelectedPname] = useState("");
  const [selectedTname, setSelectedTname] = useState([]);
  const [state, setState] = useState({
    open: false,
    vertical: "top",
    horizontal: "center",
  });
  const [shouldExecute, setShouldExecute] = useState(false);
  const [scheduledTime, setscheduledTime] = useState(null);
  const { vertical, horizontal, open } = state;
  const [timeCycle, settimeCycle] = useState("");
  const [displayCron, setDisplayCron] = useState(false);
  const [schedulerType, setSchedulerType] = useState("manual");
  const [isTimerSet, setisTimerSet] = useState(false);
  const [year, setYear] = useState("");
  const [month, setMonth] = useState("");
  const [day, setDay] = useState("");
  const [hour, setHour] = useState("");
  const [minute, setMinute] = useState("");
  const [second, setSecond] = useState("");
  const [toolNames, setToolNames] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const navigate = useNavigate();
  const { username } = JSON.parse(localStorage.getItem('token'));
  console.log(username);
  const handleYearChange = (event) => {
    setYear(event.target.value);
  };

  const handleMonthChange = (event) => {
    setMonth(event.target.value);
  };

  const handleDayChange = (event) => {
    setDay(event.target.value);
  };

  const handleHourChange = (event) => {
    setHour(event.target.value);
  };

  const handleMinuteChange = (event) => {
    setMinute(event.target.value);
  };

  const handleSecondChange = (event) => {
    setSecond(event.target.value);
  };

  const handleCronChange = (cron) => {
    settimeCycle(cron);
  };

  const timeDuration = useMemo(() => {
    const duration = [];
    if (year > 0) duration.push(`P${year}Y`);
    if (month > 0) duration.push(`P${month}M`);
    if (day > 0) duration.push(`P${day}D`);
    if (hour > 0) duration.push(`PT${hour}H`);
    if (minute > 0) duration.push(`PT${minute}M`);
    if (second > 0) duration.push(`PT${second}S`);
    return duration;
  }, [year, month, day, hour, minute, second]);

  const timeDurationString = timeDuration.join("") || "PT0S";

  const getNextRunTimes = (expression) => {
    try {
      const interval = cronParser.parseExpression(expression);
      return [...Array(5)].map(() => interval.next().toString());
    } catch (err) {
      return ["Invalid cron expression"];
    }
  };
  const isExecuteButtonDisabled =
    !selectedCname || !selectedPname || selectedTname.length === 0;

  const uniqueCnames = [...new Set(data.map((item) => item.cname))];
  const uniquePnames = [
    ...new Set(
      data
        .filter((item) => item.cname === selectedCname)
        .map((item) => item.pname)
    ),
  ];
  const uniqueTnames = [
    ...new Set(
      data
        .filter((item) => item.pname === selectedPname)
        .map((item) => {
          console.log(item.tname);

          return item.tname;
        })
    ),
  ];

  const mountedRef = React.createRef();

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  });

  const handleTnameChange = useCallback(
    async (event) => {
      const {
        target: { value },
      } = event;
      const newSelectedTname =
        typeof value === "string" ? value.split(",") : value;
      const filteredNewSelectedTname = newSelectedTname.filter(
        (tool) => tool && tool.trim() !== ""
      );
      const deselectedTools = selectedTname.filter(
        (tool) => !filteredNewSelectedTname.includes(tool)
      );
      if (mountedRef.current) {
        setSelectedTname(filteredNewSelectedTname);
      }
      if (filteredNewSelectedTname.length === 0) {
        return;
      }

      const postData = {
        toolname: filteredNewSelectedTname[0],
      };
      try {
        const response = await fetch(
          "http://localhost:8090/api/predefinedtools",
          // "http://wfm-toolconfig.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/predefinedtools",

          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(postData),
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const result = await response.json();

        const trimmedResult = JSON.parse(
          JSON.stringify(result),
          (key, value) => {
            if (typeof value === "string") {
              return value.trim();
            }
            return value;
          }
        );

        const filteredResult = trimmedResult.map((item) => {
          const { predefinedtools, ...rest } = item;
          return predefinedtools === null ? rest : item;
        });

        const toolConfigurations = filteredResult.reduce((acc, item) => {
          acc[item.toolname] = item.predefinedtools;
          return acc;
        }, {});

        const selectedToolname = filteredNewSelectedTname[0];
        const predefinedToolsForSelectedTool =
          toolConfigurations[selectedToolname];

        if (predefinedToolsForSelectedTool) {
          const updatedSelectedTname = [
            ...predefinedToolsForSelectedTool,
            ...filteredNewSelectedTname,
          ];

          const finalSelectedTname = [
            ...new Set(
              updatedSelectedTname.filter(
                (tool) => !deselectedTools.includes(tool)
              )
            ),
          ];

          setSelectedTname(finalSelectedTname);
          setToolNames(finalSelectedTname);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    },
    [mountedRef, selectedTname]
  );

  useEffect(() => {
    console.log("Selected tools:", selectedTname);
  }, [selectedTname]);

  const preSelectedMessage = () => {
    if (selectedTname.length === 1) {
      return `${toolNames} was selected for configuration`;
    } else {
      return `${toolNames} were selected for configuration`;
    }
  };

  const handleClear = useCallback(() => {
    setSelectedTname([]);
    setSelectedCname("");
    setSelectedPname("");
    setSchedulerType("manual");
    setisTimerSet(false);
    setYear("");
    setMonth("");
    setDay("");
    setHour("");
    setMinute("");
    setSecond("");
  }, []);

  useEffect(() => {
    if (shouldExecute) {
      const postData = {
        username:username,
        clientName: selectedCname,
        projectName: selectedPname,
        tools: selectedTname.map((tool) => tool.trim()),
        schedulerType,
        scheduledTime: schedulerType === "scheduledTime" ? scheduledTime : null,
        timeDuration:
          schedulerType === "timeDuration" ? timeDurationString : null,
        timeCycle: schedulerType === "timeCycle" ? timeCycle : null,
        isTimerSet:
          schedulerType === "" || schedulerType === "manual"
            ? isTimerSet
            : true,
      };
      const executePostRequest = async () => {
        try {
          const response = await fetch(
            "http://localhost:8090/api/startProcess",
            // "http://wfm-toolconfig.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/startProcess",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(postData),
            }
          );

          if (!response.ok) {
            throw new Error(`Error ${response.status}: ${response.statusText}`);
          }

          const result = await response.json();

          localStorage.setItem("processedData", JSON.stringify(result));
          localStorage.setItem("toolnames", JSON.stringify(selectedTname));
          setIsExecuting(false);
          setState({ ...state, open: true });
          navigate(0);
        } catch (error) {
          setIsExecuting(false);
          console.error("Error storing data:", error);
        } finally {
          setShouldExecute(false);
          handleClear();
        }
      };
      executePostRequest();
      setShouldExecute(false);
      handleClear();
    }
  }, [
    shouldExecute,
    selectedCname,
    selectedPname,
    selectedTname,
    schedulerType,
    scheduledTime,
    timeCycle,
    isTimerSet,
    timeDurationString,
  ]);

  const handleExecuteClick = useCallback(
    (newState) => () => {
      setIsExecuting(true);
      setShouldExecute(true);
    },
    []
  );

  const handleClose = useCallback(() => {
    setState({ ...state, open: false });
  }, [state]);

  return (
    <div className="userStyle">      
        <Grid 
          container
          spacing={2}
          style={{ marginTop: "10px", marginLeft: "2px" }}
        >
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
                          Customer
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-filled"
                          value={selectedCname}
                          onChange={(e) => {
                            setSelectedCname(e.target.value);
                            setSelectedPname("");
                            setSelectedTname([]);
                          }}
                          style={{ color: "#a9c2ff" }}
                        >
                          {uniqueCnames.map((cname) => (
                            <MenuItem key={cname} value={cname}>
                              {cname}
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
                        <InputLabel
                          style={{ color: "#a9c2ff" }}
                          id="demo-simple-select-label"
                        >
                          Project
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-filled"
                          value={selectedPname}
                          onChange={(e) => {
                            setSelectedPname(e.target.value);
                            setSelectedTname([]);
                          }}
                          style={{ color: "#a9c2ff" }}
                        >
                          {uniquePnames.map((pname) => (
                            <MenuItem key={pname} value={pname}>
                              {pname}
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
                          Tools to populate
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-filled"
                          multiple
                          value={selectedTname}
                          onChange={handleTnameChange}
                          renderValue={(selected) => (
                            <div
                              style={{
                                whiteSpace: "break-spaces",
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                              }}
                            >
                              {selected
                                .map((tname) =>
                                  tname === "PCI"
                                    ? "PCI-Anomaly"
                                    : tname === "RSI"
                                    ? "RSI-Anomaly"
                                    : tname === "Output"
                                    ? "PCI-RSI Anomaly"
                                    : tname
                                )
                                .join(", ")}
                            </div>
                          )}
                        >
                          {uniqueTnames.map((tname) => (
                            <MenuItem key={tname} value={tname}>
                              <Checkbox
                                checked={selectedTname.indexOf(tname) > -1}
                              />
                              <ListItemText
                                primary={
                                  tname === "PCI"
                                    ? "PCI-Anomaly"
                                    : tname === "RSI"
                                    ? "RSI-Anomaly"
                                    : tname === "Output"
                                    ? "PCI-RSI Anomaly"
                                    : tname
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
            <StyledButton className="reset" onClick={handleClear}>
              RESET
            </StyledButton>

            <StyledButton
              className={isClicked ? "execute-clicked" : "execute"}
              onClick={handleExecuteClick({
                vertical: "top",
                horizontal: "right",
              })}
              disabled={isExecuteButtonDisabled}
            >
              {isExecuting ? (
                <CircularProgress size={24} sx={{ color: "#FFF" }} />
              ) : (
                "EXECUTE"
              )}
            </StyledButton>

            <Snackbar
              anchorOrigin={{ vertical, horizontal }}
              open={open}
              onClose={handleClose}
              message={preSelectedMessage()}
              key={vertical + horizontal}
              autoHideDuration={3000}
            />
          </Grid>
          <Grid item xs={3}>
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
                    <AccessAlarmIcon
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
                          Scheduler Type
                        </InputLabel>
                        <Select
                          labelId="demo-simple-select-label"
                          id="demo-simple-select-filled"
                          value={schedulerType}
                          onChange={(e) => setSchedulerType(e.target.value)}
                          style={{ color: "#a9c2ff" }}
                        >
                          <MenuItem value="manual">Manual</MenuItem>
                          <MenuItem value="scheduledTime">
                            scheduled Time
                          </MenuItem>
                          <MenuItem value="timeDuration">
                            Time Duration
                          </MenuItem>
                          <MenuItem value="timeCycle">Time Cycle</MenuItem>
                        </Select>
                      </FormControl>
                    </Box>
                  </Grid>
                </Grid>
                <Grid></Grid>
              </FormControl>
            </Box>
          </Grid>
          {schedulerType === "scheduledTime" && (
            <Grid xs={3}>
              <Box className="dateTime">
                <FormControl
                  fullWidth
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Grid sx={{ minWidth: 236 }}>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                      <DateTimePicker
                        value={parse(
                          scheduledTime,
                          "yyyy-MM-dd'T'HH:mm:ssxxx",
                          new Date()
                        )}
                        onChange={(newValue) => {
                          const formattedDate = format(
                            newValue,
                            "yyyy-MM-dd'T'HH:mm:ssxxx"
                          );
                          setscheduledTime(formattedDate);
                        }}
                        renderInput={(params) => (
                          <TextField
                            {...params}
                            fullWidth
                            sx={{
                              // Remove the default border from the TextField
                              "& .MuiOutlinedInput-root": {
                                border: "none ", // Remove the default border
                                "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                  {
                                    borderWidth: "0 ", // Remove the focused border
                                  },
                              },
                            }}
                          />
                        )}
                      />
                    </LocalizationProvider>
                  </Grid>
                </FormControl>
              </Box>
            </Grid>
          )}

          {schedulerType === "timeDuration" && (
            <Grid xs={6}>
              <Box className="timeDur">
                <FormControl
                  fullWidth
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Grid sx={{ minWidth: 236 }}>
                    <Grid
                      container
                      direction="row"
                      spacing={{ xs: 1 }}
                    >
                      <Grid item xs={2}>
                        <TextField
                          autoComplete="off"
                          label="Year"
                          value={year}
                          onChange={handleYearChange}
                          type="number"
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          autoComplete="off"
                          label="Month"
                          value={month}
                          onChange={handleMonthChange}
                          type="number"
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          autoComplete="off"
                          label="Day"
                          value={day}
                          onChange={handleDayChange}
                          type="number"
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          autoComplete="off"
                          label="Hour"
                          value={hour}
                          onChange={handleHourChange}
                          type="number"
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          autoComplete="off"
                          label="Minute"
                          value={minute}
                          onChange={handleMinuteChange}
                          type="number"
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={2}>
                        <TextField
                          autoComplete="off"
                          label="Second"
                          value={second}
                          onChange={handleSecondChange}
                          type="number"
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </FormControl>
              </Box>
            </Grid>
          )}
          {schedulerType === "timeCycle" && (
            <Grid xs={9}>
              <Box>
                <FormControl
                  fullWidth
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <Grid sx={{ minWidth: 236 }}>
                    <Grid
                      container
                      spacing={{ xs: 2, md: 1 }}
                    >
                      <Cron value={timeCycle} onChange={handleCronChange} />
                      {displayCron && (
                        <div className="next-run-times">
                          <h3>Next Run Times:</h3>
                          <ul>
                            {getNextRunTimes(timeCycle).map((time, index) => (
                              <li key={index}>{time}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </FormControl>
              </Box>
            </Grid>
          )}
        </Grid>
        <Grid
          container
          spacing={2}
          style={{ marginTop: "38px", marginLeft: "26px" }}
        >
          <div style={textStyle}>
            <span style={textStyle}>Pre Process Instance Configuration:</span>
            {selectedTname.map((tname) => (
              <Chip
                // label={tname}
                label={
                  tname === 'PCI' ? 'PCI-Anomaly' :
                  tname === 'RSI' ? 'RSI-Anomaly' :
                  tname === 'Output' ? 'PCI-RSI Anomaly' : tname
                }
                key={tname}
                style={{ margin: "5px" }}
                color="primary"
              />
            ))}
          </div>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{margin: "10px" }}
        >
          <Grid item xs={4} >
          <UserSummary />
        </Grid>
        </Grid>
        <Grid
          container
          spacing={2}
          style={{ margin: "10px" }}
        >
          <Grid item xs={11} >
          <ExecuteToolInfo exeData = {executeData}/>
        </Grid>
        <Grid item xs={1} ></Grid>
        </Grid>        
    </div>
  );
}

export default UserScreen;