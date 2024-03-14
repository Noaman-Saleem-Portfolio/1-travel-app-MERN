import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { FcExpand } from "react-icons/fc";
import { FiAlignCenter } from "react-icons/fi";
import { Link } from "react-router-dom";

function MenuBar() {
  return (
    <>
      <Navbar expand="xl" className="bg-body-tertiary mb-3 header">
        <Container>
          <Navbar.Brand href="#">Company LoGo</Navbar.Brand>
          <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xl`}>
            <FiAlignCenter size={"32"} />
          </Navbar.Toggle>
          <Navbar.Offcanvas
            id={`offcanvasNavbar-expand-xl`}
            aria-labelledby={`offcanvasNavbarLabel-expand-xl`}
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xl`}>
                LoGo
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="justify-content-between">
              <Nav className=" right-nav">
                <Nav.Link as={Link} to={"/"}>
                  Home
                </Nav.Link>

                <NavDropdown
                  title={
                    <span>
                      Destination
                      {/* <FaAngleDown size="12" className="icon" /> */}
                      <FcExpand size="12" className="icon" />
                    </span>
                  }
                  id={`offcanvasNavbarDropdown-expand-xl`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  title={
                    <span>
                      Category
                      {/* <FaAngleDown size="12" className="icon" /> */}
                      <FcExpand size="12" className="icon" />
                    </span>
                  }
                  id={`offcanvasNavbarDropdown-expand-xl`}
                >
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">
                    Another action
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">
                    Something else here
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Nav className=" ">
                <Nav.Link as={Link} to={"/news"}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to={"/contact"}>
                  Sign up
                </Nav.Link>
                <Nav.Link as={Link} to={"/"} className="partner">
                  Become a partner
                </Nav.Link>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default MenuBar;
