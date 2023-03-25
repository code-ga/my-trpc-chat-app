import React from 'react'
import { AuthButton, AuthTextInput } from '../../components/auth/input'
import { AuthWrapper } from '../../components/auth/wrapper'
import { Form, Formik, FormikHelpers } from 'formik'
import { trpc } from '../util/trpc'

export default function Register() {
  const initialFormValues = {
    email: '',
    password: '',
  }
  const mutation = trpc.user.register.useMutation()
  const OnSubmitForm = async (
    value: typeof initialFormValues,
    formikHelpers: FormikHelpers<typeof initialFormValues>,
  ) => {
    mutation.mutate(value)
  }
  return (
    <>
      <AuthWrapper>
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <FormHeader></FormHeader>
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
                <FormBotton></FormBotton>
              </Form>
            )}
          </Formik>
        </div>
      </AuthWrapper>
    </>
  )
}

const FormInputBotton: React.FC = () => (
  <div className="flex items-center justify-between">
    <a className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
      Forgot password?
    </a>
  </div>
)

const FormHeader: React.FC = () => (
  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
    Register New Account
  </h1>
)

const FormBotton: React.FC = () => (
  <p className="text-base text-center font-light text-gray-500 dark:text-gray-400">
    have an account{' '}
    <a
      href="/login"
      className="font-medium text-blue-600 hover:underline dark:text-blue-500"
    >
      Login
    </a>
  </p>
)
