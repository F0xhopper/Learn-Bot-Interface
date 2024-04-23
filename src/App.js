import Generator from "./Components/generator";

/**
 * Main application component
 * @returns {JSX.Element} The rendered application
 */
function App() {
  return (
    <div className="App">
      {" "}
      <div className="titleContainer">
        <h2 className="title">R-R-B</h2>
      </div>
      <Generator />
    </div>
  );
}

export default App;
