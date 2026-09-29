"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  FileText,
  RotateCcw,
} from "lucide-react";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative overflow-hidden rounded-none bg-gradient-to-b from-[#1D1B4B] to-[#121033] pt-16 text-slate-300 font-sans border-t border-indigo-900/40">
      {/* Patrón modular sutil de datos en el fondo */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.3) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10 mx-auto px-6 pb-10 lg:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          
          {/* Legal */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-[#FFC312]">
              {t("legal.title")}
            </h3>

            <div className="space-y-3">
              <Link
                href="/legal/terminos"
                className="group flex items-center gap-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-[#5352ED] transition-colors group-hover:bg-[#5352ED] group-hover:text-white">
                  <FileText className="h-4 w-4" />
                </div>
                {t("legal.terms")}
              </Link>

              <Link
                href="/legal/reembolsos"
                className="group flex items-center gap-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-[#5352ED] transition-colors group-hover:bg-[#5352ED] group-hover:text-white">
                  <RotateCcw className="h-4 w-4" />
                </div>
                {t("legal.refunds")}
              </Link>

              <Link
                href="/legal/privacidad"
                className="group flex items-center gap-3 text-sm font-medium text-slate-300 transition-colors hover:text-white"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-[#5352ED] transition-colors group-hover:bg-[#5352ED] group-hover:text-white">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                {t("legal.privacy")}
              </Link>
            </div>

            <div className="mt-8">
              <img
                src="/cards.png"
                alt={t("legal.paymentAlt")}
                className="h-12 w-auto opacity-90"
              />
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-6 text-xs font-black uppercase tracking-widest text-[#FFC312]">
              {t("contact.title")}
            </h3>

            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-[#FFC312]">
                  <Phone className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("contact.phoneLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-white">
                    5550881886
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-[#5352ED]">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("contact.addressLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-medium leading-relaxed text-slate-300">
                    {t("contact.addressLine1")},
                    <br />
                    {t("contact.addressLine2")}
                    <br />
                    {t("contact.addressLine3")},
                    <br />
                    {t("contact.addressLine4")}
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-950/80 border border-indigo-800/50 text-[#FFC312]">
                  <Mail className="h-5 w-5" />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {t("contact.emailLabel")}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-white">
                    ayuda@datalux.mx
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Brand */}
          <div className="flex flex-col items-center justify-center md:items-end">
            <div className="flex items-center gap-3 rounded-2xl bg-indigo-950/60 px-6 py-5 shadow-inner backdrop-blur-md border border-indigo-800/50">
              <img
                src="/logo.png"
                alt="Datalux"
                className="h-8 invert brightness-0 w-auto"
              />

              <img
                src="/title.png"
                alt="Datalux"
                className="h-8 invert brightness-0 w-auto"
              />
            </div>

            <p className="mt-5 max-w-xs text-center text-xs font-medium text-slate-400 md:text-right leading-relaxed">
              {t("brand.tagline")}
            </p>
          </div>

        </div>

        {/* Copyright */}
        <div className="mt-12 border-t border-indigo-900/60 pt-8 text-center text-xs font-medium text-slate-400">
          © {new Date().getFullYear()} Datalux. {t("copyright")}
        </div>
      </div>
    </footer>
  );
}