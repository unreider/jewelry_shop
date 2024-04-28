"use client";

import { useState } from "react";
import { insertProduct } from "@/app/lib/db";

export default function AddProduct({ categories }) {
  const [formData, setFormData] = useState({
    name: "",
    desc: "",
    price: "",
    image: {},
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
    await insertProduct(formData);
    setFormData({
      name: "",
      desc: "",
      price: "",
      image: {},
      category: "",
    });
  };

  const handleProductImage = (e) => {
    const file = e.target.files[0];
    const parsedFile = {
      name: file.name,
      size: file.size,
      type: file.type,
    };
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const fileData = event.target.result;
        setFormData((prevData) => ({
          ...prevData,
          image: { file: parsedFile, fileData: fileData },
        }));
      };
      reader.readAsDataURL(file);
    }
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

      <select
        name="category"
        className="mt-3"
        value={formData.category}
        onChange={handleChange}
      >
        <option value="">Select a Category</option>
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
          Add
        </button>
      </div>
    </form>
  );
}
