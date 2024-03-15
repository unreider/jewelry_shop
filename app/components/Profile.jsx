'use client';

import { getSession } from "next-auth/react";
import { useState, useEffect } from "react";

export default function Profile() {

  const [session, setSession] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const session = await getSession();
      if (session) {
        setSession(session);
      }
    }
    fetchData();
  }, []);

  if (!session) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col h-screen justify-center text-center">
      Profile Page
      <br />
      <h1>Session user name: {session.user.name}</h1>
      <h1>Session user email: {session.user.email}</h1>
    </div>
  )
}