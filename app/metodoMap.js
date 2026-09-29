function aplicarDesconto(listaDeLivros) {
  const desconto = 0.3;

  return listaDeLivros.map((livro) => ({
    ...livro,
    preco: livro.preco - livro.preco * desconto,
  }));
}
