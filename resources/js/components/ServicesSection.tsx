import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plane, Building2, FileCheck, Shield, ArrowRight, X } from "lucide-react";
import { useLang } from "../hooks/useLang";

const ICONS = [Plane, Building2, FileCheck, Shield];

const DETAILS = {
  fr: [
    {
      what: "Ce que nous faisons",
      points: [
        "Analyse et comparaison des offres de transporteurs aériens, maritimes et terrestres",
        "Négociation tarifaire et contractuelle en votre nom",
        "Sélection basée sur fiabilité, délais et conformité",
        "Suivi continu de la relation transporteur"
      ]
    },
    {
      what: "Ce que nous faisons",
      points: [
        "Présence physique aux opérations de chargement / déchargement",
        "Liaison directe avec les équipes de piste et de terminal",
        "Gestion des incidents en temps réel",
        "Rapport complet après chaque opération"
      ]
    },
    {
      what: "Ce que nous faisons",
      points: [
        "Préparation et dépôt des déclarations d'importation/exportation",
        "Suivi des contrôles et inspections douanières",
        "Gestion des litiges et contentieux",
        "Conseil sur la réglementation douanière RDC"
      ]
    },
    {
      what: "Ce que nous faisons",
      points: [
        "Identification des meilleures couvertures d'assurance transport",
        "Coordination en cas de sinistre ou dommage",
        "Suivi des procédures administratives spécifiques RDC",
        "Interface unique entre client et assureur"
      ]
    }
  ],
  en: [
    {
      what: "What we do",
      points: [
        "Analysis and comparison of air, sea, and road carrier offers",
        "Price and contract negotiation on your behalf",
        "Selection based on reliability, lead times, and compliance",
        "Ongoing carrier relationship monitoring"
      ]
    },
    {
      what: "What we do",
      points: [
        "Physical presence at loading/unloading operations",
        "Direct liaison with ramp and terminal teams",
        "Real-time incident management",
        "Full report after each operation"
      ]
    },
    {
      what: "What we do",
      points: [
        "Preparation and filing of import/export declarations",
        "Monitoring of customs controls and inspections",
        "Dispute and litigation management",
        "DRC customs regulation advisory"
      ]
    },
    {
      what: "What we do",
      points: [
        "Identifying the best transport insurance coverage",
        "Coordination in case of claim or damage",
        "DRC-specific administrative procedure follow-up",
        "Single interface between client and insurer"
      ]
    }
  ],
  ar: [
    { what: "ما نقوم به", points: ["تحليل ومقارنة عروض الناقلين الجويين والبحريين والبريين","التفاوض على الأسعار والعقود نيابةً عنكم","الاختيار بناءً على الموثوقية والمواعيد والامتثال","متابعة مستمرة لعلاقات الناقلين"] },
    { what: "ما نقوم به", points: ["الحضور الجسدي في عمليات الشحن والتفريغ","التواصل المباشر مع فرق المهبط والمحطة","إدارة الحوادث في الوقت الفعلي","تقرير كامل بعد كل عملية"] },
    { what: "ما نقوم به", points: ["إعداد وتقديم تصاريح الاستيراد/التصدير","متابعة الفحوصات والتفتيش الجمركي","إدارة النزاعات والخلافات","الاستشارة حول لوائح الجمارك في الكونغو"] },
    { what: "ما نقوم به", points: ["تحديد أفضل تغطيات تأمين النقل","التنسيق في حالة الكوارث أو الأضرار","متابعة الإجراءات الإدارية الخاصة بالكونغو","واجهة واحدة بين العميل والمؤمن"] }
  ],
  zh: [
    { what: "我们的工作", points: ["分析比较空运、海运和陆运承运商报价","代表您进行价格和合同谈判","基于可靠性、时效和合规性进行筛选","持续监控承运商合作关系"] },
    { what: "我们的工作", points: ["实地参与装卸作业","直接联络停机坪和货运站团队","实时处理突发事件","每次作业后出具完整报告"] },
    { what: "我们的工作", points: ["准备并提交进出口报关单","跟踪海关查验和检查","处理争议和纠纷","提供刚果海关法规咨询"] },
    { what: "我们的工作", points: ["寻找最佳运输保险方案","协调理赔或损失处理","跟踪刚果特定行政流程","作为客户与保险公司之间的单一接口"] }
  ]
};

export default function ServicesSection() {
  const { t, isRTL, lang } = useLang();
  const [selected, setSelected] = useState(null);
  const details = DETAILS[lang] || DETAILS.fr;

  return (
    <section id="services" className="relative py-24 lg:py-32 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-tight text-xs tracking-widest uppercase text-accent mb-3">{t.services.label}</p>
          <h2 className="font-tight font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-xl">
            {t.services.title}
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mt-6" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5 lg:gap-6">
          {t.services.items.map((service, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={service.number}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setSelected(i)}
                className="group relative bg-card rounded-2xl border border-border p-8 lg:p-10 cursor-pointer hover:border-accent/50 hover:bg-card/80 transition-all duration-300 hover:shadow-xl hover:shadow-accent/8 hover:-translate-y-1"
              >
                {/* Number badge */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                  <span className="font-tight text-[10px] font-bold tracking-widest text-accent">{service.number}</span>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-5 group-hover:bg-accent/20 transition-colors">
                  <Icon className="w-6 h-6 text-accent" />
                </div>

                <h3 className="font-tight font-bold text-xl tracking-tight text-foreground leading-tight mb-3">
                  {service.title}
                </h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">{service.description}</p>

                <div className="mt-6 flex items-center gap-2 text-accent text-xs font-tight tracking-widest uppercase">
                  <span>{t.services.learnMore}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-card border border-border rounded-3xl p-8 lg:p-10 max-w-lg w-full shadow-2xl"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = ICONS[selected];
                    return (
                      <div className="w-12 h-12 rounded-2xl bg-accent/15 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-accent" />
                      </div>
                    );
                  })()}
                  <div>
                    <span className="font-tight text-[10px] tracking-widest uppercase text-accent">{t.services.items[selected]?.number}</span>
                    <h3 className="font-tight font-bold text-xl text-foreground leading-tight mt-0.5">
                      {t.services.items[selected]?.title}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/80 transition-colors shrink-0"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="font-inter text-sm text-muted-foreground leading-relaxed mb-6">
                {t.services.items[selected]?.description}
              </p>

              <div className="space-y-2.5">
                <p className="font-tight text-[10px] tracking-widest uppercase text-accent mb-3">
                  {details[selected]?.what}
                </p>
                {details[selected]?.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 shrink-0" />
                    <p className="font-inter text-sm text-foreground/80 leading-relaxed">{point}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <a href="#contact" onClick={() => setSelected(null)}>
                  <button className="w-full py-3.5 rounded-xl bg-accent text-white text-[11px] font-tight tracking-widest uppercase font-semibold hover:bg-accent/90 transition-colors">
                    {t.nav.devis}
                  </button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}