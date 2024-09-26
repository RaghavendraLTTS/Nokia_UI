import React, { useState } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import "../Dashbaord/Dashboard.css";
import ListofTools from "../../componenets/ListOfTools/ListOfTools";

{/*--------------- { Please remove unused code}------------------- */}
const tabStyle = {
  textAlign: "left",
  color: "#FFFFFFCC",
  font: "Roboto",
  fontSize: "15x",
  opacity: 1,
};

const toolStyle = {
  marginLeft: "5px",
  color: "#FFFFFFCC",
  font: "Gothic",
  fontSize: "15px",
  opacity: 1,
};

{/*--------------- { Please remove unused code}------------------- */}
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

function Dashboard() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0); {/*--------------- { Please remove unused code}------------------- */}

  const handleTabChange = (e, tabIndex) => { {/*--------------- { Please remove unused code}------------------- */}
    setCurrentTabIndex(tabIndex);
  };

  return (
    <div className="userStyle">
      {/*--------------- { Please remove commented code}------------------- */}
    {/* // <Box mt={2} sx={{ flexGrow: 1 }}> */}
      {/* <StyledContainerDropDown
        style={{ maxWidth: "100%", height:"auto", marginTop: "10px", }}
        className="dropDown-selection"
      > */}
      
        <Grid container spacing={2}>
          <Grid item xs={12}>
        
              <Typography style={toolStyle}>List of Output Tools</Typography>
              <ListofTools/>            
           </Grid>
        </Grid> 
     
      {/* </StyledContainerDropDown> */}
    {/* // </Box> */}
    </div>  
  );
}

export default Dashboard;