import { IUsers } from "./users";

export interface ILoginUser extends IUsers {}

export interface ILoginResponseToken {
  accessToken: string;
  refreshToken: string;
}

export interface ILoginResponse {
  success: boolean;
  data: ILoginResponseToken;
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
