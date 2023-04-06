import { FormikErrors, FormikHelpers } from 'formik';
import { ErrorSplitToken } from '../constant';
import { TRPCClientErrorLike } from '@trpc/client';
import type { AppRouter } from '@server';

export function HandlerLoginAndRegisterError<T>(
	formikHelpers: FormikHelpers<T>,
	error: TRPCClientErrorLike<AppRouter>,
	SetServerErrorMessage: React.Dispatch<React.SetStateAction<string[]>>
) {
	const fieldError = error.data?.fieldError;
	const zodError = error.data?.zodError;
	const errors = {} as { [key: string]: string };
	if (zodError) {
		for (const key of Object.keys(zodError.fieldErrors)) {
			const errorMessage = zodError.fieldErrors[key]?.join(ErrorSplitToken);
			if (!errorMessage || errorMessage.trim().length <= 0) continue;
			if (!errors[key]) errors[key] = '';
			errors[key] += errorMessage;
		}
	}
	if (fieldError) {
		fieldError.map((err) => {
			if (err.message.trim().length <= 0) return;
			if (!errors[err.field]) errors[err.field] = '';
			errors[err.field] +=
				(errors[err.field].length <= 0 ? '' : ErrorSplitToken) +
				err.message.trim();
		});
	}
	formikHelpers.setErrors(errors as FormikErrors<T>);
	SetServerErrorMessage([error.message]);
	return error;
}
