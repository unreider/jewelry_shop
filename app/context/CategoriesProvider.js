"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { getCategories } from "../lib/db";

const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [categoryNames, setCategoryNames] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const fetchedCategories = await getCategories();
      setCategories(fetchedCategories)
      setCategoryNames(fetchedCategories.map((row) => row.name));
    };
    fetchCategories();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories, categoryNames, setCategoryNames }}>
      {children}
    </CategoriesContext.Provider>
  );
};

export const useCategories = () => useContext(CategoriesContext);
