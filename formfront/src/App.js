import React, { useState } from "react";

import "./App.css";
import Axios from "axios";

function App() {
  const [name, setName] = useState();
  const [file, setFile] = useState();

  const send = async (e) => {
    e.preventDefault();
    console.log("name", name);
    console.log("file", file);
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    const resp = await Axios.post("http://localhost:3001/upload", data);
    console.log("RESP", resp);
  };

  return (
    <div className="App">
      <header className="App-header">
        <form action="#">
          <div className="flex">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              onChange={(event) => {
                const { value } = event.target;
                setName(value);
              }}
            />
          </div>
          <div className="flex">
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </div>
        </form>
        <button onClick={send}>Send</button>
      </header>
    </div>
  );
}

export default App;
