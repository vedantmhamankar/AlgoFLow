import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    try {
      const userData = localStorage.getItem("user");
      const user = userData ? JSON.parse(userData) : null;

      if (!user) {
        navigate("/register"); // redirect if not logged in
      }
    } catch (err) {
      console.error("Error reading user from localStorage", err);
      navigate("/register");
    }
  }, [navigate]);
  // ✅ Fetch questions from backend
  useEffect(() => {
    axios.get("http://localhost:5000/quiz") // your backend route
      .then((res) => {
        console.log("Fetched questions:", res.data); // debug
        setQuestions(res.data);
      })
      .catch((err) => console.error("Error fetching questions:", err));
  }, []);

  if (questions.length === 0) {
    return <h2 style={{ color: "white",marginLeft:"520px"
     }}>Loading questions...</h2>;
  }

  const currentQ = questions[currentIndex];

  const handleSelect = (option) => {
    setAnswers({ ...answers, [currentIndex]: option });
  };

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSubmit = () => {
    let sc = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) sc++; // use correctAnswer from DB
    });
    setScore(sc);
  };

  if (score !== null) {
    return (
      <motion.div style={{  textAlign: "center",
        width:"500px", height:"100px", border:"1px solid #0AE448",marginLeft:"500px",backgroundColor:"#0AE448", color:"black"
      }}>
        <h2>Your Score: {score} / {questions.length}</h2>
      </motion.div>
    );
  }
  

  return (
    <motion.div style={{ color: "white", padding: "20px", width:"600px",
      height:"500px", border:"1px solid white", marginLeft:"460px"
    }}>
      <motion.h2>
        Question {currentIndex + 1} of {questions.length}
      </motion.h2>
      <motion.h5>{currentQ.question}</motion.h5>

      <div style={{ marginTop: "20px" }}>
        {currentQ.options.map((opt, i) => (
          <motion.button
            key={i}
            onClick={() => handleSelect(opt)}
            style={{
              backgroundColor: answers[currentIndex] === opt ? "purple" : "white",
              color: answers[currentIndex] === opt ? "white" : "black",
              margin: "8px",
              padding: "15px 50px",
              border: "1px solid purple",
              borderRadius: "5px",
              cursor: "pointer",
              display:"flex",
              marginLeft:"40px"
            }}
          >
            {opt}
          </motion.button>
        ))}
      </div>

      {currentIndex < questions.length - 1 ? (
        <motion.button
          onClick={handleNext}
          disabled={!answers[currentIndex]}
          style={{
            backgroundColor: !answers[currentIndex] ? "gray" : "purple",
            color: "white",
            marginTop: "90px",
            marginLeft:"520px",
            padding: "10px 20px",
            borderRadius: "5px",
            cursor: !answers[currentIndex] ? "not-allowed" : "pointer",
          }}
        >
          Next
        </motion.button>
      ) : (
        <motion.button
          onClick={handleSubmit}
          style={{
            backgroundColor: "green",
            color: "white",
            marginTop: "20px",
            padding: "10px 20px",
            borderRadius: "5px",
          }}
        >
          Submit
        </motion.button>
      )}
    </motion.div>
  );
}

export default Quiz;
