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
      <TextInput label="Email" placeholder="you@mantine.dev" required />
      <PasswordInput
        label="Password"
        placeholder="Your password"
        required
        mt="md"
      />
      <Group justify="space-between" mt="lg">
        <Checkbox label="Remember me" />
        <Anchor component="button" size="sm">
          Forgot password?
        </Anchor>
      </Group>
      <Button fullWidth mt="xl">
        Sign in
      </Button>
    </AuthPageLayout>
  );
}
