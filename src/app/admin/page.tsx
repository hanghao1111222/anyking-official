'use client';

import { useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import catalogData from '@/data/catalog.json';
import {
  AlertCircle,
  CheckCircle,
  Eye,
  FileText,
  Globe2,
  Image as ImageIcon,
  Mail,
  MapPin,
  Package,
  Phone,
  Plus,
  Rocket,
  ShieldCheck,
  Sparkles,
  Store,
  Upload,
  X,
} from 'lucide-react';
import { slugifyProductName } from '@/lib/product-workflow';
import { normalizeSiteLanguage, SITE_LANGUAGE_OPTIONS } from '@/lib/site-language';
import type { SiteConfig } from '@/types/product';

type SubmitStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormState {
  storeName: string;
  supportEmail: string;
  supportPhone: string;
  supportAddress: string;
  supportResponseTime: string;
  market: string;
  language: string;
  slug: string;
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  discount: string;
  highlightMessage: string;
  description: string;
  features: string;
  specs: string;
  best: string;
  amazonUrl: string;
  heroHeadline: string;
  heroSubheadline: string;
  seoTitle: string;
  seoDescription: string;
  shippingSummary: string;
  returnSummary: string;
  contactSummary: string;
  faqText: string;
}

const initialForm: FormState = {
  storeName: (catalogData.siteConfig as Partial<SiteConfig> | undefined)?.storeName || 'Store',
  supportEmail: (catalogData.siteConfig as Partial<SiteConfig> | undefined)?.supportEmail || 'support@example.com',
  supportPhone: '',
  supportAddress: '',
  supportResponseTime: 'within 24 hours',
  market: (catalogData.siteConfig as Partial<SiteConfig> | undefined)?.market || 'JP',
  language: normalizeSiteLanguage(
    (catalogData.siteConfig as Partial<SiteConfig> | undefined)?.language,
    (catalogData.siteConfig as Partial<SiteConfig> | undefined)?.market || 'JP',
  ),
  slug: '',
  name: '',
  subtitle: '',
  price: '',
  originalPrice: '',
  discount: '',
  highlightMessage: '',
  description: '',
  features: '',
  specs: '',
  best: '',
  amazonUrl: '',
  heroHeadline: '',
  heroSubheadline: '',
  seoTitle: '',
  seoDescription: '',
  shippingSummary: '',
  returnSummary: '',
  contactSummary: '',
  faqText: '',
};

export default function AdminPage() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState('');
  const [galleryFiles, setGalleryFiles] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [aplusFiles, setAplusFiles] = useState<File[]>([]);
  const [aplusPreviews, setAplusPreviews] = useState<string[]>([]);
  const [status, setStatus] = useState<SubmitStatus>('idle');
  const [message, setMessage] = useState('');
  const [warnings, setWarnings] = useState<string[]>([]);
  const [previewUrl, setPreviewUrl] = useState('');

  const thumbnailRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const aplusRef = useRef<HTMLInputElement>(null);

  const setField = (field: keyof FormState, value: string) => {
    setForm(previous => ({ ...previous, [field]: value }));
  };

  const handleNameChange = (value: string) => {
    setForm(previous => {
      const currentAutoSlug = slugifyProductName(previous.name);
      return {
        ...previous,
        name: value,
        slug: !previous.slug || previous.slug === currentAutoSlug
          ? slugifyProductName(value)
          : previous.slug,
      };
    });
  };

  const handleThumbnailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      return;
    }

    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
  };

  const handleGalleryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    setGalleryFiles(previous => [...previous, ...files]);
    setGalleryPreviews(previous => [
      ...previous,
      ...files.map(file => URL.createObjectURL(file)),
    ]);
  };

  const handleAplusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    if (files.length === 0) {
      return;
    }

    setAplusFiles(previous => [...previous, ...files]);
    setAplusPreviews(previous => [
      ...previous,
      ...files.map(file => URL.createObjectURL(file)),
    ]);
  };

  const removeGallery = (index: number) => {
    setGalleryFiles(previous => previous.filter((_, currentIndex) => currentIndex !== index));
    setGalleryPreviews(previous => previous.filter((_, currentIndex) => currentIndex !== index));
  };

  const removeAplus = (index: number) => {
    setAplusFiles(previous => previous.filter((_, currentIndex) => currentIndex !== index));
    setAplusPreviews(previous => previous.filter((_, currentIndex) => currentIndex !== index));
  };

  const checklist = [
    { label: '店铺基础信息已填写', done: Boolean(form.storeName && form.supportEmail) },
    { label: '商品核心字段已填写', done: Boolean(form.slug && form.name && form.price && form.description) },
    { label: '已填写至少 3 条卖点', done: form.features.split('\n').filter(Boolean).length >= 3 },
    { label: '已上传至少 1 张商品图', done: Boolean(thumbnailPreview || galleryPreviews.length > 0) },
    { label: '站点内容槽位已填写或可自动生成', done: Boolean(form.heroHeadline || form.seoTitle || form.faqText) },
  ];

  const handleSubmit = async (mode: 'preview' | 'deploy') => {
    if (!form.slug || !form.name || !form.price || !form.description) {
      setStatus('error');
      setMessage('请先填写 Slug、商品名称、售价和商品描述。');
      return;
    }

    setStatus('loading');
    setWarnings([]);
    setMessage(mode === 'deploy' ? '正在准备生产部署...' : '正在保存预览工作区...');

    const payload = new FormData();
    payload.append('mode', mode);

    Object.entries(form).forEach(([key, value]) => {
      payload.append(key, value);
    });

    if (thumbnail) {
      payload.append('thumbnail', thumbnail);
    }

    galleryFiles.forEach(file => payload.append('gallery', file));
    aplusFiles.forEach(file => payload.append('aplus', file));

    try {
      const response = await fetch('/api/agent', {
        method: 'POST',
        body: payload,
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || '请求失败');
      }

      setStatus('success');
      setMessage(data.message);
      setWarnings(data.warnings || []);
      setPreviewUrl(data.previewUrl || '');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : '未知错误');
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,#1f2937,transparent_45%),linear-gradient(180deg,#020617,#111827_45%,#020617)] text-white">
      <header className="border-b border-white/10 bg-white/5 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 shadow-lg shadow-cyan-500/20">
              <Package className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.32em] text-cyan-200/80">商品站点自动化工作台</p>
              <h1 className="text-2xl font-semibold tracking-tight">独立站生成与部署 Agent</h1>
            </div>
          </div>

          <div className="hidden items-center gap-3 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-medium text-emerald-200 md:flex">
            <span className="h-2 w-2 rounded-full bg-emerald-300" />
            本地编辑模式
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {status !== 'idle' && (
          <div
            className={`mb-6 flex items-start gap-3 rounded-2xl border px-4 py-4 ${
              status === 'success'
                ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-100'
                : status === 'error'
                  ? 'border-red-400/30 bg-red-400/10 text-red-100'
                  : 'border-cyan-400/30 bg-cyan-400/10 text-cyan-100'
            }`}
          >
            {status === 'loading' ? (
              <div className="mt-0.5 h-5 w-5 animate-spin rounded-full border-2 border-current border-t-transparent" />
            ) : status === 'success' ? (
              <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            ) : (
              <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0" />
            )}
            <div className="flex-1 space-y-2">
              <p className="text-sm font-medium">{message}</p>
              {warnings.length > 0 && (
                <ul className="space-y-1 text-xs text-white/80">
                  {warnings.map(warning => (
                    <li key={warning}>- {warning}</li>
                  ))}
                </ul>
              )}
            </div>
            {previewUrl && (
              <a
                href={previewUrl}
                target="_blank"
                className="rounded-full border border-white/20 px-4 py-2 text-xs font-medium hover:bg-white/10"
                rel="noreferrer"
              >
                打开预览
              </a>
            )}
          </div>
        )}

        <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
          <div className="space-y-6">
            <Card className="border-white/10 bg-white/5 text-white shadow-2xl shadow-black/20">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Store className="h-5 w-5 text-cyan-300" />
                  <h2 className="text-lg font-semibold">站点配置</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">店铺名称</label>
                    <Input value={form.storeName} onChange={event => setField('storeName', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">站点市场</label>
                    <select
                      value={form.market}
                      onChange={event => setField('market', event.target.value)}
                      className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
                    >
                      <option value="JP" className="text-black">日本站（JP）</option>
                      <option value="US" className="text-black">美国站（US）</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">网页语言</label>
                    <select
                      value={form.language}
                      onChange={event => setField('language', event.target.value)}
                      className="h-10 w-full rounded-md border border-white/10 bg-white/5 px-3 text-sm text-white outline-none"
                    >
                      {SITE_LANGUAGE_OPTIONS.map(option => (
                        <option key={option.value} value={option.value} className="text-black">
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">客服邮箱</label>
                    <Input value={form.supportEmail} onChange={event => setField('supportEmail', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">客服电话</label>
                    <Input value={form.supportPhone} onChange={event => setField('supportPhone', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="+81..." />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">客服地址</label>
                    <Input value={form.supportAddress} onChange={event => setField('supportAddress', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="公司地址 / 仓库地址 / 客服中心" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">客服响应时效</label>
                    <Input value={form.supportResponseTime} onChange={event => setField('supportResponseTime', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="例如：24小时内回复" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <FileText className="h-5 w-5 text-orange-300" />
                  <h2 className="text-lg font-semibold">商品核心信息</h2>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">商品名称</label>
                    <Input value={form.name} onChange={event => handleNameChange(event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">商品 Slug（URL）</label>
                    <Input value={form.slug} onChange={event => setField('slug', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">副标题</label>
                    <Input value={form.subtitle} onChange={event => setField('subtitle', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="用于首页卡片和商品头图的短文案" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">销售价</label>
                    <Input value={form.price} onChange={event => setField('price', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="如：￥29,990 或 $199.99" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">原价</label>
                    <Input value={form.originalPrice} onChange={event => setField('originalPrice', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">折扣标签</label>
                    <Input value={form.discount} onChange={event => setField('discount', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="-33%" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">适用人群/场景</label>
                    <Input value={form.best} onChange={event => setField('best', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="如：旅行 / 日常护理 / 送礼" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">高亮卖点文案</label>
                    <Input value={form.highlightMessage} onChange={event => setField('highlightMessage', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="用于商品页高亮区/提示条" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">商品详情描述</label>
                    <textarea value={form.description} onChange={event => setField('description', event.target.value)} rows={5} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">卖点（每行一条）</label>
                    <textarea value={form.features} onChange={event => setField('features', event.target.value)} rows={6} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" placeholder={'卖点1\n卖点2\n卖点3'} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">规格参数（key: value）</label>
                    <textarea value={form.specs} onChange={event => setField('specs', event.target.value)} rows={6} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" placeholder={'Brand: Example\nModel: X1\nProtection: IPX7'} />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">外部购买链接</label>
                    <Input value={form.amazonUrl} onChange={event => setField('amazonUrl', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" placeholder="Amazon 或其他平台商品链接" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardContent className="p-6">
                <div className="mb-5 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-fuchsia-300" />
                  <div>
                    <h2 className="text-lg font-semibold">站点内容槽位</h2>
                    <p className="text-sm text-white/50">可留空，系统会自动生成兜底文案。</p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">首页 Hero 主标题</label>
                    <Input value={form.heroHeadline} onChange={event => setField('heroHeadline', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">首页 Hero 副标题</label>
                    <Input value={form.heroSubheadline} onChange={event => setField('heroSubheadline', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">SEO 标题</label>
                    <Input value={form.seoTitle} onChange={event => setField('seoTitle', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm text-white/70">SEO 描述</label>
                    <Input value={form.seoDescription} onChange={event => setField('seoDescription', event.target.value)} className="border-white/10 bg-white/5 text-white placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">物流政策摘要</label>
                    <textarea value={form.shippingSummary} onChange={event => setField('shippingSummary', event.target.value)} rows={3} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">退换货政策摘要</label>
                    <textarea value={form.returnSummary} onChange={event => setField('returnSummary', event.target.value)} rows={3} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">客服页摘要</label>
                    <textarea value={form.contactSummary} onChange={event => setField('contactSummary', event.target.value)} rows={3} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <label className="text-sm text-white/70">FAQ 内容块</label>
                    <textarea value={form.faqText} onChange={event => setField('faqText', event.target.value)} rows={8} className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white outline-none placeholder:text-white/30" placeholder={'Q: 这款商品的核心优势是什么？\nA: ...\n\nQ: 包装内包含什么？\nA: ...'} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-white/10 bg-white/5 text-white">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-cyan-300" />
                  <h3 className="font-semibold">素材上传区</h3>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-white/70">主图（Thumbnail）</span>
                      <input ref={thumbnailRef} type="file" accept="image/*" className="hidden" onChange={handleThumbnailChange} />
                      <button type="button" onClick={() => thumbnailRef.current?.click()} className="text-xs text-cyan-200 hover:text-white">
                        上传
                      </button>
                    </div>
                    {thumbnailPreview ? (
                      <div className="group relative overflow-hidden rounded-2xl border border-white/10">
                        <img src={thumbnailPreview} alt="主图预览" className="aspect-square w-full object-cover" />
                        <button type="button" onClick={() => { setThumbnail(null); setThumbnailPreview(''); }} className="absolute right-3 top-3 rounded-full bg-black/60 p-2 opacity-0 transition group-hover:opacity-100">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    ) : (
                      <button type="button" onClick={() => thumbnailRef.current?.click()} className="flex aspect-square w-full flex-col items-center justify-center rounded-2xl border border-dashed border-white/15 bg-white/5 text-white/50 transition hover:border-cyan-300/40 hover:text-white/80">
                        <Upload className="mb-2 h-8 w-8" />
                        <span className="text-sm">上传主图</span>
                      </button>
                    )}
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-white/70">详情图（Gallery）</span>
                      <input ref={galleryRef} type="file" accept="image/*" multiple className="hidden" onChange={handleGalleryChange} />
                      <button type="button" onClick={() => galleryRef.current?.click()} className="inline-flex items-center gap-1 text-xs text-cyan-200 hover:text-white">
                        <Plus className="h-3 w-3" />
                        添加
                      </button>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {galleryPreviews.map((preview, index) => (
                        <div key={preview} className="group relative overflow-hidden rounded-xl border border-white/10">
                          <img src={preview} alt="" className="aspect-square w-full object-cover" />
                          <button type="button" onClick={() => removeGallery(index)} className="absolute right-2 top-2 rounded-full bg-black/60 p-1 opacity-0 transition group-hover:opacity-100">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-sm text-white/70">A+ 素材图</span>
                      <input ref={aplusRef} type="file" accept="image/*" multiple className="hidden" onChange={handleAplusChange} />
                      <button type="button" onClick={() => aplusRef.current?.click()} className="inline-flex items-center gap-1 text-xs text-cyan-200 hover:text-white">
                        <Plus className="h-3 w-3" />
                        添加
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {aplusPreviews.map((preview, index) => (
                        <div key={preview} className="group relative overflow-hidden rounded-xl border border-white/10">
                          <img src={preview} alt="" className="aspect-[4/5] w-full object-cover" />
                          <button type="button" onClick={() => removeAplus(index)} className="absolute right-2 top-2 rounded-full bg-black/60 p-1 opacity-0 transition group-hover:opacity-100">
                            <X className="h-3 w-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-emerald-300" />
                  <h3 className="font-semibold">发布前检查</h3>
                </div>
                <div className="space-y-3">
                  {checklist.map(item => (
                    <div key={item.label} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 px-3 py-3">
                      {item.done ? (
                        <CheckCircle className="h-4 w-4 text-emerald-300" />
                      ) : (
                        <AlertCircle className="h-4 w-4 text-amber-300" />
                      )}
                      <span className="text-sm text-white/80">{item.label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-white/10 bg-white/5 text-white">
              <CardContent className="p-6">
                <div className="mb-4 space-y-2">
                  <h3 className="font-semibold">Agent 接下来会做什么</h3>
                  <p className="text-sm text-white/50">
                    系统会校验商品字段、写入标准化 catalog、保存素材、补全缺失文案，然后生成本地预览，或自动推送到 GitHub 触发 Vercel 部署。
                  </p>
                </div>

                <div className="mb-6 space-y-3 text-sm text-white/70">
                  <div className="flex items-start gap-3">
                    <Globe2 className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>站点配置会同步到联系页、政策页、物流页和结账页。</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>客服信息会覆盖站内服务模块，减少旧模板文案残留。</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>缺失的 Hero / SEO / FAQ 内容会自动生成兜底草稿。</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-cyan-300" />
                    <span>建议先本地预览，再一键发布到生产环境。</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button onClick={() => handleSubmit('preview')} disabled={status === 'loading'} className="h-12 w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                    <Eye className="mr-2 h-4 w-4" />
                    保存并本地预览
                  </Button>
                  <Button onClick={() => handleSubmit('deploy')} disabled={status === 'loading'} className="h-12 w-full bg-white text-slate-950 hover:bg-slate-200">
                    <Rocket className="mr-2 h-4 w-4" />
                    一键部署到生产
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
