import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>SFU Surge frontend technical :)</h1>
      <div className="card">
        <p>
          Implement the provided design on this page, using the data found in
          "reviews.json"
        </p>
      </div>
    </>
  );
}

export default App;
