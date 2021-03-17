import React, { useState, useEffect } from "react";
import "./styles.scss";

import pokemonServices from './services/pokemonServices';

import PokeList from './components/PokeList';
import SelectedPoke from './components/SelectedPoke';

const usePokemon = (initialPokeList)=>{
  const [pokemen, setPokemen] = useState(initialPokeList);
  const [selectedPokemon, setSelectedPokemon] = useState({});

  useEffect(() => {
    setPokemen(pokemonServices.fetchAllPoke());
  }, []);

  const handlePoke = (id) => {
    pokemonServices.fetchSelectedPoke(id).then((data) => {
        setSelectedPokemon(data);
    });
  };

  return([selectedPokemon, handlePoke, pokemen]);
}

function App() {
  const [selectPokemon, handlePoke, pokemen] = usePokemon([]);
  
  return (
    <div className="App">
      <SelectedPoke selectedPokemon={selectPokemon} />
      <PokeList handlePoke={handlePoke} pokemen={pokemen} />
    </div>
  );
}

export default App;