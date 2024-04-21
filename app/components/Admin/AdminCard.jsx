"use client";

import { useState, useEffect } from "react";
import {
  insertCategory,
  deleteCategory,
  changeCategory,
  insertProduct,
  deleteProduct,
  changeProduct,
  getProduct,
  getProductCategoryIdByName,
} from "@/app/lib/db";

export default function AdminCard({ action, title, categories, products }) {
  const [categoryToAdd, setCategoryToAdd] = useState("");
  const [categoryToDeleteSelected, setCategoryToDeleteSelected] = useState("");
  const [categoryToChange, setCategoryToChange] = useState("");
  const [categoryToChangeSelected, setCategoryToChangeSelected] = useState("");

  const [productNameToAdd, setProductNameToAdd] = useState("");
  const [productDescToAdd, setProductDescToAdd] = useState("");
  const [productPriceToAdd, setProductPriceToAdd] = useState("");
  const [productImageToAdd, setProductImageToAdd] = useState({});
  const [productCategoryToAddSelected, setProductCategoryToAddSelected] =
    useState("");
  const [productToDeleteSelected, setProductToDeleteSelected] = useState("");
  const [productToChange, setProductToChange] = useState("");
  const [productNameToChange, setProductNameToChange] = useState("");
  const [productDescToChange, setProductDescToChange] = useState("");
  const [productPriceToChange, setProductPriceToChange] = useState("");
  // const [productImageToChange, setProductImageToChange] = useState("");
  const [productCategoryToChangeSelected, setProductCategoryToChangeSelected] =
    useState("");

  // const [newCategories, setNewCategories] = useState(categories);
  // const [newProducts, setNewProducts] = useState(products);

  // const [deleteRemountKey, setDeleteRemountKey] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();

    switch (action) {
      case "add":
        if (title === "Category") {
          // Update 'categories'
          categories.push(categoryToAdd);
          // setDeleteRemountKey(prevKey => prevKey + 1);

          insertCategory(categoryToAdd);
          setCategoryToAdd("");
        } else if (title === "Product") {
          // Update 'products'
          products.push(productNameToAdd);

          insertProduct({
            name: productNameToAdd,
            desc: productDescToAdd,
            price: productPriceToAdd,
            // image: `/uploads/${productImageToAdd.name}`,
            image: {file: productImageToAdd.file, fileData: productImageToAdd.fileData},
            category_name: productCategoryToAddSelected,
          });
          setProductNameToAdd("");
          setProductDescToAdd("");
          setProductPriceToAdd("");
          setProductImageToAdd({});
          setProductCategoryToAddSelected("");
        }
        break;
      case "delete":
        if (title === "Category") {
          // Update 'categories'
          const currentCategoryIndex = categories.indexOf(
            categoryToChangeSelected
          );
          categories.splice(currentCategoryIndex, 1);

          deleteCategory(categoryToDeleteSelected);
          setCategoryToDeleteSelected("");
        } else if (title === "Product") {
          // Update 'products'
          const currentProductIndex = products.indexOf(productToChange);
          products.splice(currentProductIndex, 1);

          console.log("productToDeleteSelected", productToDeleteSelected);
          deleteProduct(productToDeleteSelected);
          setProductToDeleteSelected("");
        }
      case "change":
        if (title === "Category") {
          // Update 'categories'
          const currentCategoryIndex = categories.indexOf(
            categoryToChangeSelected
          );
          categories[currentCategoryIndex] = categoryToChange;

          changeCategory(categoryToChangeSelected, categoryToChange);
          // Reset input value
          setCategoryToChange("");
          setCategoryToChangeSelected("");
        } else if (title === "Product") {
          // Update 'products'
          const currentProductIndex = products.indexOf(productToChange);
          products[currentProductIndex] = productNameToChange;

          changeProduct({
            name: { oldName: productToChange, newName: productNameToChange },
            desc: productDescToChange,
            price: productPriceToChange,
            // image: productImageToChange,
            category_name: productCategoryToChangeSelected,
          });
          setProductToChange("");
          setProductNameToChange("");
          setProductDescToChange("");
          setProductPriceToChange("");
          // setProductImageToChange("");
          setProductCategoryToChangeSelected("");
        }
      default:
        break;
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log('File', file);
    const parsedFile = {
      name: file.name,
      size: file.size,
      type: file.type
    }
    if (file) {
      const reader = new FileReader(); // Create a FileReader object
      reader.onload = function(event) {
        // The file data is available in event.target.result
        const fileData = event.target.result;
        console.log('File data:', fileData);
        setProductImageToAdd({file: parsedFile, fileData: fileData});
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  const handleProductToChange = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setProductToChange(value);

    const parsedProduct = await getProduct(value);
    setProductNameToChange(parsedProduct.name);
    setProductDescToChange(parsedProduct.description);
    const productCategoryName = await getProductCategoryIdByName(
      parsedProduct.category_id
    );
    setProductCategoryToChangeSelected(productCategoryName);
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
                <input
                  type="number"
                  value={productPriceToAdd}
                  placeholder={`Type a ${title} price`}
                  className="border border-black rounded p-2 mt-2"
                  onChange={(e) => setProductPriceToAdd(e.target.value)}
                />
                <input type="file" accept="image/*" onChange={handleImageChange} />
                {/* <Image src={productImageToAdd} alt={product.name} width={300} height={200} /> */}
                <select
                  name={title}
                  className="mt-3"
                  value={productCategoryToAddSelected}
                  onChange={(e) =>
                    setProductCategoryToAddSelected(e.target.value)
                  }
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
                  ? setProductToDeleteSelected(e.target.value)
                  : ""
              }
            >
              <option value="">{`Select a ${title} name`}</option>

              {/* ! There is a remount problem when I add, it's not in delete select */}
              {/* {console.log("newCategories", newCategories)} */}

              {title === "Category" ? (
                categories.map((category) => {
                  return (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  );
                })
              ) : title === "Product" ? (
                products.map((product) => {
                  return (
                    <option key={product} value={product}>
                      {product}
                    </option>
                  );
                })
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
                  onChange={handleProductToChange}
                >
                  <option value="">{`Select a ${title}`}</option>
                  {products.map((product) => {
                    return (
                      <option key={product} value={product}>
                        {product}
                      </option>
                    );
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
                  value={productDescToChange}
                  placeholder={`Enter new ${title} description...`}
                  rows="4"
                  cols="30"
                  className="border border-black rounded p-2 mt-6"
                  onChange={(e) => setProductDescToChange(e.target.value)}
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
