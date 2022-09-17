import { useEffect, useState } from "react"
import blob from "./assets/images/blob.png"
import Quest from "./components/Quest.jsx"
import Start from "./components/Start.jsx"
import Axios from 'axios'

export default function App() {
  const [showStart, setShowStart] = useState(true)
  const [score, setScore] = useState(0)
  const [showAnswers, setShowAnswers] = useState(false)
  const [questions, setQuestions] = useState([])
  const [allComplete, setAllComplete] = useState(false)
  const [loading, setLoading] = useState(false)

  // console.log(questions);

  function startQuiz() {
    setShowStart(false)
  }

  function playAgain() {
    setShowStart(true)
    setShowAnswers(false)
    setAllComplete(false)
  }

  function checkAnswers() {
    setShowAnswers(true)
  }

  function selectAnswer(event, quest_id, option_id) {
    setQuestions(function (prev) {
      return questions.map(function (quest, qid) {
        if (quest_id === qid) {
          return { ...quest, selected_answer: option_id }
        } else {
          return quest
        }
      })
    })
  }

  useEffect(() => {
    let count = 0
    for (let i = 0; i < questions.length; i++) {
      if (typeof questions[i].selected_answer !== "undefined") {
        if (
          questions[i].options[questions[i].selected_answer] ===
          questions[i].correct_answer
        ) {
          count++
        }
      }
    }
    setScore(count)
  }, [showAnswers])


  const url = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple"
  useEffect(() => {
    if (showStart === false) {
      const fetchData = async () => {
        
        setLoading(true)
        try {
          const { data } = await Axios(url)
          if (data.results) {
            setQuestions(
              data.results.map( (question) => {
                return {
                  question: question.question,
                  options: question.incorrect_answers
                    .concat([question.correct_answer])
                    .map((value) => ({ value, sort: Math.random() }))
                    .sort((a, b) => a.sort - b.sort)
                    .map(({ value }) => value),
                  selected_answer: undefined,
                  correct_answer: question.correct_answer,
                }
              })
            )
          }
          else {
            setQuestions([])
          }
    
        } catch (e) {
          console.log(e.response)
        }

        setLoading(false)
      }
      fetchData()
    
    }
  }, [showStart])
  


  useEffect(() => {
    setAllComplete(
      questions.every((quest) => typeof quest.selected_answer !== "undefined")
    )
  }, [questions])

  const quests = questions.map(function (question, index) {
    return (
      <Quest
        key={index}
        question={question}
        showAnswers={showAnswers}
        selectAnswer={selectAnswer}
        id={index}
      />
    )
  })

  if (loading) {
    return (
      <section className="loading">
        <h4>Loading...</h4>
      </section>
    )
  }

  return (
    <div className="app">
      {showStart ? (
        <Start startQuiz={startQuiz} />
      ) : (
        <div className="quiz-container">
          {quests}
          {showAnswers ? (
            <div className="button-container">
              <h3 className="button-container-score">
                {"You scored " + score + "/5 correct answers"}
              </h3>
              <button className="button" onClick={playAgain}>
                Play Again
              </button>
            </div>
          ) : (
            <button
              className="button"
              disabled={!allComplete}
              onClick={checkAnswers}
            >
              Check Answers
            </button>
          )}
        </div>
      )}
      <img className="blob1" src={blob} alt="" />
      <img className="blob2" src={blob} alt="" />
    </div>
  )
}
