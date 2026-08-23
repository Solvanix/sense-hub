export type SurveyTreatment = "خاص جدًا" | "عام بعد الموافقة" | "ادعاء يحتاج دليلًا" | "تشخيص خاص" | "لا يجمع افتراضيًا";

export type RuralSurveyTraceEntry = {
  source: string;
  sourceQuestion: string;
  senseFieldOrDecision: string;
  treatment: SurveyTreatment;
  publicRule: string;
};

/**
 * Faithful trace from the analysed rural-tourism survey into SENSE Experience.
 * It records product decisions; it does not reproduce the source form.
 */
export const ruralTourismSurveyTrace: RuralSurveyTraceEntry[] = [
  { source: "الموافقة", sourceQuestion: "الموافقة الصريحة على معالجة الإجابات", senseFieldOrDecision: "data_processing_consent مع نسخة السياسة والتاريخ", treatment: "خاص جدًا", publicRule: "لا يحفظ طلب جديد بلا موافقة؛ ولا يعاد استخدام موافقة المصدر لصالح SENSE." },
  { source: "الهوية والاتصال", sourceQuestion: "اسم الشركة، الاسم الكامل، الهاتف، البريد", senseFieldOrDecision: "brand_name وcontact.name وcontact.phone وcontact.email", treatment: "خاص جدًا", publicRule: "اسم العلامة فقط قد يصبح عامًا بعد قرار نشر مستقل؛ الاتصال لا ينشر." },
  { source: "س1 القطاع", sourceQuestion: "القطاع الفرعي: ريفي أو ديني أو زراعي أو طبيعة أو ثقافي وغيرها", senseFieldOrDecision: "tourism_subsector[] مع other_label محدود", treatment: "عام بعد الموافقة", publicRule: "لا يعلن التصنيف قبل مراجعة مطابقته لوصف الخدمة." },
  { source: "س2 الخدمات", sourceQuestion: "الخدمات المقدمة: إقامة وطعام ونقل وجولات وأنشطة وورش وتجزئة وصحة وفعاليات وتعليم", senseFieldOrDecision: "service_categories[]", treatment: "عام بعد الموافقة", publicRule: "تظهر الخدمات التي يوافق المزوّد على نشرها فقط." },
  { source: "س3 الوصف", sourceQuestion: "وصف النشاط والخدمات", senseFieldOrDecision: "service_description_private ثم public_service_story مستقل", treatment: "عام بعد الموافقة", publicRule: "لا ينسخ النص التشخيصي تلقائيًا إلى وصف الزائر." },
  { source: "س4.1 المنطقة", sourceQuestion: "البلدية", senseFieldOrDecision: "municipality_id أو municipality_label مضبوط", treatment: "عام بعد الموافقة", publicRule: "تعرض منطقة عامة، لا عنوانًا أو إحداثيات دقيقة." },
  { source: "س4.2 التراث الثقافي", sourceQuestion: "هل يقع العمل في موقع ذي تراث ثقافي؟ والتفصيل", senseFieldOrDecision: "cultural_heritage_context وcultural_heritage_note_private", treatment: "ادعاء يحتاج دليلًا", publicRule: "لا تظهر صفة تراثية ولا تفاصيل موقع حساس دون دليل وموافقة." },
  { source: "س4.3 التراث الطبيعي", sourceQuestion: "هل يقع العمل في موقع ذي تراث طبيعي؟ والتفصيل", senseFieldOrDecision: "natural_heritage_context وnatural_heritage_note_private", treatment: "ادعاء يحتاج دليلًا", publicRule: "لا تتحول الإجابة إلى شارة محمية أو وجهة معتمدة بلا تحقق." },
  { source: "س4.4–4.5 خصائص المكان", sourceQuestion: "المميزات التمييزية وقيود الوصول", senseFieldOrDecision: "location_distinctive_note_private وaccess_constraints_private[]", treatment: "تشخيص خاص", publicRule: "تستخرج لاحقًا حقائق وصول مفيدة ومتحققة؛ لا تنشر العوائق أو الوصف الحساس تلقائيًا." },
  { source: "س5–7 حجم وأداء", sourceQuestion: "العاملون والمبيعات والعملاء ونسبة العملاء الأجانب", senseFieldOrDecision: "workforce_band وinternational_customer_share_band عند الحاجة", treatment: "تشخيص خاص", publicRule: "المبيعات وعدد العملاء لا يجمعان افتراضيًا؛ ولا يتحول أي مقياس إلى ترتيب علني." },
  { source: "س6 التأسيس", sourceQuestion: "سنة التأسيس", senseFieldOrDecision: "founded_year دون اليوم والشهر", treatment: "عام بعد الموافقة", publicRule: "يمكن عرض «منذ سنة…» بموافقة؛ ليس ضمانًا للموثوقية." },
  { source: "س8–9 النمو والعوائق", sourceQuestion: "أولويات السنوات الثلاث والعقبات", senseFieldOrDecision: "growth_priorities[] وbusiness_barriers[]", treatment: "تشخيص خاص", publicRule: "يوجه خطة دعم بشرية ولا يظهر للزائر أو يستخدم للرفض الآلي." },
  { source: "س10 الموسمية", sourceQuestion: "افتتاح سنوي أو موسمي", senseFieldOrDecision: "operating_seasonality", treatment: "عام بعد الموافقة", publicRule: "قد يظهر كتوافر يحدّثه المزوّد، وليس تقويم حجز حي." },
  { source: "س11 الجودة", sourceQuestion: "نظام إدارة الجودة ومتابعة رضا العملاء", senseFieldOrDecision: "quality_management_status وfeedback_practice_status", treatment: "تشخيص خاص", publicRule: "لا تنشئ الإجابة الذاتية شهادة أو تقييمًا أو مراجعات للعملاء." },
  { source: "س12 الاستدامة", sourceQuestion: "الممارسات البيئية وشهادة نظام الاستدامة", senseFieldOrDecision: "sustainability_practices[] وsustainability_certificate_claim", treatment: "ادعاء يحتاج دليلًا", publicRule: "لا تظهر الاستدامة أو الشهادة قبل دليل وحالة verified." },
  { source: "س13 الابتكار", sourceQuestion: "تطوير تجارب أو منتجات أو خدمات جديدة", senseFieldOrDecision: "innovation_status وinnovation_note_private", treatment: "تشخيص خاص", publicRule: "لا تصبح شارة ابتكار أو نصًا تسويقيًا تلقائيًا." },
  { source: "س14 الموقع الإلكتروني", sourceQuestion: "وجود موقع رسمي ونطاقه", senseFieldOrDecision: "website_status وwebsite_url", treatment: "عام بعد الموافقة", publicRule: "يفحص الرابط تقنيًا وبشريًا ولا يعرض دون إذن المزوّد." },
  { source: "س15 التواصل الاجتماعي", sourceQuestion: "استخدام المنصات وعدد المتابعين", senseFieldOrDecision: "social_links[] عند اختيار العرض", treatment: "تشخيص خاص", publicRule: "يمكن عرض روابط يصرح بها المزوّد؛ أعداد المتابعين لا تدخل الملف العام." },
  { source: "س16 الحجز", sourceQuestion: "إمكانية الحجز عبر الإنترنت", senseFieldOrDecision: "online_booking_status وbooking_url", treatment: "عام بعد الموافقة", publicRule: "يعرض رابط استعلام أو حجز متحقق؛ ولا يدل على توافر لحظي." },
  { source: "س17–20 التسويق والشبكات", sourceQuestion: "التسويق الرقمي والبوابات والفعاليات والتعاون المحلي", senseFieldOrDecision: "digital_marketing_status وportal_links[] وtrade_events_private[] وlocal_collaboration_status", treatment: "تشخيص خاص", publicRule: "تعرض روابط البوابات التي يوافق عليها المزوّد؛ لا تعرض علاقات أو أداء أو أسماء شركاء بلا إذن." },
  { source: "س21 العضوية", sourceQuestion: "العضوية في جمعيات الأعمال", senseFieldOrDecision: "membership_claims[]", treatment: "ادعاء يحتاج دليلًا", publicRule: "لا تظهر العضوية إلا بإذن ودليل معقول وحالة تحقق." },
  { source: "س22 ترويج الوجهة", sourceQuestion: "المشاركة في فعاليات تواصل أو ترويج وجهة", senseFieldOrDecision: "destination_promotion_participation_status وnetworking_events_private[]", treatment: "تشخيص خاص", publicRule: "يوجه فرص تشبيك خاصة، ولا يمنح رتبة أو أفضلية علنية." },
  { source: "حقول غير مثبتة", sourceQuestion: "السعر والسعة والعنوان والإحداثيات والتراخيص والتأمين وسياسة الإلغاء واللغات التفصيلية وحقوق الصور", senseFieldOrDecision: "عقود مستقلة مستقبلية فقط", treatment: "لا يجمع افتراضيًا", publicRule: "لا يخمّن النظام هذه الحقول ولا يعرضها قبل تعريف غرض وموافقة ودليل مناسب." },
];

export const prohibitedPublicProviderFields = [
  "contact.phone",
  "contact.email",
  "sales",
  "customer_count",
  "business_barriers",
  "reviewer_notes",
  "private_files",
  "precise_coordinates",
] as const;
