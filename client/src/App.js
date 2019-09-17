import React from "react";
import "./App.css";

// Load components
import Navber from "./components/layout/Navbar";
import MyRoute from "./MyRoute";

function App() {
  return (
    <div className="App">
      <Navber />
      <main>
        <MyRoute />
      </main>
    </div>
  );
}

export default App;
