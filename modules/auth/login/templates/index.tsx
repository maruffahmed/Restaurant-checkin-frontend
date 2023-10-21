import {
  TextInput,
  PasswordInput,
  Checkbox,
  Anchor,
  Group,
  Button,
} from "@mantine/core";
import AuthPageLayout from "../../common/components/AuthPageLayout";
import Link from "next/link";
import LoginForm from "../components/LoginForm";

export default function LoginTemplate() {
  return (
    <AuthPageLayout
      label="Welcome back!"
      description={
        <>
          Do not have an account yet?{" "}
          <Anchor size="sm" component={Link} href="/auth/register">
            Create account
          </Anchor>
        </>
      }
    >
      <LoginForm />
    </AuthPageLayout>
  );
}
