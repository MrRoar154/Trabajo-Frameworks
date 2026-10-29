import { ProductCard } from "@/components/product-card";
import { CATEGORIES } from "@/lib/categories";
import { getProducts, type Product } from "@/lib/strapi";

export const instant = false;

export default async function HomePage() {
  const products = await getProducts();
  const byCategory = new Map<Product["category"], Product[]>();

  for (const category of CATEGORIES) {
    byCategory.set(category.id, []);
  }

  for (const product of products) {
    byCategory.get(product.category)?.push(product);
  }

  return (
    <main>
      <section className="border-b border-border">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_0.8fr] md:items-end md:py-20">
          <div>
            <p className="text-sm font-semibold tracking-[0.18em] text-primary uppercase">
              Catálogo
            </p>
            <h1 className="mt-3 max-w-xl font-heading text-4xl leading-[1.05] font-semibold text-balance md:text-6xl">
              Tres oficios, elegidos para usar de verdad.
            </h1>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Videojuegos, ropa y herramientas de trabajo. Cada pieza tiene foto, precio en dólares y
              las unidades que quedan.
            </p>
          </div>
          <ul className="grid gap-3">
            {CATEGORIES.map((category) => (
              <li key={category.id}>
                <a
                  href={`#${category.id}`}
                  className="flex h-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-border bg-card px-4 py-4 transition-colors duration-200 hover:border-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <span>
                    <span className="block font-heading text-lg font-semibold">{category.label}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{category.summary}</span>
                  </span>
                  <span className="shrink-0 text-sm font-semibold text-primary">
                    {byCategory.get(category.id)?.length ?? 0}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {CATEGORIES.map((category) => {
        const items = byCategory.get(category.id) ?? [];
        return (
          <section
            key={category.id}
            id={category.id}
            className="scroll-mt-24 border-b border-border py-14"
          >
            <div className="mx-auto max-w-6xl px-5">
              <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <h2 className="font-heading text-3xl font-semibold md:text-4xl">{category.label}</h2>
                  <p className="mt-2 max-w-lg text-muted-foreground">{category.summary}</p>
                </div>
                <p className="text-sm font-medium text-primary">{items.length} piezas</p>
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {items.map((product) => (
                  <ProductCard key={product.documentId} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </main>
  );
}
