import { motion } from "framer-motion";
import { User, Eye, MapPin, Package, Clock } from "lucide-react";
import { useLang } from "../hooks/useLang";

const ICONS = [User, Eye, MapPin, Package, Clock];

export default function WhyChooseUs() {
  const { t, isRTL } = useLang();

  return (
    <section id="avantages" className="py-24 lg:py-32 bg-muted/50" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 lg:mb-20"
        >
          <p className="font-tight text-xs tracking-technical uppercase text-accent mb-3">{t.why.label}</p>
          <h2 className="font-tight font-800 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-xl">{t.why.title}</h2>
          <div className="w-16 h-0.5 bg-accent mt-6" />
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {t.why.items.map((adv, i) => {
            const Icon = ICONS[i];
            return (
              <motion.div
                key={adv.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className={`relative p-8 rounded-xl bg-card border border-border ${i === 4 ? "sm:col-span-2 lg:col-span-1" : ""}`}
              >
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5">
                  <Icon className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-tight font-700 text-lg tracking-tight text-foreground mb-2">{adv.title}</h3>
                <p className="font-inter text-sm text-muted-foreground leading-relaxed">{adv.description}</p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 lg:mt-20 text-center"
        >
          <p className="font-tight font-800 text-xl sm:text-2xl lg:text-3xl tracking-tight text-foreground">
            {t.why.tagline}{" "}
            <span className="text-accent">{t.why.taglineAccent}</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}