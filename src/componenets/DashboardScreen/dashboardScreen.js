import React, { useState, useEffect } from "react";
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
} from "recharts";
import GaugeChart from "react-gauge-chart";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import * as XLSX from "xlsx";
import "../DashboardScreen/dashboardScreen.css";

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

const initialData = {
  data: [
    {
      S_PCI: 189,
      S_RSI: 450,
      T_PCI: 189,
      T_RSI: 450,
      S_site: 18620,
      T_cell: 4024102,
      T_site: 18621,
      s_cell: 4023622,
      S_MRBTS: 402362,
      T_MRBTS: 402410,
      T_lcrID: 2,
      s_range: 450,
      t_range: 450,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 1325,
      T_earfcnDL: 1325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 255,
      S_RSI: 120,
      T_PCI: 255,
      T_RSI: 120,
      S_site: 18621,
      T_cell: 4024121,
      T_site: 18622,
      s_cell: 4023655,
      S_MRBTS: 402365,
      T_MRBTS: 402412,
      T_lcrID: 5,
      s_range: 120,
      t_range: 120,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 325,
      T_earfcnDL: 325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 144,
      S_RSI: 210,
      T_PCI: 144,
      T_RSI: 210,
      S_site: 18622,
      T_cell: 4024140,
      T_site: 18623,
      s_cell: 4023688,
      S_MRBTS: 402368,
      T_MRBTS: 402414,
      T_lcrID: 6,
      s_range: 210,
      t_range: 210,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 3774,
      T_earfcnDL: 3774,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 216,
      S_RSI: 180,
      T_PCI: 216,
      T_RSI: 180,
      S_site: 18623,
      T_cell: 4024159,
      T_site: 18624,
      s_cell: 4023712,
      S_MRBTS: 402371,
      T_MRBTS: 402415,
      T_lcrID: 8,
      s_range: 180,
      t_range: 180,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 1325,
      T_earfcnDL: 1325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 288,
      S_RSI: 360,
      T_PCI: 288,
      T_RSI: 360,
      S_site: 18625,
      T_cell: 4024188,
      T_site: 18626,
      s_cell: 4023736,
      S_MRBTS: 402373,
      T_MRBTS: 402418,
      T_lcrID: 9,
      s_range: 360,
      t_range: 360,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 325,
      T_earfcnDL: 325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 108,
      S_RSI: 240,
      T_PCI: 108,
      T_RSI: 240,
      S_site: 18626,
      T_cell: 4024207,
      T_site: 18627,
      s_cell: 4023760,
      S_MRBTS: 402376,
      T_MRBTS: 402420,
      T_lcrID: 10,
      s_range: 240,
      t_range: 240,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 3774,
      T_earfcnDL: 3774,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 192,
      S_RSI: 300,
      T_PCI: 192,
      T_RSI: 300,
      S_site: 18627,
      T_cell: 4024226,
      T_site: 18628,
      s_cell: 4023784,
      S_MRBTS: 402378,
      T_MRBTS: 402422,
      T_lcrID: 11,
      s_range: 300,
      t_range: 300,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 1325,
      T_earfcnDL: 1325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 264,
      S_RSI: 420,
      T_PCI: 264,
      T_RSI: 420,
      S_site: 18628,
      T_cell: 4024245,
      T_site: 18629,
      s_cell: 4023808,
      S_MRBTS: 402380,
      T_MRBTS: 402424,
      T_lcrID: 12,
      s_range: 420,
      t_range: 420,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 325,
      T_earfcnDL: 325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 189,
      S_RSI: 450,
      T_PCI: 189,
      T_RSI: 450,
      S_site: 18620,
      T_cell: 4024102,
      T_site: 18621,
      s_cell: 4023622,
      S_MRBTS: 402362,
      T_MRBTS: 402410,
      T_lcrID: 2,
      s_range: 450,
      t_range: 450,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 1325,
      T_earfcnDL: 1325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 255,
      S_RSI: 120,
      T_PCI: 255,
      T_RSI: 120,
      S_site: 18621,
      T_cell: 4024121,
      T_site: 18622,
      s_cell: 4023655,
      S_MRBTS: 402365,
      T_MRBTS: 402412,
      T_lcrID: 5,
      s_range: 120,
      t_range: 120,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 325,
      T_earfcnDL: 325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 144,
      S_RSI: 210,
      T_PCI: 144,
      T_RSI: 210,
      S_site: 18622,
      T_cell: 4024140,
      T_site: 18623,
      s_cell: 4023688,
      S_MRBTS: 402368,
      T_MRBTS: 402414,
      T_lcrID: 6,
      s_range: 210,
      t_range: 210,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 3774,
      T_earfcnDL: 3774,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 216,
      S_RSI: 180,
      T_PCI: 216,
      T_RSI: 180,
      S_site: 18623,
      T_cell: 4024159,
      T_site: 18624,
      s_cell: 4023712,
      S_MRBTS: 402371,
      T_MRBTS: 402415,
      T_lcrID: 8,
      s_range: 180,
      t_range: 180,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 1325,
      T_earfcnDL: 1325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 288,
      S_RSI: 360,
      T_PCI: 288,
      T_RSI: 360,
      S_site: 18625,
      T_cell: 4024188,
      T_site: 18626,
      s_cell: 4023736,
      S_MRBTS: 402373,
      T_MRBTS: 402418,
      T_lcrID: 9,
      s_range: 360,
      t_range: 360,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 325,
      T_earfcnDL: 325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 108,
      S_RSI: 240,
      T_PCI: 108,
      T_RSI: 240,
      S_site: 18626,
      T_cell: 4024207,
      T_site: 18627,
      s_cell: 4023760,
      S_MRBTS: 402376,
      T_MRBTS: 402420,
      T_lcrID: 10,
      s_range: 240,
      t_range: 240,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 3774,
      T_earfcnDL: 3774,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 192,
      S_RSI: 300,
      T_PCI: 92,
      T_RSI: 300,
      S_site: 18627,
      T_cell: 4024226,
      T_site: 18628,
      s_cell: 4023784,
      S_MRBTS: 402378,
      T_MRBTS: 402422,
      T_lcrID: 11,
      s_range: 300,
      t_range: 300,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 1325,
      T_earfcnDL: 1325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 264,
      S_RSI: 420,
      T_PCI: 24,
      T_RSI: 420,
      S_site: 18628,
      T_cell: 4024245,
      T_site: 18629,
      s_cell: 4023808,
      S_MRBTS: 402380,
      T_MRBTS: 402424,
      T_lcrID: 12,
      s_range: 420,
      t_range: 420,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 325,
      T_earfcnDL: 325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      PCI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
    {
      S_PCI: 321,
      S_RSI: 630,
      T_PCI: 285,
      T_RSI: 630,
      S_site: 18618,
      T_cell: 4024034,
      T_site: 18619,
      s_cell: 4023604,
      S_MRBTS: 402360,
      T_MRBTS: 402403,
      T_lcrID: 4,
      s_range: 640,
      t_range: 640,
      S_prachCS: 12,
      T_prachCS: 12,
      S_earfcnDL: 1325,
      T_earfcnDL: 1325,
      S_RSperCell: 10,
      T_RSperCell: 10,
      RSI_Conflict: true,
      S_prachConfIndex: 3,
      T_prachConfIndex: 3,
    },
  ],
  report: {
    RSI_Conflict: 4220,
    PCI_Conflict: 3210,
    Total_Conflict: 7430,
  },
};

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

const filterOptions = Object.keys(initialData.data[0]).reduce((acc, key) => {
  acc[key] = [
    ...new Set(initialData.data.map((item) => String(item[key]).toLowerCase())),
  ];
  return acc;
}, {});

const DashboardScreen = () => {
  const [searchTerms, setSearchTerms] = useState({});
  const [filterConditions, setFilterConditions] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedColumns, setSelectedColumns] = useState(
    Object.keys(initialData.data[0])
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
    const apiLink = "http://localhost:8083/api/report";
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

  const filteredData = initialData.data.filter((item) =>
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
    setSelectedColumns(Object.keys(initialData.data[0]));
  };

  const handleDeselectAllColumns = () => {
    //setSelectedColumns([]);
    const defaultColumns = Object.keys(initialData.data[0]).slice(0, 5);
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

  const pieData = [
    { name: "RSI Conflict", value: initialData.report.RSI_Conflict },
    { name: "PCI Conflict", value: initialData.report.PCI_Conflict },
    { name: "Total Conflict", value: initialData.report.Total_Conflict },
  ];

  const radialData = [
    {
      name: "RSI Conflict",
      value: initialData.report.RSI_Conflict,
      fill: "#C7B8EA",
    },
    {
      name: "PCI Conflict",
      value: initialData.report.PCI_Conflict,
      fill: "#F7CAC9",
    },
    {
      name: "Total Conflict",
      value: initialData.report.Total_Conflict,
      fill: "#87CEEB",
    },
  ];

  const areaData = Object.keys(initialData.report).map((key) => ({
    name: key.replace("_", " "),
    value: initialData.report[key],
  }));

  // const COLORS = ["#FF4500", "#008000", "#4D4DFF"];
  // Lighter Shade Colors

// #8B9467 (a light, muted gray-brown)
// #C5C3C8 (a soft, pale gray-purple)
// #E2E2EA (a light, airy white-gray)
// #B2B8CF (a pale, serene blue-gray)
// #D9D9D9 (a soft, muted gray-brown)
// Pastel Colors with a Lighter Shade

// #C9C3E6 (a light, pastel purple)
// #F2C9C5 (a pale, pastel pink)
// #87CEEB (a light, pastel blue)
// #C9E4CA (a muted, pastel green)
// #FFC499 (a warm, pastel orange)
  const COLORS = [
    "#8B9467", // lighter shade of #8884d8
    "#C9E4CA", // lighter shade of #e63f4d
    "#FFC499", // lighter shade of #345243
    //...
  ];

  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleColumnAction = (column, action) => {
    setColumnAction((prevAction) => ({ ...prevAction, [column]: action }));
  };

  const xlsxDownload = (data) => {
    const headers = Object.keys(data.data[0]);
    const aoaData = [headers, ...data.data.map((row) => Object.values(row))];
    //const aoaData = data.data.map((row) => Object.values(row));
    const ws = XLSX.utils.aoa_to_sheet(aoaData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    const workbookBuffer = XLSX.write(wb, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([new Uint8Array(workbookBuffer)], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "dashboardexcel.xlsx";
    a.click();
  };

  return (
    <StyledContainerDropDown
      style={{ maxWidth: "100%", height: "950px", marginTop: "10px" }}
      className="dropDown-selection"
    >
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
                position: "absolute",
                top: 2,
                left: 1,
                right: 2,
                width: "1800",
                margin: "2px",
                // backgroundColor: "WHITE",
                display: "flex",
                flexDirection: "row",
                justifyContent: "start",
                alignItems: "center",
                height: 20,
                padding: 10,
                // border: "1px solid #ccc",
                // borderRadius: 10,
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
              {/* <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
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
                Close
              </Button>

              <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Exit Application"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    Are you sure you want to exit?
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleClose} color="primary">
                    Cancel
                  </Button>
                  <Button onClick={handleExit} color="primary" autoFocus>
                    Exit
                  </Button>
                </DialogActions>
              </Dialog> */}
              <Button
                onClick={() => xlsxDownload(initialData)}
                variant="contained"
                color="primary"
                startIcon={<InsertDriveFileOutlinedIcon />}
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
                                      style: { color: "#fff !important" },
                                    }}
                                    InputProps={{ style: { color: "#fff !important" } }}
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
                                    //placeholder="TYPE HERE"
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
                            <ClickAwayListener onClickAway={() => {}}>
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
                                          Object.keys(initialData.data[0])
                                            .length
                                        }
                                        indeterminate={
                                          selectedColumns.length > 0 &&
                                          selectedColumns.length <
                                            Object.keys(initialData.data[0])
                                              .length
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
                                    {Object.keys(initialData.data[0]).map(
                                      (column) => (
                                        <MenuItem key={column} value={column}>
                                          <Checkbox
                                            checked={
                                              selectedColumns.indexOf(column) >
                                              -1
                                            }
                                          />
                                          <ListItemText primary={column} />
                                        </MenuItem>
                                      )
                                    )}
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
                  color: "#fff", // Add this line to change the text color of the selected value
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
                    fill="#8B9467"
                    dataKey="value"
                    label
                  >
                    {pieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
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
                    label={{ position: "insideStart", fill: "#fff" }}
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
                  <Tooltip />
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
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#C9E4CA"
                    fill="#87CEEB"
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
                  <Tooltip />
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
                  <Box textAlign="center">
                    <Typography variant="subtitle1" color={"white"}>
                      RSI Conflict
                    </Typography>
                    <GaugeChart
                      id="gauge-chart-rsi"
                      nrOfLevels={20}
                      percent={
                        initialData.report.RSI_Conflict /
                        initialData.report.Total_Conflict
                      }
                      textColor="white"
                      needleColor="#345243"
                      colors={["#00FF00", "#FF0000"]}
                      arcWidth={0.3}
                      cornerRadius={3}
                    />
                  </Box>
                  <Box textAlign="center">
                    <Typography variant="subtitle1" color={"white"}>
                      PCI Conflict
                    </Typography>
                    <GaugeChart
                      id="gauge-chart-pci"
                      nrOfLevels={20}
                      percent={
                        initialData.report.PCI_Conflict /
                        initialData.report.Total_Conflict
                      }
                      textColor="white"
                      needleColor="#345243"
                      colors={["#00FF00", "#FF0000"]}
                      arcWidth={0.3}
                      cornerRadius={3}
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
                        initialData.report.Total_Conflict /
                        initialData.report.Total_Conflict
                      }
                      textColor="white"
                      needleColor="#345243"
                      colors={["#00FF00", "#FF0000"]}
                      arcWidth={0.3}
                      cornerRadius={3}
                    />
                  </Box>
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
    </StyledContainerDropDown>
  );
};
export default DashboardScreen;
