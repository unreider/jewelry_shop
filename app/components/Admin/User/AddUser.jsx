"use client";

const bcrypt = require("bcryptjs");

import { useState } from "react";
import { insertUser } from "@/app/lib/db";

export default function AddUser() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const hashedPassword = await bcrypt.hash(formData.password, 10); // 10-digits generated
    // one problem is that it shows in the page hashed password and then sends it
    setFormData((prevData) => ({
      ...prevData,
      password: hashedPassword,
    }));

    await insertUser(formData);
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
