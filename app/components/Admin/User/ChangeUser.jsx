"use client";

const bcrypt = require("bcryptjs");

import { useState, useEffect } from "react";
import { changeUser } from "@/app/lib/db";
import { useUsers } from "@/app/context/UsersProvider";
import { getUser } from "@/app/lib/db/users";

export default function ChangeUser() {
  const [userSelected, setUserSelected] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const { users, setUsers } = useUsers();

  useEffect(() => {
    const fetchData = async () => {
      const user = await getUser({ name: userSelected });
      if (user?.rows.length > 0) {
        setFormData({
          name: user.rows[0].name || '',
          email: user.rows[0].email || '',
          role: user.rows[0].role || ''
        });
      }
    };
    fetchData();
  }, [userSelected]);

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

      // Create the updated user data
      const updatedUser = { ...formData, password: hashedPassword };

      // Perform the user update in the database
      await changeUser({ userSelected: userSelected, formData: updatedUser });

      // Update the users state with the changed user name
      setUsers((prevUsers) =>
        prevUsers.map((user) => (user === userSelected ? formData.name : user))
      );

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
      <div>
        <select
          name="User Selected"
          className="mt-5"
          value={userSelected}
          onChange={(e) => setUserSelected(e.target.value)}
        >
          <option value="">{`Select a User`}</option>
          {users &&
            users.map((user) => (
              <option key={user} value={user}>
                {user}
              </option>
            ))}
        </select>
      </div>

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
            placeholder={`Type a new Name`}
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
            placeholder={`Type a new Email`}
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
            placeholder={`Type a new Password`}
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
          Change
        </button>
      </div>
    </form>
  );
}
