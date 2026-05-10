import { motion } from "framer-motion";
import { Search, Handshake, FileCheck, PackageCheck } from "lucide-react";
import { useLang } from "../hooks/useLang";

const ICONS = [Search, Handshake, FileCheck, PackageCheck];

export default function HowItWorks() {
  const { t, isRTL } = useLang();

  return (
    <section id="processus" className="relative py-24 lg:py-32 bg-background overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 grid-lines opacity-30" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16 lg:mb-20"
        >
          <p className="font-tight text-xs tracking-technical uppercase text-accent mb-3">{t.howItWorks.label}</p>
          <h2 className="font-tight font-800 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1]">{t.howItWorks.title}</h2>
          <div className="w-16 h-0.5 bg-accent mt-6 mx-auto" />
        </motion.div>

        <div className="relative">
          <div className="hidden lg:block absolute top-[60px] left-0 right-0 h-[1px] bg-border" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
            {t.howItWorks.steps.map((step, i) => {
              const Icon = ICONS[i];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="relative text-center lg:text-left"
                >
                  <div className="relative z-10 mx-auto lg:mx-0 w-[120px] h-[120px] rounded-2xl bg-card border border-border flex flex-col items-center justify-center mb-6 shadow-sm">
                    <Icon className="w-8 h-8 text-accent mb-2" />
                    <span className="font-tight text-xs tracking-technical text-muted-foreground">{t.howItWorks.stepLabel} {step.number}</span>
                  </div>
                  <h3 className="font-tight font-700 text-lg tracking-tight text-foreground mb-2">{step.title}</h3>
                  <p className="font-inter text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}