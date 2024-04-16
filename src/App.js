import "./App.css";
import Loginpage from "./Components/Loginpage";
import NavScrollExample from "./Components/Header";
import ClassRoom from "./Components/ClassRoom";
import Chirag from "./Components/Chirag";
import Header from "./Components/Header";
import UserRegistration from "./Components/UserRegister";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SearchState from "./Context/SearchState";
import SignUpPage from "./Components/SignUppage";

function App() {
  return (
    <div class="main">
      <Router>
        <SearchState>
        <div>
           < Header/>
        </div>
        <Routes>
          <Route path="/SignUp" element={<SignUpPage/>} />
        </Routes>
       <Routes>
          <Route path="/" element={<Loginpage />} />
        </Routes>
        {/* <Routes>
          <Route path="/registration" element={<UserRegistration />} />
        </Routes> */}
        <Routes>
          <Route path="/classroom" element={<ClassRoom />} />
        </Routes>
        </SearchState>
      </Router>
    </div>
  );
}

export default App;
