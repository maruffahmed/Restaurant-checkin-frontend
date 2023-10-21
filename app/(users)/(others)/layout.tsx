import Footer from "@/modules/common/components/Footer";
import Navbar from "@/modules/common/components/Navbar";
import { Container } from "@mantine/core";
import React from "react";

// Others layout

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
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
