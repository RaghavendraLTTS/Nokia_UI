import React, { useState,useMemo } from "react";
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
import "../ToolsStatistics/toolsStatistics.css";



const ToolsStatistics = ({data}) => {

  const [searchTerms, setSearchTerms] = useState({});
  const [filterConditions, setFilterConditions] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const handleSearchFilter = (event) => {
    setSearch(event.target.value);
  };

  const filterOptions = useMemo(() => {
    const filteredData = data.filter((item) => {
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
  
    return Object.keys(data[0]).reduce((acc, key) => {
      acc[key] = [...new Set(filteredData.map((item) => String(item[key]).toLowerCase()))];
      return acc;
    }, {});
  }, [searchTerms, filterConditions, data]);

  const handleSearch = (key, value) => {
    if (
      key === "userName" ||
      key === "client" ||
      key === "project" ||
      key === "toolName"
    ) {
      setSearchTerms((prevSearchTerms) => ({
        ...prevSearchTerms,
        [key]: value,
      }));
    }
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
  // const filteredData = data.filter((item) => {
  //     const searchTerm = search.toLowerCase();
  //     return Object.values(item).some((value) => {
  //         const stringValue = String(value).toLowerCase();
  //         return stringValue.includes(searchTerm);
  //     });
  // });
  const filteredData = data.filter((item) =>
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
      <TableContainer
        style={{
          // overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          // height: "400px",
        }}
      >
        <Table className="tableStyle">
          <TableHead
            sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#282468",
              zIndex: 1,
              textTransform: "capitalize",
              border: "1px solid #4d5987",
              "& th": {
                padding: "4px 8px",
                fontSize: 14,
              },
            }}
          >
            <TableRow>
              {Object.keys(data[0]).map((column) => (
                <TableCell
                  sx={{
                    color: "#fff !important",
                    opacity: 1,
                    font: "16px Robotonormal normal medium 16px/19px Roboto",
                    border: "1px solid #4d5987",
                    padding: "4px 8px",
                    fontSize: 14,
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
                      {column === "userName" ||
                      column === "project" ||
                      column === "toolName" ||
                      column === "client" ? (
                        <Grid item xs={4} mt={1}>
                          <IconButton
                            sx={{ color: "#fff !important" }}
                            onClick={() => handleFilterToggle(column)}
                          >
                            <FilterListIcon />
                          </IconButton>
                        </Grid>
                      ) : null}
                      {column === "userName" ||
                      column === "project" ||
                      column === "toolName" ||
                      column === "client" ? (
                        <Grid item xs={12}>
                          {filterOptions[column] && isFilterEnabled[column] && (
                            <FormControl
                              variant="standard"
                              style={{ minWidth: 120, marginLeft: "10px" }}
                            >
                              <InputLabel
                                sx={{
                                  color: "#fff !important",
                                  minWidth: "100px",
                                }}
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
                    padding: "4px 8px",
                    fontSize: 14,
                  },
                }}
                key={index}
              >
                {Object.values(row).map((cell, cellIndex) => (
                  <TableCell
                    sx={{
                      color: "#fff !important",
                      border: "1px solid #4d5987",
                      padding: "4px 8px",
                      fontSize: 14,
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
          sx={{ color: "#fff !important" }}
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
export default ToolsStatistics;
