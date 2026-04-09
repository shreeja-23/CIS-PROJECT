import { useState } from "react";
import axios from "axios";

export default function App() {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);

  const sendRequest = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/test", {
        url,
        method
      });
      setResponse(res.data);
    } catch (err) {
      setResponse("Error occurred");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>API Tester</h2>

      <input
        placeholder="Enter API URL"
        onChange={(e) => setUrl(e.target.value)}
      />

      <br /><br />

      <select onChange={(e) => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
      </select>

      <br /><br />

      <button onClick={sendRequest}>Send</button>

      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}