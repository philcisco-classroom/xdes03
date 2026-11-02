import React from 'react'

//O CSS esta no arquivo PokemonCard.css
import './PokemonCard.css';

export default function PokemonCard({nome,imagem}) {
  return (
    
    <div className='card'>
        <h2>{nome}</h2>
        <img src={imagem} alt={`pokemon ${nome}`} />
    </div>

  )
}