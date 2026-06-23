"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { siteConfig } from "@/lib/catalog";
import { useDictionary } from "@/lib/i18n/locale-context";

export function ContactForm() {
  const t = useDictionary().footer.contactForm;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`${t.subjectPrefix} - ${name}`);
    const body = encodeURIComponent(
      `${t.nameLabel}: ${name}\n${t.emailLabel}: ${email}\n\n${message}`
    );
    window.location.href = `mailto:${siteConfig.email}?subject=${subject}&body=${body}`;
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-md text-left"
    >
      <h3 className="font-display text-xl font-semibold text-gold-light">
        {t.title}
      </h3>
      <p className="mt-1 text-sm text-sand-200/70">{t.description}</p>
      <div className="mt-4 space-y-3">
        <input
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder={t.namePlaceholder}
          className="w-full border border-gold/30 bg-burgundy-dark/50 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={t.emailPlaceholder}
          className="w-full border border-gold/30 bg-burgundy-dark/50 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
        <textarea
          required
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder={t.messagePlaceholder}
          className="w-full resize-none border border-gold/30 bg-burgundy-dark/50 px-4 py-3 text-sm text-white placeholder:text-white/40 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
        />
        <button
          type="submit"
          className="btn-primary group w-full justify-center"
        >
          {t.submit}
          <Send className="h-4 w-4 transition group-hover:translate-x-1" />
        </button>
      </div>
    </form>
  );
}
