import React, { useState,useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./listofTools.css";
import  { useNavigate }  from "react-router-dom";

const data = [
  {
    "#": 1,
    userName: "Raghavendra",
    client: "qxn7500",
    project:"Mumbai",
    role: "Super Admin",
    toolName:"Tool3",
    processInstanceId: "df05a1bb-4b11-11ef-b326-22c19b595c8b",
    timeStamp: "03-07-2024 16:15:30",
    output: "View",
  },
  {
    "#": 2,
    userName: "Santosh",
    client: "qxn7500",
    project:"Mumbai",
    role: "Super Admin",
    toolName:"Tool3",
    processInstanceId: "zf05a1bb-4b11-11ef-b326-22c19b595c8b",
    timeStamp: "03-07-2024 16:15:30",
    output: "View",
  },
  {
    "#": 3,
    userName: "Shabaz",
    client: "qxn7500",
    project:"Mumbai",
    role: "Super Admin",
    toolName:"Tool3",
    processInstanceId: "cf05a1bb-4b11-11ef-b326-22c19b595c8b",
    timeStamp: "03-07-2024 16:15:30",
    output: "View",
  },
  {
    "#": 4,
    userName: "Arif",
    client: "qxn7500",
    project:"Mumbai",
    role: "Super Admin",
    toolName:"Tool3",
    processInstanceId: "af05a1bb-4b11-11ef-b326-22c19b595c8b",
    timeStamp: "03-07-2024 16:15:30",
    output: "View",
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
          setToolsData([parsedToolNames]); // wrap single element in an array
        }
      } else {
        console.log("No data found under 'toolnames' key");
      }
    }, []);
    

  const handleClick = async() => {
    try {
      const promises = toolsData.map(async (toolName, index) => {
        const requestBody = {
          processInstanceId: id,
          toolName: toolName,
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
        });
  
        const data = await response.json();
        setResponsesData((prevResponses) => ({
          ...prevResponses,
          [toolName]: data,
        }));
      });
  
      await Promise.all(promises);
    } catch (error) {
      console.error("Error submitting tools:", error);
    } finally {
      navigate('/dashboardScreen', { replace: true });
    }
  };
  return (
    <TableCell sx={{ color: "#6477b1", border: "1px solid #4d5987" }}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container direction="row" spacing={0}>
          <Grid sx={{cursor:"pointer"}}item xs={8}>
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
  const [searchTerms] = useState({});
  const [filterConditions] = useState({});
  const [sortConfig] = useState({ key: null, direction: "asc" });
  const [page] = useState(0);
  const [rowsPerPage] = useState(5);

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

  const currentRows = sortedData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <TableContainer>
      <Table>
        <TableHead
          sx={{ textTransform: "capitalize", border: "1px solid #4d5987" }}
        >
          <TableRow>
            {Object.keys(data[0]).map((column) => (
              <TableCell
                sx={{ color: "#8BA5E1", opacity: 1, font: "16px Roboto", border: "1px solid #4d5987" }}
                key={column}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container direction="row" spacing={0}>
                    <Grid item xs={8}>
                      <Typography>{column}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {currentRows.map((row, index) => (
            <TableRow key={index}>
              {Object.values(row).map((cell, cellIndex) => {
                if (cellIndex === 8) {
                  // Render OutputCell component for the output column
                  return <OutputCell value={cell} row={row} key={cellIndex} />;
                } else {
                  return (
                    <TableCell
                      sx={{ color: "#6477b1", border: "1px solid #4d5987" }}
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
  );

};
export default ListofTools;
