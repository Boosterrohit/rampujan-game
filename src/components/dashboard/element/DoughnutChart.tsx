
import { availableGames } from "@/data/dashboard";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

// Pass availableGames as a prop or import directly

export default function DoughnutChart() {
  // Count games per category
  const categoryCount: Record<string, number> = {};
  availableGames.forEach((game) => {
    categoryCount[game.category] = (categoryCount[game.category] || 0) + 1;
  });

  const labels = Object.keys(categoryCount);
  const counts = Object.values(categoryCount);

  const colors = [
    "rgba(37, 99, 235, 0.8)",
    "rgba(34, 197, 94, 0.8)",
    "rgba(245, 158, 11, 0.8)",
    "rgba(239, 68, 68, 0.8)",
    "rgba(139, 92, 246, 0.8)",
    "rgba(255, 105, 180, 0.8)",
    "rgba(20, 184, 166, 0.8)",
    "rgba(249, 115, 22, 0.8)",
  ];

  const borderColors = colors.map((c) => c.replace("0.8", "1"));

  const data = {
    labels,
    datasets: [
      {
        data: counts,
        backgroundColor: colors.slice(0, labels.length),
        borderColor: borderColors.slice(0, labels.length),
        borderWidth: 2,
        hoverOffset: 8,
      },
    ],
  };

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
  };

  return (
    <div style={{ width: 300, margin: "auto" }}>
      <Doughnut data={data} options={options} />
    </div>
  );
}