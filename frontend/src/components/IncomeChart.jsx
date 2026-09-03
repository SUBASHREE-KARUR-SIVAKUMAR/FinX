import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function IncomeChart({ forecast }) {
  const data = {
    labels: forecast.map(x => new Date(x.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })),
    datasets: [{
      label: "Predicted income",
      data: forecast.map(x => x.predicted),
      tension: 0.35,
      borderWidth: 3,
      pointRadius: 3
    }]
  };

  return <Line data={data} options={{
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: v => `₹${v}` } } }
  }} />;
}
