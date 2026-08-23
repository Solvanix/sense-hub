import { ShieldCheck, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { useCart } from "@/contexts/CartContext";

export function SiteHeader() {
  const { itemCount, openCart } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-[#12305a]/10 bg-[#f8f2e8]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-5 py-4 sm:px-8 lg:px-12">
        <Link href="/" className="flex shrink-0 items-center gap-2.5 text-[#12305a]">
          <span className="flex h-9 w-9 items-center justify-center border border-[#a1432a] bg-[#f8f2e8] text-[#a1432a]"><ShieldCheck className="h-4 w-4" /></span>
          <span className="hidden text-right sm:block"><strong className="arabic-display block text-base leading-none">SENSE</strong><small className="mt-1 block text-[9px] font-bold tracking-[0.09em] text-[#a1432a]">محفظة مستقلة</small></span>
        </Link>
        <nav aria-label="التنقل الرئيسي" className="hidden items-center gap-6 text-sm font-bold text-[#40516d] md:flex">
          <Link href="/">الرئيسية</Link>
          <a href="/#المنتجات">المنتجات</a>
          <a href="/#الفريق">الفريق</a>
          <Link href="/للمزودين">للمزوّدين</Link>
          <Link href="/الحوكمة">الحوكمة</Link>
          <Link href="/الخصوصية">الخصوصية</Link>
          <Link href="/المتجر">المتجر</Link>
        </nav>
        <button type="button" onClick={openCart} className="relative inline-flex min-h-10 items-center gap-2 border border-[#12305a]/20 bg-white px-3 text-sm font-bold text-[#12305a] hover:border-[#12305a]" aria-label="فتح السلة">
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">السلة</span>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-[#a1432a] px-1 text-xs text-white">{itemCount}</span>
        </button>
      </div>
    </header>
  );
}
