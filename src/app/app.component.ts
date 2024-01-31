import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokemon } from './pokemon';
import { PokemonService } from './pokemon.service';
import { CommonModule } from '@angular/common';
import { PokemonComponent } from './pokemon/pokemon.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, PokemonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  pokemon: Pokemon[] = []
  pokemonService: PokemonService = inject(PokemonService)
  limit: number = 20
  offset: number = 0

  constructor() {
    this.pokemonService.getPokemon(this.limit, this.offset).then(list => this.pokemon = list)
  }

  async getNextPage() {
    this.offset += this.limit
    this.pokemon = await this.pokemonService.getPokemon(this.limit, this.offset)
  }

  async getPrevPage() {
    this.offset = this.offset > 0 ? this.offset - this.limit : 0
    this.pokemon = await this.pokemonService.getPokemon(this.limit, this.offset)
  }

  async changeLimit(limit: string) {
    const newLimit = parseInt(limit)

    this.limit = newLimit
    this.offset = 0
    this.pokemonService.getPokemon(this.limit, this.offset).then(list => this.pokemon = list)
  }
}
