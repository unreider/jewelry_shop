"use client";

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import {
  getProductById,
  getUserIdByName,
  getUserProducts,
  updateUserProductQuantity,
  getUserProductQuantity,
  deleteUserProduct,
} from "../lib/db";
import Image from "next/image";
import Link from "next/link";
import { useUserProducts } from "../context/UserProductsProvider";

export default function Cart() {
  const [session, setSession] = useState(null);
  const { userProducts, setUserProducts } = useUserProducts();
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const fetchSessionData = async () => {
      const session = await getSession();
      if (session) {
        setSession(session);
        const userId = await getUserIdByName(session.user.name);
        const userProducts = await getUserProducts(userId);
        setUserProducts(userProducts);
      }
    };
    fetchSessionData();
  }, []);

  useEffect(() => {
    const fetchProductData = async () => {
      let pr = [];
      for (let i = 0; i < userProducts.length; ++i) {
        let product = await getProductById(userProducts[i].product_id);
        pr.push(product);
      }
      setProducts(pr);
    };
    if (userProducts.length > 0) {
      fetchProductData();
    }
  }, [userProducts]);

  useEffect(() => {
    const fetchQuantities = async () => {
      if (session) {
        const userId = await getUserIdByName(session.user.name);
        const newQuantities = {};
        for (const product of userProducts) {
          const quantity = await getUserProductQuantity(userId, product.product_id);
          newQuantities[product.product_id] = quantity;
        }
        setQuantities(newQuantities);
      }
    };
    fetchQuantities();
  }, [session, userProducts]);

  const calculateTotalAmount = () => {
    let res = 0;
    products.forEach((p) => {
      res += p.price * (quantities[p.id] || 0);
    });
    return res;
  };

  const handleQuantityChange = (productId) => async (e) => {
    const newQuantity = parseInt(e.target.value);
    if (!isNaN(newQuantity)) {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: newQuantity >= 1 ? newQuantity : 0,
      }));
      if (newQuantity >= 1) {
        const userId = await getUserIdByName(session.user.name);
        await updateUserProductQuantity(userId, productId, newQuantity);
      }
    } else {
      setQuantities((prevQuantities) => ({
        ...prevQuantities,
        [productId]: 0,
      }));
    }
  };

  const handleRemove = async (productId) => {
    const userId = await getUserIdByName(session.user.name);
    await deleteUserProduct(userId, productId);
    setUserProducts((prevData) =>
      prevData.filter((product) => product.product_id !== productId)
    );
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.id !== productId)
    );
  };

  return (
    <section>
      {session && userProducts.length > 0 && (
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="mx-auto max-w-3xl">
            <header className="text-center">
              <h1 className="text-xl font-bold text-gray-900 sm:text-3xl">
                {session.user.name}'s Cart
              </h1>
            </header>

            <div className="mt-8">
              <ul className="space-y-5">
                {userProducts &&
                  products &&
                  products.map((product) => (
                    <li key={product.id} className="flex items-center gap-4 w-full">
                      <Image
                        width={30}
                        height={30}
                        src={`/${product.image}`}
                        alt={product.name}
                        className="size-32 rounded object-cover"
                      />

                      <div>
                        <Link
                          href={`/product/${product.id}`}
                          className="text-xl text-gray-900"
                        >
                          {product.name}
                        </Link>

                        <dl className="mt-0.5 space-y-px text-[10px] text-gray-600">
                          <div>
                            <dt className="inline">Size:</dt>
                            <dd className="inline">XXS</dd>
                          </div>

                          <div>
                            <dt className="inline">Color:</dt>
                            <dd className="inline">White</dd>
                          </div>
                        </dl>
                      </div>

                      <div className="flex flex-1 items-center justify-end gap-2">
                        <label htmlFor="Line1Qty" className="sr-only">
                          {" "}
                          Quantity{" "}
                        </label>

                        <input
                          type="number"
                          min="1"
                          value={quantities[product.id] || ""}
                          id="Line1Qty"
                          className="h-8 w-12 rounded border-gray-200 bg-gray-50 p-0 text-center text-xs text-gray-600 [-moz-appearance:_textfield] focus:outline-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                          onChange={handleQuantityChange(product.id)}
                        />

                        <button
                          className="text-gray-600 transition hover:text-red-600"
                          onClick={() => handleRemove(product.id)}
                        >
                          <span className="sr-only">Remove item</span>

                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                            />
                          </svg>
                        </button>
                      </div>
                    </li>
                  ))}
              </ul>

              <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
                <div className="w-screen max-w-lg space-y-4">
                  <dl className="space-y-0.5 text-sm text-gray-700">
                    {products.map((p) => (
                      <div key={p.id} className="flex justify-between">
                        <dt>
                          {p.name} | x{quantities[p.id]}
                        </dt>
                        <dd>{isNaN(p.price * quantities[p.id]) ? 0 : p.price * quantities[p.id]}֏</dd>
                      </div>
                    ))}

                    <div className="flex justify-between !text-base font-medium">
                      <dt>Total</dt>
                      <dd>{calculateTotalAmount()}֏</dd>
                    </div>
                  </dl>

                  <div className="flex justify-end">
                    <a
                      href="#"
                      className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}