import { Gamepad2, Shirt, Wrench } from "lucide-react";
import Link from "next/link";
import { CATEGORIES } from "@/lib/categories";

const icons = {
  videojuegos: Gamepad2,
  ropa: Shirt,
  herramientas: Wrench,
} as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-3">
        <Link
          href="/"
          className="font-heading text-2xl font-semibold tracking-tight text-foreground"
        >
          Oficio
        </Link>
        <nav className="flex flex-wrap items-center gap-1" aria-label="Departamentos">
          {CATEGORIES.map((category) => {
            const Icon = icons[category.id];
            return (
              <Link
                key={category.id}
                href={`/#${category.id}`}
                className="inline-flex h-11 cursor-pointer items-center gap-2 rounded-full px-3 text-sm font-medium text-foreground transition-colors duration-200 hover:bg-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                <Icon className="size-4" aria-hidden="true" />
                {category.nav}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
