import { useEffect, useState } from "react";
import Layout from "./layout";
import { Modal, Button, Form, Card } from "react-bootstrap";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "firebase/firestore";
import { db } from "../../firebase";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import EditQuiz from "./editQuiz";

const CreateQuiz = () => {
  const quizzesRef = collection(db, "quizzes");

  const [showModal, setShowModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState(undefined);
  const [description, setDescription] = useState(undefined);
  const [quizzes, setQuizzes] = useState([]);
  const [editQuiz, setEditQuiz] = useState(false);
  const [selectedQuiz, setSelectedQuiz] = useState(undefined);

  const handleShowModal = (value) => {
    setShowModal(value);
  };

  const handleCreateQuiz = (event) => {
    event.preventDefault();

    if (!quizTitle.trim() || !description.trim()) {
      toast.error("Quiz title or description must not be empty!");
    } else {
      addDoc(quizzesRef, {
        quizTitle: quizTitle,
        description: description,
        bgColor: generateRandomColor(),
      });
      toast.success("Successfully created quiz");
    }

    setQuizTitle("");
    setDescription("");

    setShowModal(false); // Close thal after handling the form submission
  };

  const handleDeleteQuiz = (id) => {
    try {
      const quizDoc = doc(db, "quizzes", id);
      deleteDoc(quizDoc).then(() => {
        toast.success("Successfully Deleted!");
      });
    } catch (error) {
      toast.error("Error deleting quiz");
    }
  };

  function generateRandomColor() {
    const randomHex = () => Math.floor(Math.random() * 256).toString(16);

    const red = randomHex();
    const green = randomHex();
    const blue = randomHex();

    return `#${red}${green}${blue}`;
  }

  useEffect(() => {
    onSnapshot(quizzesRef, (snapshot) => {
      const output = [];
      snapshot.docs.forEach((doc) => {
        const data = { ...doc.data(), id: doc.id };
        output.push(data);
      });
      setQuizzes(output);
    });
  }, []);

  return (
    <Layout>
      <div className="container-fluid my-3">
        {/* Modal */}
        <Modal
          show={showModal}
          onHide={() => setShowModal(false)}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title className="fs-5">Create Quiz</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleCreateQuiz}>
              <Form.Control
                type="text"
                name="title"
                id="title"
                placeholder="Enter your quiz title"
                onChange={(e) => setQuizTitle(e.target.value)}
                className="my-3"
              />
              <Form.Control
                as="textarea"
                name="description"
                id="description"
                rows="3"
                placeholder="Description of the quiz"
                onChange={(e) => setDescription(e.target.value)}
              />

              <div className="w-100 d-flex justify-content-end align-items-center mt-3">
                <Button type="submit" variant="primary">
                  Create Quiz
                </Button>
              </div>
            </Form>
          </Modal.Body>
        </Modal>

        {selectedQuiz && (
          <EditQuiz
            quiz={selectedQuiz}
            show={editQuiz}
            hide={() => setEditQuiz(false)}
          />
        )}

        {/* Other content */}
        <div className="container">
          <div className="w-100 d-flex justify-content-end align-items-center">
            <Button variant="success" onClick={() => handleShowModal(true)}>
              Create Quiz 🙌
            </Button>
          </div>
          <h1>Created Quizzes 🚀</h1>
          <div
            className="line bg-primary my-3"
            style={{ width: "100px", height: "5px" }}
          ></div>

          <div className="row">
            {quizzes.length <= 0 && (
              <>
                <h5>No quizzes yet!</h5>
              </>
            )}
            {quizzes ? (
              quizzes.map((quiz) => {
                return (
                  <div className="col-md-4 my-3" key={quiz.id}>
                    <Card style={{ background: quiz.bgColor }}>
                      <Card.Body>
                        <Card.Title>{quiz.quizTitle}</Card.Title>
                        <Card.Text>{quiz.description}</Card.Text>
                        <div className="w-100 d-flex justify-content-around align-items-center">
                          <Button
                            onClick={() => {
                              setEditQuiz(true);
                              setSelectedQuiz(quiz);
                            }}
                            variant="primary"
                          >
                            View Quiz ➕
                          </Button>
                          <Button
                            variant="danger"
                            onClick={() => handleDeleteQuiz(quiz.id)}
                          >
                            Delete 🗑️
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </div>
                );
              })
            ) : (
              <div className="w-100 d-flex justify-content-center align-items-center">
                <Spinner animation="border" />
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateQuiz;
