document.addEventListener('DOMContentLoaded', function() {
    const gear = document.getElementById('open-input');
    const overlay = document.getElementById('overlay');
    const fecharBtn = document.getElementById('fechar-input');
    const sortearBtn = document.querySelector('.sortear');
    const numberDisplay = document.querySelector('.number');
    
    // Elementos dos inputs
    const radioNumbers = document.querySelector('input[value="numbers"]');
    const radioCustom = document.querySelector('input[value="custom"]');
    const numbersSection = document.getElementById('numbers-input');
    const customSection = document.getElementById('custom-input');
    const minNumberInput = document.getElementById('min-number');
    const maxNumberInput = document.getElementById('max-number');
    const customDataInput = document.getElementById('custom-data');
    
    // Variáveis de configuração
    let sortingMode = 'numbers';
    let minNumber = 1;
    let maxNumber = 100;
    let customData = [];

    gear.addEventListener('click', function() {
        overlay.style.display = 'flex';
    });

    // Alternar entre os tipos de input
    radioNumbers.addEventListener('change', function() {
        if (this.checked) {
            numbersSection.style.display = 'flex';
            customSection.style.display = 'none';
            sortingMode = 'numbers';
        }
    });
    
    radioCustom.addEventListener('change', function() {
        if (this.checked) {
            numbersSection.style.display = 'none';
            customSection.style.display = 'flex';
            sortingMode = 'custom';
        }
    });

    fecharBtn.addEventListener('click', function() {
        // Salvar configurações
        if (sortingMode === 'numbers') {
            minNumber = parseInt(minNumberInput.value) || 1;
            maxNumber = parseInt(maxNumberInput.value) || 100;
            
            // Validar se o máximo é maior que o mínimo
            if (maxNumber <= minNumber) {
                alert('O número máximo deve ser maior que o mínimo!');
                return;
            }
        } else if (sortingMode === 'custom') {
            const data = customDataInput.value.trim();
            if (data === '') {
                alert('Por favor, insira pelo menos uma opção!');
                return;
            }
            customData = data.split('\n').filter(item => item.trim() !== '');
            if (customData.length === 0) {
                alert('Por favor, insira pelo menos uma opção válida!');
                return;
            }
        }
        
        overlay.style.display = 'none';
    });

    // Função para sortear um número aleatório com animação de troca
    function sortearNumero() {
        const sortearBtn = document.querySelector('.sortear');
        
        // Desabilita o botão durante a animação
        sortearBtn.disabled = true;
        sortearBtn.textContent = 'Sorteando...';
        
        // Para a animação de pulso e adiciona classe de sorteio
        numberDisplay.classList.add('drawing');
        
        // Determina o resultado final baseado no modo
        let resultadoFinal;
        if (sortingMode === 'numbers') {
            resultadoFinal = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
        } else {
            if (customData.length === 0) {
                alert('Configure os dados primeiro!');
                sortearBtn.disabled = false;
                sortearBtn.textContent = 'Sortear';
                numberDisplay.classList.remove('drawing');
                return;
            }
            resultadoFinal = customData[Math.floor(Math.random() * customData.length)];
        }
        
        // Configurações da animação
        const duracaoAnimacao = 2000; // 2 segundos
        const intervaloTroca = 80; // Troca a cada 80ms
        const totalTrocas = duracaoAnimacao / intervaloTroca;
        let contadorTrocas = 0;
        
        // Adiciona efeito visual de "sorteando"
        numberDisplay.style.transform = 'scale(1.1)';
        numberDisplay.style.color = '#ff6b6b';
        numberDisplay.style.textShadow = '0 0 10px rgba(255, 107, 107, 0.5)';
        
        // Animação de troca de números/dados
        const intervalId = setInterval(() => {
            // Gera um resultado temporário baseado no modo
            let resultadoTemp;
            if (sortingMode === 'numbers') {
                resultadoTemp = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
            } else {
                resultadoTemp = customData[Math.floor(Math.random() * customData.length)];
            }
            
            numberDisplay.textContent = resultadoTemp;
            
            // Adiciona um pequeno efeito de balanço
            const rotacao = (Math.random() - 0.5) * 10; // -5 a +5 graus
            numberDisplay.style.transform = `scale(1.1) rotate(${rotacao}deg)`;
            
            contadorTrocas++;
            
            // Para a animação quando alcançar o total de trocas
            if (contadorTrocas >= totalTrocas) {
                clearInterval(intervalId);
                
                // Mostra o resultado final com animação especial
                setTimeout(() => {
                    numberDisplay.textContent = resultadoFinal;
                    numberDisplay.style.transform = 'scale(1.3)';
                    numberDisplay.style.color = '#4CAF50';
                    numberDisplay.style.textShadow = '0 0 20px rgba(76, 175, 80, 0.7)';
                    
                    // Efeito de "celebração"
                    setTimeout(() => {
                        numberDisplay.style.transform = 'scale(1)';
                        numberDisplay.style.color = '#fff';
                        numberDisplay.style.textShadow = 'none';
                        
                        // Remove a classe de sorteio para retomar a animação de pulso
                        numberDisplay.classList.remove('drawing');
                        
                        // Reabilita o botão
                        sortearBtn.disabled = false;
                        sortearBtn.textContent = 'Sortear';
                    }, 500);
                }, 100);
            }
        }, intervaloTroca);
    }

    // Adiciona evento de clique no botão sortear
    sortearBtn.addEventListener('click', sortearNumero);
});