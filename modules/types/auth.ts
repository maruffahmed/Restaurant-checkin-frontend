import { IUsers } from "./users";

export interface ILoginUser extends IUsers {}

export interface ILoginResponseToken {
  refreshToken: string;
  token: string;
  tokenExpires: number;
}

export interface ILoginResponse extends ILoginResponseToken {
  user: ILoginUser;
}

export interface ILoginErrorResponse {
  status: number;
  errors: {
    password?: string;
    email?: string;
  };
}

export enum ILoginErrorTypes {
  "OAuthSignin",
  "OAuthCallback",
  "OAuthCreateAccount",
  "EmailCreateAccount",
  "Callback",
  "OAuthAccountNotLinked",
  "EmailSignin",
  "CredentialsSignin",
  "SessionRequired",
  "Default",
}
