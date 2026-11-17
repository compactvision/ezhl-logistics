import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, CheckCircle2, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useLang } from "../hooks/useLang";

const OFFICES = [
  { city: "Kinshasa", address: "Blvd Triomphal n°52553 local 1, 2ème niveau concession Cathédrale du centenaire", country: "République Démocratique du Congo" },
  { city: "Kisangani — Siège social", address: "4/1, avenue Tchatchi, Commune de Makiso", country: "République Démocratique du Congo" },
  { city: "Lubumbashi", address: "604, avenue Lubilanshi, Commune de Lubumbashi", country: "République Démocratique du Congo" },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

interface SubmittedSummary {
  name: string;
  email: string;
  phone?: string;
  typeLabel?: string;
}

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<SubmittedSummary | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", type: "", message: "" });
  const { t, isRTL } = useLang();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.type || !form.message) {
      toast.error(t.contact.errorRequired);
      return;
    }
    setLoading(true);

    const typeObj = t.contact.types.find((item: { value: string; label: string }) => item.value === form.type);
    const typeLabel = typeObj ? typeObj.label : form.type;
    const currentPayload = { ...form };

    router.post("/contact", currentPayload, {
      onSuccess: () => {
        toast.success(t.contact.successMsg);
        setSubmittedSummary({
          name: currentPayload.name,
          email: currentPayload.email,
          phone: currentPayload.phone || undefined,
          typeLabel: typeLabel,
        });
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", type: "", message: "" });
        setLoading(false);
      },
      onError: (errors) => {
        const mailError = errors && typeof errors.mail === "string" ? errors.mail : null;
        toast.error(mailError || "Une erreur est survenue lors de l'envoi de votre message.");
        setLoading(false);
      },
      onFinish: () => setLoading(false),
    });
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
          <p className="font-tight text-xs tracking-technical uppercase text-accent mb-3">{t.contact.label}</p>
          <h2 className="font-tight font-800 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-xl">{t.contact.title}</h2>
          <div className="w-16 h-0.5 bg-accent mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-2xl bg-card border border-accent/30 p-8 sm:p-10 shadow-xl"
                >
                  {/* Subtle decorative glow */}
                  <div className="absolute -top-20 -right-20 w-56 h-56 bg-accent/15 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-20 -left-20 w-56 h-56 bg-secondary/15 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    <div className="flex items-start gap-4">
                      <motion.div
                        initial={{ scale: 0, rotate: -20 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: "spring", stiffness: 280, damping: 18, delay: 0.1 }}
                        className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shadow-md shadow-emerald-500/10 shrink-0"
                      >
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </motion.div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-tight font-600 tracking-technical uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 mb-2">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {t.contact.successBadge || "Message envoyé"}
                        </div>
                        <h3 className="font-tight font-800 text-2xl sm:text-3xl text-foreground tracking-tight leading-tight">
                          {t.contact.successTitle || "Demande transmise avec succès !"}
                        </h3>
                      </div>
                    </div>

                    <p className="font-inter text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {t.contact.successDesc || "Merci de nous avoir contactés. Votre message a bien été transmis à notre équipe logistique (contact@ezhl-logistics.com). Nous vous répondrons dans les plus brefs délais."}
                    </p>

                    {submittedSummary && (
                      <div className="rounded-xl bg-muted/40 border border-border p-5 space-y-3">
                        <div className="flex items-center justify-between border-b border-border/60 pb-2">
                          <span className="font-tight text-xs tracking-technical uppercase text-muted-foreground font-600 flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4 text-accent" />
                            {t.contact.sentSummary || "Récapitulatif de votre demande :"}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[11px] font-tight text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-full font-500">
                            Transmis à l'équipe
                          </span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div>
                            <span className="text-muted-foreground block text-xs">{t.contact.name.replace('*', '').trim()} :</span>
                            <span className="font-tight font-600 text-foreground">{submittedSummary.name}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs">{t.contact.email.replace('*', '').trim()} :</span>
                            <span className="font-tight font-600 text-foreground">{submittedSummary.email}</span>
                          </div>
                          {submittedSummary.typeLabel && (
                            <div>
                              <span className="text-muted-foreground block text-xs">{t.contact.type.replace('*', '').trim()} :</span>
                              <span className="font-tight font-600 text-foreground">{submittedSummary.typeLabel}</span>
                            </div>
                          )}
                          <div>
                            <span className="text-muted-foreground block text-xs">{t.contact.sentToLabel || "Boîte de réception :"}</span>
                            <span className="font-tight font-600 text-accent">contact@ezhl-logistics.com</span>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-tight text-xs sm:text-sm tracking-technical uppercase rounded-lg px-6 h-12 inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        {t.contact.sendAnother || "Envoyer un autre message"}
                      </Button>

                      <a
                        href="mailto:contact@ezhl-logistics.com"
                        className="h-12 px-5 rounded-lg border border-border inline-flex items-center gap-2 text-xs sm:text-sm font-tight uppercase tracking-technical text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-accent" />
                        contact@ezhl-logistics.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 block">{t.contact.name}</label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t.contact.namePlaceholder} className="h-12 rounded-lg font-inter text-sm" />
                    </div>
                    <div>
                      <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 block">{t.contact.email}</label>
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t.contact.emailPlaceholder} className="h-12 rounded-lg font-inter text-sm" />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 block">{t.contact.phone}</label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t.contact.phonePlaceholder} className="h-12 rounded-lg font-inter text-sm" />
                    </div>
                    <div>
                      <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 block">{t.contact.type}</label>
                      <Select value={form.type} onValueChange={(v) => setForm({ ...form, type: v })}>
                        <SelectTrigger className="h-12 rounded-lg font-inter text-sm">
                          <SelectValue placeholder={t.contact.typePlaceholder} />
                        </SelectTrigger>
                        <SelectContent>
                          {t.contact.types.map((type: { value: string; label: string }) => (
                            <SelectItem key={type.value} value={type.value}>{type.label}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 block">{t.contact.message}</label>
                    <Textarea value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t.contact.messagePlaceholder} rows={5} className="rounded-lg font-inter text-sm resize-none" />
                  </div>

                  <Button type="submit" disabled={loading} className="bg-accent hover:bg-accent/90 text-accent-foreground font-tight text-sm tracking-technical uppercase rounded-lg px-8 h-12 min-w-[44px]">
                    {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Send className="w-4 h-4 mr-2" />}
                    {t.contact.send}
                  </Button>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-tight font-700 text-sm tracking-technical uppercase text-foreground mb-5">{t.contact.directContact}</h3>
              <div className="space-y-4">
                <a href="mailto:contact@ezhl-logistics.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-inter">contact@ezhl-logistics.com</span>
                </a>
                <a href="tel:+243851800002" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-inter">+243 851 800 002</span>
                </a>
              </div>
            </div>

            {OFFICES.map((office) => (
              <div key={office.city} className="p-6 rounded-xl bg-card border border-border">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4 text-secondary" />
                  </div>
                  <div>
                    <h4 className="font-tight font-600 text-sm text-foreground mb-1">{office.city}</h4>
                    <p className="font-inter text-sm text-muted-foreground leading-relaxed">{office.address}</p>
                    <p className="font-inter text-xs text-muted-foreground/60 mt-0.5">{office.country}</p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
