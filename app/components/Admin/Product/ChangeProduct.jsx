"use client";

import { useState } from "react";
import { changeProduct } from "@/app/lib/db";

import { getProductByName, getProductCategoryIdByName } from "@/app/lib/db";
import path from "path";
import { useProducts } from "@/app/context/ProductsProvider";
import { useCategories } from "@/app/context/CategoriesProvider";

export default function ChangeProduct() {
  const [productSelected, setProductSelected] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
    gender: "",
    category: "",
  });
  const { products, setProducts, setProductNames } = useProducts();
  const { categories } = useCategories();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changeProduct({ oldName: productSelected, formData: formData });

    // Update the products state with the changed product
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.name === productSelected ? { ...product, ...formData } : product
      )
    );

    // Update the product names state with the changed product
    setProductNames((prevProductNames) => 
      prevProductNames.map((productName) =>
        productName === productSelected ? productSelected : productName
      )
    )

    setFormData({
      name: "",
      desc: "",
      price: "",
      image: "",
      gender: "",
      category: "",
    });
    setProductSelected("");
  };

  const handleProductImage = async (e) => {
    const file = e.target.files[0];

    const imageFileName = `${Date.now()}-${file.name.replace(/ /g, "-")}`;

    const data = new FormData();
    data.set("file", file);
    data.set("imageFileName", imageFileName);

    const response = await fetch("/api/uploadImage", {
      method: "POST",
      body: data,
    });

    if (!response.ok) throw new Error(await response.text());

    const pageDirectory = path.resolve("uploads");
    const pagePath = path.join(pageDirectory, imageFileName);

    // console.log('pagePath', pagePath);

    setFormData((prevData) => ({
      ...prevData,
      image: pagePath,
    }));
  };

  const handleChangeProduct = async (e) => {
    e.preventDefault();
    const value = e.target.value;
    setProductSelected(value);

    const parsedProduct = await getProductByName(value);
    const productCategoryName = await getProductCategoryIdByName(
      parsedProduct.category_id
    );

    setFormData((prevData) => ({
      ...prevData,
      name: parsedProduct.name,
      desc: parsedProduct.description,
      price: parsedProduct.price,
      image: parsedProduct.image,
      gender: parsedProduct.gender,
      category: productCategoryName,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name=""
        className="mt-4"
        value={productSelected}
        onChange={handleChangeProduct}
      >
        <option value="">Select a Product</option>
        {products &&
          products.map((row) => (
            <option key={row.id} value={row.name}>
              {row.name}
            </option>
          ))}
      </select>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder={`Type a new Product name`}
        className="border border-black rounded p-2 mt-6"
        onChange={handleChange}
      />
      <textarea
        name="desc"
        value={formData.desc}
        placeholder={`Enter a new Product description...`}
        rows="4"
        cols="30"
        className="border border-black rounded p-2 mt-6"
        onChange={handleChange}
      />
      <input
        type="number"
        min="0"
        step="1"
        name="price"
        value={formData.price}
        placeholder={`Type a new Product price`}
        className="border border-black rounded p-2 mt-3"
        onChange={handleChange}
      />

      {/* <div className="flex items-center justify-center mt-3">
        <label className="cursor-pointer flex items-center justify-center w-32 h-16 bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none transition duration-300 ease-in-out">
          <input
            type="file"
            accept="image/*"
            onChange={handleProductImage}
            className="hidden"
          />
          Upload Image
        </label>
      </div> */}
      <div className="flex items-center justify-center mt-3">
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleProductImage}
        />
      </div>

      <div className="mt-5 mb-2">
        <label htmlFor="gender" className="mr-3">
          Gender:
        </label>
        <select
          name="gender"
          id="gender"
          value={formData.gender}
          onChange={handleChange}
        >
          <option value="m">Men</option>
          <option value="w">Women</option>
          <option value="x">Men and Women</option>
        </select>
      </div>

      <select
        name="category"
        className="mt-4"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select the Product's Category</option>
        {categories &&
          categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
      </select>
      <div className="font-bold text-lg mt-7">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
        >
          Change
        </button>
      </div>
    </form>
  );
}
