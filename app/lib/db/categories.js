"use server";

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function createCategories(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL
  )`;
  return NextResponse.json({ result }, { status: 200 });
}

// Category functions
export async function insertCategory(data) {
  const category = await sql`INSERT INTO categories (name) VALUES (${data.name})`;
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
  const categories = await sql`SELECT * FROM categories`;
  return categories.rows;
}

export async function getCategoryIdByName(name) {
  const category = await sql`SELECT id FROM categories WHERE name = ${name}`;
  return category.rows[0]?.id;
}
