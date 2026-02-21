import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js"
import { Doughnut } from "react-chartjs-2"

ChartJS.register(ArcElement, Tooltip, Legend)

export default function DoughnutChart() {
  const colors = [
    "rgba(37, 99, 235, 0.8)",  // Blue
    "rgba(34, 197, 94, 0.8)",  // Green
    "rgba(245, 158, 11, 0.8)", // Amber
    "rgba(239, 68, 68, 0.8)",  // Red
    "rgba(139, 92, 246, 0.8)", // Purple
  ]

  const borderColors = [
    "rgba(37, 99, 235, 1)",
    "rgba(34, 197, 94, 1)",
    "rgba(245, 158, 11, 1)",
    "rgba(239, 68, 68, 1)",
    "rgba(139, 92, 246, 1)",
  ]

  const data = {
    labels: ["Juwan", "Kamis", "Jumat", "Sabtu", "Panda"],
    datasets: [
      {
        data: [300, 150, 200, 100, 50],
        backgroundColor: colors,
        borderColor: borderColors,
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  }

  const options = {
    responsive: true,
    cutout: "65%",
    plugins: {
      legend: {
        position: "bottom" as const,
        labels: {
          usePointStyle: true,
          pointStyle: "circle" as const,
        },
      },
    },
  }

  return (
    <div style={{ width: 300, margin: "auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  )
}
