import React from "react";

function QuestionItem({ question, onDeleteQuestion, onUpdateAnswer }) {
  const { id, prompt, answers, correctIndex } = question;

  // delete the question from the list
  const handleDeleteClick = () => {
    onDeleteQuestion(id);
  };

  // update the answer, the correct index is the e.target.value or what is being interacted with
  const handleUpdateAnswer = (e) => {
    onUpdateAnswer(id, parseInt(e.target.value));
  };

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select defaultValue={correctIndex} onChange={handleUpdateAnswer}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
