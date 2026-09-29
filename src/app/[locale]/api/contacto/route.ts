import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";

const resend = new Resend(process.env.RESEND_API_KEY);

const SUPPORT_EMAIL = "hello@zenvia.com.mx";
const BRAND_NAME = "Datalux";
const BRAND_URL = "datalux.mx";
const BRAND_LOGO = "https://datalux.mx/title.png";

// Se añade "locale" para evitar que se renderice en los campos dinámicos adicionales
const STANDARD_FIELDS = ["nombre", "email", "mensaje", "asunto", "locale"];

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { nombre, email, mensaje, asunto = "Nuevo mensaje de contacto", locale: bodyLocale } = body;

    // Priorizar el locale enviado desde el frontend. Si no viene, usar fallback de cabecera o "es"
    const acceptLanguage = req.headers.get("accept-language") || "es";
    const fallbackLocale = acceptLanguage.split(",")[0].split("-")[0] || "es";
    const locale = bodyLocale || fallbackLocale;

    // Inicializar traductor con el idioma correcto garantizado
    const t = await getTranslations({ locale, namespace: "ContactEmail" });

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: t("missingFields") },
        { status: 400 }
      );
    }

    // Extraer de forma dinámica cualquier propiedad extra enviada en el lead
    const extraFields = Object.entries(body).filter(
      ([key, val]) => !STANDARD_FIELDS.includes(key) && val !== undefined && val !== null && val !== ""
    );

    // 1. EMAIL PARA EL NEGOCIO (LEAD DE CONTACTO - ESTÉTICA AMARILLA)
    const businessEmailHtml = renderEmailTemplate({
      title: t("businessTitle"),
      subtitle: t("businessSubtitle"),
      nombre,
      email,
      mensaje,
      extraFields,
      isBusiness: true,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Leads <${SUPPORT_EMAIL}>`,
      to: SUPPORT_EMAIL,
      subject: t("businessSubject", { asunto, nombre }),
      html: businessEmailHtml,
    });

    // 2. EMAIL PARA EL CLIENTE (CONFIRMACIÓN DE RECEPCIÓN - ESTÉTICA VIOLETA)
    const clientEmailHtml = renderEmailTemplate({
      title: t("clientTitle"),
      subtitle: t("clientSubtitle"),
      nombre,
      email,
      mensaje,
      extraFields,
      isBusiness: false,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
      to: email,
      subject: t("clientSubject", { brandName: BRAND_NAME }),
      html: clientEmailHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

function renderEmailTemplate({
  title,
  subtitle,
  nombre,
  email,
  mensaje,
  extraFields,
  isBusiness,
  t,
}: {
  title: string;
  subtitle: string;
  nombre: string;
  email: string;
  mensaje: string;
  extraFields: [string, any][];
  isBusiness: boolean;
  t: any;
}) {
  // Paletas tipográficas y de color según destinatario
  const theme = isBusiness
    ? {
        // MODO NEGOCIO / USUARIO (AMARILLO VIBRANTE)
        bgBody: "#fef08a", // yellow-200 (Fondo notorio pero no cegador)
        bgContainer: "#ffffff",
        bgHeader: "#ffffff",
        bgCard: "#fef9c3", // yellow-100
        bgMsg: "#ffffff",
        border: "#fde047", // yellow-300
        borderSubtle: "#fef08a", // yellow-200
        textTitle: "#1c1917", // stone-900
        textSubtitle: "#57534e", // stone-600
        textLabel: "#a16207", // yellow-700 (Alto contraste para legibilidad)
        textValue: "#1c1917", // stone-900
        textSecondary: "#78716c", // stone-500
        shadow: "0 10px 25px -5px rgba(234, 179, 8, 0.2)",
        accentTagBg: "#facc15", // yellow-400
        accentTagText: "#422006", // yellow-950
        accentBorder: "#eab308", // yellow-500
      }
    : {
        // MODO CLIENTE (VIOLETA)
        bgBody: "#ede9fe", // violet-100
        bgContainer: "#ffffff",
        bgHeader: "#ffffff",
        bgCard: "#f5f3ff", // violet-50
        bgMsg: "#ffffff",
        border: "#ddd6fe", // violet-200
        borderSubtle: "#ede9fe", // violet-100
        textTitle: "#0f172a", // slate-900
        textSubtitle: "#475569", // slate-600
        textLabel: "#6d28d9", // violet-700
        textValue: "#0f172a", // slate-900
        textSecondary: "#64748b", // slate-500
        shadow: "0 10px 25px -5px rgba(109, 40, 217, 0.15)",
        accentTagBg: "#c4b5fd", // violet-300
        accentTagText: "#2e1065", // violet-950
        accentBorder: "#8b5cf6", // violet-500
      };

  return `
    <!DOCTYPE html>
    <html lang="${t.locale}">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
      <style>
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
          background-color: ${theme.bgBody};
          margin: 0;
          padding: 0;
          -webkit-font-smoothing: antialiased;
        }
        .wrapper {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
        }
        .container {
          background-color: ${theme.bgContainer};
          border: 1px solid ${theme.border};
          border-radius: 24px;
          box-shadow: ${theme.shadow};
          overflow: hidden;
        }
        .header {
          padding: 32px;
          text-align: center;
          background-color: ${theme.bgHeader};
          border-bottom: 1px solid ${theme.border};
        }
        .logo {
          height: 40px;
          width: auto;
          object-fit: contain;
        }
        .content {
          padding: 40px 32px;
        }
        .badge {
          display: inline-block;
          background-color: ${theme.accentTagBg};
          color: ${theme.accentTagText};
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          border-radius: 9999px;
          padding: 6px 14px;
          margin-bottom: 24px;
        }
        .title {
          font-size: 24px;
          font-weight: 800;
          color: ${theme.textTitle};
          margin: 0 0 8px 0;
          line-height: 1.3;
        }
        .subtitle {
          font-size: 15px;
          color: ${theme.textSubtitle};
          margin: 0 0 32px 0;
          line-height: 1.6;
        }
        .section-header {
          margin-bottom: 16px;
        }
        .section-label {
          font-size: 14px;
          font-weight: 700;
          color: ${theme.textTitle};
          border-bottom: 2px solid ${theme.border};
          padding-bottom: 8px;
          display: block;
        }
        .card {
          background-color: ${theme.bgCard};
          border: 1px solid ${theme.border};
          border-radius: 16px;
          padding: 24px 28px;
          margin-bottom: 32px;
        }
        .field {
          margin-bottom: 20px;
        }
        .field:last-child {
          margin-bottom: 0;
        }
        .label {
          font-size: 11px;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: ${theme.textLabel};
          margin-bottom: 4px;
        }
        .value {
          font-size: 15px;
          color: ${theme.textValue};
          font-weight: 500;
          word-break: break-word;
          line-height: 1.5;
        }
        .msg-box {
          font-size: 15px;
          color: ${theme.textValue};
          line-height: 1.6;
          white-space: pre-wrap;
          background-color: ${theme.bgMsg};
          padding: 20px 24px;
          border-radius: 12px;
          border: 1px solid ${theme.border};
          border-left: 4px solid ${theme.accentBorder};
          font-weight: 400;
          margin-top: 8px;
        }
        .footer {
          text-align: center;
          padding: 32px;
          font-size: 13px;
          font-weight: 500;
          color: ${theme.textSecondary};
          border-top: 1px solid ${theme.border};
          background-color: ${theme.bgContainer};
        }
        .footer a {
          color: ${theme.textLabel};
          text-decoration: none;
          font-weight: 600;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          
          <!-- Header Bar -->
          <div class="header">
            <img src="${BRAND_LOGO}" alt="${BRAND_NAME}" class="logo" />
          </div>

          <!-- Body Content -->
          <div class="content">
            <div class="badge">
              ${isBusiness ? "Nuevo Lead de Contacto" : "Confirmación de Sistema"}
            </div>

            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>

            <div class="section-header">
              <span class="section-label">
                ${isBusiness ? t("applicantDetails") : t("messageSummary")}
              </span>
            </div>
            
            <div class="card">
              <div class="field">
                <div class="label">${t("name")}</div>
                <div class="value">${nombre}</div>
              </div>
              <div class="field">
                <div class="label">${t("email")}</div>
                <div class="value">${email}</div>
              </div>
              
              <!-- Render Dinámico de Cualquier Campo Adicional -->
              ${extraFields.map(([key, value]) => `
                <div class="field">
                  <div class="label">${key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div class="value">${value}</div>
                </div>
              `).join('')}
            </div>

            <div class="section-header">
              <span class="section-label">${t("sentMessage")}</span>
            </div>
            <div class="msg-box">${mensaje}</div>

            ${!isBusiness ? `
              <p style="font-size: 13px; font-weight: 500; color: ${theme.textSecondary}; margin-top: 40px; line-height: 1.6; text-align: center;">
                ${t("automatedDisclaimer")}
              </p>
            ` : ''}
          </div>

          <!-- Footer -->
          <div class="footer">
            © ${new Date().getFullYear()} <a href="https://${BRAND_URL}">${BRAND_NAME}</a>. ${t("allRightsReserved")}<br/>
            <span style="opacity: 0.8; font-size: 12px; display: inline-block; margin-top: 8px;">${t("footerText")}</span>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}