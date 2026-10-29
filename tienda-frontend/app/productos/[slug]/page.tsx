import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { categoryLabel } from "@/lib/categories";
import { getImageUrl, getProductBySlug } from "@/lib/strapi";
import { formatPrice } from "@/lib/utils";

export const instant = false;

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const soldOut = product.stock === 0;

  return (
    <main className="mx-auto grid max-w-6xl gap-10 px-5 py-10 md:grid-cols-2 md:py-16">
      <div className="overflow-hidden rounded-3xl border border-border bg-card">
        {product.image ? (
          <Image
            src={getImageUrl(product.image.url)}
            alt={product.image.alternativeText ?? product.name}
            width={900}
            height={1125}
            priority
            className="aspect-[4/5] h-auto w-full object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col gap-5 md:py-4">
        <Link
          href={`/#${product.category}`}
          className="inline-flex h-11 w-fit cursor-pointer items-center text-sm font-medium underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          ← {categoryLabel(product.category)}
        </Link>
        <p className="text-xs font-semibold tracking-[0.16em] text-primary uppercase">
          {categoryLabel(product.category)}
        </p>
        <h1 className="font-heading text-4xl leading-tight font-semibold text-balance md:text-5xl">
          {product.name}
        </h1>
        <p className="font-heading text-3xl font-semibold">{formatPrice(product.price)}</p>
        <p className="max-w-prose text-lg leading-relaxed text-muted-foreground">
          {product.description}
        </p>
        {soldOut ? (
          <Badge variant="destructive" className="h-8 px-3 text-sm">
            Agotado
          </Badge>
        ) : (
          <p className="text-base font-medium">Quedan {product.stock} unidades</p>
        )}
      </div>
    </main>
  );
}
