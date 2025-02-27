/* eslint-disable react/prop-types */

const NextButton = ({ dispatch, answer, quesLength, index }) => {
  if (answer === null) return null;
  if (index < quesLength - 1) {
    return (
      <button
        className={`rounded-full btn btn-ui p-6 text-xl md:text-2xl bg-blue-700 transition hover:bg-blue-400`}
        onClick={() => dispatch({ type: "newQuestion" })}
      >
        Next
      </button>
    );
  }
  if(quesLength-1 === index){
    return (
      <button
        className={`rounded-full btn btn-ui p-6 text-xl md:text-2xl bg-blue-700 transition hover:bg-blue-400`}
        onClick={() => dispatch({ type: "finish" })}
      >
        Finish
      </button>
    );
  }
};

export default NextButton;
