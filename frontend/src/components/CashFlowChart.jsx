import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function CashFlowChart({ dashboard }) {
  const income = dashboard.forecast.map(x => x.predicted);
  const labels = dashboard.forecast.map(x => new Date(x.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" }));
  const data = {
    labels,
    datasets: [{
      label: "Predicted income",
      data: income,
      borderWidth: 1
    }]
  };
  return <Bar data={data} options={{
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { ticks: { callback: v => `₹${v}` } } }
  }} />;
}
