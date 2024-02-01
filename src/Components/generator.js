import { useState, useEffect } from "react";

const Generator = () => {
  const [state, setState] = useState({});
  const [topicInput, setTopicInput] = useState();
  const [showInput, setShowInput] = useState(false);
  const [howInput, setHowInput] = useState();
  const [stage, setStage] = useState("1");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [fetchLearnButtonText, setFetchLearnButtonText] =
    useState("Fetching....");
  const [renderState, setRenderState] = useState(false);
  async function getResources(e) {
    if (e.key == "Enter") {
      setFetchLearnButtonText("Just fetching...");
      setStage("3");
      let stateNew = state;
      const resourceTypess = howInput.split(" ");
      resourceTypess.forEach((type) => {
        stateNew[type] = false;
      });

      for (const typeOf in stateNew) {
        await fetch("http://127.0.0.1:5000/post", {
          method: "post",

          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
          },
          body: JSON.stringify({ topic: topicInput, type: typeOf }),
        })
          .then((response) => {
            return response.json();
          })
          .then((data) => {
            stateNew[typeOf] = data;
          });
      }

      setState(stateNew);
      setRenderState(true);
      setFetchLearnButtonText("Learn Something Else");
    }
  }

  function learnSomethingElse() {
    window.location.reload();
  }

  const questionText = "What do you want to learn about?:";
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText1(questionText.slice(0, text1.length + 1));
    }, 80);
    return () => clearTimeout(timeout);
  }, [text1]);
  const [secondQuestion, setSecondQuestion] = useState(
    "How do you want to know about"
  );
  function nextStage(e) {
    if (e.key == "Enter") {
      setStage("2");
      setText2("");
      setShowInput(false);
      setSecondQuestion("How do you want to learn about " + topicInput + " ?:");
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText2(secondQuestion.slice(0, text2.length + 1));
    }, 80);
    return () => clearTimeout(timeout);
  }, [text2]);
  return (
    <div>
      {stage == "3" ? (
        <div
          style={{
            marginTop: renderState ? "0px" : "400px",
          }}
          className="learnSomeThingElseButtonContainer"
        >
          <button
            className="learnSomeThingElseButton"
            onClick={learnSomethingElse}
          >
            {fetchLearnButtonText}
          </button>
        </div>
      ) : (
        <div className="typedContainer">
          {stage == "1" ? (
            <div className="questionContainer">{text1}</div>
          ) : null}
          {stage == "2" ? (
            <div className="questionContainer">{text2}</div>
          ) : null}
          {text1 == questionText && stage == "1" ? (
            <input
              autoFocus
              className="input"
              onKeyDown={nextStage}
              onChange={(e) => {
                setTopicInput(e.target.value);
              }}
            ></input>
          ) : null}
          {stage == "2" && secondQuestion == text2 ? (
            <input
              className="input"
              autoFocus
              placeholder=""
              onKeyDown={getResources}
              onChange={(e) => {
                setHowInput(e.target.value);
              }}
            ></input>
          ) : null}{" "}
        </div>
      )}
      {renderState ? <h4>This is what we found on {topicInput}:</h4> : null}
      {renderState
        ? Object.keys(state).map((topic) => (
            <div>
              <h3>{topic}</h3>
              {state[topic].map((piece) => (
                <p>{piece}</p>
              ))}
            </div>
          ))
        : null}

      {/* <div className="mainResourceDisplayContainer">
        {state.map((topic) => (
          <div className="mainDisplayContainer">
            <h2>{topic}</h2>
          </div>
        ))}
      </div> */}
    </div>
  );
};
export default Generator;
