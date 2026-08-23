import { Minus, Plus, ShoppingBag, X } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import type { Money } from "@shared/commerce/types";

function formatMoney(money: Money) {
  return new Intl.NumberFormat("ar", { style: "currency", currency: money.currencyCode, maximumFractionDigits: 2 }).format(Number(money.amount));
}

export function CartDrawer() {
  const { cart, closeCart, isOpen, loading, proceedToCheckout, removeItem, updateQuantity } = useCart();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-[#10213c]/35" role="dialog" aria-modal="true" aria-label="سلة التسوق">
      <aside className="mr-auto flex h-full w-full max-w-md flex-col bg-[#fffdf9] p-5 shadow-2xl sm:p-7">
        <div className="flex items-center justify-between border-b border-[#12305a]/10 pb-5">
          <div className="flex items-center gap-2 text-[#12305a]"><ShoppingBag className="h-5 w-5" /><h2 className="arabic-display text-lg">سلتك</h2></div>
          <button type="button" onClick={closeCart} className="p-2 text-[#12305a] hover:bg-[#f3eadc]" aria-label="إغلاق السلة"><X className="h-5 w-5" /></button>
        </div>
        {!cart?.items.length ? (
          <div className="flex flex-1 items-center justify-center text-center text-sm leading-7 text-[#5d687b]">لا توجد عناصر في السلة بعد.<br />عند إضافة منتج منشور ستظهر تفاصيله هنا.</div>
        ) : (
          <div className="flex-1 space-y-5 overflow-y-auto py-6">
            {cart.items.map(item => (
              <article key={item.lineId} className="border-b border-[#12305a]/10 pb-5">
                <div className="flex gap-3">
                  {item.image ? <img src={item.image.url} alt={item.image.altText ?? item.productTitle} className="h-16 w-16 object-cover" /> : <div className="h-16 w-16 bg-[#e9dfcf]" />}
                  <div className="min-w-0 flex-1"><h3 className="font-bold text-[#10213c]">{item.productTitle}</h3>{item.variantTitle !== "Default Title" && <p className="mt-1 text-xs text-[#5d687b]">{item.variantTitle}</p>}<p className="mt-2 text-sm font-bold text-[#12305a]">{formatMoney(item.lineTotal)}</p></div>
                </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="inline-flex items-center border border-[#12305a]/15"><button type="button" disabled={loading || item.quantity <= 1} onClick={() => updateQuantity(item.lineId, item.quantity - 1)} className="p-2 disabled:opacity-40" aria-label="تقليل الكمية"><Minus className="h-3 w-3" /></button><span className="min-w-8 text-center text-sm font-bold">{item.quantity}</span><button type="button" disabled={loading} onClick={() => updateQuantity(item.lineId, item.quantity + 1)} className="p-2 disabled:opacity-40" aria-label="زيادة الكمية"><Plus className="h-3 w-3" /></button></div>
                  <button type="button" disabled={loading} onClick={() => removeItem(item.lineId)} className="text-xs font-bold text-[#a1432a]">إزالة</button>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="border-t border-[#12305a]/10 pt-5">
          <div className="mb-4 flex items-center justify-between text-sm"><span className="text-[#5d687b]">الإجمالي</span><span className="font-extrabold text-[#10213c]">{cart ? formatMoney(cart.total) : "—"}</span></div>
          <button type="button" disabled={!cart?.itemCount || loading} onClick={proceedToCheckout} className="w-full bg-[#12305a] px-4 py-3 text-sm font-bold text-white disabled:opacity-40">إتمام الطلب عبر Shopify</button>
          <p className="mt-3 text-xs leading-5 text-[#667085]">تنتقل خطوة الدفع بأمان إلى Shopify. لا تحفظ هذه الواجهة بيانات بطاقات الدفع.</p>
        </div>
      </aside>
    </div>
  );
}
