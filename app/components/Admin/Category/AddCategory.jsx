"use client";

import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { insertCategory } from "@/app/lib/db";
import { useCategories } from "@/app/context/CategoriesProvider";

export default function AddCategory() {
  const [category, setCategory] = useState("");
  const { setCategories, setCategoryNames } = useCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate a unique ID for the new category
    const newCategory = { id: uuidv4(), name: category };

    await insertCategory(newCategory);
    setCategory("");
    setCategories((prevCategories) => [...prevCategories, newCategory]);
    setCategoryNames((prevCategoryNames) => [...prevCategoryNames, newCategory.name])
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
