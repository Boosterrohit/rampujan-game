
import { useAppSelector } from "@/hooks/appHooks";
import { dashboardSelector } from "@/pages/dashboard/redux/selector";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function BarChart() {
  const { agentPlayers } = useAppSelector(dashboardSelector);

  const safeAgentPlayers = Array.isArray(agentPlayers) ? agentPlayers : [];

  const labels = safeAgentPlayers.map((group) => group.agent.username);
  const playerCounts = safeAgentPlayers.map((group) => group.players.length);
  const verifiedCounts = safeAgentPlayers.map(
    (group) => group.players.filter((p) => p.isVerified).length
  );

  const data = {
    labels,
    datasets: [
      {
        label: "Total Players",
        data: playerCounts,
        backgroundColor: "rgba(173, 216, 230, 0.6)",
        borderColor: "rgba(173, 216, 230, 1)",
        borderWidth: 1,
        borderRadius: 6,
      },
      {
        label: "Verified Players",
        data: verifiedCounts,
        backgroundColor: "rgba(255, 105, 180, 0.6)",
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
        ticks: {
          stepSize: 1,
          callback: (value: string | number) => `${value}`,
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

  if (safeAgentPlayers.length === 0) {
    return (
      <div className="h-full flex items-center justify-center text-gray-400">
        No data to display
      </div>
    );
  }

  return (
    <div style={{ width: "100%", margin: "auto" }}>
      <Bar data={data} options={options} />
    </div>
  );
}