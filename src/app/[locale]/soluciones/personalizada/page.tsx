"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

import {
  ArrowRight,
  AlertCircle,
  Loader2,
  DollarSign,
  FileCheck2
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CustomProductPage() {
  const t = useTranslations("customPlan");
  const router = useRouter();
  const { addItem } = useCart();

  const [quoteNumber, setQuoteNumber] = useState("");
  const [totalPrice, setTotalPrice] = useState<number | "">("");
  const [isAdding, setIsAdding] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const finalPrice = Number(totalPrice) || 0;

    if (!quoteNumber.trim()) {
      setError(t("errors.quoteRequired"));
      return;
    }

    if (finalPrice <= 0) {
      setError(t("errors.invalidAmount"));
      return;
    }

    setIsAdding(true);

    const folioUpper = quoteNumber.trim().toUpperCase();

    addItem(
      {
        image: "/logo.png",
        currency: "MXN + IVA",
        features: [],
        id: `custom-product`,
        name: `Custom - ${folioUpper}`,
        price: finalPrice,
      },
      1
    );

    setTimeout(() => {
      setIsAdding(false);
      router.push("/carrito");
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#FFC312] text-slate-900 overflow-hidden font-sans pb-32 pt-28 sm:pt-36 selection:bg-[#5352ED] selection:text-white">

      {/* Patrón modular sutil de fondo de cuadrícula/datos */}
      <div
        className="absolute inset-0 opacity-15 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0, 0, 0, 0.3) 1px, transparent 1px)`,
          backgroundSize: '36px 36px'
        }}
      />

      {/* Detalle orgánico decorativo superior */}
      <div className="absolute top-0 right-0 h-96 w-96 rounded-bl-full bg-slate-950/10 pointer-events-none transform rotate-12 blur-2xl" />

      <main className="relative z-10 mx-auto max-w-2xl px-4 sm:px-6">

        {/* Tarjeta del formulario (Superficie Blanca Limpia) */}
        <div className="relative rounded-3xl border border-slate-900/10 bg-white p-8 sm:p-12 shadow-2xl shadow-slate-900/10">

          <div className="relative z-10 w-full">
            <div className="mb-8">
              <div className="inline-flex items-center gap-2 rounded-lg bg-[#5352ED]/10 px-3 py-1 text-xs font-black uppercase tracking-widest text-[#5352ED] mb-4">
                <FileCheck2 className="h-3.5 w-3.5" />
                <span>{t("form.badge")}</span>
              </div>

              <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                {t("form.title")}
              </h1>

              <p className="mt-3 text-sm font-medium leading-relaxed text-slate-600">
                {t("authorized.description")}
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-bold text-red-600 shadow-sm">
                  <AlertCircle className="h-4 w-4 shrink-0 text-red-500" />
                  <span>{error}</span>
                </div>
              )}

              {/* Input Folio/Cotización */}
              <div className="space-y-2">
                <label
                  htmlFor="quoteNumber"
                  className="block text-xs font-bold uppercase tracking-widest text-slate-700"
                >
                  {t("form.quoteLabel")} <span className="text-[#5352ED]">*</span>
                </label>

                <input
                  id="quoteNumber"
                  type="text"
                  required
                  placeholder={t("form.quotePlaceholder")}
                  value={quoteNumber}
                  onChange={(e) => setQuoteNumber(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 text-sm font-mono uppercase tracking-widest text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-sans focus:border-[#5352ED] focus:bg-white focus:ring-4 focus:ring-[#5352ED]/10"
                />
              </div>

              {/* Input Monto total */}
              <div className="space-y-2">
                <label
                  htmlFor="totalPrice"
                  className="block text-xs font-bold uppercase tracking-widest text-slate-700"
                >
                  {t("form.amountLabel")} <span className="text-[#5352ED]">*</span>
                </label>

                <div className="relative">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5 text-slate-400">
                    <DollarSign className="h-4 w-4" />
                  </div>

                  <input
                    id="totalPrice"
                    type="number"
                    required
                    step="0.01"
                    min="0.01"
                    placeholder={t("form.amountPlaceholder")}
                    value={totalPrice}
                    onChange={(e) =>
                      setTotalPrice(
                        e.target.value !== "" ? Number(e.target.value) : ""
                      )
                    }
                    className="h-14 w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-11 pr-16 text-sm font-mono font-bold text-slate-900 outline-none transition-all placeholder:text-slate-400 placeholder:font-sans focus:border-[#5352ED] focus:bg-white focus:ring-4 focus:ring-[#5352ED]/10"
                  />

                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-5">
                    <span className="text-xs font-mono font-bold tracking-wider text-slate-400">
                      MXN
                    </span>
                  </div>
                </div>

                <p className="pl-1 text-[11px] font-medium text-slate-500">
                  {t("form.taxNote")}
                </p>
              </div>

              {/* Botón de envío */}
              <div className="pt-4">
                <motion.button
                  whileTap={!isAdding ? { scale: 0.98 } : {}}
                  type="submit"
                  disabled={isAdding}
                  className={[
                    "group flex h-14 w-full items-center justify-center gap-2 rounded-2xl text-xs font-bold uppercase tracking-widest transition-all duration-300",
                    isAdding
                      ? "cursor-not-allowed bg-slate-100 text-slate-400 border border-slate-200"
                      : "bg-[#5352ED] text-white hover:bg-[#403FCE] shadow-lg shadow-[#5352ED]/25",
                  ].join(" ")}
                >
                  {isAdding ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      <span>{t("buttons.adding")}</span>
                    </>
                  ) : (
                    <>
                      <span>{t("buttons.addToCart")}</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </motion.button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}