import { useState, useEffect } from "react";
import Linkify from "linkify-react";

/**
 * Generator Component
 *
 * Main component that allows users to input a topic they want to learn about and
 * choose a method of learning. It fetches information related to the topic
 * from an external API and presents the findings to the user
 *
 * @returns {JSX.Element} Generator component JSX
 */
const Generator = () => {
  const [state, setState] = useState({}); // Fetched data related to the topic
  const [topicInput, setTopicInput] = useState(""); // Topic desired to be learnt
  const [howInput, setHowInput] = useState(""); // Learning method
  const [stage, setStage] = useState("1"); // Tracks the current stage of interaction
  const [stage1Text, setStage1Text] = useState(""); // Text displayed for the first stage
  const [stage2Text, setStage2Text] = useState(""); // Text displayed for the second stage
  const [fetchLearnButtonText, setFetchLearnButtonText] =
    useState("Fetching...."); // Text displayed on the learn button
  const [renderState, setRenderState] = useState(false); // Rendering results state
  const [fetchTextsIndex, setFetchTextsIndex] = useState(0); // Index used for fetching text animation
  const fetchTexts = ["Fetching", "Fetching.", "Fetching..", "Fetching..."]; // Texts for fetching animation
  const firstQuestion = "What do you want to learn about?"; // Initial question text
  const [secondQuestion, setSecondQuestion] = useState(
    "How do you want to know about"
  ); // Second question text

  // Effect to update fetch text animation
  useEffect(() => {
    const intervalId = setInterval(() => {
      setFetchTextsIndex((prevIndex) => (prevIndex + 1) % fetchTexts.length);
    }, 700);

    return () => clearInterval(intervalId);
  }, []);

  // Effect to animate the first question text, starts when stage1Text is first initiated in the application
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStage1Text(firstQuestion.slice(0, stage1Text.length + 1));
    }, 80);
    return () => clearTimeout(timeout);
  }, [stage1Text]);

  // Effect to animate the second question text, start
  useEffect(() => {
    const timeout = setTimeout(() => {
      setStage2Text(secondQuestion.slice(0, stage2Text.length + 1));
    }, 80);
    return () => clearTimeout(timeout);
  }, [stage2Text]);

  // Functions

  // Function to fetch and present findings
  async function getAndPresentFindings(e) {
    if (e.key === "Enter") {
      setStage("3");
      let stateNew = state; // Creates new state object to add collected findings to
      const resourceTypes = howInput
        .split(" ")
        .filter(
          (word) =>
            word !== "and" &&
            word !== "," &&
            word !== "or" &&
            word !== "&" &&
            word !== "through"
        );
      resourceTypes.forEach((type) => {
        stateNew[type] = false;
      });

      for (const typeOf in stateNew) {
        await fetch("https://openai-api-uzyw.onrender.com/post", {
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
      setState(stateNew); // Sets the new findings object into the state
      setRenderState(true); // Renders findings state
      setFetchLearnButtonText("Learn Something Else");
    }
  }

  // Function to reload the page and start learning something else
  function learnSomethingElse() {
    window.location.reload();
  }

  // Function to initialize stage 2
  function initialiseStage2(e) {
    if (e.key === "Enter") {
      setStage("2");
      setStage2Text("");
      setSecondQuestion(
        "How would you prefer to learn about " + topicInput + "?:"
      );
    }
  }

  // Component JSX
  return (
    <div>
      {stage == "3" && renderState !== true ? (
        <div className="loading">{fetchTexts[fetchTextsIndex]}</div>
      ) : (
        <div
          style={{ display: stage != "3" ? "block" : "none" }}
          className="typedContainer"
        >
          {stage == "1" && (
            <div className="questionContainer">{stage1Text}</div>
          )}
          {stage == "2" && (
            <div className="questionContainer">{stage2Text}</div>
          )}
          {stage1Text == firstQuestion && stage == "1" && (
            <input
              style={{ width: topicInput.length + "ch" }}
              autoFocus
              className="input"
              onKeyDown={initialiseStage2}
              onChange={(e) => {
                setTopicInput(e.target.value);
              }}
            ></input>
          )}
          {stage == "2" && secondQuestion == stage2Text && (
            <input
              style={{ width: howInput.length + "ch" }}
              className="input"
              autoFocus
              onKeyDown={getAndPresentFindings}
              onChange={(e) => {
                setHowInput(e.target.value);
              }}
            ></input>
          )}{" "}
        </div>
      )}{" "}
      {renderState && (
        <div className="resultsContainer">
          <div className="learnSomeThingElseButtonContainer">
            <button
              className="learnSomeThingElseButton"
              onClick={learnSomethingElse}
            >
              {fetchLearnButtonText}
            </button>
          </div>

          <h3>Here is what I found on {topicInput}:</h3>
          {Object.keys(state).map((topic) => (
            <div>
              <h3 className="resultTopicTitle">{topic}</h3>
              {state[topic].map((piece) => (
                <p>
                  <Linkify
                    options={{
                      className: "inidividualResults",
                    }}
                  >
                    {piece}
                  </Linkify>
                </p>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Generator;
