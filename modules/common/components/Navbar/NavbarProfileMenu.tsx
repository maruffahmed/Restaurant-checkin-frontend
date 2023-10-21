import {
  Menu,
  UnstyledButton,
  Group,
  Avatar,
  rem,
  useMantineTheme,
  Text,
  Flex,
  Skeleton,
  Stack,
} from "@mantine/core";
import {
  IconChevronDown,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconLogout,
} from "@tabler/icons-react";
import classNames from "classnames";
import { signOut } from "next-auth/react";
import Link from "next/link";
import React, { useState } from "react";
import classes from "./index.module.css";
import { useGetProfile } from "@/modules/hooks/profile";

export default function NavbarProfileMenu() {
  const { data: me, isLoading } = useGetProfile();
  const avatarAlt =
    me.data?.firstName.slice(0, 1) + me.data?.lastName.slice(0, 1);
  const avatarSrc = me?.data?.photo?.path;

  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  if (isLoading) return <NavbarProfileMenuSkeleton />;
  return (
    <Menu
      width={260}
      position="bottom-end"
      transitionProps={{ transition: "pop-top-right" }}
      onClose={() => setUserMenuOpened(false)}
      onOpen={() => setUserMenuOpened(true)}
      withinPortal
    >
      <Menu.Target>
        <UnstyledButton
          className={classNames(classes.user, {
            [classes.userActive]: userMenuOpened,
          })}
          visibleFrom="base"
        >
          <Group gap={7}>
            {/* <Avatar alt={me.data.firstName} radius="xl" size={30} /> */}
            <Avatar src={avatarSrc || ""} color="primary" radius="xl" size={30}>
              {avatarAlt}
            </Avatar>
            <Stack gap={2} mr={3} visibleFrom="sm">
              <Text fw={500} size="xs" lh={1}>
                {me.data.firstName}
              </Text>
              <Text c="gray.6" size="xs">
                {me.data.email}
              </Text>
            </Stack>
            <IconChevronDown
              style={{ width: rem(12), height: rem(12) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          leftSection={
            <IconHeart
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.red[6]}
              stroke={1.5}
            />
          }
        >
          Liked posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconStar
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.yellow[6]}
              stroke={1.5}
            />
          }
        >
          Saved posts
        </Menu.Item>
        <Menu.Item
          leftSection={
            <IconMessage
              style={{ width: rem(16), height: rem(16) }}
              color={theme.colors.primary[6]}
              stroke={1.5}
            />
          }
        >
          Your comments
        </Menu.Item>

        <Menu.Label>Settings</Menu.Label>
        <Menu.Item
          component={Link}
          href="/profile"
          leftSection={
            <IconSettings
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Account settings
        </Menu.Item>

        <Menu.Item
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
          leftSection={
            <IconLogout
              style={{ width: rem(16), height: rem(16) }}
              stroke={1.5}
            />
          }
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}

export const NavbarProfileMenuSkeleton = () => {
  return (
    <Flex style={{ width: "200px" }} align="center" gap="xs">
      <Skeleton height={30} circle />
      <Stack gap={2} mr={3} w="80%">
        <Skeleton height={15} width="30%" radius="xl" />
        <Skeleton height={10} radius="xl" />
      </Stack>
    </Flex>
  );
};
