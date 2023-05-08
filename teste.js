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

function executarCampeonato() {
    rodadas = criarTabelaJogos();
    for (var i = 0; i < rodadas.length; i++) {
        var jogosPorEstado = verificaRodadaDupla(rodadas[i]);
        for (var j = 0; j < rodadas[i].length; j++) {
            var timeMandante = rodadas[i][j].timeMandante;
            var timeVisitante = rodadas[i][j].timeVisitante;
            document.write(timeMandante.nome + ' vs ' + timeVisitante.nome + ' - ' + timeMandante.estado + ' - Rodada ' + (i + 1));
            if(jogosPorEstado[timeMandante.estado] > 1){
                document.write(' - (RODADA DUPLA)<br/>');
            } else {
                document.write('<br/>');
            }
            console.log(timeMandante.nome + ' ' + rodadas[i][j].resultado + ' ' + timeVisitante.nome); //IMPRIMINDO RESULTADO NO CONSOLE
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
        }
    }
    var campeao = verificaCampeao();
    console.log(times); //verificar pontos pelo array
    document.write('<b>CAMPEAO: ' + campeao.nome + '</b>');

}

function verificaRodadaDupla(rodada) {
    var estados = {};
    for (var i = 0; i < rodada.length; i++) {
        var estado = rodada[i].timeMandante.estado;
        if (!estados[estado]) {
            estados[estado] = 1;
        } else {
            estados[estado]++;
        }
    }
    return estados;
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