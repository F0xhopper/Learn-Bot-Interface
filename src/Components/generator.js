import { useState, useEffect } from "react";

const Generator = () => {
  const [state, setState] = useState({
    bookCheck: [false, "books"],
    documentariesCheck: [false, "documentaries"],
    podcastsCheck: [false, "podcasts"],
    youtubeVideosCheck: [false, "youtube videos"],
    wikipediaArticlesCheck: [false, "wikipedia articles"],
  });
  const [topicInput, setTopicInput] = useState();
  const [books, setBooks] = useState();
  const [documentaries, setDocumentaries] = useState();
  const [podcasts, setPodcasts] = useState();
  const [youtubeVideos, setYoutubeVideos] = useState();
  const [wikipediaArticles, setWikipediaArticles] = useState();
  const [showInput, setShowInput] = useState(false);
  const [howInput, setHowInput] = useState();
  const [stage, setStage] = useState("1");
  const [text1, setText1] = useState("");
  const [text2, setText2] = useState("");
  function setAllResourceUndefined() {
    setBooks(undefined);
    setDocumentaries(undefined);
    setPodcasts(undefined);
    setYoutubeVideos(undefined);
    setWikipediaArticles(undefined);
  }
  async function getResources(e) {
    if (e.key == "Enter") {
      setStage("3");
      let stateNew = state;
      for (const typeOf in state) {
        if (
          howInput
            .toUpperCase()
            .includes(state[typeOf][1].toString().toUpperCase())
        ) {
          stateNew[typeOf] = [true, state[typeOf][1]];
        }
      }
      setState(stateNew);

      setAllResourceUndefined();

      for (const typeOf in state) {
        if (state[typeOf][0] == true) {
          await fetch("http://127.0.0.1:5000/post", {
            method: "post",

            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ topic: topicInput, type: state[typeOf][1] }),
          })
            .then((response) => {
              return response.json();
            })
            .then((data) => {
              console.log(data);
              if (typeOf == "bookCheck") {
                setBooks(data);
              } else if (typeOf == "documentariesCheck") {
                setDocumentaries(data);
              } else if (typeOf == "podcastsCheck") {
                setPodcasts(data);
              } else if (typeOf == "youtubeVideosCheck") {
                setYoutubeVideos(data);
              } else if (typeOf == "wikipediaArticlesCheck") {
                setWikipediaArticles(data);
              }
            });
        }
      }
    }
  }
  function sleep(ms) {
    return new Promise((r) => setTimeout(r, ms));
  }
  const questionText = "What do you want to learn about?";
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText1(questionText.slice(0, text1.length + 1));
    }, 100);
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
      setSecondQuestion("How do you want to learn about " + topicInput + " ?");
    }
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setText2(secondQuestion.slice(0, text2.length + 1));
    }, 100);
    return () => clearTimeout(timeout);
  }, [text2]);
  return (
    <div>
      <div className="typedContainer">
        {stage == "1" ? <div>{text1}</div> : null}
        {stage == "2" ? <div>{text2}</div> : null}
        {text1 == questionText && stage == "1" ? (
          <input
            className="input"
            onKeyDown={nextStage}
            onChange={(e) => {
              setTopicInput(e.target.value);
            }}
          ></input>
        ) : null}
        {stage == "2" && secondQuestion == text2 ? (
          <input
            placeholder=""
            onKeyDown={getResources}
            onChange={(e) => {
              setHowInput(e.target.value);
            }}
          ></input>
        ) : null}
      </div>

      <div
        style={{
          display:
            books ||
            documentaries ||
            podcasts ||
            youtubeVideos ||
            wikipediaArticles
              ? "Block"
              : "None",
        }}
        className="mainResourceDisplayContainer"
      >
        {books ? (
          <div className="mainDisplayContainer">
            <h2>Books</h2>
            {books.map((book) => (
              <p>{book}</p>
            ))}
          </div>
        ) : null}
        {documentaries ? (
          <div className="mainDisplayContainer">
            <h2>Dcumentaries</h2>
            {documentaries.map((book) => (
              <p>{book}</p>
            ))}
          </div>
        ) : null}
        {podcasts ? (
          <div className="mainDisplayContainer">
            <h2>Podcasts</h2>
            {podcasts.map((book) => (
              <p>{book}</p>
            ))}
          </div>
        ) : null}
        {youtubeVideos ? (
          <div className="mainDisplayContainer">
            <h2>Youtube Videos</h2>
            {youtubeVideos.map((book) => (
              <p>{book}</p>
            ))}
          </div>
        ) : null}
        {wikipediaArticles ? (
          <div className="mainDisplayContainer">
            <h2>Wikipedia Articles</h2>
            {wikipediaArticles.map((book) => (
              <p>{book}</p>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Generator;
