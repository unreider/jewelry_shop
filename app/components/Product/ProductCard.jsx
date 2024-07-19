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
    <div key={product.id} className="group relative px-7">
      <div className="w-full h-80 aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none lg:h-80">
        <Image
          src={`/${product.image}`}
          width={80}
          height={80}
          className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          alt={product.name}
        />
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h2 className="font-medium text-gray-700">
            <Link href={`product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0 h-fit" />
              {product.name}
            </Link>
          </h2>
          {/* <p className="mt-1 text-sm text-gray-500">{product.color}</p> */}
        </div>
        <p className="text-sm font-medium text-gray-900">{product.price}֏</p>
      </div>
      <div className="mt-4 flex justify-between">
        {product.description.length <= 200 ? (
          <p className="text-sm text-gray-900">{product.description}</p>
        ) : (
          <p className="text-sm text-gray-900">
            {product.description.slice(0, 201)}...
          </p>
        )}
      </div>
      {session && (
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            onClick={handleClick}
          >
            Add to Cart
          </button>
        </div>
      )}
    </div>
  );
}
