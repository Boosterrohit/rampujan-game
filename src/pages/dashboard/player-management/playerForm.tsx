import * as Yup from "yup";
import { Form, Formik } from "formik";
import AppInput from "@/components/dashboard/element/AppInput";
import AppButton from "@/components/dashboard/element/AppButton";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";

import { useAuth } from "@/contexts/AuthContext";
import { useDialog } from "@/components/dashboard/element/DialogContext";
import { depositRequest, depositReset, fetchAgentsRequest, fetchPlayersRequest } from "../redux/playerSlice";
import { playerSelector } from "../redux/selector";

const PlayerForm = () => {
  const dispatch = useAppDispatch();
  const { user } = useAuth();
  const { players, agents, depositLoading, depositError } = useAppSelector(playerSelector);

  // defensive copies in case selector returns non-array or contains null/undefined entries
  const safePlayers = Array.isArray(players) ? players.filter((p) => p != null) : [];
  const safeAgents = Array.isArray(agents) ? agents.filter((a) => a != null) : [];
  const [manualCredit, setManualCredit] = useState(false);
  const [creditAmount, setCreditAmount] = useState(0);
  const [selectedAgent, setSelectedAgent] = useState("");

  const initialState = {
    agentId: "",
    playerId: "",
    deposit: "",
    credit: "",
    description: "",
  };

  const validationSchema = Yup.object({
    playerId: Yup.string().required("Player is required"),
    deposit: Yup.number().positive().required("Deposit is required"),
    credit: Yup.number().positive().required("Credit is required"),
  });

  useEffect(() => {
    // clear any previous deposit status when dialog opens
    dispatch(depositReset());
    // load players for dropdown, admin may specify assignedAgent later via filter
    if (user?.role === "agent") {
      dispatch(fetchPlayersRequest({ page: 1, limit: 100, assignedAgent: user.userId }));
    } else {
      dispatch(fetchPlayersRequest({ page: 1, limit: 100 }));
      dispatch(fetchAgentsRequest());
    }
  }, [dispatch, user]);

  const handleDepositChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any,
  ) => {
    const val = e.target.value;
    setFieldValue("deposit", val);
    if (!manualCredit && val && !isNaN(Number(val))) {
      // calculate credit via API
      try {
        const { axiosInstance } = await import("@/utils/axiosInstance");
        const res = await axiosInstance.get(
          `/agent/calculate-credit?deposit=${encodeURIComponent(val)}`,
        );
        if (res.data?.data?.creditAmount) {
          setCreditAmount(res.data.data.creditAmount);
          setFieldValue("credit", res.data.data.creditAmount);
        }
      } catch (err) {
        console.warn("credit calc error", err);
      }
    }
  };

  const { closeDialog } = useDialog();

  const handleSubmit = async (values: any) => {
    const payload: any = {
      playerId: values.playerId,
      amount: Number(values.deposit),
      description: values.description,
    };
    // If admin, include agentId in the request
    if (user?.role === "admin" && selectedAgent) {
      payload.agentId = selectedAgent;
    }
    dispatch(depositRequest(payload));
  };

  // when deposit succeeds, close dialog automatically
  const { depositSuccess } = useAppSelector(playerSelector);
  useEffect(() => {
    if (depositSuccess) {
      closeDialog();
    }
  }, [depositSuccess, closeDialog]);

  return (
    <div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values }) => {
          // Filter players by selected agent if admin
          const filteredPlayers = user?.role === "admin" && selectedAgent
            ? safePlayers
                .filter((p) => p && p.assignedAgent) // drop any nulls again
                .filter((p) => {
                  const agentId = typeof p.assignedAgent === 'object' ? p.assignedAgent._id : p.assignedAgent;
                  return agentId === selectedAgent;
                })
            : safePlayers;

          return (
            <Form>
              <div className="my-6 gap-3">
                {user?.role === "admin" ? (
                  <>
                    <div className="w-full mb-5">
                      <label className="block text-sm font-medium text-gray-200">
                        Select Agent
                      </label>
                      <select
                        value={selectedAgent}
                        onChange={(e) => {
                          setSelectedAgent(e.target.value);
                          setFieldValue("playerId", "");
                        }}
                        className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white"
                      >
                        <option value="">Choose an agent</option>
                        {safeAgents.map((a) => (
                          <option key={a._id} value={a._id}>
                            {a.username}
                          </option>
                        ))}
                      </select>
                    </div>
                    {selectedAgent && (
                      <div className="w-full mb-5">
                        <label className="block text-sm font-medium text-gray-200">
                          Player
                        </label>
                        <select
                          id="playerId"
                          name="playerId"
                          value={values.playerId}
                          onChange={(e) => setFieldValue("playerId", e.target.value)}
                          className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white"
                        >
                          <option value="">Select player</option>
                          {filteredPlayers.map((p) => (
                            <option key={p._id} value={p._id}>
                              {p.username} ({p.email})
                            </option>
                          ))}
                        </select>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="w-full mb-5">
                    <label className="block text-sm font-medium text-gray-200">
                      Player
                    </label>
                    <select
                      id="playerId"
                      name="playerId"
                      value={values.playerId}
                      onChange={(e) => setFieldValue("playerId", e.target.value)}
                      className="mt-1 block w-full rounded-md bg-gray-800 border-gray-600 text-white"
                    >
                      <option value="">Select player</option>
                      {safePlayers.map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.username} ({p.email})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="w-full mb-5">
                  <AppInput
                    id="deposit"
                    label="Deposit Amount"
                    name="deposit"
                    value={values.deposit}
                    required
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleDepositChange(e, setFieldValue)
                    }
                  />
                </div>

                <div className="w-full mb-5">
                  <AppInput
                    id="credit"
                    label="Credit Amount"
                    name="credit"
                    value={values.credit}
                    required
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setManualCredit(true);
                      setFieldValue("credit", e.target.value);
                    }}
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    Calculated automatically unless you edit manually
                  </p>
                </div>

                <div className="w-full">
                  <AppInput
                    id="description"
                    label="Description (optional)"
                    name="description"
                    value={values.description}
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("description", e.target.value);
                    }}
                  />
                </div>
              </div>

              {depositError && (
                <div className="text-red-500 text-sm mb-2">
                  {depositError}
                </div>
              )}
              <AppButton
                label={depositLoading ? "Submitting..." : "Submit"}
                type="submit"
                disabled={depositLoading}
                className="w-full rounded-md text-white !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default PlayerForm;

