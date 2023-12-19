import { Modal, Button, Form, Table } from "react-bootstrap";
import AddQuestion from "./addQuestion";
import { useEffect, useState } from "react";
import { addDoc, collection, onSnapshot } from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";

const ScoresModal = ({ show, hide, quiz }) => {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const scoresRef = collection(db, "scores", quiz.id, "users");
    onSnapshot(scoresRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        output.push(doc.data());
      });
      setScores(output);
    });
  }, [quiz]);

  return (
    <>
      <Modal
        backdrop="static"
        centered
        keyboard={false}
        size="xl"
        show={show}
        onHide={hide}
      >
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="text-white"
          >
            Student Scores
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Score</th>
                <th>Date Take</th>
              </tr>
            </thead>
            <tbody>
              {scores &&
                scores.map((score, index) => {
                  return (
                    <tr>
                      <th>{index + 1}</th>
                      <th>{score.userData.fullName}</th>
                      <th>
                        {score.score} / {score.questionsLength}
                      </th>
                      <th>{Date(score.createdAt).substring(0, 25)}</th>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    </>
  );
};

export default ScoresModal;
