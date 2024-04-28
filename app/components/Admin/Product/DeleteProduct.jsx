"use client";

import { useState } from "react";
import { deleteProduct } from "@/app/lib/db";

export default function DeleteProduct({ products }) {
  const [productSelected, setProductSelected] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteProduct(productSelected);
    setProductSelected("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="Category Selected"
        className="mt-5"
        value={productSelected}
        onChange={(e) => setProductSelected(e.target.value)}
      >
        <option value="">{`Select a Product`}</option>
        {products.map((prod) => (
          <option key={prod} value={prod}>
            {prod}
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