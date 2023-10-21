import { DefaultSession, DefaultUser } from "next-auth";
import { ILoginResponseToken } from "./auth";
import { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session extends DefaultSession, ILoginResponseToken {}
  interface User extends ILoginResponseToken, DefaultUser {
    id?: number;
  }
}

// declare module "next-auth/jwt" {
//   /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
//   interface JWT extends DefaultJWT, ILoginResponseToken {
//     user: ILoginUser;
//   }
// }
