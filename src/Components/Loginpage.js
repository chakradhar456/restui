import React, { useRef, useState, useContext } from "react";
import UserRegistration from "./UserRegister";
import axios from "axios";
import IsLogin from "../Context/IsLogin";
import ClassRoom from "./ClassRoom";
import hallogo from "../logo/HAL-logo.jpg";
import Add from "../Admin/Add";

const LoginPage = () => {
  const myRef = useRef(null);
  const isLoginContext = useContext(IsLogin);
  const [usersData, setUsersData] = useState([]);
  const [userData, setUserData] = useState({
    userName: "",
    password: "",
    usserRole: "",
  });
  const [loginStatus, setLoginStatus] = useState(false);
  const here = (e) => {
    e.preventDefault();

    axios
      .post(
        "http://"+isLoginContext.ipAddress+":8090/hal-hma-attendance/signIn",
        {
          pbId: userData.userName,
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
        if (res.data != "") {
          isLoginContext.setState({
            IsLogin: true,
            userName: res.data.pbId,
            role: res.data.role,
          });
          setLoginStatus(true);
          console.log("login " + res.data);
        }
        setUserData({
          userName: "",
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
      {loginStatus && isLoginContext.state.role === 'registration' ? (
       
        <UserRegistration userName={userData.userName} />
      ) : (loginStatus && isLoginContext.state.role === 'class room' ? (
       
        <ClassRoom />
      ): (loginStatus && isLoginContext.state.role === 'admin' ?(<Add/>):
      <div className="login">
        <div class="container ">
          <div style={{marginBottom:"-150px"}}><img src={hallogo} alt="Logo" style={{ height: "25vh" }} /></div>
        <div class="cardBorder">
        
          <form ref={myRef} onSubmit={here}>
            <label htmlFor="userName">User Name</label>
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
            <input
              class="loginbutton basicbutton"
              type="submit"
              value="Sign in"
            />
          </form>
        </div>
      </div>
      </div>
      ))}
      {console.log(userData)}
    </React.Fragment>
  );
};
const loginData = [
  {
    userName: "chirag@gmail.com",
    password: "Chirag@123",
  },
];
export default LoginPage;
