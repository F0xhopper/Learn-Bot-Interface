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
          })
          .then(console.log(state));
      }
    }
  }
  return (
    <div>
      <div className="topicInputContainer">
        <input
          className="topicInput"
          onChange={(e) => setTopicInput(e.target.value)}
        ></input>
      </div>

      <div className="switchesContainer">
        {" "}
        <h5 className="howTitle">How do you want to learn About?</h5>
        <FormControlLabel
          control={
            <Switch
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
          Learn
        </button>
      </div>
      <div className="mainResourceDisplayContainer">
        {books ? (
          <div className="mainDisplayContainer">
            <h2>books</h2>
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
            <h2>podcasts</h2>
            {podcasts.map((book) => (
              <p>{book}</p>
            ))}
          </div>
        ) : null}
        {youtubeVideos ? (
          <div className="mainDisplayContainer">
            <h2>youtube Videos</h2>
            {youtubeVideos.map((book) => (
              <p>{book}</p>
            ))}
          </div>
        ) : null}
        {wikipediaArticles ? (
          <div className="mainDisplayContainer">
            <h2>wikipedia Articles</h2>
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
