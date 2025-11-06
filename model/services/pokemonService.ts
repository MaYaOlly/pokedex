import axios from 'axios';
import { PokemonListResult, PokemonDetail } from '../entities/pokemon';

export default class PokemonService {
  private static BASE_URL = 'https://pokeapi.co/api/v2/pokemon/';

  async list(offset = 0, limit = 20): Promise<PokemonListResult> {
    const resp = await axios.get<PokemonListResult>(
      `${PokemonService.BASE_URL}?offset=${offset}&limit=${limit}`
    );
    return resp.data;
  }

  async detail(url: string): Promise<PokemonDetail> {
    const resp = await axios.get<PokemonDetail>(url);
    return resp.data;
  }
}
