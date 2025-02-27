/* eslint-disable react/prop-types */

const StartScren = ({ quesLength, dispatch }) => {
  return (
    <div
      className={`text-center flex flex-col gap-6 justify-center items-center`}
    >
      <h2>How best do you know React.js?</h2>
      <h3>{quesLength} to test your knowlegde on React js</h3>
      <button
        className={`rounded-full p-6 text-xl md:text-2xl bg-blue-700 transition hover:bg-blue-400`}
        onClick={() => dispatch({ type: "start" })}
      >
        Let&apos;s start
      </button>
    </div>
  );
};

export default StartScren;
