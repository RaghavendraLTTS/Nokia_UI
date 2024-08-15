import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import './userSummary.css'
const UserSummary = () => {
  const data = [
    { label: 'List of User', value: 120 },
    { label: 'List of WF', value: 50 },
    { label: 'Total Digital Hrs', value: 2000 },
    { label: 'Total NonDigital Hrs', value: 800 },
  ];

  return (
    <TableContainer>
      <Table border={1} borderStyle="solid">
        <TableHead>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow 
            sx={{
                "& td": {
                  padding: "2px", 
                  fontSize: 13, 
                },
              }}
            key={row.label}>
              <TableCell padding="none" sx={{
                      color: "#fff !important",
                      border: "1px solid #4d5987",
                      padding: "2px 4px",
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 13,
                    }}>
                {row.label}
              </TableCell>
              <TableCell padding="none" align="right" sx={{
                      color: "#fff !important",
                      border: "1px solid #4d5987",
                      padding: "2px 4px",
                      fontFamily: "'Open Sans', sans-serif",
                      fontSize: 13,
                    }}>
                {row.value}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UserSummary;