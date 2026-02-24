import * as Yup from "yup";
import { Form, Formik } from "formik";
import AppInput from "@/components/dashboard/element/AppInput";
import AppButton from "@/components/dashboard/element/AppButton";
const AdminForm = () => {
  const initialState = {
    email: "",
    password: "",
    username: "",
    initalBalance: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    username: Yup.string().required("Username is required"),
    initalBalance: Yup.string().required("Initial balance is required"),
  });

  const handleSubmit = async (values: any) => {
    console.log(values)
  };
  return <div>
<Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({setFieldValue, values}) =>(
          <Form>
            <div className='my-6 flex md:flex-row flex-col gap-3'>
                <div className="w-full">
                    <AppInput
                    id="username"
                    label="Username"
                    name="username"
                    value={values?.username}
                    required
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('username', e.target.value);
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
                      setFieldValue('email', e.target.value);
                    }}
                  />
                </div>
           
            </div>
                   <div className='my-6 flex md:flex-row flex-col gap-3'>
                    <div className="w-full">
                         <AppInput
                    id="initialBalance"
                    label="Initial Balance"
                    name="initalBalance"
                    value={values?.initalBalance}
                    required
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('initalBalance', e.target.value);
                    }}
                  />
                    </div>
                  <div className="w-full">
                     <AppInput
                    id="password"
                    label="Password"
                    name="password"
                    type='password'
                    value={values?.password}
                    required
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('password', e.target.value);
                    }}
                  />
                  </div>
                   </div>
                 
            <AppButton label='Submit'  type='submit' className='w-full rounded-md text-white !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none'/>
          
          </Form>
        )}
      </Formik>

  </div>;
};

export default AdminForm;
