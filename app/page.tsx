import { APP_DESCRIPTION, APP_NAME } from "@/config/app";
import ThemePicker from "@/components/ui/theme-picker";

const NEXT_STEPS = [
  { title: "Configura la app", body: "Nombre, base IndexedDB, temas y colores en config/app.ts." },
  { title: "Cambia el logo", body: "Reemplaza public/icons/logo.svg y logo-maskable.svg, y corre npm run icons." },
  { title: "Agrega piezas", body: "npx shadcn add @xiuh/<pieza>. El catálogo está en lalopapa.github.io/xiuh-ui." },
  { title: "Guarda datos offline", body: "Agrega tus tablas a lib/db.ts y tus preferencias a lib/settings.ts." },
];

export default function HomePage() {
  return (
    <main className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{APP_NAME}</h1>
          <p className="text-base-content/70">{APP_DESCRIPTION}</p>
        </div>
        <ThemePicker />
      </header>

      <ul className="grid gap-4 sm:grid-cols-2">
        {NEXT_STEPS.map(({ title, body }, i) => (
          <li key={title} className="card border border-base-300 bg-base-100">
            <div className="card-body">
              <h2 className="card-title text-base">
                <span className="badge badge-primary badge-sm">{i + 1}</span>
                {title}
              </h2>
              <p className="text-sm text-base-content/70">{body}</p>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
