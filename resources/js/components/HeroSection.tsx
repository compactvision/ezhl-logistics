import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, Globe } from "lucide-react";
import { useLang } from "../hooks/useLang";

const HERO_IMAGE = "https://media.base44.com/images/public/69c04a45b779b17de99ef2bc/aacecfc9a_generated_f8de4111.png";

export default function HeroSection() {
  const { t, isRTL } = useLang();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      {/* Background */}
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="Logistique RDC" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0F1C] via-[#0A0F1C]/85 to-[#0A0F1C]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C]/60 via-transparent to-transparent" />
      </div>
      <div className="absolute inset-0 grid-lines opacity-8" />

      {/* Accent glow */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-24 lg:pt-44 lg:pb-36 w-full">
        <div className="max-w-3xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/10 backdrop-blur-sm mb-8"
          >
            <Globe className="w-3.5 h-3.5 text-accent" />
            <span className="font-tight text-[10px] tracking-widest uppercase text-accent">
              {t.hero.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-tight font-black text-5xl sm:text-6xl md:text-7xl lg:text-[80px] tracking-tight text-white leading-[1.0] mb-7"
          >
            <span className="block">{t.hero.title1}</span>
            {t.hero.title2 && <span className="block">{t.hero.title2}</span>}
            {t.hero.title3 && <span className="block">{t.hero.title3}</span>}
            <span className="block text-accent mt-1">{t.hero.titleAccent}</span>
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="font-inter text-base sm:text-lg text-white/65 leading-relaxed max-w-xl mb-10"
          >
            {t.hero.subtitle}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <a href="#contact">
              <button className="group relative overflow-hidden flex items-center gap-2 px-8 h-14 rounded-2xl bg-accent text-white font-tight text-[11px] tracking-widest uppercase font-semibold shadow-xl shadow-accent/30 hover:shadow-accent/50 hover:bg-accent/90 transition-all duration-300">
                <span className="relative z-10">{t.hero.cta1}</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </button>
            </a>
            <a href="#services">
              <button className="flex items-center gap-2 px-8 h-14 rounded-2xl border border-white/25 bg-white/5 backdrop-blur-sm text-white font-tight text-[11px] tracking-widest uppercase font-semibold hover:bg-white/15 hover:border-white/40 transition-all duration-300">
                {t.hero.cta2}
              </button>
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="mt-16 pt-8 border-t border-white/10 grid grid-cols-3 gap-6 lg:gap-12"
          >
            {[
              { value: "5", label: t.hero.stat1Label },
              { value: "24/7", label: t.hero.stat2Label },
              { value: "3+", label: t.hero.stat3Label },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="font-tight font-black text-3xl sm:text-4xl text-white tracking-tight">{stat.value}</p>
                <p className="font-inter text-xs sm:text-sm text-white/45 mt-1.5 leading-tight">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <a href="#services" aria-label="Scroll">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-8 h-12 rounded-full border border-white/20 flex items-start justify-center pt-2"
          >
            <div className="w-1 h-3 rounded-full bg-white/40" />
          </motion.div>
        </a>
      </motion.div>
    </section>
  );
}