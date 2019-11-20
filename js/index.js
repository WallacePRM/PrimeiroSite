
var listaContato = [];

function mostrarNovoContato() {
    var $contatoTransparente = $('.contato-transparente');
    $contatoTransparente.addClass('mostrar');  
}

function ocultarNovoContato() {
    var $contatoTransparente = $('.contato-transparente');
    $contatoTransparente.removeClass('mostrar');
}

function obterDados() {
    var contato;
    var nome = $('#nome').val();
    var telefone = $('#telefone').val();
    var email = $('#email').val();

    contato = {
        nome: nome,
        telefone: telefone,
        email: email
    };

    return contato;
}

function adicionarDados(contato) {
    listaContato.push(contato);
    var jsonListaContato = JSON.stringify(listaContato);
    localStorage.setItem('listaContato' ,jsonListaContato);
}

function adicionarLista(contato) {
    var $contatos = $('.contatos');
    $contatos.append(`
        <div class="contato-item">
            <div class="contato-img">
                <i class="fas fa-user"></i>
            </div>
            <div class="contato-item-info">
                <p class="contato-nome"> ${contato.nome} </p>
                <div class="telefone-email">
                    <i class="fas fa-phone verde"></i> 
                    <span class="contato-numero"> ${contato.telefone} </span>
                    <i class="fas fa-at vermelho"></i>
                    <span class="contato-email"> ${contato.email} </span>
                </div>
            </div>
        </div>    
    `);
}

function carregarDados() {
    listaContato = JSON.parse(localStorage.getItem('listaContato'));
    if (listaContato !== null) {
        for (var i = 0; i < listaContato.length; i++) {
            $('.contatos').append(`
                <div class="contato-item">
                    <div class="contato-img">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="contato-item-info">
                        <p class="contato-nome"> ${listaContato[i].nome} </p>
                        <div class="telefone-email">
                            <i class="fas fa-phone verde"></i> 
                            <span class="contato-numero"> ${listaContato[i].telefone} </span>
                            <i class="fas fa-at vermelho"></i>
                            <span class="contato-email"> ${listaContato[i].email} </span>
                        </div>
                    </div>
                </div>
            `);
        }
    }
    else {
        listaContato = [];
    }
}

function onSalvarDados() {
    var contato = obterDados();      
    if (verificarDados()) {
        adicionarDados(contato);
        adicionarLista(contato);
    }
}

function pesquisa() {
    var pesquisa = $('[name="pesquisa"]').val();
    pesquisa = pesquisa.toLowerCase();
    $('.contatos').html('');

    for (var i = 0; i < listaContato.length; i++) {
        var nome = listaContato[i].nome.toLowerCase();
        if (nome.indexOf(pesquisa) !== -1) {
            adicionarLista(listaContato[i]);
        }
    }
}

function alternarMenuBarra() {
    $('.menu-barra').toggleClass('encolhido');
}

function verificarDados() {
    var dadosContato = [];
    var verificado = true;
    
    dadosContato.push($('#nome'));
    dadosContato.push($('#telefone'));
    dadosContato.push($('#email'));
    
    for (var i = 0; i < dadosContato.length; i++) {
        if (dadosContato[i].val() === '') {
            dadosContato[i].addClass('erro');
            verificado = false;
        }
        else {
            dadosContato[i].removeClass('erro');
        }
    }

    return verificado; 
};

carregarDados();


