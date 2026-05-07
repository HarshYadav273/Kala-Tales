import { useState, useEffect } from "react";
import {
  candles as localCandles,
  macrame as localMacrame,
  macrameWallHangings as localWallHangings,
  macrameKeychains as localKeychains,
  macrameCoasters as localCoasters,
  allProducts as localAllProducts,
} from "../data/products";


const API_URL = "https://script.google.com/macros/s/AKfycbxFhNlbMae6oNAGIsXyHV7ikne5pPQYHzLhLwNKlqr-utLxJH27MDY_M6AFF5GfYKeNPw/exec";

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

export function useProducts() {
  const [state, setState] = useState({
    products: localAllProducts,
    candles: localCandles,
    macrame: localMacrame,
    macrameWallHangings: localWallHangings,
    macrameKeychains: localKeychains,
    macrameCoasters: localCoasters,
    allProducts: localAllProducts,
    loading: false,
    error: null,
  });

  useEffect(() => {
    // If no API URL is configured, skip the fetch and use local data silently
    if (!API_URL) return;

    let cancelled = false;
    setState((prev) => ({ ...prev, loading: true, error: null }));

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        if (cancelled) return;

        // Apps Script should return an array of row objects.
        // Accept both { products: [...] } and a bare array.
        const rows = Array.isArray(data) ? data : data.products ?? [];
        const normalised = rows.map(normaliseProduct);

        const candles = normalised.filter((p) => p.category === "Candles");
        const macrame = normalised.filter((p) => p.category === "Macrame");
        const macrameWallHangings = macrame.filter(
          (p) => p.subcategory === "Wall Hangings",
        );
        const macrameKeychains = macrame.filter(
          (p) => p.subcategory === "Keychains",
        );
        const macrameCoasters = macrame.filter(
          (p) => p.subcategory === "Coasters",
        );

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
        console.warn(
          "useProducts: fetch failed, falling back to local data.",
          err.message,
        );
        // Fallback — keep local data, surface error for optional display
        setState({
          products: localAllProducts,
          candles: localCandles,
          macrame: localMacrame,
          macrameWallHangings: localWallHangings,
          macrameKeychains: localKeychains,
          macrameCoasters: localCoasters,
          allProducts: localAllProducts,
          loading: false,
          error: err.message,
        });
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}
