import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useLang } from "../hooks/useLang";
import LanguageSwitcher from "./LanguageSwitcher";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { t, isRTL } = useLang();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const NAV_LINKS = [
    { label: t.nav.services, href: "#services" },
    { label: t.nav.secteurs, href: "#secteurs" },
    { label: t.nav.processus, href: "#processus" },
    { label: t.nav.avantages, href: "#avantages" },
    { label: "Galerie", href: "#galerie" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <nav
      dir={isRTL ? "rtl" : "ltr"}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0F1C]/95 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-white shadow-lg shadow-accent/20 shrink-0">
              <img
                src="https://media.base44.com/images/public/69c04a45b779b17de99ef2bc/f71e8a031_F85F28EB-BA4B-4773-9C09-4550FE636D5E.JPG"
                alt="EZHL"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="hidden sm:flex flex-col">
              <p className="font-tight font-black text-base tracking-tight text-white leading-none">
                Easy Handling & Logistics
              </p>
              <p className="font-tight text-[9px] tracking-widest uppercase text-accent leading-none mt-1">
                EZHL · RDC
              </p>
            </div>
          </a>

          {/* Desktop nav links — centered */}
          <div className="hidden lg:flex items-center gap-0.5">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-2 font-tight text-[10px] tracking-widest uppercase text-white/55 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right side: lang + CTA only (no phone number) */}
          <div className="hidden lg:flex items-center gap-3 shrink-0">
            <LanguageSwitcher />
            <a href="#contact">
              <button className="relative overflow-hidden px-5 py-2 rounded-xl bg-accent text-white text-[10px] font-tight tracking-widest uppercase font-semibold shadow-lg shadow-accent/30 hover:shadow-accent/50 hover:bg-accent/90 transition-all duration-300 group">
                <span className="relative z-10">{t.nav.devis}</span>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </button>
            </a>
          </div>

          {/* Mobile */}
          <div className="lg:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              onClick={() => setOpen(!open)}
              className="w-9 h-9 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white"
              aria-label="Menu"
            >
              {open ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0A0F1C]/98 backdrop-blur-xl border-t border-white/10 overflow-hidden"
          >
            <div className="px-5 py-5 space-y-1" dir={isRTL ? "rtl" : "ltr"}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center px-4 py-3 rounded-xl font-tight text-[10px] tracking-widest uppercase text-white/60 hover:text-white hover:bg-white/8 transition-all"
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 mt-2 border-t border-white/10 space-y-3">
                <a href="tel:+243851800002" className="flex items-center gap-2 px-4 py-2 text-sm text-white/50">
                  <Phone className="w-4 h-4" />
                  +243 851 800 002
                </a>
                <a href="#contact" onClick={() => setOpen(false)}>
                  <button className="w-full py-3 rounded-xl bg-accent text-white text-[10px] font-tight tracking-widest uppercase font-semibold">
                    {t.nav.devis}
                  </button>
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}