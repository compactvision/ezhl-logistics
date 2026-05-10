export const translations = {
  fr: {
    nav: {
      services: "Services", secteurs: "Secteurs", processus: "Processus",
      avantages: "Avantages", contact: "Contact", devis: "Devis gratuit",
    },
    hero: {
      badge: "République Démocratique du Congo",
      title1: "Votre facilitateur", title2: "logistique et", title3: "douanier",
      titleAccent: "en RDC",
      subtitle: "Nous mettons en relation les bons acteurs, représentons vos intérêts et facilitons chaque étape — grâce à notre réseau de partenaires qualifiés.",
      cta1: "Demander un devis", cta2: "Découvrir nos services",
      stat1Label: "Domaines d'expertise", stat2Label: "Disponibilité", stat3Label: "Provinces couvertes",
    },
    services: {
      label: "Nos domaines d'intervention", title: "Services d'intermédiation logistique", learnMore: "En savoir plus",
      items: [
        { number: "01", title: "Fretteur intermédiaire", description: "Sélection et négociation des meilleurs transporteurs aériens, maritimes et terrestres — conditions optimisées, transparence totale, sans surcoût d'intermédiaire." },
        { number: "02", title: "Représentation & assistance en handling", description: "Représentation complète auprès des compagnies aériennes, aéroports, terminaux et prestataires handling. Coordination, suivi en temps réel, gestion des imprévus." },
        { number: "03", title: "Opérations douanières générales", description: "Préparation et suivi des déclarations douanières, accompagnement import/export, gestion des contrôles, inspections, litiges et coordination assurances transport." },
        { number: "04", title: "Coordination assurances", description: "Gestion complète des procédures spécifiques RDC, coordination des assurances transport et accompagnement dans toutes les démarches administratives." },
      ],
    },
    sectors: {
      label: "Secteurs spécialisés", title: "Expertise sectorielle approfondie",
      broker: {
        badge: "Freight Broker Agréé",
        title: "Votre courtier freight",
        titleAccent: "au cœur de la RDC",
        description: "En tant que broker spécialisé, EZHL n'est pas transporteur. Nous sommes l'intelligence qui connecte, négocie et coordonne — pour que vos marchandises arrivent à destination dans les meilleures conditions possibles.",
        tags: ["Fret Aérien", "Fret Maritime", "Fret Terrestre", "Handling", "Douane"],
        pillars: [
          { title: "Réseau exclusif", desc: "Accès direct à un réseau de transporteurs, terminaux et prestataires certifiés en RDC." },
          { title: "Négociation experte", desc: "Nous négocions les meilleures conditions tarifaires et contractuelles en votre nom." },
          { title: "Conformité garantie", desc: "Chaque partenaire est sélectionné selon des critères stricts de fiabilité et de conformité." },
          { title: "Portée régionale", desc: "Opérations coordonnées depuis Kinshasa, Lubumbashi jusqu'aux corridors transfrontaliers." },
        ]
      },
      oil: { title: "Logistique pétrolière — Haut-Katanga & Lualaba", subtitle: "Pétrole & Mines", capabilities: ["Coordination du transport de produits pétroliers par citernes", "Mise en relation avec transporteurs agréés et conformes", "Suivi douanier et administratif des flux carburant", "Représentation auprès des autorités et terminaux"] },
      agri: { title: "Distribution des produits agricoles — Kinshasa", subtitle: "Agriculture", capabilities: ["Facilitation collecte, transport et distribution des produits frais", "Mise en relation avec transporteurs frigorifiques adaptés", "Coordination logistique urbaine et itinéraires optimisés", "Assistance douanière pour flux interprovinciaux ou importés"] },
    },
    gallery: {
      label: "Notre travail sur le terrain",
      title: "Galerie EZHL",
      description: "Aperçu de nos opérations sur le terrain à travers la RDC.",
      comingSoon: "Photos terrain à venir — mise à jour en cours",
      items: [
        { caption: "Opérations de handling aéroportuaire", tag: "Handling" },
        { caption: "Fret maritime — coordination en port", tag: "Fret" },
        { caption: "Gestion documentaire douanière", tag: "Douane" },
        { caption: "Logistique terrestre — convoi RDC", tag: "Transport" },
        { caption: "Représentation & suivi terrain", tag: "Terrain" },
        { caption: "Distribution agricole — Kinshasa", tag: "Agriculture" },
      ]
    },
    howItWorks: {
      label: "Comment ça marche", title: "4 étapes vers la simplicité", stepLabel: "Étape",
      steps: [
        { number: "01", title: "Sélection", description: "Nous identifions et sélectionnons les meilleurs partenaires transporteurs, handling ou douaniers adaptés à votre besoin spécifique." },
        { number: "02", title: "Représentation", description: "Nous vous représentons auprès de toutes les parties prenantes : compagnies, autorités, terminaux. Un seul interlocuteur pour vous." },
        { number: "03", title: "Douane & Admin", description: "Préparation complète des documents douaniers, suivi des contrôles et inspections, coordination des assurances transport." },
        { number: "04", title: "Livraison finale", description: "Suivi en temps réel jusqu'à la livraison. Gestion des imprévus et rapport complet de chaque opération." },
      ],
    },
    why: {
      label: "Nos avantages", title: "Pourquoi choisir Easy Handling ?",
      tagline: "La logistique compliquée devient…", taglineAccent: "easy.",
      items: [
        { title: "Facilité absolue", description: "Un seul interlocuteur dédié pour tous vos flux logistiques." },
        { title: "Transparence totale", description: "Nous facturons uniquement notre rôle d'intermédiation. Aucun coût caché." },
        { title: "Spécialisation RDC", description: "Expertise terrain sur Kinshasa, Haut-Katanga, Lualaba et corridors miniers/agricoles." },
        { title: "Réseau de partenaires qualifiés", description: "Accès à un réseau étendu de transporteurs, terminaux et prestataires agréés en RDC et dans la région." },
        { title: "Réactivité 24/7", description: "Réseau de partenaires fiables en RDC et dans toute la région." },
      ],
    },
    contact: {
      label: "Contactez-nous", title: "Devis personnalisé ou prise en charge immédiate",
      name: "Nom complet *", namePlaceholder: "Votre nom",
      email: "Email *", emailPlaceholder: "votre@email.com",
      phone: "Téléphone", phonePlaceholder: "+243 ...",
      type: "Type de flux *", typePlaceholder: "Sélectionner...",
      message: "Décrivez votre besoin *", messagePlaceholder: "Je souhaite déplacer... de... vers...",
      send: "Envoyer la demande", directContact: "Contact direct",
      types: [
        { value: "petroleum", label: "Produits pétroliers" }, { value: "agriculture", label: "Produits agricoles" },
        { value: "fret", label: "Fret aérien / maritime / terrestre" }, { value: "douane", label: "Opérations douanières" },
        { value: "handling", label: "Handling aéroportuaire" }, { value: "autre", label: "Autre" },
      ],
      errorRequired: "Veuillez remplir tous les champs obligatoires.", successMsg: "Votre demande a été envoyée avec succès !",
    },
    footer: {
      description: "Votre facilitateur logistique et douanier en RDC et au-delà — fret, handling, opérations douanières et logistique spécialisée.",
      navigation: "Navigation", contact: "Contact", rights: "Tous droits réservés.",
    },
    floating: { call: "Appeler", email: "Email" },
  },

  en: {
    nav: {
      services: "Services", secteurs: "Sectors", processus: "Process",
      avantages: "Advantages", contact: "Contact", devis: "Free Quote",
    },
    hero: {
      badge: "Democratic Republic of Congo",
      title1: "Your logistics &", title2: "customs facilitator", title3: "",
      titleAccent: "in the DRC",
      subtitle: "We connect the right partners, represent your interests, and streamline every step — through our network of qualified and certified partners.",
      cta1: "Request a Quote", cta2: "Discover Our Services",
      stat1Label: "Areas of Expertise", stat2Label: "Availability", stat3Label: "Provinces Covered",
    },
    services: {
      label: "Our Areas of Intervention", title: "Logistics Intermediation Services", learnMore: "Learn more",
      items: [
        { number: "01", title: "Freight Intermediary", description: "Selection and negotiation of the best air, sea, and road carriers — optimized conditions, full transparency, no hidden brokerage fees." },
        { number: "02", title: "Handling Representation & Assistance", description: "Full representation with airlines, airports, terminals, and handling providers. Real-time coordination, tracking, and incident management." },
        { number: "03", title: "General Customs Operations", description: "Preparation and monitoring of customs declarations, import/export support, management of inspections, disputes, and transport insurance coordination." },
        { number: "04", title: "Insurance Coordination", description: "Full management of DRC-specific procedures, transport insurance coordination, and support for all administrative formalities." },
      ],
    },
    sectors: {
      label: "Specialized Sectors", title: "In-Depth Sector Expertise",
      broker: {
        badge: "Certified Freight Broker",
        title: "Your freight broker",
        titleAccent: "at the heart of the DRC",
        description: "As a specialized broker, EZHL is not a carrier. We are the intelligence that connects, negotiates, and coordinates — so your goods reach their destination under the best possible conditions.",
        tags: ["Air Freight", "Sea Freight", "Land Freight", "Handling", "Customs"],
        pillars: [
          { title: "Exclusive Network", desc: "Direct access to a network of certified carriers, terminals, and providers in the DRC." },
          { title: "Expert Negotiation", desc: "We negotiate the best rate and contract conditions on your behalf." },
          { title: "Guaranteed Compliance", desc: "Each partner is selected according to strict reliability and compliance criteria." },
          { title: "Regional Reach", desc: "Coordinated operations from Kinshasa, Lubumbashi to cross-border corridors." },
        ]
      },
      oil: { title: "Petroleum Logistics — Haut-Katanga & Lualaba", subtitle: "Oil & Mining", capabilities: ["Coordination of petroleum product transport by tankers", "Connecting with licensed and compliant carriers", "Customs and administrative monitoring of fuel flows", "Representation with authorities and terminals"] },
      agri: { title: "Agricultural Product Distribution — Kinshasa", subtitle: "Agriculture", capabilities: ["Facilitation of collection, transport, and distribution of fresh products", "Connecting with suitable refrigerated carriers", "Urban logistics coordination and optimized routing", "Customs assistance for inter-provincial or imported flows"] },
    },
    gallery: {
      label: "Our work in the field",
      title: "EZHL Gallery",
      description: "Overview of our field operations across the DRC.",
      comingSoon: "Field photos coming soon — update in progress",
      items: [
        { caption: "Airport handling operations", tag: "Handling" },
        { caption: "Sea freight — port coordination", tag: "Freight" },
        { caption: "Customs document management", tag: "Customs" },
        { caption: "Land logistics — DRC convoy", tag: "Transport" },
        { caption: "Field representation & monitoring", tag: "Field" },
        { caption: "Agricultural distribution — Kinshasa", tag: "Agriculture" },
      ]
    },
    howItWorks: {
      label: "How It Works", title: "4 Steps to Simplicity", stepLabel: "Step",
      steps: [
        { number: "01", title: "Selection", description: "We identify and select the best transport, handling, or customs partners tailored to your specific need." },
        { number: "02", title: "Representation", description: "We represent you with all stakeholders: airlines, authorities, terminals. One single point of contact for you." },
        { number: "03", title: "Customs & Admin", description: "Complete preparation of customs documents, monitoring of inspections and controls, transport insurance coordination." },
        { number: "04", title: "Final Delivery", description: "Real-time tracking until delivery. Incident management and a full report for every operation." },
      ],
    },
    why: {
      label: "Our Advantages", title: "Why Choose Easy Handling?",
      tagline: "Complex logistics becomes…", taglineAccent: "easy.",
      items: [
        { title: "Absolute Simplicity", description: "One dedicated contact for all your logistics flows." },
        { title: "Full Transparency", description: "We only bill for our intermediation role. No hidden costs." },
        { title: "DRC Specialization", description: "Field expertise in Kinshasa, Haut-Katanga, Lualaba, and mining/agricultural corridors." },
        { title: "Qualified Partner Network", description: "Access to an extensive network of licensed carriers, terminals, and approved providers in the DRC and region." },
        { title: "24/7 Responsiveness", description: "Reliable partner network in the DRC and across the entire region." },
      ],
    },
    contact: {
      label: "Contact Us", title: "Custom Quote or Immediate Assistance",
      name: "Full Name *", namePlaceholder: "Your name",
      email: "Email *", emailPlaceholder: "your@email.com",
      phone: "Phone", phonePlaceholder: "+243 ...",
      type: "Flow Type *", typePlaceholder: "Select...",
      message: "Describe Your Need *", messagePlaceholder: "I need to move... from... to...",
      send: "Send Request", directContact: "Direct Contact",
      types: [
        { value: "petroleum", label: "Petroleum Products" }, { value: "agriculture", label: "Agricultural Products" },
        { value: "fret", label: "Air / Sea / Land Freight" }, { value: "douane", label: "Customs Operations" },
        { value: "handling", label: "Airport Handling" }, { value: "autre", label: "Other" },
      ],
      errorRequired: "Please fill in all required fields.", successMsg: "Your request has been sent successfully!",
    },
    footer: {
      description: "Your logistics and customs facilitator in the DRC and beyond — freight, handling, customs operations, and specialized logistics.",
      navigation: "Navigation", contact: "Contact", rights: "All rights reserved.",
    },
    floating: { call: "Call", email: "Email" },
  },

  ar: {
    nav: {
      services: "الخدمات", secteurs: "القطاعات", processus: "العملية",
      avantages: "المزايا", contact: "اتصل بنا", devis: "طلب عرض سعر",
    },
    hero: {
      badge: "جمهورية الكونغو الديمقراطية",
      title1: "وسيطكم اللوجستي", title2: "والجمركي", title3: "",
      titleAccent: "في الكونغو الديمقراطية",
      subtitle: "نربط الأطراف المناسبة، نمثل مصالحكم، ونيسّر كل مرحلة — من خلال شبكتنا من الشركاء المؤهلين والمعتمدين.",
      cta1: "طلب عرض سعر", cta2: "اكتشف خدماتنا",
      stat1Label: "مجالات الخبرة", stat2Label: "التوفر", stat3Label: "المقاطعات المغطاة",
    },
    services: {
      label: "مجالات تدخلنا", title: "خدمات الوساطة اللوجستية", learnMore: "اعرف المزيد",
      items: [
        { number: "01", title: "وسيط شحن", description: "اختيار والتفاوض مع أفضل الناقلين جواً وبحراً وبراً — شروط محسّنة، شفافية كاملة، بدون رسوم وسيط مخفية." },
        { number: "02", title: "التمثيل والمساعدة في المناولة", description: "تمثيل كامل لدى شركات الطيران والمطارات والمحطات ومزودي خدمات المناولة. تنسيق وتتبع في الوقت الفعلي وإدارة الطوارئ." },
        { number: "03", title: "العمليات الجمركية العامة", description: "إعداد ومتابعة التصاريح الجمركية، دعم الاستيراد/التصدير، إدارة الفحوصات والتفتيش والنزاعات وتنسيق تأمين النقل." },
        { number: "04", title: "تنسيق التأمين", description: "الإدارة الكاملة للإجراءات الخاصة بالكونغو، تنسيق تأمين النقل ودعم جميع الإجراءات الإدارية." },
      ],
    },
    sectors: {
      label: "القطاعات المتخصصة", title: "خبرة قطاعية متعمقة",
      broker: {
        badge: "وسيط شحن معتمد",
        title: "وسيط الشحن الخاص بكم",
        titleAccent: "في قلب الكونغو الديمقراطية",
        description: "بصفتنا وسيطًا متخصصًا ، فإن EZHL ليست ناقلة. نحن الذكاء الذي يربط ويفاوض وينسق - حتى تصل بضائعك إلى وجهتها في أفضل الظروف الممكنة.",
        tags: ["الشحن الجوي", "الشحن البحري", "الشحن البري", "المناولة", "الجمارك"],
        pillars: [
          { title: "شبكة حصرية", desc: "وصول مباشر إلى شبكة من الناقلين والمحطات والمزودين المعتمدين في الكونغو." },
          { title: "تفاوض خبير", desc: "نحن نفاوض على أفضل الأسعار وشروط التعاقد نيابة عنك." },
          { title: "امتثال مضمون", desc: "يتم اختيار كل شريك وفقًا لمعايير صارمة للموثوقية والامتثال." },
          { title: "نطاق إقليمي", desc: "عمليات منسقة من كينشاسا ولوبومباشي إلى الممرات العابرة للحدود." },
        ]
      },
      oil: { title: "الخدمات اللوجستية للبترول — هوت-كاتانغا ولوالابا", subtitle: "النفط والمناجم", capabilities: ["تنسيق نقل المنتجات البترولية بالصهاريج", "التواصل مع الناقلين المرخصين والمتوافقين", "المتابعة الجمركية والإدارية لتدفقات الوقود", "التمثيل أمام السلطات والمحطات"] },
      agri: { title: "توزيع المنتجات الزراعية — كينشاسا", subtitle: "الزراعة", capabilities: ["تيسير جمع المنتجات الطازجة ونقلها وتوزيعها", "التواصل مع الناقلين المبردين المناسبين", "التنسيق اللوجستي الحضري وتحسين المسارات", "المساعدة الجمركية للتدفقات بين المقاطعات أو المستوردة"] },
    },
    gallery: {
      label: "عملنا في الميدان",
      title: "معرض EZHL",
      description: "نظرة عامة على عملياتنا الميدانية في جميع أنحاء الكونغو الديمقراطية.",
      comingSoon: "صور الميدان قريباً — التحديث قيد التنفيذ",
      items: [
        { caption: "عمليات المناولة في المطار", tag: "مناولة" },
        { caption: "الشحن البحري — تنسيق الميناء", tag: "شحن" },
        { caption: "إدارة الوثائق الجمركية", tag: "جمارك" },
        { caption: "الخدمات اللوجستية البرية — قافلة الكونغو", tag: "نقل" },
        { caption: "التمثيل والمتابعة الميدانية", tag: "ميدان" },
        { caption: "التوزيع الزراعي — كينشاسا", tag: "زراعة" },
      ]
    },
    howItWorks: {
      label: "كيف يعمل", title: "٤ خطوات نحو البساطة", stepLabel: "خطوة",
      steps: [
        { number: "01", title: "الاختيار", description: "نحدد ونختار أفضل شركاء النقل أو المناولة أو الجمارك المناسبين لاحتياجاتكم الخاصة." },
        { number: "02", title: "التمثيل", description: "نمثلكم أمام جميع أصحاب المصلحة: شركات الطيران والسلطات والمحطات. نقطة تواصل واحدة لكم." },
        { number: "03", title: "الجمارك والإدارة", description: "إعداد كامل للوثائق الجمركية، متابعة الفحوصات والتفتيش، تنسيق تأمين النقل." },
        { number: "04", title: "التسليم النهائي", description: "تتبع في الوقت الفعلي حتى التسليم. إدارة الطوارئ وتقرير كامل لكل عملية." },
      ],
    },
    why: {
      label: "مزايانا", title: "لماذا تختار Easy Handling؟",
      tagline: "اللوجستيات المعقدة تصبح…", taglineAccent: "سهلة.",
      items: [
        { title: "سهولة مطلقة", description: "جهة اتصال واحدة مخصصة لجميع تدفقاتكم اللوجستية." },
        { title: "شفافية كاملة", description: "نفوتر فقط دورنا كوسيط. لا تكاليف مخفية." },
        { title: "تخصص في الكونغو", description: "خبرة ميدانية في كينشاسا وهوت-كاتانغا ولوالابا وممرات التعدين والزراعة." },
        { title: "شبكة شركاء مؤهلين", description: "الوصول إلى شبكة واسعة من الناقلين والمحطات ومزودي الخدمات المعتمدين في الكونغو والمنطقة." },
        { title: "استجابة على مدار الساعة", description: "شبكة شركاء موثوقين في الكونغو وفي جميع أنحاء المنطقة." },
      ],
    },
    contact: {
      label: "اتصل بنا", title: "عرض سعر مخصص ou تكفل فوري",
      name: "الاسم الكامل *", namePlaceholder: "اسمك",
      email: "البريد الإلكتروني *", emailPlaceholder: "بريدك@example.com",
      phone: "الهاتف", phonePlaceholder: "+243 ...",
      type: "نوع التدفق *", typePlaceholder: "اختر...",
      message: "صف احتياجاتك *", messagePlaceholder: "أريد نقل... من... إلى...",
      send: "إرسال الطلب", directContact: "تواصل مباشر",
      types: [
        { value: "petroleum", label: "المنتجات البترولية" }, { value: "agriculture", label: "المنتجات الزراعية" },
        { value: "fret", label: "شحن جوي / بحري / بري" }, { value: "douane", label: "العمليات الجمركية" },
        { value: "handling", label: "مناولة المطار" }, { value: "autre", label: "أخرى" },
      ],
      errorRequired: "يرجى ملء جميع الحقول المطلوبة.", successMsg: "تم إرسال طلبك بنجاح!",
    },
    footer: {
      description: "وسيطكم اللوجستي والجمركي في الكونغو الديمقراطية وما وراءها — شحن، مناولة، عمليات جمركية ولوجستيات متخصصة.",
      navigation: "التنقل", contact: "اتصل بنا", rights: "جميع الحقوق محفوظة.",
    },
    floating: { call: "اتصل", email: "بريد" },
  },

  zh: {
    nav: {
      services: "服务", secteurs: "行业", processus: "流程",
      avantages: "优势", contact: "联系我们", devis: "免费报价",
    },
    hero: {
      badge: "刚果民主共和国",
      title1: "您在刚果民主", title2: "共和国的物流", title3: "",
      titleAccent: "与海关协调商",
      subtitle: "我们连接合适的合作伙伴，代表您的利益，通过我们合格认证的合作伙伴网络，简化每一个环节。",
      cta1: "申请报价", cta2: "了解我们的服务",
      stat1Label: "专业领域", stat2Label: "服务时间", stat3Label: "覆盖省份",
    },
    services: {
      label: "我们的服务领域", title: "物流中介服务", learnMore: "了解更多",
      items: [
        { number: "01", title: "货运中介", description: "筛选并洽谈最优空运、海运和陆运承运商——优化条件，完全透明，无隐性中介费用。" },
        { number: "02", title: "地面服务代理与协助", description: "全面代理航空公司、机场、货运站及地面服务提供商。实时协调、跟踪与突发事件管理。" },
        { number: "03", title: "通关服务", description: "准备并跟踪海关申报，提供进出口支持，处理查验、纠纷及运输保险协调。" },
        { number: "04", title: "保险协调", description: "全面管理刚果特定程序、运输保险协调及所有行政手续的支持服务。" },
      ],
    },
    sectors: {
      label: "专业行业", title: "深度行业专长",
      broker: {
        badge: "认证货运代理商",
        title: "您的货运代理人",
        titleAccent: "在刚果民主共和国的核心",
        description: "作为一家专业经纪人，EZHL 不是承运人。 我们是连接、谈判和协调的智慧——使您的货物在尽可能好的条件下到达目的地。",
        tags: ["空运", "海运", "陆运", "地勤", "海关"],
        pillars: [
          { title: "独家网络", desc: "直接访问刚果（金）认证承运人、码头和供应商网络。" },
          { title: "专家谈判", desc: "我们代表您协商最佳费率和合同条件。" },
          { title: "合规保证", desc: "根据严格的可靠性和合规性标准选择每个合作伙伴。" },
          { title: "区域覆盖", desc: "从金沙萨、卢本巴希到跨境走廊的协调行动。" },
        ]
      },
      oil: { title: "石油物流 — 上加丹加省和卢阿拉巴省", subtitle: "石油与矿业", capabilities: ["协调石油产品罐车运输", "对接持牌合规承运商", "燃油流的海关及行政跟踪", "代理与当局和货运站的联络"] },
      agri: { title: "农产品配送 — 金沙萨", subtitle: "农业", capabilities: ["协助新鲜农产品的收集、运输和配送", "对接合适的冷藏运输商", "城市物流协调及路线优化", "省际或进口货物的海关协助"] },
    },
    gallery: {
      label: "我们在现场的工作",
      title: "EZHL 画廊",
      description: "我们在刚果（金）各地现场行动的概述。",
      comingSoon: "现场照片即将推出 — 更新中",
      items: [
        { caption: "机场地勤操作", tag: "地勤" },
        { caption: "海运 — 港口协调", tag: "货运" },
        { caption: "海关文件管理", tag: "海关" },
        { caption: "陆地物流 — 刚果（金）车队", tag: "运输" },
        { caption: "现场代表与监控", tag: "现场" },
        { caption: "农业配送 — 金沙萨", tag: "农业" },
      ]
    },
    howItWorks: {
      label: "工作方式", title: "通往简便的4个步骤", stepLabel: "步骤",
      steps: [
        { number: "01", title: "筛选", description: "我们识别并筛选最适合您需求的运输、地面服务或海关合作伙伴。" },
        { number: "02", title: "代理", description: "我们代表您对接所有相关方：航空公司、当局、货运站。您只需一个联系人。" },
        { number: "03", title: "海关与行政", description: "完整准备海关文件，跟踪检查与查验，协调运输保险。" },
        { number: "04", title: "最终交付", description: "实时跟踪直至交付。突发事件管理及每次操作的完整报告。" },
      ],
    },
    why: {
      label: "我们的优势", title: "为何选择 Easy Handling？",
      tagline: "复杂的物流变得…", taglineAccent: "简单。",
      items: [
        { title: "绝对便捷", description: "一位专属联系人负责您所有的物流流程。" },
        { title: "完全透明", description: "我们只收取中介服务费，无任何隐性费用。" },
        { title: "刚果专业化", description: "在金沙萨、上加丹加、卢阿拉巴及矿业/农业走廊的实地专长。" },
        { title: "合格合作伙伴网络", description: "可访问刚果及地区广泛的持牌承运商、货运站和认证服务提供商网络。" },
        { title: "全天候响应", description: "在刚果及整个地区拥有可靠的合作伙伴网络。" },
      ],
    },
    contact: {
      label: "联系我们", title: "定制报价或立即受理",
      name: "全名 *", namePlaceholder: "您的姓名",
      email: "电子邮件 *", emailPlaceholder: "您的邮箱@example.com",
      phone: "电话", phonePlaceholder: "+243 ...",
      type: "货运类型 *", typePlaceholder: "请选择...",
      message: "描述您的需求 *", messagePlaceholder: "我需要运输... 从... 到...",
      send: "发送请求", directContact: "直接联系",
      types: [
        { value: "petroleum", label: "石油产品" }, { value: "agriculture", label: "农产品" },
        { value: "fret", label: "空运 / 海运 / 陆运" }, { value: "douane", label: "海关业务" },
        { value: "handling", label: "机场地面服务" }, { value: "autre", label: "其他" },
      ],
      errorRequired: "请填写所有必填字段。", successMsg: "您的请求已成功发送！",
    },
    footer: {
      description: "您在刚果民主共和国及周边地区的物流与海关协调商——货运、地面服务、海关业务及专业物流。",
      navigation: "导航", contact: "联系我们", rights: "版权所有。",
    },
    floating: { call: "致电", email: "邮件" },
  },
};