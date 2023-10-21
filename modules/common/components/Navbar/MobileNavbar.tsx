"use client";
import {
  Drawer,
  ScrollArea,
  rem,
  Divider,
  Group,
  Button,
  Stack,
  Anchor,
} from "@mantine/core";
import React from "react";
import { mainLinks } from ".";
import Link from "next/link";
import classes from "./index.module.css";
import { useSession } from "next-auth/react";

export default function MobileNavbar({
  drawerOpened,
  closeDrawer,
}: {
  drawerOpened: boolean;
  closeDrawer: () => void;
}) {
  const session = useSession();
  return (
    <Drawer
      opened={drawerOpened}
      onClose={closeDrawer}
      size="md"
      padding="md"
      title="Menu"
      hiddenFrom="sm"
      zIndex={1000000}
    >
      <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md">
        <Divider my="sm" />

        <Stack px="md">
          {mainLinks.map((item, index) => (
            <Anchor
              component={Link}
              href={item.link}
              key={index}
              className={classes.mainLink}
              onClick={closeDrawer}
            >
              {item.label}
            </Anchor>
          ))}
        </Stack>

        {session.status === "unauthenticated" ? (
          <>
            <Divider my="sm" />
            <Group justify="center" grow pb="xl" px="md">
              <Button component={Link} href="/auth/login" variant="default">
                Log in
              </Button>
              <Button component={Link} href="/auth/register">
                Sign up
              </Button>
            </Group>
          </>
        ) : null}
      </ScrollArea>
    </Drawer>
  );
}
