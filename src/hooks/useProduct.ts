"use client";

import { useLocale } from "next-intl";
import { servicesDataEnglish, servicesDataSpanish, useServices } from "./useServices";
import { packagesDataSpanish } from "./usePackages";
import { Product } from "@/types/product";


export function useProduct(id: string) {
    const locale = useLocale()

    const services = locale == "es" ? servicesDataSpanish : servicesDataEnglish;
    const packages = locale == "es" ? packagesDataSpanish : packagesDataSpanish;

    const target: Product = {
        id: "",
        name: "",
        price: 0,
        image: "",
        currency: "",
        features: []
    };

    for (const service of services) {
        if (service.id == id) {
            target.currency = service.currency;
            target.features = service.features;
            target.id = service.id;
            target.image = service.image;
            target.name = service.name;
            target.price = service.price;
        }
    }

    for (const pack of packages) {
        if (pack.id == id) {
            target.currency = pack.currency;
            target.features = pack.features;
            target.id = pack.id;
            target.image = pack.image;
            target.name = pack.name;
            target.price = pack.price;
        }
    }

    return target;
}