const STRAPI_URL = process.env.STRAPI_URL ?? "http://localhost:1337";

export type StrapiImage = {
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
};

export type CategoryId = "videojuegos" | "ropa" | "herramientas";

export type Product = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  category: CategoryId;
  image: StrapiImage | null;
};

type StrapiCollection = {
  data: RawProduct[];
};

type RawProduct = {
  id: number;
  documentId: string;
  name: string;
  slug: string;
  description?: string | null;
  price: number | string;
  stock: number | string;
  category?: CategoryId | null;
  image?: {
    url: string;
    alternativeText?: string | null;
    width?: number | null;
    height?: number | null;
  } | null;
};

export function getImageUrl(path: string): string {
  if (path.startsWith("/")) {
    return `${STRAPI_URL}${path}`;
  }

  return path;
}

function normalizeProduct(product: RawProduct): Product {
  return {
    id: product.id,
    documentId: product.documentId,
    name: product.name,
    slug: product.slug,
    description: product.description ?? "",
    price: Number(product.price),
    stock: Number(product.stock),
    category: product.category ?? "videojuegos",
    image: product.image
      ? {
          url: product.image.url,
          alternativeText: product.image.alternativeText ?? null,
          width: Number(product.image.width ?? 0),
          height: Number(product.image.height ?? 0),
        }
      : null,
  };
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(
    `${STRAPI_URL}/api/products?populate=image&pagination[pageSize]=100`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`No se pudieron cargar los productos (${res.status})`);
  }

  const json = (await res.json()) as StrapiCollection;
  return json.data.map(normalizeProduct);
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(
    `${STRAPI_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=image`,
    { cache: "no-store" },
  );

  if (!res.ok) {
    throw new Error(`No se pudo cargar el producto (${res.status})`);
  }

  const json = (await res.json()) as StrapiCollection;
  const product = json.data[0];

  return product ? normalizeProduct(product) : null;
}
