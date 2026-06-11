"use client";

import * as React from "react";

// Safe dynamic import to prevent SSR issues
let NextThemesProvider: React.ComponentType<any> = ({ children }) => <>{children}</>;

// Only try to import next-themes on client side
if (typeof window !== 'undefined') {
  try {
    // Dynamic import to avoid SSR conflicts
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

  // Don't render the provider until client-side to avoid any script issues
  if (!isClient) {
    return <>{children}</>;
  }

  return (
    <NextThemesProvider {...props}>
      {children}
    </NextThemesProvider>
  );
}