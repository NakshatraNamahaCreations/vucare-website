import React, { useState } from "react";
import Button from "@mui/material/Button";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import WifiCalling3Icon from "@mui/icons-material/WifiCalling3";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Offcanvas from "react-bootstrap/Offcanvas";
import axios from "axios";
import { useEffect } from "react";
import { FaInstagram } from "react-icons/fa";
import { BsFacebook } from "react-icons/bs";
import { IoLogoWhatsapp } from "react-icons/io";

import Form from "react-bootstrap/Form";

import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

export default function NabarCompo() {
  const storedUserDataJSON = sessionStorage.getItem("userdata");
  const [Category, setCategory] = useState([]);
  const ReactApi = process.env.REACT_APP_API_URL;
  const ImagApi = process.env.REACT_APP_IMAGE_API_URL;
  useEffect(() => {
    getAllCategory();
  }, []);
  let userData = null;
  try {
    userData = JSON.parse(storedUserDataJSON);
  } catch (error) {
    console.error("Error parsing JSON:", error);
  }
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    sessionStorage.removeItem("userdata");
    window.location.reload("/");
  };

  const openWhatsapp = () => {
    const internationalPhoneNumber = `+${7760120037}`;
    const whatsappLink = `https://wa.me/${internationalPhoneNumber}`;
    window.open(whatsappLink, "_blank");
  };
  const getAllCategory = async () => {
    try {
      let res = await axios.get(`${ReactApi}/getcategory`);
      if (res.status === 200) {
        const firstInFirstOut = res?.data?.category?.reverse();
        setCategory(firstInFirstOut);
      }
    } catch (er) {
      // console.log(er, "err while fetching data");
    }
  };
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      {/* <Container> */}
      <Navbar.Brand href="/" className="me-auto">
        {" "}
        <img src="..\images\vucarpng.png" width={200} alt="" height={40} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          {/* <Nav.Link href="#features">Features</Nav.Link>
          <Nav.Link href="#pricing">Pricing</Nav.Link>
          <NavDropdown title="Dropdown" id="collapsible-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown> */}
          <div className="category">
            {Category?.map((ele) => {
              return <p>{ele.category}</p>;
            })}
          </div>
        </Nav>
        <Nav className="" style={{ maxHeight: "100px" }} navbarScroll>
          <Nav.Link
            href="https://www.instagram.com/vucareservices/"
            className="clrc"
          >
            {/* <FaInstagram /> */}
            <img
              className="m-auto"
              height={45}
              src="../images/icons8-instagram-windows-11-color-96.png"
              alt=""
            />
          </Nav.Link>
          <Nav.Link
            className="cursor-pointer clrc"
            href="https://www.facebook.com/vucareservices?mibextid=kFxxJD"
          >
            <img
              className="m-auto"
              height={45}
              src="../images/icons8-facebook-color-96.png"
              alt=""
            />
          </Nav.Link>
          <Nav.Link className="clrc">
            <img
              onClick={openWhatsapp}
              className="m-auto"
              height={45}
              src="../images/icons8-whatsapp-color-96.png"
              alt=""
            />
          </Nav.Link>

          <Nav.Link>
            <a href={`tel:${7760120037}`} className="text-decoration-none">
              <Button variant="outlined" size="medium">
                <span className="me-2">
                  <WifiCalling3Icon style={{ color: "skyblue" }} />
                </span>{" "}
                <span className="text-dark">+91 7760120037</span>
              </Button>
            </a>
          </Nav.Link>
          <Nav.Link>
            <a href={`tel:${7337744156}`} className="text-decoration-none">
              <Button variant="outlined" size="medium">
                <span className="me-2">
                  <WifiCalling3Icon style={{ color: "skyblue" }} />
                </span>{" "}
                <span className="text-dark">+91 7337744156 </span>
              </Button>
            </a>
          </Nav.Link>

          <Nav.Link>
            <a href={`tel:${9741317160}`} className="text-decoration-none">
              <Button variant="outlined" size="medium">
                <span className="me-2">
                  <WifiCalling3Icon style={{ color: "skyblue" }} />
                </span>{" "}
                <span className="text-dark">+91 9741317160 </span>
              </Button>
            </a>
          </Nav.Link>
          <Nav.Link>
            {userData !== null && userData !== undefined ? (
              <div className="clr fnt  " onClick={handleShow}>
                <Button
                  className="text-dark  responvm p-1"
                  variant="outlined"
                  size="medium"
                >
                  <img
                    width={30}
                    height={30}
                    src={`${ImagApi}/customer/${userData?.customerprofile}`}
                    className="me-2"
                    alt=""
                    style={{ borderRadius: "100px" }}
                  />{" "}
                  {userData.customerName}
                </Button>
              </div>
            ) : (
              <div className="clr fnt ">
                <Link to="/login">
                  <Button
                    className="text-dark responvm me-1  p-1"
                    variant="outlined"
                    size="medium"
                  >
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    className="text-dark  responvm p-1"
                    variant="outlined"
                    size="medium"
                  >
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
      {/* </Container> */}
      <Offcanvas placement="end" show={show} onHide={handleClose}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Profile</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <p>
            Name :{" "}
            {userData?.customerName &&
              userData.customerName.charAt(0).toUpperCase() +
                userData.customerName.slice(1)}
          </p>
          <p>Contact : {userData?.mainContact}</p>
        </Offcanvas.Body>
        <div>
          <p
            className="ms-2"
            onClick={handleLogout}
            style={{ cursor: "pointer" }}
          >
            Logout
          </p>
        </div>
      </Offcanvas>
    </Navbar>
  );
}
