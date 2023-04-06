import React, { useState } from 'react';
import { AuthButton, AuthTextInput } from '../../components/auth/input';
import { AuthWrapper } from '../../components/auth/wrapper';
import { Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { trpc } from '../util/trpc';
import {
	ErrorDialog,
	FormBotton,
	FormHeader,
	FormInputBotton,
} from '../../components/auth/layout';
import { HandlerLoginAndRegisterError } from '../util/handlerFormError';

export default function Register() {
	const initialFormValues = {
		email: '',
		password: '',
	};
	const mutation = trpc.user.register.useMutation();

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
	};

	return (
		<>
			<AuthWrapper>
				<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
					<FormHeader>Register New Account</FormHeader>
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
								<AuthButton type="submit">Register</AuthButton>
								<FormBotton>
									have an account ?{' '}
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
