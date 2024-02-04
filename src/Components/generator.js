import { useState, useEffect } from "react";

const Generator = () => {
  const [state, setState] = useState({});
  const [topicInput, setTopicInput] = useState("1");
  const [showInput, setShowInput] = useState(false);
  const [howInput, setHowInput] = useState("1");
  const [stage, setStage] = useState("1");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  const [fetchLearnButtonText, setFetchLearnButtonText] =
    useState("Fetching....");
  const [renderState, setRenderState] = useState(false);

  function delay(ms) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }

  async function loadingText() {
    setFetchLearnButtonText("Just fetching");
    await delay(400);
    setFetchLearnButtonText("Just fetching..");
    await delay(400);
    setFetchLearnButtonText("Just fetching...");
    await delay(400);
    setFetchLearnButtonText("Just fetching....");
    await delay(400);
  }
  async function getResources(e) {
    if (e.key == "Enter") {
      for (let i = 0; i < 20; i++) {
        loadingText();
      }
      setStage("3");
      let stateNew = state;
      let resourceTypess = howInput.split(" ");
      resourceTypess = resourceTypess.filter(
        (word) =>
          word !== "and" &&
          word !== "," &&
          word !== "or" &&
          word !== "&" &&
          word !== "through"
      );
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
      setSecondQuestion(
        "How would you prefer to learn about " + topicInput + "?:"
      );
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
      {stage == "3" && renderState !== true ? (
        <div className="loading">Fetching...</div>
      ) : (
        <div
          style={{ display: stage != "3" ? "block" : "none" }}
          className="typedContainer"
        >
          {stage == "1" ? (
            <div className="questionContainer">{text1}</div>
          ) : null}
          {stage == "2" ? (
            <div className="questionContainer">{text2}</div>
          ) : null}
          {text1 == questionText && stage == "1" ? (
            <input
              style={{ width: topicInput.length + "ch" }}
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
              style={{ width: howInput.length + "ch" }}
              className="input"
              autoFocus
              onKeyDown={getResources}
              onChange={(e) => {
                setHowInput(e.target.value);
              }}
            ></input>
          ) : null}{" "}
        </div>
      )}
      <div className="resultsContainer">
        {renderState ? (
          <div className="learnSomeThingElseButtonContainer">
            <button
              className="learnSomeThingElseButton"
              onClick={learnSomethingElse}
            >
              {fetchLearnButtonText}
            </button>
          </div>
        ) : null}
        {renderState ? <h3>Here is what I found on {topicInput}:</h3> : null}
        {renderState
          ? Object.keys(state).map((topic) => (
              <div>
                <h3 className="resultTopicTitle">{topic}</h3>
                {state[topic].length != 0 ? (
                  state[topic].map((piece) => <p>{piece}</p>)
                ) : (
                  <div>
                    Sorry we couldnt find any {topic} on {topicInput}
                  </div>
                )}
              </div>
            ))
          : null}
      </div>
    </div>
  );
};
export default Generator;
