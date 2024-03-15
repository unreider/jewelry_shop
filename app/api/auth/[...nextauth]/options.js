// import { sql } from "@vercel/postgres";
import GoogleProvider from "next-auth/providers/google";
// const bcrypt = require("bcryptjs");

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,

  // callbacks: {
  //   async signIn({account, profile }) {
  //     if (account.provider == "google") {
  //       return profile.email_verified && profile.email.endsWith("@example.com")
  //     }
  //     return true // Do different verification for other providers that don't have `email_verified`
  //   }
  // },
  // pages: {
  //   signIn: "/sign-in",
  // },
  
};
