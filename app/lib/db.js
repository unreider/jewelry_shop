"use server";

import { sql } from "@vercel/postgres";
import { db } from "@vercel/postgres";
import { NextResponse } from "next/server";

import fs from "fs";
import path from "path";

export async function createUuidOssp() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
}

// Creating tables in order
// ! ALSO: I have to make createdb() for every possible table and query
export async function createCategories(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  )`;
  console.log("\n\n\nRESULT ", result);
  return NextResponse.json({ result }, { status: 200 });
}

export async function createProducts(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    price INT NOT NULL,
    image VARCHAR(255),
    category_id UUID REFERENCES categories(id)
  )`;
  return NextResponse.json({ result }, { status: 200 });
}

export async function createUsers(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
  )`;
  return NextResponse.json({ result }, { status: 200 });
}

export async function createUserProducts(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS user_products (
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    PRIMARY KEY (user_id, product_id)
  )`;
  return NextResponse.json({ result }, { status: 200 });
}

export async function insertCategory(name) {
  const category = await sql`INSERT INTO categories (name) VALUES (${name})`;
  return category;
}

export async function deleteCategory(name) {
  await sql`DELETE FROM categories WHERE name = ${name};`;
}

export async function changeCategory(oldName, newName) {
  try {
    const category = await sql`
      UPDATE categories
      SET name = ${newName}
      WHERE name = ${oldName}
    `;
    return category;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getCategories() {
  const categories = await sql`SELECT (name) FROM categories`;
  // to get only names in an array
  const parsedCategories = categories.rows.map((row) => row.name);
  return parsedCategories;
}

async function getProductCategoryId(name) {
  const category_id =
    await sql`SELECT (id) FROM categories WHERE name = ${name}`;
  return category_id.rows[0].id;
}

export async function insertProduct(data) {
  const category_id = await getProductCategoryId(data.category_name);
  const imageFileName = `${Date.now()}-${data.image.file.name}`;
  const directory = "public/uploads";
  const imagePathOnServer = path.join(
    directory,
    imageFileName
  );

  if (!fs.existsSync(directory)) {
    fs.mkdirSync(directory);
  }
  
  fs.writeFileSync(imagePathOnServer, data.image.fileData);

  const product =
    await sql`INSERT INTO products (name, description, price, image, category_id) VALUES (${data.name}, ${data.desc}, ${data.price}, ${imagePathOnServer}, ${category_id})`;
  return product;
}

export async function deleteProduct(name) {
  await sql`DELETE FROM products WHERE name = ${name};`;
}

export async function changeProduct(data) {
  const oldName = data.name.oldName;
  const newName = data.name.newName;
  const desc = data.desc;
  const price = data.price;
  const image = data.image;
  // console.log("data.category_name", data.category_name);
  const category_id = await getProductCategoryId(data.category_name);
  const product = await getProduct(oldName);
  const productId = product.id;

  try {
    //
    const product = await sql`
      UPDATE products
      SET
        name = ${newName},
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

export async function insertUser(data) {
  const user = await sql`INSERT INTO users (name, email, password)
    VALUES (${data.name}, ${data.email}, ${data.password})`;
  return user;
}

// export async function insertUserProducts(data) {}

export async function getUser(data) {
  const email = data.email;
  const user = await sql`SELECT * FROM users WHERE email = ${email}`;
  return user;
}

export async function getProduct(name) {
  const product = await sql`SELECT * FROM products WHERE name = ${name}`;
  return product.rows[0];
}

export async function getProductCategoryIdByName(id) {
  const productCategory =
    await sql`SELECT (name) FROM categories WHERE id = ${id}`;
  return productCategory.rows[0].name;
}

// check if name or email already exists in the database
export async function checkParamExists(param, userText) {
  const query = await sql`SELECT * FROM users WHERE ${param} = ${userText}`;
  console.log("query.rows", query.rows);
  if (query.rows.length > 0) return true;
  else return false;
}

export async function createdb() {
  const client = await db.connect();

  await createCategories(client);
  console.log("categories table created!");

  await createProducts(client);
  console.log("products table created!");

  await createUsers(client);
  console.log("users table created!");

  await createUserProducts(client);
  console.log("user products table created!");
}
