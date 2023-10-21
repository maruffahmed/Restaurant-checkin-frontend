"use client";
import { z } from "zod";
import { signIn } from "next-auth/react";

const LoginActionSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
});

export async function LoginAction(prevState: any, formData: FormData) {
  try {
    const email = formData.get("email");
    const password = formData.get("password");
    const parsed = LoginActionSchema.parse({
      email,
      password,
    });

    await signIn("credentials", {
      email: parsed.email,
      password: parsed.password,
      callbackUrl: "/",
      redirect: true,
    });
  } catch (error) {
    // console.log(error instanceof z.ZodError);
    // console.log(error);
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }
    return { error: "Email or password is incorrect" };
  }
}
