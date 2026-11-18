import { useState } from 'react';
import Contador from './components/Contador';
import CheckoutForm from './components/CheckoutForm';

const PRODUTOS_DISPONIVEIS = [
  { id: 1, nome: 'Teclado Mecânico RGB', preco: 250 },
  { id: 2, nome: 'Mouse Gamer Sem Fio', preco: 180 },
  { id: 3, nome: 'Monitor 24" IPS 144Hz', preco: 950 },
];

export default function App() {
  const [carrinho, setCarrinho] = useState([]);
  const [ultimoAdicionado, setUltimoAdicionado] = useState(null);

  function adicionarAoCarrinho(produto) {
    const novoItem = { ...produto, itemKey: Date.now() + Math.random() };
    setCarrinho([...carrinho, novoItem]);
    setUltimoAdicionado(produto.id);
    setTimeout(() => setUltimoAdicionado(null), 900);
  }

  function removerDoCarrinho(itemKey) {
    setCarrinho(carrinho.filter((item) => item.itemKey !== itemKey));
  }

  const valorTotal = carrinho.reduce((soma, item) => soma + item.preco, 0);

  return (
    <div className="min-h-screen bg-slate-50 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-6">Entregável 3 - Interatividade e useState</h1>

      <Contador />

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h2 className="text-lg font-bold text-slate-800 mb-4">Parte 2: Carrinho de Compras</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {PRODUTOS_DISPONIVEIS.map((prod) => (
            <div key={prod.id} className="border border-slate-200 rounded-lg p-4 flex flex-col justify-between">
              <div>
                <h3 className="font-semibold text-slate-800">{prod.nome}</h3>
                <p className="text-slate-600 text-sm mb-3">R$ {prod.preco.toFixed(2)}</p>
              </div>
              <button
                onClick={() => adicionarAoCarrinho(prod)}
                className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  ultimoAdicionado === prod.id
                    ? 'bg-emerald-600 text-white'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {ultimoAdicionado === prod.id ? 'Adicionado! ✓' : 'Adicionar ao Carrinho'}
              </button>
            </div>
          ))}
        </div>

        <h3 className="font-semibold text-slate-700 mb-2">Itens no Carrinho ({carrinho.length}):</h3>
        {carrinho.length === 0 ? (
          <p className="text-slate-500 text-sm mb-4">Seu carrinho está vazio.</p>
        ) : (
          <ul className="divide-y divide-slate-200 mb-4">
            {carrinho.map((item) => (
              <li key={item.itemKey} className="py-2 flex justify-between items-center">
                <span>{item.nome} - <strong>R$ {item.preco.toFixed(2)}</strong></span>
                <button
                  onClick={() => removerDoCarrinho(item.itemKey)}
                  className="text-red-600 hover:underline text-sm font-medium"
                >
                  Remover
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="text-right font-bold text-lg text-slate-900 border-t pt-3">
          Total: R$ {valorTotal.toFixed(2)}
        </div>
      </div>

      <CheckoutForm />
    </div>
  );
}
