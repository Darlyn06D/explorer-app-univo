import "./style.css";
import { fetchCountries, fetchCountryByCode } from "./api/countries";
import type { Country } from "./types/country";
import { renderCountryGrid } from "./render/countryGrid";
import { renderDetail } from "./render/detail";
import { renderLoading, renderEmpty, renderError } from "./render/states";
import { filterCountries } from "./utils/filter";
import { debounce } from "./utils/debounce";

function required<T extends Element>(selector: string): T {
  const element = document.querySelector<T>(selector);
  if (!element) throw new Error(`Falta el elemento ${selector}.`);
  return element;
}
const grid = required<HTMLElement>("#countries-container");
const search = required<HTMLInputElement>("#country-search");
const region = required<HTMLSelectElement>("#region-filter");
const home = required<HTMLElement>("#home-view");
const detail = required<HTMLElement>("#detail-view");
const count = required<HTMLElement>("#results-count");
const menu = required<HTMLElement>("#main-menu");
const menuButton = required<HTMLButtonElement>("#menu-toggle");
let allCountries: Country[] = [];
let ready = false;
let requestVersion = 0;
let routeVersion = 0;

function setMenuState(open: boolean): void {
  menu.classList.toggle("hidden", !open);
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute("aria-label", open ? "Cerrar menú de navegación" : "Abrir menú de navegación");
  required("#menu-open-icon").classList.toggle("hidden", open);
  required("#menu-close-icon").classList.toggle("hidden", !open);
}
menuButton.addEventListener("click", () => setMenuState(menuButton.getAttribute("aria-expanded") !== "true"));
menu.addEventListener("click", event => { if (event.target instanceof Element && event.target.closest("a")) setMenuState(false); });
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") { setMenuState(false); menuButton.focus(); }
});
window.matchMedia("(min-width: 768px)").addEventListener("change", () => setMenuState(false));

function applyFilters(): void {
  if (!ready) return;
  const countries = filterCountries(allCountries, search.value, region.value);
  grid.innerHTML = countries.length ? renderCountryGrid(countries) : renderEmpty(search.value);
  count.textContent = `${countries.length} de ${allCountries.length} países y territorios`;
}
const delayedSearch = debounce(applyFilters, 300);
search.addEventListener("input", delayedSearch.run);
region.addEventListener("change", () => { delayedSearch.cancel(); applyFilters(); });
required<HTMLButtonElement>("#clear-filters").addEventListener("click", () => {
  delayedSearch.cancel(); search.value = ""; region.value = ""; applyFilters(); search.focus();
});
async function loadCountries(): Promise<void> {
  const version = ++requestVersion;
  ready = false; search.disabled = true; region.disabled = true;
  grid.setAttribute("aria-busy", "true");
  grid.innerHTML = renderLoading(); count.textContent = "Cargando países…";
  try {
    allCountries = await fetchCountries();
    if (version !== requestVersion) return;
    ready = true; applyFilters();
  } catch (error: unknown) {
    if (version !== requestVersion) return;
    console.error("Carga de países:", error);
    count.textContent = "Datos no disponibles";
    grid.innerHTML = renderError("Verifica tu conexión y vuelve a intentarlo.");
  } finally {
    if (version === requestVersion) { grid.setAttribute("aria-busy", "false"); search.disabled = !ready; region.disabled = !ready; }
  }
}
grid.addEventListener("click", event => {
  if (event.target instanceof Element && event.target.closest("#retry-button")) void loadCountries();
});
// Respaldo de imágenes externas sin repetir solicitudes si también falla el recurso local.
document.addEventListener("error", event => {
  const image = event.target;
  if (image instanceof HTMLImageElement && image.hasAttribute("data-flag") && !image.dataset.fallback) {
    image.dataset.fallback = "true"; image.src = `${import.meta.env.BASE_URL}placeholder.svg`; image.alt = "Bandera no disponible";
  }
}, true);
async function router(focus = false): Promise<void> {
  const version = ++routeVersion;
  const hash = window.location.hash;
  if (!hash.startsWith("#/country/")) {
    home.hidden = false; detail.hidden = true; document.title = "Explorer App | Países del mundo";
    if (focus) required<HTMLElement>("#explore-title").focus();
    return;
  }
  home.hidden = true; detail.hidden = false;
  detail.innerHTML = '<p role="status">Cargando detalle del país…</p>';
  try {
    const match = hash.match(/^#\/country\/([A-Za-z]{2})$/);
    if (!match?.[1]) throw new Error("Código de país inválido.");
    const country = await fetchCountryByCode(match[1]);
    if (version !== routeVersion) return;
    detail.innerHTML = renderDetail(country);
    const heading = detail.querySelector<HTMLElement>("h1");
    heading?.setAttribute("tabindex", "-1");
    if (focus) heading?.focus();
    document.title = `${country.names.common} | Explorer App`;
  } catch {
    if (version !== routeVersion) return;
    detail.innerHTML = '<div role="alert" class="rounded-lg border border-red-300 bg-red-50 p-8"><h1 tabindex="-1" class="text-2xl font-bold">No fue posible cargar el país</h1><p class="mt-3">Comprueba el código y la conexión.</p><a class="mt-5 inline-flex min-h-11 items-center rounded-full bg-orange-500 px-6 font-semibold focus-visible:outline-2 focus-visible:outline-blue-500" href="#/">Volver a países</a></div>';
    if (focus) detail.querySelector<HTMLElement>("h1")?.focus();
  }
}
window.addEventListener("hashchange", () => { delayedSearch.cancel(); applyFilters(); void router(true); });
void loadCountries();
void router();
