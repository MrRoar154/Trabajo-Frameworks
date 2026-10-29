# Oficio

Tienda web de **videojuegos**, **ropa** y **herramientas de trabajo**. El catálogo se administra en un CMS, se guarda en PostgreSQL y se muestra en una aplicación Next.js.

## Tecnologías

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-149ECA?logo=react&logoColor=white)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-neutral-18181B)](https://ui.shadcn.com/)
[![Strapi](https://img.shields.io/badge/Strapi-5-4945FF?logo=strapi&logoColor=white)](https://strapi.io/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Node.js](https://img.shields.io/badge/Node.js-22-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)

| Capa | Tecnología | Rol en el proyecto |
| --- | --- | --- |
| Interfaz | Next.js 16 (App Router), React 19, TypeScript | Catálogo, ficha de producto y página 404 |
| Diseño | Tailwind CSS 4, shadcn/ui, Lucide | Componentes, tipografía y layout |
| API y contenido | Strapi 5 | Modelo Product, imágenes y API REST |
| Datos | PostgreSQL | Persistencia de productos, medios y permisos |
| Entorno | Node.js 20+ y npm | Servidores de desarrollo en los puertos 3000 y 1337 |

## Cómo se reparte el trabajo

PostgreSQL guarda los productos. Strapi modela ese contenido y lo expone como REST. Next.js pide esa API desde el servidor y renderiza el catálogo. La ruta `/productos/[slug]` es una sola página dinámica para todas las fichas.

```text
Navegador  →  Next.js (:3000)  →  Strapi (:1337)  →  PostgreSQL (:5432)
```

## Estructura

```text
tienda-frontend/   Aplicación Next.js
tienda-backend/    Strapi 5 y el tipo de contenido Product
```

Cada producto tiene nombre, slug, descripción, precio en USD, stock, categoría (`videojuegos`, `ropa` o `herramientas`) e imagen.

## Puesta en marcha

Hacen falta Node.js 20 o superior, npm y PostgreSQL con una base llamada `strapi_tienda`.

1. En `tienda-backend`, copia `.env.example` a `.env` y completa las claves de Strapi y la conexión:

   `DATABASE_CLIENT`, `DATABASE_HOST`, `DATABASE_PORT`, `DATABASE_NAME`, `DATABASE_USERNAME`, `DATABASE_PASSWORD` y `DATABASE_SSL`.

2. En `tienda-frontend`, crea `.env.local` con `STRAPI_URL=http://localhost:1337`.

Esos archivos no se suben al repositorio.

```bash
cd tienda-backend
npm install
npm run develop
```

```bash
cd tienda-frontend
npm install
npm run dev
```

- Catálogo: http://localhost:3000
- Administración de Strapi: http://localhost:1337/admin
