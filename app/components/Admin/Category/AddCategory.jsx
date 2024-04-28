"use client";

import { useState } from "react";
import { insertCategory } from "@/app/lib/db";

export default function AddCategory() {
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await insertCategory(category);
    setCategory("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="Category"
        value={category}
        placeholder={`Type a Category`}
        className="border border-black rounded p-2 mt-5"
        onChange={(e) => setCategory(e.target.value)}
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
