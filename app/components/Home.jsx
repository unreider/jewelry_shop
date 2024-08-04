"use client";

import { useState } from "react";
import ProductCard from "./Product/ProductCard";
import Categories from "./Categories";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  FunnelIcon,
  Squares2X2Icon,
} from "@heroicons/react/20/solid";
import { useProducts } from "../context/ProductsProvider";

const sortOptions = [
  { name: "Most Popular", value: "most-popular", current: false },
  { name: "Best Rating", value: "best-rating", current: false },
  { name: "Newest", value: "newest", current: true },
  { name: "Price: Low to High", value: "p-low-high", current: false },
  { name: "Price: High to Low", value: "p-high-low", current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Home() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { products, setProducts } = useProducts(); // Use the context to get products

  const handleSortClick = (e) => {
    const sortValue = e.target.value;

    let sortedProducts = [...products];

    switch (sortValue) {
      case "most-popular":
        // Implement sorting logic for most popular
        sortedProducts.sort((a, b) => b.popularity - a.popularity);
        break;
      case "best-rating":
        // Implement sorting logic for best rating
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        // Implement sorting logic for newest products
        sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "p-low-high":
        // Implement sorting logic for price low to high
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "p-high-low":
        // Implement sorting logic for price high to low
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      default:
        console.log("No sorting option.");
        break;
    }

    setProducts(sortedProducts);

    // Update current sort option
    sortOptions.forEach((option) => {
      option.current = option.value === sortValue;
    });
  };

  return (
    <div className="bg-white">
      <div>
        {/* Mobile filter dialog */}
        <Dialog
          open={mobileFiltersOpen}
          onClose={setMobileFiltersOpen}
          className="relative z-40 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto bg-white py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <Categories mobile={true} />
            </DialogPanel>
          </div>
        </Dialog>

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-20">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">
              New Arrivals
            </h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map((option) => (
                      <MenuItem key={option.key}>
                        <button
                          className={classNames(
                            option.current
                              ? "font-medium text-gray-900"
                              : "text-gray-500",
                            "block px-4 py-2 text-sm data-[focus]:bg-gray-100 w-full text-left"
                          )}
                          value={option.value}
                          onClick={handleSortClick}
                        >
                          {option.name}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="-m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
              >
                <span className="sr-only">View grid</span>
                <Squares2X2Icon aria-hidden="true" className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                <FunnelIcon aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4 relative">
              <Categories mobile={false} />

              {/* Product grid */}

              <div className="mt-5 lg:col-span-3 grid grid-cols-2 max-sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5">
                {products.length > 0 ? (
                  products.map((product) => (
                    <ProductCard key={product} product={product} />
                  ))
                ) : (
                  <></>
                )}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
