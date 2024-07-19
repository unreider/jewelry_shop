"use client";

import { useState } from "react";
import { changeProduct } from "@/app/lib/db";

import { getProductByName, getProductCategoryIdByName } from "@/app/lib/db";
import path from "path";

export default function ChangeProduct({ categories, products }) {
  const [productSelected, setProductSelected] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    image: "",
    gender: "",
    category: "",
  });

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
    setFormData({
      name: "",
      desc: "",
      price: "",
      image: "",
      gender: "",
      category: "",
    });
  };

  const handleProductImage = async (e) => {
    const file = e.target.files[0];

    const imageFileName = `${Date.now()}-${file.name.replace(/ /g, "-")}`;

    const data = new FormData();
    data.set('file', file)
    data.set('imageFileName', imageFileName)

    const response = await fetch('/api/uploadImage', {
      method: 'POST',
      body: data,
    });

    if (!response.ok) throw new Error(await response.text())

    const pageDirectory = path.resolve("uploads");
    const pagePath = path.join(pageDirectory, imageFileName);

    console.log('pagePath', pagePath);

    setFormData((prevData) => ({
      ...prevData,
      image: pagePath,
    }));
  }

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
    }))
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
        {products.map((prod) => (
          <option key={prod} value={prod}>
            {prod}
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
      <div className="flex items-center justify-center mt-3">
        <label className="cursor-pointer flex items-center justify-center w-32 h-16 bg-gray-100 rounded-lg border border-gray-300 hover:border-gray-500 focus:border-gray-500 focus:outline-none transition duration-300 ease-in-out">
          <input
            type="file"
            accept="image/*"
            onChange={handleProductImage}
            className="hidden"
          />
          Upload Image
        </label>
      </div>

      <input
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
      />

      <select
        name="category"
        className="mt-4"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select the Product's Category</option>
        {categories.map((cat) => (
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
