import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  TablePagination,
  Paper,
  TextField,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Checkbox,
  ListItemText,
  OutlinedInput,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  ClickAwayListener,
  Breadcrumbs,
  Link,
  Stack,
} from "@mui/material";
import { FaFilter } from "react-icons/fa";
import {
  ResponsiveContainer,

  Cell,
  RadialBarChart,
  RadialBar,

  Area,
  CartesianGrid,
  Tooltip,
  Legend,
  XAxis,
  YAxis,
  LineChart,
  Line,
  BarChart,
  Bar
} from "recharts";

import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import "../DashboardScreen/dashboardScreen.css";
import ExcelJS from "exceljs";
import { useNavigate } from "react-router-dom";
import CustomLineChart from "./lineChart";

import Chart from "./charts";


const custom = {
  textAlign: "left",
  color: "#FFF",
  fontFamily: "system-ui",
  fontSize: "13px",
  opacity: 1,
};

const stopStyle = {
  color: "#FFF",
  fontFamily: "system-ui",
  fontSize: "13px",
  opacity: 1,
};

const tooltipStyle = {
  fontFamily: "'Open Sans', sans-serif",
};

const StyledContainerDropDown = styled(Container)({
  width: "100%",
  maxWidthh: "100%",
  backgroundColor: "#1c1444",
  marginBottom: "25px",
  borderRadius: "10px",
  padding: "20px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "20px",
  position: "relative",
});

const StyledInputLabel = styled(InputLabel)({
  color: "#97b5f9",
  marginLeft: "5px",
});
const StyledFormControl = styled(FormControl)({
  minWidth: 190,
  marginLeft: "5px",
  textAlign: "center",
});
const StyledSelect = styled(Select)({
  color: "#97b5f9",
  ".MuiSelect-icon": {
    color: "black",
  },
  ".MuiList-root": {
    backgroundColor: "#1C0D46",
    color: "white",
  },
  ".MuiPaper-root": {
    backgroundColor: "#1C0D46",
    color: "white",
  },
});



const DashboardScreen = () => {
  const location = useLocation();
  const responsesData = location.state.responsesData.toolData;
  const [searchTerms, setSearchTerms] = useState({});
  const [filterConditions, setFilterConditions] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState(
    Object.keys(responsesData.jsonData.data[0])
  );
  const [selectedChart, setSelectedChart] = useState("");
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [stopwatchTime, setStopwatchTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const [open, setOpen] = useState(false);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [toolname, setToolname] = useState([]);
  const [timePeriod, setTimePeriod] = useState("");
  const [chartData, setChartData] = useState([]);
  const [columnAction, setColumnAction] = useState({});
  const [sent, setSent] = useState(false);
  const [exitDB, setexitDB] = useState({});
  const navigate = useNavigate();



  const filterOptions = useMemo(() => {
    const filteredData = responsesData.jsonData.data.filter((item) => {
      return Object.keys(searchTerms).every((searchKey) => {
        const searchTerm = searchTerms[searchKey]?.toLowerCase() || "";
        const itemValue = item[searchKey].toString().toLowerCase();
        const filterCondition = filterConditions[searchKey] || "includes";
        if (filterCondition === "includes") {
          return itemValue.includes(searchTerm);
        } else if (filterCondition === "equals") {
          return itemValue === searchTerm;
        } else if (filterCondition === "startsWith") {
          return itemValue.startsWith(searchTerm);
        } else if (filterCondition === "endsWith") {
          return itemValue.endsWith(searchTerm);
        }
        return true;
      });
    });

    return Object.keys(responsesData.jsonData.data[0]).reduce((acc, key) => {
      acc[key] = [
        ...new Set(filteredData.map((item) => String(item[key]).toLowerCase())),
      ];
      return acc;
    }, {});
  }, [searchTerms, filterConditions]);






  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      clearInterval(interval);
    };
  }, [isRunning]);

  const handleClick = () => {
    setIsRunning(false);
    makeApiCall(stopwatchTime);
    navigate('/dashboard', { state: { exitDB } });
  };

  const handleSearch = (key, value) => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [key]: value,
    }));
    setPage(0);
  };


  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = responsesData.jsonData.data.filter((item) =>
    Object.keys(searchTerms).every((key) => {
      const searchTerm = searchTerms[key]?.toLowerCase() || "";
      const itemValue = item[key].toString().toLowerCase();
      const filterCondition = filterConditions[key] || "includes";
      if (filterCondition === "includes") {
        return itemValue.includes(searchTerm);
      } else if (filterCondition === "equals") {
        return itemValue === searchTerm;
      } else if (filterCondition === "startsWith") {
        return itemValue.startsWith(searchTerm);
      } else if (filterCondition === "endsWith") {
        return itemValue.endsWith(searchTerm);
      }
      return true;
    })
  );


  const sortedData = filteredData.sort((a, b) => {
    if (sortConfig.key) {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];
      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }
    }
    return 0;
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleColumnChange = (event) => {
    const { value } = event.target;
    setSelectedColumns(value);
  };

  const handleSelectAllColumns = () => {
    setSelectedColumns(Object.keys(responsesData.jsonData.data[0]));
  };

  const handleDeselectAllColumns = () => {
    const defaultColumns = Object.keys(responsesData.jsonData.data[0]).slice(0, 5);
    setSelectedColumns(defaultColumns);
  };

  const columns = selectedColumns.map((column) => (
    <TableCell key={column}>
      <TableSortLabel
        active={sortConfig.key === column}
        direction={sortConfig.direction}
        onClick={() => handleSort(column)}
      >
        {column}
      </TableSortLabel>
      <Checkbox
        checked={selectedColumns.includes(column)}
        onChange={() => handleChangeColumnSelection(column)}
      />
    </TableCell>
  ));

  const handleChangeColumnSelection = (column) => {
    if (selectedColumns.includes(column)) {
      setSelectedColumns(selectedColumns.filter((c) => c !== column));
    } else {
      setSelectedColumns([...selectedColumns, column]);
    }
  };

  const handleChartChange = (event) => {
    setSelectedChart(event.target.value);
  };

  const handelToolnameChange = (event) => {
    const { value } = event.target;
    setToolname(typeof value === "string" ? value.split(",") : value);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    if (name === "startTime") {
      setStartTime(value);
    } else if (name === "endTime") {
      setEndTime(value);
    } else if (name === "toolname") {
      setToolname(value);
    }
  };

  const currentRows = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleExit = () => {
    handleClose();
    window.close();
  };

  const handleStopClick = () => {
    setIsRunning(false);
    makeApiCall(stopwatchTime);
    navigate('/dashboard', { state: { exitDB } });
  };

  const makeApiCall = (time) => {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    const viewTime = `${padZero(hours)}:${padZero(minutes)}:${padZero(seconds)}`;

    const token = JSON.parse(localStorage.getItem('token'));
    const username = token.username;

    // const apiUrl = 'http://dts-api.production3.k-gsd.es-si-os-gsn-52.k8s.dyn.nesc.nokia.net/api/users/dtsexit';
    const apiUrl = "http://localhost:9001/api/users/dtsexit";
    const data = {
      viewTime,
      userName: username,
      client: responsesData.client,
      project: responsesData.project,
      toolname: responsesData.toolName
    };

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(apiUrl, requestOptions)
      .then(response => response.json())
      .then(data => setexitDB(data))
      .catch(error => console.error(error));

    setSent(true);
  };

  const padZero = (num) => {
    return (num < 10 ? '0' : '') + num;
  }

  const COLORS = [
    "#E23B3B",
    "#F7B737",
    "#23ABB6",
  ];
  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleColumnAction = (column, action) => {
    setColumnAction((prevAction) => ({ ...prevAction, [column]: action }));
  };


  const handleExport = () => {
    if (
      !responsesData ||
      !responsesData.jsonData.data ||
      !responsesData.jsonData.report
    ) {
      alert("No data to export!");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet1 = workbook.addWorksheet("Data");
    const sheet2 = workbook.addWorksheet("Report");

    const headers1 = Object.keys(responsesData.jsonData.data[0]);
    sheet1.addRow(headers1);

    sheet1.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" },
    }; // Light blue

    responsesData.jsonData.data.forEach((row) => {
      sheet1.addRow(Object.values(row));
    });

    headers1.forEach((header, columnIndex) => {
      const maxLength = Math.max(
        header.length,
        ...responsesData.jsonData.data.map(
          (row) => Object.values(row)[columnIndex].toString().length
        )
      );
      sheet1.getColumn(columnIndex + 1).width = maxLength < 10 ? 10 : maxLength;
    });

    const headers2 = Object.keys(responsesData.jsonData.report);
    sheet2.addRow(headers2);
    // sheet2.getRow(1).font = { bold: true, color: { argb: 'FF000080' } }; // Light blue
    sheet2.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" },
    }; // Light blue

    sheet2.addRow(Object.values(responsesData.jsonData.report));

    headers2.forEach((header, columnIndex) => {
      const maxLength = Math.max(
        header.length,
        ...Object.values(responsesData.jsonData.report).map(
          (value) => value.toString().length
        )
      );
      sheet2.getColumn(columnIndex + 1).width = maxLength < 10 ? 10 : maxLength;
    });

    workbook.xlsx.writeBuffer().then((buffer) => {
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "Dashboardexcel.xlsx";
      a.click();
      URL.revokeObjectURL(url);
    });
  };




  return (
    <div className="userStyle">
      <Grid container spacing={2}>
        <Grid item xs={8}>
          <Stack spacing={2} style={custom}>
            <Breadcrumbs separator="›" aria-label="breadcrumb" style={custom}>
              <Link underline="hover" key="1" onClick={handleClick}>
                List of output tools
              </Link>
              <Typography style={custom}>Data Visualisation</Typography>
            </Breadcrumbs>
          </Stack>
        </Grid>
        <Grid item xs={4}>
          <Stack spacing={2} style={custom}>
            <FormControl
              style={{
                width: "1800",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                height: 20,
                padding: 10,
              }}
            >
              <div style={{ flex: 1 }} />
              <span style={stopStyle}>Stopwatch</span>
              <Typography
                variant="contained"
                color="secondary"
                style={{ marginLeft: 10 }}
              >
                {Math.floor(stopwatchTime / 60)}:
                {stopwatchTime % 60 < 10
                  ? `0${stopwatchTime % 60}`
                  : stopwatchTime % 60}
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                onClick={() => setIsRunning(!isRunning)}
                sx={{
                  margin: "8px",
                  color: "#EDF2F5",
                  borderColor: "1px solid #150B35",
                  boxShadow: "0px 0px 5px #00000029",
                  borderRadius: "10px",
                  background:
                    "transparent linear-gradient(112deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
                }}
              >
                {isRunning ? "Pause" : "Resume"}
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleStopClick}
                sx={{
                  margin: "8px",
                  color: "#EDF2F5",
                  borderColor: "1px solid #150B35",
                  boxShadow: "0px 0px 5px #00000029",
                  borderRadius: "10px",
                  background:
                    "transparent linear-gradient(112deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
                }}
              >
                Stop
              </Button>
              <Button
                onClick={handleExport}
                variant="contained"
                color="primary"
                hover={{
                  backgroundColor: "#545e99",
                  color: "white",
                }}
                sx={{
                  margin: "8px",
                  color: "#EDF2F5",
                  borderColor: "1px solid #150B35",
                  boxShadow: "0px 0px 5px #00000029",
                  borderRadius: "10px",
                  background:
                    "transparent linear-gradient(112deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
                }}
              >
                Export
              </Button>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer
            className="tableContainer"
            style={{
              maxHeight: 410,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
              minHeight: "380px",
            }}
          >
            <Table size="small" style={{ height: "100%" }}>
              <TableHead
                sx={{
                  position: "sticky",
                  top: 0,
                  backgroundColor: "#282468", // match the background color of the table
                  zIndex: 1,
                  color: "#fff !important",
                  border: "1px solid #4d5987",
                  "& th": {
                    padding: "4px 8px", // reduce padding
                    fontSize: 14, // reduce font size
                    color: "#fff !important",
                    borderBottom: "none!important",
                    borderRight: "1px solid #4d5987",
                    "&:last-child": {
                      borderRight: "none",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "#fff !important",
                    },
                  },
                }}
              >
                <TableRow
                  sx={{
                    color: "#fff !important",
                    opacity: 1,
                    font: "16px Robotonormal normal medium 16px/19px Roboto",
                    border: "1px solid #4d5987",
                    padding: "4px 8px", // reduce padding
                    fontSize: 14, // reduce font size
                  }}
                >
                  {selectedColumns.map((column) => (
                    <TableCell key={column}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#fff !important",
                        }}
                      >
                        {column}
                        <TableSortLabel
                          active={sortConfig.key === column}
                          direction={sortConfig.direction}
                          onClick={() => handleSort(column)}
                        ></TableSortLabel>
                        <FormControl
                          variant="standard"
                          style={{
                            minWidth: 2,
                            marginLeft: "1px",
                            textAlign: "center",
                            color: "#fff !important",
                          }}
                        >
                          <Select
                            value={columnAction[column]}
                            onChange={(e) =>
                              handleColumnAction(column, e.target.value)
                            }
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  backgroundColor: "#282468",
                                  color: "#fff !important",
                                },
                              },
                            }}
                          >
                            <ClickAwayListener onClickAway={() => { }}>
                              <MenuItem value="search">
                                <FormControl
                                  variant="standard"
                                  style={{
                                    minWidth: 210,
                                    marginLeft: "2px",
                                    textAlign: "center",
                                  }}
                                >
                                  <TextField
                                    InputLabelProps={{
                                      style: { color: "#fff !important" },
                                    }}
                                    InputProps={{
                                      style: { color: "#fff !important" },
                                    }}
                                    label="Search"
                                    value={searchTerms[column] || ""}
                                    onChange={(e) =>
                                      handleSearch(column, e.target.value)
                                    }
                                    variant="standard"
                                    style={{
                                      marginRight: "16px",
                                      color: "#fff !important",
                                    }}
                                  />
                                </FormControl>
                              </MenuItem>
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={() => { }}>
                              <MenuItem value="filter">
                                <FormControl
                                  variant="standard"
                                  style={{
                                    minWidth: 195,
                                    marginLeft: "2px",
                                    textAlign: "left",
                                  }}
                                >
                                  <StyledInputLabel>Filter</StyledInputLabel>
                                  <Select
                                    value={searchTerms[column] || ""}
                                    onChange={(e) =>
                                      handleSearch(column, e.target.value)
                                    }
                                    style={{
                                      marginLeft: "1px",
                                      color: "#fff !important",
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#fff !important" },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          backgroundColor: "#1C0D46",
                                          color: "#fff !important",
                                        },
                                      },
                                    }}
                                  >
                                    <MenuItem value="">All</MenuItem>
                                    {filterOptions[column].map(
                                      (option, idx) => (
                                        <MenuItem
                                          key={idx}
                                          value={option.toLowerCase()}
                                        >
                                          {option}
                                        </MenuItem>
                                      )
                                    )}
                                  </Select>
                                </FormControl>
                              </MenuItem>
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={() => { }}>
                              <StyledFormControl variant="standard">
                                <MenuItem value="selectedColumns">
                                  <StyledInputLabel
                                    shrink={false}
                                    style={{
                                      color: "#fff !important",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    Columns
                                  </StyledInputLabel>
                                  <StyledSelect
                                    multiple
                                    value={selectedColumns}
                                    onChange={handleColumnChange}
                                    //input={<OutlinedInput label="Columns" />}
                                    //renderValue={(selected) => selected.join(", ")}
                                    renderValue={() => null}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          backgroundColor: "#1C0D46",
                                          color: "#fff !important",
                                        },
                                      },
                                    }}
                                    style={{ width: 195 }}
                                  >
                                    <MenuItem value="selectAll">
                                      <Checkbox
                                        checked={
                                          selectedColumns.length ===
                                          Object.keys(
                                            responsesData.jsonData.data[0]
                                          ).length
                                        }
                                        indeterminate={
                                          selectedColumns.length > 0 &&
                                          selectedColumns.length <
                                          Object.keys(
                                            responsesData.jsonData.data[0]
                                          ).length
                                        }
                                        onChange={(event) => {
                                          if (event.target.checked) {
                                            handleSelectAllColumns();
                                          } else {
                                            handleDeselectAllColumns();
                                          }
                                        }}
                                      />
                                      <ListItemText primary="Select All" />
                                    </MenuItem>
                                    {Object.keys(
                                      responsesData.jsonData.data[0]
                                    ).map((column) => (
                                      <MenuItem key={column} value={column}>
                                        <Checkbox
                                          checked={
                                            selectedColumns.indexOf(column) > -1
                                          }
                                        />
                                        <ListItemText primary={column} />
                                      </MenuItem>
                                    ))}
                                  </StyledSelect>
                                </MenuItem>
                              </StyledFormControl>
                            </ClickAwayListener>
                          </Select>
                        </FormControl>
                      </div>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {currentRows.map((row, index) => (
                  <TableRow
                    sx={{
                      "& td": {
                        padding: "4px 8px", // reduce padding
                        fontSize: 14, // reduce font size
                      },
                    }}
                    key={index}
                  >
                    {selectedColumns.map((column, cellIndex) => (
                      <TableCell
                        sx={{
                          color: "#fff !important",
                          border: "1px solid #4d5987",
                          padding: "4px 8px", // reduce padding
                          fontSize: 14, // reduce font size
                        }}
                        key={cellIndex}
                      >
                        {row[column]}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Grid xs={12}>
            <TablePagination
              component="div"
              sx={{ color: "#fff !important" }}
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            //style={{ flexShrink: 0 }}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={6}><Chart /></Grid>
    </div>
  );
};
export default DashboardScreen;