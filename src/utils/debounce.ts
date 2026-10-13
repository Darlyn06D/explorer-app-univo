/** Agrupa entradas consecutivas; solo ejecuta la última tras la pausa. */
export function debounce(callback: () => void, delay = 300): { run: () => void; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | undefined;
  function cancel(): void { if (timer !== undefined) clearTimeout(timer); timer = undefined; }
  return { run: () => { cancel(); timer = setTimeout(() => { timer = undefined; callback(); }, delay); }, cancel };
}
