function gerarAleatorio() { return Math.floor(Math.random() * 60) + 1; }

function verificarSorteado(numero, sorteados) { return sorteados.includes(numero); }

function gerarSorteados() {
  const sorteados = [5, 18, 26, 23, 27, 20];
  while (sorteados.length < 6) {
    const aleatorio = gerarAleatorio();
    if (!verificarSorteado(aleatorio, sorteados)) sorteados.push(aleatorio);
  }
  return sorteados;
}

function ordenar(array) { return array.sort((a, b) => a - b); }

function verificarAcertos(numerosUsuario, sorteados) {
  let acertos = 0;
  for (const numero of numerosUsuario) if (sorteados.includes(numero)) acertos++;
  return acertos;
}

function formatarNumeros(numeros) { return numeros.join(', '); }

const formulario = document.getElementById('formulario');
const resultado = document.getElementById('resultado');
const mensagem = document.getElementById('mensagem');
const numerosUsuarioSpan = document.getElementById('numeros-usuario');
const numerosSorteadosSpan = document.getElementById('numeros-sorteados');

formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();
  const numerosUsuario = [];
  for (let i = 1; i <= 6; i++) {
    const inputNumero = document.getElementById(`numero${i}`);
    const numero = parseInt(inputNumero.value);
    if (isNaN(numero) || numero < 1 || numero > 60) {
      alert(`Número inválido no campo ${i}: ${inputNumero.value}`);
      return;
    }
    if (numerosUsuario.includes(numero)) {
      alert(`Número repetido: ${numero}`);
      return;
    }
    numerosUsuario.push(numero);
  }

  const sorteados = gerarSorteados();
  const numerosUsuarioOrdenados = ordenar(numerosUsuario);
  const numerosSorteadosOrdenados = ordenar(sorteados);

  const acertos = verificarAcertos(numerosUsuarioOrdenados, numerosSorteadosOrdenados);

  numerosUsuarioSpan.textContent = formatarNumeros(numerosUsuarioOrdenados);
  numerosSorteadosSpan.textContent = formatarNumeros(numerosSorteadosOrdenados);

  if (acertos === 6) {
    alert('Parabéns! Você acertou as 6 números e ganhou a SENA! Ficou rico!!!');
  } else if (acertos === 5) {
    alert('Você acertou 5 números e ganhou a QUINA! Agora já tem mais dinheiro');
  } else if (acertos === 4) {
    alert('Você acertou 4 números e ganhou a QUADRA, olha as coisas melhorando !');
  } else if (acertos >= 3) {
    alert(`Você acertou ${acertos} números!`);
  } else {
    alert('Infelizmente, você não acertou nenhum número e continua sem dinheiro.');
  }
