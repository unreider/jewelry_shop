"use client";

import { useState, useEffect } from "react";
import AdminCard from "./AdminCard";
import { getCategories, getProducts, getUsers } from "@/app/lib/db";

export default function Admin() {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedCategories = await getCategories();
        const parsedCategories = fetchedCategories.map((row) => row.name);
        setCategories(parsedCategories);
        const fetchedProducts = await getProducts();
        const parsedProducts = fetchedProducts.map((row) => row.name);
        setProducts(parsedProducts);
        const fetchedUsers = await getUsers();
        setUsers(fetchedUsers);
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
        <AdminCard action="add" title="category" />
        {categories.length > 0 ? (
          <>
            <AdminCard
              action="delete"
              title="category"
              categories={categories}
            />
            <AdminCard
              action="change"
              title="category"
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
        <AdminCard action="add" title="product" categories={categories} />
        {products.length > 0 ? (
          <>
            <AdminCard action="delete" title="product" products={products} />
            <AdminCard action="change" title="product" categories={categories} products={products} />
          </>
        ) : (
          <></>
        )}
      </div>

      <div className="w-full h-full text-center mt-12 font-bold text-xl">
        Users
      </div>
      <div className="w-full h-full p-9 mt-2 mb-10 grid grid-cols-3 gap-x-6 gap-y-10">
        <AdminCard action="add" title="user" />
        {users.length > 0 ? (
          <>
            <AdminCard action="delete" title="user" users={users} />
            <AdminCard action="change" title="user" users={users} /> {/* products={products} */}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
}
