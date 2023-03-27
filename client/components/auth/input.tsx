import React, { ButtonHTMLAttributes } from "react";
import { useField } from "formik";

export interface AuthTextInputProps {
  placeholder?: string;
  label: string;
  required?: boolean;
  name: string;
  type?: React.HTMLInputTypeAttribute;
}

export const AuthTextInput: React.FC<AuthTextInputProps> = (props) => {
  const metaInput = { ...props };
  const [field, { error }] = useField(props);
  console.log(error);
  return (
    <div>
      <label
        htmlFor={props.label}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {props.label}
      </label>
      <input
        id={props.label}
        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        {...metaInput}
        {...field}
      />
    </div>
  );
};

export interface AuthButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  isSubmitting?: boolean;
}

export const AuthButton: React.FC<React.PropsWithChildren<AuthButtonProps>> = (
  props
) => {
  return (
    <>
      <button
        {...props}
        className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-semibold rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {props.children}
      </button>
    </>
  );
};
