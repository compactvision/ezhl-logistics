import { Globe } from "lucide-react";
import { useLang, setLanguage } from "../hooks/useLang";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const LANGUAGES = [
  { code: "fr", label: "FR", full: "Français" },
  { code: "en", label: "EN", full: "English" },
  { code: "ar", label: "AR", full: "العربية" },
  { code: "zh", label: "中文", full: "中文" },
];

export default function LanguageSwitcher() {
  const { lang } = useLang();

  return (
    <Select value={lang} onValueChange={setLanguage}>
      <SelectTrigger className="h-8 w-[90px] rounded-lg border-white/20 bg-white/8 backdrop-blur-sm text-white text-xs font-tight tracking-widest focus:ring-accent gap-1.5 pl-2.5 pr-2">
        <Globe className="w-3 h-3 text-white/60 shrink-0" />
        <SelectValue />
      </SelectTrigger>
      <SelectContent className="min-w-[130px] rounded-xl border-border bg-[#0A0F1C]/95 backdrop-blur-xl">
        {LANGUAGES.map((l) => (
          <SelectItem
            key={l.code}
            value={l.code}
            className="text-white/70 hover:text-white focus:text-white focus:bg-white/10 font-inter text-sm rounded-lg cursor-pointer"
          >
            <span className="font-tight text-xs tracking-widest mr-2 text-accent">{l.label}</span>
            {l.full}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}