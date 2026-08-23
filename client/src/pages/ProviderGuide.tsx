import { CartDrawer } from "@/components/CartDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { providerIntakeStages } from "@shared/provider/intake";
import { ruralTourismSurveyTrace, type SurveyTreatment } from "@shared/provider/surveyTrace";
import { CheckCircle2, FileText, MapPinned, ShieldCheck, Sparkles, UploadCloud } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

type Lens = "provider" | "reviewer" | "visitor";

const lensCopy: Record<Lens, { label: string; heading: string; intro: string }> = {
  provider: { label: "منظور المزوّد", heading: "استبانة تتحول إلى ملفك، لا إلى عبء إداري.", intro: "تجيب بلغتك، تحفظ المسودة، وتختار ما ترغب بإظهاره. لا ينشر شيء تلقائيًا." },
  reviewer: { label: "منظور المراجع", heading: "مسودة موثقة، لا ادعاءات مفترضة.", intro: "يراجع المراجع ما وافق عليه المزوّد، ويطلب استكمالًا أو يتحقق من الأدلة قبل قرار النشر." },
  visitor: { label: "منظور الزائر", heading: "يرى ما صُرّح به وتحقق فقط.", intro: "يصل الزائر إلى ملخص خدمة ومنطقة عامة ومعلومات عملية معتمدة، وليس إلى تشخيص أو بيانات اتصال خاصة." },
};

const classificationStyle: Record<string, string> = {
  "خاص جدًا": "bg-slate-200 text-slate-900",
  "خاص": "bg-slate-100 text-slate-800",
  "عام بعد الموافقة": "bg-[#e7e4f5] text-[#40356d]",
  "ادعاء يحتاج دليلًا": "bg-amber-100 text-amber-900",
  "تشخيص خاص": "bg-rose-100 text-rose-900",
  "لا يجمع افتراضيًا": "bg-stone-200 text-stone-800",
};

const treatmentFilters: Array<SurveyTreatment | "الكل"> = ["الكل", "خاص جدًا", "عام بعد الموافقة", "ادعاء يحتاج دليلًا", "تشخيص خاص", "لا يجمع افتراضيًا"];

export default function ProviderGuide() {
  const [lens, setLens] = useState<Lens>("provider");
  const [treatment, setTreatment] = useState<SurveyTreatment | "الكل">("الكل");
  const current = lensCopy[lens];
  const visibleTrace = treatment === "الكل" ? ruralTourismSurveyTrace : ruralTourismSurveyTrace.filter(item => item.treatment === treatment);

  return (
    <div className="min-h-screen bg-[#f8f2e8] text-[#14233f]">
      <SiteHeader />
      <CartDrawer />
      <main className="px-5 py-14 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <Link href="/" className="text-sm font-bold text-[#12305a]">العودة إلى SENSE Hub ←</Link>
          <section className="mt-10 grid gap-8 border-b border-[#12305a]/15 pb-12 lg:grid-cols-[1.1fr_0.9fr]">
            <div>
              <p className="section-eye">مسار المزوّد السياحي · نموذج استرشادي</p>
              <h1 className="arabic-display mt-3 text-4xl leading-[1.6] text-[#10213c] sm:text-5xl">نحوّل أسئلة الاستبانة إلى ملف خدمة أوضح، وخطة نمو أكثر إنصافًا.</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-[#56657a]">هذه واجهة عرض لمسار SENSE Experience المستقل، مبنية من محاور الاستبانة السياحية الريفية المرجعية. لا تستقبل طلبات حقيقية ولا تخزن أي بيانات في هذه المرحلة.</p>
              <Link href="/مسودة-المزود" className="mt-6 inline-flex bg-[#12305a] px-5 py-3 text-sm font-bold text-white">ابدأ مسودة خاصة ←</Link>
            </div>
            <aside className="border-r-4 border-[#a1432a] bg-[#f1e6d6] p-6"><ShieldCheck className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 text-lg font-extrabold text-[#10213c]">قاعدة البداية</h2><p className="mt-3 text-sm leading-7 text-[#536277]">لا يظهر ملف عام، ولا ادعاء جودة أو استدامة أو وصول، إلا بعد موافقة نشر مستقلة ومراجعة بشرية وحالة تحقق مناسبة.</p></aside>
          </section>

          <section className="mt-10"><div className="flex flex-wrap gap-2">{(Object.keys(lensCopy) as Lens[]).map(option => <button type="button" key={option} onClick={() => setLens(option)} className={`border px-4 py-2 text-sm font-bold ${lens === option ? "border-[#12305a] bg-[#12305a] text-white" : "border-[#12305a]/20 bg-white text-[#12305a]"}`}>{lensCopy[option].label}</button>)}</div><div className="mt-5 border-t-2 border-[#a1432a] bg-white/60 p-7"><p className="section-eye">{current.label}</p><h2 className="arabic-display mt-2 text-2xl text-[#10213c]">{current.heading}</h2><p className="mt-3 max-w-3xl text-sm leading-7 text-[#5d687b]">{current.intro}</p></div></section>

          <section className="mt-14"><div className="flex flex-col justify-between gap-4 md:flex-row md:items-end"><div><p className="section-eye">الأسئلة تتحول إلى قرارات واضحة</p><h2 className="arabic-display mt-2 text-3xl text-[#10213c]">خمس محطات بدل نموذج طويل بلا سياق</h2></div><p className="max-w-md text-sm leading-7 text-[#5d687b]">التصنيف ظاهر بجوار كل سؤال لكي يعرف المزوّد ما يبقى خاصًا، وما يحتاج دليلًا، وما قد يصل إلى الزائر لاحقًا.</p></div><div className="mt-8 grid gap-px border border-[#12305a]/15 bg-[#12305a]/15 lg:grid-cols-5">{providerIntakeStages.map((stage, index) => <article key={stage.id} className="bg-[#fffdf9] p-5"><span className="text-xs font-bold text-[#a1432a]">0{index + 1}</span><h3 className="mt-4 text-lg font-extrabold text-[#10213c]">{stage.title}</h3><p className="mt-3 text-sm font-bold leading-7 text-[#334763]">{stage.question}</p><span className={`mt-4 inline-block px-2 py-1 text-[11px] font-bold ${classificationStyle[stage.classification]}`}>{stage.classification}</span><p className="mt-4 text-xs leading-6 text-[#607089]">{stage.detail}</p></article>)}</div></section>

          <section className="mt-14 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]"><div><p className="section-eye">من الملف إلى ملخص منشور</p><h2 className="arabic-display mt-2 text-3xl leading-[1.6] text-[#10213c]">كل خطوة لها مالك وقرار.</h2><p className="mt-4 text-sm leading-8 text-[#5d687b]">لا تُحوّل الإجابة الذاتية إلى ترتيب أو اعتماد. ويظل تقييم الأولويات والعوائق واحتياج التعلم داخل مساحة خاصة للمزوّد والمراجع.</p></div><div className="grid gap-4 sm:grid-cols-5">{[[UploadCloud,"المزوّد يرفع مسودة أو ملفًا"],[Sparkles,"يستخرج النظام اقتراحات قابلة للتعديل"],[FileText,"يؤكد المزوّد الحقول والمصادر"],[ShieldCheck,"يراجع إنسان الأدلة والادعاءات"],[CheckCircle2,"ينشر ملخص معتمد فقط"]].map(([Icon, text], index) => { const FlowIcon = Icon as typeof UploadCloud; return <div key={index} className="border-t-2 border-[#a1432a] bg-white/65 p-4"><FlowIcon className="h-5 w-5 text-[#a1432a]" /><p className="mt-3 text-sm font-bold leading-7 text-[#263a58]">{text as string}</p></div>; })}</div></section>

          <section className="mt-14"><div className="grid gap-6 lg:grid-cols-[0.7fr_1.3fr]"><div><p className="section-eye">سجل تطبيق الاستبانة</p><h2 className="arabic-display mt-2 text-3xl leading-[1.6] text-[#10213c]">كل سؤال له قرار، وليس مجرد حقل إدخال.</h2><p className="mt-4 text-sm leading-8 text-[#5d687b]">المصفوفة أدناه تلخص التحويل الدقيق من مجموعات الاستبانة المرجعية إلى قرار SENSE. استخدم الفلتر لتعرف ما يبقى خاصًا، وما قد ينشر لاحقًا، وما يتطلب دليلًا، وما لا نجمعه أصلًا.</p></div><div className="border-r-4 border-[#a1432a] bg-[#f1e6d6] p-6"><p className="text-sm font-extrabold text-[#10213c]">مثال مهم: لا نعرض المبيعات، وعدد العملاء، والعوائق، أو أعداد المتابعين.</p><p className="mt-3 text-sm leading-7 text-[#5d687b]">هذه عناصر تشخيص وتمكين خاصة. كذلك لا نستنتج عنوانًا أو إحداثيات أو تراخيص أو سياسة إلغاء لأن النص المرجعي لا يثبتها.</p></div></div><div className="mt-7 flex flex-wrap gap-2">{treatmentFilters.map(option => <button type="button" key={option} onClick={() => setTreatment(option)} className={`border px-3 py-2 text-xs font-bold ${treatment === option ? "border-[#12305a] bg-[#12305a] text-white" : "border-[#12305a]/20 bg-white text-[#12305a]"}`}>{option}</button>)}</div><div className="mt-6 overflow-x-auto border border-[#12305a]/15 bg-[#fffdf9]"><table className="w-full min-w-[940px] text-right text-sm"><thead className="bg-[#12305a] text-white"><tr><th className="px-5 py-4">مجموعة المصدر</th><th className="px-5 py-4">السؤال أو المحور</th><th className="px-5 py-4">قرار SENSE</th><th className="px-5 py-4">التصنيف</th><th className="px-5 py-4">حد النشر</th></tr></thead><tbody>{visibleTrace.map((item, index) => <tr key={`${item.source}-${item.senseFieldOrDecision}`} className={index % 2 ? "bg-[#f8f2e8]" : ""}><td className="border-t border-[#12305a]/10 px-5 py-4 align-top font-bold text-[#10213c]">{item.source}</td><td className="border-t border-[#12305a]/10 px-5 py-4 align-top leading-7 text-[#516075]">{item.sourceQuestion}</td><td className="border-t border-[#12305a]/10 px-5 py-4 align-top font-mono text-xs leading-7 text-[#334763]">{item.senseFieldOrDecision}</td><td className="border-t border-[#12305a]/10 px-5 py-4 align-top"><span className={`inline-block px-2 py-1 text-[11px] font-bold ${classificationStyle[item.treatment]}`}>{item.treatment}</span></td><td className="border-t border-[#12305a]/10 px-5 py-4 align-top leading-7 text-[#516075]">{item.publicRule}</td></tr>)}</tbody></table></div></section>

          <section className="mt-14 border-y border-[#12305a]/15 py-12"><div className="grid gap-6 md:grid-cols-3"><article className="border-r-4 border-[#a1432a] bg-[#f1e6d6] p-6"><UploadCloud className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 text-lg font-extrabold text-[#10213c]">الملفات الذكية</h2><p className="mt-3 text-sm leading-7 text-[#5d687b]">الهدف: اقتراح حقول من ملف اختاره المزوّد، مع إبقاء المصدر والمسودة للمراجعة. الإطلاق الحقيقي يتطلب تخزينًا خاصًا وسياسة احتفاظ وحدود وصول.</p></article><article className="border-r-4 border-[#a1432a] bg-[#f1e6d6] p-6"><MapPinned className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 text-lg font-extrabold text-[#10213c]">الخرائط والموقع</h2><p className="mt-3 text-sm leading-7 text-[#5d687b]">الهدف: منطقة عامة ثم دبوس تقريبي اختياري، لا عنوان أو إحداثيات دقيقة. أي ربط مروري أو سياحي يحتاج عقد بيانات وشريكًا مصرحًا به.</p></article><article className="border-r-4 border-[#a1432a] bg-[#f1e6d6] p-6"><Sparkles className="h-5 w-5 text-[#a1432a]" /><h2 className="mt-4 text-lg font-extrabold text-[#10213c]">صور وإعلانات مسؤولة</h2><p className="mt-3 text-sm leading-7 text-[#5d687b]">الهدف: مواد يملك المزوّد حق استخدامها، أو صور مفاهيمية معلّمة. النشر أو الإعلان لا يستخدم التشخيص الخاص ولا يبدأ دون موافقة مستقلة.</p></article></div></section>
        </div>
      </main>
    </div>
  );
}
