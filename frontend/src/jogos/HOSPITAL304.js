//import { createInterface } from 'node:readline/promises';
import { console, process, rlPromises as term } from "../mockConsole";
import { getChalk } from "../utils/chalk";

export async function hospital304() {
    let chalk = getChalk(true);

/*const term = createInterface({ 
    input: process.stdin, 
    output: process.stdout 
});*/

async function pausar() {
    await term.question("Enter para continuar...");
}

//COISAS 
let inventário =[];
let chavegerador = false;
let chave_escada = false;
let fitak7 = false;
let seringa = false;
let codigo_arquivoC = false;
let cartaosubsolo = false;

//AÇÕES
let gravacao = false;
let ouvirk7 = false;
let lermesa = false;
let energiaLigada = false;
let mochila1 = false;
let outros_arquivos = false;

//locais
let salaAtual = "quarto";
let porta_aberta = false;
let explorar_sala = false;
let corredor1 = false;
let banheiro1 = false;
let recepcao1 = false;
let segundo_andar = false;
let salaterapia1 = false;
let monitoramento1 = false;
let arquivoC1 = false;
let telhado1 = false;
let subsolo1 = false;
let morgue1 = false;
let morgueAberta = false;
let SalaOrion1 = false;

let verdadeRevelada = false;


console.log();
console.log("\n======= O inicio =======");
console.log("Você abre os olhos, está deitado numa cama de hospital enferrujada. Teto lascado. Uma lâmpada piscando fraca.");
console.log("Correias de contenção abertas. Quem as abriu??... Sua cabeça dói. Você não lembra do seu nome.");
console.log("Você não lembra de nada...");

const salas = {
    quarto: {
        descricao: () => console.log("O que deseja fazer?"),
        conexoes: {
            "explorar o quarto": async function (){
                console.log();
                if(!chave_escada) {
                chave_escada = true;
                inventário.push("chave escada");
                console.log("Você decide explorar o quarto, em busca de alguma coisa que te ajude a entender oque está acontecendo.");
                console.log(chalk.yellow("Você pega a chave que encontrou embaixo da cabeceira, uma chave com etiqueta amarela:'ESCADA DE SERVIÇO'"));
                console.log("e um papel escrito: 'ENCONTRE A EMILY, ELA SABE A VERDADE'");
                console.log("Quem é Emily?");
                console.log("...");
            }else {
               console.log();
               console.log("Você já explorou o quarto.");
               console.log();
            }
            await pausar();
            },    
            "sair do quarto": () => {
                porta_aberta = true;
                if(porta_aberta) {
                    return "corredor";
                } 
            },
        }
    },
    corredor: { 
        descricao () {
            if(!corredor1){
                corredor1 = true;
                console.log("Você está em um corredor, que se estende nas duas direções.");
                console.log("Portas enfileiradas. A maioria trancada.");
                console.log("...");
                console.log("Escolha para onde ir:");
                console.log();
            }else {
                console.log("O mesmo corredor...");
                console.log("Escolha para onde ir:");
                console.log();
            }
        },
        conexoes: {
            "recepção": () => {
                return "recepcao";
            },
            "banheiro": () => {
                return "banheiro";
            },
            "escada de serviço": async function() {
                if(chave_escada==true){
                    return "escada";
                }else{
                    console.log();
                    console.log("Trancada com cadeado.");
                    console.log("Necessário ter chave da escada de serviço.");
                    console.log("...");
                    await pausar();
                }
            },
            "descer subsolo" (){
                if(!cartaosubsolo){
                    console.log();
                    console.log("Uma cancela eletrônica bloqueia a descida.");
                    console.log("Necessário ter um cartão de acesso.");
                }else {
                    return "subsolo";
                }
            },
            "voltar para quarto"(){
                return "quarto";
            }
        }
    },
    recepcao: {
        descricao(){
            if(!recepcao1){
                recepcao1 = true;
            console.log("Balcões destruídos.Cadeiras empilhadas como uma barricada.");
            console.log("Uma televisão de tubo no canto esquerdo, tela estática, volume baixo.");
            console.log("Um quadro de avisos no canto direito...");
            console.log();
            }else{
                console.log("O que você deseja fazer na recepção?");
            }
        },
        conexoes: {
            "examinar balcão": async function(){
                if(!chavegerador){
                    chavegerador = true;
                    console.log();
                    console.log("Você mexe nos arquivos. Papel velho. Prontuários rasgados.");
                    console.log(chalk.yellow("Você pegou uma chave com a etiqueta:'SALA DO GERADOR — SUBSOLO'"));
                    console.log("Por que estava guardada aqui?");
                    console.log("...");
                    await pausar();
                }else{
                    console.log();
                    console.log("Nada mais de útil no balcão.");
                    console.log();
                    await pausar();
                }
            },
            "examinar televisão": async function(){
                if(!fitak7){
                    fitak7 = true;
                    console.log();
                    console.log("Você se aproxima da televisão. Por um segundo um rosto. Na tela");
                    console.log("O SEU rosto. Olhando para você de dentro da tela. A imagem sumiu. Estática de novo.");
                    console.log();
                    console.log(chalk.yellow("Embaixo da TV, uma Fita K7 com um rótulo:'ORION / SESSÃO 12"));
                    console.log(chalk.yellow("Você pegou a Fita K7."));
                    console.log("...");
                    await pausar();
                }else{
                    console.log();
                    console.log("A tela só mostra estática. O rosto não voltou.");
                    console.log("Mas você ficou olhando por tempo demais.");
                    console.log();
                    await pausar();
                }
            },
            "ler quadro de avisos": async function(){
                console.log();
                console.log(chalk.green("'-----------AVISO INTERNO — DIREÇÃO CLÍNICA----------------"));
                console.log(chalk.green("Todos os pacientes da Ala C (Psiquiátrica) devem permanecer"));
                console.log(chalk.green("CONTIDOS até novo aviso.O Paciente 304 apresentou regressão"));
                console.log(chalk.green("grave. NÃO interagir. NÃO responder."));
                console.log(chalk.green("                                    — Dr. Orion, 14/08/2019"));
                console.log();
                console.log("Paciente 304. Você já viu esse número...No prontuário da sua cama, esse era o seu número.");
                console.log("...");
            await pausar();
            },
            "voltar ao corredor"(){
                return "corredor";
            }
        }
    },
    banheiro:{
        descricao(){
            if(!banheiro1){
                banheiro1 = true;
            console.log("Azulejos rachados. Água pingando em algum lugar.");
            console.log("A maioria dos espelhos estão quebrados.");
            console.log();
            }else{
                console.log("Você está no banheiro...");
                console.log("O que deseja fazer?");
                console.log();
            }
        },
        conexoes:{
            "olhar unico espelho inteiro": async function(){
                if(!seringa){
                    seringa = true;
                console.log();
                console.log("Você se aproxima devagar.");
                console.log("Seu reflexo aparece, você está pálido. Mas há algo atrás de você no reflexo.");
                console.log("Uma sombra. Alta. Com cabeça inclinada...Você se assusta e vira rápido... Nada. O banheiro está vazio.");
                console.log("Mas no espelho, onde a sombra estava, agora tem uma palavra riscada:");
                console.log("\"LEMBRE/\"");
                console.log("Você quebra o espelho com o cotovelo. Não aguenta olhar mais.");
                console.log("");
                console.log(chalk.yellow("Entre os cacos, uma seringa preenchida. Etiqueta:'304 — DOSE FINAL'"));
                console.log(chalk.yellow("Você pegou a seringa."));
                console.log("...");
                await pausar();
                }else{
                    console.log();
                    console.log("O espelho quebrado. Os cacos refletem mil versões suas.");
                    console.log("Em todas seus olhos parecem vazios.");
                    console.log("...");
                    await pausar();
                }
            },
            "olhar armários": async function(){
                console.log();
                console.log("Compressas velhas. Frascos de remédio sem rótulo.");
                console.log("Um dos frascos tem uma nota colada:");
                console.log();
                console.log(chalk.green("'Se você está lendo isso, já é tarde."));
                console.log(chalk.green(" O Dr. Orion mentiu sobre tudo"));
                console.log(chalk.green(" Emily não é paciente. Emily é a chave."));
                console.log(chalk.green("                       -Enf. M. Santos'"));
                console.log("...");
                await pausar();
            },
            "voltar ao corredor"(){
                return "corredor";
            }
        }
    },
    escada:{
        descricao(){
            if(chave_escada=true){
                if(!segundo_andar){
                    segundo_andar = true;
                console.log();
                console.log("O segundo andar tem um cheiro diferente. Mais pesado");
                console.log("Portas com visor de vidro reforçado. Celas. A maioria aberta e vazia.");
                console.log("Em uma das paredes, marcas de unhas. Centenas. Contando os dias.");
                console.log("...");
                console.log("Para onde deseja ir?")
                console.log();
                } else{
                    console.log("O andar psiquiátrico. As marcas de unhas continuam.");
                    console.log("...");
                    console.log("Deseja ir para onde?");
                }
            }else{
                console.log();
                console.log("Trancada com cadeado.");
                console.log("...");
            }

        },
        conexoes: {
            "sala de terapia"(){
                return "salaterapia";
            },
            "sala de monitoramento"(){
                return "monitoramento";
            },
            "arquivo C": async function(){
                if (!codigo_arquivoC) {
                    console.log();
                    console.log("Fechadura com código de 3 dígitos. Ainda não tem a combinação.");
                    await pausar();
                } else {
                    return "arquivoC";
                }
            },
            "telhado"(){
                return "telhado";
            },
            "descer para 1º andar"(){
                return"corredor";
            }
        }
    },
    salaterapia:{
        descricao(){
            if(!salaterapia1){
                salaterapia1 = true;
                console.log("Duas cadeiras de frente. Uma mesa. Um gravador velho.");
                console.log("Anotações espalhadas. Letra nervosa.");
            }else{
                console.log("Você está na sala de terapia. O gravador continua em cima da mesa.");
                console.log();
            }
            console.log("O que deseja fazer?");
            console.log();
        },
        conexoes:{
            "ouvir a gravação": async function(){
                if(!gravacao){
                    gravacao = true;
                    console.log(chalk.green("------------GRAVAÇÃO — SESSÃO 12 — PACIENTE 304----------"));
                    console.log(chalk.green("[Dr. Orion]: Como você se sente hoje?"));
                    console.log(chalk.green("[304]: Eu lembro dela. Eu lembro do acidente."));
                    console.log(chalk.green("[Dr. Orion]: Isso é um delírio. Emily não existe."));
                    console.log(chalk.green("[304]: Ela existe! Você a escondeu!"));
                    console.log(chalk.green("[Dr. Orion]: Aumentar dosagem. Anular memória episódica."));
                    console.log(chalk.green("[304]: NÃO! Eu sei o que vi... "));
                    console.log();
                    console.log(chalk.green("--------------------- FIM DA GRAVAÇÃO---------------------"));
                    console.log("...");
                    console.log("Você reconhece essa voz. É a sua voz...");
                }else{
                    console.log();
                    console.log("Você já ouviu a gravação...");
                    console.log("...");
                }
                await pausar();
            },
            "usar fita k7 no gravador": async function(){
                if(!fitak7){
                    console.log();
                    console.log("Você não tem uma fita k7.");
                    console.log();
                    await pausar();
                }else {
                    if(!ouvirk7){
                    ouvirk7 = true;
                    console.log();
                    console.log(chalk.green("----------------FITA K7 — ORION / SESSÃO 12 — CONTINUAÇÃO--------------"));
                    console.log(chalk.green("[Emily]: Ele está mais lúcido do que nunca."));
                    console.log(chalk.green("[Dr. Orion]: Não importa. O Projeto ORION não pode ser exposto."));
                    console.log(chalk.green("[Emily]: Você está apagando a memória de um inocente."));
                    console.log(chalk.green("[Dr. Orion]: Ele NÃO é inocente. Ele viu demais."));
                    console.log(chalk.green("[Emily]: Se você fizer isso, eu vou —"));
                    console.log(chalk.green("[ CORTE ABRUPTO ]"));
                    console.log(chalk.green("..."));
                    console.log(chalk.green("--------------------------- FIM DA GRAVAÇÃO----------------------------"));
                    console.log();
                    console.log("Você entende agora. Emily foi silenciada.");
                    console.log("No interior da fita, um papel dobrado...");
                    console.log(chalk.yellow.bold("Escrito: \"ARQUIVO C — CÓDIGO: 3-0-4\""));
                    codigo_arquivoC = true;
                    await pausar();
                    }else{
                        console.log();
                        console.log("Você ja ouviu essa fita.");
                        await pausar();
                    }
                }
            },
            "ler anotações da mesa":async function(){
                console.log();
                console.log(chalk.green("'PROJETO ORION — PROTOCOLO DE CONTENÇÃO"));
                console.log(chalk.green("Suj. 304: apagamento parcial."));
                console.log(chalk.green("Risco de colapso: CRÍTICO."));
                console.log(chalk.green("Emily G.: ala isolada. Subsolo."));
                console.log(chalk.green("Nenhum contato com 304.'"));
                console.log();
                lermesa = true;
                await pausar();
            },
            "voltar ao corredor"(){
                return "escada";
            }
        }
    },
    monitoramento:{
        descricao (){
            if (!monitoramento1){
                monitoramento1 = true;
                console.log("Bancos de monitores. A maioria apagada.");
                console.log("Três ainda funcionam com energia residual.");
                console.log("Uma câmera mostra um corredor no subsolo.");
                console.log("Há alguém lá. Imóvel. Sentado.");
                console.log("Esperando...");
                console.log();
            } else {
                console.log("A câmera do subsolo. A figura ainda lá. Ainda esperando.");
                console.log();
            }
        },
        conexoes:{
            "acessar o computador": async function() {
                console.log();
                console.log(chalk.green("------------ORION — ACESSO NÍVEL 1-----------"));
                console.log(chalk.green("PRONTUÁRIO 304"));
                console.log(chalk.green("Nome real: [ERRO]"));
                console.log(chalk.green("Admitido: 14/08/2019"));
                console.log(chalk.green("Diagnóstico: Síndrome dissociativa grave"));
                console.log(chalk.green("OBS: Era jornalista investigativo."));
                console.log(chalk.green("Internado sob falso diagnóstico."));
                console.log(chalk.green("Cartão de acesso ao Subsolo: Arquivo C."));
                console.log();
                await pausar();
            },
            "voltar ao corredor"() {
                return "escada";
            }
        }
    },
    arquivoC:{
        descricao(){
            if(!arquivoC1){
                arquivoC1 = true;
                console.log("Ar parado. Mais frio que o resto do hospital.");
                console.log("Fileiras de gavetas metálicas. Etiquetadas.");
                console.log("Há uma gaveta aberta, gaveta 7-B.");
                console.log("Alguém chegou antes de você. Ou esperava que você viesse.");
            }else {
                console.log("O arquivo frio. A gaveta 7-B ainda aberta.");
            } 
            console.log();
        },
        conexoes: {
            "examinar gaveta": async function(){
                if(!cartaosubsolo){
                    cartaosubsolo = true;
                    console.log();
                    console.log("Dentro de um envelope: fotografia e cartão.");
                    console.log(chalk.yellow("Cartão de acesso: \"SUBSOLO — ORION LAB\""));
                    console.log();
                    console.log(chalk.green("Fotografia: você e uma mulher. Sorrindo. Em frente ao hospital."));
                    console.log(chalk.green("No verso, letra feminina: \"Nós vamos expor tudo. — C.\""));
                    console.log(chalk.green("Emily.G "));
                    console.log("...");
                }else{
                    console.log();
                    console.log("A gaveta vazia. Você já pegou o que precisava.");
                    console.log();
                } await pausar();
            },
             "procurar outros arquivos": async function() {
                if(!outros_arquivos){
                outros_arquivos = true;
                console.log();
                console.log("Uma lista de nomes. \"INTERNADOS — PROJETO ORION — 2017-2019\"");
                console.log("Doze nomes. Onze riscados.");
                console.log("O último não está riscado: \"304 — STATUS: ATIVO\"");
                console.log("O que significa estar riscado?");
                console.log("Você vai entender na morgue.");
                console.log();
                await pausar();
                }else {
                    console.log();
                    console.log("Você já procurou por aqui.")
                    console.log();
                    await pausar();
                }
            },
            "voltar ao corredor"() {
                return "escada";
            }
        }
    },
    telhado:{
        descricao(){
             if (!telhado1) {
                telhado1 = true;
                console.log("Ar aberto. A cidade ao longe, silenciosa demais para 4 da manhã.");
                console.log("Nenhuma luz nas ruas. Nenhum carro. Nenhum movimento.");
                console.log("Como se o mundo lá fora também tivesse sido apagado.");
                console.log("Há uma mochila abandonada.");
            } else {
                console.log("Você está no telhado. A cidade ainda parece morta lá embaixo.");
            }
            console.log();
        },
        conexoes:{
            "examinar a mochila": async function() {
                if(!mochila1){
                mochila1 = true;
                console.log();
                console.log("Roupas. Um bloco de notas encharcado. Você lê o que sobrou:");
                console.log();
                console.log(chalk.green("\"...Projeto ORION usa o hospital como lab."));
                console.log(chalk.green(" Emily conseguiu o arquivo completo."));
                console.log(chalk.green(" Se algo acontecer comigo, ela sabe onde"));
                console.log(chalk.green(" está tudo. Subsolo. Sala ORION.\""));
                console.log();
                console.log("Esse é o seu bloco de notas.");
                console.log("Você estava investigando o hospital. E eles te internaram.");
                await pausar();
                }else{
                    console.log();
                    console.log("Nada mais de importante na mochila.");
                }
            },
            "descer para 2º andar"(){
                return "escada";
            }
        }
    },
    subsolo:{
        descricao(){
            if(!subsolo1){
                subsolo1 = true;
                console.log("Cheiro de ozônio. Cabos expostos. Tudo improvisado.");
                console.log("Como se alguém tivesse construído isso às escondidas.");
                console.log("Você vê: Gerador, Sala ORION, Morgue.");
                console.log("Ao fundo, uma silhueta sentada. Imóvel.");
                console.log("Não dá para ver se está viva.");
                console.log();
            } else{
                console.log("O subsolo. A silhueta no fim do corredor. Ainda imóvel.");
                console.log();
            }
        }, 
        conexoes:{
            "ligar gerador": async function() {
                if (!chavegerador) {
                    console.log("Trancado. Você precisa da chave do gerador.");
                    console.log();
                    await pausar();
                } else {
                    if (!energiaLigada) {
                    energiaLigada = true;
                    console.log();
                    console.log("O gerador ronca. As luzes do subsolo acendem.");
                    console.log("A silhueta no fundo se ilumina.");
                    console.log("Uma pessoa. Sentada. Amarrada na cadeira.");
                    console.log("Ela levantou a cabeça.");
                    console.log("Energia ligada. Sala ORION agora acessível.");
                    console.log();
                    await pausar();
                }else{
                console.log();
                    console.log("O gerador já está ligado.");
                    console.log();
                    await pausar();
                }}
            },
            "entrar na sala orion": async function() {
                if (!energiaLigada) {
                    console.log();
                    console.log("Escuro demais. Ligue o gerador primeiro.");
                    await pausar();
                } else {
                    return "salaOrion";
                }
            },
            "entrar na morgue" () {
                return "morgue";
            },
            "subir para o 1º andar": () => {
                return "corredor";
            },
        }
    },
     morgue: {
        descricao (){
            if (!morgue1) {
                morgue1 = true;
                console.log("Câmaras frigoríficas. A maioria aberta. Vazia.");
                console.log("Exceto uma.");
                console.log("Câmara 11. Fechada. Com trava por dentro.");
                console.log("Alguém se trancou aqui dentro.");
            } else {
                console.log("A morgue. A câmara 11.");
            }
            console.log();
        },
        conexoes: {
            "bater na câmara 11": async function() {
                console.log();
                if (!morgueAberta) {
                    console.log("Você bate.");
                    console.log("Silêncio...");
                    console.log("Você bate de novo.");
                    console.log("Algo bate de volta. Três vezes. Ritmadas.");
                    console.log("A trava desliza. A câmara abre.");
                    console.log("Vazia. Mas gravado no metal por dentro:");
                    console.log("\"NOITE 14 — NÃO FOI ACIDENTE\"");
                    console.log("...");
                    morgueAberta = true;
                } else {
                    console.log("A câmara aberta. A mensagem ainda lá.");
                    console.log("\"NOITE 14 — NÃO FOI ACIDENTE\"");
                }
                await pausar();
            },
            "ver os arquivos da morgue": async function() {
                console.log();
                console.log("Onze fichas. Causa da morte: \"Falência múltipla de órgãos.\"");
                console.log("Os onze riscados na lista do Arquivo C.");
                console.log("Você era o décimo segundo. O único ainda não riscado.");
                console.log("...");
                await pausar();
            },
            "voltar para o subsolo" () {
                return "subsolo";
            },
        }
    },
    salaOrion: {
        descricao ()  {
            if (!SalaOrion1) {
                SalaOrion1 = true;
                console.log("Dezenas de monitores. Em cada tela, um rosto. Pacientes dormindo.");
                console.log("Monitoramento em tempo real. Muitas telas já em estática.");
                console.log("No centro, uma cadeira de metal. Com eletrodos.");
                console.log("Você sabe o que é essa cadeira.");
                console.log("Você já sentou nela.");
            } else {
                console.log("Você está na Sala ORION.");
            }
            if (seringa && !verdadeRevelada) console.log("Acesse o terminal primeiro. Você precisa saber tudo.");
            if (seringa && verdadeRevelada) console.log("Você está pronto. A cadeira te espera.");
            console.log();
        },
        conexoes: {
            "acessar o terminal": async function() {
                console.log();
                console.log(chalk.green("SISTEMA ORION — ACESSO: ADMINISTRADOR"));
                console.log(chalk.green("NOME: Marcos Vidal"));
                console.log(chalk.green("Jornalista — Agência Livre"));
                console.log(chalk.green("Internado: 14/08/2019"));
                console.log(chalk.green("Motivo real: Descobriu o Projeto ORION"));
                console.log(chalk.green("Sessões de apagamento: 12"));
                console.log(chalk.green("Memórias suprimidas: ~94%"));
                console.log(chalk.green("Resíduos: Emily G., Noite 14"));
                console.log(chalk.green("Protocolo final: 17/08/2019"));
                console.log("...");
                console.log("Marcos Vidal.");
                console.log("Esse é o seu nome.");
                console.log("E a data do protocolo final já passou.");
                console.log("Você deveria estar morto. Mas Emily abriu suas correias.");
                console.log("...");
                verdadeRevelada = true;
                if (seringa) console.log("Agora sente na cadeira e use a seringa.");
                await pausar();
            },
            "sentar na cadeira e usar a seringa": async function() {
                if (!seringa || !verdadeRevelada) {
                    console.log();
                    if (!verdadeRevelada) console.log("Acesse o terminal primeiro.");
                    else console.log("Você não tem a seringa.");
                    await pausar();
                    return;
                }
                return "final";
            },
            "voltar para o subsolo" () {
                return "subsolo";
            },
        }
    },
    final: {
        descricao: async function() {
            console.log();
    console.log(chalk.cyan("Você senta na cadeira."));
    console.log(chalk.cyan("Encaixa os eletrodos nos pulsos."));
    console.log(chalk.cyan("Injeta o conteúdo da seringa."));
    console.log(chalk.cyan("..."));
    console.log(chalk.cyan("Quente. Depois frio."));
    console.log(chalk.cyan("Depois escuro."));
    console.log();
    await pausar();

    console.log();
    console.log(chalk.cyan("As memórias voltam...Mas não são as de um jornalista. São as de um laboratório."));
    console.log(chalk.cyan("De onze rostos que olharam para você antes de esquecerem quem eram."));
    console.log(chalk.cyan("Você não investigava o Projeto ORION. Você criou o Projeto ORION."));
    console.log();
    await pausar();

    console.log();
    console.log(chalk.cyan("Seu nome real é Dr. Marcos Vidal. Neurocientista. Contratado em 2016 pela Célula Minerva."));
    console.log(chalk.cyan("Uma divisão secreta dentro do Ministério da Saúde. Na época, te disseram que o projeto era humanitário."));
    console.log(chalk.cyan("Tratamento experimental para vítimas de trauma severo. Você acreditou. Assinou tudo. Construiu tudo."));
    console.log();
    await pausar();

    console.log();
    console.log(chalk.cyan("A Célula Minerva tinha outros planos. Por anos desviaram verbas do SUS através de contratos fantasmas."));
    console.log(chalk.cyan("Quando alguém descobria, a Célula Minerva mandava para o Santa Agnes. E você apagava, sem nem perguntar quem eram."));
    console.log(chalk.cyan("Até a vítima número dez..."));
    console.log(chalk.cyan("Uma criança. Filha de uma auditora que se recusou a assinar um relatório falso."));
    console.log(chalk.cyan("Aí você parou."));
    console.log();
    await pausar();

    console.log();
    console.log(chalk.cyan("Você recusou o procedimento. Ameaçou expor tudo. A Célula Minerva não hesitou. Usaram o seu próprio protocolo contra você."));
    console.log(chalk.cyan("Plantaram uma identidade falsa de jornalista. E te internaram como Paciente 304."));
    console.log(chalk.cyan("..."));
    console.log(chalk.cyan("Emily. O rosto dela volta agora com contexto. O pai dela era o paciente número sete."));
    console.log(chalk.cyan("Rodrigo Gama. Contador do Ministério da Saúde."));
    console.log(chalk.cyan("Descobriu os contratos fantasmas e foi denunciar. Nunca chegou à delegacia."));
    console.log(chalk.cyan("Emily passou três anos rastreando o hospital. Rastreando você. Não abriu suas correias por bondade."));
    console.log(chalk.cyan("Abriu porque precisava que você lembrasse. Sem você, os arquivos do servidor não valem nada."));
    console.log();
    await pausar();
console.log();
    console.log(chalk.cyan("Você volta ao corredor do subsolo. Emily ainda na cadeira. Te esperando. Você corta as amarras."));
    console.log(chalk.cyan("Ela te olha. Sem ódio. Só cansaço."));
    console.log(chalk.cyan("\"Você lembra?\""));
    console.log(chalk.cyan("\"Sim. De tudo.\""));
    console.log(chalk.cyan("Ela não responde. Vira e começa a andar."));
    console.log(chalk.cyan("\"Os arquivos estão no servidor. Você sabe as senhas."));
    console.log(chalk.cyan("No telhado alcançamos frequência de emergência.\""));
    console.log();
    await pausar();

    console.log();
    console.log(chalk.cyan("Telhado. 04:47."));
    console.log(chalk.cyan("Emily conecta os arquivos ORION no transmissor. Você digita suas senhas. A frequência de emergência responde."));
    console.log(chalk.cyan("\"Quem está transmitindo?\""));
    console.log(chalk.cyan("Emily fala, voz firme:"));
    console.log(chalk.cyan("\"- Emily Gama. Hospital Santa Agnes."));
    console.log(chalk.cyan(" Evidências do Projeto ORION e da Célula Minerva. Desvio de verbas do SUS."));
    console.log(chalk.cyan(" Doze vítimas de apagamento de memória. O criador do protocolo está aqui. Ele vai colaborar.\""));
    console.log(chalk.cyan("Ela te olha. Uma pergunta sem palavras."));
    console.log(chalk.cyan("----------------------------------------------------------------------------------------------------------------"));
    console.log(chalk.cyan("Você poderia negar. Poderia correr. Você respira fundo."));
    console.log(chalk.cyan("\"- Confirmo. Sou o Dr. Marcos Vidal, criador do Projeto ORION. Estou pronto para depor sobre tudo.\""));
    console.log(chalk.cyan("..."));
    console.log(chalk.cyan("\"- Recebemos. Permaneçam onde estão. Ajuda a caminho.\""));
    console.log();
    console.log(chalk.cyan("Emily fecha os olhos. Não de alívio. De exaustão."));
    console.log(chalk.cyan("Vocês dois sabem que isso não tem final feliz para você."));
    console.log();
    await pausar();

    console.log();
    console.log(chalk.cyan("────────────────────────────── EPÍLOGO ──────────────────────────────"));
    console.log();
    console.log(chalk.cyan("Os arquivos do Projeto ORION e da Célula Minerva"));
    console.log(chalk.cyan("foram publicados em dezessete veículos de imprensa simultaneamente."));
    console.log(chalk.cyan("O Dr. Marcos Vidal colaborou com todas as investigações."));
    console.log(chalk.cyan("Foi condenado a doze anos. Cumpriu em regime fechado."));
    console.log(chalk.cyan("Respondeu por cada página que assinou."));
    console.log(chalk.cyan("Rodrigo Gama foi reconhecido oficialmente como vítima do Estado."));
    console.log(chalk.cyan("Emily Gama nunca mais falou com o Dr. Vidal."));
    console.log(chalk.cyan("Mas compareceu a cada audiência."));
    console.log(chalk.cyan("Na primeira fila."));
    console.log();
    console.log(chalk.cyan("───────────────────────── HOSPITAL 304 — FIM ─────────────────────────"));
    console.log(chalk.cyan("\"Algumas histórias se recusam a ser apagadas.\""));
    console.log(chalk.cyan("\"Outras deveriam ter sido.\""));
    console.log();
    console.log(chalk.cyan("Obrigado por jogar."));
    console.log();
        },
        conexoes: {},
    }
}


while(true) {
    const sala = salas[salaAtual];
    if (!sala) {
        console.log("Caiu para fora do mundo!");
        break;
    }

    console.log();
    sala.descricao();
    for(const chave in sala.conexoes) {
        console.log("-", chave);
    }

    const comando = await term.question("> ");
    if(!comando) {
        break;
    }
    
    const destinoFn = sala.conexoes[comando];
    if(destinoFn) {
        const destino = await destinoFn();
        if(destino) {
            salaAtual = destino;
        }
    } else {
        console.log(chalk.blue.bold("--------------------"));
        console.log(chalk.blue.bold("Escolha inválida"));
    }
}

console.log(chalk.blue.bold("Você saiu do jogo"));
term.close();
}