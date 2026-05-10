import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { router } from "@inertiajs/react";
import { useLang } from "../hooks/useLang";

const OFFICES = [
  { city: "Kisangani — Siège social", address: "4/1, avenue Tchatchi, Commune de Makiso", country: "République Démocratique du Congo" },
  { city: "Lubumbashi", address: "604, avenue Lubilanshi, Commune de Lubumbashi", country: "République Démocratique du Congo" },
];

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", type: "", message: "" });
  const { t, isRTL } = useLang();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.type || !form.message) {
      toast.error(t.contact.errorRequired);
      return;
    }
    setLoading(true);

    router.post("/contact", form, {
      onSuccess: () => {
        toast.success(t.contact.successMsg);
        setForm({ name: "", email: "", phone: "", type: "", message: "" });
        setLoading(false);
      },
      onError: () => {
        toast.error("Une erreur est survenue lors de l'envoi.");
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
            <form onSubmit={handleSubmit} className="space-y-5">
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
                      {t.contact.types.map((type) => (
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
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6, delay: 0.15 }} className="lg:col-span-2 space-y-8">
            <div className="p-6 rounded-xl bg-card border border-border">
              <h3 className="font-tight font-700 text-sm tracking-technical uppercase text-foreground mb-5">{t.contact.directContact}</h3>
              <div className="space-y-4">
                <a href="mailto:easyhandling.drc@gmail.com" className="flex items-center gap-3 text-sm text-muted-foreground hover:text-accent transition-colors group">
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <span className="font-inter">easyhandling.drc@gmail.com</span>
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