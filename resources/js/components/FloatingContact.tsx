import { Phone, Mail } from "lucide-react";
import { useLang } from "../hooks/useLang";

export default function FloatingContact() {
  const { t } = useLang();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-[#0A0F1C]/95 backdrop-blur-xl border-t border-white/10 py-3 px-4 sm:px-6 lg:hidden">
      <div className="flex items-center justify-center gap-4">
        <a href="tel:+243851800002" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-accent text-accent-foreground text-sm font-tight tracking-technical uppercase min-w-[44px] min-h-[44px] justify-center">
          <Phone className="w-4 h-4" />
          <span className="hidden sm:inline">{t.floating.call}</span>
        </a>
        <a href="mailto:easyhandling.drc@gmail.com" className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm font-tight tracking-technical uppercase min-w-[44px] min-h-[44px] justify-center">
          <Mail className="w-4 h-4" />
          <span className="hidden sm:inline">{t.floating.email}</span>
        </a>
      </div>
    </div>
  );
}