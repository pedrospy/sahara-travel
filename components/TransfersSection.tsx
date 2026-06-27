"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Car, Plane, MapPin, Users } from "lucide-react";
import { transfersCatalog, galleryCatalog, getWhatsAppUrl } from "@/lib/catalog";
import { formatPrice, useDictionary, useLocale } from "@/lib/i18n/locale-context";
import { SectionArabic } from "@/components/ArabicCalligraphy";

const iconMap: Record<string, React.ElementType> = {
  airport: Plane,
  city: Car,
  intercity: MapPin,
  group: Users,
};

export function TransfersSection() {
  const dict = useDictionary();
  const { locale } = useLocale();
  const t = dict.transfers;

  return (
    <section id="transferts" className="section-padding bg-burgundy-dark text-white">
      <div className="container-wide">
        <div className="mb-14 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionArabic phrase="welcome" />
            <span className="section-eyebrow text-gold-light">{t.eyebrow}</span>
            <h2 className="section-title mt-4 text-white">{t.title}</h2>
            <div className="ornament-divider !mx-0 !max-w-[180px]" />
            <p className="max-w-xl text-sand-200/80">{t.description}</p>
          </div>
          <Link
            href="#contact"
            className="group inline-flex items-center gap-2 font-semibold text-gold-light hover:text-white"
          >
            {t.viewAll}
            <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {transfersCatalog.map((transfer, i) => {
            const content = t.items[transfer.id];
            const Icon = iconMap[transfer.id] ?? Car;
            return (
              <motion.article
                key={transfer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="group overflow-hidden border border-gold/25 bg-burgundy shadow-lg transition hover:border-gold/50"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={transfer.image}
                    alt={content.title}
                    fill
                    unoptimized
                    className="object-cover transition duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/90 via-burgundy-dark/20 to-transparent" />
                  <div className="absolute left-0 top-0 h-1 w-full bg-gold-gradient" />
                  <span className="absolute left-3 top-4 inline-flex items-center gap-1.5 bg-gold/90 px-2.5 py-1 text-xs font-semibold text-burgundy-dark">
                    <Icon className="h-3.5 w-3.5" />
                    {content.badge}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg font-bold text-gold-light">
                    {content.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-sand-200/75">
                    {content.description}
                  </p>
                  <div className="mt-4 flex items-center justify-between border-t border-gold/20 pt-4">
                    <p className="font-display text-lg font-bold text-white">
                      {dict.common.from}{" "}
                      {formatPrice(transfer.price, locale)}
                    </p>
                    <a
                      href={getWhatsAppUrl(
                        `${dict.common.whatsappMessage}${content.title}`
                      )}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-gold-light transition hover:text-white"
                    >
                      WhatsApp →
                    </a>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-16 border-t border-gold/20 pt-12">
          <h3 className="font-display text-2xl font-bold text-gold-light sm:text-3xl">
            {t.galleryTitle}
          </h3>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 lg:gap-4">
            {galleryCatalog.map((photo, i) => (
              <motion.div
                key={photo.id}
                initial={{ opacity: 0, scale: 0.96 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="group relative aspect-[3/4] overflow-hidden border border-gold/20 sm:aspect-[4/5]"
              >
                <Image
                  src={photo.image}
                  alt={t.gallery[photo.id]}
                  fill
                  unoptimized
                  className="object-cover transition duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-burgundy-dark/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
                <p className="absolute bottom-0 left-0 right-0 p-3 text-xs font-medium text-white opacity-0 transition group-hover:opacity-100 sm:text-sm">
                  {t.gallery[photo.id]}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="mt-12 text-center">
          <Link
            href="#contact"
            className="inline-flex items-center gap-2 border-2 border-gold bg-gold px-8 py-4 font-semibold text-burgundy-dark transition hover:bg-gold-light"
          >
            {t.cta}
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
