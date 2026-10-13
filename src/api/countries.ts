import type { CountryDetail } from "../types/country-detail";
import type { Country } from "../types/country";

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function text(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}
function records(value: unknown): Record<string, unknown>[] {
  return Array.isArray(value) ? value.filter(isRecord) : [];
}
function strings(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((v): v is string => typeof v === "string") : [];
}
/** Comprueba los campos esenciales y normaliza los opcionales del JSON. */
export function parseCountries(data: unknown): CountryDetail[] {
  if (!Array.isArray(data) || data.length === 0) throw new Error("La fuente de países está vacía o no es un arreglo.");
  return data.map((item: unknown): CountryDetail => {
    if (!isRecord(item) || !isRecord(item.names) || !text(item.names.common).trim() || !text(item.region).trim()) {
      throw new Error("La fuente contiene un país con formato incorrecto.");
    }
    const native: NonNullable<CountryDetail["names"]["native"]> = {};
    if (isRecord(item.names.native)) {
      for (const [key, value] of Object.entries(item.names.native)) {
        if (isRecord(value)) native[key] = { common: text(value.common), official: text(value.official) };
      }
    }
    const flag = isRecord(item.flag) ? item.flag : {};
    const codes = isRecord(item.codes) ? item.codes : {};
    const rawCode = text(codes.alpha_2).toUpperCase();
    const rawFlag = text(flag.url_svg);
    return {
      names: { common: text(item.names.common), native },
      codes: { alpha_2: /^[A-Z]{2}$/.test(rawCode) ? rawCode : "" },
      flag: { url_svg: /^https:\/\//i.test(rawFlag) ? rawFlag : "", description: text(flag.description) },
      population: typeof item.population === "number" && Number.isFinite(item.population) && item.population >= 0 ? item.population : null,
      region: text(item.region),
      capitals: records(item.capitals).map(c => ({ name: text(c.name) })).filter(c => c.name.trim()),
      subregion: text(item.subregion), tlds: strings(item.tlds), borders: strings(item.borders),
      languages: records(item.languages).map(l => ({ name: text(l.name) })).filter(l => l.name),
      currencies: records(item.currencies).map(c => ({ code: text(c.code), name: text(c.name), symbol: text(c.symbol) })).filter(c => c.name),
    };
  });
}
let countriesPromise: Promise<CountryDetail[]> | undefined;
function loadData(): Promise<CountryDetail[]> {
  if (!countriesPromise) {
    countriesPromise = (async () => {
      const response = await fetch(`${import.meta.env.BASE_URL}data/countries.json`);
      if (!response.ok) throw new Error(`No fue posible obtener los datos (HTTP ${response.status}).`);
      const data: unknown = await response.json();
      return parseCountries(data);
    })().catch((error: unknown) => { countriesPromise = undefined; throw error; });
  }
  return countriesPromise;
}
export async function fetchCountries(): Promise<Country[]> { return [...await loadData()]; }
export async function fetchCountryByCode(code: string): Promise<CountryDetail> {
  const country = (await loadData()).find(c => c.codes.alpha_2 === code.trim().toUpperCase());
  if (!country) throw new Error("No se encontró el país solicitado.");
  return country;
}
