"use client";

import Link from "next/link"
import { useState, useEffect } from "react";
import { signUp } from "../lib/actions";

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    validateForm(email, password, repassword);
  }, [email, password, repassword]);

  const validateForm = async (email, password, repassword) => {
    let errors = {};

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

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      console.log('Form submitted successfully!'); 
      signUp({ email: email, password: password });
    } else {
      console.log('Form has errors. Please correct them.'); 
    }
  };

  return (
    <div className="mt-8 ml-8">
      <form onSubmit={handleSubmit}>
        <div className="block">
          <label htmlFor="email" className="pr-2 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="block">
          <label htmlFor="password" className="pr-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <div className="block">
          <label htmlFor="password" className="pr-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="repeat password"
            className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={(e) => setRePassword(e.target.value)}
          />
          {errors.repassword && <p>{errors.repassword}</p>}
        </div>
        <button type="submit" className="mt-3" disabled={!isFormValid}>
          Sign Up
        </button>
        <Link
          className="inline-block ml-3 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/sign-in"
        >
          Already have an account?
        </Link>
      </form>
    </div>
  );
}
