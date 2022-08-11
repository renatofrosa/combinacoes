// variáveis globais
var lista = [];
var linha = [];
var resultado = [];
var guardalinha = [];
var nivelRecursao = 0;

function CNP(n, p) {
  if (n === p || p == 0) {
    return 1;
  } else {
    return CNP(parseInt(n) - 1, p) + CNP(parseInt(n) - 1, parseInt(p) - 1);
  }
}

function imprime(linha, nome) {
  console.log(nome + ": " + linha);
}

function combine(pos, n, p, ultimalinha) {
  nivelRecursao++;
  linhaLength = linha.length;
  if (linhaLength > 0) {
    linhaLength = linha[0].length;
  }
  if (pos <= p) {
    linhaLength++;
    linha.push(lista[pos]);
  }
  //console.log("Pos: " + pos, JSON.parse(JSON.stringify(linha)));
  if (pos + 1 >= n || linhaLength >= p) {
    if (linhaLength == p) {
      //console.log(JSON.parse(JSON.stringify(linha)));
      resultado.push(JSON.parse(JSON.stringify(linha)));
      imprime(resultado[resultado.length - 1], "resultado");
    }
    nivelRecursao--;
    return ultimalinha;
  }
  if (pos + 1 < n) {
    guardalinha.push(JSON.parse(JSON.stringify(linha)));
    ultimalinha = guardalinha.length - 1;
    while (pos + 1 < n) {
      linha = [];
      //console.log(
      //  "Nível recursão: " + nivelRecursao + " ultimalinha: " + ultimalinha
      //);
      if (ultimalinha >= 0) {
        linha.push(JSON.parse(JSON.stringify(guardalinha[ultimalinha])));
      }
      if (typeof ultimalinha === "undefined") {
        // recupera penúltima linha salva
        linha.push(
          JSON.parse(JSON.stringify(guardalinha[guardalinha.length - 2]))
        );
      } //else {
      pos++;
      //}
      //console.log("POS da chamada: " + pos);
      ultimalinha = combine(pos, n, p, ultimalinha);
      //console.log("POS do retorno: " + pos + " ultimalinha: " + ultimalinha);
    }
  }
  nivelRecursao--;
  //console.log(
  //  "Saída da função - POS da chamada: " + pos + " ultima linha: " + ultimalinha
  //);
}

function Gerar(aux, p) {
  //alert("Entrou em Gerar");
  lista = aux.split(",");
  resultado = [];
  var n = lista.length;

  for (m = 0; m < n; m++) {
    linha = [];
    guardalinha = [];
    combine(m, n, parseInt(p));
  }
  for (k = 0; k < resultado.length; k++) {
    alert(resultado[k]);
  }
  alert("C(n,p): " + CNP(n, parseInt(p)));
  alert("Combinar " + p + " elementos da lista: " + lista);
}
