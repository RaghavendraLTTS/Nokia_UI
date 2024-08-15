import React, { useState,useEffect,useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TableSortLabel,
  IconButton,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import FilterListIcon from "@mui/icons-material/FilterList";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./listofTools.css";
import  { useNavigate }  from "react-router-dom";

const data = [
  {
    "#": 1,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "01-08-2024 08:04",
    output: "View"
  },
  {
    "#": 2,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "02-08-2024 08:04",
    output: "View"
  },
  {
    "#": 3,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "03-08-2024 08:04",
    output: "View"
  },
  {
    "#": 4,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "04-08-2024 08:04",
    output: "View"
  },
  {
    "#": 5,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "05-08-2024 08:04",
    output: "View"
  },
  {
    "#": 6,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "06-08-2024 08:04",
    output: "View"
  },
  {
    "#": 7,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "07-08-2024 08:04",
    output: "View"
  },
  {
    "#": 8,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "08-08-2024 08:04",
    output: "View"
  },
  {
    "#": 9,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "09-08-2024 08:04",
    output: "View"
  },
  {
    "#": 10,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "10-08-2024 08:04",
    output: "View"
  },
  {
    "#": 11,
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    timeStamp: "11-08-2024 08:04",
   output: "View"
  },
  {
    "#": 12,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "01-08-2024 09:06",
   output: "View"
  },
  {
    "#": 13,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "02-08-2024 09:06",
   output: "View"
  },
  {
    "#": 14,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "03-08-2024 09:06",
   output: "View"
  },
  {
    "#": 15,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "04-08-2024 09:06",
   output: "View"
  },
  {
    "#": 16,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "05-08-2024 09:06",
   output: "View"
  },
  {
    "#": 17,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "06-08-2024 09:06",
   output: "View"
  },
  {
    "#": 18,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "07-08-2024 09:06",
   output: "View"
  },
  {
    "#": 19,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "08-08-2024 09:06",
   output: "View"
  },
  {
    "#": 20,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "09-08-2024 09:06",
   output: "View"
  },
  {
    "#": 21,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp: "10-08-2024 09:06",
   output: "View"
  },
  {
    "#": 22,
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    timeStamp:"11-08-2024 09:06",
   output: "View"
  },
  {
    "#": 23,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "01-08-2024 08:06",
    output: "View"
  },
  {
    "#": 24,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "02-08-2024 08:06",
    output: "View"
  },
  {
    "#": 25,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "03-08-2024 08:06",
    output: "View"
  },
  {
    "#": 26,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "04-08-2024 08:06",
    output: "View"
  },
  {
    "#": 27,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "05-08-2024 08:06",
    output: "View"
  },
  {
    "#": 28,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "06-08-2024 08:06",
    output: "View"
  },
  {
    "#": 29,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "07-08-2024 08:06",
    output: "View"
  },
  {
    "#": 30,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "08-08-2024 08:06",
    output: "View"
  },
  {
    "#": 31,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "09-08-2024 08:06",
    output: "View"
  },
  {
    "#": 32,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "10-08-2024 08:06",
    output: "View"
  },
  {
    "#": 33,
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    timeStamp: "11-08-2024 08:06",
   output: "View"
  },
  {
    "#": 34,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "01-08-2024 09:08",
   output: "View"
  },
  {
    "#": 35,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "02-08-2024 09:08",
   output: "View"
  },
  {
    "#": 36,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "03-08-2024 09:08",
   output: "View"
  },
  {
    "#": 37,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "04-08-2024 09:08",
   output: "View"
  },
  {
    "#": 38,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "05-08-2024 09:08",
   output: "View"
  },
  {
    "#": 39,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "06-08-2024 09:08",
   output: "View"
  },
  {
    "#": 40,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "07-08-2024 09:08",
   output: "View"
  },
  {
    "#": 41,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "08-08-2024 09:08",
   output: "View"
  },
  {
    "#": 42,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "09-08-2024 09:08",
   output: "View"
  },
  {
    "#": 43,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp: "10-08-2024 09:08",
   output: "View"
  },
  {
    "#": 44,
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    timeStamp:"11-08-2024 09:08",
   output: "View"
  },
  
];

const filterOptions = Object.keys(data[0]).reduce((acc, key) => {
  acc[key] = [...new Set(data.map((item) => String(item[key]).toLowerCase()))];
  return acc;
}, {});

const OutputCell = ({ value, row ,onViewClick }) => {  
  const [id, setId] = useState(null);
  const [toolsData, setToolsData] = useState([]);
  const [responsesData, setResponsesData] = useState({});
  
  const navigate = useNavigate();

  useEffect(() => {
      const processData = localStorage.getItem("processedData");
      if (processData) {
        const data = JSON.parse(processData);
        setId(data.id);
      } else {
        console.log("No data found under 'processedData' key");
      }
  
      const toolNames = localStorage.getItem("toolnames");
      if (toolNames) {
        const parsedToolNames = JSON.parse(toolNames);
        if (Array.isArray(parsedToolNames)) {
          setToolsData(parsedToolNames);
        } else {
          setToolsData([parsedToolNames]); 
        }
      } else {
        console.log("No data found under 'toolnames' key");
      }
    }, []);
    
    useEffect(() => {
      const fetchToolOutputs = async () => {
        try {
          const tool = toolsData.includes('Output') ? 'Output' : toolsData[0];
            const requestBody = {
              processInstanceId: id,
              toolName: tool,
            };
  
            const response = await fetch(
              "http://localhost:8084/api/getToolOutputFromDB",
              // "http://wfm-tool-data-to-db.production.k-meain.he-pi-os-ohn-004.k8s.dyn.nesc.nokia.net/api/getToolOutputFromDB",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody),
              }
            );
  
            const data = await response.json();
            setResponsesData(() => ({
              toolData: data[0]
            }));
        } catch (error) {
          console.error("Error submitting tools:", error);
        }
      };
  
      if (id && toolsData.length > 0) {
        fetchToolOutputs();
      }
    }, [id, toolsData]);

    const handleClick = () => {
      navigate('/dashboardScreen', { state: { responsesData } });
    };
 
  return (
    <TableCell sx={{ color: "#6477b1", border: "1px solid #4d5987" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="row" spacing={0}>
          <Grid sx={{cursor:"pointer" , color:"#fff !important"}}item xs={8}>
            <Typography sx={{fontSize:"0.875rem"}}>
            <u onClick={handleClick}>{value}</u>
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </TableCell>
  );
};


const ListofTools = () => {
  const [searchTerms, setSearchTerms] = useState({});
  const [filterConditions, setFilterConditions] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");

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
 
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

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
      // height:"400px"
    }}
    >
      <Table>
        <TableHead
          sx={{
              position: "sticky",
              top: 0,
              backgroundColor: "#282468", // match the background color of the table
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
                  {/* <Grid container direction="row" spacing={0}>
                    <Grid item xs={8}>
                      <Typography>{column}</Typography>
                    </Grid>
                  </Grid> */}
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
                      {
                      column === "project" ||
                      column === "toolName" ||
                      column === "client" ?
                       (
                        <Grid item xs={4} mt={1}>
                          <IconButton
                            sx={{ color: "#fff !important" }}
                            onClick={() => handleFilterToggle(column)}
                          >
                            <FilterListIcon />
                          </IconButton>
                        </Grid>
                      ) : null}
                      {
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
             key={index}>
              {Object.values(row).map((cell, cellIndex) => {
                if (cellIndex === 5) {
                  // Render OutputCell component for the output column
                  return <OutputCell value={cell} row={row} key={cellIndex} />;
                } else {
                  return (
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
                  );
                }
              })}
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
export default ListofTools;
