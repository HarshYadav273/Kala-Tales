import { useState, useEffect } from "react";
import {
  candles as localCandles,
  macrame as localMacrame,
  macrameWallHangings as localWallHangings,
  macrameKeychains as localKeychains,
  macrameCoasters as localCoasters,
  allProducts as localAllProducts,
} from "../data/products";

// PASTE APPS SCRIPT URL HERE
const API_URL = "https://script.google.com/macros/s/AKfycbwEia4m9BXmy7JkrGiPUYSYN-JD0srksE0KZeH_yTgPRBHLY3jrBlOHa9ery_AoyYUhrw/exec";

/**
 * Normalises a raw row object from Google Sheets into a product shape
 * that matches what the components expect.
 */
function normaliseProduct(raw) {
  const inStockRaw = raw.inStock ?? raw.instock ?? raw["In Stock"] ?? true;
  const inStock =
    inStockRaw === true || String(inStockRaw).toUpperCase() === "TRUE";

  return {
    id: Number(raw.id),
    name: raw.name ?? "",
    sku: raw.sku ?? "",
    price: Number(raw.price),
    category: raw.category ?? "",
    subcategory: raw.subcategory ?? "",
    filterCategory: raw.filterCategory ?? raw.filtercategory ?? "",
    // image is a URL string — either a relative path like "/Assests/Images/PMJ 1.jpg"
    // or a full https:// URL (e.g. a Google Drive direct link)
    image: raw.image ?? "",
    inStock,
    description: raw.description ?? "",
  };
}

// Images are always sourced from local data — build a lookup map by product id.
// Sheet manages everything else (name, price, description, inStock, etc.)
const localImageMap = Object.fromEntries(
  localAllProducts.map((p) => [p.id, p.image])
);

// Always pre-populate with local data so every page renders instantly — no loading spinner.
// The hook then silently fetches from the API in the background.
// On success: state is swapped to sheet data seamlessly.
// On failure: local data remains, no disruption to the user.
const localState = {
  products: localAllProducts,
  candles: localCandles,
  macrame: localMacrame,
  macrameWallHangings: localWallHangings,
  macrameKeychains: localKeychains,
  macrameCoasters: localCoasters,
  allProducts: localAllProducts,
  loading: false,
  error: null,
};

export function useProducts() {
  const [state, setState] = useState(localState);

  useEffect(() => {
    // If no API URL is configured, use local data silently
    if (!API_URL) return;

    let cancelled = false;

    fetch(API_URL, { redirect: "follow" })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;

        // Accept both { products: [...] } and a bare array from Apps Script
        const rows = Array.isArray(data) ? data : (data.products ?? []);

        if (rows.length === 0) {
          console.warn("useProducts: API returned empty data, keeping local data.");
          return;
        }

        // After normalising, always replace image with the locally stored one
        const normalised = rows.map((raw) => {
          const product = normaliseProduct(raw);
          product.image = localImageMap[product.id] ?? product.image;
          return product;
        });
        const candles = normalised.filter((p) => p.category === "Candles");
        const macrame = normalised.filter((p) => p.category === "Macrame");
        const macrameWallHangings = macrame.filter((p) => p.subcategory === "Wall Hangings");
        const macrameKeychains = macrame.filter((p) => p.subcategory === "Keychains");
        const macrameCoasters = macrame.filter((p) => p.subcategory === "Coasters");

        setState({
          products: normalised,
          candles,
          macrame,
          macrameWallHangings,
          macrameKeychains,
          macrameCoasters,
          allProducts: normalised,
          loading: false,
          error: null,
        });
      })
      .catch((err) => {
        if (cancelled) return;
        // Local data is already showing — no disruption to the user
        console.warn("useProducts: fetch failed, keeping local data.", err.message);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
