"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { getUser } from "@/app/lib/db";
import { useRouter } from "next/navigation";

import { CategoriesProvider } from "@/app/context/CategoriesProvider";
import { ProductsProvider } from "@/app/context/ProductsProvider";
import { UsersProvider } from "@/app/context/UsersProvider";

import AddCategory from "./Category/AddCategory";
import DeleteCategory from "./Category/DeleteCategory";
import ChangeCategory from "./Category/ChangeCategory";

import AddProduct from "./Product/AddProduct";
import DeleteProduct from "./Product/DeleteProduct";
import ChangeProduct from "./Product/ChangeProduct";

import AddUser from "./User/AddUser";
import DeleteUser from "./User/DeleteUser";
import ChangeUser from "./User/ChangeUser";

export default function Admin() {
  const { data: session, status } = useSession();
  const [userIsAdmin, setUserIsAdmin] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      if (session) {
        const user = await getUser({ email: session.user.email });
        if (user.rows[0].role === "admin") {
          setUserIsAdmin(true);
        } else {
          router.push("/"); // Redirect if not admin
        }
      } else if (status === "unauthenticated") {
        router.push("/"); // Redirect if not authenticated
      }
    };
    fetchData();
  }, [session, status, router]);

  if (status === "loading") {
    return <div>Loading...</div>; // Display loading state if session is loading
  }

  if (!userIsAdmin) {
    return null; // Return null to avoid rendering the rest of the component if the user is not an admin
  }

  return (
    <ProductsProvider>
      <CategoriesProvider>
        <UsersProvider>
          <div className="text-center mt-12 font-bold text-2xl">Admin Page</div>
          <div className="text-center mt-12 font-bold text-xl">Categories</div>
          <div className="p-9 mt-2 grid grid-cols-3 gap-x-6 gap-y-10">
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Add a Category</div>
                <AddCategory />
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Delete a Category</div>
                <DeleteCategory />
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Change a Category</div>
                <ChangeCategory />
              </div>
            </div>
          </div>

          <div className="text-center mt-12 font-bold text-xl">Products</div>
          <div className="p-9 mt-2 grid grid-cols-3 gap-x-6 gap-y-10">
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Add a Product</div>
                <AddProduct />
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Delete a Product</div>
                <DeleteProduct />
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Change a Product</div>
                <ChangeProduct />
              </div>
            </div>
          </div>

          <div className="text-center mt-12 font-bold text-xl">Users</div>
          <div className="p-9 mt-2 mb-10 grid grid-cols-3 gap-x-6 gap-y-10">
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Add a User</div>
                <AddUser />
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Delete a User</div>
                <DeleteUser />
              </div>
            </div>
            <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">Change a User</div>
                <ChangeUser />
              </div>
            </div>
          </div>
        </UsersProvider>
      </CategoriesProvider>
    </ProductsProvider>
  );
}