"use client";

const bcrypt = require("bcryptjs");

import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import { insertUser } from "@/app/lib/db";
import { useUsers } from "@/app/context/UsersProvider";

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { setUsers } = useUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();

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
    });
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
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder={`Type a Name`}
        className="border border-black rounded p-2 mt-5"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        placeholder={`Type an Email`}
        className="border border-black rounded p-2 mt-5"
        onChange={handleChange}
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        placeholder={`Type a Password`}
        className="border border-black rounded p-2 mt-5"
        onChange={handleChange}
      />
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
