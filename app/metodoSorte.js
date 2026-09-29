const botaoOrdenar = document.getElementById("btnOrdenarPorPreco");

botaoOrdenar.addEventListener("click", ordenarLivros);

function ordenarLivros() {
  const livrosOrdenados = [...livros].sort((livroA, livroB) => livroA.preco - livroB.preco);
  exibirOsLivrosNaTela(livrosOrdenados);
}
