"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";

const queryClient = new QueryClient();

export const QueryProvider = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);
