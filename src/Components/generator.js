import { useState } from "react";
import { FormControlLabel, Switch } from "@mui/material";
const Generator = () => {
  const [state, setState] = useState({
    bookCheck: [true, "books"],
    documentariesCheck: [true, "documentaries"],
    podcastsCheck: [true, "podcasts"],
    youtubeVideosCheck: [true, "youtube videos"],
    wikipediaArticlesCheck: [true, "wikipedia articles"],
  });
  const [topicInput, setTopicInput] = useState();
  const [books, setBooks] = useState();
  const [documentaries, setDocumentaries] = useState();
  const [podcasts, setPodcasts] = useState();
  const [youtubeVideos, setYoutubeVideos] = useState();
  const [wikipediaArticles, setWikipediaArticles] = useState();
  const [learnButtonText, setLearnButtonText] = useState("Learn");
  function setAllResourceUndefined() {
    setBooks(undefined);
    setDocumentaries(undefined);
    setPodcasts(undefined);
    setYoutubeVideos(undefined);
    setWikipediaArticles(undefined);
  }
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: [event.target.checked, state[event.target.name][1]],
    });
  };
  async function getResources() {
    setAllResourceUndefined();
    setLearnButtonText("fetching....");
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
    setTopicInput("");
    setLearnButtonText("Learn");
  }
  return (
    <div>
      <div
        style={{
          marginTop:
            books ||
            documentaries ||
            podcasts ||
            youtubeVideos ||
            wikipediaArticles
              ? "0px"
              : "300px",
        }}
        className="mainFunctionContainer"
      >
        <div className="topicInputContainer">
          <div className="titleContainer">
            <h4>What do you want to learn about?</h4>
          </div>
          <div className="topicInputContainer">
            <input
              value={topicInput}
              className="topicInput"
              onChange={(e) => setTopicInput(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="switchesContainer">
          {" "}
          {topicInput ? (
            <h4 className="howTitle">
              How do you want to learn about {topicInput}?
            </h4>
          ) : (
            <h4 className="howTitle">How do you want to learn about it?</h4>
          )}
          <div className="switchContainer">
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  color="default"
                  onChange={handleChange}
                  checked={state.bookCheck[0]}
                  name={"bookCheck"}
                />
              }
              label="Books"
              labelPlacement="top"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  color="default"
                  onChange={handleChange}
                  checked={state.documentariesCheck[0]}
                  name={"documentariesCheck"}
                />
              }
              label="Documentaries"
              labelPlacement="top"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  color="default"
                  onChange={handleChange}
                  checked={state.podcastsCheck[0]}
                  name={"podcastsCheck"}
                />
              }
              label="Podcasts"
              labelPlacement="top"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  color="default"
                  onChange={handleChange}
                  checked={state.youtubeVideosCheck[0]}
                  name={"youtubeVideosCheck"}
                />
              }
              label="Youtube Videos"
              labelPlacement="top"
            />
            <FormControlLabel
              control={
                <Switch
                  size="small"
                  color="default"
                  onChange={handleChange}
                  checked={state.wikipediaArticlesCheck[0]}
                  name={"wikipediaArticlesCheck"}
                />
              }
              label="Wiki Articles"
              labelPlacement="top"
            />
          </div>
          <div className="learnButtonContainer">
            <button className="learnButton" onClick={getResources}>
              <h4>{learnButtonText}</h4>
            </button>
          </div>{" "}
        </div>
        <div className="mainResourceDisplayContainer">
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
    </div>
  );
};

export default Generator;
