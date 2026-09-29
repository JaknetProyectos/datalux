"use client";

import { getOptimizedUrl } from "@/lib/images";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check, Sparkles, Layers, ShieldCheck, Palette } from "lucide-react";

const colors = [ 
{ name: "Violet Datalux", hex: "#5352ED" }, 
{ name: "Canary Yellow", hex: "#FFC312" }, 
{ name: "Deep Indigo", hex: "#1D1B4B" }, 
{ name: "Platinum gray", hex: "#F8FAFC" },
];

export default function NuestrosProcesosPage() {
  const t = useTranslations("processes");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans relative overflow-hidden pb-32 selection:bg-[#FFC312] selection:text-slate-950">
      
      {/* Atmósfera Ambiental con Gradientes Soft */}
      <div className="pointer-events-none absolute top-0 left-1/2 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#5352ED]/25 to-[#1D1B4B]/0 blur-[140px]" />
      <div className="pointer-events-none absolute top-[35%] -right-20 h-[600px] w-[600px] rounded-full bg-gradient-to-br from-[#FFC312]/15 to-transparent blur-[150px]" />
      <div className="pointer-events-none absolute bottom-[15%] -left-20 h-[600px] w-[600px] rounded-full bg-gradient-to-tr from-[#5352ED]/20 to-transparent blur-[140px]" />

      {/* Hero Section */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 border-b border-slate-800/80 bg-gradient-to-b from-[#1D1B4B]/60 via-slate-950/80 to-slate-950 backdrop-blur-xl">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFC312]/10 border border-[#FFC312]/20 text-[#FFC312] font-extrabold uppercase tracking-widest text-xs mb-4">
                <Sparkles className="w-3.5 h-3.5" />
                {t("hero.tag")}
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 leading-tight tracking-tight text-white">
                {t("hero.title.part1")} <br className="hidden sm:inline" />
                {t("hero.title.part2")}{" "}
                <span className="bg-gradient-to-r from-[#FFC312] via-yellow-200 to-[#FFC312] bg-clip-text text-transparent">
                  {t("hero.title.highlight")}
                </span>
              </h1>
              <p className="text-slate-300 font-medium leading-relaxed text-lg max-w-lg">
                {t("hero.description")}
              </p>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center lg:justify-end relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-[#5352ED] to-[#FFC312] rounded-3xl blur-xl opacity-30 group-hover:opacity-50 transition duration-500 pointer-events-none" />
              <img
                src={getOptimizedUrl("https://images.unsplash.com/vector-1741240041537-8f76753744c5?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("hero.imageAlt")}
                className="w-full max-w-lg rounded-2xl shadow-2xl relative z-10 border border-slate-800/80 transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Step 1 */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex justify-center"
            >
              <div className="relative p-2 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-800 shadow-2xl max-w-md w-full">
                <img
                  src={getOptimizedUrl("https://images.unsplash.com/vector-1761384981242-d241755c4da4?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("phase1.imageAlt")}
                  className="w-full rounded-2xl object-cover h-full"
                />
              </div>
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-[#5352ED]/30 bg-gradient-to-br from-[#1D1B4B] via-[#2A2875] to-[#5352ED]/80 text-white p-8 lg:p-12 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-[#FFC312] font-black tracking-widest text-xs block mb-3 uppercase">
                <Layers className="w-4 h-4" />
                {t("phase1.tag")}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white tracking-tight">
                {t("phase1.title")}
              </h2>
              <p className="text-slate-200 font-medium leading-relaxed">
                {t("phase1.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Step 2 */}
      <section className="relative py-24 border-y border-slate-800/80 bg-gradient-to-b from-slate-900/60 via-slate-950 to-slate-900/60 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1 relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900/90 to-[#1D1B4B] text-white p-8 lg:p-12 shadow-2xl"
            >
              <div className="flex items-center gap-2 text-[#FFC312] font-black tracking-widest text-xs block mb-3 uppercase">
                <ShieldCheck className="w-4 h-4" />
                {t("phase2.tag")}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white tracking-tight">
                {t("phase2.title")}
              </h2>
              <p className="text-slate-300 font-medium leading-relaxed mb-6">
                {t("phase2.description")}
              </p>
              <ul className="space-y-3.5 text-slate-100 text-sm font-semibold">
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-[#FFC312]/10 text-[#FFC312] mt-0.5 shrink-0">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span>{t("phase2.features.feat1")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-[#FFC312]/10 text-[#FFC312] mt-0.5 shrink-0">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span>{t("phase2.features.feat2")}</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="p-1 rounded-lg bg-[#FFC312]/10 text-[#FFC312] mt-0.5 shrink-0">
                    <Check className="h-4 w-4 stroke-[3]" />
                  </div>
                  <span>{t("phase2.features.feat3")}</span>
                </li>
              </ul>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative p-2 rounded-3xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-800 shadow-2xl max-w-md w-full">
                <img
                  src={getOptimizedUrl("https://images.unsplash.com/vector-1769600501932-672671c4576f?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                  alt={t("phase2.imageAlt")}
                  className="w-full rounded-2xl object-cover h-full"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Process Step 3 - Colors */}
      <section className="relative py-24">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left - Colors Grid */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-2 gap-4"
            >
              {colors.map((color) => (
                <div 
                  key={color.hex} 
                  className="flex flex-col items-center p-6 bg-slate-900/80 border border-slate-800/80 rounded-2xl shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-[#5352ED]/40"
                >
                  <div
                    className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border border-white/20 shadow-inner flex items-center justify-center relative overflow-hidden"
                    style={{ backgroundColor: color.hex }}
                  >
                    <div className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md border border-white/30" />
                  </div>
                  <p className="mt-4 font-bold text-xs uppercase tracking-wider text-slate-200">
                    {color.name}
                  </p>
                  <p className="text-slate-400 text-xs font-mono font-semibold mt-1">{color.hex}</p>
                </div>
              ))}
            </motion.div>

            {/* Right - Content */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative overflow-hidden rounded-3xl border border-[#5352ED]/30 bg-gradient-to-br from-[#1D1B4B] via-[#2A2875] to-[#5352ED]/80 text-white p-8 lg:p-12 shadow-2xl backdrop-blur-md"
            >
              <div className="flex items-center gap-2 text-[#FFC312] font-black tracking-widest text-xs block mb-3 uppercase">
                <Palette className="w-4 h-4" />
                {t("phase3.tag")}
              </div>
              <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-white tracking-tight">
                {t("phase3.title")}
              </h2>
              <p className="text-slate-200 font-medium leading-relaxed">
                {t("phase3.description")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final Result Section */}
      <section className="relative py-20 border-t border-slate-800/80 bg-gradient-to-b from-slate-900/80 to-slate-950 backdrop-blur-md">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-12 text-center"
          >
            <div className="inline-flex flex-col items-center rounded-2xl border border-[#FFC312]/30 bg-gradient-to-r from-[#1D1B4B] via-[#2A2875] to-[#1D1B4B] px-8 py-5 shadow-xl">
              <span className="font-extrabold text-xs mb-1 uppercase tracking-widest text-[#FFC312]">
                {t("result.tag")}
              </span>
              <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                {t("result.title")}
              </h2>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-xl group"
            >
              <img
                src={getOptimizedUrl("https://images.unsplash.com/vector-1774785392925-e3efa06c4f4c?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("result.images.processAlt")}
                className="w-full object-cover h-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-2 shadow-xl group"
            >
              <img
                src={getOptimizedUrl("https://images.unsplash.com/vector-1786212331905-6e71f1af71b8?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                alt={t("result.images.appAlt")}
                className="w-full object-cover h-auto rounded-xl transition-transform duration-500 group-hover:scale-[1.01]"
              />
            </motion.div>
          </div>

          {/* Large final image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-8 overflow-hidden rounded-2xl border border-slate-800 bg-slate-900 p-2 max-w-4xl mx-auto shadow-xl group"
          >
            <img
              src={getOptimizedUrl("https://images.unsplash.com/vector-1761384981242-d241755c4da4?q=80&w=1172&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
              alt={t("result.images.fullAlt")}
              className="w-full h-auto rounded-xl mx-auto transition-transform duration-500 group-hover:scale-[1.01]"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}