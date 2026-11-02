import { useState } from 'react'
import './App.css' //Nesse arquiv também tem o css para o container dos cards ".cards"
import { useRef } from 'react';
import PokemonCard from './componentes/PokemonCard/PokemonCard';



function App() {

  const inputRef = useRef();
  const [pokemonCards,setPokemonCards] = useState('');

  const buscarPokemon = async () => {

    const tipoPokemon = inputRef.current.value;

    const resposta = await fetch(`http://localhost:3000/pokemon/${tipoPokemon}`);

    const pokemon = await resposta.json();

    const pokemonMapeadoParaCard = pokemon.map(p => <PokemonCard {...p}/>);

    setPokemonCards(pokemonMapeadoParaCard);

  }

  return (
    <main>
      <h1>Liga Pokemon</h1>
      <input type="text" name="tipo" id="tipo" ref={inputRef} />
      <button onClick={buscarPokemon}>Buscar</button>
      <div className='cards'>
        {pokemonCards}
      </div>
      
    </main>
  )
}

export default App
