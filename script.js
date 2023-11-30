document.addEventListener('DOMContentLoaded', function () {
    const resultadoElemento = document.getElementById('resultado');
    const botoes = document.querySelectorAll('#botoes button');

    let entradaAtual = '';
    let operador = '';
    let primeiroOperando = null;
    let resultadoAnterior = null;

    botoes.forEach(function (botao) {
        botao.addEventListener('click', function () {
            Clique(botao.innerText);
            atualizarDisplay();
        });
    });


    function Clique(valor) {
        if (eNumero(valor) || valor === '.') {
            entradaAtual += valor;
        }

        else if (eOperador(valor)) {
            lidarComOperador(valor);
        }

        else if (valor === '=') {
            igual();
        }

        else if (valor === 'C') {
            limpar();
        }

        else if (valor === '←') {
            apagarUltimo();
        }

        else if (valor === 'sqrt') {
            RaizQuadrada();
        }

        else if (valor === 'x^2') {
            Potenciacao(2);
        }

        else if (valor === 'x^y') {
            lidarComOperador('^');lidarComOperador
            lidarComOperador
            lidarComOperador
        }
    }

    function eNumero(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    }

    function eOperador(valor) {
        return ['+', '-', '*', '/', '^'].includes(valor);   
    }

    function lidarComOperador(valor) {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            primeiroOperando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            operador = valor;
            entradaAtual = '';
        }
    }

    function igual() {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const segundoOperando = entradaAtual !== '' ? parseFloat(entradaAtual) : primeiroOperando;
    
            if (operador && segundoOperando !== null) {
                if (operador === '+') {
                    resultadoAnterior = primeiroOperando + segundoOperando;
                } 
                
                else if (operador === '-') {
                    resultadoAnterior = primeiroOperando - segundoOperando;
                } 
                
                else if (operador === '*') {
                    resultadoAnterior = primeiroOperando * segundoOperando;
                } 
                
                else if (operador === '/') {
                   
                    if (segundoOperando !== 0) {
                        resultadoAnterior = primeiroOperando / segundoOperando;
                    } 
                    
                    else {
                        alert("Não é possível dividir por zero!");
                        limpar();
                        return;
                    }
                } 
                
                else if (operador === '^') {
                    resultadoAnterior = Math.pow(primeiroOperando, segundoOperando);
                }
           
                entradaAtual = '';
                operador = '';
                atualizarDisplay(); 
            }
        }
    }
    
    function RaizQuadrada() {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const operando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            resultadoAnterior = Math.sqrt(operando);
            entradaAtual = '';
            atualizarDisplay();
        }
    }

    function Potenciacao(exp) {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const operando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            resultadoAnterior = Math.pow(operando, exp);
            entradaAtual = '';
            atualizarDisplay();
        }
    }

    function limpar() {
        entradaAtual = '';
        operador = '';
        primeiroOperando = null;
        resultadoAnterior = null;
        atualizarDisplay();
    }

    function apagarUltimo() {
        entradaAtual = entradaAtual.slice(0, -1);
        atualizarDisplay();
    }

    function atualizarDisplay() {
        resultadoElemento.innerText = entradaAtual !== '' ? entradaAtual : resultadoAnterior !== null ? resultadoAnterior : '0';
    }
});
