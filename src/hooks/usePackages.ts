"use client";


import { getOptimizedUrl } from "@/lib/images";
import { Product } from "@/types/product";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";



export const packagesDataSpanish: Product[] = [
  {
    id: "basic",
    name: "Paquete Básico Premium",
    price: 75000,
    currency: "MXN + IVA",
    image: getOptimizedUrl("https://images.pexels.com/photos/7706930/pexels-photo-7706930.jpeg"),
    features: [
      "Consultoría Integral: Revisión exhaustiva y planificación estratégica a largo plazo.",
      "Gestión de Redes Sociales: Creación y gestión de contenido para hasta 5 plataformas principales con publicaciones diarias.",
      "Publicidad en Redes Sociales: Gestión de campañas publicitarias con un presupuesto más alto y segmentación avanzada.",
      "SEO Avanzado: Optimización avanzada del sitio web, incluyendo análisis y ajustes continuos, y estrategia de link-building intensiva.",
      "Marketing de Contenidos: Creación y publicación de contenido de alta calidad (blogs, artículos, infografías, videos) 4-5 veces al mes.",
      "Email Marketing Avanzado: Creación de campañas de email marketing segmentadas y automatizadas.",
      "Analítica y Reportes Avanzados: Análisis profundo del rendimiento con reportes quincenales y recomendaciones estratégicas.",
      "Gestión de PPC (Google Ads): Creación y gestión de campañas publicitarias en Google Ads con presupuesto incluido.",
      "Revisión y Ajustes: Revisión mensual, con ajustes proactivos y optimización continua.",
      "Entrega de Informe Exhaustivo: Informes detallados sobre todas las actividades, incluyendo insights y análisis.",
    ],
  },
  {
    id: "intermediate",
    name: "Paquete Intermedio Premium",
    price: 100000,
    currency: "MXN + IVA",
    image: getOptimizedUrl("https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    highlighted: true,
    features: [
      "Consultoría Estratégica Avanzada: Estrategia integral con planificación a largo plazo y estudios de mercado detallados.",
      "Gestión Completa de Redes Sociales: Creación, gestión y optimización de contenido para todas las principales plataformas con publicaciones diarias y estrategias de crecimiento.",
      "Publicidad en Redes Sociales y Google Ads: Gestión de campañas publicitarias en redes sociales y Google Ads con presupuesto alto y estrategias avanzadas de segmentación.",
      "SEO Completo: Optimización integral del sitio web, incluyendo auditorías continuas, optimización técnica, y estrategia de link-building avanzada.",
      "Marketing de Contenidos Extensivo: Creación y publicación de contenido premium (blogs, artículos, infografías, videos, e-books) 6-8 veces al mes.",
      "Email Marketing Avanzado y Automatización: Campañas de email marketing avanzadas con automatización y segmentación detallada.",
      "Analítica y Reportes Detallados: Análisis avanzado del rendimiento con reportes semanales y recomendaciones estratégicas.",
      "Gestión de PPC y Display Ads: Creación y gestión de campañas de PPC en Google Ads y anuncios display con presupuesto alto.",
      "Revisión y Ajustes Continuos: Revisión y ajuste continuo de estrategias con optimización diaria o semanal según sea necesario.",
      "Entrega de Informe Completo: Informes exhaustivos con análisis detallado, insights y recomendaciones de mejoras continuas.",
    ],
  },
  {
    id: "elite",
    name: "Paquete Elite",
    price: 150000,
    currency: "MXN + IVA",
    image: getOptimizedUrl("https://plus.unsplash.com/premium_photo-1683872921964-25348002a392?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    features: [
      "Consultoría Estratégica de Alto Nivel: Planificación exhaustiva y asesoramiento continuo con enfoque en objetivos a largo plazo.",
      "Gestión Integral de Redes Sociales y Estrategias de Crecimiento: Creación y gestión de contenido para todas las plataformas principales con estrategias avanzadas de crecimiento e interacción.",
      "Publicidad Multicanal: Gestión de campañas publicitarias en redes sociales, Google Ads, y otras plataformas relevantes con presupuesto considerable.",
      "SEO y SEM Avanzado: Estrategias avanzadas de SEO y SEM, incluyendo auditorías completas, optimización técnica, y análisis competitivo.",
      "Marketing de Contenidos Premium: Creación de contenido de alto valor (videos, infografías, whitepapers) con frecuencia mensual y distribución estratégica.",
      "Email Marketing Completo y Automatización Avanzada: Implementación de campañas de email marketing avanzadas y automatización con personalización detallada.",
      "Analítica Avanzada y Optimización de Campañas: Análisis continuo con reportes detallados y ajustes basados en datos en tiempo real.",
      "Gestión de PPC y Publicidad Programática: Estrategias avanzadas para PPC y publicidad programática con presupuestos altos y segmentación precisa.",
      "Soporte y Revisión Continuos: Revisión y ajuste continuo de estrategias con soporte integral y consultoría proactiva.",
      "Entrega de Informe Estratégico: Informes completos con análisis detallado de todos los aspectos de marketing, con recomendaciones estratégicas y plan de acción.",
    ],
  },
];

export const packagesDataEnglish: Product[] = [
  {
    id: "basic",
    name: "Premium Basic Package",
    price: 75000,
    currency: "MXN + IVA",
    image: getOptimizedUrl("https://images.pexels.com/photos/7706930/pexels-photo-7706930.jpeg"),
    features: [
      "Comprehensive Consulting: Thorough review and long-term strategic planning.",
      "Social Media Management: Content creation and management for up to 5 major platforms with daily postings.",
      "Social Media Advertising: Ad campaign management with a higher budget and advanced targeting.",
      "Advanced SEO: Advanced website optimization, including continuous analysis and adjustments, and an intensive link-building strategy.",
      "Content Marketing: Creation and publication of high-quality content (blogs, articles, infographics, videos) 4-5 times a month.",
      "Advanced Email Marketing: Creation of segmented and automated email marketing campaigns.",
      "Advanced Analytics and Reporting: Deep performance analysis with bi-weekly reports and strategic recommendations.",
      "PPC Management (Google Ads): Creation and management of advertising campaigns in Google Ads with budget included.",
      "Review and Adjustments: Monthly review with proactive adjustments and continuous optimization.",
      "Comprehensive Report Delivery: Detailed reports on all activities, including insights and analysis.",
    ],
  },
  {
    id: "intermediate",
    name: "Premium Intermediate Package",
    price: 100000,
    currency: "MXN + IVA",
    image: getOptimizedUrl("https://plus.unsplash.com/premium_photo-1683980578016-a1f980719ec2?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    highlighted: true,
    features: [
      "Advanced Strategic Consulting: Comprehensive strategy with long-term planning and detailed market research.",
      "Full Social Media Management: Content creation, management, and optimization for all major platforms with daily postings and growth strategies.",
      "Social Media & Google Ads Advertising: Ad campaign management on social media and Google Ads with a high budget and advanced targeting strategies.",
      "Full SEO: Comprehensive website optimization, including continuous audits, technical optimization, and an advanced link-building strategy.",
      "Extensive Content Marketing: Creation and publication of premium content (blogs, articles, infographics, videos, e-books) 6-8 times a month.",
      "Advanced Email Marketing & Automation: Advanced email marketing campaigns with automation and detailed segmentation.",
      "Detailed Analytics and Reporting: Advanced performance analysis with weekly reports and strategic recommendations.",
      "PPC & Display Ads Management: Creation and management of PPC campaigns in Google Ads and display ads with a high budget.",
      "Continuous Review and Adjustments: Ongoing review and adjustment of strategies with daily or weekly optimization as needed.",
      "Full Report Delivery: Comprehensive reports with detailed analysis, insights, and continuous improvement recommendations.",
    ],
  },
  {
    id: "elite",
    name: "Elite Package",
    price: 150000,
    currency: "MXN + IVA",
    image: getOptimizedUrl("https://plus.unsplash.com/premium_photo-1683872921964-25348002a392?q=80&w=735&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"),
    features: [
      "High-Level Strategic Consulting: Thorough planning and continuous advice focusing on long-term objectives.",
      "Comprehensive Social Media Management & Growth Strategies: Content creation and management for all major platforms with advanced growth and engagement strategies.",
      "Multichannel Advertising: Ad campaign management on social media, Google Ads, and other relevant platforms with a substantial budget.",
      "Advanced SEO & SEM: Advanced SEO and SEM strategies, including complete audits, technical optimization, and competitive analysis.",
      "Premium Content Marketing: High-value content creation (videos, infographics, whitepapers) with monthly frequency and strategic distribution.",
      "Full Email Marketing & Advanced Automation: Implementation of advanced email marketing campaigns and automation with detailed personalization.",
      "Advanced Analytics & Campaign Optimization: Continuous analysis with detailed reports and real-time data-driven adjustments.",
      "PPC & Programmatic Advertising Management: Advanced strategies for PPC and programmatic advertising with high budgets and precise targeting.",
      "Continuous Support & Review: Ongoing review and adjustment of strategies with comprehensive support and proactive consulting.",
      "Strategic Report Delivery: Complete reports with detailed analysis of all marketing aspects, strategic recommendations, and action plans.",
    ],
  },
];

export function usePackages() {
  const [packages, setPackages] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale()

  const packagesData = locale == "es" ? packagesDataSpanish : packagesDataEnglish;

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 600));
        setPackages(packagesData);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los paquetes");
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return { packages, loading, error };
}
