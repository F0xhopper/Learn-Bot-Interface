import Generator from "./Components/generator";

function App() {
  return (
    <div className="App">
      <div className="titleContainer">
        <h1 className="title">Learn-Bot</h1>
      </div>
      <div className="titleContainer">
        <h3>What do you want to learn about?</h3>
      </div>
      <Generator />
    </div>
  );
}

export default App;
