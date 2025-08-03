import { useState, useEffect } from 'react';
import '../assets/PokemonMemoryGame.css';

const PokemonMemoryGame = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [selectedPokemon, setSelectedPokemon] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=12');
        const data = await response.json();
        const pokemonDetails = await Promise.all(
          data.results.map(async (pokemon) => {
            const res = await fetch(pokemon.url);
            const pokemonData = await res.json();
            return {
              id: pokemonData.id,
              name: pokemonData.name,
              sprite: pokemonData.sprites.front_default,
            };
          })
        );
        setPokemonList(pokemonDetails);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching Pokémon:', error);
        setIsLoading(false);
      }
    };

    fetchPokemon();
  }, []);

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

  const handleCardClick = (pokemonId) => {
    if (selectedPokemon.includes(pokemonId)) {
      setGameOver(true);
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
      setCurrentScore(0);
      setSelectedPokemon([]);
    } else {
      setSelectedPokemon([...selectedPokemon, pokemonId]);
      setCurrentScore(currentScore + 1);
      setPokemonList(shuffleArray(pokemonList));
    }
  };

  const resetGame = () => {
    setGameOver(false);
    setCurrentScore(0);
    setSelectedPokemon([]);
    setPokemonList(shuffleArray(pokemonList));
  };

  return (
    <div className="game-container">
      <header className="game-header">
        <h1>Pokémon Memory Game</h1>
        <div className="scores">
          <div className="score">Current Score: {currentScore}</div>
          <div className="score">Best Score: {bestScore}</div>
        </div>
      </header>

      {gameOver && (
        <div className="game-over">
          <h2>Game Over!</h2>
          <p>Your score: {currentScore}</p>
          <button onClick={resetGame}>Play Again</button>
        </div>
      )}

      {isLoading ? (
        <div className="loading">Loading Pokémon...</div>
      ) : (
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.id}
              className="pokemon-card"
              onClick={() => handleCardClick(pokemon.id)}
            >
              <img src={pokemon.sprite} alt={pokemon.name} />
              <p>{pokemon.name}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PokemonMemoryGame;