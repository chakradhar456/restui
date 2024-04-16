import React, { useRef, useState,useContext } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import ExcelDataForm from "./ExcelDataForm";
import IsLogin from "../Context/IsLogin";


const Card = (props) => {

const OnSelectDrop=(obj)=>{}
  const [selectedOption, setSelectedOption] = useState(null);
  const isLoginContext = useContext(IsLogin);
  const handleSelect = (option) => {
    setSelectedOption(option);
  };

  const  handleChange=(e)=> {
    this.setState({obj: this.allUserData.listOption[e.target.value].obj})
  }

  
    // Function to handle selected row data from ExcelDataForm
    const handleSelectedRow = (selectedRowData) => {
      setUserData({
        pbId: selectedRowData[0] || "",
        userName: selectedRowData[1] || "",
        designation: selectedRowData[2] || "",
        division: selectedRowData[3] || "",
        phoneNo: selectedRowData[4] || "",
        programCode: selectedRowData[5] || "",
        // rfId: selectedRowData[6] || "",
        isValid: true,
      });
    };
  const [allUserData, setallUserData] = useState([{
    pbId: "46115-temp",
    userName: "shubrajeet",
    designation: "MT",
    division: "CO",
    phoneNo: "0988777",
    programCode: "pg1",
    rfId: "",
    isValid:true,
  },{
    pbId: "46119-temp",
    userName: "chakra",
    designation: "MT",
    division: "CO",
    phoneNo: "766767",
    programCode: "pg1",
    rfId: "",
    isValid:true,
  },{
    pbId: "46125-temp",
    userName: "nishi",
    designation: "MT",
    division: "CO",
    phoneNo: "678678",
    programCode: "pg2",
    rfId: "",
    isValid:true,
  },{
    pbId: "46174-temp",
    userName: "vikash",
    designation: "MT",
    division: "CO",
    phoneNo: "346364",
    programCode: "pg2",
    rfId: "",
    isValid:true,
  },{
    pbId: "46117-temp",
    userName: "chirag",
    designation: "MT",
    division: "HELI",
    phoneNo: "768687",
    programCode: "pg3",
    rfId: "",
    isValid:true,
  }]);
  const [userData, setUserData] = useState({
    pbId: "",
    userName: "",
    designation: "",
    division: "",
    phoneNo: "",
    programCode: "",
    rfId: "",
    isValid:true,
  });
  const [userSelectedData, setUserSelectedData] = useState({
    pbId: "",
    userName: "",
    designation: "",
    division: "",
    phoneNo: "",
    programCode: "",
    rfId: "",
    isValid:true,
  });
  const userInputHandler = (e) => {
    const myKey = e.target.name;
    const myValue = e.target.value;

    setUserData({ ...userData, [myKey]: myValue });
  };
  const [addUser, setAddUser] = useState(false);
  const [firstTime, setFirstTime] = useState(false);
  const registerUser = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://"+isLoginContext.ipAddress+":8090/hal-hma-attendance/addemployee",
        {
          name: userData.userName,
          pbId: userData.pbId,
          designation: userData.designation,
          division: userData.division,
          phoneNo: userData.phoneNo,
          programCode: userData.programCode,
          reffId: userData.rfId,
          valid:userData.isValid
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        setallUserData([...allUserData, userData]);
        setUserData({
          pbId: "",
          userName: "",
          designation: "",
          division: "",
          phoneNo: "",
          programCode: "",
          rfId: "",
          isValid:true,
        });
        setFirstTime(true);
        setAddUser(res.data);
      });
      const defaultOption = allUserData[0];
  };
  const pbFiledSelected =(e)=>{
    console.log("pb    "+e.target.value)
    let i;
    for(i= 0; i<isLoginContext.xlFileData.length; i++){
      if(e.target.value == isLoginContext.xlFileData[i][0]){
        setUserData({pbId:isLoginContext.xlFileData[i][0],
        userName:isLoginContext.xlFileData[i][1],
        designation:isLoginContext.xlFileData[i][2],
        division:isLoginContext.xlFileData[i][3],
        phoneNo:isLoginContext.xlFileData[i][4],
        programCode:isLoginContext.xlFileData[i][5],
        rfId: "",
        isValid:true,
      })
      document.getElementById("rfId").focus();
   
     
         
      break
      }
      
    }
    if(i==isLoginContext.xlFileData.length){
      setUserData({pbId:e.target.value,
        userName:"",
        designation:"",
        division:"",
        phoneNo:"",
        programCode:"",
        rfId: "",
        isValid:true,
      })
    }
    console.log(isLoginContext.xlFileData)
  }
  return (<div>{false ? 
  
  
  









    <div>
    <div class="tejas1">
    <div class="container">
      <div class="cardBorder">
        <label htmlFor="pbId" style={{ color: "white" }}>
          Pb ID
        </label>
        <br />


        <select onChange={(e)=> {
    setUserSelectedData(allUserData[e.target.value])
  }}>
     {allUserData.map((option, index) =>
       <option key={index} value={index}>
        {option.pbId}
       </option>
      )}
    </select>




























        
        <input
          class="inputField"
          required
          id="pbId"
          type="text"
          name="pbId"
          value={userSelectedData.pbId}
          onChange={userInputHandler}
        />
        <label htmlFor="userName" style={{ color: "white" }}>
          Name
        </label>
        <br />
        <input
          class="inputField"
          required
          id="userName"
          type="text"
          name="userName"
          value={userSelectedData.userName}
          onChange={userInputHandler}

        />
        <label htmlFor="designation" style={{ color: "white" }}>
          Designation
        </label>
        <br />
        <input
          class="inputField"
          required
          id="designation"
          type="text"
          name="designation"
          value={userSelectedData.designation}
          onChange={userInputHandler}
        />
        <label htmlFor="division" style={{ color: "white" }}>
          Division
        </label>
        <br />
        <input
          class="inputField"
          required
          id="division"
          type="text"
          name="division"
          value={userSelectedData.division}
          onChange={userInputHandler}
        />
        <label htmlFor="phoneNo" style={{ color: "white" }}>
          Phone No
        </label>
        <br />
        <input
          class="inputField"
          required
          id="phoneNo"
          type="text"
          name="phoneNo"
          value={userSelectedData.phoneNo}
          onChange={userInputHandler}
        />
        <label htmlFor="programCode" style={{ color: "white" }}>
          Program code
        </label>
        <br />
        <input
          class="inputField"
          required
          id="programCode"
          type="text"
          name="programCode"
          value={userSelectedData.programCode}
          onChange={userInputHandler}
        />
        <label htmlFor="rfId" style={{ color: "white" }}>
          Ref ID
        </label>
        <br />
        <input
          class="inputField"
          required
          id="rfId"
          type="text"
          name="rfId"
          value={userSelectedData.rfId}
          onChange={userInputHandler}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              registerUser(e);
            }
          }}
        />
      </div>
      <br />
      <div>
        {firstTime ? (
          addUser ? (
            <Alert severity="success">User registered successfully.</Alert>
          ) : (
            <Alert severity="error">User not registered.</Alert>
          )
        ) : (
          ""
        )}
      </div>
    </div>
    </div>
    </div>










  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  
  :  <div>
  <div class="tejas1">
  <div class="container">
    <div class="cardBorder">
    <ExcelDataForm onSelectRow={handleSelectedRow} />
      <label htmlFor="pbId" style={{ color: "black" }}>
        Pb ID
      </label>
      <br />
      <input
        class="inputField"
        required
        id="pbId"
        type="text"
        name="pbId"
        value={userData.pbId}
        onChange={userInputHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            pbFiledSelected(e);
          }
        }}
      />
      <label htmlFor="userName" style={{ color: "black" }}>
        Name
      </label>
      <br />
      <input
        class="inputField"
        required
        id="userName"
        type="text"
        name="userName"
        value={userData.userName}
        onChange={userInputHandler}

      />
      <label htmlFor="designation" style={{ color: "black" }}>
        Designation
      </label>
      <br />
      <input
        class="inputField"
        required
        id="designation"
        type="text"
        name="designation"
        value={userData.designation}
        onChange={userInputHandler}
      />
      <label htmlFor="division" style={{ color: "black" }}>
        Division
      </label>
      <br />
      <input
        class="inputField"
        required
        id="division"
        type="text"
        name="division"
        value={userData.division}
        onChange={userInputHandler}
      />
      <label htmlFor="phoneNo" style={{ color: "black" }}>
        Phone No
      </label>
      <br />
      <input
        class="inputField"
        required
        id="phoneNo"
        type="text"
        name="phoneNo"
        value={userData.phoneNo}
        onChange={userInputHandler}
      />
      <label htmlFor="programCode" style={{ color: "black" }}>
        Program code
      </label>
      <br />
      <input
        class="inputField"
        required
        id="programCode"
        type="text"
        name="programCode"
        value={userData.programCode}
        onChange={userInputHandler}
      />
      <label htmlFor="rfId" style={{ color: "black" }}>
        Ref ID
      </label>
      <br />
      <input
        class="inputField"
        required
        id="rfId"
        type="text"
        name="rfId"
        placeholder="PLEASE SCAN YOUR RFID HERE"
        
        value={userData.rfId}
        onChange={userInputHandler}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            registerUser(e);
          }
        }}
      />
    </div>
    <br />
    <div>
      {firstTime ? (
        addUser ? (
          <Alert severity="success">User registered successfully.</Alert>
        ) : (
          <Alert severity="error">User not registered.</Alert>
        )
      ) : (
        ""
      )}
    </div>
  </div>
  </div>
  </div>}</div>
   
  );
};

export default Card;
