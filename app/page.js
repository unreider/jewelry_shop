import Header from "./components/Header";
import Home from "./components/Home";

import { createdb } from "./lib/db";

// const products = [
//   {
//     id: 1,
//     name: "Basic Tee 1",
//     href: "/product",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$35",
//     color: "Black",
//   },
//   {
//     id: 2,
//     name: "Basic Tee 2",
//     href: "/product",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$54",
//     color: "Black",
//   },
//   {
//     id: 3,
//     name: "Basic Tee 3",
//     href: "/product",
//     imageSrc:
//       "https://tailwindui.com/img/ecommerce-images/product-page-01-related-product-01.jpg",
//     imageAlt: "Front of men's Basic Tee in black.",
//     price: "$67",
//     color: "Black",
//   },
//   // More products...
// ];

export default function HomePage() {
  // create db tables
  createdb();

  return (
    <div className="bg-white">
      <Header />
      <Home />
    </div>
  );
}
