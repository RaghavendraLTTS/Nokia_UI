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
  PieChart,
  Pie,
  Cell,
  RadialBarChart,
  RadialBar,
  AreaChart,
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
import GaugeChart from "react-gauge-chart";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import "../DashboardScreen/dashboardScreen.css";
import ExcelJS from "exceljs";

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
  useEffect(() => {
    console.log(responsesData.data.data[0]);
    console.log(responsesData.data.report);
  }, [responsesData]);

  const [searchTerms, setSearchTerms] = useState({});
  const [filterConditions, setFilterConditions] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState(
    Object.keys(responsesData.data.data[0])
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

  const filterOptions = useMemo(() => {
    const filteredData = responsesData.data.data.filter((item) => {
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

    return Object.keys(responsesData.data.data[0]).reduce((acc, key) => {
      acc[key] = [
        ...new Set(filteredData.map((item) => String(item[key]).toLowerCase())),
      ];
      return acc;
    }, {});
  }, [searchTerms, filterConditions]);

  const timePeriodOptions = [
    { value: "yesterday", label: "Yesterday" },
    { value: "lastWeek", label: "Last Week" },
    { value: "last1Month", label: "Last 1 Month" },
    { value: "last2Months", label: "Last 2 Months" },
    { value: "last3Months", label: "Last 3 Months" },
    { value: "today", label: "Today" },
  ];
  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiLink = "http://localhost:8091/api/report";
    const postData = {
      startTime: startTime.toString(),
      endTime: endTime.toString(),
      toolname: toolname.join(","),
    };

    try {
      const response = await fetch(apiLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const getStartTime = () => {
    const currentDate = new Date();
    switch (timePeriod) {
      case "yesterday":
        return new Date(
          currentDate.setDate(currentDate.getDate() - 1)
        ).toISOString();
      case "lastWeek":
        return new Date(
          currentDate.setDate(currentDate.getDate() - 7)
        ).toISOString();
      case "last1Month":
        return new Date(
          currentDate.setMonth(currentDate.getMonth() - 1)
        ).toISOString();
      case "last2Months":
        return new Date(
          currentDate.setMonth(currentDate.getMonth() - 2)
        ).toISOString();
      case "last3Months":
        return new Date(
          currentDate.setMonth(currentDate.getMonth() - 3)
        ).toISOString();
      case "today":
        return new Date(currentDate).toISOString();

      default:
        return "";
    }
  };

  const getEndTime = () => {
    const currentDate = new Date();
    switch (timePeriod) {
      case "yesterday":
        return new Date(currentDate).toISOString();
      case "lastWeek":
        return new Date(currentDate).toISOString();
      case "last1Month":
        return new Date(currentDate).toISOString();
      case "last2Months":
        return new Date(currentDate).toISOString();
      case "last3Months":
        return new Date(currentDate).toISOString();
      case "today":

      default:
        return "";
    }
  };

  useEffect(() => {
    let interval;
    if (isRunning) {
      interval = setInterval(() => {
        setStopwatchTime((prevTime) => prevTime + 1);
      }, 1000);
    } else if (!isRunning && stopwatchTime !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isRunning, stopwatchTime]);

  const handleSearch = (key, value) => {
    setSearchTerms((prevSearchTerms) => ({
      ...prevSearchTerms,
      [key]: value,
    }));
    setPage(0);
  };

  const handleFilterChange = (key, condition) => {
    setFilterConditions((prevFilterConditions) => ({
      ...prevFilterConditions,
      [key]: condition,
    }));
  };

  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const filteredData = responsesData.data.data.filter((item) =>
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

  const handleSearchChange = (event) => {
    setSearchTerms({
      ...searchTerms,
      [event.target.name]: event.target.value.toLowerCase(),
    });
  };
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
    setSelectedColumns(Object.keys(responsesData.data.data[0]));
  };

  const handleDeselectAllColumns = () => {
    const defaultColumns = Object.keys(responsesData.data.data[0]).slice(0, 5);
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

  let pieData = [];
  switch (responsesData.toolName) {
    case "RSI":
      pieData = [
        {
          name: "RSI Conflict",
          value: responsesData.data.report["RSI Anomaly Detected"],
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Relations Analyzed"],
        },
      ];
      break;
    case "PCI":
      pieData = [
        {
          name: "PCI Conflict",
          value: responsesData.data.report["PCI Anomaly Detected"],
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Relations Analyzed"],
        },
      ];
      break;
    case "Output":
      pieData = [
        {
          name: "RSI Conflict",
          value: responsesData.data.report["RSI Anomaly"],
        },
        {
          name: "PCI Conflict",
          value: responsesData.data.report["PCI Anomaly"],
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Anomaly"],
        },
      ];
      break;
    default:
      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }

  let radialData = [];
  switch (responsesData.toolName) {
    case "RSI":
      radialData = [
        {
          name: "RSI Conflict",
          value: responsesData.data.report["RSI Anomaly Detected"],
          fill: "#E23B3B",
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Relations Analyzed"],
          fill: "#23ABB6",
        },
      ];
      break;
    case "PCI":
      radialData = [
        {
          name: "PCI Conflict",
          value: responsesData.data.report["PCI Anomaly Detected"],
          fill: "#F7B737",
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Relations Analyzed"],
          fill: "#23ABB6",
        },
      ];
      break;
    case "Output":
      radialData = [
        {
          name: "RSI Conflict",
          value: responsesData.data.report["RSI Anomaly"],
          fill: "#E23B3B",
        },
        {
          name: "PCI Conflict",
          value: responsesData.data.report["PCI Anomaly"],
          fill: "#F7B737",
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Anomaly"],
          fill: "#23ABB6",
        },
      ];
      break;
    default:
      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }

  let areaData = [];
  switch (responsesData.toolName) {
    case "RSI":
      areaData = Object.keys(responsesData.data.report)
        .filter((key) => key.includes("RSI"))
        .map((key) => ({
          name: key.replace("_", " "),
          value: responsesData.data.report[key],
        }));
      break;
    case "PCI":
      areaData = Object.keys(responsesData.data.report)
        .filter((key) => key.includes("PCI"))
        .map((key) => ({
          name: key.replace("_", " "),
          value: responsesData.data.report[key],
        }));
      break;
    case "Output":
      areaData = Object.keys(responsesData.data.report).map((key) => ({
        name: key.replace("_", " "),
        value: responsesData.data.report[key],
      }));
      break;
    default:
      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }

  let barData = [];
  switch (responsesData.toolName) {
    case "RSI":
      barData = [
        {
          name: "RSI Conflict",
          value: responsesData.data.report["RSI Anomaly Detected"],
          fill: "#E23B3B",
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Relations Analyzed"],
          fill: "#23ABB6",
        },
      ];
      break;
    case "PCI":
      barData = [
        {
          name: "PCI Conflict",
          value: responsesData.data.report["PCI Anomaly Detected"],
          fill: "#F7B737",
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Relations Analyzed"],
          fill: "#23ABB6",
        },
      ];
      break;
    case "Output":
      barData = [
        {
          name: "RSI Conflict",
          value: responsesData.data.report["RSI Anomaly"],
          fill: "#E23B3B",
        },
        {
          name: "PCI Conflict",
          value: responsesData.data.report["PCI Anomaly"],
          fill: "#F7B737",
        },
        {
          name: "Total Conflict",
          value: responsesData.data.report["Total Anomaly"],
          fill: "#23ABB6",
        },
      ];
      break;
    default:
      console.error(`Unknown toolName: ${responsesData.toolName}`);
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
      !responsesData.data ||
      !responsesData.data.data ||
      !responsesData.data.report
    ) {
      alert("No data to export!");
      return;
    }

    const workbook = new ExcelJS.Workbook();
    const sheet1 = workbook.addWorksheet("Data");
    const sheet2 = workbook.addWorksheet("Report");

    const headers1 = Object.keys(responsesData.data.data[0]);
    sheet1.addRow(headers1);

    sheet1.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" },
    }; 

    responsesData.data.data.forEach((row) => {
      sheet1.addRow(Object.values(row));
    });

    headers1.forEach((header, columnIndex) => {
      const maxLength = Math.max(
        header.length,
        ...responsesData.data.data.map(
          (row) => Object.values(row)[columnIndex].toString().length
        )
      );
      sheet1.getColumn(columnIndex + 1).width = maxLength < 10 ? 10 : maxLength;
    });

    const headers2 = Object.keys(responsesData.data.report);
    sheet2.addRow(headers2);
    sheet2.getRow(1).fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFADD8E6" },
    }; 

    sheet2.addRow(Object.values(responsesData.data.report));

    headers2.forEach((header, columnIndex) => {
      const maxLength = Math.max(
        header.length,
        ...Object.values(responsesData.data.report).map(
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
              <Link underline="hover" key="1" href="/dashboard">
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
                onClick={() => setStopwatchTime(0)}
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
                  backgroundColor: "#282468", 
                  zIndex: 1,
                  color: "#fff",
                  border: "1px solid #4d5987",
                  "& th": {
                    padding: "4px 8px", 
                    fontSize: 14, 
                    color: "#fff ",
                    borderBottom: "none",
                    borderRight: "1px solid #4d5987",
                    "&:last-child": {
                      borderRight: "none",
                    },
                    "& .MuiTableSortLabel-icon": {
                      color: "#fff ",
                    },
                  },
                }}
              >
                <TableRow
                  sx={{
                    color: "#fff ",
                    opacity: 1,
                    font: "16px Robotonormal normal medium 16px/19px Roboto",
                    border: "1px solid #4d5987",
                    padding: "4px 8px", 
                    fontSize: 14, 
                  }}
                >
                  {selectedColumns.map((column) => (
                    <TableCell key={column}>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#fff ",
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
                            color: "#fff ",
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
                                  color: "#fff ",
                                },
                              },
                            }}
                          >
                            <ClickAwayListener onClickAway={() => {}}>
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
                                      style: { color: "#fff " },
                                    }}
                                    InputProps={{
                                      style: { color: "#fff " },
                                    }}
                                    label="Search"
                                    value={searchTerms[column] || ""}
                                    onChange={(e) =>
                                      handleSearch(column, e.target.value)
                                    }
                                    variant="standard"
                                    style={{
                                      marginRight: "16px",
                                      color: "#fff ",
                                    }}
                                  />
                                </FormControl>
                              </MenuItem>
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={() => {}}>
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
                                      color: "#fff ",
                                    }}
                                    InputLabelProps={{
                                      style: { color: "#fff " },
                                    }}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          backgroundColor: "#1C0D46",
                                          color: "#fff",
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
                            <ClickAwayListener onClickAway={() => {}}>
                              <StyledFormControl variant="standard">
                                <MenuItem value="selectedColumns">
                                  <StyledInputLabel
                                    shrink={false}
                                    style={{
                                      color: "#fff ",
                                      marginLeft: "15px",
                                    }}
                                  >
                                    Columns
                                  </StyledInputLabel>
                                  <StyledSelect
                                    multiple
                                    value={selectedColumns}
                                    onChange={handleColumnChange}
                                    renderValue={() => null}
                                    MenuProps={{
                                      PaperProps: {
                                        style: {
                                          backgroundColor: "#1C0D46",
                                          color: "#fff ",
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
                                            responsesData.data.data[0]
                                          ).length
                                        }
                                        indeterminate={
                                          selectedColumns.length > 0 &&
                                          selectedColumns.length <
                                            Object.keys(
                                              responsesData.data.data[0]
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
                                      responsesData.data.data[0]
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
                        padding: "4px 8px", 
                        fontSize: 14, 
                      },
                    }}
                    key={index}
                  >
                    {selectedColumns.map((column, cellIndex) => (
                      <TableCell
                        sx={{
                          color: "#fff ",
                          border: "1px solid #4d5987",
                          padding: "4px 8px",
                          fontSize: 14,
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
              sx={{ color: "#fff" }}
              count={sortedData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={4}>
          <aside style={{ width: "100%" }}>
            <FormControl
              variant="outlined"
              style={{
                minWidth: 200,
                justifyContent: "center",
                backgroundColor: "#1c1444",
                textColor: "#fff",
              }}
            >
              <InputLabel style={{ backgroundColor: "#1c1444", color: "#fff" }}>
                Select Chart
              </InputLabel>
              <Select
                value={selectedChart}
                onChange={(e) => setSelectedChart(e.target.value)}
                label="Select Chart"
                style={{
                  color: "#fff", 
                }}
                MenuProps={{
                  PaperProps: {
                    style: {
                      backgroundColor: "#1C0D46",
                      color: "white",
                    },
                  },
                }}
              >
                <MenuItem value="Pie">Pie Chart</MenuItem>
                <MenuItem value="Bar">Bar Chart</MenuItem>
                <MenuItem value="Radial">Radial Chart</MenuItem>
                <MenuItem value="Area">Area Chart</MenuItem>
                <MenuItem value="Conflicts Distribution">
                  Conflicts Distribution
                </MenuItem>
                <MenuItem value="Gauge">Gauge Chart</MenuItem>
              </Select>
            </FormControl>
            {selectedChart === "Pie" && (
              <ResponsiveContainer width="100%" height={370}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={150}
                    fill="#EO3DCD"
                    dataKey="value"
                    label={{fontFamily: "'Open Sans', sans-serif"}}
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
            {selectedChart === "Bar" && (
            <ResponsiveContainer width="100%" height={370}>
              <BarChart
                data={barData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  style={{
                    fontSize: 14,
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#333",
                  }}
                />
                <YAxis
                  style={{
                    fontSize: 14,
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#333",
                  }}
                />
                <Tooltip
                  cursor={{ fill: "transparent" }}
                  wrapperStyle={{ border: "1px solid #ccc", borderRadius: 4 }}
                  labelStyle={{
                    fontSize: 14,
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#333",
                  }}
                  itemStyle={{
                    fontSize: 14,
                    color: "#666",
                    fontFamily: "'Open Sans', sans-serif",
                  }}
                  separator={<span>: </span>}
                />
                <Bar dataKey="value" fill="#C9E4CA" />
              </BarChart>
            </ResponsiveContainer>
          )}
            {selectedChart === "Radial" && (
              <ResponsiveContainer width="100%" height={400}>
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="10%"
                  outerRadius="80%"
                  barSize={10}
                  data={radialData}
                  plotOptions={{
                    pie: {
                      dataLabels: {
                        minAngleToShowLabel: 15,
                      },
                    },
                  }}
                >
                  <RadialBar
                    minAngle={15}
                    label={{ position: "outside", offset: 10, fill: "#fff", fontFamily: "'Open Sans', sans-serif", }}
                    background
                    clockWise
                    dataKey="value"
                  />
                  <Legend
                    iconSize={10}
                    layout="vertical"
                    verticalAlign="middle"
                    align="right"
                  />
                  <Tooltip contentStyle={tooltipStyle} />
                </RadialBarChart>
              </ResponsiveContainer>
            )}
            {selectedChart === "Area" && (
              <ResponsiveContainer width="100%" height={370}>
                <AreaChart
                  data={areaData}
                  margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" 
                  style={{
                    fontSize: 14,
                    fontFamily: "'Open Sans', sans-serif",
                    color: "#333",
                  }}
                  />
                  <YAxis 
                  style={{
                      fontSize: 14,
                      fontFamily: "'Open Sans', sans-serif",
                      color: "#333",
                    }} />
                  <Tooltip
                    cursor={{ fill: "#f5f5f5" }}
                    wrapperStyle={{ border: "1px solid #ccc", borderRadius: 4 }}
                    labelStyle={{
                      fontSize: 14,
                      fontFamily: "'Open Sans', sans-serif",
                      color: "#333",
                    }}
                    itemStyle={{
                      fontSize: 14,
                      color: "#666",
                      fontFamily: "'Open Sans', sans-serif",
                    }}
                    separator={<span>: </span>}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#C9E4CA"
                    fill="#8B9467"
                  />
                </AreaChart>
              </ResponsiveContainer>
            )}
            {selectedChart === "Conflicts Distribution" && (
              <ResponsiveContainer width="100%" height={370}>
                <PieChart>
                  <Pie
                    data={pieData}
                    innerRadius={100}
                    outerRadius={150}
                    fill="#FFC499"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            )}
            {selectedChart === "Gauge" && (
              <ResponsiveContainer width="100%" height={370}>
                <Box
                  display="flex"
                  justifyContent="space-around"
                  alignItems="center"
                >
                  {responsesData.toolName === "RSI" ? (
                    <Box textAlign="center">
                      <Typography variant="subtitle1" color={"white"}>
                        RSI Conflict
                      </Typography>
                      <GaugeChart
                        id="gauge-chart-rsi"
                        nrOfLevels={20}
                        percent={
                          responsesData.data.report["RSI Anomaly Detected"] /
                          responsesData.data.report["Total Relations Analyzed"]
                        }
                        textColor="white"
                        needleColor="#005AFF"
                        colors={["#F47F31", "#F47F31"]}
                        arcWidth={0.3}
                        arcPadding={0.05} 
                        needleStrokeWidth={0.05}
                        needleAnimationDuration={1000}
                        cornerRadius={3}
                        animate={false}
                        style={{width:'90%'}}
                      />
                    </Box>
                  ) : responsesData.toolName === "PCI" ? (
                    <Box textAlign="center">
                      <Typography variant="subtitle1" color={"white"}>
                        PCI Conflict
                      </Typography>
                      <GaugeChart
                        id="gauge-chart-pci"
                        nrOfLevels={20}
                        percent={
                          responsesData.data.report["PCI Anomaly Detected"] /
                          responsesData.data.report["Total Relations Analyzed"]
                        }
                        textColor="white"
                        needleColor="#005AFF"
                        colors={["#F47F31", "#F47F31"]}
                        arcWidth={0.3}
                        needleStrokeWidth={0.05}
                        needleAnimationDuration={1000}
                        cornerRadius={3}
                        animate={false}
                        style={{width:'90%'}}
                      />
                    </Box>
                  ) : responsesData.toolName === "Output" ? (
                    <>
                      <Box textAlign="center">
                        <Typography variant="subtitle1" color={"white"}>
                          RSI Conflict
                        </Typography>
                        <GaugeChart
                          id="gauge-chart-total"
                          nrOfLevels={20}
                          percent={
                            responsesData.data.report["RSI Anomaly"] /
                            responsesData.data.report["Total Anomaly"]
                          }
                          textColor="white"
                          needleColor="#005AFF"
                          colors={["#F47F31", "#F47F31"]}
                          arcWidth={0.3}
                          needleStrokeWidth={0.05}
                          needleAnimationDuration={1000}
                          cornerRadius={3}
                          animate={false}
                          style={{width:'90%'}}
                        />
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="subtitle1" color={"white"}>
                          PCI Conflict
                        </Typography>
                        <GaugeChart
                          id="gauge-chart-total"
                          nrOfLevels={20}
                          percent={
                            responsesData.data.report["PCI Anomaly"] /
                            responsesData.data.report["Total Anomaly"]
                          }
                          textColor="white"
                          needleColor="#005AFF"
                          colors={["#F47F31", "#F47F31"]}
                          arcWidth={0.3}
                          needleStrokeWidth={0.05}
                          needleAnimationDuration={1000}
                          cornerRadius={3}
                          animate={false}
                          style={{width:'90%'}}
                        />
                      </Box>
                      <Box textAlign="center">
                        <Typography variant="subtitle1" color={"white"}>
                          Total Conflict
                        </Typography>
                        <GaugeChart
                          id="gauge-chart-total"
                          nrOfLevels={20}
                          percent={
                            responsesData.data.report["Total Anomaly"] /
                            responsesData.data.report["Total Anomaly"]
                          }
                          textColor="white"
                          needleColor="#005AFF"
                          colors={["#F47F31", "#F47F31"]}
                          arcWidth={0.3}
                          needleStrokeWidth={0.05}
                          needleAnimationDuration={1000}
                          cornerRadius={3}
                          animate={false}
                          style={{width:'90%'}}
                        />
                      </Box>
                    </>
                  ) : null}
                </Box>
              </ResponsiveContainer>
            )}
          </aside>
        </Grid>
      </Grid>
      {/* <Grid container spacing={2}>
        <Grid xs={12}>
          <Typography>Line Chart</Typography>

          <ResponsiveContainer width="100%" height={400}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Time Period</InputLabel>
                    <Select
                      value={timePeriod}
                      onChange={(event) => setTimePeriod(event.target.value)}
                    >
                      {timePeriodOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <FormControl fullWidth>
                    <InputLabel>Tool Name</InputLabel>
                    <Select
                      multiple
                      value={toolname}
                      onChange={handelToolnameChange}
                      input={<OutlinedInput label="Tool Name" />}
                      renderValue={(selected) => selected.join(", ")}
                    >
                      <MenuItem value="PCI">
                        <Checkbox checked={toolname.indexOf("PCI") > -1} />
                        <ListItemText primary="PCI" />
                      </MenuItem>
                      <MenuItem value="RSI">
                        <Checkbox checked={toolname.indexOf("RSI") > -1} />
                        <ListItemText primary="RSI" />
                      </MenuItem>
                      <MenuItem value="Output">
                        <Checkbox checked={toolname.indexOf("Output") > -1} />
                        <ListItemText primary="Output" />
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={3}>
                  <Button type="submit" variant="contained" color="primary">
                    Fetch Data
                  </Button>
                </Grid>
              </Grid>
            </form>
            {chartData.length > 0 && (
              <LineChart width={100} height={50} data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  stroke="#f5deb3"
                  padding={{ left: 30, right: 30 }}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                {chartData.map((toolData, index) => (
                  <Line
                    key={index}
                    type="monotone"
                    dataKey={toolData.name}
                    stroke={COLORS[index % COLORS.length]}
                    data={toolData.data}
                  />
                ))}
              </LineChart>
            )}
          </ResponsiveContainer>
        </Grid>
      </Grid> */}
    {/* </StyledContainerDropDown> */}
    </div>
  );
};
export default DashboardScreen;