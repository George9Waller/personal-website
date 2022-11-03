import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "../../../prisma/db";
import { Provider } from "next-auth/providers";
import { User } from "@prisma/client";

const googleProvider = GoogleProvider({
  clientId: process.env.GOOGLE_CLIENT_ID || "",
  clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
});

const credentialsProvider = CredentialsProvider({
  name: "Email & Password",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials, _req) {
    // When updating test users made sure corresponding ones are made in ./prisma/seed.mjs
    const admin: User = {
      id: "1",
      name: "Adam Admin",
      email: "adam@admin.invalid",
      emailVerified: new Date("2022-07-25"),
      image: null,
      isAdmin: true,
      secureInfoPasswordHash: "",
      secureInfoPasswordSalt: "",
    };
    const user: User = {
      id: "2",
      name: "Ursula User",
      email: "ursula@user.invalid",
      emailVerified: new Date("2022-07-25"),
      image: null,
      isAdmin: false,
      secureInfoPasswordHash: "",
      secureInfoPasswordSalt: "",
    };

    if (process.env.APP_ENV === "test") {
      switch (credentials?.password) {
        case "admin":
          return admin;
        default:
          return user;
      }
    }
    return null;
  },
});

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: ([googleProvider] as Provider[]).concat(
    process.env.APP_ENV === "test" ? [credentialsProvider] : []
  ),
  callbacks: {
    session: async ({ session, token }) => {
      if (session?.user) {
        session.user.id = token.uid;
      }
      return session;
    },
    jwt: async ({ user, token }) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
  },
};

export default NextAuth(authOptions);
