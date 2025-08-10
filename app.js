
//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação.
//  Aqui você deverá desenvolver a lógica para resolver o problema.


let amigos=[];
iniciarAmigoSecreto();

function iniciarAmigoSecreto(){
    // Função para iniciar o amigo secreto
    amigos=[];

    let mensagem = document.querySelector("h2");
    mensagem.innerText = "Digite o nome dos seus amigos.";
    exibirBotao("amigo","block");

    iniciarLista();
        
    exibirBotao("btAdicionar","block"); 
    exibirBotao("btAdicionar","block"); 
    exibirBotao("btSortear","none");
    exibirBotao("btReiniciar","none");

    voztexto("Vamos iniciar o amigo secreto!");
    voztexto("Adicione os nomes dos amigos que participarão do sorteio.");     
}


function adicionarAmigo(){
    // Função para adicionar um amigo à lista
    if(validaCampoVazio("amigo")){
        let campo = document.getElementById("amigo");
        if(existeNaLista(campo.value.toUpperCase(), amigos)){
            voztexto(`Amigo ${campo.value.toUpperCase()} adicionado com sucesso!`);
            amigos.push(campo.value.toUpperCase());
            imprimirListaAmigos("listaAmigos");
            limparCampo("amigo");
            exibirBotao("btSortear","block");
        } 
    }   
}

function imprimirListaAmigos(tag){  
    // Imprime a lista de amigos na tela
    padronizarLista();  
    let listaAmigos = document.getElementById(tag);
    listaAmigos.innerHTML = amigos.map(amigos => `<li>${amigos}</li>`).join('');    
}


function sortearAmigo(){ 
    // Função para sortear um amigo da lista  
    if(verificaLista()){
        let fimLista = amigos.length;
        let numsorteado = Math.floor((Math.random() * (fimLista - 1)));  
        let Sorteado = document.getElementById("resultado");
        Sorteado.innerHTML = amigos[numsorteado];
        voztexto(`Amigo ${amigos[numsorteado]} foi sorteado!`);
        exibirBotao("btAdicionar","none");
        exibirBotao("btSortear","none");
        exibirBotao("btReiniciar","block");
        let mensagem = document.querySelector("h2");
        mensagem.innerText = "Sorteio finalizado!";
        exibirBotao("amigo","none");
    }
} 

function validaCampoVazio(tag){    
    // Valida se o campo de entrada de texto está vazio
    let campo = document.getElementById(tag);
     if(campo.value==""){
        mensagemErro(false,"Por favor, insira um nome.")
        campo.focus();        
        return false
    }else{
        mensagemErro(true,"")         
        return true
    }
}

function limparCampo(tag){
    // Limpa o campo de entrada de texto
    let campo = document.getElementById(tag);
    campo.value = "";
}


function mensagemErro(tipo,txtMensagem){
    // Exibe ou oculta a mensagem de erro com base no tipo
    // Se tipo for false, exibe a mensagem de erro; se true, oculta a mensagem
    // txtMensagem é o texto da mensagem de erro
    if(!tipo){        
        document.getElementById("mensagemAviso").innerText = txtMensagem;
        inclusaoVoz("mensagemAviso");
    } else{
        document.getElementById("mensagemAviso").innerText = "";
    }
}

function ordenarLista(){
    // Ordena a lista de amigos em ordem alfabética
    amigos.sort();
}

function converterListaUppercase(){
    // Converte todos os nomes da lista de amigos para maiúsculas
    let listaMaiuscula = amigos.map(item => item.toUpperCase());
    amigos = listaMaiuscula
}

function padronizarLista(){
    // Padroniza a lista de amigos, ordenando e convertendo para maiúsculas
    ordenarLista();
    converterListaUppercase();
}

function existeNaLista(Nome,listaAmigosArray){
    // Verifica se o nome já existe na lista de amigos
    if (amigos.includes(Nome)) {
        mensagemErro(false, `"${Nome}" já está na lista.`);
        return false;
    } else {
        mensagemErro(true,"");
        return true;
    }
}

function inclusaoVoz(tag){
    // Função para converter o texto de um campo em voz
    let campo = document.getElementById(tag);
    let texto = campo.value || campo.innerText || campo.textContent;
     if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function voztexto(texto){
    // Função para converter texto em voz
      if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR';
        utterance.rate = 1.2;
        window.speechSynthesis.speak(utterance);
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
}

function verificaLista(){
    // Verifica se a lista de amigos está vazia ou contém apenas um amigo
   if(amigos[amigos.length-1]==="" || amigos.length==0){
        mensagemErro(false, "A lista de amigos está vazia. Adicione amigos antes de sortear.");
        return false;
   }else{
        if(amigos.length===1 && amigos[amigos.length-1]!=""){
            mensagemErro(false, "Adicione mais um amigo antes de sortear.");
            return false; 
        }else{
        mensagemErro(true, "");
        return true;
        }
   }
}

function reiniciarAmigoSecreto(){
    // Reinicia o processo de amigo secreto
    iniciarAmigoSecreto();
    exibirBotao("btSortear","none");
    exibirBotao("btReiniciar","none");
    exibirBotao("btAdicionar","block");        
}

function exibirBotao(tag, estado){
    // Exibe ou oculta o botão com base no estado fornecido
 document.getElementById(tag).style.display = estado;
}

function iniciarLista(){
    // (reinicia campos) - Limpa a lista de amigos e o resultado
    let listaAmigosElement = document.getElementById("listaAmigos");
    listaAmigosElement.innerHTML = "";
    document.getElementById("resultado").innerHTML = "";
    document.getElementById("mensagemAviso").innerText = "";
    document.getElementById("amigo").value = "";
    document.getElementById("amigo").focus();
}
