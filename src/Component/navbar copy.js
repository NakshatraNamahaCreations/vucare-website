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
// import { ReactApi } from "../api";
// import { ImagApi } from "../api";

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
        const firstInFirstOut = res.data.category?.reverse();
        setCategory(firstInFirstOut);
      }
    } catch (er) {
      // console.log(er, "err while fetching data");
    }
  };
  return (
    <Navbar expand="lg " bg="light" data-bs-theme="light">
      <Container>
        <Navbar.Brand
          className="clr  fnt bg-white p-1  rounded-lg brd "
          href="/"
        >
          <img src="..\images\vucarpng.png" width={200} height={46} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav wiauto" />
        <Navbar.Collapse>
          <div className="category">
            {Category.map((ele) => {
              return <p>{ele.category}</p>;
            })}
          </div>
          <div className="col-md-2">
            <div className=" row  ">
              <div className="col-md-3 m-auto">
                <a href="https://www.instagram.com/vucareservices/">
                  <img
                    className="clrc"
                    alt=""
                    src="..\images\wicon1 (2).png"
                    width={65}
                    height={65}
                  />
                </a>
              </div>
              <div className="col-md-3 m-auto">
                <img
                  alt=""
                  className="cursor-pointer clrc"
                  onClick={openWhatsapp}
                  src="..\images\wicon1 (1).png"
                  width={50}
                  height={50}
                />
              </div>
              <div className="col-md-3 me-3 m-auto ">
                <a
                  className="clr fnt me-2"
                  href="https://www.facebook.com/vucareservices?mibextid=kFxxJD"
                >
                  <img
                    className="clrc"
                    alt=""
                    src="..\images\wicon1 (3).png"
                    width={50}
                    height={50}
                  />
                </a>
              </div>
            </div>
          </div>
          <div className="clr fnt ms-2 me-1 review">
            <a href={`tel:${phoneNumber}`} className="text-decoration-none">
              <Button variant="outlined" size="medium">
                <span className="me-2">
                  <WifiCalling3Icon style={{ color: "skyblue" }} />
                </span>{" "}
                <span className="text-dark">+917760120037</span>
              </Button>
            </a>
          </div>
          <div className="clr fnt me-1 review">
            <a href={`tel:${phoneNumber}`} className="text-decoration-none">
              <Button variant="outlined" size="medium">
                <span className="me-2">
                  <WifiCalling3Icon style={{ color: "skyblue" }} />
                </span>{" "}
                <span className="text-dark">+917337744156 </span>
              </Button>
            </a>
          </div>
          <div className="clr fnt me-1 review">
            <a href={`tel:${phoneNumber}`} className="text-decoration-none">
              <Button variant="outlined" size="medium">
                <span className="me-2">
                  <WifiCalling3Icon style={{ color: "skyblue" }} />
                </span>{" "}
                <span className="text-dark">+919980670037 </span>
              </Button>
            </a>
          </div>
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
        </Navbar.Collapse>
      </Container>
    
    </Navbar>
  );
}
