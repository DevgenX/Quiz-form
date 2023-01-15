import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch("http://localhost:4000/questions");
    const data = await response.json();

    setQuestions(data);
  };

  const handleDeleteQuestion = (id) => {
    const config = {
      method: "DELETE",
    };
    fetch(`http://localhost:4000/questions/${id}`, config)
      .then((resp) => resp.json())
      .then(() => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
      });
  };

  const handleUpdateAnswer = (id, correctIndex) => {
    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ correctIndex }),
    };
    fetch(`http://localhost:4000/questions/${id}`, config)
      .then((resp) => resp.json())
      .then((data) => {
        const updatedQuestions = questions.map((q) => {
          if (q.id === data.id) return data;

          return q;
        });

        setQuestions(updatedQuestions);
      });
  };

  const questionItems = questions.map((qdata) => {
    return (
      <QuestionItem
        key={qdata.id}
        question={qdata}
        onDeleteQuestion={handleDeleteQuestion}
        onUpdateAnswer={handleUpdateAnswer}
      />
    );
  });
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
