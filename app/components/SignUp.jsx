"use client";

import { useState, useEffect } from "react";
import { signUp } from "../lib/actions";
import Socials from "./Socials";
import { checkParamExists } from "../lib/db";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm(name, email, password, repassword);
  }, [name, email, password, repassword]);

  const validateForm = async (name, email, password, repassword) => {
    let errors = {};

    if (!name) {
      errors.name = "Name is Required.";
    }

    if (!email) {
      errors.email = "Email is Required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is Invalid.";
    }

    if (!password) {
      errors.password = "Password is Required.";
    } else if (password.length < 6) {
      errors.password = "Password must be at least 6 characters.";
    }

    if (!repassword) {
      errors.repassword = "Password is Required.";
    } else if (repassword.length < 6) {
      errors.repassword = "Password must be at least 6 characters.";
    }

    if (password !== repassword) {
      errors.match = "Passwords don't match!";
    }

    // !! Probably not gonna work because it will make
    // a query for every character typed
    

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let errors = {};

    const nameExists = checkParamExists("name", name);
    const emailExists = checkParamExists("email", email);

    let nameExistsResult, emailExistsResult;

    Promise.all([nameExists, emailExists])
      .then(([nameResult, emailResult]) => {
        nameExistsResult = nameResult;
        emailExistsResult = emailResult;
      })
      .catch((error) => {
        console.error(error);
      })

    if (nameExistsResult) errors.nameExists = "Name already exists!";
    if (emailExistsResult) errors.emailExists = "Email already exists!";

    setErrors(prevErrors => ({...prevErrors, ...errors}));

    if (isFormValid) {
      console.log("Form submitted successfully!");
      signUp({ name: name, email: email, password: password });
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  return (
    <>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
          <h2 className="mt-7 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign Up
          </h2>
        </div>

        <div className="mt-7 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-1">
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              {errors.name && (
                <p className="mt-1 text-sm text-gray-900">{errors.name}</p>
              )}
              {errors.nameExists && (
                <p className="mt-1 text-sm text-gray-900">{errors.nameExists}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-gray-900">{errors.email}</p>
              )}
              {errors.emailExists && (
                <p className="mt-1 text-sm text-gray-900">{errors.emailExists}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-gray-900">{errors.password}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
              </div>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="block w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setRePassword(e.target.value)}
                />
              </div>
              {errors.repassword && (
                <p className="mt-1 text-sm text-gray-900">
                  {errors.repassword}
                </p>
              )}
              {errors.match && (
                <p className="mt-1 text-sm text-gray-900">
                  {errors.match}
                </p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </button>
            </div>
          </form>

          <Socials />

          <p className="mt-7 text-center text-sm text-gray-500">
            Already a member?{" "}
            <a
              href="/sign-in"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign In
            </a>
          </p>
        </div>
      </div>
    </>

    // <div className="mt-8 ml-8">
    //   <form onSubmit={handleSubmit}>
    //     <div className="block">
    //       <label htmlFor="email" className="pr-2 block">
    //         Email
    //       </label>
    //       <input
    //         type="email"
    //         name="email"
    //         id="email"
    //         placeholder="email"
    //         className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    //         onChange={(e) => setEmail(e.target.value)}
    //       />
    //       {errors.email && <p>{errors.email}</p>}
    //     </div>

    //     <div className="block">
    //       <label htmlFor="password" className="pr-2 block">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         placeholder="password"
    //         className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    //         onChange={(e) => setPassword(e.target.value)}
    //       />
    //       {errors.password && <p>{errors.password}</p>}
    //     </div>

    //     <div className="block">
    //       <label htmlFor="password" className="pr-2 block">
    //         Password
    //       </label>
    //       <input
    //         type="password"
    //         name="password"
    //         id="password"
    //         placeholder="repeat password"
    //         className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
    //         onChange={(e) => setRePassword(e.target.value)}
    //       />
    //       {errors.repassword && <p>{errors.repassword}</p>}
    //     </div>
    //     <button type="submit" className="mt-3" disabled={!isFormValid}>
    //       Sign Up
    //     </button>
    //     <Link
    //       className="inline-block ml-3 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
    //       href="/sign-in"
    //     >
    //       Already have an account?
    //     </Link>
    //   </form>
    // </div>
  );
}
