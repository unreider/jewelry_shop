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
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
        const fetchedProducts = await getProducts();
        const parsedProducts = fetchedProducts.map((row) => row.name);
        setProducts(parsedProducts);
        // console.log(categories); // Output: Array of categories
      } catch (error) {
        console.error("Error fetching Admin data:", error);
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
        <AdminCard action="add" title="Category" categories={categories} />
        {categories.length > 0 ? (
          <>
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
        <AdminCard
          action="add"
          title="Product"
          categories={categories}
          products={products}
        />
        {products.length > 0 ? (
          <>
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
