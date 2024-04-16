import React, { useRef, useState } from "react";
import UserRegistration from "./UserRegister";

const Chirag = () => {
    const myRef = useRef(null);
  
    const [usersData, setUsersData] = useState([]);
    const [userData, setUserData] = useState({ userName: "", password: "" });
    const [loginStatus, setLoginStatus] = useState(false);
    const here = (e) => {
      e.preventDefault();
      if (
        userData.userName === loginData[0].userName &&
        userData.password === loginData[0].password
      ) {
        setUsersData([...usersData, userData]);
        console.log("success");
        setLoginStatus(true);
      } else {
        console.log("invalid");
      }
    };
    const userInputHandler = (e) => {
      const myKey = e.target.name;
      const myValue = e.target.value;
      console.log({ ...userData, [myKey]: myValue });
      setUserData({ ...userData, [myKey]: myValue });
    };
    return (
      <React.Fragment>
        {!loginStatus ? (
          <div class="container ">
            <div class="cardBorder">
              <form ref={myRef} onSubmit={here}>
                <label htmlFor="userName">User Name</label>
                <br />
                <input
                  class="inputField"
                  required
                  id="userName"
                  type="email"
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
                  value="login"
                />
              </form>
            </div>
          </div>
        ) : (
          <UserRegistration userName={userData.userName} />
        )}
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
  export default Chirag;
  