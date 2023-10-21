import { authOptions } from "@/modules/lib/auth";
import { Container } from "@mantine/core";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// Auth layout

export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (session) {
    redirect("/");
  }
  return (
    <Container size="xl" py={20}>
      {children}
      {/* Footer */}
    </Container>
  );
}
