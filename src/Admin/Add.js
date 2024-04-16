import { useEffect, useState,useContext } from "react";
import dateFormat from "dateformat";
import axios from "axios";
import UserData from "./UserData.js";
import Datepicker from "./Datepicker.js";
import './Add.css';
import  TickPlacementBars from "../Components/TickPlacementBars.js"
import SimpleCharts from "../Components/SimpleCharts.js"
// import SearchBar from "./components/SearchBar.jsx";
// import SearchBar2 from "./components/SearchBar2.jsx";
import ExportToExcelButton from "./ExportToExcelButton.js";
import { PieChart } from "@mui/x-charts/PieChart";
import IsLogin from "../Context/IsLogin";


const Add = () => {
  const [userData,setUserData] = useState({
    programCode: "",
    pbId: "",
    date: "",
    endDate:"",
    allData:false,
  })
  const [selectedProgramCode, setSelectedProgramCode] = useState("");
  const [selectedPbno, setSelectedPbno] = useState("");
  const [selectedDate, setSelectedDate] = useState();
  const [selectedendDate, setSelectedendDate] = useState();
  const [isFirstTime, setIsFirstTime] = useState(true);
  
  const [data, setData] = useState([
    { session: "", value: 34 },
    { session: "", value: 34 },
    { session: "", value: 34 },
  ]);
  const [pieData, setPieData] = useState([
    { state: "present", value: 34, color: "#008081" },
    { state: "absent", value: 34, color: "#FF0000" },
  ]);
  const isLoginContext = useContext(IsLogin);
  // const handleSelectProgramCode = (programCode) => {
  //     console.log("Program Code", programCode);
  //     setSelectedProgramCode(programCode);
  // };
  // const handleSelectPbno= (pbno) => {
  //     console.log("Pbno", pbno);
  //     setSelectedPbno(pbno);
  // };
  const handleDateChange = (newDate) => {
    // const formattedDate = newDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedDate = dateFormat(newDate, "isoDate");
    console.log("Selected Date", formattedDate);
    setSelectedDate(formattedDate);
  };
  const handleDateChange2 = (newDate) => {
    // const formattedDate = newDate.toLocaleDateString('en-GB', { year: 'numeric', month: '2-digit', day: '2-digit' });
    const formattedDate = dateFormat(newDate, "isoDate");
    console.log("Selected Datererettet", formattedDate);
    setSelectedendDate(formattedDate);
  };
  const [users, setUsers] = useState([]);

  const fetchData = () => {
    here1()
    here()
    axios
      .post(
        "http://"+isLoginContext.ipAddress+":8090/hal-hma-attendance/getDataByFilter",
        {
          pbId: userData.pbId,
          // date:formattedDate2,
          date: selectedDate,
          endDate:selectedendDate,
          programCode: userData.programCode,
          allData: isChecked,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        console.log("Response data", res.data);
        setUsers(res.data);
        setSelectedProgramCode("");
        setSelectedPbno("");
        setSelectedDate("");
        setcurrent(1);
        
      });
  };

  const [currentpage,setcurrent]=useState(1);
    const rowsperpage=5;
    const totalPages = Math.ceil(users.length / rowsperpage);
    const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

    const handlePageChange = (page) => {
        setcurrent(page);
        
    };
    const slicedData = users.slice(
        (currentpage - 1) * rowsperpage,
        currentpage * rowsperpage
    );
  const handleClick = (e) => {
 
    // setIsFirstTime(false);
    const inputValue = document.getElementById("searchbar2").value;
    const inputValue2 = document.getElementById("searchbar").value;
    fetchData();


  };

  const here1 = () => {
    axios
      .post(
        "http://"+isLoginContext.ipAddress+":8090/hal-hma-attendance/getBarGraphDataByFilter",
        {
          pbId: userData.pbId,
          date: selectedDate,
          endDate:selectedendDate,
          programCode: userData.programCode,
          allData: isChecked,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        if (res != null) {
          console.log("login " + res.data);
          setData(res.data);
        }
      });
  };
  const here = () => {
    axios
      .post(
        "http://"+isLoginContext.ipAddress+":8090/hal-hma-attendance/getPieGraphDataByFilter",
        {
          pbId: userData.pbId,
          date: selectedDate,
          endDate:selectedendDate,
          programCode: userData.programCode,
          allData: isChecked,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        if (res != null) {
          console.log("login " + res.data);
          setPieData([
            { state: "present", value: res.data.present, color: "#008081" },
            { state: "absent", value: res.data.absent, color: "#DC143C" },
          ]);
        }
      });
  };
  const userInputHandler = (e) => {
    const myKey = e.target.name;
    const myValue = e.target.value;
    
    setUserData({...userData,[myKey]: myValue });
  };
  // Call the fetchData function whenever necessary

  return (
    <div className="App">
      {/* <h1 className="headstyling">ADMIN SCREEN</h1> */}
    
   
   
      <div className="row3">
       
       <TickPlacementBars values={data} maximumStrength={'Strength(Max:'+(pieData[0].value+pieData[1].value)+')'}/>
       
       <div className="vertical-line"></div>
       <div className="right-div"><SimpleCharts values={pieData} /></div>
       </div>
      
     <hr className="strobe"/>
      {/* <div className="row2">
        <label1 htmlFor="searchbar2" className="label-style">
          Select Program Code:
        </label1>
        <input type="text" id="searchbar2" className="input-field" />
      </div> */}
      <div className="row1">
      <div className="row2">
        <label1 htmlFor="searchbar2" className="label-style">
          Select Program Code:
        </label1>
        <input type="text" id="searchbar2" className="input-field" name = "programCode" value={userData.programCode}
                onChange={userInputHandler} />
      </div>
        <div className="row2">
          <label1 htmlFor="datepicker" className="label-style">
            Select Date:
          </label1>
          <Datepicker id="datepicker" onDateChange={handleDateChange} />
          <p className="para">to</p>
          <Datepicker id="datepicker2" onDateChange={handleDateChange2} />
        </div>
        <div className="row2">
          <label1 htmlFor="searchbar" className="label-style">
            Select Pbno:
          </label1>
          {/* <SearchBar id="searchbar" onSelectPbno={handleSelectPbno} /> */}
          <input type="text" id="searchbar" className="input-field" name = "pbId" value={userData.pbId}
                onChange={userInputHandler} />
        </div>
        <div  className="row2" id="custom-checkbox">
        <label1 >
        <input
        //  className="custom-checkbox"
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
        />
       Entire Data
      </label1>
      </div>
      </div>
      <br/>
      <button onClick={handleClick} className="fetch-button">
        Fetch Data
      </button>
      {/* {!isFirstTime&&( */}
      <hr className="strobe"/>
        <>
       
          <table>
            <thead>
              <tr>
                <th>PB No.</th>
                <th>Name</th>
                <th>Designation</th>
                <th>Division</th>
                <th>Time</th>
                <th>Date</th>
                <th>punch slot</th>
              </tr>
            </thead>
            <tbody>
              <UserData users={slicedData} programC={userData.programCode} />
            </tbody>
          </table>
          <div>
                                  <button
                                  onClick={() => handlePageChange(currentpage - 1)}
                                  disabled={currentpage === 1}
                                  style={{
                                      backgroundColor: "#02b2af",
                                      color: "#ffffff",
                                      border: "none",
                                      padding: "0.5rem",
                                      fontSize: "16px",
                                      cursor: "pointer",
                                      borderRadius: "5px",
                                      transition: "background-color 0.3s ease",
                                    }}
                              >
                                  Previous
                              </button>
                              <button
                                  onClick={() => handlePageChange(currentpage + 1)}
                                  disabled={currentpage === totalPages}
                                  style={{
                                      backgroundColor: "#02b2af",
                                      color: "#ffffff",
                                      border: "none",
                                      padding: "0.5rem 1.5rem",
                                      fontSize: "16px",
                                      cursor: "pointer",
                                      borderRadius: "5px",
                                      marginLeft: "1rem",
                                      transition: "background-color 0.3s ease",
                                    }}
                              >
                                  Next
                              </button>
                              </div>
          <ExportToExcelButton data={users} fileName="example.csv" />
        </>
      
    </div>
  );
};

export default Add;
