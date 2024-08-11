"use client";

import { useState } from "react";
import { changeCategory } from "@/app/lib/db";
import { useCategories } from "@/app/context/CategoriesProvider";

export default function ChangeCategory() {
  const [category, setCategory] = useState("");
  const [categorySelected, setCategorySelected] = useState("");
  const { setCategories, categoryNames, setCategoryNames } = useCategories();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Make sure that both fields are filled before proceeding
    if (!categorySelected || !category) {
      alert("Please select a category and provide a new name.");
      return;
    }

    await changeCategory(categorySelected, category);

    setCategories((prevCategories) =>
      prevCategories.map((cat) =>
        cat.name === categorySelected ? category : cat.name
      )
    );
  
    // Update the local state immediately
    setCategoryNames((prevCategoryNames) =>
      prevCategoryNames.map((cat) =>
        cat === categorySelected ? category : cat
      )
    );

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
        {categoryNames &&
          categoryNames.map((cat) => (
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
  );
}
