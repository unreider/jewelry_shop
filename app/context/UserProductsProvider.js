"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getSession } from "next-auth/react";
import { getUserIdByName, getUserProducts } from "../lib/db";

const UserProductsContext = createContext();

export const UserProductsProvider = ({ children }) => {
  const [userProducts, setUserProducts] = useState([]);

  useEffect(() => {
    const fetchUserProducts = async () => {
      const session = await getSession();
      if (session) {
        const userId = await getUserIdByName(session.user.name);
        const products = await getUserProducts(userId);
        setUserProducts(products);
      }
    };
    fetchUserProducts();
  }, []);

  return (
    <UserProductsContext.Provider value={{ userProducts, setUserProducts }}>
      {children}
    </UserProductsContext.Provider>
  );
};

export const useUserProducts = () => useContext(UserProductsContext);