import { useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScren from "./components/StartScren";
import Question from "./components/Question";
import NextButton from "./components/NextButton";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Footer from "./components/Footer";
import Timer from "./components/Timer";
const SECS_PER_QUESTION = 30;
const App = () => {
  const initialState = {
    questions: [],
    status: "loading",
    index: 0,
    answer: null,
    points: 0,
    highscore: 0,
    secondsRemaining: null,
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataRecieved":
        return { ...state, questions: action.payload, status: "ready" };
      case "dataFailed": {
        return { ...state, status: "error" };
      }
      case "start": {
        return { ...state, status: "active",
          secondsRemaining: state.questions.length * SECS_PER_QUESTION,
         };
      }
      case "newAnswer": {
        const question = state.questions.at(state.index);

        return {
          ...state,
          answer: action.payload,
          points:
            action.payload === question.correctOption
              ? state.points + question.points
              : state.points,
        };
      }
      case "newQuestion": {
        return {
          ...state,
          index: state.index + 1,
          answer: null,
        };
      }
      case "finish": {
        return {
          ...state,
          status: "finished",
          highscore:
            state.points > state.highscore ? state.points : state.highscore,
        };
      }
      case "restart": {
        return {
          ...initialState,
          status: "ready",
          questions: state.questions,
        };
      }
      case "tick":{
        return{
          ...state,
          secondsRemaining: state.secondsRemaining - 1,
          status: state.secondsRemaining === 0 ? "finished" : state.status
        }
      }
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highscore,
    secondsRemaining,
  } = state;

  const quesLength = questions.length;
  const maxPossiblePoints = questions.reduce((a, b) => a + b.points, 0);
  useEffect(function () {
    async function fetchData() {
      const res = await fetch(`/questions.json`);
      if (!res) {
        dispatch({ type: "dataFailed" });
      }
      const data = await res.json();
      console.log(data);
      dispatch({ type: "dataRecieved", payload: data.questions });
    }
    fetchData();
  }, []);
  return (
    <div className={`flex flex-col items-center justify-center pt-12`}>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScren quesLength={quesLength} dispatch={dispatch} />
        )}
        {status === "active" && (
          <>
            <Progress
              maxPossiblePoints={maxPossiblePoints}
              index={index}
              points={points}
              quesLength={quesLength}
              answer={answer}
            />
            <Question
              question={questions[index]}
              answer={answer}
              dispatch={dispatch}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              <NextButton
                dispatch={dispatch}
                answer={answer}
                quesLength={quesLength}
                index={index}
              />
            </Footer>
          </>
        )}
        {status === "finished" && (
          <FinishScreen
            highscore={highscore}
            maxPossiblePoints={maxPossiblePoints}
            points={points}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
};

export default App;
