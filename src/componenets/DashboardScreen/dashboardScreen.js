// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   TableSortLabel,
//   TablePagination,
//   Paper,
//   TextField,
//   IconButton,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Typography,
//   Box,
//   Checkbox,
//   ListItemText,
//   OutlinedInput,
//   Button,
//   Breadcrumbs,
//   Link,
//   Stack,
// } from "@mui/material";
// import { FaFilter } from "react-icons/fa";
// import {
//   ResponsiveContainer,
//   PieChart,
//   Pie,
//   Cell,
//   RadialBarChart,
//   RadialBar,
//   AreaChart,
//   Area,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   XAxis,
//   YAxis,
// } from "recharts";
// import GaugeChart from "react-gauge-chart";
// import { styled } from "@mui/system";
// import Container from "@mui/material/Container";
// import Grid from "@mui/material/Grid";
// import "./dashboardScreen.css";

// const custom = {
//   textAlign: "left",
//   color: "#FFFFFFCC",
//   font: "normal normal bold 13px Century Gothic",
//   opacity: 1,
// };

// const StyledContainerDropDown = styled(Container)({
//   width: "97%",
//   maxWidthh: "97%",
//   backgroundColor: "#1c1444",
//   marginBottom: "25px",
//   borderRadius: "10px",
//   padding: "20px",
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "center",
//   marginTop: "20px",
//   position: "relative",
// });

// const initialData = {
//   data: [
//     {
//       S_PCI: 272,
//       S_RSI: 90,
//       T_PCI: 327,
//       T_RSI: 90,
//       S_site: 18613,
//       T_cell: 4023791,
//       T_site: 18615,
//       s_cell: 40236311,
//       S_MRBTS: 402363,
//       T_MRBTS: 402379,
//       T_lcrID: 1,
//       s_range: 100,
//       t_range: 100,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 3774,
//       T_earfcnDL: 3774,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       RSI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//     {
//       S_PCI: 321,
//       S_RSI: 630,
//       T_PCI: 285,
//       T_RSI: 630,
//       S_site: 18618,
//       T_cell: 4024034,
//       T_site: 18619,
//       s_cell: 4023604,
//       S_MRBTS: 402360,
//       T_MRBTS: 402403,
//       T_lcrID: 4,
//       s_range: 640,
//       t_range: 640,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 1325,
//       T_earfcnDL: 1325,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       RSI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//     {
//       S_PCI: 270,
//       S_RSI: 30,
//       T_PCI: 225,
//       T_RSI: 30,
//       S_site: 18619,
//       T_cell: 4023997,
//       T_site: 23602,
//       s_cell: 4023647,
//       S_MRBTS: 402364,
//       T_MRBTS: 402399,
//       T_lcrID: 7,
//       s_range: 40,
//       t_range: 40,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 325,
//       T_earfcnDL: 325,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       RSI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//     {
//       S_PCI: 204,
//       S_RSI: 240,
//       T_PCI: 204,
//       T_RSI: 170,
//       S_site: 18618,
//       T_cell: 4024073,
//       T_site: 18616,
//       s_cell: 4018611,
//       S_MRBTS: 401861,
//       T_MRBTS: 402407,
//       T_lcrID: 3,
//       s_range: 40,
//       t_range: 40,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 3774,
//       T_earfcnDL: 3774,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       PCI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//     {
//       S_PCI: 272,
//       S_RSI: 90,
//       T_PCI: 327,
//       T_RSI: 90,
//       S_site: 18613,
//       T_cell: 4023791,
//       T_site: 18615,
//       s_cell: 40236311,
//       S_MRBTS: 402363,
//       T_MRBTS: 402379,
//       T_lcrID: 1,
//       s_range: 100,
//       t_range: 100,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 3774,
//       T_earfcnDL: 3774,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       RSI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//     {
//       S_PCI: 321,
//       S_RSI: 630,
//       T_PCI: 285,
//       T_RSI: 630,
//       S_site: 18618,
//       T_cell: 4024034,
//       T_site: 18619,
//       s_cell: 4023604,
//       S_MRBTS: 402360,
//       T_MRBTS: 402403,
//       T_lcrID: 4,
//       s_range: 640,
//       t_range: 640,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 1325,
//       T_earfcnDL: 1325,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       RSI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//     {
//       S_PCI: 270,
//       S_RSI: 30,
//       T_PCI: 225,
//       T_RSI: 30,
//       S_site: 18619,
//       T_cell: 4023997,
//       T_site: 23602,
//       s_cell: 4023647,
//       S_MRBTS: 402364,
//       T_MRBTS: 402399,
//       T_lcrID: 7,
//       s_range: 40,
//       t_range: 40,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 325,
//       T_earfcnDL: 325,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       RSI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//     {
//       S_PCI: 204,
//       S_RSI: 240,
//       T_PCI: 204,
//       T_RSI: 170,
//       S_site: 18618,
//       T_cell: 4024073,
//       T_site: 18616,
//       s_cell: 4018611,
//       S_MRBTS: 401861,
//       T_MRBTS: 402407,
//       T_lcrID: 3,
//       s_range: 40,
//       t_range: 40,
//       S_prachCS: 12,
//       T_prachCS: 12,
//       S_earfcnDL: 3774,
//       T_earfcnDL: 3774,
//       S_RSperCell: 10,
//       T_RSperCell: 10,
//       PCI_Conflict: true,
//       S_prachConfIndex: 3,
//       T_prachConfIndex: 3,
//     },
//   ],
//   report: {
//     RSI_Conflict: 4220,
//     PCI_Conflict: 3210,
//     Total_Conflict: 7430,
//   },
// };

// const filterOptions = Object.keys(initialData.data[0]).reduce((acc, key) => {
//   acc[key] = [
//     ...new Set(initialData.data.map((item) => String(item[key]).toLowerCase())),
//   ];
//   return acc;
// }, {});

// const DashboardScreen = () => {
//   const [searchTerms, setSearchTerms] = useState({});
//   const [filterConditions, setFilterConditions] = useState({});
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [selectedColumns, setSelectedColumns] = useState(
//     Object.keys(initialData.data[0])
//   );
//   const [selectedChart, setSelectedChart] = useState("");
//   const [isFilterVisible, setIsFilterVisible] = useState(false);

//   const handleSearch = (key, value) => {
//     setSearchTerms((prevSearchTerms) => ({
//       ...prevSearchTerms,
//       [key]: value,
//     }));
//     setPage(0);
//   };

//   const handleFilterChange = (key, condition) => {
//     setFilterConditions((prevFilterConditions) => ({
//       ...prevFilterConditions,
//       [key]: condition,
//     }));
//   };

//   const handleSort = (key) => {
//     let direction = "asc";
//     if (sortConfig.key === key && sortConfig.direction === "asc") {
//       direction = "desc";
//     }
//     setSortConfig({ key, direction });
//   };

//   const filteredData = initialData.data.filter((item) =>
//     Object.keys(searchTerms).every((key) => {
//       const searchTerm = searchTerms[key]?.toLowerCase() || "";
//       const itemValue = item[key].toString().toLowerCase();
//       const filterCondition = filterConditions[key] || "includes";
//       if (filterCondition === "includes") {
//         return itemValue.includes(searchTerm);
//       } else if (filterCondition === "equals") {
//         return itemValue === searchTerm;
//       } else if (filterCondition === "startsWith") {
//         return itemValue.startsWith(searchTerm);
//       } else if (filterCondition === "endsWith") {
//         return itemValue.endsWith(searchTerm);
//       }
//       return true;
//     })
//   );
//   const handleSearchChange = (event) => {
//     setSearchTerms({
//       ...searchTerms,
//       [event.target.name]: event.target.value.toLowerCase(),
//     });
//   };
//   const sortedData = filteredData.sort((a, b) => {
//     if (sortConfig.key) {
//       const aValue = a[sortConfig.key];
//       const bValue = b[sortConfig.key];
//       if (aValue < bValue) {
//         return sortConfig.direction === "asc" ? -1 : 1;
//       }
//       if (aValue > bValue) {
//         return sortConfig.direction === "asc" ? 1 : -1;
//       }
//     }
//     return 0;
//   });

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleColumnChange = (event) => {
//     const { value } = event.target;
//     setSelectedColumns(value);
//   };

//   const handleSelectAllColumns = () => {
//     setSelectedColumns(Object.keys(initialData.data[0]));
//   };

//   const handleDeselectAllColumns = () => {
//     setSelectedColumns([]);
//   };

//   const columns = selectedColumns.map((column) => (
//     <TableCell key={column}>
//       <TableSortLabel
//         active={sortConfig.key === column}
//         direction={sortConfig.direction}
//         onClick={() => handleSort(column)}
//       >
//         {column}
//       </TableSortLabel>
//       <Checkbox
//         checked={selectedColumns.includes(column)}
//         onChange={() => handleChangeColumnSelection(column)}
//       />
//     </TableCell>
//   ));

//   const handleChangeColumnSelection = (column) => {
//     if (selectedColumns.includes(column)) {
//       setSelectedColumns(selectedColumns.filter((c) => c !== column));
//     } else {
//       setSelectedColumns([...selectedColumns, column]);
//     }
//   };

//   const currentRows = sortedData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const pieData = [
//     { name: "RSI Conflict", value: initialData.report.RSI_Conflict },
//     { name: "PCI Conflict", value: initialData.report.PCI_Conflict },
//     { name: "Total Conflict", value: initialData.report.Total_Conflict },
//   ];

//   const radialData = [
//     {
//       name: "RSI Conflict",
//       value: initialData.report.RSI_Conflict,
//       fill: "#FF4500",
//     },
//     {
//       name: "PCI Conflict",
//       value: initialData.report.PCI_Conflict,
//       fill: "#008000",
//     },
//     {
//       name: "Total Conflict",
//       value: initialData.report.Total_Conflict,
//       fill: "#4D4DFF",
//     },
//   ];

//   const areaData = Object.keys(initialData.report).map((key) => ({
//     name: key.replace("_", " "),
//     value: initialData.report[key],
//   }));

//   const COLORS = ["#FF4500", "#008000", "#4D4DFF"];

//   const handleFilterToggle = () => {
//     setIsFilterVisible(!isFilterVisible);
//   };

//   return (
//     <StyledContainerDropDown
//       style={{ maxWidth: "100%", height: "85vh", marginTop: "10px" }}
//       className="dropDown-selection"
//     >
//       <Grid container spacing={2}>
//         <Grid item xs={12}>
//           <Stack spacing={2} style={custom}>
//             <Breadcrumbs separator="›" aria-label="breadcrumb" style={custom}>
//               <Link underline="hover" key="1" href="/dashboard">
//                 List of output tools
//               </Link>
//               <Typography style={custom}>Data Visualisation</Typography>
//             </Breadcrumbs>
//           </Stack>
//         </Grid>
//       </Grid>

//       <div className="tableContainer">
//         <Paper>
//           <FormControl>
//             <InputLabel style={{ color: "white" }}>Columns</InputLabel>
//             <InputLabel id="select-columns-label">Select Columns</InputLabel>
//             <Select
//               multiple
//               value={selectedColumns}
//               onChange={handleColumnChange}
//               input={<OutlinedInput label="Columns" />}
//               renderValue={(selected) => selected.join(", ")}
//               MenuProps={{
//                 PaperProps: {
//                   style: {
//                     backgroundColor: "grey",
//                     color: "white",
//                   },
//                 },
//               }}
//             >
//               <MenuItem value="selectAll">
//                 <Checkbox
//                   checked={
//                     selectedColumns.length ===
//                     Object.keys(initialData.data[0]).length
//                   }
//                   indeterminate={
//                     selectedColumns.length > 0 &&
//                     selectedColumns.length <
//                       Object.keys(initialData.data[0]).length
//                   }
//                   onChange={(event) => {
//                     if (event.target.checked) {
//                       handleSelectAllColumns();
//                     } else {
//                       handleDeselectAllColumns();
//                     }
//                   }}
//                 />
//                 <ListItemText primary="Select All" />
//               </MenuItem>
//               {Object.keys(initialData.data[0]).map((column) => (
//                 <MenuItem key={column} value={column}>
//                   <Checkbox checked={selectedColumns.indexOf(column) > -1} />
//                   <ListItemText primary={column} />
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//           <TableContainer>
//             <Table size="small">
//               <TableHead>
//                 <TableRow>{columns}</TableRow>
//                 <TableRow>
//                   {Object.keys(initialData.data[0]).map((column) => (
//                     <TableCell key={column}>
//                       <div style={{ display: "flex", alignItems: "center" }}>
//                         <IconButton>
//                           <FaFilter />
//                         </IconButton>
//                         <FormControl
//                           variant="standard"
//                           style={{
//                             minWidth: 70,
//                             marginLeft: "5px",
//                             textAlign: "center",
//                           }}
//                         >
//                           <TextField
//                             label="Search"
//                             value={searchTerms[column] || ""}
//                             onChange={(e) =>
//                               handleSearch(column, e.target.value)
//                             }
//                             variant="standard"
//                             style={{ marginRight: "16px" }}
//                           />
//                         </FormControl>
//                         {filterOptions[column] && (
//                           <FormControl
//                             variant="standard"
//                             style={{
//                               minWidth: 70,
//                               marginLeft: "5px",
//                               textAlign: "center",
//                             }}
//                           >
//                             <InputLabel>Filter</InputLabel>
//                             <Select
//                               value={searchTerms[column] || ""}
//                               onChange={(e) =>
//                                 handleSearch(column, e.target.value)
//                               }
//                             >
//                               <MenuItem value="">All</MenuItem>
//                               {filterOptions[column].map((option, idx) => (
//                                 <MenuItem
//                                   key={idx}
//                                   value={option.toLowerCase()}
//                                 >
//                                   {option}
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                         )}
//                       </div>
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>

//               {/* </TableHead> */}
//               <TableBody>
//                 {currentRows.map((row, index) => (
//                   <TableRow key={index}>
//                     {selectedColumns.map((column, cellIndex) => (
//                       <TableCell key={cellIndex}>{row[column]}</TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           <TablePagination
//             rowsPerPageOptions={[5, 10, 25]}
//             component="div"
//             count={sortedData.length}
//             rowsPerPage={rowsPerPage}
//             page={page}
//             onPageChange={handleChangePage}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//           />
//         </Paper>
//       </div>

//       <Box mt={4} display={"flex"} justifyContent={"left"}>
//         <FormControl
//           variant="outlined"
//           style={{
//             minWidth: 200,
//             justifyContent: "center",
//             backgroundColor: "white",
//           }}
//         >
//           <InputLabel>Select Chart</InputLabel>
//           <Select
//             value={selectedChart}
//             onChange={(e) => setSelectedChart(e.target.value)}
//             label="Select Chart"
//           >
//             <MenuItem value="Pie">Pie Chart</MenuItem>
//             <MenuItem value="Radial">Radial Chart</MenuItem>
//             <MenuItem value="Area">Area Chart</MenuItem>
//             <MenuItem value="Conflicts Distribution">
//               Conflicts Distribution
//             </MenuItem>
//             <MenuItem value="Gauge">Gauge Chart</MenuItem>
//           </Select>
//         </FormControl>
//       </Box>
//       <Box mt={4} display={"flex"} justifyContent={"center"}>
//         {selectedChart === "Pie" && (
//           <>
//             <Typography variant="h6">Pie Chart of Conflicts</Typography>
//             <ResponsiveContainer width="40%" height={400}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   cx="50%"
//                   cy="50%"
//                   outerRadius={150}
//                   fill="#8884d8"
//                   dataKey="value"
//                   label
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </>
//         )}
//         {selectedChart === "Radial" && (
//           <>
//             <Typography variant="h6">Conflicts Radial Chart</Typography>
//             <ResponsiveContainer width="40%" height={400}>
//               <RadialBarChart
//                 cx="50%"
//                 cy="50%"
//                 innerRadius="10%"
//                 outerRadius="80%"
//                 barSize={10}
//                 data={radialData}
//               >
//                 <RadialBar
//                   minAngle={15}
//                   label={{ position: "insideStart", fill: "#fff" }}
//                   background
//                   clockWise
//                   dataKey="value"
//                 />
//                 <Legend
//                   iconSize={10}
//                   layout="vertical"
//                   verticalAlign="middle"
//                   align="right"
//                 />
//                 <Tooltip />
//               </RadialBarChart>
//             </ResponsiveContainer>
//           </>
//         )}
//         {selectedChart === "Area" && (
//           <>
//             <Typography variant="h6">Area Chart of Conflicts</Typography>
//             <ResponsiveContainer width="40%" height={400}>
//               <AreaChart
//                 data={areaData}
//                 margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
//               >
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="name" />
//                 <YAxis />
//                 <Tooltip />
//                 <Area
//                   type="monotone"
//                   dataKey="value"
//                   stroke="#8884d8"
//                   fill="#8884d8"
//                 />
//               </AreaChart>
//             </ResponsiveContainer>
//           </>
//         )}
//         {selectedChart === "Conflicts Distribution" && (
//           <>
//             <Typography variant="h6">Conflicts Distribution</Typography>
//             <ResponsiveContainer width="40%" height={400}>
//               <PieChart>
//                 <Pie
//                   data={pieData}
//                   innerRadius={100}
//                   outerRadius={150}
//                   fill="#8884d8"
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {pieData.map((entry, index) => (
//                     <Cell
//                       key={`cell-${index}`}
//                       fill={COLORS[index % COLORS.length]}
//                     />
//                   ))}
//                 </Pie>
//                 <Tooltip />
//                 <Legend />
//               </PieChart>
//             </ResponsiveContainer>
//           </>
//         )}
//         {selectedChart === "Gauge" && (
//           <>
//             <Typography variant="h6">Gauge Charts</Typography>
//             <ResponsiveContainer width="40%" height={400}>
//               <Box
//                 display="flex"
//                 justifyContent="space-around"
//                 alignItems="center"
//               >
//                 <Box textAlign="center">
//                   <Typography variant="subtitle1">RSI Conflict</Typography>
//                   <GaugeChart
//                     id="gauge-chart-rsi"
//                     nrOfLevels={20}
//                     percent={
//                       initialData.report.RSI_Conflict /
//                       initialData.report.Total_Conflict
//                     }
//                     textColor="white"
//                     needleColor="#345243"
//                     colors={["#00FF00", "#FF0000"]}
//                     arcWidth={0.3}
//                     cornerRadius={3}
//                   />
//                 </Box>
//                 <Box textAlign="center">
//                   <Typography variant="subtitle1">PCI Conflict</Typography>
//                   <GaugeChart
//                     id="gauge-chart-pci"
//                     nrOfLevels={20}
//                     percent={
//                       initialData.report.PCI_Conflict /
//                       initialData.report.Total_Conflict
//                     }
//                     textColor="white"
//                     needleColor="#345243"
//                     colors={["#00FF00", "#FF0000"]}
//                     arcWidth={0.3}
//                     cornerRadius={3}
//                   />
//                 </Box>
//                 <Box textAlign="center">
//                   <Typography variant="subtitle1">Total Conflict</Typography>
//                   <GaugeChart
//                     id="gauge-chart-total"
//                     nrOfLevels={20}
//                     percent={
//                       initialData.report.Total_Conflict /
//                       initialData.report.Total_Conflict
//                     }
//                     textColor="white"
//                     needleColor="#345243"
//                     colors={["#00FF00", "#FF0000"]}
//                     arcWidth={0.3}
//                     cornerRadius={3}
//                   />
//                 </Box>
//               </Box>
//             </ResponsiveContainer>
//           </>
//         )}
//       </Box>
//     </StyledContainerDropDown>
//   );
// };

// export default DashboardScreen;

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

const custom = {
  textAlign: "left",
  color: "#FFFFFFCC",
  font: "normal normal bold 13px Century Gothic",
  opacity: 1,
};

const StyledContainerDropDown = styled(Container)({
  width: "97%",
  maxWidthh: "97%",
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
      S_PCI: 272,
      S_RSI: 90,
      T_PCI: 327,
      T_RSI: 90,
      S_site: 18613,
      T_cell: 4023791,
      T_site: 18615,
      s_cell: 40236311,
      S_MRBTS: 402363,
      T_MRBTS: 402379,
      T_lcrID: 1,
      s_range: 100,
      t_range: 100,
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
    {
      S_PCI: 270,
      S_RSI: 30,
      T_PCI: 225,
      T_RSI: 30,
      S_site: 18619,
      T_cell: 4023997,
      T_site: 23602,
      s_cell: 4023647,
      S_MRBTS: 402364,
      T_MRBTS: 402399,
      T_lcrID: 7,
      s_range: 40,
      t_range: 40,
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
      S_PCI: 204,
      S_RSI: 240,
      T_PCI: 204,
      T_RSI: 170,
      S_site: 18618,
      T_cell: 4024073,
      T_site: 18616,
      s_cell: 4018611,
      S_MRBTS: 401861,
      T_MRBTS: 402407,
      T_lcrID: 3,
      s_range: 40,
      t_range: 40,
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
      S_PCI: 272,
      S_RSI: 90,
      T_PCI: 327,
      T_RSI: 90,
      S_site: 18613,
      T_cell: 4023791,
      T_site: 18615,
      s_cell: 40236311,
      S_MRBTS: 402363,
      T_MRBTS: 402379,
      T_lcrID: 1,
      s_range: 100,
      t_range: 100,
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
    {
      S_PCI: 270,
      S_RSI: 30,
      T_PCI: 225,
      T_RSI: 30,
      S_site: 18619,
      T_cell: 4023997,
      T_site: 23602,
      s_cell: 4023647,
      S_MRBTS: 402364,
      T_MRBTS: 402399,
      T_lcrID: 7,
      s_range: 40,
      t_range: 40,
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
      S_PCI: 204,
      S_RSI: 240,
      T_PCI: 204,
      T_RSI: 170,
      S_site: 18618,
      T_cell: 4024073,
      T_site: 18616,
      s_cell: 4018611,
      S_MRBTS: 401861,
      T_MRBTS: 402407,
      T_lcrID: 3,
      s_range: 40,
      t_range: 40,
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
  ],
  report: {
    RSI_Conflict: 4220,
    PCI_Conflict: 3210,
    Total_Conflict: 7430,
  },
};

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
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
      fill: "#FF4500",
    },
    {
      name: "PCI Conflict",
      value: initialData.report.PCI_Conflict,
      fill: "#008000",
    },
    {
      name: "Total Conflict",
      value: initialData.report.Total_Conflict,
      fill: "#4D4DFF",
    },
  ];

  const areaData = Object.keys(initialData.report).map((key) => ({
    name: key.replace("_", " "),
    value: initialData.report[key],
  }));

  const COLORS = ["#FF4500", "#008000", "#4D4DFF"];

  const handleFilterToggle = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  const handleColumnAction = (column, action) => {
    setColumnAction((prevAction) => ({ ...prevAction, [column]: action }));
  };

  return (
    <StyledContainerDropDown
      style={{ maxWidth: "100%", height: "85vh", marginTop: "10px" }}
      className="dropDown-selection"
    >
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Stack spacing={2} style={custom}>
            <Breadcrumbs separator="›" aria-label="breadcrumb" style={custom}>
              <Link underline="hover" key="1" href="/dashboard">
                List of output tools
              </Link>
              <Typography style={custom}>Data Visualisation</Typography>
            </Breadcrumbs>
          </Stack>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
      <Grid item xs={12}>
          <Stack spacing={2} style={custom}>
            <FormControl
              style={{
                position: "absolute",
                top: 2,
                left: 1,
                right: 2,
                width: "1800",
                margin: "8px",
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

              <Typography variant="h6">Stopwatch</Typography>
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
              </Dialog>
            </FormControl>
          </Stack>
        </Grid>
      </Grid>
      

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TableContainer>
            <Table size="small">
              <TableHead              
                sx={{
                  color: "#6477b1",
                  border: "1px solid #4d5987",
                 "& th": {
                padding: "4px 8px", // reduce padding
                fontSize: 14, // reduce font size
              },
                }}
              
              >
                <TableRow
                sx={{
                  color: "#7994D1",
                  opacity: 1,
                  font: "16px Robotonormal normal medium 16px/19px Roboto",
                  border: "1px solid #4d5987",
                  padding: "4px 8px", // reduce padding
                  fontSize: 14, // reduce font size
                }}
                >
                  {selectedColumns.map((column) => (
                    <TableCell key={column}>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {column}
                        {/* <Checkbox
                checked={selectedColumns.includes(column)}
                onChange={(e) => handleChangeColumnSelection(column)}
              /> */}
                        <FormControl
                          variant="standard"
                          style={{
                            minWidth: 5,
                            marginLeft: "2px",
                            textAlign: "center",
                            color: "white",
                          }}
                        >
                          <Select
                            value={columnAction[column]}
                            onChange={(e) =>
                              handleColumnAction(column, e.target.value)
                            }
                            //style={{ color: 'white' }}
                            MenuProps={{
                              PaperProps: {
                                style: {
                                  backgroundColor: "#282468",
                                  color: "#97b5f9",
                                },
                              },
                            }}
                          >
                            <ClickAwayListener onClickAway={() => {}}>
                              <MenuItem value="search">
                                <TextField
                                  InputLabelProps={{
                                    style: { color: "#97b5f9" },
                                  }}
                                  InputProps={{ style: { color: "#97b5f9" } }}
                                  label="Search"
                                  value={searchTerms[column] || ""}
                                  onChange={(e) =>
                                    handleSearch(column, e.target.value)
                                  }
                                  variant="standard"
                                  style={{
                                    marginRight: "16px",
                                    color: "#97b5f9",
                                  }}
                                  //placeholder="TYPE HERE"
                                />
                              </MenuItem>
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={() => {}}>
                              <MenuItem value="filter">
                                Filter
                                <Select
                                  value={searchTerms[column] || ""}
                                  onChange={(e) =>
                                    handleSearch(column, e.target.value)
                                  }
                                  style={{ marginLeft: "10px" }}
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        backgroundColor: "#1C0D46",
                                        color: "white",
                                      },
                                    },
                                  }}
                                >
                                  <MenuItem value="">All</MenuItem>
                                  {filterOptions[column].map((option, idx) => (
                                    <MenuItem
                                      key={idx}
                                      value={option.toLowerCase()}
                                    >
                                      {option}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </MenuItem>
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={() => {}}>
                              <MenuItem value="selectedColumns">
                                Columns
                                <Select
                                  sx={{
                                    "& .MuiSelect-select": {
                                      color: "white",
                                    },
                                    "& .MuiSelect-icon": {
                                      color: "black",
                                    },
                                    "& .MuiPaper-root": {
                                      backgroundColor: "black",
                                      color: "white",
                                    },
                                  }}
                                  multiple
                                  value={selectedColumns}
                                  onChange={handleColumnChange}
                                  input={<OutlinedInput label="Columns" />}
                                  renderValue={(selected) =>
                                    selected.join(", ")
                                  }
                                  MenuProps={{
                                    PaperProps: {
                                      style: {
                                        backgroundColor: "#1C0D46",
                                        color: "white",
                                      },
                                    },
                                  }}
                                  style={{ width: 100 }}
                                >
                                  <MenuItem value="selectAll">
                                    <Checkbox
                                      checked={
                                        selectedColumns.length ===
                                        Object.keys(initialData.data[0]).length
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
                                            selectedColumns.indexOf(column) > -1
                                          }
                                        />
                                        <ListItemText primary={column} />
                                      </MenuItem>
                                    )
                                  )}
                                </Select>
                              </MenuItem>
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
                  key={index}>
                    {selectedColumns.map((column, cellIndex) => (
                      <TableCell 
                      sx={{
                        color: "#6477b1",
                        border: "1px solid #4d5987",
                        padding: "4px 8px", // reduce padding
                        fontSize: 14, // reduce font size
                      }}
                      key={cellIndex}>{row[column]}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Grid xs={12}>
            <TablePagination
             sx={{ color: "#6477b1" }}
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
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
        <FormControl
          variant="outlined"
          style={{
            minWidth: 200,
            justifyContent: "center",
            backgroundColor: "WHITE",
            textColor: "white",
          }}
        >
          <InputLabel style={{ backgroundColor: "white", color: "black" }}>
            Select Chart
          </InputLabel>
          <Select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            label="Select Chart"
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
        </Grid>
        <Grid xs={4}>
        {selectedChart === "Pie" && (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  outerRadius={150}
                  fill="#8884d8"
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
            <ResponsiveContainer width="100%" height={400}>
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
                  stroke="#8884d8"
                  fill="#e63f4d9f"
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
          {selectedChart === "Conflicts Distribution" && (
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={pieData}
                  innerRadius={100}
                  outerRadius={150}
                  fill="#8884d8"
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
        </Grid>
        <Grid xs={4}>
        {selectedChart === "Gauge" && (
            <ResponsiveContainer width="100%" height={400}>
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
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid xs={12}>          
            <Typography>Line Chart</Typography>          
          <ResponsiveContainer width="100%" height={400}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={3} >
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
                <Grid item xs={3} >
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
      </Grid>
      
    </StyledContainerDropDown>
  );
};
export default DashboardScreen;
