"use client";

import { useState } from "react";
import {
  insertCategory,
  deleteCategory,
  changeCategory,
  insertProduct,
  deleteProduct,
  changeProduct,
  getProductCategoryId
} from "@/app/lib/db";

export default function AdminCard({ action, title, categories, products }) {
  const [categoryToAdd, setCategoryToAdd] = useState("");
  const [categoryToDeleteSelected, setCategoryToDeleteSelected] = useState("");
  const [categoryToChange, setCategoryToChange] = useState("");
  const [categoryToChangeSelected, setCategoryToChangeSelected] = useState("");

  const [productNameToAdd, setProductNameToAdd] = useState("");
  const [productDescToAdd, setProductDescToAdd] = useState("");
  const [productCategoryToAddSelected, setProductCategoryToAddSelected] = useState("");
  const [productToDeleteSelected, setProductToDeleteSelected] = useState("");
  const [productToChange, setProductToChange] = useState("");
  const [productNameToChange, setProductNameToChange] = useState("");
  const [productDescToChange, setProductDescToChange] = useState("");
  const [productCategoryToChangeSelected, setProductCategoryToChangeSelected] =
    useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (action) {
      case "add":
        if (title === "Category") {
          insertCategory(categoryToAdd);
          setCategoryToAdd("");
        } else if (title === "Product") {
          insertProduct({name: productNameToAdd, desc: productDescToAdd, category_name: productCategoryToAddSelected})
          setProductNameToAdd("");
          setProductDescToAdd("");
          setProductCategoryToAddSelected("");
        }
        break;
      case "delete":
        if (title === "Category") {
          deleteCategory(categoryToDeleteSelected);
          setCategoryToDeleteSelected("");
        } else if (title === "Product") {
          deleteProduct(productToDeleteSelected);
          setProductToDeleteSelected("");
        }
      case "change":
        if (title === "Category") {
          changeCategory(categoryToChangeSelected, categoryToChange);
          // Reset input value
          setCategoryToChange("");
          setCategoryToChangeSelected("");
        } else if (title === "Product") {
          const productCategoryId = getProductCategoryId(productCategoryToChangeSelected);
          changeProduct({productNameToChange, productDescToChange, productCategoryId});
          setProductToChange("");
          setProductNameToChange("");
          setProductDescToChange("");
          setProductCategoryToChangeSelected("");
        }
      default:
        break;
    }
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {action.charAt(0).toUpperCase() + action.slice(1).toLowerCase()} a{" "}
          {title[0].toUpperCase() + title.slice(1).toLowerCase()}
        </div>

        {action === "add" ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={
                title === "Category"
                  ? categoryToAdd
                  : title === "Product"
                  ? productNameToAdd
                  : ""
              }
              placeholder={`Type a ${title} name`}
              className="border border-black rounded p-2 mt-2"
              onChange={
                title === "Category"
                  ? (e) => setCategoryToAdd(e.target.value)
                  : title === "Product"
                  ? (e) => setProductNameToAdd(e.target.value)
                  : ""
              }
            />

            {title === "Product" ? (
              <>
                <textarea
                  value={productDescToAdd}
                  placeholder={`Enter ${title} description...`}
                  rows="4"
                  cols="30"
                  className="border border-black rounded p-2 mt-6"
                  onChange={(e) => setProductDescToAdd(e.target.value)}
                />
                <select
                  name={title}
                  className="mt-3"
                  value={productCategoryToAddSelected}
                  onChange={(e) => setProductCategoryToAddSelected(e.target.value)}
                >
                  <option value="">{`Select a ${title} Category`}</option>
                  {categories.map((category) => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
              </>
            ) : (
              <></>
            )}

            <div className="font-bold text-lg mt-7">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
              >
                Add
              </button>
            </div>
          </form>
        ) : action === "delete" ? (
          <form onSubmit={handleSubmit}>
            <select
              name={title}
              className="mt-7"
              value={
                title === "Category"
                  ? categoryToDeleteSelected
                  : title === "Product"
                  ? productToDeleteSelected
                  : ""
              }
              onChange={(e) =>
                title === "Category"
                  ? setCategoryToDeleteSelected(e.target.value)
                  : title === "Product"
                  ? setProductToDeleteSelected
                  : ""
              }
            >
              <option value="">{`Select a ${title} name`}</option>
              {title === "Category" ? (
                categories.map((category) => {
                  return <option value={category}>{category}</option>;
                })
              ) : title === "Product" ? (
                <>
                  {/* {products.map((product) => {
                return <option value={product}>{product}</option>;
              })} */}
                </>
              ) : (
                <></>
              )}
            </select>
            <div className="font-bold text-lg mt-7">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
              >
                Delete
              </button>
            </div>
          </form>
        ) : action === "change" ? (
          <form onSubmit={handleSubmit}>
            {title === "Category" ? (
              <>
                <select
                  name={title}
                  className="mt-4"
                  value={categoryToChangeSelected}
                  onChange={(e) => setCategoryToChangeSelected(e.target.value)}
                >
                  <option value="">{`Select a ${title}`}</option>
                  {categories.map((category) => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
                <input
                  type="text"
                  value={categoryToChange}
                  placeholder={`Type a new ${title} name`}
                  className="border border-black rounded p-2 mt-6"
                  onChange={(e) => setCategoryToChange(e.target.value)}
                />
              </>
            ) : title === "Product" ? (
              <>
                <select
                  name={title}
                  className="mt-4"
                  value={productToChange}
                  onChange={(e) => setProductToChange(e.target.value)}
                >
                  <option value="">{`Select a ${title}`}</option>
                  {products.map((product) => {
                    return <option value={product}>{product}</option>;
                  })}
                </select>
                <input
                  type="text"
                  value={productNameToChange}
                  placeholder={`Type a new ${title} name`}
                  className="border border-black rounded p-2 mt-6"
                  onChange={(e) => setProductNameToChange(e.target.value)}
                />
                <textarea
                  placeholder={`Enter new ${title} description...`}
                  rows="4"
                  cols="30"
                  className="border border-black rounded p-2 mt-6"
                  onChange={(e) => setProductDescToAdd(e.target.value)}
                />
                <select
                  name={title}
                  className="mt-4"
                  value={productCategoryToChangeSelected}
                  onChange={(e) =>
                    setProductCategoryToChangeSelected(e.target.value)
                  }
                >
                  <option value="">{`Select a new ${title} Category`}</option>
                  {categories.map((category) => {
                    return <option value={category}>{category}</option>;
                  })}
                </select>
              </>
            ) : (
              <></>
            )}

            <div className="font-bold text-lg mt-7">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
              >
                Change
              </button>
            </div>
          </form>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
