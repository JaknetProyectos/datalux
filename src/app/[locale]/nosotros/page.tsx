"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Palette, Image as ImageIcon, Layers } from "lucide-react";
import { motion } from "framer-motion";

export default function NosotrosPage() {
  const t = useTranslations("about");
  const [animateSkills, setAnimateSkills] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimateSkills(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const skills = [
    { name: t("skills.design"), percentage: 100 },
    { name: t("skills.illustrations"), percentage: 100 },
    { name: t("skills.icons"), percentage: 100 },
    { name: t("skills.motion"), percentage: 100 },
  ];

  const specializations = [
    {
      icon: Palette,
      title: t("specializations.branding.title"),
      description: t("specializations.branding.description"),
    },
    {
      icon: ImageIcon,
      title: t("specializations.illustration.title"),
      description: t("specializations.illustration.description"),
    },
    {
      icon: Layers,
      title: t("specializations.interaction.title"),
      description: t("specializations.interaction.description"),
    },
  ];

  const highlights = [
    t("highlights.experience"),
    t("highlights.awards"),
    t("highlights.education"),
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-900 selection:bg-[#FFC312] selection:text-slate-950 font-sans">
      {/* SECCIÓN 1: HERO & ESPECIALIZACIONES (Gradiente Morado Análogo) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#1D1B4B] via-[#2E2A72] to-[#5352ED] pt-20 pb-28 text-white">
        {/* Patrón orgánico de datos / líneas de fondo */}
        <div 
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Hero */}
          <div className="max-w-3xl mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-[#FFC312] block mb-3">
              {t("hero.tag")}
            </span>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6 leading-[1.1]">
              {t("hero.title.part1")} <br className="hidden sm:inline" />
              {t("hero.title.part2")}{" "}
              <span className="text-[#FFC312] underline decoration-[#FFC312]/40 underline-offset-8">
                {t("hero.title.highlight")}
              </span>
            </h1>

            <p className="text-indigo-100 text-lg sm:text-xl font-normal leading-relaxed mb-8 max-w-2xl">
              {t("hero.description")}
            </p>

            <div className="inline-flex items-center gap-3 rounded-full bg-white/10 px-4 py-2 border border-white/15 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-[#FFC312]" />
              <p className="text-xs font-bold tracking-wider uppercase text-white">
                {t("hero.specializationLabel")}
              </p>
            </div>
          </div>

          {/* Tarjetas de Especialidades */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {specializations.map((spec, index) => {
              const Icon = spec.icon;
              return (
                <motion.div
                  key={spec.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.12 }}
                  whileHover={{ y: -4 }}
                  className="group relative flex flex-col justify-between rounded-3xl bg-white p-8 text-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl"
                >
                  <div>
                    <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-[#5352ED]/10 text-[#5352ED] transition-colors group-hover:bg-[#FFC312] group-hover:text-slate-950">
                      <Icon className="h-6 w-6 stroke-[2.2]" />
                    </div>

                    <h3 className="text-xl font-bold tracking-tight mb-3 text-slate-900 transition-colors group-hover:text-[#5352ED]">
                      {spec.title}
                    </h3>

                    <p className="text-slate-600 text-sm leading-relaxed font-normal">
                      {spec.description}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-slate-400 group-hover:text-[#5352ED]">
                    <span>0{index + 1}</span>
                    <span className="h-1 w-8 rounded-full bg-slate-100 group-hover:bg-[#FFC312] transition-colors" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: HISTORIA & COMPETENCIAS (Gradiente Amarillo Análogo CÁLIDO) */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9E6] via-[#FFFEFA] to-[#FFFBEB] py-24 text-slate-900 border-t border-[#FFC312]/20">
        {/* Estructura Modular Orgánica (Líneas de datos sutiles) */}
        <div className="absolute top-0 right-0 -z-0 h-96 w-96 rounded-full bg-[#FFC312]/10 blur-3xl pointer-events-none" />

        <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-12 max-w-2xl">
            <span className="text-xs font-bold uppercase tracking-widest text-[#5352ED] block mb-2">
              {t("history.tag")}
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900">
              {t("history.title.part1")}{" "}
              <span className="text-[#5352ED]">
                {t("history.title.highlight")}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Izquierda: Historia / Descripción */}
            <div className="lg:col-span-6 space-y-6">
              <div className="rounded-3xl border border-amber-200/60 bg-white/80 p-8 shadow-sm backdrop-blur-sm">
                <p className="text-slate-700 leading-relaxed text-base sm:text-lg font-medium">
                  {t("history.description")}
                </p>
              </div>
            </div>

            {/* Derecha: Métricas / Barras de Progreso */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-slate-200/80 bg-white p-8 shadow-md space-y-6">
                {skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold tracking-wider uppercase">
                      <span className="text-slate-600">{skill.name}</span>
                      <span className="text-[#5352ED]">{skill.percentage}%</span>
                    </div>

                    <div className="h-3 w-full rounded-full bg-slate-100 p-0.5 border border-slate-200/60 overflow-hidden">
                      <motion.div
                        className="h-full rounded-full bg-gradient-to-r from-[#5352ED] to-[#3B3B98]"
                        initial={{ width: 0 }}
                        animate={{
                          width: animateSkills ? `${skill.percentage}%` : "0%",
                        }}
                        transition={{ duration: 1, ease: "easeOut" }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Highlights / Destacados en la parte inferior */}
          <div className="mt-16 pt-10 border-t border-amber-200/60">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="flex items-center gap-4 rounded-2xl border border-slate-200/70 bg-white p-5 shadow-xs transition-all hover:border-[#5352ED]/40 hover:shadow-sm"
                >
                  <div className="h-3 w-3 rounded-full bg-[#FFC312] ring-4 ring-[#FFC312]/20 shrink-0" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                    {highlight}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}