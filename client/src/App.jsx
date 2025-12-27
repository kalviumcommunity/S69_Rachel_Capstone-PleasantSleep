import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import Navbar from "./components/Navbar";
import AppRoutes from "./routes/AppRoutes";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      {}
      <Navbar />

      {}
      <div>
        <a href="https://vite.dev" target="_blank" rel="noreferrer">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank" rel="noreferrer">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>

      <h1>AI Chat App – Frontend Initialized</h1>

      <p>
        This frontend is built using React and Vite as part of the capstone
        project.
      </p>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
      </div>

      <p className="read-the-docs">
        Edit <code>src/App.jsx</code> and save to test HMR
      </p>

      {}
      <AppRoutes />
    </>
  );
}

export default App;
