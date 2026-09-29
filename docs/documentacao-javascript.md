# Documentação do JavaScript

Esta documentação explica o funcionamento dos arquivos JavaScript do projeto **Catálogo de Livros**, mantendo o código principal limpo e fácil de consultar.

## Fluxo da aplicação

1. `main.js` busca os livros na API.
2. `metodoMap.js` cria uma lista com 30% de desconto.
3. `metodoForEach.js` monta os cartões dos livros na página.
4. `metodoFilter.js` filtra os livros pelos botões.
5. `metodoSorte.js` ordena os livros pelo preço.
6. `metodoReduce.js` soma o valor dos livros disponíveis.

## Responsabilidade de cada arquivo

| Arquivo | Responsabilidade |
|---|---|
| `main.js` | Busca os dados da API e inicia a aplicação. |
| `metodoForEach.js` | Percorre os livros e cria os elementos exibidos na tela. |
| `metodoMap.js` | Gera uma nova lista com os preços atualizados. |
| `metodoFilter.js` | Filtra os livros por categoria ou disponibilidade. |
| `metodoSorte.js` | Ordena os livros do menor para o maior preço. |
| `metodoReduce.js` | Soma o preço dos livros disponíveis. |

## Funções

### `buscarLivrosDaAPI()`

Busca os dados do endereço armazenado em `endpointDaAPI`, converte a resposta para JSON, aplica o desconto e exibe os livros.

- **Parâmetros:** nenhum.
- **Retorno:** não retorna um valor diretamente.
- **Recursos:** `async`, `await`, `fetch()` e `.json()`.

### `aplicarDesconto(listaDeLivros)`

Cria uma nova lista de livros com 30% de desconto, sem alterar diretamente os objetos originais.

- **Parâmetro:** `listaDeLivros` — array de livros recebido da API.
- **Retorno:** novo array contendo os preços com desconto.
- **Método principal:** `map()`.

### `exibirOsLivrosNaTela(listaDeLivros)`

Limpa a área de exibição e cria um cartão HTML para cada livro recebido.

- **Parâmetro:** `listaDeLivros` — array que será exibido.
- **Retorno:** não possui retorno; modifica o DOM.
- **Método principal:** `forEach()`.

### `filtrarLivros()`

É executada quando um botão de filtro é clicado. Lê o valor do botão e escolhe o filtro adequado.

- **Parâmetros:** nenhum parâmetro declarado.
- **Retorno:** não possui retorno; atualiza a interface.
- **Recursos:** evento de clique, `this`, operador ternário e DOM.

### `filtrarPorCategoria(categoria)`

Seleciona somente os livros cuja categoria corresponde ao valor recebido.

- **Parâmetro:** `categoria` — valor como `front-end`, `back-end` ou `dados`.
- **Retorno:** array com os livros da categoria.
- **Método principal:** `filter()`.

### `filtrarLivroPorDisponibilidade()`

Seleciona livros cuja quantidade seja maior que zero.

- **Parâmetros:** nenhum.
- **Retorno:** array com livros disponíveis.
- **Método principal:** `filter()`.

### `exibirValorTotalDeLivrosDisponiveisNaTela(valorTotal)`

Cria o bloco HTML que mostra a soma dos livros disponíveis.

- **Parâmetro:** `valorTotal` — valor calculado por `reduce()`.
- **Retorno:** não possui retorno; modifica o DOM.

### `ordenarLivros()`

Cria uma cópia do array de livros e ordena os itens do menor para o maior preço.

- **Parâmetros:** nenhum.
- **Retorno:** não possui retorno; exibe a lista ordenada.
- **Recursos:** operador spread e `sort()`.

### `calcularValorTotalDeLivrosDisponiveis(listaDeLivros)`

Soma os preços dos livros recebidos e formata o resultado com duas casas decimais.

- **Parâmetro:** `listaDeLivros` — array de livros disponíveis.
- **Retorno:** total formatado como texto.
- **Métodos principais:** `reduce()` e `toFixed()`.

## Métodos e nomenclaturas

| Recurso | Como funciona |
|---|---|
| `document.getElementById()` | Procura um elemento pelo atributo `id`. |
| `document.querySelectorAll()` | Procura todos os elementos que correspondem ao seletor CSS. |
| `addEventListener()` | Executa uma função quando ocorre um evento, como um clique. |
| `fetch()` | Realiza uma requisição para obter dados externos. |
| `async` | Indica que uma função trabalha com operações assíncronas. |
| `await` | Aguarda uma promessa ser concluída antes de continuar. |
| `forEach()` | Executa uma ação para cada elemento do array. |
| `map()` | Cria um novo array transformando cada elemento. |
| `filter()` | Cria um novo array somente com os elementos aprovados pela condição. |
| `sort()` | Ordena os elementos de um array usando uma função de comparação. |
| `reduce()` | Reduz todos os elementos do array a um único resultado. |
| `...livro` | Copia as propriedades do objeto usando o operador spread. |
| Template string | Permite inserir valores em textos com crases e `${valor}`. |
| Operador ternário | Escolhe entre dois valores com `condição ? valor1 : valor2`. |
| `innerHTML` | Lê ou substitui o conteúdo HTML de um elemento. |
| `toFixed(2)` | Formata um número com duas casas decimais. |

## Código comentado para estudo

### `app/main.js`

```javascript
let livros = [];
const endpointDaAPI = "https://guilhermeonrails.github.io/casadocodigo/livros.json";

buscarLivrosDaAPI();

async function buscarLivrosDaAPI() {
  // Aguarda a resposta da requisição HTTP.
  const resposta = await fetch(endpointDaAPI);

  // Converte o conteúdo recebido para objetos JavaScript.
  livros = await resposta.json();

  const livrosComDesconto = aplicarDesconto(livros);
  exibirOsLivrosNaTela(livrosComDesconto);
}
```

### `app/metodoMap.js`

```javascript
function aplicarDesconto(listaDeLivros) {
  const desconto = 0.3;

  // map() cria um novo array com os preços alterados.
  return listaDeLivros.map((livro) => ({
    ...livro,
    preco: livro.preco - livro.preco * desconto,
  }));
}
```

### `app/metodoForEach.js`

```javascript
const elementoParaInserirLivros = document.getElementById("livros");
const elementoComValorTotalDeLivrosDisponiveis = document.getElementById("valor_total_livros_disponiveis");

function exibirOsLivrosNaTela(listaDeLivros) {
  elementoComValorTotalDeLivrosDisponiveis.innerHTML = "";
  elementoParaInserirLivros.innerHTML = "";

  // forEach() cria um cartão para cada livro.
  listaDeLivros.forEach((livro) => {
    const disponibilidade = livro.quantidade > 0
      ? "livro__imagens"
      : "livro__imagens indisponivel";

    elementoParaInserirLivros.innerHTML += `
      <div class="livro">
        <img class="${disponibilidade}" src="${livro.imagem}" alt="${livro.titulo}">
        <h2 class="livro__titulo">${livro.titulo}</h2>
        <p class="livro__descricao">${livro.autor}</p>
        <p class="livro__preco">R$${livro.preco.toFixed(2)}</p>
        <div class="tags">
          <span class="tag">${livro.categoria}</span>
        </div>
      </div>
    `;
  });
}
```

### `app/metodoFilter.js`

```javascript
const botoes = document.querySelectorAll(".btn");

botoes.forEach((botao) => {
  botao.addEventListener("click", filtrarLivros);
});

function filtrarLivros() {
  const elementoBotao = document.getElementById(this.id);
  const categoria = elementoBotao.value;
  const livrosFiltrados = categoria === "disponivel"
    ? filtrarLivroPorDisponibilidade()
    : filtrarPorCategoria(categoria);

  exibirOsLivrosNaTela(livrosFiltrados);

  if (categoria === "disponivel") {
    const valorTotal = calcularValorTotalDeLivrosDisponiveis(livrosFiltrados);
    exibirValorTotalDeLivrosDisponiveisNaTela(valorTotal);
  }
}

function filtrarPorCategoria(categoria) {
  // filter() mantém apenas os livros da categoria recebida.
  return livros.filter((livro) => livro.categoria === categoria);
}

function filtrarLivroPorDisponibilidade() {
  return livros.filter((livro) => livro.quantidade > 0);
}

function exibirValorTotalDeLivrosDisponiveisNaTela(valorTotal) {
  elementoComValorTotalDeLivrosDisponiveis.innerHTML = `
    <div class="livros__disponiveis">
      <p>Todos os livros disponíveis por R$ <span id="valor">${valorTotal}</span></p>
    </div>
  `;
}
```

### `app/metodoSorte.js`

```javascript
const botaoOrdenar = document.getElementById("btnOrdenarPorPreco");

botaoOrdenar.addEventListener("click", ordenarLivros);

function ordenarLivros() {
  // O spread cria uma cópia para preservar a ordem do array original.
  const livrosOrdenados = [...livros].sort((livroA, livroB) => livroA.preco - livroB.preco);
  exibirOsLivrosNaTela(livrosOrdenados);
}
```

### `app/metodoReduce.js`

```javascript
function calcularValorTotalDeLivrosDisponiveis(listaDeLivros) {
  // reduce() acumula o preço de todos os livros em um único total.
  return listaDeLivros
    .reduce((acumulador, livro) => acumulador + livro.preco, 0)
    .toFixed(2);
}
```

---

[← Voltar ao README principal](../README.md)
