import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigation = useNavigate();

  // Function to handle form submission
  const handleLogin = async (event) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      const users = querySnapshot.docs.map((doc) => doc.data());

      // Check if the provided username and password match any entry in the "users" collection
      const user = users.find(
        (user) => user.userName === username && user.password === password
      );

      if (user) {
        if (user.role == "user") {
          navigation("/take-quiz");
        } else {
          navigation("/create-quiz");
        }
      } else {
        toast.error("Invalid username or password");
        // Handle invalid login (e.g., show an error message)
      }
    } catch (error) {
      console.error("Error fetching users: ", error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <div className="container-fluid vh-100 d-flex justify-content-center align-items-center bg-dark">
      <div className="bg-white p-4 shadow border rounded">
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
          <Button
            variant="primary"
            onClick={handleLogin}
            type="submit"
            className="w-100"
          >
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Login;
