import DatePicker from "react-datepicker";
import './SearchBar.css';
import "react-datepicker/dist/react-datepicker.css";
import React, { useState,useEffect } from "react";
export default function Datepicker({onDateChange}) {
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    console.log("Date", date);
    if (onDateChange) {
        onDateChange(date);
    }
}, [date, onDateChange]);
  return (
    <div >
      <DatePicker
      className="input-field1"
       selected={date} onChange={(date) => setDate(date)} 
       onKeyDown={(e)=> {e.preventDefault();}}
       />
    </div>
  );
}