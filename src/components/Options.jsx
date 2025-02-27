/* eslint-disable react/prop-types */
const Options = ({ question, dispatch, answer }) => {
  
  const hasAnswered = answer !== null;
  return (
    <div>
      {question.options.map((option, index) => (
        <button
          className={`block text-xl md:text-3xl border-2 p-3 md:p-6 cursor-pointer rounded-full btn my-6 w-full btn btn-option ${
            answer === index ? "answer" : ""
          } ${
            hasAnswered
              ? question.correctOption === index
                ? "correct"
                : "wrong"
              : ""
          } `}
          key={option}
          onClick={() => dispatch({ type: "newAnswer", payload: index })}
          disabled={hasAnswered}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default Options;
