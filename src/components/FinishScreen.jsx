/* eslint-disable react/prop-types */

const FinishScreen = ({ highscore, points, maxPossiblePoints, dispatch }) => {
  const percentage = ( points / maxPossiblePoints ) * 100;
  return (
    <div className={`flex flex-col gap-4 items-center`}>
      <p className={`rounded-full p-6 text-xl md:text-2xl bg-blue-700`}>
        You Scoredddddd <strong>{points}</strong> out of {maxPossiblePoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className={`highscore`}>(Highscore: {highscore} points)</p>
      <button
        className={`rounded-full p-6 text-xl md:text-2xl bg-blue-700 transition hover:bg-blue-400`}
        onClick={() => dispatch({ type: "restart" })}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default FinishScreen;
