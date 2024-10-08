"use client";

import {
  filterProductsByGender,
  filterProductsByCategory
} from "../lib/db";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import { useProducts } from "../context/ProductsProvider";
import { useCategories } from "../context/CategoriesProvider";

const filters = [
  {
    id: "gender",
    name: "Gender",
    options: [
      { value: "m", label: "Men", checked: true },
      { value: "w", label: "Women", checked: true },
      { value: "x", label: "Men and Women", checked: true },
    ],
  },
];

export default function Categories({ mobile }) {
  const { products, setProducts } = useProducts(); // Use the context
  const { categories } = useCategories();

  const handleChange = async (e) => {
    const { name, value, checked } = e.target;

    console.log(`Change detected: ${name} - ${value} - ${checked}`);

    let filteredProducts = [];

    let categoryId;
    categories.map((category) => {
      if (category.name === value) categoryId = category.id;
    });

    if (checked) {
      // When a filter is checked, add the filtered products
      if (name === "category") {
        // const categoryId = await getCategoryIdByName(value);
        filteredProducts = await filterProductsByCategory(categoryId);
      } else if (name === "gender") {
        filteredProducts = await filterProductsByGender(value);
      }
      // Update products to include new filtered products, avoiding duplicates
      const updatedProducts = [...products, ...filteredProducts];
      setProducts(
        Array.from(new Set(updatedProducts.map((p) => p.id))).map((id) =>
          updatedProducts.find((p) => p.id === id)
        )
      );
    } else {
      // When a filter is unchecked, remove the products that match the unchecked filter
      let updatedProducts;
      if (name === "category") {
        // const categoryId = await getCategoryIdByName(value);
        updatedProducts = products.filter(
          (product) => product.category_id !== categoryId
        );
      } else if (name === "gender") {
        updatedProducts = products.filter(
          (product) => product.gender !== value
        );
      }
      setProducts(updatedProducts);
    }
  };

  return (
    <>
      <form
        className={mobile ? "mt-4 border-t border-gray-200" : "hidden lg:block"}
      >
        {/* <h3 className="sr-only">Categories</h3> */}
        {/* <ul role="list" className="px-2 py-3 font-medium text-gray-900">
            {categories.map((category) => (
              <li key={category.name}>
                <Link href={category.href} className="block px-2 py-3">
                  {category.name}
                </Link>
              </li>
            ))}
          </ul> */}

        <Disclosure as="div" className={"border-b border-gray-200 px-4 py-6"}>
          <h3 className="-my-3 flow-root">
            <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
              <span className="font-medium text-gray-900">Categories</span>
              <span className="ml-6 flex items-center">
                <PlusIcon
                  aria-hidden="true"
                  className="h-5 w-5 group-data-[open]:hidden"
                />
                <MinusIcon
                  aria-hidden="true"
                  className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                />
              </span>
            </DisclosureButton>
          </h3>
          <DisclosurePanel className="pt-6">
            <div className="space-y-4">
              {categories.length &&
                categories.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <input
                      defaultValue={category.name}
                      defaultChecked={true}
                      id={`filter-mobile-${category.id}`}
                      name="category"
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={`filter-mobile-${category.id}`}
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
            </div>
          </DisclosurePanel>
        </Disclosure>

        {filters.map((section) => (
          <Disclosure
            key={section.id}
            as="div"
            className="border-t border-gray-200 px-4 py-6"
          >
            <h3 className="-mx-2 -my-3 flow-root">
              <DisclosureButton className="group flex w-full items-center justify-between bg-white px-2 py-3 text-gray-400 hover:text-gray-500">
                <span className="font-medium text-gray-900">
                  {section.name}
                </span>
                <span className="ml-6 flex items-center">
                  <PlusIcon
                    aria-hidden="true"
                    className="h-5 w-5 group-data-[open]:hidden"
                  />
                  <MinusIcon
                    aria-hidden="true"
                    className="h-5 w-5 [.group:not([data-open])_&]:hidden"
                  />
                </span>
              </DisclosureButton>
            </h3>
            <DisclosurePanel className="pt-6">
              <div className="space-y-6">
                {section.options.map((option, optionIdx) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      defaultValue={option.value}
                      defaultChecked={option.checked}
                      id={`filter-mobile-${section.id}-${optionIdx}`}
                      name={section.id}
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                      onChange={handleChange}
                    />
                    <label
                      htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                      className="ml-3 min-w-0 flex-1 text-gray-500"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </DisclosurePanel>
          </Disclosure>
        ))}
      </form>
    </>
  );
}
