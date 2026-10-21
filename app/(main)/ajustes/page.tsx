"use client";
import { THEMES } from "@/config/app";
import { useSetting } from "@/hooks/use-setting";
import { useTheme } from "@/hooks/use-theme";

// Ejemplo de preferencias: todas viven en IndexedDB (lib/settings.ts) y se actualizan solas
export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [sound, setSound, soundLoaded] = useSetting("sound", true);
  const [showInstall, setShowInstall, installLoaded] = useSetting("show_pwa_install", true);

  return (
    <div className="mx-auto flex max-w-xl flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">Ajustes</h1>

      <fieldset className="fieldset rounded-box border border-base-300 bg-base-100 p-4">
        <legend className="fieldset-legend">Tema</legend>
        <select className="select w-full" value={theme ?? ""} onChange={(e) => setTheme(e.target.value as (typeof THEMES)[number])} disabled={!theme}>
          {THEMES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </fieldset>

      <fieldset className="fieldset gap-3 rounded-box border border-base-300 bg-base-100 p-4">
        <legend className="fieldset-legend">Preferencias</legend>
        <label className="label justify-between text-base-content">
          Sonido
          <input type="checkbox" className="toggle toggle-primary" checked={sound} disabled={!soundLoaded} onChange={(e) => setSound(e.target.checked)} />
        </label>
        <label className="label justify-between text-base-content">
          Ofrecer instalar la app
          <input type="checkbox" className="toggle toggle-primary" checked={showInstall} disabled={!installLoaded} onChange={(e) => setShowInstall(e.target.checked)} />
        </label>
      </fieldset>
    </div>
  );
}
