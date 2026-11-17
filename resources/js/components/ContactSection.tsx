import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  Loader2,
  CheckCircle2,
  RotateCcw,
  ShieldCheck,
  Clock,
  Copy,
  Check,
  AlertCircle,
  FileCheck,
  User,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { router, usePage } from "@inertiajs/react";
import { useLang } from "../hooks/useLang";

const OFFICES = [
  {
    city: "Kinshasa",
    role: "Direction Opérationnelle",
    address: "Blvd Triomphal n°52553 local 1, 2ème niveau concession Cathédrale du centenaire",
    country: "République Démocratique du Congo",
  },
  {
    city: "Kisangani",
    role: "Siège Social",
    address: "4/1, avenue Tchatchi, Commune de Makiso",
    country: "République Démocratique du Congo",
  },
  {
    city: "Lubumbashi",
    role: "Antenne Katanga & Corridor Minier",
    address: "604, avenue Lubilanshi, Commune de Lubumbashi",
    country: "République Démocratique du Congo",
  },
];

interface FormState {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

interface SubmittedSummary {
  reference: string;
  name: string;
  email: string;
  phone?: string;
  typeLabel?: string;
  date: string;
}

export default function ContactSection() {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [submittedSummary, setSubmittedSummary] = useState<SubmittedSummary | null>(null);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", type: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const { t, isRTL } = useLang();
  const page = usePage();

  const validateField = (field: keyof FormState, value: string): string => {
    switch (field) {
      case "name":
        if (!value.trim()) return "Le nom complet est obligatoire.";
        if (value.trim().length < 2) return "Le nom doit comporter au moins 2 caractères.";
        return "";
      case "email":
        if (!value.trim()) return "L'adresse e-mail est obligatoire.";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
          return "Veuillez saisir une adresse e-mail valide.";
        }
        return "";
      case "type":
        if (!value.trim()) return "Veuillez sélectionner un type de prestation.";
        return "";
      case "message":
        if (!value.trim()) return "Veuillez détailler votre demande.";
        if (value.trim().length < 10) return "Votre message doit contenir au moins 10 caractères.";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (field: keyof FormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const err = validateField(field, form[field]);
    setErrors((prev) => ({ ...prev, [field]: err }));
  };

  const handleChange = (field: keyof FormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (touched[field]) {
      const err = validateField(field, value);
      setErrors((prev) => ({ ...prev, [field]: err }));
    }
    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Client-side validation
    const newErrors: Record<string, string> = {};
    (["name", "email", "type", "message"] as Array<keyof FormState>).forEach((field) => {
      const err = validateField(field, form[field]);
      if (err) newErrors[field] = err;
    });

    setTouched({ name: true, email: true, phone: true, type: true, message: true });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      toast.error(t.contact.errorRequired || "Veuillez corriger les champs obligatoires.");
      return;
    }

    setLoading(true);
    setErrors({});

    const typeObj = t.contact.types.find((item: { value: string; label: string }) => item.value === form.type);
    const typeLabel = typeObj ? typeObj.label : form.type;
    const currentPayload = { ...form };

    router.post("/contact", currentPayload, {
      preserveScroll: true,
      onSuccess: (pageObj) => {
        const flashSuccess = (pageObj?.props as any)?.flash?.contact_success;
        const ref = flashSuccess?.reference || "EZHL-" + Math.random().toString(36).substring(2, 8).toUpperCase();

        toast.success(t.contact.successMsg || "Votre demande a bien été transmise !");
        setSubmittedSummary({
          reference: ref,
          name: currentPayload.name,
          email: currentPayload.email,
          phone: currentPayload.phone.trim() || undefined,
          typeLabel: typeLabel,
          date: new Date().toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          }),
        });
        setSubmitted(true);
        setForm({ name: "", email: "", phone: "", type: "", message: "" });
        setTouched({});
        setLoading(false);
      },
      onError: (serverErrors) => {
        const mappedErrors: Record<string, string> = {};
        if (serverErrors) {
          Object.entries(serverErrors).forEach(([key, val]) => {
            if (typeof val === "string") mappedErrors[key] = val;
          });
        }
        setErrors(mappedErrors);

        const mainError =
          mappedErrors.mail ||
          mappedErrors.general ||
          "Une erreur est survenue lors de l'enregistrement de votre demande.";
        toast.error(mainError);
        setLoading(false);
      },
      onFinish: () => setLoading(false),
    });
  };

  const copyReference = () => {
    if (!submittedSummary?.reference) return;
    navigator.clipboard.writeText(submittedSummary.reference);
    setCopied(true);
    toast.info(t.contact.copiedRef || "Référence copiée dans le presse-papier !");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="contact" className="py-24 lg:py-32 bg-background border-t border-border/40" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <span className="font-tight text-xs tracking-technical uppercase text-accent font-700">
              {t.contact.label}
            </span>
            <span className="text-muted-foreground/40">•</span>
            <span className="font-tight text-xs text-muted-foreground uppercase tracking-technical">
              Support Commercial & Opérationnel
            </span>
          </div>

          <h2 className="font-tight font-800 text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-2xl mb-6">
            {t.contact.title}
          </h2>

          {/* Trust Guarantees Bar */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-6 pt-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-tight text-muted-foreground">
              <Clock className="w-3.5 h-3.5 text-accent" />
              <span>{t.contact.trustResponse || "Réponse sous 24h ouvrées"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-tight text-muted-foreground">
              <FileCheck className="w-3.5 h-3.5 text-accent" />
              <span>{t.contact.trustQuote || "Devis gratuit & sans engagement"}</span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-card border border-border text-xs font-tight text-muted-foreground">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>{t.contact.trustConfidential || "Données 100% confidentielles"}</span>
            </div>
          </div>

          <div className="w-16 h-0.5 bg-accent mt-6" />
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
          {/* Main Column: Form or Success Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <AnimatePresence mode="wait">
              {submitted ? (
                /* Ultra-Professional Confirmation Card */
                <motion.div
                  key="success-card"
                  initial={{ opacity: 0, y: 20, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -20, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="relative overflow-hidden rounded-2xl bg-card border border-border p-7 sm:p-9 shadow-lg"
                >
                  <div className="absolute -top-24 -right-24 w-60 h-60 bg-accent/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute -bottom-24 -left-24 w-60 h-60 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

                  <div className="relative z-10 space-y-6">
                    {/* Header */}
                    <div className="flex items-start gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-500 shrink-0 shadow-md">
                        <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                      </div>
                      <div>
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-tight font-600 tracking-technical uppercase bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 mb-1.5">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {t.contact.successBadge || "Dossier Enregistré"}
                        </div>
                        <h3 className="font-tight font-800 text-2xl sm:text-3xl text-foreground tracking-tight leading-tight">
                          {t.contact.successTitle || "Demande transmise avec succès !"}
                        </h3>
                      </div>
                    </div>

                    <p className="font-inter text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {t.contact.successDesc ||
                        "Merci de nous avoir contactés. Votre demande a bien été enregistrée par nos systèmes et transmise à nos coordinateurs logistiques. Nous vous recontacterons dans les plus brefs délais."}
                    </p>

                    {/* Reference Banner */}
                    {submittedSummary && (
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-accent/5 border border-accent/20">
                        <div>
                          <span className="text-[11px] font-tight uppercase tracking-technical text-muted-foreground block">
                            {t.contact.referenceLabel || "Référence dossier :"}
                          </span>
                          <span className="font-tight font-700 text-lg sm:text-xl text-accent tracking-wide">
                            {submittedSummary.reference}
                          </span>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={copyReference}
                          className="h-9 px-3 gap-1.5 text-xs font-tight self-start sm:self-auto border-accent/30 hover:bg-accent/10"
                        >
                          {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                          {copied ? (t.contact.copiedRef || "Copié !") : "Copier la référence"}
                        </Button>
                      </div>
                    )}

                    {/* Next Steps Roadmap */}
                    <div className="rounded-xl bg-muted/30 border border-border/80 p-5 space-y-3">
                      <p className="font-tight text-xs tracking-technical uppercase text-muted-foreground font-700">
                        {t.contact.nextStepsTitle || "Traitement de votre dossier"}
                      </p>
                      <div className="space-y-2.5">
                        <div className="flex items-center gap-3 text-xs sm:text-sm">
                          <div className="w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 text-[10px] font-bold">
                            ✓
                          </div>
                          <span className="text-foreground font-inter font-500">
                            {t.contact.nextStep1 || "Demande enregistrée & archivée dans notre système"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs sm:text-sm">
                          <div className="w-5 h-5 rounded-full bg-accent/20 text-accent border border-accent flex items-center justify-center shrink-0 text-[10px] font-bold animate-pulse">
                            2
                          </div>
                          <span className="text-foreground font-inter font-500">
                            {t.contact.nextStep2 || "Étude logistique & sélection des transporteurs"}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-xs sm:text-sm text-muted-foreground">
                          <div className="w-5 h-5 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 text-[10px] font-bold">
                            3
                          </div>
                          <span className="font-inter">
                            {t.contact.nextStep3 || "Prise de contact & proposition commerciale sous 24h"}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Summary Card */}
                    {submittedSummary && (
                      <div className="rounded-xl bg-background/80 border border-border p-4 sm:p-5 space-y-3">
                        <div className="flex items-center justify-between border-b border-border/60 pb-2">
                          <span className="font-tight text-xs tracking-technical uppercase text-muted-foreground font-600">
                            {t.contact.sentSummary || "Récapitulatif de votre demande :"}
                          </span>
                          <span className="text-[11px] font-inter text-muted-foreground">
                            {submittedSummary.date}
                          </span>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                          <div>
                            <span className="text-muted-foreground block text-xs">Nom complet :</span>
                            <span className="font-tight font-600 text-foreground">{submittedSummary.name}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground block text-xs">Email :</span>
                            <span className="font-tight font-600 text-foreground">{submittedSummary.email}</span>
                          </div>
                          {submittedSummary.phone && (
                            <div>
                              <span className="text-muted-foreground block text-xs">Téléphone :</span>
                              <span className="font-tight font-600 text-foreground">{submittedSummary.phone}</span>
                            </div>
                          )}
                          {submittedSummary.typeLabel && (
                            <div>
                              <span className="text-muted-foreground block text-xs">Prestation :</span>
                              <span className="font-tight font-600 text-foreground">{submittedSummary.typeLabel}</span>
                            </div>
                          )}
                          <div className="sm:col-span-2 pt-1 border-t border-border/40 flex items-center gap-2">
                            <span className="text-muted-foreground text-xs">{t.contact.sentToLabel || "Boîte destinataire :"}</span>
                            <span className="font-tight font-600 text-accent text-xs">contact@ezhl-logistics.com</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center gap-3 pt-2">
                      <Button
                        type="button"
                        onClick={() => setSubmitted(false)}
                        className="bg-accent hover:bg-accent/90 text-accent-foreground font-tight text-xs sm:text-sm tracking-technical uppercase rounded-lg px-6 h-12 inline-flex items-center gap-2"
                      >
                        <RotateCcw className="w-4 h-4" />
                        {t.contact.sendAnother || "Envoyer une autre demande"}
                      </Button>

                      <a
                        href="https://wa.me/243851800002"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="h-12 px-5 rounded-lg border border-border inline-flex items-center gap-2 text-xs sm:text-sm font-tight uppercase tracking-technical text-foreground hover:bg-muted/60 transition-colors"
                      >
                        <MessageCircle className="w-4 h-4 text-emerald-500" />
                        {t.contact.whatsappCTA || "WhatsApp direct"}
                      </a>

                      <a
                        href="mailto:contact@ezhl-logistics.com"
                        className="h-12 px-4 rounded-lg border border-border inline-flex items-center gap-2 text-xs sm:text-sm font-tight uppercase tracking-technical text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors"
                      >
                        <Mail className="w-4 h-4 text-accent" />
                        contact@ezhl-logistics.com
                      </a>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* Corporate Form */
                <motion.div
                  key="form-container"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl bg-card border border-border p-6 sm:p-8 shadow-sm"
                >
                  {/* General / Server Alert Banner if error occurs */}
                  {errors.general && (
                    <div className="mb-6 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive shrink-0 mt-0.5" />
                      <div className="text-xs sm:text-sm">
                        <p className="font-tight font-600 text-destructive mb-1">{errors.general}</p>
                        <p className="text-muted-foreground">
                          Besoin d'une assistance directe ? Contactez-nous par e-mail à{" "}
                          <a href="mailto:contact@ezhl-logistics.com" className="text-foreground underline">
                            contact@ezhl-logistics.com
                          </a>{" "}
                          ou par téléphone au{" "}
                          <a href="tel:+243851800002" className="text-foreground underline">
                            +243 851 800 002
                          </a>
                          .
                        </p>
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Nom & Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 flex items-center justify-between">
                          <span>
                            {t.contact.name} <span className="text-accent">*</span>
                          </span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <Input
                            value={form.name}
                            disabled={loading}
                            onChange={(e) => handleChange("name", e.target.value)}
                            onBlur={() => handleBlur("name")}
                            placeholder={t.contact.namePlaceholder}
                            className={`h-12 pl-10 rounded-lg font-inter text-sm ${
                              errors.name && touched.name ? "border-destructive focus-visible:ring-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.name && touched.name && (
                          <p className="text-destructive text-xs mt-1.5 font-inter flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 flex items-center justify-between">
                          <span>
                            {t.contact.email} <span className="text-accent">*</span>
                          </span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <Input
                            type="email"
                            value={form.email}
                            disabled={loading}
                            onChange={(e) => handleChange("email", e.target.value)}
                            onBlur={() => handleBlur("email")}
                            placeholder={t.contact.emailPlaceholder}
                            className={`h-12 pl-10 rounded-lg font-inter text-sm ${
                              errors.email && touched.email ? "border-destructive focus-visible:ring-destructive" : ""
                            }`}
                          />
                        </div>
                        {errors.email && touched.email && (
                          <p className="text-destructive text-xs mt-1.5 font-inter flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.email}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Téléphone & Type de flux */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 flex items-center justify-between">
                          <span>{t.contact.phone}</span>
                          <span className="text-[11px] normal-case text-muted-foreground/60">(Optionnel)</span>
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          <Input
                            value={form.phone}
                            disabled={loading}
                            onChange={(e) => handleChange("phone", e.target.value)}
                            onBlur={() => handleBlur("phone")}
                            placeholder={t.contact.phonePlaceholder || "+243 851 ..."}
                            className="h-12 pl-10 rounded-lg font-inter text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground mb-2 flex items-center justify-between">
                          <span>
                            {t.contact.type} <span className="text-accent">*</span>
                          </span>
                        </label>
                        <Select
                          value={form.type}
                          disabled={loading}
                          onValueChange={(v) => handleChange("type", v)}
                        >
                          <SelectTrigger
                            className={`h-12 rounded-lg font-inter text-sm ${
                              errors.type && touched.type ? "border-destructive focus:ring-destructive" : ""
                            }`}
                          >
                            <SelectValue placeholder={t.contact.typePlaceholder || "Sélectionner la prestation..."} />
                          </SelectTrigger>
                          <SelectContent>
                            {t.contact.types.map((type: { value: string; label: string }) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.type && touched.type && (
                          <p className="text-destructive text-xs mt-1.5 font-inter flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {errors.type}
                          </p>
                        )}
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <label className="font-tight text-xs tracking-technical uppercase text-muted-foreground">
                          {t.contact.message} <span className="text-accent">*</span>
                        </label>
                        <span className="text-[11px] font-inter text-muted-foreground/60">
                          {form.message.length} / 5000
                        </span>
                      </div>
                      <Textarea
                        value={form.message}
                        disabled={loading}
                        onChange={(e) => handleChange("message", e.target.value)}
                        onBlur={() => handleBlur("message")}
                        placeholder={t.contact.messagePlaceholder}
                        rows={5}
                        maxLength={5000}
                        className={`rounded-lg font-inter text-sm resize-none ${
                          errors.message && touched.message ? "border-destructive focus-visible:ring-destructive" : ""
                        }`}
                      />
                      {errors.message && touched.message && (
                        <p className="text-destructive text-xs mt-1.5 font-inter flex items-center gap-1">
                          <AlertCircle className="w-3 h-3" />
                          {errors.message}
                        </p>
                      )}
                    </div>

                    {/* Submit Button & Security Note */}
                    <div className="pt-2 space-y-3">
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-accent-foreground font-tight text-sm tracking-technical uppercase rounded-lg px-8 h-12 min-w-[200px] shadow-sm inline-flex items-center justify-center gap-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>{t.contact.sending || "Transmission sécurisée en cours..."}</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>{t.contact.send}</span>
                          </>
                        )}
                      </Button>

                      <p className="text-[11px] font-inter text-muted-foreground/75 leading-relaxed flex items-start gap-1.5 pt-1">
                        <ShieldCheck className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                        <span>
                          {t.contact.disclaimer ||
                            "Vos données personnelles sont traitées exclusivement pour l'établissement de votre offre logistique et restent strictement confidentielles."}
                        </span>
                      </p>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Right Column: Direct Contacts & Hubs */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-2 space-y-6"
          >
            {/* Direct Support Card */}
            <div className="p-6 rounded-2xl bg-card border border-border shadow-sm space-y-5">
              <div>
                <span className="font-tight text-xs tracking-technical uppercase text-accent font-700 block mb-1">
                  Assistance Immédiate
                </span>
                <h3 className="font-tight font-700 text-base text-foreground uppercase tracking-technical">
                  {t.contact.directContact}
                </h3>
              </div>

              <div className="space-y-3.5">
                <a
                  href="mailto:contact@ezhl-logistics.com"
                  className="flex items-center gap-3.5 text-sm text-muted-foreground hover:text-accent transition-colors group p-2.5 -mx-2.5 rounded-lg hover:bg-muted/40"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Mail className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="text-[11px] font-tight uppercase tracking-technical text-muted-foreground/70 block">
                      Courrier électronique
                    </span>
                    <span className="font-inter font-600 text-foreground text-sm">contact@ezhl-logistics.com</span>
                  </div>
                </a>

                <a
                  href="tel:+243851800002"
                  className="flex items-center gap-3.5 text-sm text-muted-foreground hover:text-accent transition-colors group p-2.5 -mx-2.5 rounded-lg hover:bg-muted/40"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                    <Phone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <span className="text-[11px] font-tight uppercase tracking-technical text-muted-foreground/70 block">
                      Ligne téléphonique directe
                    </span>
                    <span className="font-inter font-600 text-foreground text-sm">+243 851 800 002</span>
                  </div>
                </a>

                <a
                  href="https://wa.me/243851800002"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3.5 text-sm text-muted-foreground hover:text-emerald-500 transition-colors group p-2.5 -mx-2.5 rounded-lg hover:bg-muted/40"
                >
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center shrink-0 group-hover:bg-emerald-500/20 transition-colors">
                    <MessageCircle className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div>
                    <span className="text-[11px] font-tight uppercase tracking-technical text-muted-foreground/70 block">
                      WhatsApp Commercial & Fret
                    </span>
                    <span className="font-inter font-600 text-foreground text-sm">+243 851 800 002</span>
                  </div>
                </a>
              </div>

              {/* Business Hours */}
              <div className="pt-4 border-t border-border/70 space-y-2">
                <div className="flex items-center gap-2 text-xs font-tight font-600 text-foreground uppercase tracking-technical">
                  <Clock className="w-3.5 h-3.5 text-accent" />
                  <span>{t.contact.businessHours || "Horaires d'ouverture"}</span>
                </div>
                <p className="text-xs font-inter text-muted-foreground">
                  {t.contact.businessHoursDetails || "Lun - Ven : 08h00 - 17h00 | Sam : 08h30 - 13h00"}
                </p>
                <div className="inline-flex items-center gap-2 text-[11px] font-inter text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{t.contact.businessHoursEmergency || "Permanence 24/7 pour urgences fret & douane"}</span>
                </div>
              </div>
            </div>

            {/* Hubs / Offices Cards */}
            <div className="space-y-3">
              <span className="font-tight text-xs tracking-technical uppercase text-muted-foreground font-700 block px-1">
                Bureaux & Implantations en RDC
              </span>

              {OFFICES.map((office) => (
                <div
                  key={office.city}
                  className="p-5 rounded-xl bg-card border border-border shadow-xs transition-colors hover:border-accent/40"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-secondary/10 flex items-center justify-center shrink-0 mt-0.5">
                      <MapPin className="w-4 h-4 text-secondary" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-tight font-700 text-sm text-foreground">{office.city}</h4>
                        <span className="text-[10px] font-tight uppercase tracking-technical px-2 py-0.5 rounded bg-muted text-muted-foreground">
                          {office.role}
                        </span>
                      </div>
                      <p className="font-inter text-xs text-muted-foreground leading-relaxed">{office.address}</p>
                      <p className="font-inter text-[11px] text-muted-foreground/60 mt-0.5">{office.country}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
