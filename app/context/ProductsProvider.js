"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { getProducts } from "@/app/lib/db";

const ProductsContext = createContext();

export const useProducts = () => {
  return useContext(ProductsContext);
};

export const ProductsProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [productNames, setProductNames] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const products = await getProducts();
      setProducts(products);
      setProductNames(products.map((product) => product.name));
    };

    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider
      value={{ products, setProducts, productNames, setProductNames }}
    >
      {children}
    </ProductsContext.Provider>
  );
};
