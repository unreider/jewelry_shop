import Image from "next/image";
import Link from "next/link";

// import { useSession } from "next-auth/react";

export default function Home() {

  

  return (
    <div className="w-full text-center">
      <div className="relative mt-8">
        <div className="block">
          <Link href="/profile">Profile</Link>
        </div>
        <div className="block">
          <Link href="/about">About</Link>
        </div>
        <div className="block">
          <Link href="/cart">Cart</Link>
        </div>
        <div className="block">
          <Link href="/categories">Categories</Link>
        </div>
        <div className="block">
          <Link href="/sign-in">Sign In</Link>
        </div>
        <div className="block">
          <Link href="/sign-up">Sign Up</Link>
        </div>

        {/* <h1 className="text-white-500">{session?.user.email}</h1> */}
      </div>
    </div>
  );
}
