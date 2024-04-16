import React, { useContext, useRef, useState } from "react";
import axios from "axios";
import Alert from "@mui/material/Alert";
import { useEffect } from "react";
import IsLogin from "../Context/IsLogin";

const ClassRoom = () => {
  const [allUserData, setallUserData] = useState([]);
  const isLoginContext=useContext(IsLogin)
  const [userData, setUserData] = useState({
    pbId: "",
    userName: "",
    rfId: "",
  });
  useEffect(() => {
    // Disable scrolling when the modal is open
    document.body.style.overflow = 'hidden';

    // Clean up: re-enable scrolling when the modal is closed
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, []);
  const [addUser, setAddUser] = useState(false);
  const [addUserMsg, setAddUserMsg]=useState("")
  const [firstTime, setFirstTime] = useState(false);
  const userInputHandler = (e) => {
    const myKey = e.target.name;
    const myValue = e.target.value;

    setUserData({ ...userData, [myKey]: myValue });
  };

  const registerUser = (e) => {
    e.preventDefault();

    axios
      .post("http://"+isLoginContext.ipAddress+":8090/hal-hma-attendance/" + userData.rfId, {
        headers: {
          "Content-Type": "application/json",
        },
      })

      .then((res) => {
        setallUserData([...allUserData, userData]);
        setUserData({
          pbId: "",
          userName: "",
          rfId: "",
        });
        setFirstTime(true);
        setAddUser(res.data.flag);
        setAddUserMsg(res.data.msg)
      });
  };

  return (
    <div>
      {isLoginContext.state.IsLogin &&
      isLoginContext.state.role === "class room" ?(
        <div class="tejas">
    <div class="container">
      <p style={{ color: "white" ,fontSize:"45px"}}>PLEASE SCAN YOUR REF ID</p>
      <div class="cardBorder1">
        <label htmlFor="rfId" style={{ color: "white" }}>
          Ref ID
        </label>
        <br />
        <input
          autoFocus
          class="inputField"
          required
          id="rfId"
          type="text"
          name="rfId"
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
            <Alert severity="success"><p style={{ fontSize: '20px' }}>{addUserMsg}</p></Alert>
          ) : (
            <Alert severity="error">{addUserMsg}</Alert>
          )
        ) : (
          ""
        )}
      </div>
    </div>
    </div>
      ):("")}
    </div>
  );
};
export default ClassRoom;
