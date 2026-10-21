import MobileShell from "@/components/layout/mobile-shell";

// Rutas de la app con barra y menú; /~offline queda fuera a propósito
export default function MainLayout({ children }: { children: React.ReactNode }) {
  return <MobileShell>{children}</MobileShell>;
}
