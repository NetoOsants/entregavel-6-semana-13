import { useState, useEffect } from 'react';

export default function App() {
  const [termoBusca, setTermoBusca] = useState('pikachu');
  const [pokemon, setPokemon] = useState(null);
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');
  const [naoEncontrado, setNaoEncontrado] = useState(false);

  async function buscarPokemon(nomeParaBuscar) {
    const query = nomeParaBuscar.trim().toLowerCase();
    if (!query) return;

    setLoading(true);
    setErro('');
    setNaoEncontrado(false);

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
      if (response.status === 404) {
        setPokemon(null);
        setNaoEncontrado(true);
        return;
      }
      if (!response.ok) {
        throw new Error('Falha ao comunicar com o servidor da API.');
      }
      const dados = await response.json();
      setPokemon(dados);
    } catch (err) {
      setPokemon(null);
      setErro(err.message || 'Erro de conexão ao buscar dados.');
    } finally {
      setLoading(false);
    }
  }

  // Parte 1: Chamada inicial dentro do useEffect ao abrir o app
  useEffect(() => {
    buscarPokemon('pikachu');
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    buscarPokemon(termoBusca);
  }

  function limparBusca() {
    setTermoBusca('');
    setNaoEncontrado(false);
    setErro('');
    buscarPokemon('pikachu');
  }

  return (
    <div className="min-h-screen bg-slate-100 p-8 max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">Buscador PokeAPI</h1>
      <p className="text-slate-600 mb-6">Semana 13 - Consumo de API Pública com estados de Loading, Error e 404</p>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={termoBusca}
          onChange={(e) => setTermoBusca(e.target.value)}
          placeholder="Digite o nome de um Pokémon (ex: charizard, mew)..."
          className="flex-1 px-4 py-2 border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-5 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      {loading && (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200 text-center">
          <p className="text-blue-600 font-semibold animate-pulse">Carregando dados da API...</p>
        </div>
      )}

      {!loading && erro && (
        <div className="bg-red-50 border border-red-300 text-red-800 p-6 rounded-xl">
          <h2 className="font-bold mb-1">Erro na requisição</h2>
          <p className="mb-4">{erro}</p>
          <button onClick={limparBusca} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm">
            Tentar novamente
          </button>
        </div>
      )}

      {!loading && naoEncontrado && (
        <div className="bg-amber-50 border border-amber-300 text-amber-900 p-6 rounded-xl text-center">
          <h2 className="text-lg font-bold mb-2">Pokémon não encontrado (Erro 404)</h2>
          <p className="text-sm mb-4">
            Não encontramos nenhum resultado para <strong>"{termoBusca}"</strong>. Verifique a grafia e tente novamente.
          </p>
          <button
            onClick={limparBusca}
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-medium rounded-lg text-sm"
          >
            Limpar busca
          </button>
        </div>
      )}

      {!loading && !erro && !naoEncontrado && pokemon && (
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center text-center">
          <img
            src={pokemon.sprites?.front_default}
            alt={pokemon.name}
            className="w-32 h-32 object-contain mb-2"
          />
          <h2 className="text-2xl font-bold capitalize text-slate-900">{pokemon.name}</h2>
          <span className="text-xs text-slate-500 mb-4">ID #{pokemon.id}</span>
          <div className="flex gap-4 text-sm text-slate-700">
            <span className="bg-slate-100 px-3 py-1 rounded-full">Altura: {pokemon.height / 10}m</span>
            <span className="bg-slate-100 px-3 py-1 rounded-full">Peso: {pokemon.weight / 10}kg</span>
          </div>
        </div>
      )}
    </div>
  );
}
