"use server";

import { sql } from "@vercel/postgres";

export async function createUuidOssp() {
  await sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
}

// I have to make createdb() for every possible table and query
export async function createdb() {
  const table = sql`
  CREATE TABLE IF NOT EXISTS users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    password TEXT NOT NULL
  )`;
  return table;
}

export async function insertUser(data) {
  const user = await sql`INSERT INTO users (email, password)
    VALUES (${data.email}, ${data.password})`;
  return user;
} 