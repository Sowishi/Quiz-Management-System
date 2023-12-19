import { useEffect, useState } from "react";
import Layout from "./layout";
import { Modal, Button, Form, Card } from "react-bootstrap";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
} from "firebase/firestore";
import { auth, db } from "../../firebase";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import TakeQuizModal from "./takeQuizModal";

const TakeQuiz = () => {
  const quizzesRef = collection(db, "quizzes");

  const [quizzes, setQuizzes] = useState([]);
  const [SelectedQuiz, setSelectedQuiz] = useState();
  const [takeQuizModal, setTakeQuizModal] = useState(false);

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
    <Layout user={true}>
      {SelectedQuiz && (
        <TakeQuizModal
          quiz={SelectedQuiz}
          show={takeQuizModal}
          hide={() => setSelectedQuiz(false)}
        />
      )}

      <div className="container-fluid my-3">
        {/* Other content */}
        <div className="container my-5">
          <h1>Take Quizzes 🚀</h1>
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
                        <div className="w-100 ">
                          <Button
                            onClick={() => {
                              setSelectedQuiz(quiz);
                              setTakeQuizModal(true);
                            }}
                            variant="primary"
                          >
                            Take Quiz
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

export default TakeQuiz;
