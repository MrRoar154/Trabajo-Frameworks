import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-xl flex-col items-start gap-4 px-5 py-24">
      <p className="text-sm font-semibold tracking-[0.16em] text-primary uppercase">404</p>
      <h1 className="font-heading text-4xl font-semibold">No encontramos esa página</h1>
      <p className="text-lg leading-relaxed text-muted-foreground">
        El producto no está en el catálogo o la dirección está incompleta.
      </p>
      <Link
        href="/"
        className="inline-flex h-11 cursor-pointer items-center rounded-lg bg-accent px-5 text-sm font-semibold text-black focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        Volver al catálogo
      </Link>
    </main>
  );
}
