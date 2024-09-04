import React, { useState } from "react";
import { DonutChart, PieChart, AreaChart, MultiBarGraph, GaugeChart, StreamGraph } from '@ltts-dtp-appstudio/react-graphscharts'
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Typography,
  Box,
  Grid,
} from "@mui/material";

import {
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
  Tooltip,
  Legend,
} from "recharts";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import "../DashboardScreen/dashboardScreen.css";

const backstyle = {
  backgroundColor: "#1c1444",
  color: "#fff",
  padding: "20px",
  height: "250px",
  borderRadius: "10px",
  position: "relative",
};
const style = {
  backgroundColor: "#1c1444",
  color: "#fff",
  padding: "20px",
  height: "250px",
  borderRadius: "10px",
  position: "relative",
};

const tooltipStyle = {
  fontFamily: "'Open Sans', sans-serif",
};

const Chart = () => {
  const location = useLocation();
  const responsesData = location.state.responsesData.toolData;

  const [selectedChart, setSelectedChart] = useState("");

  let pieData = [];

  switch (responsesData.toolName) {
    case "RSI":
      pieData = [
        {

          "category": "RSI Conflict",
          "technology": "",
          "value": responsesData.jsonData.report["RSI Anomaly Detected"],
          "color": "#E23B3B"
        },
        {

          "category": "Total Conflict",
          "technology": "",
          "value": responsesData.jsonData.report["Total Relations Analyzed"],
          "color": "#23ABB6"
        },
      ];
      break;
    case "PCI":
      pieData = [
        {

          "category": "PCI Conflict",
          "technology": "",
          "value": responsesData.jsonData.report["PCI Anomaly Detected"],
          "color": "#F7B737"
        },
        {

          "category": "Total Conflict",
          "technology": "",
          "value": responsesData.jsonData.report["Total Relations Analyzed"],
          "color": "#23ABB6"
        },
      ];
      break;
    case "Output":
      pieData = [
        {

          "category": "RSI Conflict",
          "technology": "",
          "value": responsesData.jsonData.report["RSI Anomaly"],
          "color": "#E23B3B"
        },
        {

          "category": "PCI Conflict",
          "technology": "",
          "value": responsesData.jsonData.report["PCI Anomaly"],
          "color": "#F7B737"
        },
        {

          "category": "Total Conflict",
          "technology": "",
          "value": responsesData.jsonData.report["Total Anomaly"],
          "color": "#23ABB6"
        },
      ];
      break;
    default:

      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }


  let donutData = [];
  switch (responsesData.toolName) {
    case "RSI":
      donutData = [
        {

          "label": "RSI Conflict",
          "value": responsesData.jsonData.report["RSI Anomaly Detected"],
          "color": "#E23B3B"
        },
        {

          "label": "Total Conflict",
          "value": responsesData.jsonData.report["Total Relations Analyzed"],
          "color": "#23ABB6"
        },
      ];
      break;
    case "PCI":
      donutData = [
        {

          "label": "PCI Conflict",
          "value": responsesData.jsonData.report["PCI Anomaly Detected"],
          "color": "#F7B737"
        },
        {

          "label": "Total Conflict",
          "value": responsesData.jsonData.report["Total Relations Analyzed"],
          "color": "#23ABB6"
        },
      ];
      break;
    case "Output":
      donutData = [
        {

          "label": "RSI Conflict",
          "value": responsesData.jsonData.report["RSI Anomaly"],
          "color": "#E23B3B"
        },
        {

          "label": "PCI Conflict",
          "value": responsesData.jsonData.report["PCI Anomaly"],
          "color": "#F7B737"
        },
        {

          "label": "Total Conflict",
          "value": responsesData.jsonData.report["Total Anomaly"],
          "color": "#23ABB6"
        },
      ];
      break;
    default:

      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }

  let radialData = [];
  switch (responsesData.toolName) {
    case "RSI":
      radialData = [
        {
          name: "RSI Conflict",
          value: responsesData.jsonData.report["RSI Anomaly Detected"],
          fill: "#E23B3B",
        },
        {
          name: "Total Conflict",
          value: responsesData.jsonData.report["Total Relations Analyzed"],
          fill: "#23ABB6",
        },
      ];
      break;
    case "PCI":
      radialData = [
        {
          name: "PCI Conflict",
          value: responsesData.jsonData.report["PCI Anomaly Detected"],
          fill: "#F7B737",
        },
        {
          name: "Total Conflict",
          value: responsesData.jsonData.report["Total Relations Analyzed"],
          fill: "#23ABB6",
        },
      ];
      break;
    case "Output":
      radialData = [
        {
          name: "RSI Conflict",
          value: responsesData.jsonData.report["RSI Anomaly"],
          fill: "#E23B3B",
        },
        {
          name: "PCI Conflict",
          value: responsesData.jsonData.report["PCI Anomaly"],
          fill: "#F7B737",
        },
        {
          name: "Total Conflict",
          value: responsesData.jsonData.report["Total Anomaly"],
          fill: "#23ABB6",
        },
      ];
      break;
    default:
      console.error(`Unknown toolName: ${responsesData.jsonData.toolName}`);
  }

  let areaData = [];
  switch (responsesData.toolName) {
    case "RSI":
      areaData = [
        {
          "label": "RSI Conflict",
          "value": responsesData.jsonData.report["RSI Anomaly Detected"],
        },
        {
          "label": "Total Conflict",
          "value": responsesData.jsonData.report["Total Relations Analyzed"],
        },
      ];
      break;
    case "PCI":
      areaData = [
        {
          "label": "PCI Conflict",
          "value": responsesData.jsonData.report["PCI Anomaly Detected"],
        },
        {
          "label": "Total Conflict",
          "value": responsesData.jsonData.report["Total Relations Analyzed"],
        },
      ];
      break;
    case "Output":
      areaData = [
        {
          "label": "RSI Conflict",
          "value": responsesData.jsonData.report["RSI Anomaly"],
        },
        {
          "label": "PCI Conflict",
          "value": responsesData.jsonData.report["PCI Anomaly"],
        },
        {
          "label": "Total Conflict",
          "value": responsesData.jsonData.report["Total Anomaly"],
        },
      ];
      break;
    default:

      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }



  let barData = [];

  switch (responsesData.toolName) {

    case "RSI":
      barData = [
        {
          "graphtype": [
            {
              "type": "vertical",
              "draggablebar": "true"
            }
          ],
          "graphlabels": [
            {
              "label": "RSI Conflict",
              "value": responsesData.jsonData.report["RSI Anomaly Detected"],
              "color": "#E23B3B"
            },

            {
              "label": "Total Conflict",
              "value": responsesData.jsonData.report["Total Relations Analyzed"],
              "color": "#23ABB6"
            }
          ]

        }
      ];
      break;
    case "PCI":
      barData = [
        {
          "graphtype": [
            {
              "type": "vertical",
              "draggablebar": "true"
            }
          ],
          "graphlabels": [
            {
              "label": "PCI Conflict",
              "value": responsesData.jsonData.report["PCI Anomaly Detected"],
              "color": "#F7B737"
            },

            {
              "label": "Total Conflict",
              "value": responsesData.jsonData.report["Total Relations Analyzed"],
              "color": "#23ABB6"
            }
          ]

        }

      ];
      break;
    case "Output":
      barData = [
        {
          "graphtype": [
            {
              "type": "vertical",
              "draggablebar": "true"
            }
          ],
          "graphlabels": [
            {
              "label": "RSI Conflict",
              "value": responsesData.jsonData.report["RSI Anomaly"],
              "color": "#E23B3B"
            },
            {
              "label": "PCI Conflict",
              "value": responsesData.jsonData.report["PCI Anomaly"],
              "color": "#F7B737"
            },

            {
              "label": "Total Conflict",
              "value": responsesData.jsonData.report["Total Anomaly"],
              "color": "#23ABB6"
            }
          ]

        }

      ];
      break;
    default:
      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }

  const pciPercent = Math.ceil(responsesData.jsonData.report["PCI Anomaly Detected"] / responsesData.jsonData.report["Total Relations Analyzed"])
  console.log(pciPercent)
  const rsiPercent = Math.ceil(responsesData.jsonData.report["RSI Anomaly Detected"] / responsesData.jsonData.report["Total Relations Analyzed"])
  const pcitotalPercent = Math.ceil(responsesData.jsonData.report["PCI Anomaly"] / responsesData.jsonData.report["Total Anomaly"])
  const rsitotalPercent = Math.ceil(responsesData.jsonData.report["RSI Anomaly"] / responsesData.jsonData.report["Total Anomaly"])
  const totalPercent = responsesData.jsonData.report["Total Anomaly"] / responsesData.jsonData.report["Total Anomaly"]
  let gaugeData1 = {};
  let gaugeData2 = {};
  let gaugeData3 = {};
  let gaugeData = {};
  console.log(gaugeData, "gauge")
  switch (responsesData.toolName) {
    case "RSI":
      gaugeData =
      {
        "gaugeData": {
          "value": rsiPercent,
          "min": 1,
          "max": 100,
          "showHand": true,
          "measurements": "%",
          "gradientColors": [
            { "stop": 0, "color": "#3CB371" },
            { "stop": 0.5, "color": "#FFD700" },
            { "stop": 1, "color": "#E33127" }
          ]
        }
      }
      break;
    case "PCI":
      gaugeData =
      {
        "gaugeData": {
          "value": pciPercent,
          "min": 1,
          "max": 100,
          "showHand": true,
          "measurements": "%",
          "gradientColors": [
            { "stop": 0, "color": "#3CB371" },
            { "stop": 0.5, "color": "#FFD700" },
            { "stop": 1, "color": "#E33127" }
          ]
        }
      }
      break;
    case "Output":
      gaugeData1 =
      {
        "gaugeData": {
          "value": totalPercent,
          "min": 1,
          "max": 100,
          "showHand": true,
          "measurements": "%",
          "gradientColors": [
            { "stop": 0, "color": "#3CB371" },
            { "stop": 0.5, "color": "#FFD700" },
            { "stop": 1, "color": "#E33127" }
          ]
        }
      }
      gaugeData2 =
      {
        "gaugeData": {
          "value": rsitotalPercent,
          "min": 1,
          "max": 100,
          "showHand": true,
          "measurements": "%",
          "gradientColors": [
            { "stop": 0, "color": "#3CB371" },
            { "stop": 0.5, "color": "#FFD700" },
            { "stop": 1, "color": "#E33127" }
          ]
        }
      }

      gaugeData3 =
      {
        "gaugeData": {
          "value": pcitotalPercent,
          "min": 1,
          "max": 100,
          "showHand": true,
          "measurements": "%",
          "gradientColors": [
            { "stop": 0, "color": "#3CB371" },
            { "stop": 0.5, "color": "#FFD700" },
            { "stop": 1, "color": "#E33127" }
          ]
        }
      }
      break;

    default:

      console.error(`Unknown toolName: ${responsesData.toolName}`);
  }


  const COLORS = [
    "#E23B3B",
    "#F7B737",
    "#23ABB6",
  ];

  return (
    <> <Grid container spacing={2}>
      <Grid xs={6}>
        <aside style={{ width: "100%" }}>
          <FormControl
            variant="outlined"
            style={{
              minWidth: 200,
              justifyContent: "center",
              backgroundColor: "#1c1444",
              textColor: "#fff",
            }}
          >
            <InputLabel style={{ backgroundColor: "#1c1444", color: "#fff" }}>
              Select Chart
            </InputLabel>
            <Select
              value={selectedChart}
              onChange={(e) => setSelectedChart(e.target.value)}
              label="Select Chart"
              style={{
                color: "#fff", // Add this line to change the text color of the selected value
              }}
              MenuProps={{
                PaperProps: {
                  style: {
                    backgroundColor: "#1C0D46",
                    color: "white",
                  },
                },
              }}
            >
              <MenuItem value="Pie">Pie Chart</MenuItem>
              <MenuItem value="Bar">Bar Chart</MenuItem>
              <MenuItem value="Radial">Radial Chart</MenuItem>
              <MenuItem value="Area">Area Chart</MenuItem>
              <MenuItem value="Conflicts Distribution">
                Conflicts Distribution
              </MenuItem>
              <MenuItem value="Gauge">Gauge Chart</MenuItem>
            </Select>
          </FormControl>
          {selectedChart === "Pie" && (
            <ResponsiveContainer width="100%" height={370}>

              <PieChart json={pieData} graphstyle={style} backdropstyle={backstyle} />
            </ResponsiveContainer>
          )}
          {selectedChart === "Bar" && (
            <ResponsiveContainer width="100%" height={370}>

              <MultiBarGraph json={barData} graphstyle={style} backdropstyle={backstyle} />
            </ResponsiveContainer>
          )}
          {selectedChart === "Radial" && (
            <ResponsiveContainer width="100%" height={400}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="10%"
                outerRadius="80%"
                barSize={10}
                data={radialData}
                plotOptions={{
                  pie: {
                    dataLabels: {
                      minAngleToShowLabel: 15,
                    },
                  },
                }}
              >
                <RadialBar
                  minAngle={15}
                  label={{ position: "outside", offset: 10, fill: "#fff", fontFamily: "'Open Sans', sans-serif", }}
                  background
                  clockWise
                  dataKey="value"
                />
                <Legend
                  iconSize={10}
                  layout="vertical"
                  verticalAlign="middle"
                  align="right"
                />
                <Tooltip contentStyle={tooltipStyle} />
              </RadialBarChart>
            </ResponsiveContainer>
          )}
          {selectedChart === "Area" && (
            <ResponsiveContainer width="100%" height={370}>

              <AreaChart json={areaData} graphstyle={style} backdropstyle={backstyle} />

            </ResponsiveContainer>
          )}
          {selectedChart === "Conflicts Distribution" && (
            <ResponsiveContainer width="100%" height={370}>

              <DonutChart json={donutData} graphstyle={style} backdropstyle={backstyle} />
            </ResponsiveContainer>
          )}
          {selectedChart === "Gauge" && (
            <ResponsiveContainer width="100%" height={370}>
              <Box
                display="flex"
                justifyContent="space-around"
                alignItems="center"
              >
                {responsesData.toolName === "RSI" ? (
                  <Box textAlign="center">
                    <Typography variant="subtitle1" color={"white"}>
                      RSI Conflict
                    </Typography>

                    <GaugeChart json={gaugeData} />
                  </Box>
                ) : responsesData.toolName === "PCI" ? (
                  <Box textAlign="center">
                    <Typography variant="subtitle1" color={"white"}>
                      PCI Conflict
                    </Typography>

                    <GaugeChart json={gaugeData} />
                  </Box>
                ) : responsesData.toolName === "Output" ? (
                  <>
                    <Box textAlign="center">
                      <Typography variant="subtitle1" color={"white"}>
                        RSI Conflict
                      </Typography>

                      <GaugeChart json={gaugeData2} />
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="subtitle1" color={"white"}>
                        PCI Conflict
                      </Typography>

                      <GaugeChart json={gaugeData3} />
                    </Box>
                    <Box textAlign="center">
                      <Typography variant="subtitle1" color={"white"}>
                        Total Conflict
                      </Typography>

                      <GaugeChart json={gaugeData1} />
                    </Box>
                  </>
                ) : null}
              </Box>
            </ResponsiveContainer>
          )}
        </aside>
      </Grid>


    </Grid>
    </>

  )
}
export default Chart;

