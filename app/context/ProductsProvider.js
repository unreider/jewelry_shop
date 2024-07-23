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
      console.log('before');
      const products = await getProducts();
      console.log('after');
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
