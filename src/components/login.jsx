import { useState } from "react";
import { Form, Button } from "react-bootstrap";

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle form submission
  const handleLogin = (event) => {
    event.preventDefault();
    // Log the username and password to the console
    console.log("Username:", username);
    console.log("Password:", password);
    // Add your authentication logic here
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div
        className="bg-white p-4 shadow border rounded"
        onSubmit={handleLogin}
      >
        <h4 className="my-5 fw-bold text-center mb-0">
          Quiz Management System
        </h4>
        <div
          className="line bg-primary my-3"
          style={{ width: "100%", height: "5px" }}
        ></div>
        <Form.Group controlId="username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <div className="w-100 mt-3">
          <Button variant="primary" type="submit" className="w-100">
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
