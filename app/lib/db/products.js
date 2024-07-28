"use server";

import { sql } from "@vercel/postgres";
import { getCategoryIdByName } from './categories';
import { NextResponse } from "next/server";

export async function createProducts(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255),
    gender CHAR NOT NULL DEFAULT 'x',
    category_id UUID REFERENCES categories(id)
  )`;
  return NextResponse.json({ result }, { status: 200 });
}

export async function insertProduct(data) {
  const parsedInt = parseInt(data.price);
  const category_id = await getCategoryIdByName(data.category);
  try {
    const product = await sql`
      INSERT INTO products (name, description, price, image, gender, category_id)
      VALUES (${data.name}, ${data.desc}, ${parsedInt}, ${data.image}, ${data.gender}, ${category_id})
    `;
    return product;
  } catch (error) {
    console.error("Error inserting product:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function deleteProduct(name) {
  await sql`DELETE FROM products WHERE name = ${name};`;
}

export async function changeProduct(data) {
  const name = data.formData.name;
  const desc = data.formData.desc;
  const price = data.formData.price;
  const image = data.formData?.image;
  const category_id = await getCategoryIdByName(data.formData.category);
  const product = await getProductByName(data.oldName);
  const productId = product.id;

  try {
    const product = await sql`
      UPDATE products
      SET
        name = ${name},
        description = ${desc},
        price = ${price},
        image = ${image},
        category_id = ${category_id}
      WHERE
        id = ${productId}
    `;
    return product;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getProducts() {
  const products = await sql`SELECT * FROM products`;
  return products.rows;
}

export async function filterProductsByGender(gender) {
  const products = await sql`SELECT * FROM products WHERE gender = ${gender}`;
  return products.rows;
}

export async function filterProductsByCategory(categoryId) {
  // const categoryId = await getCategoryIdByName(categoryName);
  const products = await sql`SELECT * FROM products WHERE category_id = ${categoryId}`;
  return products.rows;
}

export async function filterProductsBySearchQuery(searchQuery) {
  const products = await getProducts();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return filteredProducts;
}

export async function getProductById(id) {
  const product = await sql`SELECT * FROM products WHERE id = ${id}`;
  return product.rows[0];
}

export async function getProductByName(name) {
  const product = await sql`SELECT * FROM products WHERE name = ${name}`;
  return product.rows[0];
}

export async function getProductCategoryIdByName(id) {
  const productCategory = await sql`SELECT name FROM categories WHERE id = ${id}`;
  return productCategory.rows[0].name;
}