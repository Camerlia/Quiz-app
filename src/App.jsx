import { useReducer } from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import { useEffect } from "react";
import Loader from "./components/Loader";
import Error from "./components/Error";
import StartScren from "./components/StartScren";

const App = () => {
  const initialState = {
    questions: [],
    status: "loading",
  };
  function reducer(state, action) {
    switch (action.type) {
      case "dataRecieved":
        return {
          ...state,
          questions: action.payload,
          status: "ready",
        };
      case "dataFailed": {
        return {
          ...state,
          state: "error",
        };
      }
    }
  }
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, status } = state;

  const quesLength = questions.length;
  useEffect(function () {
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost:8000/questions`);
        if (!res) {
          const errorMessage = await res.json();
          throw new Error(
            `${res.status} ${res.statusText}: ${
              errorMessage.message || "Server Error"
            } `
          );
        }
        const data = await res.json();
        dispatch({ type: "dataRecieved", payload: data });
      } catch (error) {
        console.log("error");
        dispatch({
          type: "dataFailed",
          payload: error.message || "An error occurred",
        });
      }
    }
    fetchData();
  }, []);
  return (
    <div className={`flex flex-col items-center justify-center pt-12`}>
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && <StartScren quesLength={quesLength}/>}
        <p>1/15</p>
        <p>Question</p>
      </Main>
    </div>
  );
};

export default App;
