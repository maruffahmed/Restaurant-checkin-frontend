import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { ILoginErrorResponse, ILoginResponse } from "../types/auth";
import axios from "./axios";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        console.log(credentials);
        try {
          const res = await axios("/auth/sign-in", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const user = res.data.data;
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      return { ...token, ...user };
    },
    session: ({ session, token }) => {
      return {
        ...session,
        ...token,
      };
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};
