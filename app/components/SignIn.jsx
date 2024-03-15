"use client";

// import Link from "next/link";
// import { useSession } from "next-auth/client"

export default function SignIn() {

  // const [session, loading] = useSession()

  // if (session) {
  //   return <p>Signed in as {session.user.email}</p>
  // }
  

  return (
    <div className="mt-8 ml-8">



      {/* <form onSubmit={handleSubmit}>
        <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
        <div className="block">
          <label htmlFor="email" className="pr-2 block">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="email"
            className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={(e) => setEmail(e.target.value)}
          />

          {errors.email && <p>{errors.email}</p>}
        </div>

        <div className="block">
          <label htmlFor="password" className="pr-2 block">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            className="rounded-md border border-[#e0e0e0] bg-white pl-2 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <p>{errors.password}</p>}
        </div>

        <button type="submit" className="mt-3" disabled={!isFormValid}>
          Sign In
        </button>
        <Link
          className="inline-block ml-3 align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
          href="/sign-up"
        >
          Don't have an account?
        </Link>
      </form> */}

      {/* <h1 className="text-white-500">{session?.user}</h1> */}
    </div>
  );
}
