import { Modal, Button, Form } from "react-bootstrap";
import AddQuestion from "./addQuestion";
import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const TakeQuizModal = ({ show, hide, quiz }) => {
  const [questions, setQuestions] = useState([]);
  const [userInput, setUserInput] = useState([]);

  useEffect(() => {
    const questionRef = collection(db, "questions", quiz.id, "allQuestions");
    onSnapshot(questionRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        output.push(data);
      });
      setQuestions(output);
      setUserInput(output);
    });
  }, [quiz]);

  const handleSubmit = () => {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAnswer == userInput[i].correctAnswer) {
        score += 1;
      }
    }
    console.log(score);
  };

  const letters = ["A", "B", "C", "D"];

  return (
    <>
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
          <div className="row">
            {questions.length <= 0 && (
              <>
                <h5 className="text-center">No quizzes yet!</h5>
              </>
            )}

            {questions &&
              questions.map((question, index) => {
                const choices = JSON.parse(question.choices);
                return (
                  <div key={index} className="col-md-4">
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
                        {choices.map((choice, index) => {
                          return (
                            <div key={index} className="col-md-6 ">
                              <Form.Group controlId={`choice${index}`}>
                                <Form.Label>Letter {letters[index]}</Form.Label>
                                <Form.Control
                                  type="text"
                                  value={choice}
                                  style={{ cursor: "pointer" }}
                                  disabled
                                />
                              </Form.Group>
                            </div>
                          );
                        })}
                        <Form.Group controlId="correctAnswerSelect">
                          <Form.Label>Correct Answer</Form.Label>
                          <Form.Control
                            as="select"
                            onChange={(e) => {
                              const userInputCopy = userInput.map((input) => ({
                                ...input,
                              }));
                              const res = userInputCopy.map((input) => {
                                if (question.id === input.id) {
                                  input.correctAnswer = e.target.value;
                                }
                                return input;
                              });
                              setUserInput(res);
                            }}
                          >
                            <option value="">
                              Please select correct answer
                            </option>
                            {choices.map((choice, index) => (
                              <option key={index} value={choice}>
                                {choice}
                              </option>
                            ))}
                          </Form.Control>
                        </Form.Group>
                      </div>
                    </Form>
                  </div>
                );
              })}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className="w-100">
            <Button onClick={handleSubmit} className="w-100" variant="success">
              Finish
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TakeQuizModal;
