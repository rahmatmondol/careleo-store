/**
 * Storefront-facing shape mappers. shop-service returns raw DB rows
 * (snake/camel mixed, JSON string fields). We normalize to the shape the
 * store components consume.
 */

const toNumber = (v: any, fallback = 0) => {
  const n = Number(v);
  return Number.isFinite(n) ? n : fallback;
};

const parseJsonArray = (value: any): any[] => {
  if (Array.isArray(value)) return value;
  if (typeof value !== 'string') return [];
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export function mapStoreProduct(p: any) {
  if (!p || typeof p !== 'object') return p;

  const gallery = parseJsonArray(p.galleryImages)
    .map((x: any) => (typeof x === 'string' ? x : x?.url || x?.imageUrl || ''))
    .filter(Boolean);

  const price = toNumber(p.price);
  const compareAt = p.compareAtPrice == null ? null : toNumber(p.compareAtPrice);

  return {
    id: p.id,
    name: p.name,
    slug: p.slug || p.seoSlug || p.id,
    price,
    compareAtPrice: compareAt,
    imageUrl: p.imageUrl || gallery[0] || '',
    galleryImages: gallery,
    rating: toNumber(p.rating, 4.8),
    brand: p.brand || '',
    category: p.category || p.categoryName || '',
    categoryId: p.categoryId || null,
    shortDescription: p.shortDescription || '',
    description: p.description || '',
    stock: toNumber(p.stock),
    productType: p.productType || 'Simple',
    tags: parseJsonArray(p.tags),
    attributes: parseJsonArray(p.attributes),
    variations: parseJsonArray(p.variations),
  };
}

export function mapStoreCategory(c: any) {
  if (!c || typeof c !== 'object') return c;
  return {
    id: c.id,
    name: c.name,
    slug: c.slug,
    description: c.description || '',
    parentId: c.parentId || null,
    imageUrl: c.imageUrl || c.image || null,
  };
}
