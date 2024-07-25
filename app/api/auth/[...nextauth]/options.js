import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import TwitterProvider from "next-auth/providers/twitter";
import CredentialsProvider from "next-auth/providers/credentials";

const bcrypt = require("bcryptjs");

import { getUser } from "@/app/lib/db";

export const options = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
    }),
    CredentialsProvider({
      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;

        if (!email || !password) return null;

        const user = await getUser({ email: email });

        if (!user) return null;

        if (user.rows.length > 0) {
          const passwordMatches = await bcrypt.compare(
            password,
            user.rows[0].password
          );

          if (!passwordMatches) {
            return null;
          }

          // return user gives 401 error with unauthorized credentials
          // instead should return the data of the user
          return user.rows[0];
        }
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  secret: process.env.NEXTAUTH_SECRET,
  // probably no need
  // session: {
  //   strategy: "jwt",
  // },
};
