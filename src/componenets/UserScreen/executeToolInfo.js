import React from 'react';
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
import Typography from "@mui/material/Typography";
import { format } from 'date-fns';

const ExecuteToolInfo = ({ exeData }) => {
  if (!exeData) {
    return <div>No data available</div>;
  }

  // Sort data based on latest timestamp
  const sortedData = exeData.sort((a, b) => {
    const timestampA = new Date(a.timestamp);
    const timestampB = new Date(b.timestamp);
    return timestampB.getTime() - timestampA.getTime();
  });

  // Calculate the width of each column header
  const columnWidths = {};
  if (exeData[0]) {
    Object.keys(exeData[0]).forEach((column) => {
      const width = column.length ; // adjust the multiplier as needed
      columnWidths[column] = width;
    });
  }

  return (
    <TableContainer
      sx={{
        // overflowY: "auto",
        display: "flex",
        flexDirection: "column",
        // height: "140px",
      }}
    >
      <Table>
        <TableHead
          sx={{
            position: "sticky",
            top: 0,
            backgroundColor: "#282468",
            zIndex: 1,
            textTransform: "capitalize",
            border: "1px solid #4d5987",
            "& th": {
              padding: "4px 4px",
              fontSize: 14,
            },
          }}
        >
          <TableRow>
            {exeData[0] && Object.keys(exeData[0]).map((column) => (
              <TableCell
                sx={{
                  color: "#fff !important",
                  opacity: 1,
                  fontFamily: "'Open Sans', sans-serif",
                  border: "1px solid #4d5987",
                  padding: "4px 4px",
                  fontSize: 14,
                  width: columnWidths[column], // set the width of each column header
                }}
                key={column}
              >
                <Box sx={{ flexGrow: 1 }}>
                  <Grid container direction="row" spacing={0}>
                    <Grid item xs={8}>
                      <Typography fontSize="14px">{column}</Typography>
                    </Grid>
                  </Grid>
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedData.map((row, index) => (
            <TableRow
              sx={{
                "& td": {
                  padding: "4px 4px",
                  fontSize: 14,
                },
              }}
              key={index}
            >
              {Object.values(row).map((cell, cellIndex) => {
                if (Array.isArray(cell)) {
                  cell = cell.join(", ");
                }
                // if (typeof cell === 'string' && cell.includes('T')) {
                //     try {
                //       cell = format(new Date(cell), 'yyyy-MM-dd HH:mm:ss');
                //     } catch (error) {
                //       cell = 'Invalid date';
                //     }
                //   }
                if (typeof cell === 'string' && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|[\+-]\d{2}:\d{2})?$/.test(cell)) {
                    try {
                      cell = format(new Date(cell), 'yyyy-MM-dd HH:mm:ss');
                    } catch (error) {
                      cell = 'Invalid date';
                    }
                  }
                return (
                  <TableCell
                    sx={{
                      color: "#fff !important",
                      border: "1px solid #4d5987",
                      padding: "4px 4px",
                      fontSize: 14,
                    }}
                    key={cellIndex}
                  >
                    {cell}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ExecuteToolInfo;