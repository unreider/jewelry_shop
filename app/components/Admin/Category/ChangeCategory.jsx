"use client";

import { useState } from "react";
import { changeCategory } from "@/app/lib/db";

export default function ChangeCategory({categories}) {
  const [category, setCategory] = useState("");
  const [categorySelected, setCategorySelected] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changeCategory(categorySelected, category);
    setCategory("");
    setCategorySelected("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="Category Selected"
        className="mt-5"
        value={categorySelected}
        onChange={(e) => setCategorySelected(e.target.value)}
      >
        <option value="">{`Select a Category`}</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
      <input
        type="text"
        name="Changed Category"
        value={category}
        placeholder={`Type a changed Category`}
        className="border border-black rounded p-2 mt-5"
        onChange={(e) => setCategory(e.target.value)}
      />
      <div className="font-bold text-lg mt-7">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
        >
          Change
        </button>
      </div>
    </form>
  )
}