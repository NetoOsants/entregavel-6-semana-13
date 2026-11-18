import { useState } from 'react';

export default function CheckoutForm() {
  const [nome, setNome] = useState('');
  const [erro, setErro] = useState('');
  const [sucesso, setSucesso] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim()) {
      setErro('O campo de nome é obrigatório para finalizar a compra.');
      setSucesso(false);
      return;
    }
    setErro('');
    setSucesso(true);
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mt-6">
      <h2 className="text-lg font-bold text-slate-800 mb-4">Parte 3 (Desafio): Checkout com Validação</h2>
      <div className="mb-4">
        <label className="block text-sm font-medium text-slate-700 mb-1">Nome completo do comprador</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => {
            setNome(e.target.value);
            if (erro) setErro('');
          }}
          placeholder="Digite seu nome..."
          className={`w-full px-3 py-2 border rounded-lg focus:outline-none ${
            erro ? 'border-red-500 bg-red-50' : 'border-slate-300'
          }`}
        />
        {erro && <p className="text-red-600 text-sm mt-1 font-medium">{erro}</p>}
      </div>
      <button type="submit" className="px-5 py-2 bg-emerald-600 text-white font-medium rounded-lg hover:bg-emerald-700">
        Finalizar Pedido
      </button>
      {sucesso && (
        <p className="text-emerald-700 bg-emerald-50 border border-emerald-200 p-3 rounded-lg mt-3 text-sm">
          Pedido confirmado com sucesso para <strong>{nome}</strong>!
        </p>
      )}
    </form>
  );
}
