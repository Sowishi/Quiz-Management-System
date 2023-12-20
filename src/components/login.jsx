import { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [users, setUsers] = useState([]);

  const navigation = useNavigate();

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    });

    return () => unsubscribe();
  }, []);

  const getUser = (id) => {
    const user = users.filter((user) => {
      if (user.uid == id) {
        return user;
      }
    });
    return user[0];
  };

  // Function to handle form submission
  const handleLogin = async (event) => {
    try {
      const { user } = await signInWithEmailAndPassword(
        auth,
        username,
        password
      );

      console.log(user);

      if (user) {
        const userData = getUser(user.uid);
        if (userData !== undefined) {
          if (userData.role == "user") {
            navigation("/take-quiz");
          }
        } else {
          navigation("/create-quiz");
        }
      } else {
        toast.error("Invalid username or password");
      }
    } catch (error) {
      console.log(error);
      toast.error("Invalid Email or Password");
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
          <Form.Label>Email</Form.Label>
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
