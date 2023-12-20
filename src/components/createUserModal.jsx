import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword } from "firebase/auth";

const CreateUserModal = ({ show, hide, quizID }) => {
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const { uid } = user;

      await addDoc(collection(db, "users"), {
        uid,
        fullName,
        email,
        role: "user",
        createdAt: serverTimestamp(),
      });

      setFullName("");
      setEmail("");
      setPassword("");

      hide();

      toast.success("User created successfully!");
    } catch (error) {
      console.error("Error signing up: ", error);
      toast.error("Error creating user. Please try again.");
    }
  };
  return (
    <Modal style={{ zIndex: 2000 }} show={show} onHide={hide}>
      <Modal.Header closeButton>
        <Modal.Title>Create User </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFullName">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your full name"
              value={fullName}
              onChange={handleFullNameChange}
            />
          </Form.Group>

          <Form.Group controlId="formUserName">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user name"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={handleSubmit}>
          Submit
        </Button>{" "}
      </Modal.Footer>
    </Modal>
  );
};

export default CreateUserModal;
