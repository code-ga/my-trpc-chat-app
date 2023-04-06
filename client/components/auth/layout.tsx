import React from 'react';
export const FormInputBotton: React.FC = () => (
	<div className="flex items-center justify-between">
		<a className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
			Forgot password?
		</a>
	</div>
);

export const FormHeader: React.FC<React.PropsWithChildren> = ({ children }) => (
	<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
		{children}
	</h1>
);

export const FormBotton: React.FC<React.PropsWithChildren> = ({ children }) => (
	<p className="text-base text-center font-light text-gray-500 dark:text-gray-400">
		{children}
	</p>
);

export const ErrorDialog: React.FC<{
	errors: string[];
}> = ({ errors }) =>
	errors.length > 0 ? (
		<p className="text-red-400 p-4  rounded-lg text-center border border-red-700">
			<ul className="ml-5 list-disc flex">
				{errors.map((e) => (
					<li className="text-center">{e}</li>
				))}
			</ul>
		</p>
	) : (
		<></>
	);
