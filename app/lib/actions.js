"use server";

const bcrypt = require('bcryptjs')
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

import { createUuidOssp, createdb, insertUser } from "./db";

export async function signUp(data) {
  try {
    const email = data.email;
    const password = data.password;
    createUuidOssp();
    const createTable = createdb();
    console.log(`Created "users" table`, createTable);
    const hashedPassword = await bcrypt.hash(password, 10); // 10-digits generated
    insertUser({ email: email, password: hashedPassword });
  } catch (error) {
    console.log("An Error occured: ", error);
    throw error;
  }

  revalidatePath("/sign-up");
  redirect("/");
}
