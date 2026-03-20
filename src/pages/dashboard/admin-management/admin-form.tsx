
import * as Yup from "yup";
import { Form, Formik } from "formik";
import AppInput from "@/components/dashboard/element/AppInput";
import AppButton from "@/components/dashboard/element/AppButton";
import { AgentCreationData } from "../redux/types";
import { useAppDispatch, useAppSelector } from "@/hooks/appHooks";
import { dashboardSelector } from "../redux/selector";
import { createAgentRequest, updateAgentRequest } from "../redux/dashboardSlice";
import { useDialog } from "@/components/dashboard/element/DialogContext";

interface AdminFormProps {
  initialValues?: AgentCreationData;
  isEdit?: boolean;
}

const AdminForm: React.FC<AdminFormProps> = ({ initialValues, isEdit }) => {
  const dispatch = useAppDispatch();
  const { closeDialog } = useDialog();
  const { loading } = useAppSelector(dashboardSelector);

  const initialState: AgentCreationData = initialValues || {
    email: "",
    password: "",
    username: "",
    walletBalance: 0,
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: isEdit
      ? Yup.string()
      : Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
    walletBalance: Yup.number().required("Initial balance is required"),
  });

  const handleSubmit = async (values: AgentCreationData) => {
    if (isEdit) {
      dispatch(updateAgentRequest({ ...values, onSuccess: closeDialog }));
    } else {
      dispatch(createAgentRequest({ ...values, onSuccess: closeDialog }));
    }
  };

  return (
    <div>
      <Formik
        initialValues={initialState}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, handleSubmit: handleFormikSubmit }) => (
          <Form
            onSubmit={(event) => {
              event.preventDefault();
              handleFormikSubmit(event);
            }}
          >
            <div className="my-6 flex md:flex-row flex-col gap-3">
              <div className="w-full">
                <AppInput
                  id="username"
                  label="Username"
                  name="username"
                  value={values?.username}
                  required
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("username", e.target.value);
                  }}
                />
              </div>
              <div className="w-full">
                <AppInput
                  id="email"
                  label="Email"
                  name="email"
                  value={values?.email}
                  required
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("email", e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="my-6 flex md:flex-row flex-col gap-3">
              <div className="w-full">
                <AppInput
                  id="initialBalance"
                  label="Initial Balance"
                  name="walletBalance"
                  value={values?.walletBalance.toString()}
                  required
                  className="w-full"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    setFieldValue("walletBalance", parseFloat(e.target.value) || 0);
                  }}
                />
              </div>

              {!isEdit && (
                <div className="w-full">
                  <AppInput
                    id="password"
                    label="Password"
                    name="password"
                    type="password"
                    value={values?.password}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue("password", e.target.value);
                    }}
                  />
                </div>
              )}
            </div>

            <AppButton
              label="Submit"
              type="submit"
              className="w-full rounded-md text-white !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none"
              loading={loading}
              disabled={loading}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminForm;