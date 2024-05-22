// Função para gerar um número aleatório entre 1 e 60
function gerarNumeroAleatorio() {
    return Math.floor(Math.random() * 60) + 1;
  }
  
  // Função para verificar se um número já foi sorteado
  function verificarNumeroSorteado(numero, numerosSorteados) {
    return numerosSorteados.includes(numero);
  }
  
  // Função para gerar os números sorteados da Mega Sena
  function gerarNumerosSorteados() {
    const numerosSorteados = [5, 18, 26, 23, 27, 20];
  
    while (numerosSorteados.length < 6) {
      const numeroAleatorio = gerarNumeroAleatorio();
  
      if (!verificarNumeroSorteado(numeroAleatorio, numerosSorteados)) {
        numerosSorteados.push(numeroAleatorio);
      }
    }
  
    return numerosSorteados;
  }
  
  // Função para ordenar um array de números
  function ordenarArray(array) {
    return array.sort((a, b) => a - b);
  }
  
  // Função para verificar quantas dezenas o usuário acertou
  function verificarAcertos(numerosUsuario, numerosSorteados) {
    let acertos = 0;
  
    for (const numeroUsuario of numerosUsuario) {
      if (numerosSorteados.includes(numeroUsuario)) {
        acertos++;
      }
    }
  
    return acertos;
  }
  
  // Função para formatar um array de números para exibição
  function formatarNumeros(numeros) {
    return numeros.join(', ');
  }
  
  // Programa principal
  const formulario = document.getElementById('formulario');
  const resultado = document.getElementById('resultado');
  const mensagem = document.getElementById('mensagem');
  const numerosUsuarioSpan = document.getElementById('numeros-usuario');
  const numerosSorteadosSpan = document.getElementById('numeros-sorteados');
  
  formulario.addEventListener('submit', function (evento) {
    evento.preventDefault(); // Evita o envio padrão do formulário
  
    // Obter os números do usuário
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
  
    // Gerar os números sorteados
    const numerosSorteados = gerarNumerosSorteados();
  
    // Ordenar os arrays para comparação
    const numerosUsuarioOrdenados = ordenarArray(numerosUsuario);
    const numerosSorteadosOrdenados = ordenarArray(numerosSorteados);
  
    // Verificar acertos
    const acertos = verificarAcertos(numerosUsuarioOrdenados, numerosSorteadosOrdenados);
  
    // Exibir o resultado
    numerosUsuarioSpan.textContent = formatarNumeros(numerosUsuarioOrdenados);
    numerosSorteadosSpan.textContent = formatarNumeros(numerosSorteadosOrdenados);
  
    // Mensagem de acordo com o número de acertos
    if (acertos === 6) {
      alert('Parabéns! Você acertou as 6 números e ganhou a SENA!');
    } else if (acertos === 5) {
      alert('Você acertou 5 números e ganhou a QUINA!');
    } else if (acertos === 4) {
      alert('Você acertou 4 números e ganhou a QUADRA!');
    } else if (acertos >= 3) {
      alert(`Você acertou ${acertos} números!`);
    } else {
      alert('Infelizmente, você não acertou nenhum número.');
    }
  
    resultado.style.display = 'block'; // Exibir o resultado
  });
  
