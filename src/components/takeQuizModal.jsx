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
    });
  }, [quiz]);

  function areObjectsEqual(obj1, obj2) {
    // Convert objects to JSON strings and compare them
    const str1 = JSON.stringify(obj1);
    const str2 = JSON.stringify(obj2);
    return str1 === str2;
  }

  console.log(userInput);

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
                        {[0, 1, 2, 3].map((index) => (
                          <div key={index} className="col-md-6">
                            <Form.Group controlId={`choice${index}`}>
                              <Form.Label>{`Choice ${index + 1}`}</Form.Label>
                              <Form.Control
                                type="text"
                                value={choices[index]}
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  const copy = { ...question };
                                  copy.correctAnswer = choices[index];

                                  const isQuizIdInUserInput = userInput.some(
                                    (item) => item.id === copy.id
                                  );

                                  if (!isQuizIdInUserInput) {
                                    // If not present, add it to userInput array
                                    setUserInput((prevUserInput) => [
                                      ...prevUserInput,
                                      copy,
                                    ]);
                                  }
                                }}
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

export default TakeQuizModal;
