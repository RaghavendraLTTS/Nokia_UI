import React, { useState } from "react";
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
  capitalize,
} from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import "../UserStatistics/userStatistics.css";

const data = [
  {
    id: 1,
    userName: "Raghavendra",
    client: "BSNL",
    project: "Project 02",
    toolName: "Tool3",
    loginTimestamp: "03-07-2024 13:00:00",
    dashboardOpenTimestamp: "03-07-2024 13:00:10",
    dashboardCloseTimestamp: "03-07-2024 14:00:00",
    actualSpentTime: "00:30:00",
  },
  {
    id: 2,
    userName: "Santhosh",
    client: "Samsung",
    project: "Project 03",
    toolName: "Tool2",
    loginTimestamp: "03-07-2024 15:00:45",
    dashboardOpenTimestamp: "03-07-2024 15:00:55",
    dashboardCloseTimestamp: "03-07-2024 15:30:45",
    actualSpentTime: "00:20:45",
  },
  {
    id: 3,
    userName: "Mayur",
    client: "Motorala",
    project: "Project 03",
    toolName: "Tool3",
    loginTimestamp: "03-07-2024 16:15:20",
    dashboardOpenTimestamp: "03-07-2024 16:15:30",
    dashboardCloseTimestamp: "03-07-2024 16:45:30",
    actualSpentTime: "00:30",
  },
  {
    id: 4,
    userName: "Rajesh",
    client: "Nokia",
    project: "Project 04",
    toolName: "Tool17",
    loginTimestamp: "03-07-2024 16:30:00",
    dashboardOpenTimestamp: "03-07-2024 16:30:10",
    dashboardCloseTimestamp: "03-07-2024 17:00:00",
    actualSpentTime: "00:03:00",
  },
  {
    id: 5,
    userName: "Arif",
    client: "Airtel",
    project: "Project 05",
    toolName: "Tool10",
    loginTimestamp: "03-07-2027 17:00:00",
    dashboardOpenTimestamp: "03-07-2027 17:00:10",
    dashboardCloseTimestamp: "03-07-2027 17:30:00",
    actualSpentTime: "00:03:15",
  },
  {
    id: 6,
    userName: "Raghavendra",
    client: "Samsung",
    project: "Project 06",
    toolName: "Tool1",
    loginTimestamp: "03-07-2024 13:00:00",
    dashboardOpenTimestamp: "03-07-2024 13:00:10",
    dashboardCloseTimestamp: "03-07-2024 14:00:00",
    actualSpentTime: "00:30",
  },
  {
    id: 7,
    userName: "Santhosh",
    client: "T-mobile",
    project: "Project 07",
    toolName: "Tool3",
    loginTimestamp: "03-07-2024 13:00:00",
    dashboardOpenTimestamp: "03-07-2024 13:00:10",
    dashboardCloseTimestamp: "03-07-2024 14:00:00",
    actualSpentTime: "00:30",
  },
  {
    id: 8,
    userName: "Nishant",
    client: "Motorala",
    project: "Project 08",
    toolName: "Tool 14",
    loginTimestamp: "03-07-2024 16:30:00",
    dashboardOpenTimestamp: "03-07-2024 16:30:10",
    dashboardCloseTimestamp: "03-07-2024 17:00:00",
    actualSpentTime: "00:30",
  },
  {
    id: 9,
    userName: "Raghavendra",
    client: "Airtel",
    project: "Project 10",
    toolName: "Tool10",
    loginTimestamp: "03-07-2024 13:00:00",
    dashboardOpenTimestamp: "03-07-2024 13:00:10",
    dashboardCloseTimestamp: "03-07-2024 14:00:00",
    actualSpentTime: "00:30",
  },
];

const filterOptions = Object.keys(data[0]).reduce((acc, key) => {
  acc[key] = [...new Set(data.map(item => String(item[key]).toLowerCase()))];
  return acc;
}, {});

console.log(filterOptions);
const UserStatistics = () => {
    const [searchTerms, setSearchTerms] = useState({});
    const [filterConditions, setFilterConditions] = useState({});
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [search, setSearch] = useState('');

    const handleSearchFilter = (event) => {
        setSearch(event.target.value);
    };

    const handleSearch = (key, value) => {
      if (key === 'userName' || key === 'client'||key === 'project' || key === 'toolName') {
          setSearchTerms(prevSearchTerms => ({
              ...prevSearchTerms,
              [key]: value,
          }));
      }
      setPage(0);
  };
  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
        direction = 'desc';
    }
    setSortConfig({ key, direction });
};

 
  const handleFilterChange = (key, condition) => {
    setFilterConditions((prevFilterConditions) => ({
      ...prevFilterConditions,
      [key]: condition,
    }));
  };
 
  const filteredData = data.filter(item =>
    Object.keys(searchTerms).every(key => {
        const searchTerm = searchTerms[key]?.toLowerCase() || '';
        const itemValue = item[key].toString().toLowerCase();
        const filterCondition = filterConditions[key] || 'includes';
        if (filterCondition === 'includes') {
            return itemValue.includes(searchTerm);
        } else if (filterCondition === 'equals') {
            return itemValue === searchTerm;
        } else if (filterCondition === 'startsWith') {
            return itemValue.startsWith(searchTerm);
        } else if (filterCondition === 'endsWith') {
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
  const [isFilterEnabled, setIsFilterEnabled] = useState({});

  const handleFilterToggle = (column) => {
    setIsFilterEnabled((prev) => ({ ...prev, [column]: !prev[column] }));
  };
  const currentRows = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );
  return (
    <>
      

      <TableContainer>
        <Table>
          <TableHead
            sx={{
              textTransform: "capitalize",
              border: "1px solid #4d5987",
              "& th": {
                padding: "4px 8px", // reduce padding
                fontSize: 14, // reduce font size
              },
            }}
          >
            <TableRow>
              {Object.keys(data[0]).map((column) => (
                <TableCell
                  sx={{
                    color: "#7994D1",
                    opacity: 1,
                    font: "16px Robotonormal normal medium 16px/19px Roboto",
                    border: "1px solid #4d5987",
                    padding: "4px 8px", // reduce padding
                    fontSize: 14, // reduce font size
                  }}
                  key={column}
                >
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container direction="row" spacing={0}>
                      <Grid mt={2} item xs={8}>
                        {column !== "password" ? (
                          <TableSortLabel
                            active={sortConfig.key === column}
                            direction={sortConfig.direction}
                            onClick={() => handleSort(column)}
                          >
                            {column}
                          </TableSortLabel>
                        ) : (
                          <Typography>{column}</Typography>
                        )}
                      </Grid>
                      {column === "userName" || column === "project" || column === "toolName" || column === "client" ? (
                        <Grid item xs={4} mt={1}>
                          <IconButton
                            sx={{ color: "#6477b1" }}
                            onClick={() => handleFilterToggle(column)}
                          >
                            <FilterListIcon />
                          </IconButton>
                        </Grid>
                      ) : null}
                      { column === "userName" || column === "project" || column === "toolName" || column === "client" ? (
                        <Grid item xs={12}>
                          {filterOptions[column] && isFilterEnabled[column] && (
                            <FormControl
                              variant="standard"
                              style={{ minWidth: 120, marginLeft: "10px" }}
                            >
                              <InputLabel
                                sx={{ color: "#6477b1", minWidth: "100px" }}
                              >
                                Filter
                              </InputLabel>
                              <Select
                                sx={{ backgroundColor: "#1c1447" }}
                                value={searchTerms[column] || ""}
                                onChange={(e) =>
                                  handleSearch(column, e.target.value)
                                }
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
                            </FormControl>
                          )}
                        </Grid>
                      ) : null}
                    </Grid>
                  </Box>
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
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell
                    sx={{
                      color: "#6477b1",
                      border: "1px solid #4d5987",
                      padding: "4px 8px", // reduce padding
                      fontSize: 14, // reduce font size
                    }}
                    key={cellIndex}
                  >
                    {cell}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
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
    </>
  );
};
export default UserStatistics;
