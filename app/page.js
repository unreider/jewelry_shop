import Image from "next/image";
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col h-screen justify-center">
      <div className="text-center flex flex-col">
        <Link href="/profile">Profile</Link>
        <Link href="/about">About</Link>
        <Link href="/cart">Cart</Link>
        <Link href="/categories">Categories</Link>
        <Link href="/sign-in">Sign In</Link>
        <Link href="/sign-up">Sign Up</Link>
      </div>
    </div>
  );
}
