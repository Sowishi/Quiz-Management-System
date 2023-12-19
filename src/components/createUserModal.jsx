import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const CreateUserModal = ({ show, hide, quizID }) => {
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleFullNameChange = (e) => setFullName(e.target.value);
  const handleUserNameChange = (e) => setUserName(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleSubmit = async () => {
    // Check if any of the fields are empty
    if (!fullName || !userName || !password) {
      console.error("Please fill in all fields");
      toast.error("Please fill in all fields");
      return;
    }

    try {
      // Add logic for handling form submission (e.g., storing data in Firebase).
      const userDocRef = await addDoc(collection(db, "users"), {
        fullName,
        userName,
        password,
        role: "user",
        createdAt: serverTimestamp(),
      });

      console.log("Document written with ID: ", userDocRef.id);

      // Clear form data after successful submission
      setFullName("");
      setUserName("");
      setPassword("");

      // Close the modal after submitting
      hide();

      // Show success toast
      toast.success("User created successfully!");
    } catch (error) {
      console.error("Error adding document: ", error);
      // Show error toast
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
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your user name"
              value={userName}
              onChange={handleUserNameChange}
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
