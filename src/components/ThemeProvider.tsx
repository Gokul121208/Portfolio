"use client";
import { ThemeProvider as NextThemes } from "next-themes";

// Night is the default. storageKey is versioned so a Day choice saved by an older build doesn't override it.
export default function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemes attribute="data-theme" themes={["night", "day"]} defaultTheme="night" enableSystem={false} storageKey="gokul-theme-v2">
      {children}
    </NextThemes>
  );
}
