"use server";

import * as categoryFunctions from "./categories";
import * as productFunctions from "./products";
import * as userFunctions from "./users";
import * as userProductFunctions from "./userProducts";

export const {
  createCategories,
  getCategories,
  insertCategory,
  deleteCategory,
  changeCategory,
  getCategoryIdByName,
} = categoryFunctions;

export const {
  createProducts,
  getProducts,
  insertProduct,
  deleteProduct,
  changeProduct,
  getProductById,
  getProductByName,
  getProductCategoryIdByName,
  filterProductsByGender,
  filterProductsByCategory,
  filterProductsBySearchQuery,
} = productFunctions;

export const {
  createUsers,
  getUsers,
  insertUser,
  deleteUser,
  changeUser,
  getUser,
  getUserIdByName,
} = userFunctions;

export const {
  createUserProducts,
  insertUserProduct,
  deleteUserProduct,
  updateUserProductQuantity,
  getUserProductQuantity,
  getUserProducts,
  checkUserProductExists,
} = userProductFunctions;

import { sql, db } from "@vercel/postgres";

// Create DB with all tables
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
