var times = [];
var pilhaTimes = times

function lerDados() {
    var texto = document.getElementById('texto').value.split('\n');

    for (var i = 0; i < texto.length; i++) {
        var time = {
            nome: texto[i].split(';')[0],
            estado: texto[i].split(';')[1]
        }
        times.push(time);
    }
    console.log(times)
}

function criarTabelaJogos() {
    var copiaTimes = [...times];

    //se numero de times for impar
    if (copiaTimes.length % 2 !== 0) {
        copiaTimes.push({ name: 'SEM JOGO', state: 'SEM JOGO' });
    }

    var tabela = [];

    for (let i = 0; i < copiaTimes.length - 1; i++) {
        var rodada = [];
        for (let j = 0; j < copiaTimes.length / 2; j++) {
            var timeMandante = copiaTimes[j];
            var timeVisitante = copiaTimes[copiaTimes.length - 1 - j];
            rodada.push({
                timeMandante: timeMandante,
                timeVisitante: timeVisitante
            });
        }
        tabela.push(rodada);
        copiaTimes.splice(1, 0, copiaTimes.pop());
    }

    var returno = tabela.map((rodada) => {
        return rodada.map((jogo) => {
            return {
                timeMandante: jogo.timeVisitante,
                timeVisitante: jogo.timeMandante
            };
        });
    });


    return tabela.concat(returno);
}

function imprimirRodadas() {
    var rodadas = criarTabelaJogos();
    console.log(rodadas)
    for (var i = 0; i < rodadas.length; i++) {
       // document.write('Rodada ' + (i + 1) + ': ' + '<br>')
        for (var j = 0; j < rodadas[i].length; j++) {
            document.write(rodadas[i][j].timeMandante.nome + ' vs ' + rodadas[i][j].timeVisitante.nome + ' - ' + rodadas[i][j].timeMandante.estado + ' - Rodada '+ (i+1) +'<br>')
        }
    }
}