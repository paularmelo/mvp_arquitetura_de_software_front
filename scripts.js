/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const getList = async () => {

  //let url = 'http://127.0.0.1:5000/receitas';
  let url = 'http://localhost:5001/receitas';

  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.receitas.forEach(item => insertList(item.id, item.titulo, item.categoria, item.status))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

const newImagem = () => {
  let url = 'https://api.api-ninjas.com/v1/randomimage?category=food';
  fetch(url, {
    method: 'get',
    headers: { 'X-Api-Key': 'PaiTiCKHYABvn8Xni6C3hQ==z1SpIyqQJwabUJph', 'Accept': 'image/jpg' }
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.blob();
    })
    .then((blob) => {

      // Crie uma URL temporária para o Blob
      const blobUrl = URL.createObjectURL(blob);

      // Crie um elemento <img> e configure o atributo src com a URL do Blob
      const imageElement = document.createElement('img');
      imageElement.src = blobUrl;

      // Adicione o elemento <img> ao seu documento HTML (por exemplo, a um elemento div com id "imagem-container")
      const containerElement = document.getElementById('imagem-dinamica');
      containerElement.src = imageElement.src;
      containerElement.appendChild(imageElement);

      console.log(blob);

    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento inicial dos dados
  --------------------------------------------------------------------------------------
*/
getList()


/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postItem = async (inputTitulo, inputStatus, inputCategoria, inputPreparo) => {
  const formData = new FormData();
  formData.append('titulo', inputTitulo);
  formData.append('status', inputStatus);
  formData.append('preparo', inputPreparo);
  formData.append('categoria', inputCategoria);

  let url = 'http://localhost:5001/receita';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .then((data) => {
      newIngrediente2(data.id)
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Função para colocar um item na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const putItem = async (inputTitulo, inputStatus, inputCategoria, inputPreparo) => {
  const formData = new FormData();
  formData.append('titulo', inputTitulo);
  formData.append('status', inputStatus);
  formData.append('preparo', inputPreparo);
  formData.append('categoria', inputCategoria);

  let url = 'http://localhost:5001/receita';
  fetch(url, {
    method: 'put',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/*
  --------------------------------------------------------------------------------------
  Função para colocar um ingrediente na lista do servidor via requisição POST
  --------------------------------------------------------------------------------------
*/
const postIngrediente = async (inputDescricao, inputQuantidade, inputUnidadeMedida, inputReceitaID) => {
  const formData = new FormData();
  formData.append('descricao', inputDescricao);
  formData.append('quantidade', inputQuantidade);
  formData.append('unidade_medida', inputUnidadeMedida);
  formData.append('receita_id', inputReceitaID);

  let url = 'http://localhost:5001/ingrediente';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para criar um botão close para cada item da lista
  --------------------------------------------------------------------------------------
*/
const insertButton = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);

}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão detalhe para cada item da lista
  --------------------------------------------------------------------------------------
*/
const inserDetailtButton = (parent) => {
  let span = document.createElement("spanDetail");
  let txt = document.createTextNode("...");
  span.className = "detail";
  span.appendChild(txt);
  parent.appendChild(span);

}
/*
  --------------------------------------------------------------------------------------
  Função para criar um botão para adicionar ingredientes na lista
  --------------------------------------------------------------------------------------
*/
const inserAddButton = (parent) => {
  let span = document.createElement("spanDetail");
  let txt = document.createTextNode("+");
  span.className = "addIng";
  span.appendChild(txt);
  parent.appendChild(span);

}



/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  // var table = document.getElementById('myTable');
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Removido!")
      }
    }
  }
}
/*
  --------------------------------------------------------------------------------------
  Função para remover um item da lista de acordo com o click no botão close
  --------------------------------------------------------------------------------------
*/
const removeIngredient = () => {
  let close = document.getElementsByClassName("close");
  let receita_id = document.getElementById("idReceita").value;

  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza?")) {
        div.remove()
        deleteIngrediente(nomeItem, receita_id)
        alert("Ingrediente Removido!")
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para mostrar detalhe de um item da lista de acordo com o click
  --------------------------------------------------------------------------------------
*/
const detailElement = () => {
  let open = document.getElementsByClassName("detail");

  let i;
  for (i = 0; i < open.length; i++) {
    open[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      detailItem(nomeItem)
    }
  }
}

const adicionarIngredientesAPI = () => {
  //alert("Linha clicada: " + row.rowIndex);
  let open = document.getElementsByClassName("addIng");

  let i;
  for (i = 0; i < open.length; i++) {
    open[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[1].innerHTML
      console.info('Teste:', nomeItem.formData)
      //document.getElementById("newDescricao").value = nomeItem.valueOf
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para deletar um item da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://localhost:5001/receita?titulo=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}
/*
  --------------------------------------------------------------------------------------
  Função para deletar um ingrediente da lista do servidor via requisição DELETE
  --------------------------------------------------------------------------------------
*/
const deleteIngrediente = (item, receita_id) => {
  console.log(item)
  let url = 'http://localhost:5001/ingrediente?descricao=' + item + '&receita=' + receita_id;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}


/*
  --------------------------------------------------------------------------------------
  Função para detalhar um item da lista do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/
const detailItem = (item) => {
  console.log(item)
  let url = 'http://localhost:5001/receita?titulo=' + item;
  fetch(url, {
    method: 'get'
  })
    .then((response) => response.json())
    .then((data) => {
      insertDetailItem(data.id, data.titulo, data.categoria, data.status, data.preparo, [data.ingredientes])
    })
    .catch((error) => {
      console.error('Error:', error);
    });

}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const newItem = () => {
  let inputTitulo = document.getElementById("newTitulo").value;
  let inputPreparo = document.getElementById("newPreparo").value;

  var inputStatus;
  var inputCategoria;

  if (document.getElementById('AP').checked) {
    inputStatus = document.getElementById('AP').value;
  } else if (document.getElementById('RE').checked) {
    inputStatus = document.getElementById('RE').value;
  } else if (document.getElementById('NT').checked) {
    inputStatus = document.getElementById('NT').value;
  }

  if (document.getElementById('DOCE').checked) {
    inputCategoria = document.getElementById('DOCE').value;
  } else if (document.getElementById('SAL').checked) {
    inputCategoria = document.getElementById('SAL').value;
  }

  if (inputTitulo === '') {
    alert("Escreva o titulo da receita!");
  }
  else {
    //insertList(inputTitulo, status_value, inputCategoria)
    postItem(inputTitulo, inputStatus, inputCategoria, inputPreparo)
    alert("Item adicionado!")
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para adicionar um novo item com nome, quantidade e valor 
  --------------------------------------------------------------------------------------
*/
const updateItem = () => {
  alert("Teste!")

  let inputTitulo = document.getElementById("newTitulo").value;
  let inputPreparo = document.getElementById("newPreparo").value;

  var inputStatus;
  var inputCategoria;

  if (document.getElementById('AP').checked) {
    inputStatus = document.getElementById('AP').value;
  } else if (document.getElementById('RE').checked) {
    inputStatus = document.getElementById('RE').value;
  } else if (document.getElementById('NT').checked) {
    inputStatus = document.getElementById('NT').value;
  }

  if (document.getElementById('DOCE').checked) {
    inputCategoria = document.getElementById('DOCE').value;
  } else if (document.getElementById('SAL').checked) {
    inputCategoria = document.getElementById('SAL').value;
  }

  if (inputTitulo === '') {
    alert("Escreva o titulo da receita!");
  }
  else {
    //insertList(inputTitulo, status_value, inputCategoria)
    putItem(inputTitulo, inputStatus, inputCategoria, inputPreparo)
    alert("Item atulizado!")
  }
}



const newIngrediente = () => {
  let inputIngrediente = document.getElementById("newDescricao").value;
  let inputQuantity = document.getElementById("newQtd").value;
  let inputUnidade = document.getElementById("newUnidade").value;

  var item = [inputIngrediente, inputQuantity, inputUnidade]
  var table = document.getElementById('myIngredientes');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }

  let receita_id = document.getElementById("idReceita").value;
  console.info('receita_id1:', receita_id);

  if (receita_id != null) {
    console.info('receita_id2:', receita_id);
    postIngrediente(descricao, qunatidade, unidade_medida, receita_id)
  }


}

const newIngrediente2 = (receita_id) => {
  var table = document.getElementById('myIngredientes');
  var l = table.rows.length;

  for (var i = 1; i < l; i++) {
    var tr = table.rows[i];
    var descricao = tr.cells.item(0).innerHTML;
    var qunatidade = tr.cells.item(1).innerHTML;
    var unidade_medida = tr.cells.item(2).innerHTML;

    postIngrediente(descricao, qunatidade, unidade_medida, receita_id)


  }
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista apresentada
  --------------------------------------------------------------------------------------
*/
const insertList = (inputId, inputTitulo, inputCategoria, inputStatus) => {

  var item = [inputId, inputTitulo, inputCategoria, inputStatus]
  var table = document.getElementById('myTable');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  inserDetailtButton(row.insertCell(-1))
  detailElement()
  insertButton(row.insertCell(-1))
  removeElement()
}


/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista de ingredientes
  --------------------------------------------------------------------------------------
*/
const insertListIngredientes = (inputDescricao, inputQuantidade, inputUnidadeMedida) => {
  var item = [inputDescricao, inputQuantidade, inputUnidadeMedida]
  var table = document.getElementById('myIngredientes');
  var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButton(row.insertCell(-1))
  removeIngredient()
}
/*
  --------------------------------------------------------------------------------------
  Função para preencher item na tela
  --------------------------------------------------------------------------------------
*/
function insertDetailItem(inputId, inputTitulo, inputCategoria, inputStatus, inputPreparo, [ingredientes]) {

  document.getElementById("newTitulo").value = inputTitulo;
  document.getElementById("idReceita").value = inputId;

  if (inputStatus == "Aprovada") {
    document.getElementById("AP").checked = true;
  } else if (inputStatus == "Reprovada") {
    document.getElementById("RE").checked = true;
  } else {
    document.getElementById("NT").checked = true;
  }

  if (inputCategoria == "Doce") {
    document.getElementById("DOCE").checked = true;
  } else {
    document.getElementById("SAL").checked = true;
  }

  document.getElementById("newPreparo").value = inputPreparo;

  document.getElementById("newItem").style.display = "block";
  document.getElementById("listReceitas").style.display = "none";
  document.getElementById('Salvar').style.display = "none";
  document.getElementById('Atualizar').style.display = "";

  ingredientes.forEach(item => insertListIngredientes(item.descricao, item.quantidade, item.unidade_media));

}
const voltar = () => {
  document.getElementById("newTitulo").value = ""
  document.getElementById("newPreparo").value = ""
  document.getElementById("Voltar").style.display = "none";
  document.getElementById('Salvar').style.display = "block";
  window.location.reload(true);

}

/*
  --------------------------------------------------------------------------------------
  Chamada da função para carregamento ingredientes da API
  --------------------------------------------------------------------------------------
*/
const getIngredientes = () => {
  let url = 'https://food-ingredient-measurement-conversion.p.rapidapi.com/list-ingredients';
  fetch(url, {
    method: 'get',
    headers: { 'X-RapidAPI-Key': 'f812ef030emsh13f17683b14b5d1p1d39c9jsn2cceddc940d7', 'X-RapidAPI-Host': 'food-ingredient-measurement-conversion.p.rapidapi.com' }
  })
    .then((response) => response.json())
    .then((jsonData) => {
      percorrerJSON(jsonData)

    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

function percorrerJSON(objeto) {
  for (const chave in objeto) {
    if (typeof objeto[chave] === 'object' && objeto[chave] !== null) {
      // Se o valor da chave for um objeto, chame a função recursivamente
      percorrerJSON(objeto[chave]);
    } else {
      // Se não for um objeto, faça algo com o valor (por exemplo, exibir no console)
      if (chave === 'ingredient') {
        console.log(`Chave: ${chave}, Valor: ${objeto[chave]}`);
        insertIngredientesAPI(objeto[chave]);
      }
    }
  }
}

/*
  --------------------------------------------------------------------------------------
  Função para inserir items na lista ingredientes da api
  --------------------------------------------------------------------------------------
*/
const insertIngredientesAPI = (inputTitulo) => {

  var item = [inputTitulo]
  //var table = document.getElementById('list-ingredients');
  var combobox = document.getElementById("list-ingredients2");
  // var row = table.insertRow();

  for (var i = 0; i < item.length; i++) {
    //var cel = row.insertCell(i);
    // cel.textContent = item[i];


    var option = document.createElement("option");
    option.value = item[i];
    option.text = item[i];
    combobox.appendChild(option);


  }

  combobox.onclick = function () {
    adicionarIngredientesAPI()
    //alert(" combobox.value: " + combobox.value);
    document.getElementById("newDescricao").value = combobox.value;

    //document.getElementById("newDescricao").value = row.textContent;
  }


}
