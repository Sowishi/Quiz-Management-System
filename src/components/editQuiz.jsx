import { Modal, Button } from "react-bootstrap";
import AddQuestion from "./addQuestion";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const EditQuiz = ({ show, hide, quiz }) => {
  const [addQuestion, setAddQuestion] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const questionRef = collection(db, "questions", quiz.id, "allQuestions");
    onSnapshot(questionRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        output.push(data);
      });
      setQuestions(output);
    });
  }, [quiz]);

  return (
    <>
      <AddQuestion
        quizID={quiz.id}
        show={addQuestion}
        hide={() => setAddQuestion(false)}
      />
      <Modal
        backdrop="static"
        keyboard={false}
        show={show}
        onHide={hide}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <div className="w-100 d-flex justify-content-between">
              <div className="div">{quiz.quizTitle} </div>
            </div>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="w-100 d-flex justify-content-end align-items-center">
            <button
              onClick={() => setAddQuestion(true)}
              type="button"
              class="btn btn-success"
            >
              Add Question!
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={hide}>Close</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditQuiz;
