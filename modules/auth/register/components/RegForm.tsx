"use client";
import React from "react";
import { PasswordInput, TextInput, Button, Alert } from "@mantine/core";
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { z } from "zod";
import { IconInfoCircle } from "@tabler/icons-react";
import { RegisterAction } from "../actions";
import { redirect } from "next/navigation";

interface RegisterFormState {
  error: string | z.ZodIssue[] | null;
  success: boolean;
}
const initialState = {
  error: null,
  success: false,
};

export default function RegForm() {
  const [state, formAction] = useFormState(RegisterAction, initialState);
  const RegisterFormState = state as RegisterFormState;
  const icon = <IconInfoCircle />;

  if (RegisterFormState.success) {
    redirect("/auth/login");
  }
  console.log("RegisterFormState", RegisterFormState);
  return (
    <>
      <div className="flex flex-col gap-4 mb-4">
        {typeof RegisterFormState.error === "string" ? (
          <Alert variant="light" color="red" title="Login failed" icon={icon}>
            {RegisterFormState.error}
          </Alert>
        ) : RegisterFormState.error?.length ? (
          RegisterFormState.error.map((error, index) => (
            <Alert
              key={index}
              variant="light"
              color="red"
              title="Login failed"
              icon={icon}
            >
              {error.message}
            </Alert>
          ))
        ) : null}
      </div>
      <form action={formAction}>
        <TextInput
          type="text"
          name="firstName"
          label="First name"
          placeholder="First name"
          required
        />
        <TextInput
          type="text"
          name="lastName"
          label="Last name"
          placeholder="Last name"
          required
          mt="md"
        />
        <TextInput
          label="Email"
          name="email"
          placeholder="you@mantine.dev"
          required
          mt="md"
        />
        <PasswordInput
          label="Password"
          name="password"
          placeholder="Your password"
          required
          mt="md"
        />
        <RegFormSubmitButton />
      </form>
    </>
  );
}

const RegFormSubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button
      type="submit"
      fullWidth
      mt="xl"
      size="md"
      variant="filled"
      color="primary"
      loading={pending}
    >
      Sign up
    </Button>
  );
};
