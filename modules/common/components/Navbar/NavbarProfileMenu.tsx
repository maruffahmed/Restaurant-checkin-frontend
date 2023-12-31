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
    me.data?.data.firstName.slice(0, 1) + me.data?.data.lastName.slice(0, 1);

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
            <Avatar alt={avatarAlt} radius="xl" size={30} />
            <Stack gap={2} mr={3} visibleFrom="sm">
              <Text fw={500} size="xs" lh={1}>
                {me.data.data.firstName}
              </Text>
              <Text c="gray.6" size="xs">
                {me.data.data.email}
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
