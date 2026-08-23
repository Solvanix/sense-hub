import { CartDrawer } from "@/components/CartDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { useAuth } from "@/_core/hooks/useAuth";
import { startLogin } from "@/const";
import { trpc } from "@/lib/trpc";
import { AlertCircle, CheckCircle2, FileLock2, Loader2, Save, ShieldCheck } from "lucide-react";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { Link } from "wouter";

type DraftForm = {
  brandName: string;
  tourismSubsector: string;
  serviceCategories: string;
  generalArea: string;
  privateServiceDescription: string;
  publicServiceStory: string;
  languages: string;
  bookingUrl: string;
  operatingSeasonality: string;
  growthPriorities: string;
  businessBarriers: string;
  sustainabilityStatement: string;
  membershipStatement: string;
  processingConsent: boolean;
  publicListingConsent: boolean;
};

const emptyForm: DraftForm = {
  brandName: "", tourismSubsector: "", serviceCategories: "", generalArea: "", privateServiceDescription: "", publicServiceStory: "", languages: "", bookingUrl: "", operatingSeasonality: "", growthPriorities: "", businessBarriers: "", sustainabilityStatement: "", membershipStatement: "", processingConsent: false, publicListingConsent: false,
};

function splitCommaList(value: string) {
  return value.split("،").flatMap(item => item.split(",")).map(item => item.trim()).filter(Boolean);
}

function listToText(value: string[]) {
  return value.join("، ");
}

const fieldClass = "mt-2 w-full border border-[#12305a]/20 bg-white px-3 py-3 text-sm text-[#14233f] outline-none focus:border-[#a1432a]";
const labelClass = "text-sm font-extrabold text-[#213653]";

export default function ProviderDraft() {
  const { user, loading, isAuthenticated } = useAuth();
  const [form, setForm] = useState<DraftForm>(emptyForm);
  const draftQuery = trpc.providerDrafts.mine.useQuery(undefined, { enabled: isAuthenticated });
  const saveMutation = trpc.providerDrafts.save.useMutation({
    onSuccess: () => {
      toast.success("حُفظت المسودة داخل ملفك الخاص.");
      draftQuery.refetch();
    },
    onError: error => toast.error(error.message || "تعذر حفظ المسودة."),
  });

  useEffect(() => {
    if (!draftQuery.data) return;
    const { content } = draftQuery.data;
    setForm({
      brandName: content.brandName,
      tourismSubsector: content.tourismSubsector,
      serviceCategories: listToText(content.serviceCategories),
      generalArea: content.generalArea,
      privateServiceDescription: content.privateServiceDescription,
      publicServiceStory: content.publicServiceStory,
      languages: listToText(content.languages),
      bookingUrl: content.bookingUrl,
      operatingSeasonality: content.operatingSeasonality,
      growthPriorities: listToText(content.growthPriorities),
      businessBarriers: listToText(content.businessBarriers),
      sustainabilityStatement: content.sustainabilityStatement,
      membershipStatement: content.membershipStatement,
      processingConsent: Boolean(draftQuery.data.processingConsent),
      publicListingConsent: Boolean(draftQuery.data.publicListingConsent),
    });
  }, [draftQuery.data]);

  function setField<K extends keyof DraftForm>(key: K, value: DraftForm[K]) {
    setForm(current => ({ ...current, [key]: value }));
  }

  function saveDraft(event: FormEvent) {
    event.preventDefault();
    if (!form.processingConsent) {
      toast.error("يلزم قبول معالجة المسودة الخاصة قبل الحفظ.");
      return;
    }
    saveMutation.mutate({
      processingConsent: true,
      publicListingConsent: form.publicListingConsent,
      content: {
        brandName: form.brandName,
        tourismSubsector: form.tourismSubsector,
        serviceCategories: splitCommaList(form.serviceCategories),
        generalArea: form.generalArea,
        privateServiceDescription: form.privateServiceDescription,
        publicServiceStory: form.publicServiceStory,
        languages: splitCommaList(form.languages),
        bookingUrl: form.bookingUrl,
        operatingSeasonality: form.operatingSeasonality,
        growthPriorities: splitCommaList(form.growthPriorities),
        businessBarriers: splitCommaList(form.businessBarriers),
        sustainabilityStatement: form.sustainabilityStatement,
        membershipStatement: form.membershipStatement,
      },
    });
  }

  if (loading) return <div className="min-h-screen bg-[#f8f2e8]" />;

  return (
    <div className="min-h-screen bg-[#f8f2e8] text-[#14233f]">
      <SiteHeader />
      <CartDrawer />
      <main className="px-5 py-12 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-5xl">
          <Link href="/للمزودين" className="text-sm font-bold text-[#12305a]">العودة إلى خريطة الاستبانة ←</Link>
          <section className="mt-8 grid gap-6 border-b border-[#12305a]/15 pb-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div><p className="section-eye">SENSE Experience · مساحة خاصة</p><h1 className="arabic-display mt-3 text-4xl leading-[1.6] text-[#10213c]">مسودة ملف المزوّد</h1><p className="mt-4 max-w-2xl text-sm leading-8 text-[#5d687b]">أدخل المعلومات التي تريد إعدادها لمراجعة مستقبلية. هذه المسودة لا تنشر ملفًا عامًا، ولا ترفع ملفات، ولا ترسل معلوماتك إلى متجر SENSE أو Urban‑Sense.</p></div>
            <aside className="border-r-4 border-[#a1432a] bg-[#f1e6d6] p-5"><FileLock2 className="h-5 w-5 text-[#a1432a]" /><p className="mt-3 text-sm font-extrabold text-[#10213c]">مالك المسودة: {user?.name || "حسابك"}</p><p className="mt-2 text-xs leading-6 text-[#5d687b]">الحالة الآن: مسودة خاصة. لا يوجد إرسال للمراجعة أو نشر في هذه النسخة.</p></aside>
          </section>

          {!isAuthenticated ? <section className="mt-10 border-t-2 border-[#a1432a] bg-white/70 p-8 text-center"><ShieldCheck className="mx-auto h-7 w-7 text-[#a1432a]" /><h2 className="mt-4 text-xl font-extrabold text-[#10213c]">سجّل الدخول لحفظ مسودتك الخاصة</h2><p className="mt-3 text-sm leading-7 text-[#5d687b]">يرتبط كل ملف بحسابه المالك ولا يوجد وصول عام إليه.</p><button type="button" onClick={() => startLogin()} className="mt-5 bg-[#12305a] px-5 py-3 text-sm font-bold text-white">تسجيل الدخول</button></section> :
            <form onSubmit={saveDraft} className="mt-10 space-y-10">
              <section className="border border-[#12305a]/15 bg-white/65 p-6"><p className="section-eye">01 · الموافقات والهوية</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className={labelClass}>اسم العلامة أو المشروع<input required value={form.brandName} onChange={e => setField("brandName", e.target.value)} className={fieldClass} /></label><label className={labelClass}>القطاع الفرعي<select required value={form.tourismSubsector} onChange={e => setField("tourismSubsector", e.target.value)} className={fieldClass}><option value="">اختر القطاع</option><option>سياحة ريفية</option><option>سياحة زراعية</option><option>طبيعة ومغامرة</option><option>تراث وثقافة</option><option>إقامة وضيافة</option><option>أخرى</option></select></label><label className={`${labelClass} sm:col-span-2`}>فئات الخدمة، مفصولة بفواصل<input value={form.serviceCategories} onChange={e => setField("serviceCategories", e.target.value)} placeholder="إقامة، طعام محلي، ورشة…" className={fieldClass} /></label><label className={`${labelClass} sm:col-span-2`}>المنطقة العامة فقط<input required value={form.generalArea} onChange={e => setField("generalArea", e.target.value)} placeholder="بلدية أو منطقة عامة، لا عنوانًا دقيقًا" className={fieldClass} /></label></div><div className="mt-6 space-y-3 border-t border-[#12305a]/10 pt-5"><label className="flex gap-3 text-sm leading-7 text-[#334763]"><input required type="checkbox" checked={form.processingConsent} onChange={e => setField("processingConsent", e.target.checked)} className="mt-1 h-4 w-4" />أوافق على حفظ هذه المسودة الخاصة في حسابي لأجل إعداد ملف المزوّد.</label><label className="flex gap-3 text-sm leading-7 text-[#334763]"><input type="checkbox" checked={form.publicListingConsent} onChange={e => setField("publicListingConsent", e.target.checked)} className="mt-1 h-4 w-4" />يمكن مراجعة إمكانية إنشاء ملخص عام لاحقًا. لا يعني هذا الخيار نشرًا الآن.</label></div></section>

              <section className="border border-[#12305a]/15 bg-white/65 p-6"><p className="section-eye">02 · الخدمة وتجربة الضيف</p><div className="mt-5 grid gap-5"><label className={labelClass}>الوصف الخاص للخدمة<textarea value={form.privateServiceDescription} onChange={e => setField("privateServiceDescription", e.target.value)} rows={4} placeholder="اشرح الخدمة كما تريد للمراجعة الداخلية." className={fieldClass} /></label><label className={labelClass}>مسودة ملخص الزائر المقترح<textarea value={form.publicServiceStory} onChange={e => setField("publicServiceStory", e.target.value)} rows={3} placeholder="ملخص قصير يمكن مراجعته لاحقًا؛ لا ينشر تلقائيًا." className={fieldClass} /></label><div className="grid gap-5 sm:grid-cols-3"><label className={labelClass}>اللغات<input value={form.languages} onChange={e => setField("languages", e.target.value)} placeholder="العربية، الإنجليزية" className={fieldClass} /></label><label className={labelClass}>رابط الحجز أو الاستعلام<input value={form.bookingUrl} onChange={e => setField("bookingUrl", e.target.value)} placeholder="https://… (اختياري)" className={fieldClass} /></label><label className={labelClass}>الموسمية<select value={form.operatingSeasonality} onChange={e => setField("operatingSeasonality", e.target.value)} className={fieldClass}><option value="">غير محدد</option><option>مفتوح طوال العام</option><option>موسمي</option><option>حسب الحجز</option></select></label></div></div></section>

              <section className="border border-[#12305a]/15 bg-white/65 p-6"><p className="section-eye">03 · النمو والادعاءات</p><div className="mt-5 grid gap-5 sm:grid-cols-2"><label className={labelClass}>أولويات النمو، مفصولة بفواصل<textarea value={form.growthPriorities} onChange={e => setField("growthPriorities", e.target.value)} rows={4} placeholder="تحسين الوصول، تدريب…" className={fieldClass} /></label><label className={labelClass}>العوائق، مفصولة بفواصل<textarea value={form.businessBarriers} onChange={e => setField("businessBarriers", e.target.value)} rows={4} placeholder="التمويل، الوصول إلى العملاء…" className={fieldClass} /></label><label className={labelClass}>ما ذكره المزوّد عن الاستدامة<textarea value={form.sustainabilityStatement} onChange={e => setField("sustainabilityStatement", e.target.value)} rows={3} placeholder="يبقى تصريحًا خاصًا حتى يقدم دليلًا ومراجعة." className={fieldClass} /></label><label className={labelClass}>ما ذكره المزوّد عن العضوية<textarea value={form.membershipStatement} onChange={e => setField("membershipStatement", e.target.value)} rows={3} placeholder="لا يعرض كعضوية متحققة أو شارة." className={fieldClass} /></label></div><div className="mt-5 flex gap-3 border-t border-[#12305a]/10 pt-5 text-xs leading-6 text-[#5d687b]"><AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-[#a1432a]" />رفع الملفات، التحليل الذكي، الصور، الخرائط، والإرسال للمراجعة غير مفعلة في بوابة المسودة الحالية. وهي تحتاج سياسات احتفاظ وأدوار مراجعة وعقود تكامل مستقلة.</div></section>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#12305a]/15 pt-6"><p className="text-xs leading-6 text-[#5d687b]">{draftQuery.data ? "تم العثور على مسودة سابقة، وسيُحدّث حفظك نفس المسودة." : "ستنُشأ مسودة خاصة عند أول حفظ."}</p><button disabled={saveMutation.isPending} type="submit" className="inline-flex items-center gap-2 bg-[#12305a] px-5 py-3 text-sm font-bold text-white disabled:opacity-60">{saveMutation.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saveMutation.isPending ? "جارٍ الحفظ…" : "حفظ المسودة"}</button></div>
              {draftQuery.data && <p className="flex items-center gap-2 text-xs font-bold text-[#3e6d5b]"><CheckCircle2 className="h-4 w-4" />آخر تحديث: {new Date(draftQuery.data.updatedAt).toLocaleString("ar")}</p>}
            </form>}
        </div>
      </main>
    </div>
  );
}
