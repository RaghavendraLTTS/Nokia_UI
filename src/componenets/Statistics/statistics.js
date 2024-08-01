import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UserStatistics from "../Statistics/UserStatistics/userStatistics";
import ToolsStatistics from "../Statistics/ToolsStatistics/toolsStatistics";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import InsertDriveFileOutlinedIcon from "@mui/icons-material/InsertDriveFileOutlined";
import "../Statistics/statistics.css";

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

function Statistics() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);

  const handleTabChange = (e, tabIndex) => {
    console.log(tabIndex);
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
                <Grid item xs={11}></Grid>
                <Grid item xs={1}>
                  <Box display="flex" alignItems="flex-end" mt={2}>
                    <Grid
                      container
                      sx={{ color: "#545e99" }}
                      direction="row"
                      spacing={0}
                    >
                      <Grid item xs={6}>
                        Export
                      </Grid>
                      <Grid item xs={6}>
                        <InsertDriveFileOutlinedIcon />
                      </Grid>
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














// import React, { useState } from 'react';
// import { Box, Tab, Tabs, Typography } from '@mui/material';
// import UserStatistics from './userStatistics';
// import ToolsStatistics from './toolsStatistics';
// import GenerateExcel from './GenerateExcel';

// // ...

// function Statistics() {
//   const [currentTabIndex, setCurrentTabIndex] = useState(0);
//   const [excelData, setExcelData] = useState([]);

//   const handleTabChange = (e, tabIndex) => {
//     console.log(tabIndex);
//     setCurrentTabIndex(tabIndex);

//     if (tabIndex === 0) {
//       setExcelData(userStatisticsData);
//     } else if (tabIndex === 1) {
//       setExcelData(toolsStatisticsData);
//     }
//   };

//   const handleExportClick = () => {
//     <GenerateExcel data={excelData} fileName={`statistics_${currentTabIndex}`} />;
//   };

//   return (
//     <>
//       <StyledContainerDropDown
//         style={{ maxWidth: '100%', height: '85vh', marginTop: '10px' }}
//         className="dropDown-selection"
//       >
//         <Grid container spacing={2}>
//           <Grid item xs={12}>
//             <>
//               <Tabs value={currentTabIndex} onChange={handleTabChange}>
//                 <Tab label="User Statistics" style={tabStyle} />
//                 <Tab label="Tools Statistics" style={tabStyle} />
//                 <Grid container direction="row" spacing={0}>
//                   <Grid item xs={11}></Grid>
//                   <Grid item xs={1}>
//                     <Box display="flex" alignItems="flex-end" mt={2}>
//                       <Grid
//                         container
//                         sx={{ color: '#545e99' }}
//                         direction="row"
//                         spacing={0}
//                       >
//                         <Grid item xs={6}>
//                           <Button onClick={handleExportClick}>Export</Button>
//                         </Grid>
//                         <Grid item xs={6}>
//                           <InsertDriveFileOutlinedIcon />
//                         </Grid>
//                       </Grid>
//                     </Box>
//                   </Grid>
//                 </Grid>
//               </Tabs>

//               {/* TAB 1 Contents */}
//               {currentTabIndex === 0 && (
//                 <Box sx={{ p: 3 }}>
//                   <UserStatistics />
//                 </Box>
//               )}

//               {/* TAB 2 Contents */}
//               {currentTabIndex === 1 && (
//                 <Box sx={{ p: 3 }}>
//                   <ToolsStatistics />
//                 </Box>
//               )}
//             </>
//           </Grid>
//         </Grid>
//       </StyledContainerDropDown>
//     </>
//   );
// }

// export default Statistics;