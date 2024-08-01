import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Collapse,
  IconButton,
  Typography,
  Box,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import "../FailedTransactions/failedTransactions.css";
import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  components: {
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#97B5F9",
          opacity: 1,
          font: "16px",
        },
      },
    },
  },
});

const FailedTransactions = () => {
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([
    {
      transactionId: 1,
      errorDescription: "Error Reading File",
      customer: "Airtel",
      project: "Hyderabad",
      timestamp: "4/7/2024 9:00 AM",
    },
    {
      transactionId: 2,
      errorDescription: "Tool 1 Service down",
      customer: "Jio",
      project: "Mumbai",
      timestamp: "4/7/2024 4:00 PM",
    },
  ]);

  const handleClick = () => {
    setOpen(!open);
  };

  const handleDelete = (transactionId) => {
    setRows(rows.filter((row) => row.transactionId !== transactionId));
  };

  const handleClearAll = () => {
    setRows([]);
  };

  return (
    <Box>
      <Typography className="failedTrans">
        Show Failed Transactions
        <IconButton onClick={handleClick}>
          {open ? (
            <KeyboardArrowUpIcon className="iconColor" />
          ) : (
            <KeyboardArrowDownIcon className="iconColor" />
          )}
        </IconButton>
      </Typography>
      <Collapse in={open} timeout="auto" unmountOnExit orientation="vertical">
        <ThemeProvider theme={theme}>
          <div style={{ height: 90, overflowY: "auto" }}>
            <Table size="small" sx={{ border: "1px solid #ddd" }}>
              <TableHead>
                <TableRow sx={{ border: "1px solid #ddd" }}>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    Transaction Id
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    Error Description
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    Customer
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    Project
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    Timestamp
                  </TableCell>
                  <TableCell sx={{ border: "1px solid #ddd" }}>
                    Action
                    <Button
                      variant="contained"
                      style={{
                        background:
                          "transparent linear-gradient(107deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
                        // boxShadow: "0px 0px 5px #00000029",
                        border: "1px solid #150B35",
                        borderRadius: "8px",
                        opacity: 1,
                      }}
                      sx={{ mr: 3 }}
                      onClick={() => handleClearAll()}
                    >
                      Clear All
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.transactionId}>
                    <TableCell
                      sx={{ border: "1px solid #ddd" }}
                      component="th"
                      scope="row"
                    >
                      {row.transactionId}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {row.errorDescription}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {row.customer}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {row.project}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      {row.timestamp}
                    </TableCell>
                    <TableCell sx={{ border: "1px solid #ddd" }}>
                      <Button
                        variant="contained"
                        style={{
                          background:
                            "transparent linear-gradient(107deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
                          boxShadow: "0px 0px 5px #00000029",
                          border: "1px solid #150B35",
                          borderRadius: "8px",
                          opacity: 1,
                        }}
                        sx={{ mr: 2 }}
                      >
                        Retry
                      </Button>
                      <Button
                        variant="contained"
                        style={{
                          background:
                            "transparent linear-gradient(107deg, #7A045D 0%, #B135A1 52%, #9959EC 100%) 0% 0% no-repeat padding-box",
                          boxShadow: "0px 0px 5px #00000029",
                          border: "1px solid #150B35",
                          borderRadius: "8px",
                          opacity: 1,
                        }}
                        onClick={() => handleDelete(row.transactionId)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </ThemeProvider>
      </Collapse>
    </Box>
  );
};

export default FailedTransactions;
