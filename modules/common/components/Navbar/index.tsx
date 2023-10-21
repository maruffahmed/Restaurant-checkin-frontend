"use client";
import {
  Container,
  Anchor,
  Group,
  Burger,
  Divider,
  Button,
  Flex,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import Link from "next/link";
import { IconPlus } from "@tabler/icons-react";
import classes from "./index.module.css";
import Brand from "../Brand";
import { Fragment } from "react";
import { usePathname } from "next/navigation";
import NavbarProfileMenu, {
  NavbarProfileMenuSkeleton,
} from "./NavbarProfileMenu";
import { useSession } from "next-auth/react";
import MobileNavbar from "./MobileNavbar";

export const userLinks = [
  { link: "/auth/login", label: "Log in" },
  { link: "/auth/register", label: "Sign up" },
];

export const mainLinks = [{ link: "/", label: "Home" }];

export default function Navbar() {
  const session = useSession();
  const [opened, { toggle }] = useDisclosure(false);

  const mainItems = mainLinks.map((item, index) => (
    <MainItemsLink key={index} item={item} />
  ));

  const secondaryItems = userLinks.map((item, index) => (
    <Fragment key={item.label}>
      <Anchor
        component={Link}
        href={item.link}
        className={classes.secondaryLink}
      >
        {item.label}
      </Anchor>
      {index !== userLinks.length - 1 && <Divider orientation="vertical" />}
    </Fragment>
  ));

  return (
    <>
      <header className={classes.header}>
        <Container size="xl">
          <Flex mih={60} align="center" justify="space-between">
            <Brand />
            <Flex
              pt="lg"
              direction="column"
              justify="space-between"
              visibleFrom="sm"
            >
              <Group justify="flex-end">
                {session.status == "loading" ? (
                  <NavbarProfileMenuSkeleton />
                ) : session.status == "authenticated" ? (
                  <NavbarProfileMenu />
                ) : (
                  secondaryItems
                )}
                <Button
                  leftSection={<IconPlus size={14} />}
                  variant="light"
                  color="muted.9"
                >
                  Post a new ad
                </Button>
              </Group>
              <Group
                gap={20}
                mt="md"
                justify="flex-end"
                className={classes.mainLinks}
              >
                {mainItems}
              </Group>
            </Flex>
            <Flex align="center" hiddenFrom="sm">
              {session.status === "authenticated" ? (
                <NavbarProfileMenu />
              ) : null}
              <Burger
                opened={opened}
                onClick={toggle}
                size="sm"
                hiddenFrom="sm"
              />
            </Flex>
          </Flex>
        </Container>
      </header>
      <MobileNavbar drawerOpened={opened} closeDrawer={toggle} />
    </>
  );
}

const MainItemsLink = ({ item }: { item: (typeof mainLinks)[0] }) => {
  const pathname = usePathname();
  const current = pathname === item.link;
  return (
    <Anchor
      component={Link}
      href={item.link}
      className={classes.mainLink}
      c={current ? "primary" : "gray"}
    >
      {item.label}
    </Anchor>
  );
};
