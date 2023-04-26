const listaDeCompras = {
  Açougue: [],
  Bebida: [],
  Congelado: [],
  Doce: [],
  Enlatado: [],
  Frios: [],
  Grão: [],
  Higiene: [],
  Hortifruit: [],
  Laticínio: [],
  Limpeza: [],
  Massa: [],
  Padaria: [],
  Salgado: [],
  Tempero: [],
};

const form = document.querySelector('form');
const lista = document.getElementById('lista');

form.addEventListener('submit', event => {
  event.preventDefault();

  const itemInput = document.getElementById('item');
  const categoriaInput = document.getElementById('categoria');

  const item = itemInput.value;
  const categoria = categoriaInput.value;

  if (categoria && listaDeCompras[categoria]) {
    listaDeCompras[categoria].push(item);
    itemInput.value = '';
    categoriaInput.selectedIndex = 0;
    atualizarLista();
  }
});

function atualizarLista() {
  lista.innerHTML = '';
  for (const categoria in listaDeCompras) {
    const itens = listaDeCompras[categoria];
    if (itens.length > 0) {
      const listaCategoria = document.createElement('li');
      listaCategoria.textContent = `${categoria}: `;
      const listaItens = document.createElement('ul');
      itens.forEach(item => {
        const itemLista = document.createElement('li');
        itemLista.textContent = item;
        const botaoRemover = document.createElement('button');
        botaoRemover.textContent = 'Remover';
        botaoRemover.addEventListener('click', () => {
          const indice = listaDeCompras[categoria].indexOf(item);
          listaDeCompras[categoria].splice(indice, 1);
          atualizarLista();
        });
        itemLista.appendChild(botaoRemover);
        listaItens.appendChild(itemLista);
      });
      listaCategoria.appendChild(listaItens);
      lista.appendChild(listaCategoria);
    }
  }
}

