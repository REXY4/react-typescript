import React,{ useContext } from 'react';
import "./navbar.css";
import {Navbar, Container, Button, Image} from "react-bootstrap"
import { UserContext } from '../context/userContext';
import Logo from "../assets/img/GitHub_Logo_White.png"

function Navbars(): JSX.Element {
    const { state ,dispatch } = useContext(UserContext) as { state: any; dispatch: React.Dispatch<any> };
    const handelLogout = () =>{
        dispatch({
            type : "LOGOUT"
        });
    }
  return (
    <Navbar variant="dark" expand="lg" className="navbar-container">
      <Container>
        <Navbar.Brand href="/">
            <Image src={Logo} alt="logo" className="logo-nav"/> <span className='logo-form-input'>Jobs</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            {state.user && state.user.name} <Button onClick={handelLogout} variant="secondary">Logout</Button>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navbars;