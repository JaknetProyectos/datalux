"use client";

import { Product } from "@/types/product";
import { useLocale } from "next-intl";
import { useState, useEffect } from "react";


export const servicesDataSpanish: Product[] = [
  {
    id: "1",
    name: "PACK DE ICONOS O ELEMENTOS GRÁFICOS",
    price: 100,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/32508435/pexels-photo-32508435.jpeg?auto=compress,format&w=800&q=75",
    features: ["Diseño de 2 iconos personalizados"],
  },
  {
    id: "2",
    name: "PLANTILLA PERSONALIZADA PARA REDES SOCIALES",
    price: 350,
    currency: "MXN + IVA",
    image: "https://plus.unsplash.com/premium_photo-1684341008757-3b456034e943?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Diseño de 1 plantilla para publicaciones, historias o portadas de Facebook, Instagram, LinkedIn, etc.",
    ],
  },
  {
    id: "3",
    name: "DISEÑO DE 1 PLANTILLA PARA PUBLICACIONES",
    price: 580,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/8886104/pexels-photo-8886104.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Guía descargable con combinaciones de colores y tipografías recomendadas para crear una identidad de marca sólida.",
    ],
  },
  {
    id: "4",
    name: "DISEÑO DE APLICACIONES",
    price: 1108,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/11780441/pexels-photo-11780441.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consultoría: Reunión para entender necesidades y objetivos.",
      "Wireframes Básicos: Bocetos iniciales para 2-3 pantallas.",
      "Diseño de UI: Diseño visual para las pantallas definidas.",
      "Paleta de Colores y Tipografía: Selección de esquema de colores y fuentes.",
      "Prototipo de Baja Fidelidad: Modelo interactivo básico para visualizar navegación.",
      "Revisión: 1-2 rondas de revisiones.",
      "Entrega de Archivos: Archivos en formatos estándar y/o editables. Archivos finales en formatos estándar y editables, junto con documentación completa.",
    ],
  },
  {
    id: "5",
    name: "GRÁFICOS ANIMADOS",
    price: 3800,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/34205960/pexels-photo-34205960.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consultoría: Reunión para entender el objetivo y los requisitos del proyecto.",
      "Animación Básica: Creación de gráficos animados de hasta 30 segundos.",
      "Diseño Gráfico: Diseño de elementos gráficos necesarios para la animación.",
      "Animación en 2D: Animaciones en 2D sin efectos avanzados.",
      "Revisión: 1 ronda de revisión para ajustes menores.",
      "Entrega de Archivo: Archivo final en formatos estándar (MP4, MOV) o en el formato requerido.",
    ],
  },
  {
    id: "6",
    name: "ILUSTRACIÓN E ÍCONOS",
    price: 5400,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/31113917/pexels-photo-31113917.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Ilustraciones Personalizadas: Creación de dos ilustraciones a medida para páginas web, aplicaciones, campañas de marketing, o cualquier otro medio visual.",
      "Diseño de Íconos: Desarrollo de 2 íconos personalizados que reflejen la identidad visual de la marca o el proyecto, adecuados para uso en aplicaciones, sitios web, o materiales impresos.",
      "Variación de Estilos: Ofrecimiento de diferentes estilos de ilustración, desde minimalistas hasta detallados, dependiendo de las necesidades del cliente. (Hasta 4 estilos)",
      "Revisión y Ajustes",
      "Entrega en Formatos Diversos: Entrega de ilustraciones e íconos en diferentes formatos (como PNG, SVG, AI, EPS) para garantizar su uso en diversas aplicaciones.",
    ],
  },
  {
    id: "7",
    name: "DISEÑO DE INTERFACES DE APLICACIONES MÓVILES",
    price: 6500,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Investigación y Análisis",
      "Bocetos Iniciales",
      "Diseño Visual (hasta 2 diseños)",
      "Diseño de Interacción",
      "Pruebas de Usabilidad",
      "Entrega y Documentación",
    ],
  },
  {
    id: "8",
    name: "OPTIMIZACIÓN PARA MÓVILES",
    price: 8120,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/32912373/pexels-photo-32912373.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Elegir uno de los siguientes servicios:",
      "Optimización del Rendimiento",
      "Optimización de la Interfaz de Usuario (UI)",
      "Optimización de la Experiencia del Usuario (UX)",
      "Optimización de Recursos",
      "Pruebas y Depuración",
      "SEO para Móviles (si aplica)",
    ],
  },
  {
    id: "9",
    name: "ASESORÍA EN ESTRATEGIAS DE MARKETING Y DISEÑO",
    price: 10000,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consultoría: Reunión para definir objetivos y necesidades.",
      "Evaluación de Estrategia de Marketing: Análisis de la estrategia actual de marketing, incluyendo revisión de canales y tácticas empleadas.",
      "Recomendaciones de Diseño: Asesoría sobre diseño gráfico básico, incluyendo logotipo, paleta de colores y tipografía.",
      "Plan de Acción: Creación de un plan de acción básico con recomendaciones para mejorar la presencia en línea y en medios impresos.",
      "Sesiones de Asesoría: 2 sesiones de 1 hora cada una, para tratar temas específicos y responder preguntas.",
      "Informe Resumido: Entrega de un informe con recomendaciones generales y estrategias sugeridas.",
      "Soporte: Acceso a soporte por correo electrónico para consultas adicionales durante un mes.",
    ],
  },
  {
    id: "10",
    name: "EMAIL MARKETING",
    price: 10700,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/5706025/pexels-photo-5706025.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consultoría: Reunión para definir objetivos y estrategias básicas de email marketing.",
      "Revisión de Estrategia Actual: Evaluación de las prácticas actuales (si las hay) y recomendaciones para mejoras.",
      "Configuración de Herramientas: Asesoría en la selección y configuración básica de una herramienta de email marketing.",
      "Creación de Plantillas Básicas: Diseño y asesoría en la creación de hasta 2 plantillas básicas de email.",
      "Calendario de Envíos: Recomendaciones para la frecuencia y el calendario de envíos.",
      "Soporte: Asistencia por correo electrónico durante un mes para consultas y ajustes menores.",
    ],
  },
  {
    id: "11",
    name: "MANUAL DE IDENTIDAD",
    price: 12000,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/326512/pexels-photo-326512.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consultoría: Reunión para definir los objetivos y el alcance del manual de identidad.",
      "Investigación y Análisis: Análisis del mercado y competencia para establecer una base sólida.",
      "Diseño de Logotipo: Creación y entrega del logotipo en versiones básicas (color, blanco y negro, y versiones inversas).",
      "Paleta de Colores: Definición de los colores principales y secundarios, junto con sus códigos de color (Pantone, CMYK, RGB, Hex).",
      "Tipografía: Selección y recomendación de fuentes principales y secundarias.",
      "Manual Básico: Documento con especificaciones básicas del logotipo, paleta de colores y tipografía.",
      "Revisión: 1 ronda de revisión para ajustes menores.",
      "Entrega de Archivos: Archivos finales en formatos estándar (AI, EPS, PDF, PNG, JPG).",
    ],
  },
  {
    id: "12",
    name: "DESARROLLO DE PLATAFORMAS",
    price: 18000,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consultoría: Reunión para definir los objetivos y los requisitos de la plataforma.",
      "Diseño de Interfaz (UI): Creación de un diseño básico de interfaz con enfoque en la experiencia del usuario.",
      "Desarrollo Web: Desarrollo de una plataforma web simple con funcionalidades básicas, como un sitio web informativo o una landing page.",
      "Funcionalidades: Implementación de funcionalidades esenciales como formularios de contacto, galerías de imágenes, y enlaces a redes sociales.",
      "Pruebas y Optimización: Pruebas básicas y optimización para asegurar el correcto funcionamiento.",
    ],
  },
  {
    id: "13",
    name: "DISEÑO DE MATERIALES DIGITALES",
    price: 3500,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/13432289/pexels-photo-13432289.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consultoría: Reunión para definir objetivos y necesidades.",
      "Evaluación de Estrategia de Marketing: Análisis de la estrategia actual de marketing, incluyendo revisión de canales y tácticas empleadas.",
      "Recomendaciones de Diseño: Asesoría sobre diseño gráfico básico, incluyendo logotipo, paleta de colores y tipografía.",
      "Plan de Acción: Creación de un plan de acción básico con recomendaciones para mejorar la presencia en línea y en medios impresos.",
      "Sesiones de Asesoría: 2 sesiones de 1 hora cada una, para tratar temas específicos y responder preguntas.",
      "Informe Resumido: Entrega de un informe con recomendaciones generales y estrategias sugeridas.",
      "Soporte: Acceso a soporte por correo electrónico para consultas adicionales durante un mes.",
    ],
  },
];

export const servicesDataEnglish: Product[] = [
  {
    id: "1",
    name: "ICONS OR GRAPHIC ELEMENTS PACK",
    price: 100,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/32508435/pexels-photo-32508435.jpeg?auto=compress,format&w=800&q=75",
    features: ["Design of 2 custom icons"],
  },
  {
    id: "2",
    name: "CUSTOM SOCIAL MEDIA TEMPLATE",
    price: 350,
    currency: "MXN + IVA",
    image: "https://plus.unsplash.com/premium_photo-1684341008757-3b456034e943?q=80&w=1332&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Design of 1 template for posts, stories, or covers for Facebook, Instagram, LinkedIn, etc.",
    ],
  },
  {
    id: "3",
    name: "DESIGN OF 1 TEMPLATE FOR POSTS",
    price: 580,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/8886104/pexels-photo-8886104.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Downloadable guide with recommended color combinations and typography to build a solid brand identity.",
    ],
  },
  {
    id: "4",
    name: "APPLICATION DESIGN",
    price: 1108,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/11780441/pexels-photo-11780441.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consulting: Meeting to understand needs and objectives.",
      "Basic Wireframes: Initial sketches for 2-3 screens.",
      "UI Design: Visual design for the defined screens.",
      "Color Palette and Typography: Selection of color scheme and fonts.",
      "Low-Fidelity Prototype: Basic interactive model to visualize navigation.",
      "Review: 1-2 rounds of revisions.",
      "File Delivery: Files in standard and/or editable formats. Final files in standard and editable formats, along with complete documentation.",
    ],
  },
  {
    id: "5",
    name: "MOTION GRAPHICS",
    price: 3800,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/34205960/pexels-photo-34205960.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consulting: Meeting to understand the project objective and requirements.",
      "Basic Animation: Creation of motion graphics up to 30 seconds.",
      "Graphic Design: Design of graphic elements needed for the animation.",
      "2D Animation: 2D animations without advanced effects.",
      "Review: 1 round of review for minor adjustments.",
      "File Delivery: Final file in standard formats (MP4, MOV) or in the required format.",
    ],
  },
  {
    id: "6",
    name: "ILLUSTRATION AND ICONS",
    price: 5400,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/31113917/pexels-photo-31113917.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Custom Illustrations: Creation of two tailor-made illustrations for web pages, applications, marketing campaigns, or any other visual medium.",
      "Icon Design: Development of 2 custom icons reflecting the visual identity of the brand or project, suitable for use in applications, websites, or printed materials.",
      "Style Variation: Offering different illustration styles, from minimalist to detailed, depending on client needs. (Up to 4 styles)",
      "Review and Adjustments",
      "Delivery in Diverse Formats: Delivery of illustrations and icons in different formats (such as PNG, SVG, AI, EPS) to guarantee their use in various applications.",
    ],
  },
  {
    id: "7",
    name: "MOBILE APPLICATION INTERFACE DESIGN",
    price: 6500,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/273230/pexels-photo-273230.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Research and Analysis",
      "Initial Sketches",
      "Visual Design (up to 2 designs)",
      "Interaction Design",
      "Usability Testing",
      "Delivery and Documentation",
    ],
  },
  {
    id: "8",
    name: "MOBILE OPTIMIZATION",
    price: 8120,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/32912373/pexels-photo-32912373.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Choose one of the following services:",
      "Performance Optimization",
      "User Interface (UI) Optimization",
      "User Experience (UX) Optimization",
      "Resource Optimization",
      "Testing and Debugging",
      "Mobile SEO (if applicable)",
    ],
  },
  {
    id: "9",
    name: "MARKETING AND DESIGN STRATEGY CONSULTING",
    price: 10000,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/3183153/pexels-photo-3183153.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consulting: Meeting to define objectives and needs.",
      "Marketing Strategy Assessment: Analysis of the current marketing strategy, including a review of channels and tactics employed.",
      "Design Recommendations: Advice on basic graphic design, including logo, color palette, and typography.",
      "Action Plan: Creation of a basic action plan with recommendations to improve online and print presence.",
      "Consulting Sessions: 2 sessions of 1 hour each, to address specific topics and answer questions.",
      "Summary Report: Delivery of a report with general recommendations and suggested strategies.",
      "Support: Access to email support for additional inquiries for one month.",
    ],
  },
  {
    id: "10",
    name: "EMAIL MARKETING",
    price: 10700,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/5706025/pexels-photo-5706025.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consulting: Meeting to define objectives and basic email marketing strategies.",
      "Current Strategy Review: Assessment of current practices (if any) and recommendations for improvements.",
      "Tool Setup: Advice on selecting and performing basic setup of an email marketing tool.",
      "Basic Template Creation: Design and guidance in creating up to 2 basic email templates.",
      "Sending Schedule: Recommendations for sending frequency and schedule.",
      "Support: Email assistance for one month for inquiries and minor adjustments.",
    ],
  },
  {
    id: "11",
    name: "IDENTITY MANUAL",
    price: 12000,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/326512/pexels-photo-326512.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consulting: Meeting to define objectives and scope of the identity manual.",
      "Research and Analysis: Market and competitor analysis to establish a solid foundation.",
      "Logo Design: Creation and delivery of the logo in basic versions (color, black and white, and inverse versions).",
      "Color Palette: Definition of primary and secondary colors, along with their color codes (Pantone, CMYK, RGB, Hex).",
      "Typography: Selection and recommendation of primary and secondary fonts.",
      "Basic Manual: Document with basic specifications of the logo, color palette, and typography.",
      "Review: 1 round of review for minor adjustments.",
      "File Delivery: Final files in standard formats (AI, EPS, PDF, PNG, JPG).",
    ],
  },
  {
    id: "12",
    name: "PLATFORM DEVELOPMENT",
    price: 18000,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/6289025/pexels-photo-6289025.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consulting: Meeting to define the objectives and requirements of the platform.",
      "Interface Design (UI): Creation of a basic interface design with a focus on user experience.",
      "Web Development: Development of a simple web platform with basic functionalities, such as an informative website or a landing page.",
      "Functionalities: Implementation of essential functionalities such as contact forms, image galleries, and social media links.",
      "Testing and Optimization: Basic testing and optimization to ensure proper performance.",
    ],
  },
  {
    id: "13",
    name: "DIGITAL MATERIALS DESIGN",
    price: 3500,
    currency: "MXN + IVA",
    image: "https://images.pexels.com/photos/13432289/pexels-photo-13432289.jpeg?auto=compress,format&w=800&q=75",
    features: [
      "Consulting: Meeting to define objectives and needs.",
      "Marketing Strategy Assessment: Analysis of the current marketing strategy, including a review of channels and tactics employed.",
      "Design Recommendations: Advice on basic graphic design, including logo, color palette, and typography.",
      "Action Plan: Creation of a basic action plan with recommendations to improve online and print presence.",
      "Consulting Sessions: 2 sessions of 1 hour each, to address specific topics and answer questions.",
      "Summary Report: Delivery of a report with general recommendations and suggested strategies.",
      "Support: Access to email support for additional inquiries for one month.",
    ],
  },
];

export function useServices() {
  const [services, setServices] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const locale = useLocale()

  const servicesData = locale == "es" ? servicesDataSpanish : servicesDataEnglish;

  useEffect(() => {
    const fetchServices = async () => {
      try {
        // Simular delay de red
        await new Promise((resolve) => setTimeout(resolve, 500));
        setServices(servicesData);
        setLoading(false);
      } catch (err) {
        setError("Error al cargar los servicios");
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return { services, loading, error };
}
