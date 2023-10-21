import { Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Brand() {
  return (
    <Text
      component={Link}
      href="/"
      size="xl"
      fw="bold"
      c="primary"
      tt="uppercase"
    >
      Resturant
    </Text>
  );
}
