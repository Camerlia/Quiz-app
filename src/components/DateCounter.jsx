import { useReducer } from "react";

function DateCounter() {
  const initialValue = {
    count: 0,
    step: 1,
  };
  const [state, dispatch] = useReducer(reducer, initialValue);
  const { count, step } = state;
  function reducer(state, action) {
    switch (action.type) {
      case "inc":
        return { ...state, count: state.count + state.step };
      case "dec":
        return { ...state, count: state.count - state.step };
      case "setCount":
        return { ...state, count: action.payLoad };
      case "setStep": {
        const newStep = action.payload;
        return { ...state, step: isNaN(newStep) ? state.step : newStep };
      }
      case "reset":
        return initialValue;
      default:
        return state;
    }
  }

  // This mutates the date objecft.
  const date = new Date("june 21 2027");
  date.setDate(date.getDate() + count);

  const dec = function () {
    dispatch({ type: "dec" });
  };

  const inc = function () {
    dispatch({ type: "inc" });
  };

  const defineCount = function (e) {
    dispatch({ type: "setCount", payload: Number(e.target.value) });
  };

  const defineStep = function (e) {
    const newStep = Number(e.target.value);
    if (!isNaN(newStep)) {
      // Check if it's not NaN
      dispatch({ type: "setStep", payload: newStep });
    } else {
      // Handle the case where the input value is not a number.
      // You could:
      // 1. Dispatch an action with a default value (e.g., 1)
      // 2. Log an error message
      console.error("Invalid input for step:", e.target.value);
      dispatch({ type: "setStep", payload: 1 }); // Or some other default
    }
  };

  const reset = function () {
    dispatch({ type: "reset" });
  };

  return (
    <div className="counter">
      <div>
        <input
          type="range"
          min="0"
          max="10"
          value={step} // Bind the value to the state
          onChange={defineStep}
        />
        <span className={"font-semibold"}>{step}</span>
      </div>

      <div>
        <button onClick={dec}>-</button>
        <input value={count} onChange={defineCount} />
        <button onClick={inc}>+</button>
      </div>

      <p>{date.toDateString()}</p>

      <div>
        <button onClick={reset}>Reset</button>
      </div>
    </div>
  );
}
export default DateCounter;
