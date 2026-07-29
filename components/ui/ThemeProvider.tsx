"use client";

import * as React from "react";

let NextThemesProvider: React.ComponentType<any> = ({ children }) => <>{children}</>;

if (typeof window !== 'undefined') {
  try {
    const nextThemes = require("next-themes");
    NextThemesProvider = nextThemes.ThemeProvider;
  } catch (error) {
    console.warn("next-themes not installed, using fallback provider");
  }
}

export function ThemeProvider({ 
  children, 
  ...props 
}: { 
  children?: React.ReactNode;
  [key: string]: any;
}) {
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}