import { CartDrawer } from "@/components/CartDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { CheckCircle2, LockKeyhole, ShieldAlert } from "lucide-react";
import { Link } from "wouter";

const practices = [
  ["الموقع العام", "محتوى المنتج والحالة والروابط العامة", "لا يجمع بلاغات مدنية أو ملاحظات مراجعة أو سجلات تشغيل من تطبيقات SENSE الأخرى."],
  ["المتجر", "الكتالوج والسلة وإتمام الطلب عبر Shopify", "لا يخزن الموقع بيانات بطاقة الدفع ولا ينقلها إلى SENSE Hub. تخضع عملية الدفع وحساب العميل لإعدادات Shopify."],
  ["SENSE Experience", "لا يستقبل بيانات مزودين حقيقية في وضع العرض الحالي", "لا يفتح استقبال البيانات حتى تثبيت هوية المراجعين وقاعدة مستقلة وسياسة احتفاظ وحذف."],
  ["Urban‑Sense", "بيانات البلاغات والأدلة داخل التطبيق البلدي", "لا تنتقل البلاغات أو الأدلة أو قرارات الإغلاق إلى الموقع العام أو التجارة أو Experience."],
];

export default function Privacy() {
  return (
    <div className="min-h-screen bg-[#f8f2e8] text-[#14233f]">
      <SiteHeader />
      <CartDrawer />
      <main className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl"><Link href="/" className="text-sm font-bold text-[#12305a]">العودة إلى SENSE Hub ←</Link>
          <section className="mt-10 grid gap-8 border-b border-[#12305a]/15 pb-12 lg:grid-cols-[1.1fr_0.9fr]"><div><p className="section-eye">الخصوصية والاحتفاظ</p><h1 className="arabic-display mt-3 text-4xl leading-[1.6] text-[#10213c] sm:text-5xl">نجمع بالحد الأدنى، ونحتفظ داخل الخدمة التي تحتاج البيانات فعلًا.</h1></div><aside className="border-r-4 border-[#a1432a] bg-[#f1e6d6] p-6"><ShieldAlert className="h-5 w-5 text-[#a1432a]" /><p className="mt-3 text-sm leading-7 text-[#536277]">هذه الصفحة تشرح حدود المنظومة الحالية. لا تحل محل سياسة قانونية نهائية، وتحتاج كل خدمة تستقبل بيانات حقيقية إلى سياسة احتفاظ وحذف وموافقة ملائمة قبل الإطلاق.</p></aside></section>
          <section className="mt-12 overflow-x-auto border border-[#12305a]/15 bg-[#fffdf9]"><table className="w-full min-w-[760px] text-right text-sm"><thead className="bg-[#12305a] text-white"><tr><th className="px-5 py-4">الخدمة</th><th className="px-5 py-4">النطاق الحالي</th><th className="px-5 py-4">حد البيانات</th></tr></thead><tbody>{practices.map((row, index) => <tr key={row[0]} className={index % 2 ? "bg-[#f8f2e8]" : ""}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border-t border-[#12305a]/10 px-5 py-5 align-top leading-7 text-[#516075]">{cellIndex === 0 ? <strong className="text-[#10213c]">{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></section>
          <section className="mt-12 grid gap-6 md:grid-cols-2"><article className="border-t-2 border-[#a1432a] bg-white/60 p-6"><LockKeyhole className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 text-xl font-extrabold text-[#10213c]">ما لا يفعله SENSE Hub</h2><p className="mt-3 text-sm leading-8 text-[#5d687b]">لا يوفّر حسابًا موحدًا بين المنتجات، ولا يقرأ قواعد بياناتها، ولا ينسخ أدلة البلاغات أو جهات اتصال المزوّدين أو ملاحظات المراجعة إلى الموقع العام.</p></article><article className="border-t-2 border-[#a1432a] bg-white/60 p-6"><CheckCircle2 className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 text-xl font-extrabold text-[#10213c]">قبل فتح أي بيانات حقيقية</h2><p className="mt-3 text-sm leading-8 text-[#5d687b]">نثبت مالك البيانات، الغرض من الجمع، الدور المخوّل، مدة الاحتفاظ، آلية الحذف، وسبب النشر. دون ذلك يبقى المسار في وضع العرض أو الدعوة فقط.</p></article></section>
        </div>
      </main>
    </div>
  );
}
