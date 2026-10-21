import { APP_DESCRIPTION } from "@/config/app";

const NEXT_STEPS = [
  { title: "Configura la app", body: "Nombre, base IndexedDB, temas y colores en config/app.ts." },
  { title: "Arma el menú", body: "Agrega tus secciones en config/navigation.ts; el layout está en app/(main)/layout.tsx." },
  { title: "Cambia el logo", body: "Reemplaza public/icons/logo.svg y logo-maskable.svg, y corre npm run icons." },
  { title: "Agrega piezas", body: "npx shadcn add @xiuh/<pieza>. El catálogo está en lalopapa.github.io/xiuh-ui." },
  { title: "Guarda datos offline", body: "Agrega tus tablas a lib/db.ts y tus preferencias a lib/settings.ts." },
];

export default function HomePage() {
  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-6">
      <p className="text-base-content/70">{APP_DESCRIPTION}</p>
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
    </div>
  );
}
