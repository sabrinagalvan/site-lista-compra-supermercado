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
const valorTotal = document.getElementById('valor-total');

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
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.addEventListener('change', () => {
          itemLista.classList.toggle('checked');
        });
        itemLista.appendChild(checkbox);
        const itemNome = document.createElement('span');
        itemNome.textContent = item;
        itemLista.appendChild(itemNome);
        const itemQuantidadeInput = document.createElement('input');
        itemQuantidadeInput.type = 'number';
        itemQuantidadeInput.min = '1';
        itemQuantidadeInput.value = '1';
        itemLista.appendChild(itemQuantidadeInput);
        const itemValorInput = document.createElement('input');
        itemValorInput.type = 'text';
        itemValorInput.step = '0.01';
        itemValorInput.placeholder = 'Ex: 0.00';
        itemValorInput.addEventListener('change', () => {
          atualizarTotal();
        });
        itemLista.appendChild(itemValorInput);
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
  atualizarTotal();
}

function atualizarTotal() {
  let total = 0;
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach(input => {
    if (input.value) {
      const itemLista = input.parentNode;
      const itemQuantidadeInput = itemLista.querySelector('input[type="number"]');
      const quantidade = parseInt(itemQuantidadeInput.value);
      const preco = parseFloat(input.value);
      total += quantidade * preco;
    }
  });
  valorTotal.textContent = `Valor total: R$ ${total.toFixed(2)}`;
}