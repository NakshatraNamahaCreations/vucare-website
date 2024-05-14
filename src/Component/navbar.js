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

  const phoneNumber = "9980670037";
  const openWhatsapp = () => {
    const internationalPhoneNumber = `+${phoneNumber}`;
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
    <Navbar className="bg-body-tertiary p-2">
      <Navbar.Brand className="clr  fnt bg-white rounded-lg brd " href="/">
        <img src="..\images\vucarpng.png" width={200} alt="" height={40} />
      </Navbar.Brand>
      <Navbar.Toggle />
      <div className="category">
        {Category?.map((ele) => {
          return <p>{ele.category}</p>;
        })}
      </div>
      <Navbar.Collapse className="justify-content-end">
        <Navbar.Text>
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
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
              <a href={`tel:${phoneNumber}`} className="text-decoration-none">
                <Button variant="outlined" size="medium">
                  <span className="me-2">
                    <WifiCalling3Icon style={{ color: "skyblue" }} />
                  </span>{" "}
                  <span className="text-dark">+917760120037</span>
                </Button>
              </a>
            </Nav.Link>
            <Nav.Link>
              <a href={`tel:${phoneNumber}`} className="text-decoration-none">
                <Button variant="outlined" size="medium">
                  <span className="me-2">
                    <WifiCalling3Icon style={{ color: "skyblue" }} />
                  </span>{" "}
                  <span className="text-dark">+917337744156 </span>
                </Button>
              </a>
            </Nav.Link>
            <Nav.Link>
              <a href={`tel:${phoneNumber}`} className="text-decoration-none">
                <Button variant="outlined" size="medium">
                  <span className="me-2">
                    <WifiCalling3Icon style={{ color: "skyblue" }} />
                  </span>{" "}
                  <span className="text-dark">+919980670037 </span>
                </Button>
              </a>
            </Nav.Link>
            <Nav.Link>
              <a href={`tel:${phoneNumber}`} className="text-decoration-none">
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
                  <Button
                    className="text-dark responvm me-1  p-1"
                    variant="outlined"
                    size="medium"
                    href="/login"
                  >
                    Login
                  </Button>
                  <Button
                    className="text-dark  responvm p-1"
                    variant="outlined"
                    size="medium"
                    href="/register"
                  >
                    Sign Up
                  </Button>
                </div>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Text>
      </Navbar.Collapse>

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
