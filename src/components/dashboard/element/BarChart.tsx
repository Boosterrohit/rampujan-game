import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export default function BarChart() {
  const data = {
    labels: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    datasets: [
      {
        label: "revenue",
        data: [65, 100, 200, 150, 300, 250, 110],
        backgroundColor: "rgba(173, 216, 230, 0.6)", // light blue
        borderColor: "rgba(173, 216, 230, 1)",
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: "payouts",
        data: [45, 149, 160, 51, 236, 145, 60],
        backgroundColor: "rgba(255, 105, 180, 0.6)", // pink
        borderColor: "rgba(255, 105, 180, 1)",
        borderWidth: 1,
        borderRadius: 6,
      },
    ],
  };

 const options = {
  responsive: true,
  scales: {
    y: {
      beginAtZero: true,
      max: 300, // top value
      ticks: {
        callback: (value: string | number) => `$${value}`,
      },
    },
  },
  plugins: {
    legend: {
      position: "bottom" as const,
      labels: {
        boxWidth: 14,
        usePointStyle: true,
        pointStyle: "rectRounded",
      },
    },
  },
};


  return (
    <div style={{ width: 600, margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}
