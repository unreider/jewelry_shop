"use client";

import { useState } from "react";
import { deleteCategory } from "@/app/lib/db";

export default function DeleteCategory({ categories }) {
  const [categorySelected, setCategorySelected] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteCategory(categorySelected);
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
      <div className="font-bold text-lg mt-7">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
        >
          Delete
        </button>
      </div>
    </form>
  );
}
