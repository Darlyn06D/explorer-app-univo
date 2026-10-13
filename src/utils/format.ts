import type { Country } from "../types/country";
const formatter = new Intl.NumberFormat("es-SV");
export function formatPopulation(value: number | null): string { return value === null ? "No registrada" : formatter.format(value); }
export function getCapital(country: Country): string { return country.capitals[0]?.name || "Sin capital registrada"; }
export function getFlagDescription(country: Country): string { return country.flag.description || `Bandera de ${country.names.common}`; }
export function escapeHtml(value: string): string {
  const entities: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return value.replace(/[&<>"']/g, char => entities[char] ?? char);
}
export function regionLabel(region: string): string {
  return ({ Africa: "África", Americas: "América", Asia: "Asia", Europe: "Europa", Oceania: "Oceanía", Antarctic: "Antártida" } as Record<string,string>)[region] ?? region;
}
