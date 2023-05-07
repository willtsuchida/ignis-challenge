var times = [];

function lerDados() {
    var texto = document.getElementById('texto').value.split('\n');

    for (var i = 0; i < texto.length; i++) {
        var time = {
            nome: texto[i].split(';')[0],
            estado: texto[i].split(';')[1]
        }
        times.push(time);
    }
}