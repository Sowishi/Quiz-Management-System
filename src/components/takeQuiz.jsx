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

const TakeQuiz = () => {
  const quizzesRef = collection(db, "quizzes");

  const [quizzes, setQuizzes] = useState([]);

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
                <div className="w-100 d-flex justify-content-center align-items-center">
                  <Spinner animation="border" />
                </div>
              </>
            )}
            {quizzes &&
              quizzes.map((quiz) => {
                return (
                  <div className="col-md-4" key={quiz.id}>
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
              })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TakeQuiz;
