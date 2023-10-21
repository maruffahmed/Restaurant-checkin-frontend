import Footer from "@/modules/common/components/Footer";
import Navbar from "@/modules/common/components/Navbar";
import { authOptions } from "@/modules/lib/auth";
import { Container } from "@mantine/core";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

// Others layout

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth/login");
  }
  return (
    <>
      <Navbar />
      <Container size="xl" py={40}>
        {children}
      </Container>

      <Footer />
    </>
  );
}
