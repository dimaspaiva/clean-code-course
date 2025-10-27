import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [document, setDocument] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function signup() {
    try {
      console.log(JSON.stringify({ name, email, document, password }));
      const response = await fetch("http://localhost:3000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, document, password }),
      });
      const data = await response.json();

      if (data.accountId) {
        setMessage("success");
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="main">
      <label>
        Name
        <input
          type="text"
          className="input-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label>
        E-mail
        <input
          type="text"
          className="input-email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <label>
        Document
        <input
          type="text"
          className="input-document"
          value={document}
          onChange={(e) => setDocument(e.target.value)}
        />
      </label>
      <label>
        Password
        <input
          type="password"
          className="input-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button className="button-signup" onClick={signup}>
        Sign Up
      </button>

      {message && <span className="span-message">{message}</span>}
    </div>
  );
}

export default App;
