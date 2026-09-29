"use client";

import { useServices } from "@/hooks/useServices";
import { usePackages } from "@/hooks/usePackages";
import { ContactSection } from "@/components/ContactSection";
import { Link } from "@/i18n/routing";
import { useCart } from "@/context/CartContext";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { getOptimizedUrl } from "@/lib/images";
import { formatPrice } from "@/lib/price";

function ServiceCard({
  service,
}: {
  service: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    features: string[];
  };
}) {
  const { addItem } = useCart();
  const t = useTranslations("plans.cards");

  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-slate-200 bg-white transition-all duration-300 hover:border-indigo-200 hover:shadow-xl shadow-md"
    >
      <div>
        <div className="aspect-[16/10] overflow-hidden relative border-b border-slate-100 bg-slate-50">
          <img
            src={service.image}
            alt={service.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold uppercase mb-2 text-slate-900 group-hover:text-[#5352ED] transition-colors tracking-tight">
            {service.name}
          </h3>
          <p className="text-[#5352ED] font-black text-2xl mb-5">
            $ {formatPrice(service.price)} <span className="text-xs text-slate-500 font-medium tracking-wide">{t("taxNote")}</span>
          </p>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            {service.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className="text-[#5352ED] h-5 w-5 shrink-0 stroke-[2.5] bg-indigo-50 rounded-full p-1" />
                <span className="leading-tight pt-0.5">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      <div className="p-6 pt-0 mt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className="w-full bg-[#5352ED] hover:bg-indigo-700 text-white font-bold py-3 px-4 rounded-xl shadow-lg shadow-indigo-500/20 transition-all text-xs uppercase tracking-widest"
          onClick={() => {
            addItem({
              name: service.name,
              currency: service.currency,
              features: service.features,
              id: service.id,
              image: service.image,
              price: service.price,
            }, 1);
          }}
        >
          {t("addToCart")}
        </motion.button>
      </div>
    </motion.div>
  );
}

function PackageCard({
  pkg,
}: {
  pkg: {
    id: string;
    name: string;
    price: number;
    currency: string;
    image: string;
    features: string[];
    highlighted?: boolean;
  };
}) {
  const { addItem } = useCart();
  const t = useTranslations("plans.cards");

  return (
    <motion.div
      whileHover={{ y: -4 }}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white transition-all duration-300 shadow-md hover:shadow-xl ${
        pkg.highlighted 
          ? "border-2 border-[#FFC312] ring-4 ring-[#FFC312]/10" 
          : "border border-slate-200 hover:border-[#FFC312]/50"
      }`}
    >
      {pkg.highlighted && (
        <div className="absolute top-4 right-4 z-10 bg-[#FFC312] text-slate-900 text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-lg shadow-md">
          {t("recommended")}
        </div>
      )}

      <div>
        <div className="aspect-[16/10] overflow-hidden relative border-b border-slate-100 bg-slate-50">
          <img
            src={pkg.image}
            alt={pkg.name}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent" />
        </div>
        <div className="p-6">
          <h3 className="text-xl font-bold uppercase mb-2 text-slate-900 transition-colors tracking-tight">
            {pkg.name}
          </h3>
          <p className="text-slate-900 font-black text-2xl mb-5">
            $ {formatPrice(pkg.price)} <span className="text-xs text-slate-500 font-medium tracking-wide">{t("taxNote")}</span>
          </p>
          <ul className="space-y-3 text-sm font-medium text-slate-600">
            {pkg.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <Check className={`${pkg.highlighted ? "text-[#FFC312] bg-yellow-50" : "text-slate-700 bg-slate-100"} h-5 w-5 shrink-0 stroke-[2.5] rounded-full p-1`} />
                <span className="leading-tight pt-0.5">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="p-6 pt-0 mt-4">
        <motion.button
          whileTap={{ scale: 0.97 }}
          className={`w-full font-bold py-3 px-4 rounded-xl shadow-lg transition-all text-xs uppercase tracking-widest ${
            pkg.highlighted 
              ? "bg-[#FFC312] hover:bg-yellow-400 text-slate-900 shadow-yellow-500/20" 
              : "bg-slate-900 hover:bg-slate-800 text-white shadow-slate-900/20"
          }`}
          onClick={() => {
            addItem({
              name: pkg.name,
              currency: pkg.currency,
              features: pkg.features,
              id: pkg.id,
              image: pkg.image,
              price: pkg.price,
              highlighted: pkg.highlighted,
            }, 1);
          }}
        >
          {t("addToCart")}
        </motion.button>
      </div>
    </motion.div>
  );
}

function LoadingSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm">
      <div className="bg-slate-100 aspect-[16/10]" />
      <div className="p-6 space-y-5">
        <div className="h-6 bg-slate-100 rounded-lg w-3/4" />
        <div className="h-6 bg-slate-100 rounded-lg w-1/3" />
        <div className="space-y-3 pt-4">
          <div className="h-4 bg-slate-100 rounded-md w-full" />
          <div className="h-4 bg-slate-100 rounded-md w-5/6" />
          <div className="h-4 bg-slate-100 rounded-md w-4/6" />
        </div>
        <div className="h-12 bg-slate-100 rounded-xl w-full mt-6" />
      </div>
    </div>
  );
}

export default function SolucionesPage() {
  const t = useTranslations("plans");
  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const { packages, loading: packagesLoading, error: packagesError } = usePackages();

  return (
    <div className="relative min-h-screen text-slate-900 selection:bg-[#FFC312] selection:text-slate-900 font-sans">
      
      {/* Fondo Fijo (Garantiza cobertura total sin importar el largo del contenido) */}
      <div className="fixed inset-0 z-0 bg-slate-50" />
      
      {/* Elementos ambientales fijos */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[20%] -right-[10%] h-[700px] w-[700px] rounded-full bg-indigo-500/5 blur-3xl" />
        <div className="absolute top-[40%] -left-[10%] h-[600px] w-[600px] rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      {/* Contenedor principal relativo para posicionarse sobre el fondo fijo */}
      <div className="relative z-10">
        
        {/* Hero Section */}
        <section className="pt-24 pb-12 lg:pt-32 lg:pb-16 text-center">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-4xl">
            <h1 className="font-black text-4xl md:text-5xl lg:text-6xl mb-6 text-slate-900 tracking-tight">
              {t("services.title")}
            </h1>
            <p className="text-slate-500 text-lg md:text-xl leading-relaxed mx-auto">
              {t("services.description")}
            </p>
          </div>
        </section>

        {/* Services Grid (Diseño Editorial Violeta) */}
        <section className="pb-20">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            {servicesError && (
              <div className="text-center text-red-600 bg-red-50 border border-red-200 font-bold p-4 rounded-xl mb-8">
                {servicesError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {servicesLoading
                ? Array.from({ length: 6 }).map((_, idx) => <LoadingSkeleton key={idx} />)
                : services.map((service) => <ServiceCard key={service.id} service={service} />)}
            </div>
          </div>
        </section>

        {/* Custom Project Section (Editorial Limpio) */}
        <section className="py-20 border-y border-slate-200 bg-white">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-10 relative rounded-2xl overflow-hidden max-w-2xl mx-auto shadow-2xl shadow-slate-900/10">
                <img
                  src={getOptimizedUrl("https://images.pexels.com/photos/9431436/pexels-photo-9431436.jpeg")}
                  alt={t("customProject.imageAlt")}
                  className="w-full h-auto object-cover"
                />
              </div>
              <h2 className="font-black text-3xl md:text-4xl uppercase mb-6 text-slate-900 tracking-tight">
                {t("customProject.title")}
              </h2>
              <p className="text-slate-500 font-medium mb-10 leading-relaxed text-sm md:text-base max-w-2xl mx-auto">
                {t("customProject.description")}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="#contacto"
                  className="w-full sm:w-auto inline-block bg-slate-900 text-white px-8 py-4 rounded-xl font-bold hover:bg-slate-800 transition-all uppercase tracking-widest text-xs shadow-lg shadow-slate-900/20"
                >
                  {t("customProject.buttons.quote")}
                </Link>
                <Link
                  href="/soluciones/personalizada"
                  className="w-full sm:w-auto inline-block border-2 border-slate-200 bg-white text-slate-700 px-8 py-4 rounded-xl font-bold hover:border-[#5352ED] hover:text-[#5352ED] transition-all uppercase tracking-widest text-xs"
                >
                  {t("customProject.buttons.pay")}
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Packages Section (Diseño Premium con Amarillo y Slate) */}
        <section className="py-24">
          <div className="container mx-auto px-4 md:px-6 lg:px-8 max-w-7xl">
            <div className="mb-16 text-center max-w-3xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight">
                {t("packages.title")}
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed">
                {t("packages.description")}
              </p>
            </div>

            {packagesError && (
              <div className="text-center text-red-600 bg-red-50 border border-red-200 font-bold p-4 rounded-xl mb-8">
                {packagesError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {packagesLoading
                ? Array.from({ length: 3 }).map((_, idx) => <LoadingSkeleton key={idx} />)
                : packages.map((pkg) => <PackageCard key={pkg.id} pkg={pkg} />)}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <ContactSection />
        
      </div>
    </div>
  );
}