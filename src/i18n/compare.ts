// English source strings for the comparison page (src/components/Compare.astro).
// Grouped by the page's actual section structure. Copied verbatim from the
// pre-i18n src/pages/compare.astro — do not reword when adding `th`.
export const en = {
  meta: {
    title: 'Plume vs Mailchimp vs ConvertKit — newsletter cost compared',
    description:
      "See how Plume's self-hosted, send-through-your-own-email-provider model compares to Mailchimp and ConvertKit on price, data ownership, and features as your list grows.",
    ogDescription:
      'The same emails, without the per-subscriber bill. A cost + feature comparison of Plume against hosted newsletter SaaS.',
    twitterDescription: 'The same emails, without the per-subscriber bill.',
  },
  nav: {
    brand: 'Plume',
    breadcrumb: '/ Compare',
    themeToggleAria: 'Toggle theme',
    getStarted: 'Get started',
    toggleToEn: 'EN',
    toggleToTh: 'ไทย',
  },
  hero: {
    eyebrow: 'Plume vs hosted SaaS',
    heading: 'The same emails, without the per-subscriber bill.',
    body: "Mailchimp and ConvertKit charge by how many people are on your list. Plume charges nothing for the software and passes through Amazon SES at cost. Here's what that means as you grow.",
  },
  calculator: {
    heading: 'Monthly cost at your list size',
    body: 'Assuming 4 sends/month. Drag to your audience.',
    listSuffix: 'subs',
    sliderAria: 'List size',
    youBadge: 'YOU',
    plumeLabel: 'Plume + SES',
    plumeValue: '$10.00',
    plumeUnit: 'per month, all-in sending',
    mailchimpLabel: 'Mailchimp',
    mailchimpValue: '$230',
    morePrefix: '',
    moreSuffix: ' more',
    convertkitLabel: 'ConvertKit',
    convertkitValue: '$219',
    footnote1:
      'Estimates from published Standard-tier pricing; SES at $0.10/1,000 emails. Add a small server (~$5–10/mo) to self-host Plume.',
    footnote2: 'Calculated with Amazon SES pricing — Plume works with any SMTP provider.',
  },
  matrix: {
    heading: 'Feature by feature',
    body: 'Where an open, self-hosted model wins — and the honest trade-offs.',
    colPlume: 'Plume',
    colMailchimp: 'Mailchimp',
    colConvertKit: 'ConvertKit',
    rows: [
      { label: 'Pricing model', plume: 'AWS cost', mc: 'Per subscriber', ck: 'Per subscriber' },
      { label: 'Self-hosted / own data', plume: '✓', mc: '—', ck: '—' },
      { label: 'Open source', plume: 'AGPL-3.0', mc: '—', ck: '—' },
      { label: 'Drag-and-drop builder', plume: '✓', mc: '✓', ck: 'Basic' },
      { label: 'Automations', plume: '✓', mc: '✓', ck: '✓' },
      { label: 'A/B testing', plume: '✓', mc: 'Paid tiers', ck: 'Paid tiers' },
      { label: 'Hooks / extensibility', plume: 'First-class', mc: 'API only', ck: 'API only' },
      {
        label: 'Email providers',
        plume: 'SES, Mailgun, SendGrid, Postmark, Resend, any SMTP',
        mc: 'Built-in sender only',
        ck: 'Built-in sender only',
      },
      { label: 'Vendor lock-in', plume: 'None', mc: 'High', ck: 'High' },
    ],
  },
  tradeoffs: {
    winHeading: 'Where Plume wins',
    winItems: [
      'Cost stays flat as your list grows',
      'You own the data and the sending reputation',
      'Open source, extensible via hooks, no lock-in',
    ],
    honestHeading: 'Honest trade-offs',
    honestItems: [
      'You run a server and configure an email provider',
      'You warm up your own sending domain',
      'No phone support — community + docs',
    ],
  },
  cta: {
    heading: 'Stop paying for subscribers you already own.',
    body: 'Self-host Plume in minutes. Free and open source under AGPL-3.0.',
    ctaPrimary: 'Get started',
    ctaSecondary: 'View on GitHub',
  },
};

export type CompareStrings = typeof en;

// Thai marketing copy. Natural, factual comparison-table register — not a
// literal translation. Competitor names (Mailchimp, ConvertKit), product terms
// (Plume, Amazon SES, AGPL-3.0, hook, warm up), ✓/✗/— symbols, and prices stay
// verbatim. Shape is enforced against CompareStrings by TS.
export const th: CompareStrings = {
  meta: {
    title: 'Plume เทียบกับ Mailchimp และ ConvertKit — เปรียบเทียบต้นทุนจดหมายข่าว',
    description:
      'ดูว่าโมเดลของ Plume ที่โฮสต์เองและส่งผ่านผู้ให้บริการอีเมลของคุณเองเทียบกับ Mailchimp และ ConvertKit อย่างไรบ้าง ทั้งในแง่ราคา ความเป็นเจ้าของข้อมูล และฟีเจอร์ เมื่อรายชื่อของคุณเติบโตขึ้น',
    ogDescription:
      'อีเมลแบบเดียวกัน แต่ไม่มีบิลคิดตามจำนวนผู้รับ เปรียบเทียบต้นทุนและฟีเจอร์ของ Plume กับจดหมายข่าว SaaS แบบโฮสต์ให้',
    twitterDescription: 'อีเมลแบบเดียวกัน แต่ไม่มีบิลคิดตามจำนวนผู้รับ',
  },
  nav: {
    brand: 'Plume',
    breadcrumb: '/ เปรียบเทียบ',
    themeToggleAria: 'สลับธีมสี',
    getStarted: 'เริ่มใช้งาน',
    toggleToEn: 'EN',
    toggleToTh: 'ไทย',
  },
  hero: {
    eyebrow: 'Plume เทียบกับ SaaS แบบโฮสต์ให้',
    heading: 'อีเมลแบบเดียวกัน แต่ไม่มีบิลคิดตามจำนวนผู้รับ',
    body: 'Mailchimp และ ConvertKit คิดเงินตามจำนวนคนในรายชื่อของคุณ ส่วน Plume ไม่คิดค่าซอฟต์แวร์เลย และส่งผ่าน Amazon SES ในราคาต้นทุน นี่คือความหมายของมันเมื่อรายชื่อของคุณโตขึ้น',
  },
  calculator: {
    heading: 'ต้นทุนต่อเดือนตามขนาดรายชื่อของคุณ',
    body: 'คิดที่ส่งเดือนละ 4 ครั้ง ลากแถบไปยังขนาดผู้ติดตามของคุณ',
    listSuffix: 'ผู้ติดตาม',
    sliderAria: 'ขนาดรายชื่อ',
    youBadge: 'คุณ',
    plumeLabel: 'Plume + SES',
    plumeValue: '$10.00',
    plumeUnit: 'ต่อเดือน รวมค่าส่งทั้งหมด',
    mailchimpLabel: 'Mailchimp',
    mailchimpValue: '$230',
    morePrefix: 'แพงกว่า ',
    moreSuffix: '',
    convertkitLabel: 'ConvertKit',
    convertkitValue: '$219',
    footnote1:
      'เป็นเพียงการประมาณจากราคาระดับ Standard ที่เผยแพร่ไว้ ส่วน SES คิดที่ $0.10 ต่ออีเมล 1,000 ฉบับ บวกค่าเซิร์ฟเวอร์เล็ก ๆ (~$5–10/เดือน) สำหรับโฮสต์ Plume เอง',
    footnote2: 'คำนวณด้วยราคา Amazon SES — Plume ใช้ได้กับผู้ให้บริการ SMTP ทุกเจ้า',
  },
  matrix: {
    heading: 'เทียบทีละฟีเจอร์',
    body: 'จุดที่โมเดลแบบเปิดและโฮสต์เองได้เปรียบ — พร้อมข้อแลกเปลี่ยนที่ตรงไปตรงมา',
    colPlume: 'Plume',
    colMailchimp: 'Mailchimp',
    colConvertKit: 'ConvertKit',
    rows: [
      { label: 'รูปแบบราคา', plume: 'ต้นทุน AWS', mc: 'คิดตามผู้ติดตาม', ck: 'คิดตามผู้ติดตาม' },
      { label: 'โฮสต์เอง / เป็นเจ้าของข้อมูล', plume: '✓', mc: '—', ck: '—' },
      { label: 'โอเพนซอร์ส', plume: 'AGPL-3.0', mc: '—', ck: '—' },
      { label: 'เครื่องมือสร้างแบบลากวาง', plume: '✓', mc: '✓', ck: 'พื้นฐาน' },
      { label: 'ระบบอัตโนมัติ', plume: '✓', mc: '✓', ck: '✓' },
      { label: 'การทดสอบ A/B', plume: '✓', mc: 'แพ็กเกจเสียเงิน', ck: 'แพ็กเกจเสียเงิน' },
      { label: 'Hook / การต่อยอด', plume: 'รองรับเต็มรูปแบบ', mc: 'ผ่าน API เท่านั้น', ck: 'ผ่าน API เท่านั้น' },
      {
        label: 'ผู้ให้บริการอีเมล',
        plume: 'SES, Mailgun, SendGrid, Postmark, Resend หรือ SMTP ใดก็ได้',
        mc: 'ใช้ตัวส่งในตัวเท่านั้น',
        ck: 'ใช้ตัวส่งในตัวเท่านั้น',
      },
      { label: 'การผูกติดกับผู้ให้บริการ', plume: 'ไม่มี', mc: 'สูง', ck: 'สูง' },
    ],
  },
  tradeoffs: {
    winHeading: 'จุดที่ Plume ได้เปรียบ',
    winItems: [
      'ต้นทุนคงที่แม้รายชื่อจะโตขึ้น',
      'คุณเป็นเจ้าของข้อมูลและชื่อเสียงการส่งเอง',
      'โอเพนซอร์ส ต่อยอดได้ด้วย hook ไม่ผูกติดกับใคร',
    ],
    honestHeading: 'ข้อแลกเปลี่ยนที่ตรงไปตรงมา',
    honestItems: [
      'คุณต้องรันเซิร์ฟเวอร์เองและตั้งค่าผู้ให้บริการอีเมล',
      'คุณต้อง warm up โดเมนสำหรับส่งของคุณเอง',
      'ไม่มีซัพพอร์ตทางโทรศัพท์ — มีแต่ชุมชนและเอกสาร',
    ],
  },
  cta: {
    heading: 'เลิกจ่ายเงินเพื่อผู้ติดตามที่คุณเป็นเจ้าของอยู่แล้ว',
    body: 'โฮสต์ Plume เองได้ในไม่กี่นาที ฟรีและโอเพนซอร์สภายใต้ AGPL-3.0',
    ctaPrimary: 'เริ่มใช้งาน',
    ctaSecondary: 'ดูบน GitHub',
  },
};
