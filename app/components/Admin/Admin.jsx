"use client";

import { useState, useEffect } from "react";
import AdminCard from "./AdminCard";
import { getCategories, getProducts } from "@/app/lib/db";

export default function Admin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const categories = await getCategories();
        setCategories(categories);
        const products = await getProducts();
        console.log("products", products);
        setProducts(products);
        // console.log(categories); // Output: Array of categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchData();
  }, []); // Run this effect only once when the component mounts

  return (
    <>
      <div className="w-full h-full text-center mt-12 font-bold text-2xl">
        Admin Page
      </div>
      <div className="w-full h-full text-center mt-12 font-bold text-xl">
        Categories
      </div>
      <div className="w-full h-full p-9 mt-2 grid grid-cols-3 gap-x-6 gap-y-10">
        {categories.length > 0 ? (
          <>
            <AdminCard action="add" title="Category" categories={categories} />
            <AdminCard
              action="delete"
              title="Category"
              categories={categories}
            />
            <AdminCard
              action="change"
              title="Category"
              categories={categories}
            />
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="w-full h-full text-center mt-12 font-bold text-xl">
        Products
      </div>
      <div className="w-full h-full p-9 mt-2 grid grid-cols-3 gap-x-6 gap-y-10">
        {/* need to change to products.length! */}
        {products.length > 0 ? (
          <>
            <AdminCard
              action="add"
              title="Product"
              categories={categories}
              products={products}
            />
            <AdminCard
              action="delete"
              title="Product"
              categories={categories}
              products={products}
            />
            <AdminCard
              action="change"
              title="Product"
              categories={categories}
              products={products}
            />
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
