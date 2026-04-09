import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import simpleGit from 'simple-git';
import { getDeployGitBranch, getDeployGitRemote } from '@/lib/deploy-target';
import {
  buildProductRecord,
  buildSiteConfigUpdate,
  normalizeSubmission,
  parseFaqEntries,
  parseLines,
  parseSpecs,
  validateSubmission,
} from '@/lib/product-workflow';

const REPO_ROOT = process.cwd();
const CATALOG_PATH = path.join(REPO_ROOT, 'src/data/catalog.json');
const PUBLIC_PRODUCTS_PATH = path.join(REPO_ROOT, 'public/products');
const MATERIALS_DIR = path.join(REPO_ROOT, '_materials');

function ensureDirectory(targetPath: string) {
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }
}

function writeUploadedFile(targetPath: string, buffer: Buffer) {
  ensureDirectory(path.dirname(targetPath));
  fs.writeFileSync(targetPath, buffer);
}

async function persistAssets(formData: FormData, slug: string) {
  const assetDir = path.join(PUBLIC_PRODUCTS_PATH, slug);

  if (fs.existsSync(assetDir)) {
    fs.rmSync(assetDir, { recursive: true, force: true });
  }

  ensureDirectory(assetDir);

  let thumbnailPath = '';
  const galleryPaths: string[] = [];
  const aplusPaths: string[] = [];

  const thumbnailFile = formData.get('thumbnail') as File | null;
  if (thumbnailFile && thumbnailFile.size > 0) {
    const buffer = Buffer.from(await thumbnailFile.arrayBuffer());
    const extension = path.extname(thumbnailFile.name) || '.jpg';
    const fileName = `thumbnail${extension}`;
    writeUploadedFile(path.join(assetDir, fileName), buffer);
    thumbnailPath = `/products/${slug}/${fileName}`;
  }

  const galleryFiles = formData.getAll('gallery') as File[];
  for (let index = 0; index < galleryFiles.length; index += 1) {
    const file = galleryFiles[index];
    if (!file || file.size === 0) {
      continue;
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname(file.name) || '.jpg';
    const fileName = `gallery-${index + 1}${extension}`;
    writeUploadedFile(path.join(assetDir, 'gallery', fileName), buffer);
    galleryPaths.push(`/products/${slug}/gallery/${fileName}`);
  }

  const aplusFiles = formData.getAll('aplus') as File[];
  for (let index = 0; index < aplusFiles.length; index += 1) {
    const file = aplusFiles[index];
    if (!file || file.size === 0) {
      continue;
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const extension = path.extname(file.name) || '.jpg';
    const fileName = `aplus-${index + 1}${extension}`;
    writeUploadedFile(path.join(assetDir, 'aplus', fileName), buffer);
    aplusPaths.push(`/products/${slug}/aplus/${fileName}`);
  }

  const fallbackThumbnail = thumbnailPath || galleryPaths[0] || '/product-1.jpg';

  return {
    thumbnail: fallbackThumbnail,
    gallery: galleryPaths.length > 0 ? galleryPaths : [fallbackThumbnail],
    aplus: aplusPaths,
  };
}

async function saveMaterialsBackup(product: unknown, slug: string) {
  const materialsSlugDir = path.join(MATERIALS_DIR, slug);
  ensureDirectory(materialsSlugDir);

  fs.writeFileSync(
    path.join(materialsSlugDir, 'data.json'),
    JSON.stringify(product, null, 2),
    'utf8',
  );
}

async function deployChanges(slug: string, name: string) {
  const git = simpleGit(REPO_ROOT);
  const remote = getDeployGitRemote();
  const branch = getDeployGitBranch();

  await git.add(['src/data/catalog.json', `public/products/${slug}`]);
  await git.commit(`Agent Auto-Deploy: ${name}`);
  await git.push(remote, branch);
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const rawSlug = (formData.get('slug') as string) || '';

    const parsed = normalizeSubmission({
      slug: rawSlug.trim(),
      name: ((formData.get('name') as string) || '').trim(),
      subtitle: ((formData.get('subtitle') as string) || '').trim(),
      price: ((formData.get('price') as string) || '').trim(),
      originalPrice: ((formData.get('originalPrice') as string) || '').trim(),
      discount: ((formData.get('discount') as string) || '').trim(),
      description: ((formData.get('description') as string) || '').trim(),
      features: parseLines((formData.get('features') as string) || ''),
      specs: parseSpecs((formData.get('specs') as string) || ''),
      best: ((formData.get('best') as string) || '').trim(),
      amazonUrl: ((formData.get('amazonUrl') as string) || '').trim(),
      highlightMessage: ((formData.get('highlightMessage') as string) || '').trim(),
      storeName: ((formData.get('storeName') as string) || '').trim(),
      supportEmail: ((formData.get('supportEmail') as string) || '').trim(),
      supportPhone: ((formData.get('supportPhone') as string) || '').trim(),
      supportAddress: ((formData.get('supportAddress') as string) || '').trim(),
      supportResponseTime: ((formData.get('supportResponseTime') as string) || '').trim(),
      market: ((formData.get('market') as string) || 'JP').trim(),
      language: ((formData.get('language') as string) || '').trim(),
      siteContent: {
        heroHeadline: ((formData.get('heroHeadline') as string) || '').trim(),
        heroSubheadline: ((formData.get('heroSubheadline') as string) || '').trim(),
        seoTitle: ((formData.get('seoTitle') as string) || '').trim(),
        seoDescription: ((formData.get('seoDescription') as string) || '').trim(),
        shippingSummary: ((formData.get('shippingSummary') as string) || '').trim(),
        returnSummary: ((formData.get('returnSummary') as string) || '').trim(),
        contactSummary: ((formData.get('contactSummary') as string) || '').trim(),
        faqs: parseFaqEntries((formData.get('faqText') as string) || ''),
      },
    });

    const mode = ((formData.get('mode') as string) || 'preview').trim();
    const warnings = validateSubmission(parsed);
    const assetPaths = await persistAssets(formData, parsed.slug);
    const product = buildProductRecord(parsed, assetPaths);

    const rawCatalog = fs.readFileSync(CATALOG_PATH, 'utf8');
    const catalog = JSON.parse(rawCatalog);
    catalog.siteConfig = {
      ...catalog.siteConfig,
      ...buildSiteConfigUpdate(parsed),
    };

    const productIndex = catalog.products.findIndex((item: { slug: string }) => item.slug === parsed.slug);
    if (productIndex >= 0) {
      catalog.products[productIndex] = product;
    } else {
      catalog.products.push(product);
    }

    fs.writeFileSync(CATALOG_PATH, JSON.stringify(catalog, null, 2), 'utf8');
    await saveMaterialsBackup(product, parsed.slug);

    if (mode === 'deploy') {
      try {
        await deployChanges(parsed.slug, parsed.name);
      } catch (error) {
        return NextResponse.json({
          success: true,
          message: `商品已保存，但部署失败：${(error as Error).message}`,
          previewUrl: `/product/${parsed.slug}`,
          warnings,
        });
      }
    }

    return NextResponse.json({
      success: true,
      message: mode === 'deploy'
        ? `商品「${parsed.name}」已完成部署。`
        : `商品「${parsed.name}」已保存，可进行预览。`,
      previewUrl: `/product/${parsed.slug}`,
      warnings,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';

    return NextResponse.json(
      { success: false, error: message },
      { status: 400 },
    );
  }
}
