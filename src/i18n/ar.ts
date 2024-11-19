const titles = {
  templatesTitle: 'القوالب',
  newTemplateMessage: 'رسالة قالب جديد',
  save: 'حفظ',
  templateDetails: 'تفاصيل القالب',
  templateDescription: 'حدد اسم القالب واللغة',
  templateName: 'اسم القالب',
  language: 'اللغة',
  category: 'الفئة',
  categoryDescription: 'اختر قالب رسالتك',
  header: 'الترويسة',
  headerDescription: 'قم بتسليط الضوء على علامتك التجارية هنا باستخدام الصور أو الفيديوهات للتميز',
  text: 'النص',
  body: 'المحتوى',
  bodyDescription: 'أدخل نص رسالتك باللغة التي اخترتها',
  footer: 'التذييل',
  footerDescription: 'استخدم هذا القسم لتفاصيل اختيارية مثل الشروط، معلومات الاتصال، أو سياق إضافي.',
  buttons: 'الأزرار',
  buttonsDescription: 'أنشئ أزرارًا تمكن عملاءك من الرد على رسالتك أو اتخاذ إجراء.',
  buttonType: 'نوع الزر',
  buttonText: 'نص الزر',
  websiteUrl: 'رابط الموقع',
  phoneNumber: 'رقم الهاتف',
  en: 'الإنجليزية (الولايات المتحدة)',
  ar: 'العربية (الأردن)',
  marketing: 'التسويق',
  marketingDescription: 'الترويج، الإعلانات، الحملات.',
  utility: 'الأدوات',
  utilityDescription: 'الأدوات، الخدمات، المرافق.',
  none: 'لا شيء',
  callToActions: 'إجراءات التحفيز',
  url: 'زيارة الموقع',
  call: 'رقم الهاتف',
  image: 'الصورة',
  allowedTypes: 'الأنواع المسموح بها',
  dragDrop: 'قم بسحب وإفلات الصورة هنا ',
  selectFile: 'اختر ملفًا',
  addNewButton: 'اضف زر جديد'
}

const placeholders = {
  templateNamePlaceholder: 'أدخل اسم القالب...',
  languagePlaceholder: 'اختر اللغة',
  headerTextPlaceholder: 'أدخل نص الترويسة...',
  footerTextPlaceholder: 'أدخل نص التذييل...',
  buttonTypePlaceholder: 'اختر نوع الزر',
  buttonTextPlaceholder: 'أدخل نص الزر...',
  websiteUrlPlaceholder: 'https://arabot.io',
  phoneNumberPlaceholder: '7XXX XXXX'
}

const errors = {
  requiredField: 'هذا الحقل مطلوب',
  fileSize: 'حجم الملف يتجاوز {key} كيلوبايت.',
  onlyImage: 'يُسمح فقط بملفات الصور.'
}

export const ar = { ...titles, ...placeholders, ...errors }
