"use client";

import { Globe2, Loader2, ArrowLeftRight } from "lucide-react";
import { useLocaleContext } from "@/context/LangContext";

export default function LangSwitcher() {
  const { locale, switchLanguage, isPending } = useLocaleContext();

  const nextLang = locale === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => switchLanguage(nextLang)}
      disabled={isPending}
      aria-label="Cambiar idioma"
      className="
        group
        fixed
        bottom-5
        right-5
        z-50

        overflow-hidden

        flex items-center gap-3

        rounded-xl

        border border-yellow-400/15

        bg-[#0b111a]/85
        backdrop-blur-xl

        px-4 py-3

        shadow-[0_0_30px_rgba(34,211,238,0.08)]

        transition-all duration-300

        hover:-translate-y-1
        hover:border-yellow-400/30
        hover:shadow-[0_0_35px_rgba(34,211,238,0.18)]

        active:scale-[0.98]

        disabled:cursor-not-allowed
        disabled:opacity-70
      "
    >
      {/* Glow */}
      <div
        className="
          absolute
          inset-0
          opacity-0
          transition-opacity
          duration-500
          group-hover:opacity-100
          bg-gradient-to-r
          from-yellow-400/5
          via-yellow-300/10
          to-yellow-400/5
        "
      />

      {/* Icon */}
      <div
        className="
          relative
          flex
          h-11
          w-11
          items-center
          justify-center

          rounded-xl

          border border-yellow-400/15

          bg-yellow-400/10

          text-fuchsia-300

          transition-all
          duration-500

          group-hover:rotate-12
          group-hover:scale-110
          group-hover:bg-yellow-400/15
        "
      >
        {isPending ? (
          <Loader2 className="h-5 w-5 animate-spin" />
        ) : (
          <Globe2 className="h-5 w-5" />
        )}
      </div>

      {/* Content */}
      <div className="relative flex flex-col justify-center items-center leading-none">
        <div className="mt-1 flex items-center justify-center gap-2">
          <span
            className="
            text-[10px]
            font-bold
            uppercase
            tracking-[0.25em]
            text-fuchsia-400
          "
          >
            {locale === "es" ? "Español" : "English"}
          </span>

          <ArrowLeftRight
            className="
              h-3.5
              w-3.5
              text-fuchsia-400/60
              transition-transform
              duration-300
              group-hover:translate-x-0.5
            "
          />
        </div>
      </div>

    </button>
  );
}