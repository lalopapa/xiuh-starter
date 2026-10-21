import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import { Plus_Jakarta_Sans, Source_Code_Pro } from "next/font/google";
import { APP_DESCRIPTION, APP_NAME, APP_SHORT_NAME, DARK_THEME, DEFAULT_THEME, THEME_COLORS } from "@/config/app";
import { THEME_COOKIE, getThemeColor, isTheme } from "@/lib/theme";
import PWAInstallPrompt from "@/components/pwa-install-prompt";
import Toaster from "@/components/ui/toaster";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({ variable: "--font-jakarta", subsets: ["latin"] });
const sourceCode = Source_Code_Pro({ variable: "--font-source-code", subsets: ["latin"] });

// El manifest lo genera app/manifest.ts
export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  appleWebApp: { capable: true, title: APP_SHORT_NAME, statusBarStyle: "default" },
  formatDetection: { telephone: false },
  icons: {
    icon: [
      { url: "/icons/logo.svg", type: "image/svg+xml" },
      { url: "/icons/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/icons/apple-touch-icon.png",
  },
};

const getCookieTheme = async () => {
  const theme = (await cookies()).get(THEME_COOKIE)?.value;
  return isTheme(theme) ? theme : undefined;
};

// Color de la barra del navegador: el del tema guardado, o el que toque según el modo del sistema
export async function generateViewport(): Promise<Viewport> {
  const theme = await getCookieTheme();
  return {
    width: "device-width",
    initialScale: 1,
    viewportFit: "cover",
    themeColor: theme
      ? getThemeColor(theme)
      : [
          { media: "(prefers-color-scheme: light)", color: THEME_COLORS[DEFAULT_THEME] },
          { media: "(prefers-color-scheme: dark)", color: THEME_COLORS[DARK_THEME] },
        ],
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  // Con la cookie, el server pinta el tema elegido desde el primer render (sin parpadeo).
  // Sin ella no hay data-theme y daisy usa light o dark según el sistema.
  const theme = await getCookieTheme();
  return (
    <html lang="es" data-theme={theme} className={`${jakarta.variable} ${sourceCode.variable}`} suppressHydrationWarning>
      <body className="min-h-svh bg-base-200 font-sans antialiased">
        {children}
        <Toaster />
        <PWAInstallPrompt />
      </body>
    </html>
  );
}
