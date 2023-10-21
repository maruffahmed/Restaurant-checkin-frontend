"use server";
import axios from "@/modules/lib/axios";
import { AxiosError } from "axios";
import { z } from "zod";

const LoginActionSchema = z.object({
  email: z.string().email().nonempty({
    message: "Email must be provide.",
  }),
  password: z.string().min(6, {
    message:
      "Password must be at least 6 characters long and contain number and character",
  }),
  firstName: z.string().nonempty({ message: "First name is required" }),
  lastName: z.string().nonempty({ message: "Last name is required" }),
});

export async function RegisterAction(prevState: any, formData: FormData) {
  try {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const email = formData.get("email");
    const password = formData.get("password");
    const parsed = LoginActionSchema.parse({
      email,
      password,
      firstName,
      lastName,
    });

    const res = await axios.post("/auth/sign-up", parsed);
    if ((res.status = 204)) {
      return { success: true };
    }
  } catch (error) {
    const errorMessage = "Something is wrong. Please try again!";
    // Axios error
    if (error instanceof AxiosError) {
      console.log("error", error.response?.data.error.details);
      if (error.response?.status === 422) {
        const message = Object.keys(error.response?.data.error.details).length
          ? Object.values(error.response?.data.error.details[0]).toString()
          : errorMessage;
        return { error: message };
      }
    }
    // Zod error
    if (error instanceof z.ZodError) {
      return { error: error.errors };
    }
    // other error
    return { error: errorMessage };
  }
}
