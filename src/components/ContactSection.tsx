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

// Expresiones regulares para validación
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const PHONE_REGEX = /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/;
const NAME_REGEX = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s'-]+$/;

interface FormErrors {
  nombre?: string;
  email?: string;
  telefono?: string;
  mensaje?: string;
}

export function ContactSection() {
  const t = useTranslations("contact");

  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    mensaje: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const { sendContactForm, isLoading } = useContact();

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Validaciones de Nombre (Min: 2, Max: 50)
    const nombreTrimmed = formData.nombre.trim();
    if (!nombreTrimmed) {
      newErrors.nombre = t("form.errors.nombreRequired");
    } else if (nombreTrimmed.length < 2) {
      newErrors.nombre = t("form.errors.nombreMin");
    } else if (nombreTrimmed.length > 50) {
      newErrors.nombre = t("form.errors.nombreMax");
    } else if (!NAME_REGEX.test(nombreTrimmed)) {
      newErrors.nombre = t("form.errors.nombreInvalid");
    }

    // Validaciones de Email
    const emailTrimmed = formData.email.trim();
    if (!emailTrimmed) {
      newErrors.email = t("form.errors.emailRequired");
    } else if (!EMAIL_REGEX.test(emailTrimmed)) {
      newErrors.email = t("form.errors.emailInvalid");
    }

    // Validaciones de Teléfono (Opcional, pero si se ingresa debe cumplir formato y Max: 20)
    const telefonoTrimmed = formData.telefono.trim();
    if (telefonoTrimmed) {
      const digitsOnly = telefonoTrimmed.replace(/\D/g, "");
      if (!PHONE_REGEX.test(telefonoTrimmed) || digitsOnly.length < 7) {
        newErrors.telefono = t("form.errors.phoneInvalid");
      } else if (telefonoTrimmed.length > 20) {
        newErrors.telefono = t("form.errors.phoneMax");
      }
    }

    // Validaciones de Mensaje (Min: 10, Max: 1000)
    const mensajeTrimmed = formData.mensaje.trim();
    if (!mensajeTrimmed) {
      newErrors.mensaje = t("form.errors.mensajeRequired");
    } else if (mensajeTrimmed.length < 10) {
      newErrors.mensaje = t("form.errors.mensajeMin");
    } else if (mensajeTrimmed.length > 1000) {
      newErrors.mensaje = t("form.errors.mensajeMax");
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("idle");
    setErrorMessage("");

    // Validar antes de enviar
    if (!validateForm()) {
      return;
    }

    const result = await sendContactForm(formData);

    if (result.success) {
      setStatus("success");
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        mensaje: "",
      });
      setErrors({});
      return;
    }

    setStatus("error");
    setErrorMessage(result.error || t("form.errorFallback"));
  };

  const handleChange = (
    field: keyof typeof formData,
    value: string
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Limpia el error del campo cuando el usuario empieza a escribir nuevamente
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <section
      id="contacto"
      className="relative overflow-hidden bg-gradient-to-br from-[#7C3AED] via-[#5352ED] to-[#1D1B4B] py-20 lg:py-32 text-white font-sans"
    >
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
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Nombre */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.name")}{" "}
                  <span className="text-[#5352ED]">*</span>
                </label>
                <input
                  type="text"
                  maxLength={50}
                  placeholder={t("form.placeholders.name")}
                  value={formData.nombre}
                  onChange={(e) => handleChange("nombre", e.target.value)}
                  className={`w-full rounded-2xl border px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 ${
                    errors.nombre
                      ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 bg-slate-50/50 focus:border-[#5352ED] focus:bg-white focus:ring-[#5352ED]/10"
                  }`}
                />
                {errors.nombre && (
                  <p className="mt-1.5 text-xs font-semibold text-red-500">
                    {errors.nombre}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.email")}{" "}
                  <span className="text-[#5352ED]">*</span>
                </label>
                <input
                  type="email"
                  placeholder={t("form.placeholders.email")}
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full rounded-2xl border px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 ${
                    errors.email
                      ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 bg-slate-50/50 focus:border-[#5352ED] focus:bg-white focus:ring-[#5352ED]/10"
                  }`}
                />
                {errors.email && (
                  <p className="mt-1.5 text-xs font-semibold text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Teléfono */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.phone")}
                </label>
                <input
                  type="tel"
                  maxLength={20}
                  placeholder={t("form.placeholders.phone")}
                  value={formData.telefono}
                  onChange={(e) => handleChange("telefono", e.target.value)}
                  className={`w-full rounded-2xl border px-5 py-4 font-medium text-[#111827] placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 ${
                    errors.telefono
                      ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 bg-slate-50/50 focus:border-[#5352ED] focus:bg-white focus:ring-[#5352ED]/10"
                  }`}
                />
                {errors.telefono && (
                  <p className="mt-1.5 text-xs font-semibold text-red-500">
                    {errors.telefono}
                  </p>
                )}
              </div>

              {/* Mensaje */}
              <div>
                <label className="mb-2 block text-xs font-bold text-slate-700">
                  {t("form.placeholders.message")}{" "}
                  <span className="text-[#5352ED]">*</span>
                </label>
                <textarea
                  rows={5}
                  maxLength={1000}
                  placeholder={t("form.placeholders.message")}
                  value={formData.mensaje}
                  onChange={(e) => handleChange("mensaje", e.target.value)}
                  className={`w-full resize-none rounded-2xl border px-5 py-4 font-medium text-slate-900 placeholder:text-slate-400 transition-all focus:outline-none focus:ring-4 ${
                    errors.mensaje
                      ? "border-red-500 bg-red-50/30 focus:border-red-500 focus:ring-red-500/10"
                      : "border-slate-200 bg-slate-50/50 focus:border-[#5352ED] focus:bg-white focus:ring-[#5352ED]/10"
                  }`}
                />
                <div className="mt-1 flex items-center justify-between text-xs">
                  {errors.mensaje ? (
                    <p className="font-semibold text-red-500">
                      {errors.mensaje}
                    </p>
                  ) : (
                    <span />
                  )}
                  <span className="text-slate-400">
                    {formData.mensaje.length}/1000
                  </span>
                </div>
              </div>

              {/* Mensaje de éxito */}
              {status === "success" && (
                <div className="flex items-center gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-bold text-emerald-700 shadow-sm">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-600" />
                  <span>{t("form.successMessage")}</span>
                </div>
              )}

              {/* Mensaje de error general */}
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