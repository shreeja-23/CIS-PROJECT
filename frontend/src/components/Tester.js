import { useState } from "react";
import { sendRequest } from "../api";

export default function Tester({ refresh }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [response, setResponse] = useState(null);

  const handleSend = async () => {
    const res = await sendRequest({ url, method });
    setResponse(res.data);
    refresh();
  };

  return (
    <div>
      <h2>API Tester</h2>

      <input
        placeholder="Enter API URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <select onChange={(e) => setMethod(e.target.value)}>
        <option>GET</option>
        <option>POST</option>
      </select>

      <button onClick={handleSend}>Send</button>

      {response && (
        <div>
          <p>Status: {response.status}</p>
          <p>Time: {response.responseTime} ms</p>
          <pre>{JSON.stringify(response.data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}