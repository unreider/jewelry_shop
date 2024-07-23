"use server";

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function createUserProducts(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS user_products (
    user_id UUID REFERENCES users(id),
    product_id UUID REFERENCES products(id),
    quantity INTEGER NOT NULL DEFAULT 1,
    PRIMARY KEY (user_id, product_id)
  )`;
  return NextResponse.json({ result }, { status: 200 });
}

// User's Products functions
export async function insertUserProduct(userId, productId) {
  await sql`INSERT INTO user_products (user_id, product_id)
    VALUES (${userId}, ${productId})`;
}

export async function deleteUserProduct(userId, productId) {
  await sql`DELETE FROM user_products WHERE user_id = ${userId} AND product_id = ${productId}`;
}

export async function updateUserProductQuantity(userId, productId, quantity) {
  await sql`UPDATE user_products
    SET quantity = ${quantity}
    WHERE user_id = ${userId} AND product_id = ${productId}`;
}

export async function getUserProductQuantity(userId, productId) {
  const quantity = await sql`SELECT quantity FROM user_products WHERE
    user_id = ${userId} AND product_id = ${productId}`;
  return quantity.rows[0].quantity;
}

export async function getUserProducts(userId) {
  const userProducts = await sql`SELECT * FROM user_products WHERE user_id = ${userId}`;
  return userProducts.rows;
}

export async function checkUserProductExists(userId, productId) {
  const userProducts = await sql`SELECT * FROM user_products WHERE user_id = ${userId} AND product_id = ${productId}`;
  if (userProducts.rows.length) return true;
  return false;
}