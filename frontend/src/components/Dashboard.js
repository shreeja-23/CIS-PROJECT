import { Line } from "react-chartjs-2";

export default function Dashboard({ data }) {
  const chartData = {
    labels: data.map(d => new Date(d.createdAt).toLocaleTimeString()),
    datasets: [
      {
        label: "Response Time",
        data: data.map(d => d.responseTime)
      }
    ]
  };

  return <Line data={chartData} />;
}