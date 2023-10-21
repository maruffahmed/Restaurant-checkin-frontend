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
        try {
          const res = await axios("/auth/email/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            data: JSON.stringify(credentials),
          });
          const user: ILoginResponse | ILoginErrorResponse = res.data;
          if ("errors" in user) {
            return null;
          }
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      const isTokenExpired = Date.now() > token?.tokenExpires;
      if (isTokenExpired) {
        // refresh token
        const res = await axios.post(
          "/auth/refresh",
          {},
          {
            headers: {
              Authorization: `Bearer ${token?.refreshToken}`,
            },
          }
        );
        const data = res.data;
        return { ...token, ...data };
      }
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
