import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Layout = ({ children }) => {
  return (
    <div className="container-fluid px-0">
      <Navbar expand="lg" bg="primary" variant="dark">
        <div className="container-fluid">
          <Navbar.Brand className="text-white fw-bold" href="#">
            Quiz Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="navbar-nav">
              <Nav.Item>
                <Link className="text-white nav-link" to={"/create-quiz"}>
                  Create Quiz
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="text-white nav-link" to={"/take"}>
                  Take Quiz
                </Link>
              </Nav.Item>
              <Nav.Item>
                <Link className="text-white nav-link" to={"/take"}>
                  Log Out
                </Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
        </div>
      </Navbar>
      {children}
    </div>
  );
};

export default Layout;
