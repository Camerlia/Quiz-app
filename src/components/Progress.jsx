/* eslint-disable react/prop-types */
const Progress = ({ index, points, quesLength, maxPossiblePoints,answer }) => {
  return (
    <header className={` mb-16 grid justify-between gap-1 text-3xl progress `}>
    <progress max={quesLength} value={index + Number(answer !== null)} />
      <p>
        Question <strong>{index + 1}</strong>/{quesLength}
      </p>
      <p>
        <strong>{points}</strong>/{maxPossiblePoints}
      </p>
    </header>
  );
};

export default Progress;
