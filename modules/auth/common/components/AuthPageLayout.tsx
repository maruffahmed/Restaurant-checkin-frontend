import {
  Paper,
  Flex,
  Stack,
  Title,
  Box,
  Text,
  Anchor,
  Container,
} from "@mantine/core";
import React from "react";
import Image from "next/image";
import classes from "../styles/auth.module.css";

export default function AuthPageLayout({
  children,
  label,
  description,
}: {
  children: React.ReactNode;
  label: string | React.ReactNode;
  description?: string | React.ReactNode;
}) {
  return (
    <>
      {/* Login form card */}
      <Container size={420} my={40}>
        <Title ta="center" className={classes.title}>
          {label}
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          {description}
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          {children}
        </Paper>
      </Container>
    </>
  );
}
