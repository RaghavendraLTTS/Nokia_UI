// import React from 'react';
// import * as XLSX from 'xlsx';
// import { saveAs } from 'file-saver';

// const XLSXDownload = (data, filename) => {
//   const headers = Object.keys(data[0]);
//   const aoaData = [headers, ...data.map((row) => Object.values(row))];
//   const wb = XLSX.utils.book_new();
//   const ws = XLSX.utils.aoa_to_sheet(aoaData);
//   XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
//   const workbookBuffer = XLSX.write(wb, {
//     bookType: 'xlsx',
//     type: 'array',
//   });


//   const blob = new Blob([new Uint8Array(workbookBuffer)], {
//     type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
//   });

//   const url = URL.createObjectURL(blob);
//   const a = document.createElement('a');
//   a.href = url;
//   a.download = `${filename}.xlsx`;
//   a.click();


// };

// export default XLSXDownload;


import { Workbook } from 'exceljs';

const XLSXDownload = (data, filename) => {
  const workbook = new Workbook();
  const worksheet = workbook.addWorksheet('Sheet1');

  const headers = Object.keys(data[0]);
  worksheet.addRow(headers);
  worksheet.getRow(1).fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'FFADD8E6'}, // Light blue
  };
  
  headers.forEach((header, index) => {
    if (header.toLowerCase() === 'id' || header.toLowerCase() === 'transactionid') {
      worksheet.getColumn(index + 1).width = 10;
    } else {
      worksheet.getColumn(index + 1).width = header.length > 10 ? 30 : 20;
    }
  });

  data.forEach((row) => {
    worksheet.addRow(Object.values(row));
  });

  const buffer = workbook.xlsx.writeBuffer().then((buffer) => {
    const blob = new Blob([buffer], {
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${filename}.xlsx`;
    a.click();
  });
};

export default XLSXDownload;