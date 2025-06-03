// components/ClientProviders.tsx
"use client";

import { SessionProvider } from "next-auth/react";
import  ThemeProvider  from "../components/ui/theme-provider";

export default function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
