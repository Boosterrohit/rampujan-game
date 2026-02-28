import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { fetchTransactionsRequest } from "../redux/playerSlice";
import { playerSelector } from "../redux/selector";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/dashboard/element/DialogContext";

interface Props {
  playerId: string;
}

const PlayerPreview: React.FC<Props> = ({ playerId }) => {
  const dispatch = useAppDispatch();
  const { transactions, loadingTransactions } = useAppSelector(playerSelector);
  const { user } = useAuth();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const role = user?.role || "agent";

  const load = () => {
    dispatch(
      fetchTransactionsRequest({ playerId, role, startDate, endDate }),
    );
  };

  useEffect(() => {
    // initial load without dates
    load();
  }, [playerId]);

  const { closeDialog } = useDialog();
  return (
    <div className="p-4 bg-[#252937] text-white rounded-md max-w-xl">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">Player Transactions</h3>
        <Button size="sm"  onClick={closeDialog}>
          Close
        </Button>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-800 text-white p-1 rounded"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-800 text-white p-1 rounded"
        />
        <Button size="sm" onClick={load}>
          Filter
        </Button>
      </div>
      {loadingTransactions ? (
        <div>Loading...</div>
      ) : (
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="py-1">Date</th>
              <th className="py-1">Type</th>
              <th className="py-1">Amount</th>
              <th className="py-1">Description</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((t) => (
              <tr key={t._id} className="border-b border-gray-700">
                <td className="py-1">{new Date(t.createdAt).toLocaleString()}</td>
                <td className="py-1">{t.type}</td>
                <td className="py-1">{t.amount}</td>
                <td className="py-1">{t.description || "-"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlayerPreview;
