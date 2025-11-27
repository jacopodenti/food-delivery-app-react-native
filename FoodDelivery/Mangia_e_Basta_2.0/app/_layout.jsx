import { Stack } from "expo-router";
import React from "react";
import { PositionProvider } from "../utils/PositionContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const RootLayout = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <PositionProvider>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PositionProvider>
    </QueryClientProvider>
  );
};
export default RootLayout;
