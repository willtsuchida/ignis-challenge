var times = [];
var rodadas = [];


function lerDados() {
    var texto = document.getElementById('texto').value.split('\n');

    for (var i = 0; i < texto.length; i++) {
        var time = {
            nome: texto[i].split(';')[0],
            estado: texto[i].split(';')[1],
            pontosCampeonato: 0
        }
        times.push(time);
    }
}

function criarTabelaJogos() {
    var copiaTimes = [...times];

    //se numero de times for impar
    if (copiaTimes.length % 2 !== 0) {
        copiaTimes.push({ name: 'SEM JOGO', state: 'SEM JOGO' });
    }

    var tabela = [];

    for (var i = 0; i < copiaTimes.length - 1; i++) {
        var rodada = [];
        for (var j = 0; j < copiaTimes.length / 2; j++) {
            var timeMandante = copiaTimes[j];
            var timeVisitante = copiaTimes[copiaTimes.length - 1 - j];
            var golsMandante = geraGolsAte5();
            var golsVisitante = geraGolsAte5();
            rodada.push({
                timeMandante: timeMandante,
                timeVisitante: timeVisitante,
                resultado: golsMandante + 'x' + golsVisitante
            });
        }
        tabela.push(rodada);
        copiaTimes.splice(1, 0, copiaTimes.pop());
    }

    var returno = tabela.map((rodada) => {
        return rodada.map((jogo) => {
            var jogoReturno = {
                timeMandante: jogo.timeVisitante,
                timeVisitante: jogo.timeMandante
            };
            var golsMandante = geraGolsAte5();
            var golsVisitante = geraGolsAte5();
            jogoReturno.resultado = golsMandante + 'x' + golsVisitante;
            return jogoReturno;

        });
    });
    return tabela.concat(returno);
}

function imprimirRodadas() {
    rodadas = criarTabelaJogos();
    for (var i = 0; i < rodadas.length; i++) {
        for (var j = 0; j < rodadas[i].length; j++) {
            var timeMandante = rodadas[i][j].timeMandante;
            var timeVisitante = rodadas[i][j].timeVisitante;
            document.write(timeMandante.nome + ' vs ' + timeVisitante.nome + ' - ' + timeMandante.estado + ' - Rodada ' + (i + 1) + '<br>');
            document.write(rodadas[i][j].resultado + '<br>');
            var placar = rodadas[i][j].resultado.split('x');
            var resultadoMandante = resultado(placar[0], placar[1]);
            if (resultadoMandante == 'vitoria') {
                timeMandante.pontosCampeonato += 3;
            } else if (resultadoMandante == 'derrota') {
                timeVisitante.pontosCampeonato += 3;
            } else {
                timeMandante.pontosCampeonato += 1;
                timeVisitante.pontosCampeonato += 1;
            }
            console.log(rodadas[i][j].resultado)
            console.log(timeMandante.nome + ' ' + timeMandante.pontosCampeonato)
            console.log(timeVisitante.nome + ' ' + timeVisitante.pontosCampeonato)

        }
    }
    var campeao = verificaCampeao();
    document.write('CAMPEAO: ' + campeao.nome);

}

function verificaCampeao() {
    var campeao = times[0];
    for (var i = 1; i < times.length; i++) {
        if (times[i].pontosCampeonato > campeao.pontosCampeonato) {
            campeao = times[i];
        }
    }
    return campeao;
}

function geraGolsAte5() {
    return Math.floor(Math.random() * 5);
}

function resultado(golsMandante, golsVisitante) {
    var resultado;
    if (golsMandante > golsVisitante) {
        resultado = 'vitoria';
    } else if (golsMandante < golsVisitante) {
        resultado = 'derrota';
    } else {
        resultado = 'empate';
    }
    return resultado;
}