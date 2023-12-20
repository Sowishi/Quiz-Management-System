import { useState } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/login";
import CreateQuiz from "./components/createQuiz";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EditQuiz from "./components/editQuiz";
import TakeQuiz from "./components/takeQuiz";
import CreateUser from "./components/createUser";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/create-quiz" element={<CreateQuiz />} />
          <Route path="/take-quiz" element={<TakeQuiz />} />
          <Route path="/create-user" element={<CreateUser />} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />{" "}
    </>
  );
}

export default App;
