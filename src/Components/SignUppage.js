import React, { useRef, useState, useContext } from "react";
import UserRegistration from "./UserRegister";
import axios from "axios";
import Alert from "@mui/material/Alert";
import hallogo from "../logo/HAL-logo.jpg";
import IsLogin from "../Context/IsLogin";

const SignUpPage = () => {
  const myRef = useRef(null);
  const isLoginContext = useContext(IsLogin);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState({
    Pb_Id: "",
    password: "",
    usserRole: "",
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const here = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://"+isLoginContext.ipAddress+":8090/hal-hma-attendance/signUp",
        {
          pbId: userData.Pb_Id,
          password: userData.password,
          role: userData.usserRole,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )

      .then((res) => {
        if (res.data) {
          setTimeout(() => {
            setLoginStatus(false);
          }, 3000);
          setLoginStatus(true);
           
        } else {
          setLoginStatus(false);
        }
        setUserData({
          Pb_Id: "",
          password: "",
          usserRole: "",
        });
      });
  };
  const userInputHandler = (e) => {
    const myKey = e.target.name;
    const myValue = e.target.value;
    console.log({ ...userData, [myKey]: myValue });
    setUserData({ ...userData, [myKey]: myValue });
  };
  return (
    <React.Fragment>
      {true ? (
        <div className="signup">
        <div class="container ">
        <div style={{marginBottom:"-172px"}}><img src={hallogo} alt="Logo" style={{ height: "21vh" }} /></div>
          <div class="cardBorder">
            <form ref={myRef} onSubmit={here}>
              <label htmlFor="Pb_Id">Pb Id</label>
              <br />
              <input
                class="inputField"
                required
                id="Pb_Id"
                type="text"
                name="Pb_Id"
                value={userData.Pb_Id}
                onChange={userInputHandler}
              />
              <br />
              <label htmlFor="usserPassword">Password</label>
              <br />
              <input
                class="inputField"
                required
                id="usserPassword"
                type="password"
                name="password"
                value={userData.password}
                onChange={userInputHandler}
              />
              <br />
              <label htmlFor="usserRole">Role</label>
              <br />
              <input
                class="inputField"
                required
                id="usserRole"
                type="text"
                name="usserRole"
                value={userData.usserRole}
                onChange={userInputHandler}
              />
              
              <br />
              <input
                class="loginbutton basicbutton"
                type="submit"
                value="Sign Up"
              />
            </form>
            {loginStatus ? (
        <Alert severity="success">{userData.Pb_Id} Register successfully</Alert>
      ) :""}
          </div>
        </div>
        </div>
      ) : (
        <UserRegistration userName={userData.userName} />
      )}
     
      {console.log(userData)}
    </React.Fragment>
  );
};

export default SignUpPage;
