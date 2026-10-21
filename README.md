# xiuh-starter

Plantilla para apps nuevas de Xiuhlab: Next 15.5, daisyUI 5 con los temas de Xiuhlab, IndexedDB (Dexie) para preferencias y datos offline, y PWA instalable (Serwist).

Las piezas vienen del registro [xiuh-ui](https://lalopapa.github.io/xiuh-ui); todo lo que está en `components/`, `hooks/`, `lib/`, `config/` y `styles/` se instaló con `npx shadcn add @xiuh/…` y es tuyo para modificar.

## Empezar un proyecto

```bash
npx degit lalopapa/xiuh-starter mi-app   # o "Use this template" en GitHub
cd mi-app && npm install
```

1. **`config/app.ts`**: nombre, descripción, `APP_DB_NAME` y `APP_STORAGE_PREFIX` (únicos por app), temas y colores.
2. **Logo**: reemplaza `public/icons/logo.svg` y `logo-maskable.svg` (este sin esquinas redondeadas y con el dibujo dentro del 80% central) y corre `npm run icons`.
3. **Datos**: agrega tus tablas en `lib/db.ts` (extendiendo `SyncedEntity`) y tus preferencias en la interfaz `Settings` de `lib/settings.ts`.
4. **Más piezas**: `npx shadcn add @xiuh/<pieza>` (catálogo en el link de arriba).

## Cómo funciona

- **Tema**: `useTheme().setTheme()` guarda la preferencia en IndexedDB y en una cookie; `app/layout.tsx` lee la cookie para pintar `<html data-theme>` sin parpadeo. Sin preferencia, daisy usa `thunder` o `thunder-dark` según el sistema.
- **PWA**: el service worker (`app/sw.ts`) solo se genera en `npm run build` (en dev está apagado). Las llamadas a `/api/` nunca se sirven desde caché; los datos offline viven en IndexedDB. Sin red, las páginas no visitadas muestran `/~offline`.
- **Instalación**: `PWAInstallPrompt` ofrece instalar en Chrome/Edge/Android y explica "Compartir → Agregar a inicio" en iPhone. "No volver a mostrar" se guarda en IndexedDB.

## Scripts

| Script | |
|---|---|
| `npm run dev` | Desarrollo (sin service worker) |
| `npm run build && npm start` | Producción local; aquí sí se prueba la PWA |
| `npm run icons` | Genera los PNG de `public/icons` desde los SVG |
| `npm run typecheck` | Revisa tipos |
