"use client";

import Link from "next/link";
import Image from "next/image";

import {
  getUserIdByName,
  insertUserProduct,
  checkUserProductExists,
} from "@/app/lib/db";

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useUserProducts } from "@/app/context/UserProductsProvider";

export default function ProductCard({ product }) {
  const [session, setSession] = useState(null);
  const { userProducts, setUserProducts } = useUserProducts();

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        setSession(session);
      }
    };
    fetchData();
  }, []);

  const handleClick = async () => {
    if (session) {
      const userId = await getUserIdByName(session.user.name);
      const check = await checkUserProductExists(userId, product.id);
      if (!check) {
        await insertUserProduct(userId, product.id);
        setUserProducts([
          ...userProducts,
          { user_id: userId, product_id: product.id },
        ]);
      } else alert("The Product is already in the Cart");
    }
  };

  return (
    <div
      key={product.id}
      className="group relative border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
    >
      <div className="w-full h-90 overflow-hidden bg-gray-200">
        <Image
          src={product.image}
          width={60}
          height={80}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          alt={product.name}
          loading="lazy"
          quality={75}
          sizes="(max-width: 768px) 100vw, 
        (max-width: 1200px) 50vw, 
        33vw"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAACCAYAAAB/qH1jAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAJ0lEQVR4nGPY2fXjv458/H9Bbtf/IDbD/7v//8/Mvfq/J+nEfxAbAF3NFsFiuaE1AAAAAElFTkSuQmCC"
        />
      </div>
      <div className="p-4">
        <h2 className="font-semibold text-lg text-gray-800">
          <Link href={`product/${product.id}`}>
            <span aria-hidden="true" className="absolute inset-0 h-fit" />
            {product.name}
          </Link>
        </h2>
        <p className="mt-1 text-sm text-gray-500">{product.color}</p>
        <p className="mt-2 text-lg text-gray-900">{product.price}֏</p>
        <div className="mt-3">
          {product.description.length <= 200 ? (
            <p className="text-sm text-gray-700">{product.description}</p>
          ) : (
            <p className="text-sm text-gray-700">
              {product.description.slice(0, 201)}...
            </p>
          )}
        </div>
        {session && (
          <div className="mt-4 flex space-x-4">
            <button
              className="flex-1 bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
              onClick={handleClick}
            >
              Add to Cart
            </button>
            <button
              className="flex-1 bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
              onClick={handleClick}
            >
              Buy
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
