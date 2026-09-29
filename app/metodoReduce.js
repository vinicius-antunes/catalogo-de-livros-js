function calcularValorTotalDeLivrosDisponiveis(listaDeLivros) {
  return listaDeLivros
    .reduce((acumulador, livro) => acumulador + livro.preco, 0)
    .toFixed(2);
}
