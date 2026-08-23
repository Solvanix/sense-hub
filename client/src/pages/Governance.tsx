import { CartDrawer } from "@/components/CartDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { CheckCircle2, LockKeyhole, Network, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const boundaries = [
  ["Urban‑Sense", "بلاغات مدنية وأدلة وسجل تدقيق", "مواطنون وموظفو بلديات مخوّلون", "لا يشارك بيانات البلاغات مع Experience أو الموقع العام أو المتجر."],
  ["SENSE Experience", "طلبات اهتمام وملاحظات مراجعة وقرارات مبررة", "المراجعون المخولون ومالكو الطلب", "لا تتحول البيانات الخاصة إلى ملف عام تلقائيًا، ولا تصل إلى التجارة."],
  ["SENSE Hub", "حالة المنتجات وروابط ومحتوى فريق منشور", "الجمهور العام", "لا يحتفظ بجلسات تشغيلية مشتركة أو بيانات داخلية للتطبيقات الأخرى."],
  ["SENSE Commerce", "كتالوج منشور وسلة وطلب ودفع", "عملاء المتجر وShopify Admin", "لا يقرأ ملاحظات مراجعة المزوّد أو أدلة البلاغات أو سجلاتها."],
];

export default function Governance() {
  return (
    <div className="min-h-screen bg-[#f8f2e8] text-[#14233f]">
      <SiteHeader />
      <CartDrawer />
      <main className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-sm font-bold text-[#12305a]">العودة إلى SENSE Hub ←</Link>
          <section className="mt-10 max-w-4xl"><p className="section-eye">الحوكمة وحدود البيانات</p><h1 className="arabic-display mt-3 text-4xl leading-[1.55] text-[#10213c] sm:text-5xl">كل خدمة تتكلم بقدر الحاجة، لا بقدر ما تملك من بيانات.</h1><p className="mt-6 text-base leading-8 text-[#58667c]">الموقع العام لا يدمج قواعد بيانات ولا يوحد حسابات التشغيل. تنقل كل خدمة فقط نسخة محددة ومعتمدة من البيانات المنشورة عبر عقد واضح، مع الاحتفاظ بالبيانات الداخلية في مالكها الأصلي.</p></section>
          <section className="mt-14 grid gap-5 md:grid-cols-3">
            <article className="border-t-2 border-[#a1432a] bg-white/60 p-6"><LockKeyhole className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 font-extrabold text-[#10213c]">عزل الهوية</h2><p className="mt-2 text-sm leading-7 text-[#5d687b]">لكل تطبيق هوية وأدوار وجلسات خاصة به. لا تستخدم هوية Urban‑Sense لتفعيل خدمة مزوّد أو تجارة.</p></article>
            <article className="border-t-2 border-[#a1432a] bg-white/60 p-6"><Network className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 font-extrabold text-[#10213c]">عقود نشر محدودة</h2><p className="mt-2 text-sm leading-7 text-[#5d687b]">يسمح العقد بموجز مزوّد معتمد أو عنصر كتالوج منشور فقط؛ لا يسمح بتمرير جهات اتصال أو ملاحظات أو ملفات أدلة.</p></article>
            <article className="border-t-2 border-[#a1432a] bg-white/60 p-6"><ShieldCheck className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 font-extrabold text-[#10213c]">تشغيل منفصل</h2><p className="mt-2 text-sm leading-7 text-[#5d687b]">بيئات وأسرار وسجلات تدقيق واختبارات ونشر مستقلة. لا يعيد موقع الفريق نشر التطبيقات التشغيلية.</p></article>
          </section>
          <section className="mt-14 overflow-x-auto border border-[#12305a]/15 bg-[#fffdf9]"><table className="w-full min-w-[800px] text-right text-sm"><thead className="bg-[#12305a] text-white"><tr><th className="px-5 py-4">الخدمة</th><th className="px-5 py-4">البيانات المملوكة</th><th className="px-5 py-4">الوصول</th><th className="px-5 py-4">حد المشاركة</th></tr></thead><tbody>{boundaries.map((row, index) => <tr key={row[0]} className={index % 2 ? "bg-[#f8f2e8]" : ""}>{row.map((cell, cellIndex) => <td key={cellIndex} className="border-t border-[#12305a]/10 px-5 py-5 align-top leading-7 text-[#516075]">{cellIndex === 0 ? <strong className="text-[#10213c]">{cell}</strong> : cell}</td>)}</tr>)}</tbody></table></section>
          <section className="mt-14 border-y border-[#12305a]/15 py-12"><div className="grid gap-8 lg:grid-cols-[0.6fr_1.4fr]"><div><p className="section-eye">التشغيل المستقل</p><h2 className="arabic-display mt-3 text-3xl leading-[1.55] text-[#10213c]">حدود تشغيلية قابلة للتدقيق، وليست وعودًا مكتوبة فقط.</h2></div><div className="grid gap-5 sm:grid-cols-3"><article className="border-t-2 border-[#a1432a] pt-4"><h3 className="font-extrabold text-[#10213c]">بيئة لكل خدمة</h3><p className="mt-2 text-sm leading-7 text-[#5d687b]">نطاق ونشر واختبار منفصلون لكل تطبيق؛ لا ينشر الموقع العام Urban‑Sense أو Experience نيابة عنهما.</p></article><article className="border-t-2 border-[#a1432a] pt-4"><h3 className="font-extrabold text-[#10213c]">أسرار خادمية فقط</h3><p className="mt-2 text-sm leading-7 text-[#5d687b]">رموز Shopify وسائر بيانات الاتصال تبقى في بيئة الخادم ولا تُضمّن في واجهة المستخدم أو متغيرات العميل.</p></article><article className="border-t-2 border-[#a1432a] pt-4"><h3 className="font-extrabold text-[#10213c]">تدقيق محدود البيانات</h3><p className="mt-2 text-sm leading-7 text-[#5d687b]">نسجل حدث استكشاف عقد النشر ونسخته ونتيجته فقط، مع رفض البريد والهاتف والجلسة والرمز من السجل.</p></article></div></div></section>
          <section className="mt-14 border-r-4 border-[#a1432a] bg-[#f1e6d6] p-7"><div className="flex gap-3"><CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[#a1432a]" /><div><h2 className="arabic-display text-xl text-[#10213c]">ملاحظة عن حالة الإطلاق</h2><p className="mt-3 max-w-4xl text-sm leading-8 text-[#4f5f74]">SENSE Experience يبقى في وضع العرض ودعوة الاهتمام إلى أن تكتمل هوية المراجعين وبيئته وقاعدة بياناته وسياسة الاحتفاظ. طبقة التجارة تتصل بShopify، لكن إدخال منتجات حية أو تفعيل تحصيل فعلي يتطلب اعتماد الكيان والسياسات والشحن والدفع.</p></div></div></section>
        </div>
      </main>
    </div>
  );
}
