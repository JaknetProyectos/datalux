import type { Metadata } from "next";
import { Bagel_Fat_One, Inter, Caveat, Patrick_Hand, Kalam } from "next/font/google";
import "./globals.css";
import { ClientBody } from "./[locale]/ClientBody";

// Configuración de las fuentes de Google
// Fuentes handwriting populares
const headingFont = Caveat({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "600", "700"], // Peso variable
});



export const metadata: Metadata = {
  title: "Datalux | Marketing Digital Integral",
  description:
    "En Datalux, creemos que cada pixel tiene un propósito. Desde branding hasta marketing digital, nuestros expertos están listos para llevar tu proyecto al próximo nivel.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es"
      className={`dark ${headingFont.variable} ${headingFont.variable}`}
    >
      <head>
        {/* Aquí puedes añadir etiquetas adicionales si las necesitas */}
      </head>
      <body
        suppressHydrationWarning
        className="antialiased font-body"
      >
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}