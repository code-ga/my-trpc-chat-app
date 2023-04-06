import React, { Component, useState } from 'react';
import { AuthButton, AuthTextInput } from '../../components/auth/input';
import { AuthWrapper } from '../../components/auth/wrapper';
import { Form, Formik, FormikHelpers } from 'formik';
import { trpc } from '../util/trpc';
import {
	ErrorDialog,
	FormBotton,
	FormHeader,
	FormInputBotton,
} from '../../components/auth/layout';
import { HandlerLoginAndRegisterError } from '../util/handlerFormError';
import { useAuthContext } from '../context/auth';
type AsyncReturnType<T extends (...args: any) => Promise<any>> = T extends (
	...args: any
) => Promise<infer R>
	? R
	: any;

export default function Register() {
	const initialFormValues = {
		email: '',
		password: '',
	};
	const mutation = trpc.user.login.useMutation();

	const authContext = useAuthContext();
	const [serverErrorMessage, setServerErrorMessage] = useState<Array<string>>(
		[]
	);
	const OnSubmitForm = async (
		value: typeof initialFormValues,
		formikHelpers: FormikHelpers<typeof initialFormValues>
	) => {
		const result = await (async () => {
			try {
				return await mutation.mutateAsync(value);
			} catch (error) {
				HandlerLoginAndRegisterError(
					formikHelpers,
					error as any,
					setServerErrorMessage
				);
			}
		})();
		if (!result) return;
		authContext.onAuthSuccess(result);
	};

	return (
		<>
			<AuthWrapper>
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<FormHeader>Login</FormHeader>
					<ErrorDialog errors={serverErrorMessage} />

					<Formik initialValues={initialFormValues} onSubmit={OnSubmitForm}>
						{({ isSubmitting }) => (
							<Form className="space-y-4 md:space-y-6">
								<AuthTextInput label="Email" name="email" type="email" />
								<AuthTextInput
									label="Password"
									name="password"
									type="password"
								/>
								<FormInputBotton></FormInputBotton>
								<AuthButton type="submit">Login</AuthButton>
								<FormBotton>
									Don't have an account ?{' '}
									<a
										href="/register"
										className="font-medium text-blue-600 hover:underline dark:text-blue-500"
									>
										Register
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

class A extends Component{
	
}