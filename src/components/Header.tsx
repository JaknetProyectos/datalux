"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

import {
  Home,
  Building2,
  Layers3,
  Workflow,
  ShoppingCart,
  Languages,
  Menu,
  X,
} from "lucide-react";

import { useCart } from "@/context/CartContext";
import { useLocaleContext } from "@/context/LangContext";

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const { itemCount } = useCart();
  const { locale, switchLanguage } = useLocaleContext();

  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("nav.home"), icon: Home },
    { href: "/nosotros", label: t("nav.about"), icon: Building2 },
    { href: "/soluciones", label: t("nav.solutions"), icon: Layers3 },
    { href: "/nuestros-procesos", label: t("nav.processes"), icon: Workflow },
  ];

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-100 bg-white/95 backdrop-blur-md transition-all duration-200">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Logo e Identidad Visual Datalux */}
        <Link href="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ scale: 1.03, rotate: -1 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-3 rounded-2xl bg-slate-50 p-2 transition-colors group-hover:bg-[#5352ED]/5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-slate-100 transition-all group-hover:shadow-md">
              <img
                src="/logo.png"
                alt={t("logoAlt")}
                className="h-7 w-7 object-contain"
              />
            </div>
            <img
              src="/title.png"
              alt={t("titleAlt")}
              className="h-7 w-auto object-contain"
            />
          </motion.div>
        </Link>

        {/* Navegación Horizontal Escritorio */}
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;

            return (
              <Link key={link.href} href={link.href} className="relative py-1 px-1">
                <motion.div
                  whileHover={{ y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className={`relative flex items-center gap-2.5 rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? "text-white shadow-sm"
                      : "text-slate-700 hover:bg-slate-50 hover:text-[#5352ED]"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="header-active-pill"
                      className="absolute inset-0 rounded-full bg-[#5352ED]"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                      }}
                    />
                  )}

                  <Icon
                    className={`relative z-10 h-4 w-4 shrink-0 transition-colors duration-200 ${
                      isActive ? "text-[#FFC312]" : "text-slate-400 group-hover:text-[#5352ED]"
                    }`}
                  />

                  <span className="relative z-10 tracking-tight">
                    {link.label}
                  </span>
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Acciones de la Derecha (Idioma y Carrito) - Escritorio */}
        <div className="hidden items-center gap-3 md:flex">
          {/* Selector de Idioma */}
          <motion.button
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => switchLanguage(locale === "es" ? "en" : "es")}
            className="flex h-11 items-center gap-2.5 rounded-full border border-slate-200/80 bg-slate-50/80 px-4 text-xs font-bold text-slate-700 transition-all hover:border-[#5352ED]/30 hover:bg-white hover:shadow-sm"
            aria-label={t("changeLanguage")}
            title={t("changeLanguage")}
          >
            <Languages className="h-4 w-4 text-[#5352ED]" />
            <span className="text-slate-800">{locale === "es" ? "Español" : "English"}</span>
            <span className="ml-0.5 rounded-md bg-[#5352ED]/10 px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wider text-[#5352ED]">
              {locale}
            </span>
          </motion.button>

          {/* Carrito de Compras en Amarillo Datalux (#FFC312) con acento contrastante */}
          <Link href="/carrito">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="relative flex h-11 items-center gap-2.5 rounded-full bg-[#FFC312] px-5 font-bold text-slate-900 shadow-sm transition-all hover:bg-[#ffcd38] hover:shadow-md"
            >
              <ShoppingCart className="h-4 w-4 text-slate-950" />
              <span className="text-sm font-bold tracking-tight">{t("cart")}</span>

              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-[#5352ED] px-1.5 text-[11px] font-extrabold text-white shadow-xs"
                >
                  {itemCount}
                </motion.span>
              )}
            </motion.div>
          </Link>
        </div>

        {/* Botón Menú Móvil */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/carrito" className="mr-1">
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#FFC312] text-slate-950">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#5352ED] text-[10px] font-extrabold text-white">
                  {itemCount}
                </span>
              )}
            </div>
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-slate-800 transition-colors hover:bg-slate-200"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Drawer desplegable Móvil */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-slate-950/40 backdrop-blur-sm md:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 flex w-full max-w-xs flex-col justify-between bg-white p-6 shadow-2xl md:hidden"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <img src="/logo.png" alt={t("logoAlt")} className="h-7 w-7 object-contain" />
                    <img src="/title.png" alt={t("titleAlt")} className="h-5 w-auto" />
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-600 transition-colors hover:bg-slate-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;

                    return (
                      <Link key={link.href} href={link.href}>
                        <div
                          className={`flex h-12 items-center gap-3.5 rounded-2xl px-4 font-semibold transition-all ${
                            isActive
                              ? "bg-[#5352ED] text-white"
                              : "text-slate-700 hover:bg-slate-50"
                          }`}
                        >
                          <Icon className={`h-5 w-5 ${isActive ? "text-[#FFC312]" : "text-slate-400"}`} />
                          <span className="text-sm">{link.label}</span>
                        </div>
                      </Link>
                    );
                  })}
                </nav>
              </div>

              <div className="space-y-3 pt-6 border-t border-slate-100">
                <button
                  onClick={() => switchLanguage(locale === "es" ? "en" : "es")}
                  className="flex h-12 w-full items-center justify-between rounded-2xl bg-slate-100 px-4 text-sm font-bold text-slate-800 transition-colors hover:bg-slate-200"
                  aria-label={t("changeLanguage")}
                  title={t("changeLanguage")}
                >
                  <div className="flex items-center gap-2.5">
                    <Languages className="h-4 w-4 text-[#5352ED]" />
                    <span>{locale === "es" ? "Español" : "English"}</span>
                  </div>
                  <span className="rounded-md bg-white px-2 py-0.5 text-xs font-black uppercase text-[#5352ED]">
                    {locale}
                  </span>
                </button>

                <Link href="/carrito" className="block w-full">
                  <div className="flex h-12 w-full items-center justify-between rounded-2xl bg-[#FFC312] px-4 font-bold text-slate-950 shadow-sm">
                    <div className="flex items-center gap-2.5">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="text-sm">{t("cart")}</span>
                    </div>
                    {itemCount > 0 && (
                      <span className="flex h-6 min-w-[24px] items-center justify-center rounded-full bg-[#5352ED] px-2 text-xs font-black text-white">
                        {itemCount}
                      </span>
                    )}
                  </div>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}