"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategories } from "../lib/db";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories.map((row) => row.name));
    };
    fetchCategories();
  }, []);

  // const updateCategories = async () => {
  //   const fetchedCategories = await getCategories();
  //   setCategories(fetchedCategories.map((row) => row.name));
  // };

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
