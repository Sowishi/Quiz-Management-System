import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { db } from "../../firebase";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { toast } from "react-toastify";

const AddQuestion = ({ show, hide, quizID }) => {
  const [question, setQuestion] = useState("");
  const [choices, setChoices] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");

  const handleChoiceChange = (index, value) => {
    const newChoices = [...choices];
    newChoices[index] = value;
    setChoices(newChoices);
  };

  const handleCorrectAnswerChange = (value) => {
    setCorrectAnswer(value);
  };

  const handleSubmit = () => {
    try {
      const questionRef = collection(db, "questions", quizID, "allQuestions");
      addDoc(questionRef, {
        question,
        choices: JSON.stringify(choices),
        correctAnswer,
      });
      toast.success("Successfully added question!");
      hide();
    } catch (error) {
      toast.error(error.toString());
    }
  };
  return (
    <Modal
      backdrop="static"
      keyboard={false}
      style={{ zIndex: 2000 }}
      show={show}
      onHide={hide}
    >
      <Modal.Header closeButton>
        <Modal.Title>Add Question</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="questionTextArea">
            <Form.Label>Question</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
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
                    onChange={(e) => handleChoiceChange(index, e.target.value)}
                  />
                </Form.Group>
              </div>
            ))}
          </div>

          <Form.Group controlId="correctAnswerSelect">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Control
              as="select"
              value={correctAnswer}
              onChange={(e) => handleCorrectAnswerChange(e.target.value)}
            >
              {choices.map((choice, index) => (
                <option key={index} value={choice}>
                  {`Choice ${index + 1}`}
                </option>
              ))}
            </Form.Control>
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

export default AddQuestion;
