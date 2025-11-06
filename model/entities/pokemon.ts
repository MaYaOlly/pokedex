export interface PokemonListResult {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonDetail {
  id: number;
  name: string;
  height: number;
  weight: number;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: { front_default?: string | null };
    };
  };
  types: { slot: number; type: { name: string; url: string } }[];
}