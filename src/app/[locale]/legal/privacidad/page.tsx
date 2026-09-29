"use client";

import LegalStyle from "@/components/LegalStyle";
import { useLocale } from "next-intl";

function LegalEs() {
  return (
    <div className="legal-container">
      <LegalStyle />

      <section>
        <h1>POLÍTICA DE PRIVACIDAD</h1>

        <p>De acuerdo con lo dispuesto por la Ley Federal de Protección de Datos Personales en Posesión de los Particulares, ESTRATEGIAS PIXPEAK S.A. DE C.V. (en adelante "Datalux") informa los términos y condiciones aplicables a los datos personales proporcionados a nuestra empresa.</p>

        <h2>Recopilación de Datos</h2>
        <p>Los datos personales recopilados (Nombre Completo, Correo Electrónico, Número Telefónico, y Detalles de Facturación) se obtienen a través de medios electrónicos, incluyendo formularios y correos electrónicos. Estos datos serán tratados para fines de identificación, promoción y comercialización de nuestros servicios, de acuerdo con nuestro objeto social.</p>

        <h2>Uso de los Datos</h2>
        <p>El uso de los datos personales recabados incluye, pero no se limita a, de identificación, promoción y comercialización de los servicios ofrecidos por Datalux, tales como Diseño de Aplicaciones, Gráficos Animados, Ilustraciones e Íconos, Manual de Identidad, Diseño de Interfaces de Aplicaciones Móviles, Desarrollo de Plataformas, Diseño de Materiales Digitales, Asesoría en Estrategias de Marketing, Email Marketing, y Optimización para Móviles.</p>

        <h2>Transferencia de Datos</h2>
        <p>Datalux podrá transferir sus datos personales a terceros, nacionales o extranjeros, siempre que los datos sean utilizados para los fines señalados en este aviso. En caso de transferencia de datos personales sensibles, se requerirá su autorización por escrito.</p>

        <h2>Medidas de Seguridad</h2>
        <p>Datalux cuenta con medidas de seguridad técnicas, físicas y administrativas para proteger sus datos personales y limitar su uso o divulgación no autorizada.</p>

        <h2>Derechos ARCO</h2>
        <p>El titular de los datos personales podrá ejercer los derechos de Acceso, Rectificación, Cancelación y Oposición (ARCO), así como los derechos de divulgación y limitación de uso, o la revocación del consentimiento, en cualquier momento. Las solicitudes deben dirigirse a ayuda@datalux.mx, proporcionando domicilio y/o correo electrónico para notificaciones, y documentos que acrediten la titularidad de los datos.</p>

        <h2>Modificaciones al Aviso de Privacidad</h2>
        <p>Datalux se reserva el derecho de efectuar modificaciones o actualizaciones a este aviso de privacidad, las cuales serán informadas a través de nuestra página web, correo electrónico, o cualquier otro medio autorizado.</p>

        <h2>Consentimiento del Usuario</h2>
        <p>Al utilizar o contratar los servicios ofrecidos por Datalux, el usuario manifiesta su acuerdo expreso con esta política de privacidad, confirmando que ha leído, entendido y aceptado plenamente los términos y condiciones aquí descritos.</p>

        <p>Para cualquier duda o aclaración respecto a este aviso de privacidad, por favor contacte a Datalux a través del correo ayuda@datalux.mx</p>
      </section>

    </div>
  );
}

function LegalEn() {
  return (
    <div className="legal-container">
      <LegalStyle />
      <section>
        <h1>PRIVACY POLICY</h1>

        <p>In accordance with the provisions of the Federal Law on the Protection of Personal Data Held by Private Parties, ESTRATEGIAS PIXPEAK S.A. DE C.V. (hereinafter "Datalux") informs the terms and conditions applicable to the personal data provided to our company.</p>

        <h2>Data Collection</h2>
        <p>The personal data collected (Full Name, Email Address, Telephone Number, and Billing Details) is obtained through electronic means, including forms and emails. This data will be processed for the purposes of identification, promotion, and commercialization of our services, in accordance with our corporate purpose.</p>

        <h2>Use of the Data</h2>
        <p>The use of the personal data collected includes, but is not limited to, identification, promotion, and commercialization of the services offered by Datalux, such as Application Design, Animated Graphics, Illustrations and Icons, Identity Manual, Mobile Application Interface Design, Platform Development, Digital Materials Design, Marketing Strategy Consulting, Email Marketing, and Mobile Optimization.</p>

        <h2>Data Transfer</h2>
        <p>Datalux may transfer your personal data to third parties, national or foreign, provided that the data is used for the purposes indicated in this notice. In the case of transfer of sensitive personal data, your written authorization will be required.</p>

        <h2>Security Measures</h2>
        <p>Datalux has technical, physical, and administrative security measures to protect your personal data and limit its unauthorized use or disclosure.</p>

        <h2>ARCO Rights</h2>
        <p>The holder of the personal data may exercise the rights of Access, Rectification, Cancellation, and Opposition (ARCO), as well as the rights of disclosure and limitation of use, or the revocation of consent, at any time. Requests must be directed to ayuda@datalux.mx, providing an address and/or email for notifications, and documents that prove ownership of the data.</p>

        <h2>Modifications to the Privacy Notice</h2>
        <p>Datalux reserves the right to make modifications or updates to this privacy notice, which will be informed through our website, email, or any other authorized means.</p>

        <h2>User Consent</h2>
        <p>By using or contracting the services offered by Datalux, the user manifests their express agreement with this privacy policy, confirming that they have read, understood, and fully accepted the terms and conditions described herein.</p>

        <p>For any questions or clarifications regarding this privacy notice, please contact Datalux through the email ayuda@datalux.mx</p>
      </section>
    </div>
  );
}

export default function LegalPage() {
  const locale = useLocale();

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <main className="flex-grow container mx-auto px-6 py-20 max-w-4xl">
        {locale === "es" ? <LegalEs /> : <LegalEn />}
      </main>
    </div>
  );
}