import { useState } from 'react';

export default function Contador() {
  const [contador, setContador] = useState(0);

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-6">
      <h2 className="text-lg font-bold text-slate-800 mb-2">Parte 1: Contador Simples (useState)</h2>
      <p className="text-slate-600 mb-4">Valor atual do estado: <strong className="text-blue-600 text-xl">{contador}</strong></p>
      <div className="flex gap-2">
        <button onClick={() => setContador(contador + 1)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Incrementar (+1)
        </button>
        <button onClick={() => setContador(0)} className="px-4 py-2 bg-slate-200 text-slate-700 rounded-lg hover:bg-slate-300">
          Zerar
        </button>
      </div>
    </div>
  );
}
