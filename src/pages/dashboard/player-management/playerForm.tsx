import * as Yup from "yup";
import { Form, Formik } from "formik";
import AppInput from "@/components/dashboard/element/AppInput";
import AppButton from "@/components/dashboard/element/AppButton";
const PlayerForm = () => {
  const initialState = {
    deposite: "",
    email: "",
  };
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    deposite: Yup.number().required("Deposite is required"),
  });

  const handleSubmit = async (values: any) => {
    console.log(values)
  };
  return <div>
<Formik initialValues={initialState} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({setFieldValue, values}) =>(
          <Form>
            <div className='my-6  gap-3'>
                <div className="w-full mb-5">
                    <AppInput
                    id="deposite"
                    label="Deposite Amount"
                    name="deposite"
                    value={values?.deposite}
                    required
                    className="w-full"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      setFieldValue('deposite', e.target.value);
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
                
                 
            <AppButton label='Submit'  type='submit' className='w-full rounded-md text-white !bg-[#615ed6] hover:!bg-[#4e48c9] !outline-none'/>
          
          </Form>
        )}
      </Formik>

  </div>;
};

export default PlayerForm;
