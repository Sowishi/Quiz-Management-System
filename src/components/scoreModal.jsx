import { Modal, Button, Form } from "react-bootstrap";
import AddQuestion from "./addQuestion";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const ScoreModal = ({ show, hide, score, questionLength }) => {
  return (
    <>
      <Modal backdrop="static" keyboard={false} show={show} onHide={hide}>
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-white"
          ></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h2 className="fw-bold">
            Your Score: {score}/{questionLength}
          </h2>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ScoreModal;
