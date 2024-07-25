"use client";

const bcrypt = require("bcryptjs");

import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { insertUser } from "@/app/lib/db";
import { useUsers } from "@/app/context/UsersProvider";

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { setUsers } = useUsers();

  useEffect(() => {
    validateForm(formData.name, formData.email, formData.password);
  }, [formData.name, formData.email, formData.password]);

  const validateForm = async (name, email, password) => {
    let errors = {};

    if (!name) {
      errors.name = "Email is Required.";
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

    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormValid) {
      const hashedPassword = await bcrypt.hash(formData.password, 10); // 10-digits generated

      // Generate a unique ID for the new user
      const newUser = { ...formData, password: hashedPassword, id: uuidv4() };

      await insertUser(newUser);

      // Update the users state with just the user names
      setUsers((prevUsers) => [...prevUsers, formData.name]);

      setFormData({
        name: "",
        email: "",
        password: "",
        role: "",
      });
    } else {
      console.log("Form has errors. Please correct them.");
    }
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mt-5">
        <label
          htmlFor="name"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Name
        </label>
        <div>
          <input
            type="text"
            name="name"
            value={formData.name}
            placeholder={`Type a Name`}
            className="border border-black rounded p-2"
            onChange={handleChange}
            required
          />
        </div>
        {errors.name && (
          <p className="mt-1 text-sm text-gray-900">{errors.name}</p>
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor="email"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Email
        </label>
        <div>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder={`Type an Email`}
            className="border border-black rounded p-2"
            onChange={handleChange}
            required
          />
        </div>
        {errors.email && (
          <p className="mt-1 text-sm text-gray-900">{errors.name}</p>
        )}
      </div>

      <div className="mt-5">
        <label
          htmlFor="password"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Password
        </label>
        <div>
          <input
            type="password"
            name="password"
            value={formData.password}
            placeholder={`Type a Password`}
            className="border border-black rounded p-2"
            onChange={handleChange}
            required
          />
        </div>
        {errors.password && (
          <p className="mt-1 text-sm text-gray-900">{errors.password}</p>
        )}
      </div>
      <div className="mt-5 mb-2">
        <label htmlFor="role" className="mr-3">
          Role:
        </label>
        <select
          name="role"
          id="role"
          value={formData.role}
          onChange={handleChange}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
      </div>
      <div className="font-bold text-lg mt-7">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
        >
          Add
        </button>
      </div>
    </form>
  );
}
