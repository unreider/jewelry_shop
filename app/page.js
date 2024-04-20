import Image from "next/image";
import Link from "next/link";
import Header from "./components/Header";
import ProductCard from "./components/Product/ProductCard";

import {
  createdb,
  insertCategory,
} from "./lib/db";

const products = [
  {
    id: 1,
    name: "Basic Tee 1",
    href: "/product",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$35",
    color: "Black",
  },
  {
    id: 2,
    name: "Basic Tee 2",
    href: "/product",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$54",
    color: "Black",
  },
  {
    id: 3,
    name: "Basic Tee 3",
    href: "/product",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
    imageAlt: "Front of men's Basic Tee in black.",
    price: "$67",
    color: "Black",
  },
  // More products...
];

export default function Home() {
  // create db tables
  createdb();

  insertCategory('rings')
  console.log("category 'rings' created!");

  return (
    <div className="bg-white">
      <Header />
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customers also purchased
        </h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products.map((product) => (
            <ProductCard product={product} />
          ))}
        </div>
        
      </div>
    </div>
  );
}
