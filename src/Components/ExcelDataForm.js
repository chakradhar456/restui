import React, { useState,useContext } from "react";
import * as XLSX from "xlsx";
import IsLogin from "../Context/IsLogin";

function ExcelDataForm({ onSelectRow }) {
  const isLoginContext = useContext(IsLogin);
  const [data, setData] = useState([]); // Store the parsed Excel data
  const [selectedRow, setSelectedRow] = useState(null); // Track selected row
  let file = null;
  const handleFileChange = (e) => {
    file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const wb = XLSX.read(bstr, { type: "binary" });
      
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });
      const myData = [["", "", "", "", "", ""], ...jsonData];
      setData(myData);
      isLoginContext.setXlFileData(myData);

    };

    reader.readAsBinaryString(file);
  };

  const handleDropdownChange = (e) => {
    const rowIndex = e.target.value;
    setSelectedRow(data[rowIndex]);
    onSelectRow(data[rowIndex]);
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", gap: "80px" }}>
      <input className="input1" type="file" onChange={handleFileChange} />

      {data.length > 0 ? (
        <select className="input2" onChange={handleDropdownChange}>
          {data.map((row, index) => (
            <option key={index} value={index}>
              {index == 0 ? "Select Pb ID" : row[0]}
            </option>
          ))}
        </select>
      ) : (
        ""
      )}

      {selectedRow && (
        <>
          {/* <input type="text" value={selectedRow[0]} readOnly /> */}
          {/* Render other input fields based on your requirements */}
        </>
      )}
    </div>
  );
}

export default ExcelDataForm;
