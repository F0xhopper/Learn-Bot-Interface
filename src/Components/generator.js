import { useState } from "react";
import { Switch } from "@mui/material";
const Generator = () => {
  const [state, setState] = useState({
    bookCheck: true,
    documentariesCheck: true,
    podcastsCheck: true,
    youtubeVideosCheck: true,
    wikipediaArticlesCheck: true,
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const [books, setBooks] = useState();
  const [documentaries, setDocumentaries] = useState();
  const [podcasts, setPodcasts] = useState();
  const [youtubeVideos, setYoutubeVideos] = useState();
  const [wikipediaArticles, setWikipediaArticles] = useState();
  return (
    <div>
      <div className="topicInputContainer">
        <input className="topicInput"></input>
      </div>
      <div className="learnButtonContainer">
        <button className="learnButton">Learn</button>
      </div>
      <Switch
        onChange={handleChange}
        checked={state.bookCheck}
        name={"bookCheck"}
      />
      <Switch
        onChange={handleChange}
        checked={state.documentariesCheck}
        name={"documentariesCheck"}
      />
      <Switch
        onChange={handleChange}
        checked={state.podcastsCheck}
        name={"podcastsCheck"}
      />
      <Switch
        onChange={handleChange}
        checked={state.youtubeVideosCheck}
        name={"youtubeVideosCheck"}
      />
      <Switch
        onChange={handleChange}
        checked={state.wikipediaArticlesCheck}
        name={"wikipediaArticlesCheck"}
      />
    </div>
  );
};

export default Generator;
