export default function History({ data }) {
  return (
    <div>
      <h2>History</h2>
      {data.map((item, i) => (
        <div key={i}>
          <p>{item.url}</p>
          <p>{item.method}</p>
          <p>{item.responseTime} ms</p>
          <hr />
        </div>
      ))}
    </div>
  );
}