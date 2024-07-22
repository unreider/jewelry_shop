"use client";

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function Profile() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        setSession(session);
      }
    };
    fetchData();
  }, []);

  if (!session) {
    return (
      <div className="bg-white text-black flex flex-col h-screen justify-center items-center text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg overflow-hidden md:max-w-2xl">
        <div className="md:flex">
          <div className="w-full p-4">
            <h1 className="text-center text-3xl font-bold text-gray-900">
              Profile Page
            </h1>
            <div className="mt-4">
              <h2 className="text-center text-xl font-semibold text-gray-700">
                {session.user.name}
              </h2>
              <p className="text-center text-gray-500">{session.user.email}</p>
            </div>
            <div className="mt-6 flex justify-center">
              <Link
                href="/"
                className="text-indigo-600 hover:text-indigo-900 font-medium"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
