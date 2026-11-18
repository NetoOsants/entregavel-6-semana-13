# Entregável 3 – Interatividade e useState (Semana 10)

Aplicação interativa contendo Contador com `useState`, Carrinho de Compras com adição/remoção imutável e Formulário de Checkout com validação visual em Tailwind CSS.

## Parte 4 – Reflexão (Para Pensar)

**Por que não devemos mutar o estado diretamente (ex: `carrinho.push(item)`) e qual a importância do spread operator (`[...carrinho, item]`) no React?**

- **Por que não mutar diretamente (`carrinho.push(item)`):** O React detecta mudanças de estado comparando a referência de memória do valor anterior com a do novo valor (`Object.is`). Quando fazemos `.push()`, alteramos o array original mantendo o **mesmo endereço de memória**, então o React não percebe que houve mudança e **não re-renderiza a tela**.
- **Importância do spread operator (`[...carrinho, item]`):** O spread operator cria um **novo array em um novo endereço de memória**, copiando todos os itens antigos e adicionando o novo item ao final. Assim, garantimos a imutabilidade do estado e fazemos o React disparar a re-renderização da interface imediatamente.
