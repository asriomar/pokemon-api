import React, { useState } from 'react';

function PokemonFetcher() {
  const [pokemonName, setPokemonName] = useState('');
  const [pokemonSprite, setPokemonSprite] = useState('');
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error('Could not fetch resource');
      }

      const data = await response.json();
      const sprite = data.sprites.front_default;
      setPokemonSprite(sprite);
      setError(null);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex  p-4 min-h-screen w-screen bg-gradient-to-r from-green-500 to-blue-400 justify-center items-center">
      <div className="md:w-1/3 mx-auto">
        <input
          type="text"
          value={pokemonName}
          onChange={(e) => setPokemonName(e.target.value)}
          placeholder="Enter Pokemon name"
          className="border border-gray-300 rounded p-2 mb-4 mx-auto md:mr-2"
        />
        <button
          onClick={fetchData}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          Fetch Pokemon
        </button>
        {error && <p className="text-red-500 mt-4">{error}</p>}
        {pokemonSprite && (
          <div className="border border-1 rounded-lg w-full shadow-lg">
            <img
              src={pokemonSprite}
              alt="Pokemon Sprite"
              className="mx-auto mt-4 "
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default PokemonFetcher;
