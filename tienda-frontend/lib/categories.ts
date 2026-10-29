import type { CategoryId } from "@/lib/strapi";

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  nav: string;
  summary: string;
}[] = [
  {
    id: "videojuegos",
    label: "Videojuegos",
    nav: "Juegos",
    summary: "Controles, pantallas y el puesto para jugar.",
  },
  {
    id: "ropa",
    label: "Ropa",
    nav: "Ropa",
    summary: "Prendas de uso real, de la camiseta a la bota.",
  },
  {
    id: "herramientas",
    label: "Herramientas de trabajo",
    nav: "Taller",
    summary: "Lo que se usa en el banco, no lo que se guarda.",
  },
];

export function categoryLabel(id: CategoryId) {
  return CATEGORIES.find((category) => category.id === id)?.label ?? id;
}
