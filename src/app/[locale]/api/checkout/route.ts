import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getTranslations } from "next-intl/server";
import { formatPrice } from "@/lib/price";

const resend = new Resend(process.env.RESEND_API_KEY);

// Variables de configuración globales
const SUPPORT_EMAIL = "ayuda@datalux.mx";
const BRAND_NAME = "Datalux";
const BRAND_URL = "datalux.mx";
const BRAND_LOGO = "https://datalux.mx/title.png";
const BRAND_BANNER = "https://images.unsplash.com/vector-1761241351767-4327b53d6091?q=80&w=1861&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { orderId, amount, customer, items, metadata, locale: bodyLocale } = body;

    // Priorizar el locale enviado desde el frontend o usar fallback
    const acceptLanguage = req.headers.get("accept-language") || "es";
    const fallbackLocale = acceptLanguage.split(",")[0].split("-")[0] || "es";
    const locale = bodyLocale || fallbackLocale;

    // Inicializar traductor de next-intl en server-side
    const t = await getTranslations({ locale, namespace: "PurchaseReceipt" });

    if (!orderId || !amount || !customer || !items) {
      return NextResponse.json(
        { error: t("missingFields") },
        { status: 400 }
      );
    }

    // 1. EMAIL PARA EL CLIENTE (TICKET / RECIBO DE COMPRA - ESTÉTICA VIOLETA)
    const clientReceiptHtml = renderReceiptTemplate({
      title: t("clientTitle"),
      subtitle: t("clientSubtitle", { orderId }),
      orderId,
      amount,
      customer,
      items,
      metadata,
      isBusiness: false,
      locale,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} <${SUPPORT_EMAIL}>`,
      to: customer.email,
      subject: t("clientSubject", { orderId, brandName: BRAND_NAME }),
      html: clientReceiptHtml,
    });

    // 2. EMAIL PARA EL NEGOCIO (NOTIFICACIÓN DE VENTA - ESTÉTICA AMARILLA)
    const businessNotificationHtml = renderReceiptTemplate({
      title: t("businessTitle"),
      subtitle: t("businessSubtitle", { amount: amount.toFixed(2) }),
      orderId,
      amount,
      customer,
      items,
      metadata,
      isBusiness: true,
      locale,
      t,
    });

    await resend.emails.send({
      from: `${BRAND_NAME} Sales <${SUPPORT_EMAIL}>`,
      to: SUPPORT_EMAIL,
      subject: t("businessSubject", { orderId, amount: amount.toFixed(2) }),
      html: businessNotificationHtml,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Error interno del servidor" },
      { status: 500 }
    );
  }
}

// Helper para generar el HTML del ticket con diseño moderno y limpio
function renderReceiptTemplate({
  title,
  subtitle,
  orderId,
  amount,
  customer,
  items,
  metadata,
  isBusiness,
  locale,
  t,
}: {
  title: string;
  subtitle: string;
  orderId: string;
  amount: number;
  customer: any;
  items: any[];
  metadata: any;
  isBusiness: boolean;
  locale: string;
  t: any;
}) {
  const formattedDate = new Date().toLocaleDateString(locale === "es" ? "es-MX" : "en-US", {
    timeZone: "America/Mexico_City",
  });

  // Paletas tipográficas y de color ajustadas a cliente (Violeta) y negocio (Amarillo)
  const theme = isBusiness
    ? {
      // MODO NEGOCIO (AMARILLO VIBRANTE)
      bgBody: "#FFC312",
      bgContainer: "#ffffff",
      bgHeader: "#ffffff",
      bgCard: "#fffdeb",
      bgTicket: "#ffffff",
      bgMeta: "#fffdeb",
      border: "#fde047",
      borderSubtle: "#fef08a",
      textTitle: "#18181b",
      textSubtitle: "#52525b",
      textLabel: "#a16207",
      textValue: "#18181b",
      textSecondary: "#71717a",
      textAmount: "#18181b",
      shadow: "0 10px 25px -5px rgba(255, 195, 18, 0.3)",
      badgeBg: "#000000",
      badgeText: "#FFC312",
    }
    : {
      // MODO CLIENTE (VIOLETA)
      bgBody: "#5352ED",
      bgContainer: "#ffffff",
      bgHeader: "#ffffff",
      bgCard: "#f5f3ff",
      bgTicket: "#ffffff",
      bgMeta: "#f5f3ff",
      border: "#ede9fe",
      borderSubtle: "#ddd6fe",
      textTitle: "#1e1b4b",
      textSubtitle: "#4c1d95",
      textLabel: "#5352ED",
      textValue: "#18181b",
      textSecondary: "#6d28d9",
      textAmount: "#5352ED",
      shadow: "0 10px 25px -5px rgba(83, 82, 237, 0.3)",
      badgeBg: "#5352ED",
      badgeText: "#ffffff",
    };

  return `
    <!DOCTYPE html>
    <html lang="${locale}">
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
          margin: 0 auto;
          padding: 40px 20px;
        }
        .container {
          background-color: ${theme.bgContainer};
          border-radius: 24px;
          box-shadow: ${theme.shadow};
          overflow: hidden;
        }
        .header {
          padding: 32px 40px 24px;
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
          padding: 48px 40px;
        }
        .badge {
          display: inline-block;
          background-color: ${theme.badgeBg};
          color: ${theme.badgeText};
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          border-radius: 9999px;
          padding: 6px 14px;
          margin-bottom: 24px;
        }
        .title {
          font-size: 26px;
          font-weight: 900;
          color: ${theme.textTitle};
          margin: 0 0 12px 0;
          line-height: 1.2;
          letter-spacing: -0.5px;
        }
        .subtitle {
          font-size: 15px;
          color: ${theme.textSubtitle};
          margin: 0 0 40px 0;
          line-height: 1.6;
        }
        .section-header {
          margin-bottom: 16px;
          margin-top: 32px;
        }
        .section-label {
          font-size: 13px;
          font-weight: 800;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: ${theme.textTitle};
        }
        
        /* Grid de información */
        .grid {
          display: table;
          width: 100%;
          table-layout: fixed;
          margin-bottom: 16px;
        }
        .col {
          display: table-cell;
          width: 50%;
          vertical-align: top;
        }
        .info-card {
          background-color: ${theme.bgCard};
          border: 1px solid ${theme.border};
          border-radius: 16px;
          padding: 24px;
        }
        .info-label {
          font-size: 12px;
          font-weight: 700;
          color: ${theme.textLabel};
          margin-bottom: 8px;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }
        .info-value {
          font-size: 15px;
          color: ${theme.textValue};
          line-height: 1.6;
          font-weight: 500;
          word-break: break-word;
        }

        /* Bloque de Metadata/Cupón */
        .meta-box {
          font-size: 15px;
          font-weight: 500;
          color: ${theme.textValue};
          background-color: ${theme.bgMeta};
          padding: 24px;
          border-radius: 16px;
          border: 1px solid ${theme.border};
          margin-bottom: 32px;
          line-height: 1.6;
        }

        /* Ticket de Compra */
        .ticket-box {
          background-color: ${theme.bgTicket};
          border: 1px solid ${theme.border};
          border-radius: 16px;
          padding: 32px;
          margin-top: 12px;
          margin-bottom: 24px;
        }
        .ticket-row {
          display: table;
          width: 100%;
          margin-bottom: 16px;
          padding-bottom: 16px;
          border-bottom: 1px dashed ${theme.borderSubtle};
        }
        .ticket-row:last-child {
          margin-bottom: 0;
          padding-bottom: 0;
          border-bottom: none;
        }
        .item-name {
          display: table-cell;
          font-size: 15px;
          color: ${theme.textValue};
          font-weight: 600;
        }
        .item-qty {
          font-size: 11px;
          background-color: ${theme.border};
          color: ${theme.textTitle};
          padding: 4px 8px;
          border-radius: 12px;
          margin-left: 8px;
          font-weight: 800;
          display: inline-block;
        }
        .item-price {
          display: table-cell;
          text-align: right;
          font-size: 15px;
          color: ${theme.textValue};
          font-weight: 600;
        }
        
        .total-box {
          margin-top: 24px;
          padding-top: 24px;
          border-top: 2px solid ${theme.borderSubtle};
        }
        .total-label {
          font-size: 16px;
          font-weight: 800;
          color: ${theme.textTitle};
        }
        .total-amount {
          font-size: 22px;
          font-weight: 900;
          color: ${theme.textAmount};
          text-align: right;
        }

        /* Banner Inline */
        .banner-container {
          width: 100%;
          line-height: 0;
          border-top: 1px solid ${theme.border};
          background-color: ${theme.bgHeader};
        }
        .banner-img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .footer {
          text-align: center;
          padding: 32px 40px;
          font-size: 13px;
          font-weight: 500;
          color: ${theme.textSecondary};
          border-top: 1px solid ${theme.border};
          background-color: ${theme.bgContainer};
        }
        .footer a {
          color: ${theme.textLabel};
          text-decoration: none;
          font-weight: 700;
        }
      </style>
    </head>
    <body>
      <div class="wrapper">
        <div class="container">
          
          <!-- Header Bar con Logo -->
          <div class="header">
            <img src="${BRAND_LOGO}" alt="${BRAND_NAME}" class="logo" />
          </div>

          <!-- Body Content -->
          <div class="content">
            <div class="badge">
              ${isBusiness ? "Venta Confirmada" : "Recibo de Pago"}
            </div>

            <h1 class="title">${title}</h1>
            <p class="subtitle">${subtitle}</p>

            <!-- Datos Generales -->
            <div class="grid">
              <div class="col" style="padding-right: 8px;">
                <div class="info-card">
                  <div class="info-label">${t("orderIdLabel")}</div>
                  <div class="info-value" style="font-weight: 700;">#${orderId}</div>
                </div>
              </div>
              <div class="col" style="padding-left: 8px;">
                <div class="info-card">
                  <div class="info-label">${t("paymentDateLabel")}</div>
                  <div class="info-value">${formattedDate}</div>
                </div>
              </div>
            </div>

            <!-- Datos del Cliente & Envío -->
            <div class="section-header" style="margin-top: 32px;">
              <span class="section-label">${isBusiness ? t("buyerInfo") : t("billingDetails")}</span>
            </div>

            <div class="grid">
              <div class="col" style="padding-right: 8px;">
                <div class="info-card" style="height: 100%;">
                  <div class="info-label">${t("customerLabel")}</div>
                  <div class="info-value">
                    <strong>${customer.nombre} ${customer.apellido}</strong><br/>
                    ${customer.email}<br/>
                    ${customer.telefono}
                  </div>
                </div>
              </div>
              <div class="col" style="padding-left: 8px;">
                <div class="info-card" style="height: 100%;">
                  <div class="info-label">${t("addressLabel")}</div>
                  <div class="info-value">
                    ${customer.direccion}<br/>
                    ${customer.direccion2 ? customer.direccion2 + '<br/>' : ''}
                    ${customer.ciudad}, ${customer.estado}<br/>
                    CP: ${customer.cp}, ${customer.pais}
                    ${customer.empresa ? `<br/><br/><strong>${t("companyLabel")}:</strong> ` + customer.empresa : ''}
                  </div>
                </div>
              </div>
            </div>

            <!-- Notas o Metadata del Cupón -->
            ${metadata && (metadata.notes || Object.keys(metadata).length > 0) ? `
              <div class="section-header">
                <span class="section-label">${t("operationDetails")}</span>
              </div>
              <div class="meta-box">
                ${metadata.notes || JSON.stringify(metadata)}
              </div>
            ` : ''}

            <!-- Desglose de Productos (Ticket) -->
            <div class="section-header">
              <span class="section-label">${t("productSummary")}</span>
            </div>

            <div class="ticket-box">
              ${items.map((item: any) => `
                <div class="ticket-row">
                  <div class="item-name">
                    ${item.product.name}
                    <span class="item-qty">x${item.quantity}</span>                   </div>                   <div class="item-price">                     $${formatPrice(Number(item.product.price) * (item.quantity || 1))} MXN
                  </div>
                </div>
              `).join('')}
              
              <!-- Total -->
              <div class="ticket-row total-box">
                <div class="item-name total-label">${t("totalPaid")}</div>
                <div class="item-price total-amount">$${formatPrice(amount)} MXN</div>
              </div>
            </div>

            ${!isBusiness ? `
              <p style="font-size: 13px; font-weight: 500; color: ${theme.textSecondary}; margin-top: 40px; line-height: 1.6; text-align: center;">
                ${t("clientDisclaimer")}
              </p>
            ` : ''}
          </div>

          <!-- Banner Promocional / Informativo Inferior -->
          <div class="banner-container">
            <img src="${BRAND_BANNER}" alt="Banner ${BRAND_NAME}" class="banner-img" />
          </div>

          <!-- Footer Legal -->
          <div class="footer">
            © ${new Date().getFullYear()} <a href="https://${BRAND_URL}">${BRAND_NAME}</a>. ${t("allRightsReserved")}<br/>
            <span style="opacity: 0.8; font-size: 12px; display: inline-block; margin-top: 12px;">${t("footerText")}</span>
          </div>

        </div>
      </div>
    </body>
    </html>
  `;
}