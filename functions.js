class combination {
  id;
  elements;
}

var elementList = [];
var result = [];
var stackedComb = [];
var currentComb;

// recursive function to combine the elements
function combine(position, n, p, id) {
  // return if length of currentComb reached the value of p
  if (currentComb.elements.length == p) {
    return;
  }
  // append new element in the current combination
  currentComb.elements.push(elementList[position]);
  if (position == n || currentComb.elements.length == p) {
    // reached last position or number of elements == p
    if (currentComb.elements.length == p) {
      // deep copy current combination in the result list
      result.push(JSON.parse(JSON.stringify(currentComb)));
    }
    return id;
  }
  // check if there is still elements to be combined
  if (position + 1 < n) {
    // stack currentComb
    id = createUUID();
    currentComb.id = id;
    // save current combination in the stack
    stackedComb.push(JSON.parse(JSON.stringify(currentComb)));
    while (position + 1 < n) {
      // restore previous currentComb
      let aux = stackedComb.filter((comb) => {
        return comb.id === id;
      });
      // update current combination with last stacked one
      // use deep copy
      currentComb.id = aux[0].id;
      currentComb.elements = JSON.parse(JSON.stringify(aux[0].elements));
      position++;
      combine(position, n, p, id);
    }
  }
}

// main function to validate form inputs and manage the combination
function generate(aux, p) {
  var f = document.getElementById("myForm");
  var msg = "";
  if (!f.checkValidity()) {
    msg = "Os campos são de preenchimento obrigatório!";
  }
  elementList = aux.split(",");
  var n = elementList.length;
  if (n < parseInt(p)) {
    msg = "Lista com tamanho insufiente para a combinação desejada!";
  } else {
    if (parseInt(n) > 10) {
      msg = "informe no máximo 10 elementos na lista.";
    }
  }
  if (msg != "") {
    alert(msg);
    document.getElementById("resultados").style.display = "none";
    document.getElementById("lista").focus();
    return;
  }
  result = [];

  for (m = 0; m < n; m++) {
    // cleanup
    currentComb = new combination();
    currentComb.elements = [];
    stackedComb = [];
    // generate combinations for new pivot element
    combine(m, n, parseInt(p), createUUID());
  }

  // output values to html
  var linha = "";
  for (let i = 0; i < result.length; i++) {
    console.log(result[i].elements);
    let aux = "";
    for (let k = 0; k < result[i].elements.length; k++) {
      if (aux.length > 0) aux += ", ";
      aux += result[i].elements[k];
    }
    linha += "<li>" + String(i + 1).padStart(3, "0") + " - " + aux + "</li>";
  }
  document.getElementById("combinacoes").innerHTML = linha;
  document.getElementById("resultados").style.display = "block";
  document.getElementById("paragraph").innerHTML =
    "Combinações geradas - C(" + n + "," + p + ") = " + CNP(n, parseInt(p));
}

// recursive funcion to calculate the number of combination C(n,p)
// C(n,p) = C(n-1,p) + C(n-1,n-1)
// where C(m,m) = 1 and C(m,0) = 1
function CNP(n, p) {
  if (n === p || p == 0) {
    return 1;
  } else {
    return CNP(parseInt(n) - 1, p) + CNP(parseInt(n) - 1, parseInt(p) - 1);
  }
}

// pseudo guid generator
function createUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}
