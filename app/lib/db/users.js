"use server";

const bcrypt = require("bcryptjs");
import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function createUsers(client) {
  const result = await client.sql`
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL,
    role VARCHAR(50) DEFAULT 'user' NOT NULL
  )`;
  return NextResponse.json({ result }, { status: 200 });
}

// User functions
export async function insertUser(data) {
  if (data.role) {
    var user = await sql`INSERT INTO users (name, email, password, role)
      VALUES (${data.name}, ${data.email}, ${data.password}, ${data.role})`;
  } else {
    var user = await sql`INSERT INTO users (name, email, password)
      VALUES (${data.name}, ${data.email}, ${data.password})`;
  }
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
        password = ${data.formData.password},
        role = ${data.formData.role}
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
  const users = await sql`SELECT * FROM users`;
  // const parsedUsers = users.rows.map((row) => row.name);
  return users.rows;
}

export async function getUser({ name = "", email = "" }) {
  console.log('name, email', name, email);
  let user;
  if (name) {
    user = await sql`SELECT * FROM users WHERE name = ${name}`;
  } else if (email) {
    user = await sql`SELECT * FROM users WHERE email = ${email}`;
  }
  return user;
}

export async function getUserIdByName(name) {
  const user = await sql`SELECT id FROM users WHERE name = ${name}`;
  if (user.rows.length > 0) return user.rows[0].id;
  return null;
}

// check if name or email already exists in the database
export async function checkParamExists(param, userText) {
  const query = await sql`SELECT * FROM users WHERE ${param} = ${userText}`;
  // console.log("query.rows", query.rows);
  if (query.rows.length > 0) return true;
  else return false;
}