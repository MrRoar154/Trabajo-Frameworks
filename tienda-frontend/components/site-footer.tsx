import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-heading text-xl font-semibold">Oficio</p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Videojuegos, ropa y herramientas de trabajo. Treinta piezas con foto, precio y stock.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-5 gap-y-2" aria-label="Departamentos del pie">
          {CATEGORIES.map((category) => (
            <Link
              key={category.id}
              href={`/#${category.id}`}
              className="inline-flex h-11 cursor-pointer items-center text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {category.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
