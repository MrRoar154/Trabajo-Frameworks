import type { Core } from '@strapi/strapi';
import fs from 'fs';
import path from 'path';

type CatalogProduct = {
  category: 'videojuegos' | 'ropa' | 'herramientas';
  name: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  file: string;
  alt: string;
};

type CatalogFile = {
  marker: string;
  products: CatalogProduct[];
};

function readCatalog(): CatalogFile {
  const filePath = path.join(process.cwd(), 'data', 'catalog.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as CatalogFile;
}

async function ensurePublicRead(strapi: Core.Strapi) {
  const publicRole = await strapi.db.query('plugin::users-permissions.role').findOne({
    where: { type: 'public' },
  });

  if (!publicRole) {
    return;
  }

  const actions = ['api::product.product.find', 'api::product.product.findOne'];

  for (const action of actions) {
    const existing = await strapi.db.query('plugin::users-permissions.permission').findOne({
      where: { action, role: publicRole.id },
    });

    if (!existing) {
      await strapi.db.query('plugin::users-permissions.permission').create({
        data: { action, role: publicRole.id },
      });
    }
  }
}

async function publishedSlugs(strapi: Core.Strapi) {
  const products = await strapi.documents('api::product.product').findMany({
    status: 'published',
    fields: ['slug'],
    limit: 200,
  });

  return products.map((product) => product.slug).filter((slug): slug is string => Boolean(slug));
}

async function clearCatalog(strapi: Core.Strapi) {
  const drafts = await strapi.documents('api::product.product').findMany({ limit: 200 });
  const published = await strapi.documents('api::product.product').findMany({
    status: 'published',
    limit: 200,
  });
  const documentIds = new Set(
    [...drafts, ...published].map((product) => product.documentId).filter(Boolean),
  );

  for (const documentId of documentIds) {
    await strapi.documents('api::product.product').delete({ documentId });
  }

  const upload = strapi.plugin('upload').service('upload');
  const files = await strapi.db.query('plugin::upload.file').findMany();

  for (const file of files) {
    try {
      await upload.remove(file);
    } catch (error) {
      strapi.log.warn(`No se pudo borrar ${file.name}: ${String(error)}`);
    }
  }
}

async function seedProducts(strapi: Core.Strapi) {
  const catalog = readCatalog();
  const slugs = await publishedSlugs(strapi);

  if (slugs.includes(catalog.marker) && slugs.length >= catalog.products.length) {
    return;
  }

  if (slugs.length > 0) {
    strapi.log.info('Reemplazando el catálogo anterior.');
    await clearCatalog(strapi);
  }

  const upload = strapi.plugin('upload').service('upload');
  const seedDir = path.join(process.cwd(), 'data', 'seed');

  for (const product of catalog.products) {
    const filepath = path.join(seedDir, product.file);
    const stats = fs.statSync(filepath);
    const uploaded = await upload.upload({
      data: {
        fileInfo: {
          name: product.file,
          alternativeText: product.alt,
          caption: product.alt,
        },
      },
      files: {
        filepath,
        originalFilename: product.file,
        mimetype: 'image/jpeg',
        size: stats.size,
      },
    });

    const image = Array.isArray(uploaded) ? uploaded[0] : uploaded;

    await strapi.documents('api::product.product').create({
      data: {
        name: product.name,
        slug: product.slug,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category,
        image: image?.id,
      },
      status: 'published',
    });
  }

  strapi.log.info(`Catálogo publicado: ${catalog.products.length} productos.`);
}

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    await ensurePublicRead(strapi);
    await seedProducts(strapi);
  },
};
