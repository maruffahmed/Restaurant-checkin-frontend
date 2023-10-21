"use client";
import React, { useMemo } from "react";
// @ts-ignore
import { experimental_useFormState as useFormState } from "react-dom";
// @ts-ignore
import { experimental_useFormStatus as useFormStatus } from "react-dom";
import { LoginAction } from "@/modules/auth/login/actions";
import { Alert, Button, PasswordInput, TextInput } from "@mantine/core";
import { z } from "zod";
import { IconInfoCircle } from "@tabler/icons-react";
import { useSearchParams } from "next/navigation";
import { ILoginErrorTypes } from "@/modules/types/auth";
interface LoginFormState {
  error: string | z.ZodIssue[] | null;
}
const initialState = {
  error: null,
};

export default function LoginForm() {
  const params = useSearchParams();
  const error = useMemo(
    () => params.get("error"),
    [params]
  ) as keyof typeof ILoginErrorTypes;

  const [state, formAction] = useFormState(LoginAction, initialState);
  const LoginFormState = state as LoginFormState;
  const icon = <IconInfoCircle />;

  return (
    <>
      {error && error === "CredentialsSignin" ? (
        <Alert variant="light" color="red" title="Login failed" icon={icon}>
          Email or password is incorrect
        </Alert>
      ) : null}
      {typeof LoginFormState?.error === "string" ? (
        <Alert variant="light" color="red" title="Login failed" icon={icon}>
          {LoginFormState?.error}
        </Alert>
      ) : LoginFormState?.error?.length ? (
        LoginFormState?.error?.map((error, index) => (
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
      {/* Using Next JS 13 server action */}
      <form action={formAction}>
        <TextInput
          type="email"
          name="email"
          label="Email"
          placeholder="hello@gmail.com"
          size="md"
          withAsterisk
          required
        />
        <PasswordInput
          type="password"
          name="password"
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          withAsterisk
          required
        />
        <LoginFormSubmitButton />
      </form>
    </>
  );
}

const LoginFormSubmitButton = () => {
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
      loaderProps={{
        "aria-label": "loginSpinner",
      }}
    >
      Login
    </Button>
  );
};
