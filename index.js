const potenciaTotalParametroKw = 4.5;
const potenciaTotalPainelW = 550;
const alturaPainel = 1.95;
const larguraPainel = 1.1;
const maximoPainelPorMicroInversor = 4;

function descobrindoValores(potenciaTotalParametroKw){
  const quantidadeDePaineis = Math.ceil(potenciaTotalParametroKw * 1000 / potenciaTotalPainelW);
  const quantidadeMicroInversores =  Math.ceil(quantidadeDePaineis / maximoPainelPorMicroInversor);
  const quantidadeDeColunas = Math.ceil(quantidadeDePaineis / 2);
  const comprimentoDaEstrutura = quantidadeDeColunas * larguraPainel;
  const alturaDaEstrutura = 2 * alturaPainel; // 2 - Quantidade de linhas (pois será uma linha com 5 paineis e outra com 4 paineis)
  const areaUtil = comprimentoDaEstrutura * alturaDaEstrutura

  return{
    quantidadeDePaineis,
    quantidadeMicroInversores,
    quantidadeDeColunas,
    comprimentoDaEstrutura,
    alturaDaEstrutura,
    areaUtil
  } 
}

const resultado = descobrindoValores(potenciaTotalParametroKw);

console.log(`Quantidade de painéis necessários: ${resultado.quantidadeDePaineis}`);
console.log(`Quantidade de micro inversores necessários: ${resultado.quantidadeMicroInversores}`);
console.log(`Comprimento da estrutura necessária: ${resultado.comprimentoDaEstrutura}m`);
console.log(`Área útil nescessária: ${resultado.areaUtil}m²`);



