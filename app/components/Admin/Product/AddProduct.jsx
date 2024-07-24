"use client";

import { useState } from "react";
import { insertProduct } from "@/app/lib/db";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import { useCategories } from "@/app/context/CategoriesProvider";
import { useProducts } from "@/app/context/ProductsProvider";

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
    gender: "",
    category: "",
  });
  const { categories } = useCategories();
  const { setProducts, setProductNames } = useProducts();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.image) return;

    // Generate a unique ID for the new product
    const newProduct = { ...formData, id: uuidv4() };

    try {
      await insertProduct(newProduct);

      // Update the products state with the new product
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      // Update the product names state with the new product
      setProductNames((prevProductNames) => [
        ...prevProductNames,
        formData.name,
      ]);

      setFormData({
        name: "",
        desc: "",
        price: "",
        image: "",
        gender: "",
        category: "",
      });
    } catch (error) {
      console.error(error);
    }
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

    setFormData((prevData) => ({
      ...prevData,
      image: pagePath,
    }));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        value={formData.name}
        placeholder={`Type a Product name`}
        className="border border-black rounded p-2 mt-3"
        onChange={handleChange}
      />
      <textarea
        name="desc"
        value={formData.desc}
        placeholder={`Enter Product description...`}
        rows="4"
        cols="30"
        className="border border-black rounded p-2 mt-3"
        onChange={handleChange}
      />
      <input
        type="number"
        min="0"
        step="1"
        name="price"
        value={formData.price}
        placeholder={`Type a Product price`}
        className="border border-black rounded p-2 mt-3"
        onChange={handleChange}
      />
      <div className="flex items-center justify-center mt-3">
        {/* <label className="cursor-pointer flex items-center justify-center w-32 h-16 bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none transition duration-300 ease-in-out"> */}
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleProductImage}
          // className="hidden"
        />
        {/* Upload Image
        </label> */}

        {/* <ServerUploadImage /> */}
        {/* <input type="file" name="file" />
        <input type="submit" value="Upload" /> */}
      </div>

      {/* <input
        type="text"
        pattern="[mwx]{1}"
        title="Please enter m/w/x"
        min="0"
        step="1"
        name="gender"
        value={formData.gender}
        placeholder={`What gender is the Product for (m/w/x)`}
        className="border border-black rounded p-2 mt-3"
        onChange={handleChange}
        required
      /> */}

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
        className="mt-3"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select a Category</option>
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
          Add
        </button>
      </div>
    </form>
  );
}
