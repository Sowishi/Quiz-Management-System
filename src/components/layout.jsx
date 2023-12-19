import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Layout = ({ children, user }) => {
  return (
    <div className="container-fluid px-0">
      <Navbar expand="lg" bg={user ? "primary" : "dark"} variant="dark">
        <div className="container-fluid">
          <Navbar.Brand className="text-white fw-bold" href="#">
            Quiz Management System
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarNav" />
          <Navbar.Collapse id="navbarNav">
            <Nav className="navbar-nav">
              {!user && (
                <>
                  <Nav.Item>
                    <Link className="text-white nav-link" to={"/create-quiz"}>
                      Create Quiz
                    </Link>
                  </Nav.Item>
                  <Nav.Item>
                    <Link className="text-white nav-link" to={"/create-user"}>
                      Users Mangement
                    </Link>
                  </Nav.Item>
                </>
              )}

              {user && (
                <Nav.Item>
                  <Link className="text-white nav-link" to={"/take-quiz"}>
                    Take Quiz
                  </Link>
                </Nav.Item>
              )}

              <Nav.Item>
                <Link className="text-white nav-link" to={"/"}>
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
