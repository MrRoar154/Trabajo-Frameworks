import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const catalog = JSON.parse(fs.readFileSync(path.join(root, "data", "catalog.json"), "utf8"));
const seedDir = path.join(root, "data", "seed");
fs.mkdirSync(seedDir, { recursive: true });

for (const product of catalog.products) {
  const out = path.join(seedDir, product.file);
  const response = await fetch(product.image, {
    headers: { "User-Agent": "OficioCatalog/1.0" },
    redirect: "follow",
  });
  if (!response.ok) {
    console.log(`FAIL ${product.file} ${response.status}`);
    continue;
  }
  const bytes = Buffer.from(await response.arrayBuffer());
  const jpeg = bytes[0] === 0xff && bytes[1] === 0xd8;
  const png = bytes[0] === 0x89;
  if (!jpeg && !png) {
    console.log(`NOT_IMAGE ${product.file} ${bytes.subarray(0, 20).toString("utf8")}`);
    continue;
  }
  fs.writeFileSync(out, bytes);
  console.log(`OK ${product.file} ${bytes.length}`);
}
