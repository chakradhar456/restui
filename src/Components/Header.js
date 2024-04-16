import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import hallogo from "../logo/HAL-logo.jpg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useEffect ,useContext} from "react";
import IsLogin from "../Context/IsLogin";
import { useParams } from "react-router-dom";
import { NavLink,useLocation } from "react-router-dom";


function NavScrollExample() {
  const isLoginContext= useContext(IsLogin);
  
  const location=useLocation();
   
  
  
 
  return (
    <Navbar expand="lg" className="cement-navbar fixed-top">
      <Container fluid>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
         
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px"}}
            navbarScroll
          >
            <Nav.Link href="">
              <img src={hallogo} alt="Logo" style={{ height: "7vh" }} />
            </Nav.Link>
          </Nav>
          <Nav className="ml-auto">
           {/* {isLoginContext.state.IsLogin && isLoginContext.state.role === "registration" ?( <NavLink
            aria-current="page "
            to='/registration'
            style={{ color: "white" }}
            className="nav-link active"
            activeClassName="active-link"
             id={location.pathname==='/registration'? 'active':''}
            // onClick={()=>handlerSetActiveLink('/registration')}
           
            
          >
            Registration
          </NavLink>
          ):("")}
          */}
       {isLoginContext.state.IsLogin && isLoginContext.state.role === "classroom"?(<NavLink
           className="nav-link active"
            aria-current="page "
            to="/classroom"
            style={{ color: "white" }}
            id={location.pathname==='/classroom'? 'active':''}
            // onClick={()=>handlerSetActiveLink('/classroom')}
          >
            Class room
          </NavLink>):("")}
         
          {isLoginContext.state.IsLogin ? (""):(<NavLink
            className="nav-link active"
            aria-current="page "
            to="/" exact
            style={{ color: "white" }}
             id={location.pathname==='/'? 'active':''}
            // onClick={()=>handlerSetActiveLink('/login-logout')}
          >
            login
          </NavLink>)}
         { isLoginContext.state.IsLogin ? (""):(
          <NavLink
          className="nav-link active"
          aria-current='page'
          to="/SignUp"
          style={{color:"white"}}
          id={location.pathname==='/SignUp'? 'active':''}
          // onClick={()=>handlerSetActiveLink('/SignUp')}
          >
            Sign Up
          </NavLink>)}
          </Nav>
        <Nav>
          {isLoginContext.state.IsLogin?
         <div style={{ fontFamily: 'Arial', fontSize: '16px', fontWeight: 'bold'}}>USERNAME:{isLoginContext.state.userName}</div>:""}
          </Nav>
        </Navbar.Collapse>
       
      </Container>
    
      
        
    </Navbar>
  );
}

export default NavScrollExample;
