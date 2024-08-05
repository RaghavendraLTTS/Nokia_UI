import React, { useState,useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UserStatistics from "../Statistics/UserStatistics/userStatistics";
import ToolsStatistics from "../Statistics/ToolsStatistics/toolsStatistics";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import "../Statistics/statistics.css";
import Button from "@mui/material/Button";
import XLSXDownload from "../../Utilits/excelDownload";

const tabStyle = {
  textAlign: "left",
  color: "#C4D5FF",
  font: "Roboto",
  fontSize: "16x",
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

const userStatisticsData = [

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
const toolsStatisticsData = [

  {
    id: 1,
    userName: "Raghavendra",
    client: "BSNL",
    project: "Project 02",
    toolName:"PCI",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:12
  },
  {
    id: 2,
    userName: "Santhosh",
    client: "Samsung",
    project: "Project 03",
    toolName:"RSI",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:14
  },
  {
    id: 3,
    userName: "Mayur",
    client: "Motorala",
    project: "Project 03",
    toolName:"Output Merged",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:16
  },
  {
    id: 4,
    userName: "Rajesh",
    client: "Nokia",
    project: "Project 04",
    toolName:"RSI",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:19
  },
  {
    id: 5,
    userName: "Arif",
    client: "Airtel",
    project: "Project 05",
    toolName:"PCI",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:21
  },
  {
    id: 6,
    userName: "Raghavendra",
    client: "Samsung",
    project: "Project 06",
    toolName:"RSI",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:23
  },
  {
    id: 7,
    userName: "Santhosh",
    client: "T-mobile",
    project: "Project 07",
    toolName:"Output Merged",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:36
  },
  {
    id: 8,
    userName: "Nishant",
    client: "Motorala",
    project: "Project 08",
    toolName:"PCI",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:37
  },
  {
    id: 9,
    userName: "Shabaz",
    client: "Airtel",
    project: "Project 10",
    toolName:"RSI",    
    onExecuteTimestamp: "03-07-2024 13:00:10",
    responseRecievedTimestamp: "03-07-2024 14:00:00",
    processingTime: "03-07-2024 13:00:00",
    processingInstanceId:"adafderef87979-bdskjbf4d",
    transactionId:43
  },
];


function Statistics() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    if (currentTabIndex === 0) {
      setCurrentData(userStatisticsData); // Set the current data to user statistics data
    } else if (currentTabIndex === 1) {
      setCurrentData(toolsStatisticsData); // Set the current data to tools statistics data
    }
  }, [currentTabIndex]);

  const handleExport = () => {
    XLSXDownload(currentData, currentTabIndex === 0 ? 'userstatistics' : 'toolstatistics');
  };

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <>
      <StyledContainerDropDown
        style={{ maxWidth: "100%", height: "85vh", marginTop: "10px" }}
        className="dropDown-selection"
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <>
              <Tabs value={currentTabIndex} onChange={handleTabChange}>
                <Tab label="User Statistics" style={tabStyle} />
                <Tab label="Tools Statistics" style={tabStyle} />
                <Grid container direction="row" spacing={0}>
                <Grid item xs={10}></Grid>
                <Grid item xs={2}>
                  <Box display="flex" alignItems="flex-end" mt={2}>
                    <Grid
                      container
                      sx={{ color: "#545e99" }}
                      direction="row"
                      spacing={0}
                    >
                      <Button
                      onClick={handleExport}
                        variant="contained"
                        color="primary"
                        startIcon={<InsertDriveFileOutlinedIcon />}
                        hover={{
                          backgroundColor: "#545e99",
                          color: "white"
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
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
              </Tabs>
              

              {/* TAB 1 Contents */}
              {currentTabIndex === 0 && (
                <Box sx={{ p: 3 }}>
                  <UserStatistics />
                </Box>
              )}

              {/* TAB 2 Contents */}
              {currentTabIndex === 1 && (
                <Box sx={{ p: 3 }}>
                  <ToolsStatistics />
                </Box>
              )}
            </>
          </Grid>
        </Grid>
      </StyledContainerDropDown>
    </>
  );
}

export default Statistics;