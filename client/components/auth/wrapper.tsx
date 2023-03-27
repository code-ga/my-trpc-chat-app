import React from "react";

export const AuthWrapper: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          {children}
        </div>
      </div>
    </section>
  );
};
