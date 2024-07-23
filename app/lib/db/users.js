"use server";

import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

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

// User functions
export async function insertUser(data) {
  const user = await sql`INSERT INTO users (name, email, password)
    VALUES (${data.name}, ${data.email}, ${data.password})`;
  return user;
}

export async function deleteUser(name) {
  await sql`DELETE FROM users WHERE name = ${name};`;
}

export async function changeUser(data) {
  const userId = await getUserIdByName(data.userSelected);

  try {
    const user = await sql`
      UPDATE users
      SET
        name = ${data.formData.name},
        email = ${data.formData.email},
        password = ${data.formData.password}
      WHERE
        id = ${userId}
    `;
    return user;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

export async function getUsers() {
  const users = await sql`SELECT name FROM users`;
  const parsedUsers = users.rows.map((row) => row.name);
  return parsedUsers;
}

export async function getUser(email) {
  const user = await sql`SELECT * FROM users WHERE email = ${email}`;
  return user;
}

export async function getUserIdByName(name) {
  const user = await sql`SELECT id FROM users WHERE name = ${name}`;
  if (user.rows.length > 0) return user.rows[0].id;
  return null;
}