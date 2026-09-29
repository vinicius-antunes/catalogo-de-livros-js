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
