import { Anchor } from "@mantine/core";
import AuthPageLayout from "../../common/components/AuthPageLayout";
import Link from "next/link";
import RegForm from "../components/RegForm";

export default function RegisterTemplate() {
  return (
    <AuthPageLayout
      label="Sign up"
      description={
        <>
          Have an account already?{" "}
          <Anchor size="sm" component={Link} href="/auth/login">
            Log in
          </Anchor>
        </>
      }
    >
      <RegForm />
    </AuthPageLayout>
  );
}
