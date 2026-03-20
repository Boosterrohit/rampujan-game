import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { fetchPlayerByIdRequest, fetchTransactionsRequest } from "../redux/playerSlice";
import { playerSelector } from "../redux/selector";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { useDialog } from "@/components/dashboard/element/DialogContext";

interface Props {
  playerId: string;
}

const PlayerPreview: React.FC<Props> = ({ playerId }) => {
  const dispatch = useAppDispatch();
  const { transactions, loadingTransactions, selectedPlayer, loadingPlayerDetails } = useAppSelector(playerSelector);
  const { user } = useAuth();
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const load = () => {
    dispatch(
      fetchTransactionsRequest({ playerId, role: user?.role || "agent", startDate, endDate }),
    );
  };

  useEffect(() => {
    dispatch(fetchPlayerByIdRequest(playerId));
    // initial load without dates
    load();
  }, [playerId]);

  const { closeDialog } = useDialog();
  return (
    <div className="md:p-4 bg-[#252937] text-white rounded-md md:max-w-3xl max-w-lg w-full">
      <div className="flex justify-between mb-4">
        <h3 className="text-lg font-bold">Player Details & Transactions</h3>
        {/* <Button size="sm"  onClick={closeDialog}>
          Close
        </Button> */}
      </div>

      <div className="mb-4 rounded-md border border-gray-700 p-3">
        <h4 className="font-semibold mb-2">Player Details</h4>
        {loadingPlayerDetails ? (
          <div className="text-sm text-gray-300">Loading player details...</div>
        ) : selectedPlayer ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            <p><span className="text-gray-400">Name:</span> {selectedPlayer.username || "-"}</p>
            <p><span className="text-gray-400">Email:</span> {selectedPlayer.email || "-"}</p>
            <p><span className="text-gray-400">Status:</span> {selectedPlayer.isSuspended ? "Suspended" : "Active"}</p>
            <p><span className="text-gray-400">Verified:</span> {selectedPlayer.isVerified ? "Yes" : "No"}</p>
            <p><span className="text-gray-400">Wallet:</span> {selectedPlayer.walletBalance ?? 0}</p>
            <p><span className="text-gray-400">Created:</span> {selectedPlayer.createdAt ? new Date(selectedPlayer.createdAt).toLocaleString() : "-"}</p>
          </div>
        ) : (
          <div className="text-sm text-gray-300">No player details found.</div>
        )}
      </div>

      <div className="flex md:flex-row flex-col gap-2 mb-4">
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="bg-gray-800 text-white p-1 rounded border border-white/50 bg-transparent"
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="bg-gray-800 text-white p-1 rounded border border-white/50 bg-transparent"
        />
        <Button size="sm" onClick={load} className="w-full rounded-md text-white !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none">
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
            {transactions && transactions.length > 0 ? (
              transactions.map((t, idx) => {
                if (!t || !t._id) return null;
                return (
                  <tr key={t._id} className="border-b border-gray-700">
                    <td className="py-1">
                      {t.createdAt ? new Date(t.createdAt).toLocaleString() : "-"}
                    </td>
                    <td className="py-1">{t.type || "-"}</td>
                    <td className="py-1">{t.amount ?? "-"}</td>
                    <td className="py-1">{t.description || "-"}</td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4">
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PlayerPreview;
