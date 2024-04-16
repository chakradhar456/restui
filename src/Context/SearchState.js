import { useState } from "react";
import IsLogin from "./IsLogin";

const SearchState = (props) => {
  const [state, setState] = useState({
    IsLogin: false,
    userName: "",
    role: "",
  });
  const [rerender, setRerender] = useState(false);
  const [likedData, setLikedData] = useState([]);
  const ipAddress='192.168.1.150';
  const [xlFileData, setXlFileData] = useState([]);
  return (
    <IsLogin.Provider
      value={{
        state,
        setState,
        rerender,
        setRerender,
        likedData,
        setLikedData,
        ipAddress,
        xlFileData,
         setXlFileData
      }}
    >
      {props.children}
    </IsLogin.Provider>
  );
};

export default SearchState;
