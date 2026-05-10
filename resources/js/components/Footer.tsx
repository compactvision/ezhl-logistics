import { Mail, Phone, MapPin } from "lucide-react";
import { useLang } from "../hooks/useLang";

export default function Footer() {
  const { t, isRTL } = useLang();

  const NAV_LINKS = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.secteurs, href: "#secteurs" },
    { label: t.nav.processus, href: "#processus" },
    { label: t.nav.avantages, href: "#avantages" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer className="bg-[#0A0F1C] text-white/60 py-16 lg:py-20" dir={isRTL ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-md overflow-hidden bg-white flex items-center justify-center">
                <img src="https://media.base44.com/images/public/69c04a45b779b17de99ef2bc/f71e8a031_F85F28EB-BA4B-4773-9C09-4550FE636D5E.JPG" alt="Logo EZHL - Easy Handling and Logistics" className="w-full h-full object-contain" />
              </div>
              <div>
                <p className="font-tight font-bold text-sm tracking-technical uppercase text-white leading-none">EZHL</p>
                <p className="font-tight text-[10px] tracking-technical uppercase text-white/40 leading-none mt-0.5">Easy Handling & Logistics</p>
              </div>
            </div>
            <p className="font-inter text-sm text-white/50 leading-relaxed max-w-sm">{t.footer.description}</p>
          </div>

          <div>
            <h4 className="font-tight text-xs tracking-technical uppercase text-white/30 mb-5">{t.footer.navigation}</h4>
            <div className="space-y-3">
              {NAV_LINKS.map((link) => (
                <a key={link.href} href={link.href} className="block font-inter text-sm text-white/50 hover:text-white transition-colors">{link.label}</a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-tight text-xs tracking-technical uppercase text-white/30 mb-5">{t.footer.contact}</h4>
            <div className="space-y-4">
              <a href="mailto:easyhandling.drc@gmail.com" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Mail className="w-4 h-4 shrink-0" />
                <span className="font-inter">easyhandling.drc@gmail.com</span>
              </a>
              <a href="tel:+243851800002" className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
                <Phone className="w-4 h-4 shrink-0" />
                <span className="font-inter">+243 851 800 002</span>
              </a>
              <div className="flex items-start gap-2 text-sm text-white/50">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                <span className="font-inter">Kisangani · Kinshasa · Lubumbashi, RDC</span>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-inter text-xs text-white/30">© {new Date().getFullYear()} Easy Handling and Logistics. {t.footer.rights}</p>
          <p className="font-inter text-xs text-white/30">{t.hero.badge}</p>
        </div>
      </div>
    </footer>
  );
}