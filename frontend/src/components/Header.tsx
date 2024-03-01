import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
import { FiAlignCenter } from "react-icons/fi";
import { FaAngleDown } from "react-icons/fa";
import { FaFacebookSquare, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaSquareTwitter } from "react-icons/fa6";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

const Header = () => {
  return (
    <header>
      <Container>
        <div className="topbar">
          <div className="right">
            <div className="logo">
              <FaFacebookSquare />
              <FaSquareTwitter />
              <FaInstagram />
              <FaLinkedin />
            </div>
            <span>+011 234 567 89</span>
            <span>contact@domain.com</span>
          </div>
          <div className="left">
            <Link to={"/"}>Login</Link>
            <Link to={"/"}>Sign up</Link>
            <DropdownButton
              id="dropdown-basic-button"
              title={
                <span>
                  English
                  <FaAngleDown style={{ color: "#2b2540" }} size="15" />
                </span>
              }
            >
              <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
            </DropdownButton>
          </div>
        </div>
      </Container>

      <Navbar expand="md" className="">
        <Container>
          <Link className="navbar-brand" to={"/"}>
            LoGo
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav">
            <FiAlignCenter />
          </Navbar.Toggle>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-between align-items-center"
          >
            <Nav className="">
              <Link className="nav-link " to={"/"}>
                Home
              </Link>
              <NavDropdown
                title={
                  <span>
                    Caterory
                    <FaAngleDown style={{ color: "#2b2540" }} size="15" />
                  </span>
                }
                id="basic-nav-dropdown"
              >
                <Link className="dropdown-item" to={"/"}>
                  Action
                </Link>
              </NavDropdown>
              <Link className="nav-link" to={"/news"}>
                News
              </Link>
              <Link className="nav-link" to={"/contact"}>
                Contact
              </Link>
            </Nav>
            <Nav>
              <Link className="nav-link explore-packages-btn" to={"/"}>
                Explore Travel Packages
              </Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* <Navbar expand="lg" className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/" as={Link} to={"/"}>
                Home
              </Nav.Link>
              <NavDropdown title="Caterory" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/news" as={Link} to={"/news"}>
                News
              </Nav.Link>
              <Nav.Link href="/contact" as={Link} to={"/contact"}>
                Contact
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
    </header>
  );
};

export default Header;
