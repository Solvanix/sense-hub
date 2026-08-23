import { CartDrawer } from "@/components/CartDrawer";
import { SiteHeader } from "@/components/SiteHeader";
import { ArrowUpLeft, CheckCircle2, ExternalLink, ShieldCheck } from "lucide-react";
import { Link } from "wouter";

const products = [
  {
    title: "Urban‑Sense",
    eyebrow: "خدمة بلدية مستقلة",
    description: "مسار بلاغات مدني موثّق من التقديم حتى التحقق والإغلاق، في بيئة تشغيلية معزولة.",
    state: "منشور",
    stateClass: "bg-emerald-100 text-emerald-900",
    href: "https://urbansense-dzfbcdz5.manus.space/",
    external: true,
  },
  {
    title: "SENSE Experience",
    eyebrow: "بوابة مزوّدين مستقلة",
    description: "مسار اهتمام ومراجعة بشرية لا يفتح بيانات حقيقية ولا ينشر ملفًا عامًا قبل الاعتماد.",
    state: "قيد التهيئة المنضبطة",
    stateClass: "bg-amber-100 text-amber-900",
    href: "/للمزودين",
    external: false,
  },
  {
    title: "SENSE Commerce",
    eyebrow: "متجر مستقل",
    description: "واجهة متجر تتصل بالكتالوج والسلة وإتمام الطلب عبر Shopify، مع بقاء الإدارة التشغيلية في Shopify Admin.",
    state: "جاهز للكتالوج المعتمد",
    stateClass: "bg-[#e7e4f5] text-[#40356d]",
    href: "/المتجر",
    external: false,
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-[#f8f2e8] text-[#14233f]">
      <SiteHeader />
      <CartDrawer />
      <main>
        <section className="relative overflow-hidden px-5 pb-20 pt-16 sm:px-8 lg:px-12 lg:pt-24">
          <div className="mesh-orb mesh-orb-one" />
          <div className="mesh-orb mesh-orb-two" />
          <div className="relative mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <p className="section-eye">منظومة رقمية بحدود واضحة</p>
              <h1 className="arabic-display mt-5 max-w-4xl text-4xl leading-[1.45] text-[#10213c] sm:text-5xl lg:text-6xl">
                تقنية تخدم المكان والناس، <span className="text-[#a1432a]">من دون خلطٍ بين الثقة والبيانات.</span>
              </h1>
              <p className="mt-7 max-w-2xl text-base leading-8 text-[#4c5870] sm:text-lg">
                SENSE مظلة واضحة للمنتجات المستقلة: بلاغات مدنية، وخدمات مزوّدين، وموقع فريق، وتجارة. لكل منتج حدود بيانات وهوية وصلاحيات ونشر مستقلة.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/المتجر" className="inline-flex items-center gap-2 bg-[#12305a] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#0d2446]">
                  استكشف المتجر <ArrowUpLeft className="h-4 w-4" />
                </Link>
                <Link href="/الحوكمة" className="inline-flex items-center gap-2 border border-[#12305a]/25 bg-white/50 px-5 py-3 text-sm font-bold text-[#12305a] transition hover:border-[#12305a]">
                  اطلع على الحوكمة <ShieldCheck className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <aside className="frame-panel border-[#12305a]/15 bg-[#12305a] p-7 text-white sm:p-9">
              <p className="text-xs font-bold tracking-[0.18em] text-[#d8b98b]">مبدأ العمل</p>
              <p className="arabic-display mt-5 text-2xl leading-[1.7] text-white">
                لا يصل الموقع العام أو المتجر إلى بلاغ مدني أو ملاحظة مراجعة خاصة.
              </p>
              <div className="mt-7 border-t border-white/20 pt-5 text-sm leading-7 text-[#dbe6f7]">
                التبادل بين الخدمات يمر فقط عبر عقود نشر محددة، مثل ملخّص مزوّد معتمد أو عنصر كتالوج منشور.
              </div>
            </aside>
          </div>
        </section>

        <section id="المنتجات" className="border-y border-[#12305a]/10 bg-white/70 px-5 py-16 sm:px-8 lg:px-12">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
              <div>
                <p className="section-eye">المحفظة</p>
                <h2 className="arabic-display mt-3 text-3xl text-[#10213c] sm:text-4xl">منتجات مستقلة، تجربة متسقة</h2>
              </div>
              <p className="max-w-md text-sm leading-7 text-[#5d687b]">حالة كل منتج موضّحة كما هي اليوم؛ لا تُعرض الموجات المقترحة كأنها خدمات متاحة.</p>
            </div>
            <div className="mt-10 grid gap-px overflow-hidden border border-[#12305a]/15 bg-[#12305a]/15 lg:grid-cols-3">
              {products.map(product => {
                const content = <>
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-xs font-bold tracking-[0.12em] text-[#a1432a]">{product.eyebrow}</p>
                    <span className={`whitespace-nowrap px-2 py-1 text-xs font-bold ${product.stateClass}`}>{product.state}</span>
                  </div>
                  <h3 className="arabic-display mt-6 text-2xl text-[#10213c]">{product.title}</h3>
                  <p className="mt-4 min-h-20 text-sm leading-7 text-[#526176]">{product.description}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#12305a]">اعرف المزيد {product.external ? <ExternalLink className="h-4 w-4" /> : <ArrowUpLeft className="h-4 w-4" />}</span>
                </>;

                return product.external ? (
                  <a key={product.title} href={product.href} target="_blank" rel="noreferrer" className="group bg-[#fffdf9] p-7 transition hover:bg-[#f3eadc]">{content}</a>
                ) : (
                  <Link key={product.title} href={product.href} className="group bg-[#fffdf9] p-7 transition hover:bg-[#f3eadc]">{content}</Link>
                );
              })}
            </div>
          </div>
        </section>

        <section id="الفريق" className="px-5 py-20 sm:px-8 lg:px-12">
          <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.75fr_1.25fr]">
            <div>
              <p className="section-eye">الفريق والهوية العامة</p>
              <h2 className="arabic-display mt-3 text-3xl leading-[1.5] text-[#10213c] sm:text-4xl">ما نعرضه للعالم، وما نبقيه حيث ينتمي.</h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <article className="border-t-2 border-[#a1432a] pt-5">
                <CheckCircle2 className="h-5 w-5 text-[#a1432a]" />
                <h3 className="mt-4 text-lg font-extrabold text-[#10213c]">وضوح المنتج</h3>
                <p className="mt-2 text-sm leading-7 text-[#5d687b]">الموقع العام يقدّم الروابط وحالة الإتاحة وحدود كل مسار، ولا يتحول إلى لوحة تشغيل أو حساب موحّد.</p>
              </article>
              <article className="border-t-2 border-[#a1432a] pt-5">
                <CheckCircle2 className="h-5 w-5 text-[#a1432a]" />
                <h3 className="mt-4 text-lg font-extrabold text-[#10213c]">هوية عربية أصلية</h3>
                <p className="mt-2 text-sm leading-7 text-[#5d687b]">الكتابة والتدفق والمحتوى مصممة بالعربية وRTL منذ البداية، مع إتاحة تركيز واضحة واستجابة مريحة على المحمول.</p>
              </article>
              <article className="border-t-2 border-[#a1432a] pt-5">
                <CheckCircle2 className="h-5 w-5 text-[#a1432a]" />
                <h3 className="mt-4 text-lg font-extrabold text-[#10213c]">تجارة منضبطة</h3>
                <p className="mt-2 text-sm leading-7 text-[#5d687b]">Shopify هو مصدر الحقيقة للمنتج والمخزون والطلب والدفع؛ الواجهة لا تخزن بطاقات ولا تُنشئ طلبات موازية.</p>
              </article>
              <article className="border-t-2 border-[#a1432a] pt-5">
                <CheckCircle2 className="h-5 w-5 text-[#a1432a]" />
                <h3 className="mt-4 text-lg font-extrabold text-[#10213c]">جاهزية للتطبيقات</h3>
                <p className="mt-2 text-sm leading-7 text-[#5d687b]">العقود العامة المطبّعة تتيح لتطبيقات الجوال المستقبلية استهلاك بيانات منشورة فقط، بعد تثبيت تدفقات الويب.</p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <footer className="bg-[#10213c] px-5 py-9 text-[#dbe6f7] sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 text-sm md:flex-row md:items-center">
          <p className="arabic-display text-lg text-white">SENSE <span className="text-sm text-[#d8b98b]">/ محفظة مستقلة</span></p>
          <p>الموقع العام يعرض ما هو منشور ومعتمد فقط. <Link href="/الخصوصية" className="font-bold text-[#d8b98b] underline underline-offset-4">الخصوصية والاحتفاظ</Link> وحقوق الوصول تبقى داخل كل تطبيق مستقل.</p>
        </div>
      </footer>
    </div>
  );
}
