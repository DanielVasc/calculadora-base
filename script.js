document.addEventListener('DOMContentLoaded', function () {
    const resultadoElemento = document.getElementById('resultado');
    const botoes = document.querySelectorAll('#botoes button');

    let entradaAtual = '';
    let operador = '';
    let primeiroOperando = null;
    let resultadoAnterior = null;

    botoes.forEach(function (botao) {
        botao.addEventListener('click', function () {
            lidarComCliqueDoBotao(botao.innerText);
            atualizarDisplay();
        });
    });

    function lidarComCliqueDoBotao(valor) {
        if (eNumero(valor) || valor === '.') {
            entradaAtual += valor;
        }

        else if (eOperador(valor)) {
            lidarComOperador(valor);
        }

        else if (valor === '=') {
            lidarComIgual();
        }

        else if (valor === 'C') {
            limparCalculadora();
        }

        else if (valor === '←') {
            apagarUltimoDigito();
        }

        else if (valor === 'sqrt') {
            calcularRaizQuadrada();
        }

        else if (valor === 'x^2') {
            calcularPotenciacao(2);
        }

        else if (valor === 'x^y') {
            lidarComOperador('^');
        }

        else if (valor === 'sin') {
            calcularFuncaoTrigonometrica('sin');
        }

        else if (valor === 'cos') {
            calcularFuncaoTrigonometrica('cos');
        }

        else if (valor === 'tan') {
            calcularFuncaoTrigonometrica('tan');
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

    function lidarComIgual() {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const segundoOperando = entradaAtual !== '' ? parseFloat(entradaAtual) : primeiroOperando;
            if (operador && segundoOperando !== null) {
                switch (operador) {
                    case '+':
                        resultadoAnterior = primeiroOperando + segundoOperando;
                        break;
                    case '-':
                        resultadoAnterior = primeiroOperando - segundoOperando;
                        break;
                    case '*':
                        resultadoAnterior = primeiroOperando * segundoOperando;
                        break;
                    case '/':

                        if (segundoOperando !== 0) {
                            resultadoAnterior = primeiroOperando / segundoOperando;
                        }

                        else {
                            alert("Não é possível dividir por zero!");
                            limparCalculadora();
                            return;
                        }
                        break;
                    case '^':
                        resultadoAnterior = Math.pow(primeiroOperando, segundoOperando);
                        break;
                }
                entradaAtual = '';
                operador = '';
                atualizarDisplay();
            }
        }
    }

    function calcularRaizQuadrada() {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const operando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            resultadoAnterior = Math.sqrt(operando);
            entradaAtual = '';
            atualizarDisplay();
        }
    }

    function calcularPotenciacao(exp) {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const operando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            resultadoAnterior = Math.pow(operando, exp);
            entradaAtual = '';
            atualizarDisplay();
        }
    }

    function calcularFuncaoTrigonometrica(funcao) {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const operando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            switch (funcao) {
                case 'sin':
                    resultadoAnterior = Math.sin(operando);
                    break;
                case 'cos':
                    resultadoAnterior = Math.cos(operando);
                    break;
                case 'tan':
                    resultadoAnterior = Math.tan(operando);
                    break;
            }
            entradaAtual = '';
            atualizarDisplay();
        }
    }

    function limparCalculadora() {
        entradaAtual = '';
        operador = '';
        primeiroOperando = null;
        resultadoAnterior = null;
        atualizarDisplay();
    }

    function apagarUltimoDigito() {
        entradaAtual = entradaAtual.slice(0, -1);
        atualizarDisplay();
    }

    function atualizarDisplay() {
        resultadoElemento.innerText = entradaAtual !== '' ? entradaAtual : resultadoAnterior !== null ? resultadoAnterior : '0';
    }
});
