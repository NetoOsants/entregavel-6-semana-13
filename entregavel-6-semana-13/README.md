# Entregável 6 – Consumo de API Pública (Semana 13)

Aplicação React integrada à PokeAPI utilizando `async/await`, `useEffect` e tratamento completo dos estados de `Loading`, `Error`, `Success` e `404 (Vazio/Não Encontrado)` com botão de reset.

## Parte 4 – Reflexão (Para Pensar)

**Por que o `useEffect` é o local ideal para chamadas de API? Como o `try/catch` e o `response.ok` nos ajudam a lidar com erros de rede e erros HTTP?**

- **Por que o `useEffect` é ideal para chamadas iniciais de API:** Chamar um `fetch` diretamente no corpo do componente faria a requisição ser disparada repetidamente a cada re-renderização. O `useEffect` com array de dependências controlado (`[]`) garante que a busca inicial ocorra apenas quando o componente é montado na tela.
- **Papel do `try/catch` e do `response.ok`:** O `try/catch` captura falhas de rede (como queda de internet ou servidor inacessível) sem travar a interface. Já o `fetch` **não rejeita a Promise sozinho em erros HTTP como 404 ou 500**; por isso, verificar `if (!response.ok)` (e `response.status === 404`) é indispensável para tratar respostas inválidas e exibir mensagens claras ao usuário.
