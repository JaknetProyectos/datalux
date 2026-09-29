"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Mail,
  Phone,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from "lucide-react";
import { useContact } from "@/hooks/useContact";

export function ContactSection() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [status, setStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const [errorMessage, setErrorMessage] = useState("");

  const { sendContactForm, isLoading } = useContact();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("idle");
    setErrorMessage("");

    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus("success");

      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });

      return;
    }

    setStatus("error");
    setErrorMessage(result.error || t("form.errorFallback"));
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#5352ED] to-[#1D1B4B] py-20 lg:py-32 text-white font-sans"
    >
      {/* Patrón modular sutil de datos en el fondo */}
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container relative z-10 mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div>
            <h2 className="mb-6 text-4xl font-black tracking-tight leading-tight md:text-5xl lg:text-6xl text-white">
              {t("title")}
            </h2>

            <p className="mb-8 max-w-lg text-lg font-medium leading-relaxed text-purple-100/90">
              {t("description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-start gap-4 rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-lg transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5352ED]/10 text-[#5352ED]">
                  <Mail className="h-6 w-6 stroke-[2.5]" />
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    {t("info.email.label")}
                  </h4>

                  <p className="mt-1 font-bold text-slate-900">
                    {t("info.email.value")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-lg transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5352ED]/10 text-[#5352ED]">
                  <Phone className="h-6 w-6 stroke-[2.5]" />
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    {t("info.phone.label")}
                  </h4>

                  <p className="mt-1 font-bold text-slate-900">
                    {t("info.phone.value")}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl bg-white/95 backdrop-blur-md p-5 shadow-lg transition-transform hover:-translate-y-1">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5352ED]/10 text-[#5352ED]">
                  <MapPin className="h-6 w-6 stroke-[2.5]" />
                </div>

                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
                    {t("info.address.label")}
                  </h4>

                  <p className="mt-1 text-sm font-bold leading-relaxed text-slate-900">
                    {t("info.address.value")}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="rounded-3xl border border-white/20 bg-white p-6 shadow-2xl shadow-slate-950/20 lg:p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.name")}{" "}
                  <span className="text-[#5352ED]">*</span>
                </label>
                <input
                  type="text"
                  placeholder={t("form.placeholders.name")}
                  value={formData.nombre}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      nombre: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#5352ED] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5352ED]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.email")}{" "}
                  <span className="text-[#5352ED]">*</span>
                </label>
                <input
                  type="email"
                  placeholder={t("form.placeholders.email")}
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      email: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#5352ED] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5352ED]/10"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.phone")}
                </label>
                <input
                  type="tel"
                  placeholder={t("form.placeholders.phone")}
                  value={formData.telefono}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      telefono: e.target.value,
                    })
                  }
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#5352ED] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5352ED]/10"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.message")}{" "}
                  <span className="text-[#5352ED]">*</span>
                </label>
                <textarea
                  placeholder={t("form.placeholders.message")}
                  rows={5}
                  value={formData.mensaje}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      mensaje: e.target.value,
                    })
                  }
                  className="w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:border-[#5352ED] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#5352ED]/10"
                  required
                />
              </div>

              {status === "success" && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{t("form.successMessage")}</span>
                </div>
              )}

              {status === "error" && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600 shadow-sm">
                  <AlertCircle className="h-5 w-5 shrink-0 text-red-500" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#FFC312] px-6 py-6 text-xs font-black uppercase tracking-widest text-slate-950 shadow-md transition-all duration-300 hover:bg-[#E5AC00] hover:shadow-lg disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-slate-950" />
                    <span>{t("form.buttons.sending")}</span>
                  </>
                ) : (
                  t("form.buttons.send")
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}