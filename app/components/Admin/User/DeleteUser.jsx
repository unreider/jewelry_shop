"use client";

import { useState } from "react";
import { deleteUser } from "@/app/lib/db";
import { useUsers } from "@/app/context/UsersProvider";

export default function DeleteUser() {
  const [userSelected, setUserSelected] = useState("");
  const { users, setUsers } = useUsers();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await deleteUser(userSelected);
    setUsers((prevUsers) => prevUsers.filter((user) => user !== userSelected));
    setUserSelected("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <select
        name="User Selected"
        className="mt-5"
        value={userSelected}
        onChange={(e) => setUserSelected(e.target.value)}
      >
        <option value="">{`Select a User`}</option>
        {users && users.map((user) => (
          <option key={user} value={user}>
            {user}
          </option>
        ))}
      </select>
      <div className="font-bold text-lg mt-7">
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-5 rounded"
        >
          Delete
        </button>
      </div>
    </form>
  );
}
