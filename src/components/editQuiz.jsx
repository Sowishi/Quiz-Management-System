import { Modal, Button, Form } from "react-bootstrap";
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
          <div className="row">
            {questions &&
              questions.map((question, index) => {
                const choices = JSON.parse(question.choices);
                return (
                  <div className="col-md-4">
                    <Form>
                      <Form.Group controlId="questionTextArea">
                        <Form.Label>Question #{index + 1}</Form.Label>
                        <Form.Control
                          as="textarea"
                          rows={3}
                          value={question.question}
                        />
                      </Form.Group>

                      <div className="row">
                        {[0, 1, 2, 3].map((index) => (
                          <div key={index} className="col-md-6">
                            <Form.Group controlId={`choice${index}`}>
                              <Form.Label>{`Choice ${index + 1}`}</Form.Label>
                              <Form.Control
                                type="text"
                                value={choices[index]}
                                className={`${
                                  question.correctAnswer == choices[index]
                                    ? "bg-success text-white"
                                    : ""
                                }`}
                              />
                            </Form.Group>
                          </div>
                        ))}
                      </div>
                    </Form>
                  </div>
                );
              })}
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
