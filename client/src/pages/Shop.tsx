import { CartDrawer } from "@/components/CartDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { useCart } from "@/contexts/CartContext";
import { trpc } from "@/lib/trpc";
import type { Money, Product } from "@shared/commerce/types";
import { ArrowUpLeft, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";

function formatMoney(money: Money) {
  return new Intl.NumberFormat("ar", { style: "currency", currency: money.currencyCode, maximumFractionDigits: 2 }).format(Number(money.amount));
}

function ProductCard({ product }: { product: Product }) {
  const { addItem, loading } = useCart();
  const variant = product.variants[0];
  const image = product.images[0];

  return (
    <article className="group bg-[#fffdf9] p-4 ring-1 ring-[#12305a]/10 transition hover:-translate-y-1 hover:ring-[#12305a]/30">
      {image ? <img src={image.url} alt={image.altText ?? product.title} className="aspect-square w-full bg-[#eee3d2] object-cover" /> : <div className="flex aspect-square items-end bg-[linear-gradient(135deg,#e9dfcf,#d5c0a5)] p-5"><span className="arabic-display text-xl text-[#12305a]">SENSE</span></div>}
      <div className="pt-5">
        <div className="flex items-center justify-between gap-3"><p className="text-xs font-bold tracking-[0.1em] text-[#a1432a]">{product.productType || "منتج منشور"}</p><span className="border border-emerald-700/20 bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-800">منشور من Shopify</span></div>
        <h2 className="mt-2 text-lg font-extrabold text-[#10213c]">{product.title}</h2>
        <p className="mt-2 line-clamp-2 min-h-12 text-sm leading-6 text-[#627086]">{product.description || "التفاصيل الكاملة للمنتج متاحة قبل إتمام الطلب."}</p>
        <div className="mt-5 flex items-center justify-between gap-3"><span className="text-base font-extrabold text-[#12305a]">{formatMoney(product.priceRange.min)}</span><button type="button" disabled={!variant?.availableForSale || loading} onClick={() => variant && addItem(variant.id)} className="inline-flex items-center gap-1.5 bg-[#12305a] px-3 py-2 text-xs font-bold text-white disabled:opacity-40">أضف للسلة <ShoppingBag className="h-3.5 w-3.5" /></button></div>
      </div>
    </article>
  );
}

export default function Shop() {
  const [input] = useState(() => ({ first: 24 }));
  const catalog = trpc.commerce.products.list.useQuery(input);

  return (
    <div className="min-h-screen bg-[#f8f2e8] text-[#14233f]">
      <SiteHeader />
      <CartDrawer />
      <main className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="inline-flex items-center gap-2 text-sm font-bold text-[#12305a]"><ArrowUpLeft className="h-4 w-4" />العودة إلى SENSE Hub</Link>
          <div className="mt-10 grid gap-8 border-b border-[#12305a]/15 pb-10 lg:grid-cols-[1fr_0.7fr]">
            <div><p className="section-eye">SENSE Commerce</p><h1 className="arabic-display mt-3 text-4xl leading-[1.55] text-[#10213c] sm:text-5xl">متجر مستقل. كتالوج حقيقي. دفع داخل Shopify.</h1></div>
            <div className="self-end border-r-4 border-[#a1432a] bg-[#f1e6d6] p-5"><p className="text-xs font-bold tracking-[0.1em] text-[#a1432a]">سجل حدود المتجر</p><p className="mt-3 text-sm leading-7 text-[#56657a]">تُستمد المنتجات والمخزون والسلة وإتمام الطلب من Shopify فقط. لا يستقبل المتجر أو يقرأ بلاغات Urban‑Sense أو ملاحظات مراجعة المزوّدين.</p></div>
          </div>
          <section className="mt-10" aria-label="كتالوج المنتجات">
            {catalog.isLoading && <p className="py-16 text-center text-sm text-[#5d687b]">يتم تحميل الكتالوج المنشور…</p>}
            {catalog.isError && <div className="border border-[#a1432a]/30 bg-[#fff7f4] p-6 text-sm leading-7 text-[#7a2f1f]">تعذر تحميل الكتالوج المنشور. لم تُعرض أي بيانات بديلة؛ تحقّق من نشر المنتجات وقناة متجر Shopify.</div>}
            {!catalog.isLoading && !catalog.isError && catalog.data?.length === 0 && <div className="border border-dashed border-[#12305a]/25 bg-white/60 px-7 py-16 text-center"><ShoppingBag className="mx-auto h-7 w-7 text-[#a1432a]" /><h2 className="arabic-display mt-5 text-xl text-[#10213c]">الكتالوج في مرحلة الاعتماد</h2><p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-[#5d687b]">تم تجهيز اتصال المتجر بالسلة وإتمام الطلب عبر Shopify. ستظهر هنا فقط المنتجات التي تعتمد وتُنشر من Shopify Admin؛ لا نضيف عناصر أو أسعارًا غير معتمدة للعرض.</p></div>}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{catalog.data?.map(product => <ProductCard key={product.id} product={product} />)}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
