import React, { useState,useEffect } from "react";
import { Box, Tab, Tabs, Typography } from "@mui/material";
import UserStatistics from "./UserStatistics/userStatistics";
import ToolsStatistics from "./ToolsStatistics/toolsStatistics";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/system";
import Container from "@mui/material/Container";
import "../Statistics/statistics.css";
import Button from "@mui/material/Button";
import XLSXDownload from "../../utilities/excelDownload";

const tabStyle = {
  textAlign: "left",
  color: "#C4D5FF",
  font: "Roboto",
  fontSize: "16x",
  opacity: 1,
};


const userStatisticsData = [
  {
    id: 1,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "01-08-2024 13:00:00",
    dashboardOpenTimestamp:"01-08-2024 13:05:00",
    dashboardCloseTimestamp: "01-08-2024 13:45:00",
    actualSpentTime: "00:40:00"
  },
  {
    id: 2,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "02-08-2024 14:00:00",
    dashboardOpenTimestamp:"02-08-2024 14:07:00",
    dashboardCloseTimestamp: "02-08-2024 14:52:00",
    actualSpentTime: "00:45:00"
  },
  {
    id: 3,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "03-08-2024 13:00:00",
    dashboardOpenTimestamp:"03-08-2024 13:09:00",
    dashboardCloseTimestamp: "03-08-2024 13:43:00",
    actualSpentTime: "00:34:00"
  },
  {
    id: 4,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "04-08-2024 14:30:00",
    dashboardOpenTimestamp:"04-08-2024 14:12:00",
    dashboardCloseTimestamp: "04-08-2024 15:07:00",
    actualSpentTime: "00:55:00"
  },
  {
    id: 5,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "05-08-2024 15:00:00",
    dashboardOpenTimestamp:"05-08-2024 15:04:00",
    dashboardCloseTimestamp: "05-08-2024 15:52:00",
    actualSpentTime: "00:48:00"
  },
  {
    id: 6,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "06-08-2024 14:00:00",
    dashboardOpenTimestamp:"06-08-2024 14:02:00",
    dashboardCloseTimestamp: "06-08-2024 14:49:00",
    actualSpentTime: "00:47:00"
  },
  {
    id: 7,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "07-08-2024 13:00:00",
    dashboardOpenTimestamp:"07-08-2024 13:01:00",
    dashboardCloseTimestamp: "07-08-2024 13:45:00",
    actualSpentTime: "00:44:00"
  },
  {
    id: 8,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "08-08-2024 14:30:00",
    dashboardOpenTimestamp:"08-08-2024 14:15:00",
    dashboardCloseTimestamp: "08-08-2024 15:13:00",
    actualSpentTime: "00:58:00"
  },
  {
    id: 9,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "09-08-2024 15:00:00",
    dashboardOpenTimestamp:"09-08-2024 15:16:00",
    dashboardCloseTimestamp: "09-08-2024 16:08:00",
    actualSpentTime: "00:52:00"
  },
  {
    id: 10,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "10-08-2024 14:00:00",
    dashboardOpenTimestamp:"10-08-2024 14:05:00",
    dashboardCloseTimestamp: "10-08-2024 14:56:00",
    actualSpentTime: "00:51:00"
  },
  {
    id: 11,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    loginTimestamp: "11-08-2024 13:00:00",
    dashboardOpenTimestamp:"11-08-2024 13:02:00",
    dashboardCloseTimestamp: "11-08-2024 13:42:00",
    actualSpentTime: "00:40:00"
  },
  {
    id: 12,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "01-08-2024 13:00:00",
    dashboardOpenTimestamp:"01-08-2024 13:05:00",
    dashboardCloseTimestamp: "01-08-2024 13:45:00",
    actualSpentTime: "00:40:00"
  },
  {
    id: 13,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "02-08-2024 14:00:00",
    dashboardOpenTimestamp:"02-08-2024 14:07:00",
    dashboardCloseTimestamp: "02-08-2024 14:52:00",
    actualSpentTime: "00:45:00"
  },
  {
    id: 14,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "03-08-2024 13:00:00",
    dashboardOpenTimestamp:"03-08-2024 13:09:00",
    dashboardCloseTimestamp: "03-08-2024 13:43:00",
    actualSpentTime: "00:34:00"
  },
  {
    id: 15,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "04-08-2024 14:30:00",
    dashboardOpenTimestamp:"04-08-2024 14:12:00",
    dashboardCloseTimestamp: "04-08-2024 15:07:00",
    actualSpentTime: "00:55:00"
  },
  {
    id: 16,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "05-08-2024 15:00:00",
    dashboardOpenTimestamp:"05-08-2024 15:04:00",
    dashboardCloseTimestamp: "05-08-2024 15:52:00",
    actualSpentTime: "00:48:00"
  },
  {
    id: 17,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "06-08-2024 14:00:00",
    dashboardOpenTimestamp:"06-08-2024 14:02:00",
    dashboardCloseTimestamp: "06-08-2024 14:49:00",
    actualSpentTime: "00:47:00"
  },
  {
    id: 18,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "07-08-2024 13:00:00",
    dashboardOpenTimestamp:"07-08-2024 13:01:00",
    dashboardCloseTimestamp: "07-08-2024 13:45:00",
    actualSpentTime: "00:44:00"
  },
  {
    id: 19,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "08-08-2024 14:30:00",
    dashboardOpenTimestamp:"08-08-2024 14:15:00",
    dashboardCloseTimestamp: "08-08-2024 15:13:00",
    actualSpentTime: "00:58:00"
  },
  {
    id: 20,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "09-08-2024 15:00:00",
    dashboardOpenTimestamp:"09-08-2024 15:16:00",
    dashboardCloseTimestamp: "09-08-2024 16:08:00",
    actualSpentTime: "00:52:00"
  },
  {
    id: 21,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "10-08-2024 14:00:00",
    dashboardOpenTimestamp:"10-08-2024 14:05:00",
    dashboardCloseTimestamp: "10-08-2024 14:56:00",
    actualSpentTime: "00:51:00"
  },
  {
    id: 22,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    loginTimestamp: "11-08-2024 13:00:00",
    dashboardOpenTimestamp:"11-08-2024 13:02:00",
    dashboardCloseTimestamp: "11-08-2024 13:42:00",
    actualSpentTime: "00:40:00"
  },
  {
    id: 23,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "01-08-2024 13:00:00",
    dashboardOpenTimestamp:"01-08-2024 13:05:00",
    dashboardCloseTimestamp: "01-08-2024 13:45:00",
    actualSpentTime: "00:40:00"
  },
  {
    id: 24,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "02-08-2024 14:00:00",
    dashboardOpenTimestamp:"02-08-2024 14:07:00",
    dashboardCloseTimestamp: "02-08-2024 14:52:00",
    actualSpentTime: "00:45:00"
  },
  {
    id: 25,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "03-08-2024 13:00:00",
    dashboardOpenTimestamp:"03-08-2024 13:09:00",
    dashboardCloseTimestamp: "03-08-2024 13:43:00",
    actualSpentTime: "00:34:00"
  },
  {
    id: 26,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "04-08-2024 14:30:00",
    dashboardOpenTimestamp:"04-08-2024 14:12:00",
    dashboardCloseTimestamp: "04-08-2024 15:07:00",
    actualSpentTime: "00:55:00"
  },
  {
    id: 27,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "05-08-2024 15:00:00",
    dashboardOpenTimestamp:"05-08-2024 15:04:00",
    dashboardCloseTimestamp: "05-08-2024 15:52:00",
    actualSpentTime: "00:48:00"
  },
  {
    id: 28,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "06-08-2024 14:00:00",
    dashboardOpenTimestamp:"06-08-2024 14:02:00",
    dashboardCloseTimestamp: "06-08-2024 14:49:00",
    actualSpentTime: "00:47:00"
  },
  {
    id: 29,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "07-08-2024 13:00:00",
    dashboardOpenTimestamp:"07-08-2024 13:01:00",
    dashboardCloseTimestamp: "07-08-2024 13:45:00",
    actualSpentTime: "00:44:00"
  },
  {
    id: 30,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "08-08-2024 14:30:00",
    dashboardOpenTimestamp:"08-08-2024 14:15:00",
    dashboardCloseTimestamp: "08-08-2024 15:13:00",
    actualSpentTime: "00:58:00"
  },
  {
    id: 31,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "09-08-2024 15:00:00",
    dashboardOpenTimestamp:"09-08-2024 15:16:00",
    dashboardCloseTimestamp: "09-08-2024 16:08:00",
    actualSpentTime: "00:52:00"
  },
  {
    id: 32,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "10-08-2024 14:00:00",
    dashboardOpenTimestamp:"10-08-2024 14:05:00",
    dashboardCloseTimestamp: "10-08-2024 14:56:00",
    actualSpentTime: "00:51:00"
  },
  {
    id: 33,
    userName: "Rajesh",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    loginTimestamp: "11-08-2024 13:00:00",
    dashboardOpenTimestamp:"11-08-2024 13:02:00",
    dashboardCloseTimestamp: "11-08-2024 13:42:00",
    actualSpentTime: "00:40:00"
  },
  {
    id: 34,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "01-08-2024 13:00:00",
    dashboardOpenTimestamp:"01-08-2024 13:05:00",
    dashboardCloseTimestamp: "01-08-2024 13:45:00",
    actualSpentTime: "00:40:00"
  },
  {
    id: 35,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "02-08-2024 14:00:00",
    dashboardOpenTimestamp:"02-08-2024 14:07:00",
    dashboardCloseTimestamp: "02-08-2024 14:52:00",
    actualSpentTime: "00:45:00"
  },
  {
    id: 36,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "03-08-2024 13:00:00",
    dashboardOpenTimestamp:"03-08-2024 13:09:00",
    dashboardCloseTimestamp: "03-08-2024 13:43:00",
    actualSpentTime: "00:34:00"
  },
  {
    id: 37,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "04-08-2024 14:30:00",
    dashboardOpenTimestamp:"04-08-2024 14:12:00",
    dashboardCloseTimestamp: "04-08-2024 15:07:00",
    actualSpentTime: "00:55:00"
  },
  {
    id: 38,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "05-08-2024 15:00:00",
    dashboardOpenTimestamp:"05-08-2024 15:04:00",
    dashboardCloseTimestamp: "05-08-2024 15:52:00",
    actualSpentTime: "00:48:00"
  },
  {
    id: 39,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "06-08-2024 14:00:00",
    dashboardOpenTimestamp:"06-08-2024 14:02:00",
    dashboardCloseTimestamp: "06-08-2024 14:49:00",
    actualSpentTime: "00:47:00"
  },
  {
    id: 40,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "07-08-2024 13:00:00",
    dashboardOpenTimestamp:"07-08-2024 13:01:00",
    dashboardCloseTimestamp: "07-08-2024 13:45:00",
    actualSpentTime: "00:44:00"
  },
  {
    id: 41,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "08-08-2024 14:30:00",
    dashboardOpenTimestamp:"08-08-2024 14:15:00",
    dashboardCloseTimestamp: "08-08-2024 15:13:00",
    actualSpentTime: "00:58:00"
  },
  {
    id: 42,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "09-08-2024 15:00:00",
    dashboardOpenTimestamp:"09-08-2024 15:16:00",
    dashboardCloseTimestamp: "09-08-2024 16:08:00",
    actualSpentTime: "00:52:00"
  },
  {
    id: 43,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "10-08-2024 14:00:00",
    dashboardOpenTimestamp:"10-08-2024 14:05:00",
    dashboardCloseTimestamp: "10-08-2024 14:56:00",
    actualSpentTime: "00:51:00"
  },
  {
    id: 44,
    userName: "Pankaj",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    loginTimestamp: "11-08-2024 13:00:00",
    dashboardOpenTimestamp:"11-08-2024 13:02:00",
    dashboardCloseTimestamp: "11-08-2024 13:42:00",
    actualSpentTime: "00:40:00"
  },
  
];
const toolsStatisticsData = [

  {
    id: 1,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 01-08-2024 08:00:00",
    responseRecievedTimestamp: "01-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb12457-mnblkj4a",
    transactionId: 12
  },
  {
    id: 2,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 02-08-2024 08:00:00",
    responseRecievedTimestamp: "02-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb12580-mnblkj6a",
    transactionId: 14
  },
  {
    id: 3,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 03-08-2024 08:00:00",
    responseRecievedTimestamp: "03-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb12703-mnblkj8a",
    transactionId: 16
  },
  {
    id: 4,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 04-08-2024 08:00:00",
    responseRecievedTimestamp: "04-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb12826-mnblkj1a",
    transactionId: 19
  },
  {
    id: 5,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 05-08-2024 08:00:00",
    responseRecievedTimestamp: "05-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb12949-mnblkj3a",
    transactionId: 21
  },
  {
    id: 6,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 06-08-2024 08:00:00",
    responseRecievedTimestamp: "06-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb13072-mnblkj5a",
    transactionId: 23
  },
  {
    id: 7,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 07-08-2024 08:00:00",
    responseRecievedTimestamp: "07-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb13195-mnblkj7a",
    transactionId: 36
  },
  {
    id: 8,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 08-08-2024 08:00:00",
    responseRecievedTimestamp: "08-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb13318-mnblkj9a",
    transactionId: 37
  },
  {
    id: 9,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 09-08-2024 08:00:00",
    responseRecievedTimestamp: "09-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb13441-mnblkj1a",
    transactionId: 43
  },
  {
    id: 10,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 10-08-2024 08:00:00",
    responseRecievedTimestamp: "10-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb13564-mnblkj3a",
    transactionId: 32
  },
  {
    id: 11,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 11-08-2024 08:00:00",
    responseRecievedTimestamp: "11-08-2024 08:04:00",
    processingTime: "00:04:00",
    processingInstanceId: "asdfzxcvb13687-mnblkj5a",
    transactionId: 34
  },
  {
    id: 12,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 01-08-2024 09:00:00",
    responseRecievedTimestamp: "01-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13810-mnblkj7a",
    transactionId: 39
  },
  {
    id: 13,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 02-08-2024 09:00:00",
    responseRecievedTimestamp: "02-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13933-mnblkj9a",
    transactionId: 41
  },
  {
    id: 14,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 03-08-2024 09:00:00",
    responseRecievedTimestamp: "03-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14056-mnblkj1a",
    transactionId: 56
  },
  {
    id: 15,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 04-08-2024 09:00:00",
    responseRecievedTimestamp: "04-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14179-mnblkj3a",
    transactionId: 57
  },
  {
    id: 16,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 05-08-2024 09:00:00",
    responseRecievedTimestamp: "05-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14302-mnblkj5a",
    transactionId: 63
  },
  {
    id: 17,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 06-08-2024 09:00:00",
    responseRecievedTimestamp: "06-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14425-mnblkj7a",
    transactionId: 52
  },
  {
    id: 18,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 07-08-2024 09:00:00",
    responseRecievedTimestamp: "07-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14548-mnblkj9a",
    transactionId: 54
  },
  {
    id: 19,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 08-08-2024 09:00:00",
    responseRecievedTimestamp: "08-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14671-mnblkj1a",
    transactionId: 59
  },
  {
    id: 20,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 09-08-2024 09:00:00",
    responseRecievedTimestamp: "09-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14794-mnblkj3a",
    transactionId: 61
  },
  {
    id: 21,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 10-08-2024 09:00:00",
    responseRecievedTimestamp: "10-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb14917-mnblkj5a",
    transactionId: 76
  },
  {
    id: 22,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "PCI Anomaly",
    onExecuteTimestamp:" 11-08-2024 09:00:00",
    responseRecievedTimestamp: "11-08-2024 09:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb15040-mnblkj7a",
    transactionId: 77
  },
  {
    id: 23,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 01-08-2024 08:00:00",
    responseRecievedTimestamp: "01-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb12457-mnblkj4a",
    transactionId: 12
  },
  {
    id: 24,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 02-08-2024 08:00:00",
    responseRecievedTimestamp: "02-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb12580-mnblkj6a",
    transactionId: 14
  },
  {
    id: 25,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 03-08-2024 08:00:00",
    responseRecievedTimestamp: "03-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb12703-mnblkj8a",
    transactionId: 16
  },
  {
    id: 26,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 04-08-2024 08:00:00",
    responseRecievedTimestamp: "04-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb12826-mnblkj1a",
    transactionId: 19
  },
  {
    id: 27,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 05-08-2024 08:00:00",
    responseRecievedTimestamp: "05-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb12949-mnblkj3a",
    transactionId: 21
  },
  {
    id: 28,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 06-08-2024 08:00:00",
    responseRecievedTimestamp: "06-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13072-mnblkj5a",
    transactionId: 23
  },
  {
    id: 29,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 07-08-2024 08:00:00",
    responseRecievedTimestamp: "07-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13195-mnblkj7a",
    transactionId: 36
  },
  {
    id: 30,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 08-08-2024 08:00:00",
    responseRecievedTimestamp: "08-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13318-mnblkj9a",
    transactionId: 37
  },
  {
    id: 31,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 09-08-2024 08:00:00",
    responseRecievedTimestamp: "09-08-2024 08:04:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13441-mnblkj1a",
    transactionId: 43
  },
  {
    id: 32,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 10-08-2024 08:00:00",
    responseRecievedTimestamp: "10-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13564-mnblkj3a",
    transactionId: 32
  },
  {
    id: 33,
    userName: "Isha",
    client: "TMobile",
    project: "Denver",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 11-08-2024 08:00:00",
    responseRecievedTimestamp: "11-08-2024 08:06:00",
    processingTime: "00:06:00",
    processingInstanceId: "asdfzxcvb13687-mnblkj5a",
    transactionId: 34
  },
  {
    id: 34,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 01-08-2024 09:00:00",
    responseRecievedTimestamp: "01-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb13810-mnblkj7a",
    transactionId: 39
  },
  {
    id: 35,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 02-08-2024 09:00:00",
    responseRecievedTimestamp: "02-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb13933-mnblkj9a",
    transactionId: 41
  },
  {
    id: 36,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 03-08-2024 09:00:00",
    responseRecievedTimestamp: "03-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14056-mnblkj1a",
    transactionId: 56
  },
  {
    id: 37,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 04-08-2024 09:00:00",
    responseRecievedTimestamp: "04-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14179-mnblkj3a",
    transactionId: 57
  },
  {
    id: 38,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 05-08-2024 09:00:00",
    responseRecievedTimestamp: "05-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14302-mnblkj5a",
    transactionId: 63
  },
  {
    id: 39,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 06-08-2024 09:00:00",
    responseRecievedTimestamp: "06-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14425-mnblkj7a",
    transactionId: 52
  },
  {
    id: 40,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 07-08-2024 09:00:00",
    responseRecievedTimestamp: "07-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14548-mnblkj9a",
    transactionId: 54
  },
  {
    id: 41,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 08-08-2024 09:00:00",
    responseRecievedTimestamp: "08-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14671-mnblkj1a",
    transactionId: 59
  },
  {
    id: 42,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 09-08-2024 09:00:00",
    responseRecievedTimestamp: "09-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14794-mnblkj3a",
    transactionId: 61
  },
  {
    id: 43,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 10-08-2024 09:00:00",
    responseRecievedTimestamp: "10-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb14917-mnblkj5a",
    transactionId: 76
  },
  {
    id: 44,
    userName: "Moulya",
    client: "ATnT",
    project: "Detroit",
    toolName: "RSI Anomaly",
    onExecuteTimestamp:" 11-08-2024 09:00:00",
    responseRecievedTimestamp: "11-08-2024 09:08:00",
    processingTime: "00:08:00",
    processingInstanceId: "asdfzxcvb15040-mnblkj7a",
    transactionId: 77
  },
];


function Statistics() {
  const [currentTabIndex, setCurrentTabIndex] = useState(0);
  const [currentData, setCurrentData] = useState([]);
  useEffect(() => {
    if (currentTabIndex === 0) {
      setCurrentData(userStatisticsData); 
    } else if (currentTabIndex === 1) {
      setCurrentData(toolsStatisticsData); 
    }
  }, [currentTabIndex]);

  const handleExport = () => {
    XLSXDownload(currentData, currentTabIndex === 0 ? 'userstatistics' : 'toolstatistics');
  };

  const handleTabChange = (e, tabIndex) => {
    setCurrentTabIndex(tabIndex);
  };

  return (
    <div className="userStyle">
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
                        hover={{
                          backgroundColor: "#545e99",
                          color: "#fff"
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
              

              {currentTabIndex === 0 && (
                <Box sx={{ p: 3,}} >
                  <UserStatistics  data = {userStatisticsData}/>
                </Box>
              )}

              {currentTabIndex === 1 && (
                <Box sx={{ p: 3 }}>
                  <ToolsStatistics data = {toolsStatisticsData}/>
                </Box>
              )}
            </>
          </Grid>
        </Grid>
    </div>
  );
}

export default Statistics;