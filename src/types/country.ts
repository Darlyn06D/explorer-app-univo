export interface CountryName { common: string; }
export interface Country {
  names: CountryName;
  codes: { alpha_2: string };
  flag: { url_svg: string; description: string };
  population: number | null;
  region: string;
  capitals: { name: string }[];
}
