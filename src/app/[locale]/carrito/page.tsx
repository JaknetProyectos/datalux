"use client";

import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ChevronLeft,
  CreditCard,
  User,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Tag
} from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { useCart } from "@/context/CartContext";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { processKeycopPayment } from "@/lib/payment";
import { formatPrice } from "@/lib/price";
import { usePackages } from "@/hooks/usePackages";
import { useProduct } from "@/hooks/useProduct";
import { CartItem } from "@/types/cart-item";

const VALID_COUPONS = [
  { code: "MARCA10", discount: 0.1 },
  { code: "BRAND15", discount: 0.15 },
  { code: "MARCAPRO20", discount: 0.2 },
];

function CartItemRow({ item }: { item: CartItem }) {
  const itemReal = useProduct(item.product.id);
  const locale = useLocale()
  const { removeItem, updateQuantity } = useCart();

  let productData = itemReal;

  if (item.product.id == "custom-product") {

    const custom = {
      es: {
        id: "custom-product",
        name: item.product.name,
        price: item.product.price,
        image: "/logo.png",
        currency: "MXN",
        features: []
      },
      en: {
        id: "custom-product",
        name: item.product.name,
        price: item.product.price,
        image: "/logo.png",
        currency: "MXN",
        features: []
      }
    }

    productData = locale == "es" ? custom.es : custom.en;
  }

  return (
    <div
      key={item.product.id}
      className="group relative rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all duration-300 hover:border-[#5352ED]/20 hover:shadow-md"
    >
      <div className="grid grid-cols-[88px_minmax(0,1fr)] gap-5 sm:grid-cols-[100px_minmax(0,1fr)]">
        <div className="relative overflow-hidden rounded-xl bg-slate-50 p-2 shadow-xs ring-1 ring-slate-100">
          <Link href={`/soluciones`} className="absolute inset-0 z-10" />
          <Image
            src={productData.image}
            alt={productData.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-col justify-between gap-4 py-1">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="mb-2 inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-0.5 font-mono text-[10px] font-bold tracking-widest text-slate-500">
                {productData.id}
              </p>

              <h3 className="line-clamp-1 text-base font-extrabold text-slate-900 tracking-tight transition-colors group-hover:text-[#5352ED]">
                {productData.name}
              </h3>
            </div>

            <button
              type="button"
              onClick={() => removeItem(item.product.id)}
              className="rounded-xl p-2 text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>

          <div className="flex items-end justify-between gap-4">
            <div className="flex items-center rounded-xl border border-slate-100 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity - 1)
                }
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-[#5352ED] hover:shadow-sm"
              >
                <Minus className="h-3.5 w-3.5" />
              </button>

              <span className="w-8 text-center font-mono text-xs font-bold text-slate-900">
                {item.quantity}
              </span>

              <button
                type="button"
                onClick={() =>
                  updateQuantity(item.product.id, item.quantity + 1)
                }
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white hover:text-[#5352ED] hover:shadow-sm"
              >
                <Plus className="h-3.5 w-3.5" />
              </button>
            </div>

            <span className="font-mono text-lg font-black tracking-tight text-slate-900">
              {formatPrice(productData.price * item.quantity, "MXN", true)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

type Step = 1 | 2 | 3;

function CardShell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={[
        "relative rounded-3xl border border-slate-200/60 bg-white",
        "shadow-sm transition-all duration-300",
        className,
      ].join(" ")}
    >
      <div className="relative">{children}</div>
    </div>
  );
}

function SectionTitle({
  icon: Icon,
  title,
}: {
  icon: React.ElementType;
  title: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5352ED]/10 text-[#5352ED]">
        <Icon className="h-5 w-5 stroke-[2.5]" />
      </div>
      <h3 className="text-xs font-extrabold uppercase tracking-widest text-slate-800">
        {title}
      </h3>
    </div>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  required = false,
  placeholder,
  className = "",
  maxLength,
  mono = false,
  inputClassName = "",
}: {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  maxLength?: number;
  mono?: boolean;
  inputClassName?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-xs font-bold text-slate-600">
        {label} {required && <span className="text-[#5352ED]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        className={[
          "w-full rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5",
          "text-sm font-medium text-slate-900 outline-none transition-all placeholder:text-slate-400",
          "focus:border-[#5352ED] focus:bg-white focus:ring-4 focus:ring-[#5352ED]/10",
          mono ? "font-mono tracking-wider" : "",
          inputClassName,
        ].join(" ")}
      />
    </div>
  );
}

export default function CarritoCheckoutPage() {
  const t = useTranslations("cartPage");
  const locale = useLocale();

  const { items, total, updateQuantity, removeItem, clearCart } = useCart();

  const [step, setStep] = useState<Step>(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successData, setSuccessData] = useState<any>(null);

  const [couponInput, setCouponInput] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState<{
    code: string;
    discount: number;
  } | null>(null);
  const [couponError, setCouponError] = useState("");

  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    empresa: "",
    direccion: "",
    direccion2: "",
    ciudad: "",
    estado: "",
    cp: "",
    pais: "MX",
    cardNumber: "",
    cardName: "",
    cardMonth: "",
    cardYear: "",
    cardCvv: "",
  });

  const discountAmount = appliedCoupon ? total * appliedCoupon.discount : 0;
  const totalWithDiscount = total - discountAmount;
  const iva = totalWithDiscount * 0.16;
  const grandTotal = totalWithDiscount + iva;

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleApplyCoupon = (e: FormEvent) => {
    e.preventDefault();
    setCouponError("");

    const found = VALID_COUPONS.find(
      (c) => c.code === couponInput.trim().toUpperCase()
    );

    if (found) {
      setAppliedCoupon(found);
      setCouponInput("");
      return;
    }

    setCouponError(t("financial.couponInvalid"));
  };

  const handleCheckoutSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setErrorMessage("");

    const uniqueOrderId = `MC-${Date.now()}`;

    const paymentPayload = {
      amount: Number(grandTotal.toFixed(2)),
      orderId: uniqueOrderId,
      cardData: {
        number: formData.cardNumber.replace(/\s/g, ""),
        name: formData.cardName.trim(),
        month: formData.cardMonth.padStart(2, "0"),
        year: formData.cardYear.trim(),
        cvv: formData.cardCvv.trim(),
      },
      customer: {
        nombre: formData.nombre.trim(),
        apellido: formData.apellido.trim(),
        email: formData.email.trim(),
        telefono: formData.telefono.trim(),
        direccion: formData.direccion.trim(),
        direccion2: formData.direccion2.trim() || undefined,
        ciudad: formData.ciudad.trim(),
        estado: formData.estado.trim(),
        pais: formData.pais,
        cp: formData.cp.trim(),
        empresa: formData.empresa.trim() || undefined,
      },
      metadata: {
        notes: appliedCoupon
          ? `${t("metadata.couponApplied")}: ${appliedCoupon.code}`
          : t("metadata.standardSale"),
      },
    };

    try {
      const response = await processKeycopPayment(paymentPayload);

      if (response.success) {
        setSuccessData(response.data);

        try {
          await fetch(`/api/checkout`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              orderId: uniqueOrderId,
              amount: paymentPayload.amount,
              customer: paymentPayload.customer,
              items,
              metadata: paymentPayload.metadata,
              locale
            }),
          });
        } catch (emailError) {
          console.error(
            "Falló el despacho de correos informativos:",
            emailError
          );
        }

        clearCart();
        setStep(3);
      } else {
        setErrorMessage(response.error || t("errors.declined"));
        console.log(response.error);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage(t("errors.connection"));
    } finally {
      setIsProcessing(false);
    }
  };

  if (step === 3) {
    return (
      <div className="relative min-h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-[#FFC312] selection:text-slate-900">
        {/* Background Atmosférico y Orgánico Datalux */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1D1B4B] via-[#2E2A72] to-[#5352ED] h-full" />

        {/* Patrón de Nodos/Datos */}
        <div
          className="absolute top-0 left-0 right-0 h-full opacity-20 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(255,255,255,0.8) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />

        {/* Hoja Negra Estilizada (Elemento Orgánico) */}
        <div className="absolute -top-20 -right-20 h-96 w-96 rounded-bl-full bg-slate-950 opacity-40 pointer-events-none transform rotate-12" />

        <main className="relative z-10 mx-auto flex min-h-screen w-full max-w-7xl flex-col justify-center px-4 pb-14 pt-20 md:px-6">
          <section className="relative mx-auto w-full max-w-lg">
            <CardShell className="p-8 text-center sm:p-12 shadow-2xl border-none">
              <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-[#FFC312] text-slate-950 shadow-sm transform -rotate-3 transition-transform hover:rotate-0">
                <CheckCircle2 className="h-12 w-12 stroke-[2.5]" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-slate-900">
                {t("success.title")}
              </h1>

              <p className="mx-auto mt-4 max-w-sm text-sm font-medium leading-relaxed text-slate-600">
                {t("success.description")}
              </p>

              <div className="mt-10 rounded-2xl border border-slate-100 bg-slate-50 p-6 text-left">
                <div className="flex items-center justify-between gap-4 border-b border-slate-200 pb-4 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {t("success.transactionStatus")}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-[#5352ED]/10 px-2.5 py-1 text-xs font-black text-[#5352ED] uppercase tracking-wider">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    {t("success.approved")}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    ID
                  </span>
                  <span className="font-mono text-sm font-bold text-slate-900">
                    {successData?.id || "DTLX-0000"}
                  </span>
                </div>
              </div>

              <Link href="/soluciones" className="mt-10 block">
                <button className="w-full rounded-2xl bg-[#5352ED] py-6 text-sm font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#403FCE]">
                  {t("success.backToCatalog")}
                </button>
              </Link>
            </CardShell>
          </section>
        </main>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-[#FFC312] selection:text-slate-900 pb-20">

      {/* Header Estético Datalux con Gradiente Análogo */}
      <div className="absolute top-0 left-0 right-0 h-full bg-gradient-to-b from-[#1D1B4B] via-[#2E2A72] to-[#5352ED] pointer-events-none" />

      {/* Patrón Modular sutil en cabecera */}
      <div
        className="absolute top-0 left-0 right-0 h-[35vh] opacity-10 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}
      />

      <div className="h-20" />

      {/* Navegación Breadcrumb Limpia */}
      <div className="sticky top-0 z-40">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-6 md:px-6">
          <nav className="flex items-center gap-2.5 text-xs font-bold tracking-wider uppercase text-indigo-200">
            <Link href="/" className="transition-colors hover:text-[#FFC312]">
              {t("breadcrumb.home")}
            </Link>
            <span className="text-indigo-400">/</span>
            <span
              className={`transition-colors ${step === 1 ? "text-white" : "hover:text-[#FFC312] cursor-pointer"
                }`}
              onClick={() => { if (step === 2) setStep(1) }}
            >
              {t("breadcrumb.summary")}
            </span>
            <span className="text-indigo-400">/</span>
            <span
              className={
                step === 2 ? "text-white" : "text-indigo-300"
              }
            >
              {t("breadcrumb.shippingPayment")}
            </span>
          </nav>

          <div className="hidden sm:flex items-center gap-3">
            <div className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step >= 1 ? "bg-[#FFC312]" : "bg-indigo-900"}`} />
            <div className={`h-0.5 w-10 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-indigo-400" : "bg-indigo-900"}`} />
            <div className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${step >= 2 ? "bg-[#FFC312]" : "bg-indigo-900"}`} />
          </div>
        </div>
      </div>

      <main className="relative z-10 mt-4">
        <div className="mx-auto px-4 md:px-6 max-w-7xl">
          {items.length === 0 ? (
            <CardShell className="mx-auto max-w-lg p-10 text-center shadow-lg border-none mt-10">
              <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-slate-100 text-slate-400">
                <ShoppingBag className="h-10 w-10 stroke-[2]" />
              </div>
              <h2 className="text-2xl font-black text-slate-900 tracking-tight">
                {t("empty.title")}
              </h2>
              <p className="mx-auto mt-3 max-w-xs text-sm font-medium leading-relaxed text-slate-500">
                {t("empty.description")}
              </p>
              <Link href="/soluciones" className="mt-8 inline-block w-full">
                <button className="w-full rounded-2xl bg-[#5352ED] px-8 py-6 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#403FCE]">
                  {t("empty.goToStore")}
                </button>
              </Link>
            </CardShell>
          ) : (
            <div className="grid gap-8 lg:items-start">
              <div className="space-y-6">

                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm font-bold text-red-600 shadow-sm">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-red-500" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                {step === 1 && (
                  <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(340px,0.8fr)]">

                    {/* Lista de Pedido */}
                    <CardShell className="p-6 sm:p-8">
                      <div className="flex items-center justify-between gap-4 mb-6 pb-6 border-b border-slate-100">
                        <SectionTitle icon={ShoppingBag} title={t("order.title")} />

                        <button
                          type="button"
                          onClick={clearCart}
                          className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 transition-colors hover:text-red-500"
                        >
                          <Trash2 className="h-4 w-4" />
                          {t("order.clear")}
                        </button>
                      </div>

                      <div className="space-y-4">
                        {items.map((item) => (
                          <CartItemRow key={item.product.id} item={item} />
                        ))}
                      </div>
                    </CardShell>

                    {/* Resumen Financiero Paso 1 */}
                    <CardShell className="p-6 sm:p-8">
                      <div className="flex h-full flex-col">
                        <div className="mb-6 pb-6 border-b border-slate-100">
                          <SectionTitle icon={Tag} title={t("financial.title")} />
                        </div>

                        <div className="space-y-6">
                          {!appliedCoupon ? (
                            <form
                              onSubmit={handleApplyCoupon}
                              className="rounded-2xl border border-slate-100 bg-slate-50 p-5"
                            >
                              <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-slate-700">
                                {t("financial.applyCoupon")}
                              </label>
                              <div className="flex gap-2">
                                <input
                                  type="text"
                                  placeholder={t("financial.couponPlaceholder")}
                                  value={couponInput}
                                  onChange={(e) => setCouponInput(e.target.value)}
                                  className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-medium uppercase text-slate-900 outline-none transition-all placeholder:text-slate-400 focus:border-[#5352ED] focus:ring-4 focus:ring-[#5352ED]/10"
                                />
                                <button
                                  type="submit"
                                  className="shrink-0 rounded-xl bg-slate-900 px-5 text-xs font-bold uppercase tracking-wider text-white transition hover:bg-slate-800"
                                >
                                  Aplicar
                                </button>
                              </div>
                              {couponError && (
                                <div className="mt-3 flex items-center gap-1.5 text-[11px] font-bold text-red-500">
                                  <AlertTriangle className="h-3.5 w-3.5" />
                                  <span>{couponError}</span>
                                </div>
                              )}
                            </form>
                          ) : (
                            <div className="rounded-2xl border border-[#5352ED]/20 bg-[#5352ED]/5 p-5">
                              <div className="flex items-start justify-between gap-3">
                                <div className="min-w-0">
                                  <p className="text-[11px] font-black uppercase tracking-widest text-[#5352ED]">
                                    {t("financial.appliedCoupon", {
                                      code: appliedCoupon.code,
                                      discount: appliedCoupon.discount * 100,
                                    })}
                                  </p>
                                  <p className="mt-1 text-xs font-medium text-slate-600">
                                    Cupón activo correctamente
                                  </p>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => setAppliedCoupon(null)}
                                  className="shrink-0 rounded-lg bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-red-500 shadow-sm transition-colors hover:bg-red-50"
                                >
                                  {t("financial.remove")}
                                </button>
                              </div>
                            </div>
                          )}

                          <div className="space-y-4 rounded-2xl bg-white text-sm font-medium text-slate-500">
                            <div className="flex justify-between gap-4">
                              <span>{t("financial.subtotal")}</span>
                              <span className="font-mono font-bold text-slate-900">
                                {formatPrice(total, "MXN", true)}
                              </span>
                            </div>

                            {appliedCoupon && (
                              <div className="flex justify-between gap-4 text-[#5352ED]">
                                <span>{t("financial.discount")}</span>
                                <span className="font-mono font-bold">
                                  -{formatPrice(discountAmount, "MXN", true)}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="rounded-2xl bg-slate-950 p-6 text-white shadow-lg">
                            <div className="flex items-end justify-between gap-4">
                              <div className="space-y-1">
                                <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">
                                  {t("financial.netTotal")}
                                </span>
                                <p className="text-[10px] font-medium text-slate-500">
                                  {t("financial.tax", { tax: formatPrice(iva, "MXN", true) })}
                                </p>
                              </div>
                              <span className="font-mono text-3xl font-black tracking-tight text-[#FFC312]">
                                {formatPrice(grandTotal, "MXN", true)}
                              </span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <button
                              onClick={() => setStep(2)}
                              className="flex w-full items-center justify-center gap-3 rounded-2xl bg-[#5352ED] py-6 text-xs font-bold uppercase tracking-widest text-white transition-colors duration-300 hover:bg-[#403FCE]"
                            >
                              {t("actions.proceedToPayment")}
                              <ArrowRight className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="border-t border-slate-100 pt-6 text-center">
                            <p className="mb-4 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                              {t("security.note")}
                            </p>
                            <div className="flex items-center justify-center rounded-xl bg-slate-50 py-3">
                              <Image
                                src="/keycop.webp"
                                alt={t("images.securePaymentAlt")}
                                width={120}
                                height={24}
                                className="object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardShell>
                  </div>
                )}

                {step === 2 && (
                  <form
                    id="octano-payment-form"
                    onSubmit={handleCheckoutSubmit}
                    className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.9fr)]"
                  >
                    {/* Formularios Izquierda */}
                    <div className="space-y-6">

                      <CardShell className="p-6 sm:p-8">
                        <div className="mb-6 pb-6 border-b border-slate-100">
                          <SectionTitle icon={User} title={t("form.buyerTitle")} />
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field
                            label={t("form.firstName")}
                            name="nombre"
                            value={formData.nombre}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.lastName")}
                            name="apellido"
                            value={formData.apellido}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.email")}
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.phone")}
                            name="telefono"
                            type="tel"
                            value={formData.telefono}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.company")}
                            name="empresa"
                            value={formData.empresa}
                            onChange={handleInputChange}
                            className="sm:col-span-2"
                          />
                        </div>
                      </CardShell>

                      <CardShell className="p-6 sm:p-8">
                        <div className="mb-6 pb-6 border-b border-slate-100">
                          <SectionTitle icon={MapPin} title={t("form.addressTitle")} />
                        </div>
                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                          <Field
                            label={t("form.streetAddress")}
                            name="direccion"
                            value={formData.direccion}
                            onChange={handleInputChange}
                            required
                            placeholder={t("form.streetAddressPlaceholder")}
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.neighborhood")}
                            name="direccion2"
                            value={formData.direccion2}
                            onChange={handleInputChange}
                            placeholder={t("form.neighborhoodPlaceholder")}
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.city")}
                            name="ciudad"
                            value={formData.ciudad}
                            onChange={handleInputChange}
                            required
                          />
                          <Field
                            label={t("form.state")}
                            name="estado"
                            value={formData.estado}
                            onChange={handleInputChange}
                            required
                            placeholder={t("form.statePlaceholder")}
                          />
                          <Field
                            label={t("form.postalCode")}
                            name="cp"
                            value={formData.cp}
                            onChange={handleInputChange}
                            required
                          />
                          <div>
                            <label className="mb-2 block text-xs font-bold text-slate-600">
                              {t("form.country")} <span className="text-[#5352ED]">*</span>
                            </label>
                            <div className="relative">
                              <select
                                name="pais"
                                value={formData.pais}
                                onChange={handleInputChange}
                                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50/50 px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all focus:border-[#5352ED] focus:bg-white focus:ring-4 focus:ring-[#5352ED]/10"
                              >
                                <option value="MX" className="bg-white text-slate-900">
                                  {t("form.mexico")}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </CardShell>

                      <CardShell className="p-6 sm:p-8">
                        <div className="mb-6 pb-6 border-b border-slate-100 flex items-center justify-between">
                          <SectionTitle icon={CreditCard} title={t("form.paymentTitle")} />
                          <div className="flex gap-2">
                            {/* Simulando íconos de tarjetas */}
                            <div className="h-6 w-9 rounded bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">VISA</div>
                            <div className="h-6 w-9 rounded bg-slate-100 flex items-center justify-center text-[8px] font-bold text-slate-400">MC</div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 sm:grid-cols-6">
                          <Field
                            label={t("form.cardNumber")}
                            name="cardNumber"
                            value={formData.cardNumber}
                            onChange={handleInputChange}
                            required
                            maxLength={16}
                            placeholder={t("form.cardNumberPlaceholder")}
                            className="sm:col-span-6"
                            mono
                          />
                          <Field
                            label={t("form.cardHolderName")}
                            name="cardName"
                            value={formData.cardName}
                            onChange={handleInputChange}
                            required
                            placeholder={t("form.cardHolderPlaceholder")}
                            className="sm:col-span-6"
                          />
                          <Field
                            label={t("form.expiryMonth")}
                            name="cardMonth"
                            value={formData.cardMonth}
                            onChange={handleInputChange}
                            required
                            maxLength={2}
                            placeholder={t("form.expiryMonthPlaceholder")}
                            mono
                            inputClassName="text-center"
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.expiryYear")}
                            name="cardYear"
                            value={formData.cardYear}
                            onChange={handleInputChange}
                            required
                            maxLength={2}
                            placeholder={t("form.expiryYearPlaceholder")}
                            mono
                            inputClassName="text-center"
                            className="sm:col-span-2"
                          />
                          <Field
                            label={t("form.cvv")}
                            name="cardCvv"
                            type="password"
                            value={formData.cardCvv}
                            onChange={handleInputChange}
                            required
                            maxLength={4}
                            placeholder={t("form.cvvPlaceholder")}
                            mono
                            inputClassName="text-center"
                            className="sm:col-span-2"
                          />
                        </div>
                      </CardShell>
                    </div>

                    {/* Resumen Final Derecha */}
                    <div className="space-y-6">
                      <CardShell className="sticky top-28 p-6 sm:p-8 border-[#5352ED]/20 shadow-xl">
                        <div className="mb-6 pb-6 border-b border-slate-100">
                          <SectionTitle icon={Tag} title={t("financial.title")} />
                        </div>

                        <div className="space-y-4 text-sm font-medium text-slate-500">
                          <div className="flex justify-between gap-4">
                            <span>{t("financial.subtotal")}</span>
                            <span className="font-mono font-bold text-slate-900">
                              {formatPrice(total, "MXN", true)}
                            </span>
                          </div>

                          {appliedCoupon && (
                            <div className="flex justify-between gap-4 text-[#5352ED]">
                              <span>{t("financial.discount")}</span>
                              <span className="font-mono font-bold">
                                -{formatPrice(discountAmount, "MXN", true)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="my-6 rounded-2xl bg-slate-950 p-6 text-white shadow-lg">
                          <div className="flex items-end justify-between gap-4">
                            <div className="space-y-1">
                              <span className="block text-xs font-bold uppercase tracking-widest text-slate-400">
                                Total
                              </span>
                              <p className="text-[10px] font-medium text-slate-500">
                                {t("financial.tax", { tax: formatPrice(iva, "MXN", true) })}
                              </p>
                            </div>
                            <span className="font-mono text-3xl font-black tracking-tight text-[#FFC312]">
                              {formatPrice(grandTotal, "MXN", true)}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <button
                            type="submit"
                            form="octano-payment-form"
                            disabled={isProcessing}
                            className={[
                              "flex w-full items-center justify-center gap-3 rounded-2xl py-6 text-xs font-bold uppercase tracking-widest transition-all duration-300",
                              isProcessing
                                ? "cursor-wait bg-slate-200 text-slate-400"
                                : "bg-[#FFC312] text-slate-950 hover:bg-[#E5AC00] hover:shadow-md",
                            ].join(" ")}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>{t("actions.processing")}</span>
                              </>
                            ) : (
                              t("actions.payAmount", {
                                amount: formatPrice(grandTotal, "MXN", true),
                              })
                            )}
                          </button>

                          <button
                            type="button"
                            disabled={isProcessing}
                            onClick={() => setStep(1)}
                            className="flex w-full items-center justify-center py-6 text-[11px] font-bold uppercase tracking-wider text-slate-400 transition-colors hover:text-slate-600"
                          >
                            <ChevronLeft className="h-4 w-4" />
                            {t("actions.backToCart")}
                          </button>
                        </div>

                        <div className="mt-8 border-t border-slate-100 pt-6 text-center">
                          <div className="flex items-center justify-center gap-2 mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            <CreditCard className="h-4 w-4" />
                            {t("security.note")}
                          </div>
                          <div className="flex items-center justify-center rounded-xl bg-slate-50 py-3">
                            <Image
                              src="/keycop.webp"
                              alt={t("images.securePaymentAlt")}
                              width={120}
                              height={24}
                              className="object-contain opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                            />
                          </div>
                        </div>
                      </CardShell>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}