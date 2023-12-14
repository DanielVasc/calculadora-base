document.addEventListener('DOMContentLoaded', function () {
    const resultadoElemento = document.getElementById('resultado');
    const botoes = document.querySelectorAll('#botoes button');

    let entradaAtual = '';
    let operador = '';
    let primeiroOperando = null;
    let resultadoAnterior = null;
    let operacaoConcluida = false;

    botoes.forEach(function (botao) {
        botao.addEventListener('click', function () {
            Clique(botao.innerText);
            atualizarDisplay();
        });
    });

    document.addEventListener('keydown', function (event) {
        const tecla = event.key;
        if (tecla === 'Enter') {
            Clique('=');
        } 
        
        else if (tecla === 'Escape') {
            Clique('C');
        } 
        
        else if (tecla === 'Backspace') {
            Clique('←');
        } 
        
        else if (tecla === '.') {
            Clique(tecla);
        } 
        
        else if (tecla >= '0' && tecla <= '9') {
            Clique(tecla);
        } 
        
        else if (['+', '-', '*', '/'].includes(tecla)) {
            Clique(tecla);
        } 
        
        else if (tecla.toLowerCase() === 's') {
            Clique('sin');
        } 
        
        else if (tecla.toLowerCase() === 'c') {
            Clique('cos');
        } 
        
        else if (tecla.toLowerCase() === 't') {
            Clique('tan');
        } 
        
        else if (tecla.toLowerCase() === 'x') {
            Clique('x^y');
        }
        atualizarDisplay();
    });

    function Clique(valor) {
        if (eOperador(valor) || valor === '.') {
            if (entradaAtual === '' && !operacaoConcluida) {
                return;
            }

            if (valor === '.' && entradaAtual.includes('.')) {
                return;
            }
        }

        if (operacaoConcluida && eNumero(valor)) {
            limpar();
        }

        if (eOperador(valor)) {
            if (entradaAtual === '') {
                return;
            }

            if (operador !== '' && entradaAtual !== '') {
                Igual();
            }

            lidarComOperador(valor);
        } 
        
        else if (valor === '=') {
            Igual();
        } 
        
        else if (valor === 'C') {
            limparCalculadora();
        } 
        
        else if (valor === '←') {
            apagarUltimo();
        } 
        
        else if (valor.toLowerCase() === 'sqrt') {
            RaizQuadrada();
        } 
        
        else if (valor.toLowerCase() === 'x^2') {
            Potenciacao(2);
        } 
        
        else if (valor.toLowerCase() === 'x^y') {
            limpar('^');
        } 
        
        else if (valor.toLowerCase() === 'sin' || valor.toLowerCase() === 'cos' || valor.toLowerCase() === 'tan') {
            Trigonometrica(valor.toLowerCase());
        } 
        
        else {
            entradaAtual += valor;
        }

        operacaoConcluida = false;
    }

    function eNumero(valor) {
        return !isNaN(parseFloat(valor)) && isFinite(valor);
    }

    function eOperador(valor) {
        return ['+', '-', '*', '/', '^'].includes(valor);
    }

    function lidarComOperador(valor) {
        primeiroOperando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
        operador = valor;
        entradaAtual = '';
    }

    function Igual() {
        if (operador && entradaAtual !== '') {
            const segundoOperando = parseFloat(entradaAtual);
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
                    } else {
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
            operacaoConcluida = true;
        }
    }

    function RaizQuadrada() {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const operando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            resultadoAnterior = Math.sqrt(operando);
            entradaAtual = '';
            operacaoConcluida = true;
        }
    }

    function Potenciacao(exp) {
        if (entradaAtual !== '' || resultadoAnterior !== null) {
            const operando = entradaAtual !== '' ? parseFloat(entradaAtual) : resultadoAnterior;
            resultadoAnterior = Math.pow(operando, exp);
            entradaAtual = '';
            operacaoConcluida = true;
        }
    }

    function Trigonometrica(funcao) {
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
            operacaoConcluida = true;
        }
    }

    function limpar() {
        entradaAtual = '';
        operador = '';
        primeiroOperando = null;
        resultadoAnterior = null;
        operacaoConcluida = false;
        atualizarDisplay();
    }

    function apagarUltimo() {
        entradaAtual = entradaAtual.slice(0, -1);
        atualizarDisplay();
    }

    function limparCalculadora() {
        entradaAtual = '';
        operador = '';
        primeiroOperando = null;
        resultadoAnterior = null;
        operacaoConcluida = false;
        atualizarDisplay();
    }

    function atualizarDisplay() {
        resultadoElemento.innerText = entradaAtual !== '' ? entradaAtual : resultadoAnterior !== null ? resultadoAnterior : '0';
    }
});
