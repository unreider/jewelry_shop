"use client";
import AddCategory from "./Category/AddCategory";
import DeleteCategory from "./Category/DeleteCategory";
import ChangeCategory from "./Category/ChangeCategory";

import AddProduct from "./Product/AddProduct";
import DeleteProduct from "./Product/DeleteProduct";
import ChangeProduct from "./Product/ChangeProduct";

import AddUser from "./User/AddUser";
import DeleteUser from "./User/DeleteUser";
import ChangeUser from "./User/ChangeUser";

export default function AdminCard({
  action,
  title,
  categories,
  products,
  users,
}) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg text-center py-5">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">
          {action.charAt(0).toUpperCase() + action.slice(1).toLowerCase()} a{" "}
          {title[0].toUpperCase() + title.slice(1).toLowerCase()}
        </div>

        {(action === "add" &&
          ((title === "category" && <AddCategory />) ||
            (title === "product" && <AddProduct categories={categories} />) ||
            (title === "user" && <AddUser />))) ||
          (action === "delete" &&
            ((title === "category" && (
              <DeleteCategory categories={categories} />
            )) ||
              (title === "product" && <DeleteProduct products={products} />) ||
              (title === "user" && <DeleteUser users={users} />))) ||
          (action === "change" &&
            ((title === "category" && (
              <ChangeCategory categories={categories} />
            )) ||
              (title === "product" && (
                <ChangeProduct categories={categories} products={products} />
              )) ||
              (title === "user" && <ChangeUser users={users} />)))}
      </div>
    </div>
  );
}
