import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Camera, X, ChevronLeft, ChevronRight, ImagePlus } from "lucide-react";
import { useLang } from "../hooks/useLang";

const TAG_COLORS = {
  "Handling": "bg-blue-500/20 text-blue-300 border-blue-500/30",
  "Fret": "bg-accent/20 text-accent border-accent/30",
  "Douane": "bg-purple-500/20 text-purple-300 border-purple-500/30",
  "Transport": "bg-orange-500/20 text-orange-300 border-orange-500/30",
  "Terrain": "bg-yellow-500/20 text-yellow-300 border-yellow-500/30",
  "Agriculture": "bg-green-500/20 text-green-300 border-green-500/30",
};

export default function GallerySection() {
  const { t, isRTL } = useLang();
  const [lightbox, setLightbox] = useState(null);

  const GALLERY_ITEMS = [
    { id: 1, placeholder: "https://images.unsplash.com/photo-1494412651409-8963ce7935a7?w=800&q=80", ...t.gallery.items[0] },
    { id: 2, placeholder: "https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=800&q=80", ...t.gallery.items[1] },
    { id: 3, placeholder: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80", ...t.gallery.items[2] },
    { id: 4, placeholder: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=800&q=80", ...t.gallery.items[3] },
    { id: 5, placeholder: "https://images.unsplash.com/photo-1565793979622-dc44c96b73fe?w=800&q=80", ...t.gallery.items[4] },
    { id: 6, placeholder: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80", ...t.gallery.items[5] },
  ];

  const prev = () => setLightbox((l) => (l > 0 ? l - 1 : GALLERY_ITEMS.length - 1));
  const next = () => setLightbox((l) => (l < GALLERY_ITEMS.length - 1 ? l + 1 : 0));

  return (
    <section id="galerie" className="py-24 lg:py-32 bg-background relative" dir={isRTL ? "rtl" : "ltr"}>
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-3">
            <Camera className="w-4 h-4 text-accent" />
            <p className="font-tight text-xs tracking-widest uppercase text-accent">{t.gallery.label}</p>
          </div>
          <h2 className="font-tight font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-foreground leading-[1.1] max-w-xl">
            {t.gallery.title}
          </h2>
          <div className="w-12 h-1 bg-accent rounded-full mt-6" />
          <p className="font-inter text-sm text-muted-foreground mt-4 max-w-md">
            {t.gallery.description}
          </p>
        </motion.div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {GALLERY_ITEMS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              onClick={() => setLightbox(i)}
              className={`group relative overflow-hidden rounded-2xl cursor-pointer border border-border hover:border-accent/40 transition-all duration-300 hover:shadow-xl hover:shadow-accent/10 ${
                i === 0 || i === 5 ? "lg:row-span-2" : ""
              }`}
              style={{ aspectRatio: i === 0 || i === 5 ? "3/4" : "4/3" }}
            >
              <img
                src={item.placeholder}
                alt={item.caption}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Overlay content */}
              <div className="absolute inset-0 flex flex-col justify-end p-4 lg:p-5 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                <span className={`inline-flex w-fit px-2.5 py-1 rounded-full text-[9px] font-tight tracking-widest uppercase border mb-2 ${TAG_COLORS[item.tag]}`}>
                  {item.tag}
                </span>
                <p className="font-tight text-white text-sm font-semibold leading-snug">{item.caption}</p>
              </div>

              {/* Coming soon overlay */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center">
                  <ImagePlus className="w-4 h-4 text-white/70" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Coming soon note */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-10 flex items-center justify-center"
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl border border-border bg-card text-muted-foreground text-sm font-inter">
            <ImagePlus className="w-4 h-4 text-accent" />
            <span>{t.gallery.comingSoon}</span>
          </div>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="relative max-w-4xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={GALLERY_ITEMS[lightbox].placeholder}
                alt={GALLERY_ITEMS[lightbox].caption}
                className="w-full max-h-[75vh] object-contain rounded-2xl"
              />
              <div className="mt-4 text-center">
                <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-tight tracking-widest uppercase border mr-2 ${TAG_COLORS[GALLERY_ITEMS[lightbox].tag]}`}>
                  {GALLERY_ITEMS[lightbox].tag}
                </span>
                <span className="font-inter text-white/70 text-sm">{GALLERY_ITEMS[lightbox].caption}</span>
              </div>

              {/* Controls */}
              <button
                onClick={() => setLightbox(null)}
                className="absolute -top-4 -right-4 w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center text-white hover:bg-white/20 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-white/20 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Dots */}
              <div className="flex items-center justify-center gap-2 mt-5">
                {GALLERY_ITEMS.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setLightbox(i); }}
                    className={`rounded-full transition-all duration-300 ${i === lightbox ? "w-6 h-2 bg-accent" : "w-2 h-2 bg-white/30 hover:bg-white/50"}`}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}