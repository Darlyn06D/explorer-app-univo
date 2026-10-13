import type { Country } from "../types/country";
import { escapeHtml as e, formatPopulation, getCapital, getFlagDescription, regionLabel } from "../utils/format";
export function renderCountryCard(country: Country): string {
  const name = e(country.names.common);
  const code = country.codes.alpha_2;
  const url = `#/country/${encodeURIComponent(code)}`;
  const focus = "focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-500";
  return `<article class="@container group overflow-hidden rounded-lg border border-neutral-300 bg-neutral-0 shadow-sm transition duration-200 motion-reduce:transition-none hover:-translate-y-1 hover:shadow-lg focus-within:ring-2 focus-within:ring-blue-500">
  <div class="flex h-full flex-col @min-[20rem]:flex-row">
    <img class="aspect-3/2 w-full shrink-0 bg-neutral-50 object-contain @min-[20rem]:aspect-auto @min-[20rem]:w-2/5" src="${e(country.flag.url_svg || `${import.meta.env.BASE_URL}placeholder.svg`)}" alt="${e(getFlagDescription(country))}" loading="lazy" data-flag>
    <div class="flex min-w-0 flex-1 flex-col p-5">
      <h2 class="break-words text-(length:--font-country-name) font-bold leading-snug">${code ? `<a href="${url}" class="rounded-sm hover:text-blue-500 ${focus}">${name}</a>` : name}</h2>
      <dl class="mt-4 space-y-2 text-sm leading-6">
        <div><dt class="inline font-semibold">Población: </dt><dd class="inline">${formatPopulation(country.population)}</dd></div>
        <div><dt class="inline font-semibold">Región: </dt><dd class="inline">${e(regionLabel(country.region))}</dd></div>
        <div><dt class="inline font-semibold">Capital: </dt><dd class="inline break-words">${e(getCapital(country))}</dd></div>
      </dl>
      ${code ? `<a href="${url}" aria-label="Ver más información de ${name}" class="mt-5 flex min-h-11 items-center justify-center rounded-full bg-orange-500 px-5 py-2 font-semibold transition-colors hover:bg-orange-600 active:scale-95 ${focus}">Ver más <span aria-hidden="true" class="ml-2">→</span></a>` : `<p class="mt-5 text-sm text-neutral-600">Detalle no disponible para este registro.</p>`}
    </div>
  </div></article>`;
}
