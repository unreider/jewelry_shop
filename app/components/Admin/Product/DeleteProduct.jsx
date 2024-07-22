"use client";

import { useEffect, useState } from "react";
import { deleteProduct } from "@/app/lib/db";
import { useProducts } from "@/app/context/ProductsProvider";

export default function DeleteProduct() {
  const [productSelected, setProductSelected] = useState("");
  const { products, setProducts, setProductNames } = useProducts();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteProduct(productSelected);
    // Update the products state without the deleted product
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.name !== productSelected)
    );
    // Update the product names state without the deleted product
    setProductNames((prevProductNames) =>
      prevProductNames.filter((productName) => productName !== productSelected)
    );
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
        {products &&
          products.map((row) => (
            <option key={row.id} value={row.name}>
              {row.name}
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
