"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ContactSection } from "@/components/ContactSection";
import { motion } from "framer-motion";
import {
  Palette,
  Image as ImageIcon,
  Zap,
} from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";

export default function HomePage() {
  const t = useTranslations("home");

  return (
    <div className="min-h-screen bg-gradient-to-br  bg-[#5352ED]  bg-[length:200%_200%] text-slate-900 overflow-hidden font-sans">
      
      {/* Hero Section - Gradiente animado de morados y violetas (colores análogos) con estructura Datalux */}
      <section className="relative overflow-hidden py-24 lg:py-32 text-white">
        {/* Fondo con Gradiente Morado/Violeta Animado */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-0 bg-gradient-to-br from-[#3b3ac4] via-[#5352ED] to-[#706fd3] bg-[length:200%_200%]"
        />

        {/* Efecto de luz ambiental y textura de datos sutil */}
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.15),transparent_50%)]" />

        <div className="container relative mx-auto px-4 lg:px-8 z-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            
            {/* Left Content */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl font-extrabold leading-[1.15] tracking-tight md:text-5xl lg:text-6xl text-white">
                {t("hero.title.part1")}
                <span className="relative ml-3 inline-block text-[#FFC312]">
                  {t("hero.title.highlight")}
                  
                </span>
                <br />
                {t("hero.title.part2")}
              </h1>

              <p className="mt-6 max-w-xl text-base font-medium text-slate-100/90 md:text-lg leading-relaxed">
                {t("hero.description")}
              </p>
            </motion.div>

            {/* Right Visual */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              className="relative flex justify-center"
            >
              <div className="relative">
         

                {/* Tarjeta de imagen limpia */}
                <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-2xl ring-1 ring-white/20">
                  <img
                    src={getOptimizedUrl("https://images.unsplash.com/vector-1757394158126-c4b2ed81617a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                    alt={t("hero.imageAlt")}
                    className="w-full max-w-[520px] rounded-2xl object-cover"
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Floating Services Bar */}
      <section className="relative z-20 -mt-20 mb-10 px-4 lg:px-8">
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="grid grid-cols-1 gap-4 rounded-3xl bg-white p-5 shadow-xl ring-1 ring-slate-100 md:grid-cols-3"
          >
            <div className="group flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4 transition-all hover:bg-[#5352ED]/5 hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5352ED]/10 text-[#5352ED] transition-colors group-hover:bg-[#5352ED] group-hover:text-white">
                <Palette className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("services.branding.category")}
                </p>
                <p className="font-bold text-slate-900">
                  {t("services.branding.title")}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4 transition-all hover:bg-[#FFC312]/10 hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#FFC312]/20 text-slate-900 transition-colors group-hover:bg-[#FFC312]">
                <ImageIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("services.content.category")}
                </p>
                <p className="font-bold text-slate-900">
                  {t("services.content.title")}
                </p>
              </div>
            </div>

            <div className="group flex items-center gap-4 rounded-2xl bg-slate-50 px-5 py-4 transition-all hover:bg-[#5352ED]/5 hover:shadow-sm">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#5352ED]/10 text-[#5352ED] transition-colors group-hover:bg-[#5352ED] group-hover:text-white">
                <Zap className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {t("services.motion.category")}
                </p>
                <p className="font-bold text-slate-900">
                  {t("services.motion.title")}
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Position Section - Gradiente Amarillo / Cálido Animado (colores análogos) */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Fondo con Gradiente Amarillo Animado (tonos cálidos de amarillo, ámbar y dorado) */}
        <motion.div
          animate={{
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 z-0 bg-gradient-to-r from-[#FFF9E6] via-[#FFEDAD] to-[#FFE58F] bg-[length:200%_200%]"
        />

        <div className="container relative mx-auto px-4 lg:px-8 z-10">
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
            
            {/* Left Image */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-2 lg:order-1"
            >
              <div className="relative mx-auto max-w-md">
                

                <div className="relative overflow-hidden rounded-3xl bg-white p-3 shadow-xl ring-1 ring-amber-200/50">
                  <img
                    src={getOptimizedUrl("https://images.unsplash.com/vector-1757394158534-dcc9f859b472?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")}
                    alt={t("strategy.imageAlt")}
                    className="rounded-2xl w-full"
                  />
                </div>
              </div>
            </motion.div>

            {/* Right Content */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="order-1 lg:order-2"
            >
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#5352ED]">
                {t("strategy.tag")}
              </p>

              <h2 className="text-3xl font-extrabold leading-tight md:text-4xl text-slate-900">
                {t("strategy.title.part1")}
                <span className="text-[#5352ED]"> {t("strategy.title.highlight")}</span>
              </h2>

              <p className="mt-5 max-w-xl text-base font-medium leading-relaxed text-slate-700">
                {t("strategy.description")}
              </p>

              <div className="mt-8">
                <Link
                  href="#contacto"
                  className="inline-flex items-center rounded-2xl bg-[#5352ED] px-8 py-4 text-sm font-bold tracking-wide text-white transition-all hover:bg-[#4342d6] hover:shadow-lg hover:shadow-[#5352ED]/30 active:scale-95"
                >
                  {t("strategy.button")}
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section Wrapper (Intacto) */}
      <section className="relative text-slate-900 overflow-hidden">
        <div className="relative z-10">
          <ContactSection />
        </div>
      </section>

    </div>
  );
}