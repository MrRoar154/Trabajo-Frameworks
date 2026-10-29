import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { categoryLabel } from "@/lib/categories";
import { getImageUrl, type Product } from "@/lib/strapi";
import { formatPrice } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = product.stock === 0;

  return (
    <article className="group h-full overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link
        href={`/productos/${product.slug}`}
        className="flex h-full cursor-pointer flex-col focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-muted">
          {product.image ? (
            <Image
              src={getImageUrl(product.image.url)}
              alt={product.image.alternativeText ?? product.name}
              fill
              sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-300 group-hover:scale-[1.03]"
            />
          ) : null}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-4">
          <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase">
            {categoryLabel(product.category)}
          </p>
          <h3 className="font-heading text-lg leading-snug font-semibold text-balance">
            {product.name}
          </h3>
          <div className="mt-auto flex items-center justify-between gap-3">
            <p className="text-lg font-semibold">{formatPrice(product.price)}</p>
            {soldOut ? <Badge variant="destructive">Agotado</Badge> : null}
          </div>
          <span className="inline-flex h-11 items-center justify-center rounded-lg bg-accent text-sm font-semibold text-black">
            Ver detalle
          </span>
          <p className="text-sm text-muted-foreground">
            {soldOut ? "Sin unidades por ahora" : `Quedan ${product.stock} unidades`}
          </p>
        </div>
      </Link>
    </article>
  );
}
