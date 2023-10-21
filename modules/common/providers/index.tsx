"use client";
import { MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { NavigationProgress } from "@mantine/nprogress";
import { generateColors } from "@mantine/colors-generator";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const theme = createTheme({
  colors: {
    primary: generateColors("#85bf8b"),
    secondary: generateColors("#739157"),
    muted: generateColors("#5a8ca7"),
  },
  primaryColor: "primary",
  cursorType: "pointer",
});

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <MantineProvider theme={theme}>
      <NavigationProgress />
      <Notifications />
      <QueryClientProvider client={queryClient}>
        <SessionProvider>{children}</SessionProvider>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </MantineProvider>
  );
};

export default Providers;
