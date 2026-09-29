let btnOrdenar = document.getElementById('btnOrdenarPorPreco')
btnOrdenar.addEventListener('click', ordenarLivros)

function ordenarLivros() {
    let livrosOrdenados = livros.sort((a, b) => a.preco - b.preco)
    exibirOsLivrosNaTela(livrosOrdenados)
}