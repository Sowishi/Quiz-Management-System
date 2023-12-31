import { Modal, Button, Form } from "react-bootstrap";
import AddQuestion from "./addQuestion";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import ScoreModal from "./scoreModal";

const TakeQuizModal = ({ show, hide, quiz }) => {
  const [questions, setQuestions] = useState([]);
  const [userInput, setUserInput] = useState([]);
  const [scoreModal, setScoreModal] = useState(false);
  const [score, setScore] = useState(null);
  const [disable, setDisable] = useState(false);
  const [users, setUsers] = useState([]);

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
    alreadyTake(quiz.id);
  }, [quiz]);

  const handleSubmit = async () => {
    let score = 0;

    for (let i = 0; i < questions.length; i++) {
      if (questions[i].correctAnswer == userInput[i].correctAnswer) {
        score += 1;
      }
    }

    const scoresRef = doc(db, "scores", quiz.id, "users", auth.currentUser.uid);
    const userData = await getUser(auth.currentUser.uid);

    try {
      setScore(score);
      setScoreModal(true);
      setDoc(scoresRef, {
        user: auth.currentUser.uid,
        userData,
        score,
        questionsLength: questions.length,
        createdAt: serverTimestamp(),
      });
    } catch (error) {
      toast.error(error.toString());
    }
  };

  const letters = ["A", "B", "C", "D"];

  const alreadyTake = async (quizID) => {
    const docRef = doc(db, "scores", quizID, "users", auth.currentUser.uid);
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      setDisable(true);
    } else {
      setDisable(false);
    }
  };

  return (
    <>
      {questions && (
        <ScoreModal
          show={scoreModal}
          hide={() => {
            hide();
          }}
          score={score}
          questionLength={questions.length}
        />
      )}
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
            <Button
              disabled={disable}
              onClick={handleSubmit}
              className="w-100"
              variant="success"
            >
              Finish
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TakeQuizModal;
