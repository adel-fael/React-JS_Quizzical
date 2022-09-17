export default function Quest({ question, showAnswers, selectAnswer, id,}) {

  function styler(option, index) {
    if (showAnswers === true) {
      if (question.correct_answer === option) {
        return { backgroundColor: "#94D7A2" }
      } else if (question.selected_answer === index) {
        return { backgroundColor: "#F8BCBC" }
      } else {
        return { backgroundColor: "#F5F7FB" }
      }
    } else {
      return question.selected_answer === index
        ? { backgroundColor: "#D6DBF5" }
        : { backgroundColor: "#F5F7FB" }
    }
  }

  const options = question.options.map((option, index) => (
    <button
      key={index}
      dangerouslySetInnerHTML={{ __html: option }}
      onClick={(event) => selectAnswer(event, id, index)}
      style={styler(option, index)}
      disabled={showAnswers}
      className="quiz-container-question-options-container-option"
    />
  ))

  return (
    <div className="quiz-container-question">
      <h1
        className="quiz-container-question-title"
        dangerouslySetInnerHTML={{ __html: question.question }}
      />
      <div className="quiz-container-question-options-container">{options}</div>
      <hr className="quiz-container-question-divider" />
    </div>
  )
}
