import React from "react";
import { AuthButton, AuthTextInput } from "../../components/auth/input";
import { AuthWrapper } from "../../components/auth/wrapper";
import { Form, Formik, FormikHelpers } from "formik";
import { trpc } from "../util/trpc";
import {
  FormBotton,
  FormHeader,
  FormInputBotton,
} from "../../components/auth/layout";

export default function Register() {
  const initialFormValues = {
    email: "",
    password: "",
  };
  const mutation = trpc.user.register.useMutation();
  const OnSubmitForm = async (
    value: typeof initialFormValues,
    formikHelpers: FormikHelpers<typeof initialFormValues>
  ) => {
    mutation.mutate(value);

    if (mutation.error) {
      const fieldError = mutation.error.data?.fieldError;
      if (fieldError)
        formikHelpers.setErrors(
          fieldError.reduce(
            (pre, cur) => ({ ...pre, [cur.field]: cur.message }),
            {}
          )
        );
    }
  };
  return (
    <>
      <AuthWrapper>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <FormHeader>Register New Account</FormHeader>
          <Formik initialValues={initialFormValues} onSubmit={OnSubmitForm}>
            {({ isSubmitting }) => (
              <Form className="space-y-4 md:space-y-6">
                <AuthTextInput label="email" name="email" type="email" />
                <AuthTextInput
                  label="password"
                  name="password"
                  type="password"
                />
                <FormInputBotton></FormInputBotton>
                <AuthButton>Register</AuthButton>
                <FormBotton>
                  have an account ?{" "}
                  <a
                    href="/login"
                    className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                  >
                    Login
                  </a>
                </FormBotton>
              </Form>
            )}
          </Formik>
        </div>
      </AuthWrapper>
    </>
  );
}
