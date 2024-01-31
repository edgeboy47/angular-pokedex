import { Component, Input } from '@angular/core';
import { Pokemon } from '../pokemon';

@Component({
  selector: 'pokemon-card',
  standalone: true,
  imports: [],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})

export class PokemonComponent {
  @Input() pokemon!: Pokemon

  handleClick() {
    console.log('id', this.pokemon.id)
  }
}
