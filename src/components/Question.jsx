/* eslint-disable react/prop-types */

import Options from "./Options"


const Question = ({question, dispatch, answer}) => {
    
  return (
    <div>
        <h2 className={`text-4xl`}>{question.question}</h2>
        <Options question={question}  dispatch={dispatch} answer={answer}/>
    </div>
  )
}

export default Question