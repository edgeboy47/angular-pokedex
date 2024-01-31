import { Injectable } from '@angular/core';
import { Pokemon } from './pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private baseUrl = 'https://pokeapi.co/api/v2/';
  constructor() {}

  async getPokemon(limit: number, offset: number = 0): Promise<{}[]> {
    const params = new URLSearchParams();
    params.set('limit', limit.toString());
    params.set('offset', offset.toString());
    const url = `${this.baseUrl}pokemon?${params.toString()}`
    const res = await fetch(url, {
      cache: 'force-cache',
    });

    if (!res || !res.ok || res.status !== 200) return [];

    const json = await res.json();

    const results = (json?.results || []) as { name: string; url: string }[];
    return results.map((poke) => ({
      ...poke,
      id: poke.url.split('/').at(-2),
      imgUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${poke.url.split('/').at(-2)}.png`,
    })) as Pokemon[];
  }
}
