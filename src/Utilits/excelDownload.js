import React from 'react';
import * as XLSX from 'xlsx';

import { saveAs } from 'file-saver';
const XLSXDownload = (data, filename) => {
  const headers = Object.keys(data[0]);
  const aoaData = [headers, ...data.map((row) => Object.values(row))];
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.aoa_to_sheet(aoaData);
  XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
  const workbookBuffer = XLSX.write(wb, {
    bookType: 'xlsx',
    type: 'array',
  });


  const blob = new Blob([new Uint8Array(workbookBuffer)], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.xlsx`;
  a.click();


};

export default XLSXDownload;