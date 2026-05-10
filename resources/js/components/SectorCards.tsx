import { motion } from "framer-motion";
import { Leaf, Check, Network, ShieldCheck, Scale, Globe2, ArrowRight } from "lucide-react";
import { useLang } from "../hooks/useLang";

const AGRI_IMAGE = "https://media.base44.com/images/public/69c04a45b779b17de99ef2bc/423eecd07_generated_d924cec9.png";

export default function SectorCards() {
  const { t, isRTL } = useLang();

  const BROKER_PILLARS = [
    { icon: Network, ...t.sectors.broker.pillars[0] },
    { icon: Scale, ...t.sectors.broker.pillars[1] },
    { icon: ShieldCheck, ...t.sectors.broker.pillars[2] },
    { icon: Globe2, ...t.sectors.broker.pillars[3] },
  ];

  return (
    <section id="secteurs" className="py-24 lg:py-36 bg-[#0A0F1C] overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <p className="font-tight text-xs tracking-widest uppercase text-accent mb-3">{t.sectors.label}</p>
          <h2 className="font-tight font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.1] max-w-2xl">
            {t.sectors.title}
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mt-6" />
        </motion.div>

        {/* BROKER HERO SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="relative rounded-3xl overflow-hidden mb-12 border border-white/10"
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-[#1a0808]/80 to-[#0A0F1C]" />
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

          <div className="relative z-10 p-10 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Text */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/15 border border-accent/30 mb-6">
                  <Network className="w-3.5 h-3.5 text-accent" />
                  <span className="font-tight text-[10px] tracking-widest uppercase text-accent">{t.sectors.broker.badge}</span>
                </div>

                <h3 className="font-tight font-black text-3xl lg:text-4xl text-white leading-[1.1] tracking-tight mb-6">
                  {t.sectors.broker.title} <br />
                  <span className="text-accent">{t.sectors.broker.titleAccent}</span>
                </h3>

                <p className="font-inter text-white/65 text-base leading-relaxed mb-8 max-w-md">
                  {t.sectors.broker.description}
                </p>

                <div className="flex flex-wrap gap-3">
                  {t.sectors.broker.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 rounded-full border border-white/15 bg-white/5 text-white/70 text-xs font-tight tracking-wider uppercase"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BROKER_PILLARS.map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-accent/30 transition-all duration-300 group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-accent/15 flex items-center justify-center mb-3 group-hover:bg-accent/25 transition-colors">
                      <pillar.icon className="w-5 h-5 text-accent" />
                    </div>
                    <h4 className="font-tight font-bold text-sm text-white mb-1.5">{pillar.title}</h4>
                    <p className="font-inter text-xs text-white/50 leading-relaxed">{pillar.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* AGRICULTURE CARD */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="group relative rounded-3xl overflow-hidden"
        >
          <div className="relative h-[420px] lg:h-[460px]">
            <img
              src={AGRI_IMAGE}
              alt="Distribution produits agricoles Kinshasa"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-[#0A0F1C]/60 to-transparent" />

            <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-800/40 border border-green-600/30 w-fit mb-4">
                <Leaf className="w-3.5 h-3.5 text-green-400" />
                <span className="font-tight text-[10px] tracking-widest uppercase text-green-400">Agriculture</span>
              </div>

              <h3 className="font-tight font-black text-2xl lg:text-3xl tracking-tight text-white leading-tight mb-6">
                {t.sectors.agri.title}
              </h3>

              <div className="grid sm:grid-cols-2 gap-3">
                {t.sectors.agri.capabilities.map((cap, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transitionDelay: `${i * 80}ms` }}
                  >
                    <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-white" />
                    </div>
                    <span className="font-inter text-sm text-white/80 leading-snug">{cap}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}