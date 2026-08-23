export type ProviderIntakeStage = {
  id: string;
  title: string;
  question: string;
  classification: "خاص" | "عام بعد الموافقة" | "ادعاء يحتاج دليلًا" | "تشخيص خاص";
  detail: string;
};

export const providerIntakeStages: ProviderIntakeStage[] = [
  { id: "consent", title: "الموافقات والهوية", question: "هل توافق على المراجعة؟ وما اسم علامتك ومن هو مسؤول التواصل؟", classification: "خاص", detail: "الموافقة منفصلة عن موافقة النشر، وبيانات الاتصال لا تدخل الملف العام." },
  { id: "service", title: "الخدمة وتجربة الضيف", question: "ماذا تقدم؟ وكيف تبدأ التجربة؟ وهل تتطلب حجزًا؟ وما اللغات المتاحة؟", classification: "عام بعد الموافقة", detail: "ينشئ المزوّد مسودة، ثم يوافق على ملخص عام مستقل بعد المراجعة." },
  { id: "place", title: "المكان والوصول", question: "ما المنطقة العامة؟ وما المعلومات العملية التي يحتاجها زائر لديه احتياجات وصول أو سلامة؟", classification: "ادعاء يحتاج دليلًا", detail: "لا يظهر موقع دقيق أو وصف وصول أو سلامة دون موافقة ودليل ومراجعة." },
  { id: "evidence", title: "الأدلة والمواد", question: "ما الملفات أو الصور التي تملك حق استخدامها؟ وهل تدعم ادعاء استدامة أو عضوية أو شهادة؟", classification: "ادعاء يحتاج دليلًا", detail: "كل ادعاء ينتقل من «أفاد به المزوّد» إلى «تم التحقق» ولا ينشر قبل ذلك." },
  { id: "growth", title: "النمو والتمكين", question: "ما الأولوية أو العائق أو المهارة التي تحتاج إلى دعم فيها؟", classification: "تشخيص خاص", detail: "يوجه خطة تحسين أو تعلم للمزوّد والمراجع، ولا يتحول إلى رتبة أو تسويق عام." },
];

export type PublicationGate = {
  reviewConsent: boolean;
  publicListingConsent: boolean;
  reviewerApproved: boolean;
  allPublicClaimsVerified: boolean;
};

export function canPublishProviderProfile(gate: PublicationGate) {
  return gate.reviewConsent && gate.publicListingConsent && gate.reviewerApproved && gate.allPublicClaimsVerified;
}
