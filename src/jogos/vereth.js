//const prompt = require('prompt-sync')({sigint: true});
import { console, prompt, process, rl } from "../mockConsole";

export async function vereth() {

const perguntas = [
  {
    texto: 'Quando o silencio dura tempo demais... o que voce ouve primeiro?',
    opcoes: {
      a: {resposta: 'Um eco de algo que nunca vivi.', efeito: () => atributos.memoria += 2},
      b: {resposta: 'O som da minha propria respiracao.', efeito: () => atributos.vontade += 2},
      c: {resposta: 'Nada. E isso me acalma.', efeito: () => atributos.coragem += 2}
    }
  },
  {
    texto: 'Por que voce quer entender?',
    opcoes: {
      a: {resposta: 'Para nao ser enganado de novo.', efeito: () => atributos.foco += 2},
      b: {resposta: 'Porque alguma coisa aqui precisa ser lembrada.', efeito: () => { atributos.memoria += 1; atributos.vontade += 1;}},
      c: {resposta: 'Porque entender me faz sentir menos so.', efeito: () => atributos.vinculo += 2}
    }
  },
  {
    texto: 'Voce se lembra de ter sentido medo pela primeira vez?',
    opcoes: {
      a: {resposta: 'Nao. E isso me assusta.', efeito: () => atributos.vontade += 2},
      b: {resposta: 'Sim. E continuo carregando.', efeito: () => atributos.coragem += 2},
      c: {resposta: 'Sim. Mas ja nao doi.', efeito: () => { atributos.vontade += 1; atributos.memoria += 1; }}
    }
  },
  {
    texto: 'Qual dessas palavras te parece mais verdadeira agora?',
    opcoes: {
      a: {resposta: 'Espera.', efeito: () => atributos.foco += 2},
      b: {resposta: 'Ruina.', efeito: () => atributos.memoria += 2},
      c: {resposta: 'Nome.', efeito: () => atributos.vinculo += 2}
    }
  },
  {
    texto: 'E se, ao final, ninguem lembrar de voce?',
    opcoes: {
      a: {resposta: 'Que assim seja.', efeito: () => atributos.vontade += 2},
      b: {resposta: 'Eu lembraria de mim.', efeito: () => atributos.foco += 2},
      c: {resposta: 'Alguem, em algum lugar, vai sentir a falta.', efeito: () => { atributos.vinculo += 1; atributos.coragem += 1; }}
    }
  }
];

let atributos = { memoria:0, vontade:0, coragem:0, foco:0, vinculo:0 };

function getAtributoAnciao(){
  return Math.floor((atributos.memoria + atributos.vontade + atributos.vinculo)/3);
}

const jogador = {
  nome: 'Vazio',
  inventario: [],
  frases: [],
  salasDescobertas: [],
  diarioTentativas: {},
  perguntasBloqueadas: [],
  salasVasculhadas: [],
  reflexoTentado: false,
  combateClareiraConcluido: false,
};

const perguntasDialogo = {
  origem: 'O que eu sou, de verdade?',
  cura: 'Existe uma cura para os infectados?',
  criador: 'Por que o Arquivista me criou?',
  sentido: 'Qual o proposito de tudo isso?',
  fim: 'Vereth pode ser salva?'
};

let diarioAtivo = null;

function rolarComAtributo(attr){
  const base = Math.floor(Math.random()*5)+1;
  const total = base + atributos[attr];
  return total >= 6;
}

function tentarFraseDiario(id, attr, texto){
  if(jogador.diarioTentativas[id]){
    console.log('Voce ja tentou lembrar algo aqui.');
    return;
  }
  jogador.diarioTentativas[id] = true;
  if(rolarComAtributo(attr)){
    jogador.frases.push(texto);
    console.log('Seus dedos se movem sozinhos...');
    console.log(`"${texto}"`);
  } else {
    console.log('O diario permanece mudo.');
  }
}

function abrirDiario(id, attr, texto){
  if(jogador.diarioTentativas[id]){
    console.log('Voce ja buscou memoria neste lugar.');
    return;
  }
  diarioAtivo = {id, attr, texto};
  console.log('Voce empunha o velho diario. As paginas rangem como se o tempo ainda vivesse entre elas...');
  console.log('Talvez seja hora de REFLETIR, LEMBRAR ou PENSAR.');
  mostrarComandos(salas[jogador.salaAtual]);
}

function refletir(){
  if(!diarioAtivo){
    console.log('Voce precisa abrir o diario primeiro.');
    return;
  }
  const {id, attr, texto} = diarioAtivo;
  diarioAtivo = null;
  tentarFraseDiario(id, attr, texto);
}

function entrarSala(nome){
  const sala = salas[nome];
  if(!sala){
    console.log('Voce se perde na escuridao.');
    return;
  }
  if(!jogador.salasDescobertas.includes(nome)){
    jogador.salasDescobertas.push(nome);
    console.log(`[Nova sala descoberta: ${nome}]`);
  }
  jogador.salaAtual = nome;
  console.log(sala.descricao());
  if(nome === 'Clareira da Lembranca' && !jogador.combateClareiraConcluido){
    iniciarCombate('Muwon');
    jogador.combateClareiraConcluido = true;
    console.log('A carta de Muwon fala de saudade e dor.');
  }
  mostrarComandos(sala);
}

function mostrarComandos(sala){
  console.log('Comandos disponiveis:');
  for(const cmd of Object.keys(sala.acoes)){
    console.log(' - '+cmd);
  }
  if(sala.itens && !jogador.salasVasculhadas.includes(jogador.salaAtual)){
    console.log(' - vasculhar');
  }
  if(diarioAtivo){
    console.log(' - refletir (ou lembrar, pensar)');
  }
}

function iniciarCombate(inimigo){
  console.log(`Um ${inimigo} surge, infectado.`);
  const acao = prompt('LUTAR ou POUPAR? ').trim().toUpperCase();
  if(acao==='LUTAR'){
    if(rolarComAtributo('coragem')){
      console.log('Voce vence a luta.');
    }else{
      console.log('Voce falha e sente sua forca diminuir.');
      perderAtributoAleatorio();
    }
  }else{
    rolarDadoPiedade();
  }
}

function perderAtributoAleatorio(){
  const keys = Object.keys(atributos);
  const k = keys[Math.floor(Math.random()*keys.length)];
  if(atributos[k]>0) atributos[k]-=1;
  console.log(`Perdeu 1 ponto em ${k}.`);
}

function perderItemAleatorio(){
  if(jogador.inventario.length===0){
    console.log('Nada a perder.');
    return;
  }
  const i = Math.floor(Math.random()*jogador.inventario.length);
  const item = jogador.inventario.splice(i,1)[0];
  console.log(`O item ${item} escapa de suas maos.`);
}

function perderPergunta(){
  const disponiveis = Object.keys(perguntasDialogo)
    .filter(k => !jogador.perguntasBloqueadas.includes(k));
  if(disponiveis.length===0){
    console.log('Sua mente ja nao comporta mais esquecimentos.');
    return;
  }
  const k = disponiveis[Math.floor(Math.random()*disponiveis.length)];
  jogador.perguntasBloqueadas.push(k);
  console.log('Uma pergunta ao Anciao se perde na sua mente...');
}

function rolarDadoPiedade(){
  const r = Math.random();
  if(r<0.5){
    console.log('Nada acontece.');
  }else if(r<0.75){
    perderAtributoAleatorio();
  }else if(r<0.875){
    perderItemAleatorio();
  }else{
    perderPergunta();
  }
}

function vasculharSala(){
  const sala = salas[jogador.salaAtual];
  if(!sala.itens || sala.itens.length===0 || jogador.salasVasculhadas.includes(jogador.salaAtual)){
    console.log('Nada mais pode ser encontrado aqui.');
    return;
  }
  jogador.salasVasculhadas.push(jogador.salaAtual);
  sala.itens.forEach(item => {
    console.log(`Voce encontra: ${item}.`);
    console.log('Voce guarda o item no seu manto.');
    jogador.inventario.push(item);
  });
}

const salas = {
  'Floresta Inquieta': {
    descricao(){
      return 'Arvores tortas cercam um lago de agua quase cristalina, que parece observar de volta.';
    },
    itens: ['anel partido'],
    acoes: {
      norte(){ entrarSala('Ruina do Sussurro'); },
      observar(){ console.log('Voce sente o silencio ecoar.'); },
      olhar(){
        if(jogador.reflexoTentado){
          console.log('O reflexo ja disse tudo o que podia. Agora, so o silencio permanece.');
          return;
        }
        jogador.reflexoTentado = true;
        const r = Math.floor(Math.random()*1000)+1;
        if(r === 777){
          console.log('O reflexo sorri, com olhos que voce conhece.');
          console.log('"Sou Quirrel. Voce se esqueceu de mim... mas eu nunca esqueci de voce."');
          jogador.frases.push('Quirrel. Esse nome nao era meu, mas ainda assim me pertence.');
        }else{
          console.log('O reflexo se move, mas sua boca nao abre.');
          console.log('Quando o som enfim vem, e apenas uma palavra: "Vazio."');
        }
      },
      diario(){ abrirDiario('floresta','vontade','Antes do fim, tentei ensinar ao vazio o nome da esperança. Mas como se ensina luz a quem nunca abriu os olhos?'); }
    }
  },
  'Ruina do Sussurro': {
    descricao(){ return 'Pedras caidas contam historias esquecidas.'; },
    itens: ['eco cristalizado'],
    acoes:{
      sul(){ entrarSala('Floresta Inquieta'); },
      leste(){ entrarSala('Cabana Esquecida'); },
      esperar(){ console.log('O vento traz sussurros ancestrais.'); },
      diario(){ abrirDiario('ruina','foco','Sussurros de um selo são mais fortes que gritos de um rei. Por isso escolhi o silêncio como última muralha.'); }
    }
  },
  'Cabana Esquecida': {
    descricao(){ return 'Restos de madeira e cinzas escondem memórias.'; },
    itens: ['fragmento de vela'],
    acoes:{
      oeste(){ entrarSala('Ruina do Sussurro'); },
      tocar(){ console.log('A madeira, fria, lembra antigas presenças.'); },
      diario(){ abrirDiario('cabana','vinculo','Esculpi para lembrar. Cada forma, uma ausência que não me deixava em paz.'); }
    }
  },
  'Clareira da Lembranca': {
    descricao(){ return 'Uma clareira iluminada por uma luz triste.'; },
    acoes:{
      oeste(){ entrarSala('Cabana Esquecida'); },
      leste(){ entrarSala('Portal Quebrado'); },
      ler(){ console.log('A carta de Muwon fala de saudade e dor.'); },
      diario(){ abrirDiario('clareira','coragem','Nem todo grito de socorro é audível. Às vezes, ele se esconde na decisão de ficar… e apodrecer.'); }
    }
  },
  'Portal Quebrado': {
    descricao(){ return 'Arcos despedaçados guardam um portal adormecido.'; },
    acoes:{
      inspecionar(){ console.log('Runas apagadas sugerem um poder antigo.'); },
      tentar(){
        const requisitados = ['fragmento de vela','anel partido','eco cristalizado'];
        const faltam = requisitados.filter(i => !jogador.inventario.includes(i));
        if(faltam.length===0){
          console.log('O portal pulsa com vida antiga. Uma nova etapa começa...');
          console.log('Fim do Ato I.');
          process.exit(0);
        } else {
          console.log('O portal recusa sua presença. Algo ainda está faltando...');
        }
      },
      voltar(){ entrarSala('Clareira da Lembranca'); }
    }
  }
};

async function main(){
  console.log('--- VARETH: O SELO ---');
  await construirAtributos();
  console.log('\nSuas escolhas estao marcadas.');
  entrarSala('Floresta Inquieta');
  while(true){
    const comando = (await prompt('> ')).trim().toLowerCase();
    if(comando === 'sair'){
      console.log('A escuridao te engole.');
      break;
    }
    const sala = salas[jogador.salaAtual];
    if(sala.acoes[comando]){
      sala.acoes[comando]();
    }else if(comando === 'encarar' && sala.acoes['olhar']){
       sala.acoes['olhar']();
    }else if(comando === 'vasculhar'){
      vasculharSala();
    }else if(['refletir','lembrar','pensar'].includes(comando)){
       refletir();
    }else if(comando === 'inventario'){
      console.log('Inventario:', jogador.inventario.join(', ') || 'vazio');
    }else if(comando === 'status'){
      console.log('Atributos:', atributos, '| ANCIAO:', getAtributoAnciao());
    }else if(comando === 'memorias'){
       if(jogador.frases.length===0){
         console.log('Nenhuma memoria registrada.');
       }else{
         console.log('MEMORIAS REGISTRADAS:');
         jogador.frases.forEach(f=>console.log('- "'+f+'"'));
       }
    }else{
      console.log('Acao desconhecida.');
    }
    if(jogador.frases.length === 4){
      await dialogoFinal();
      break;
    }
  }
}

async function construirAtributos(){
  //perguntas.forEach((p,idx)=>{ 
  for(let [idx, p] of perguntas.entries()) {
    console.log(`\n${idx+1}. ${p.texto}`);
    for(const [letra,op] of Object.entries(p.opcoes)){
      console.log(` ${letra}) ${op.resposta}`);
    }
    let r;
    do{ r = (await prompt('> ')).trim().toLowerCase(); }while(!p.opcoes[r]);
    p.opcoes[r].efeito();
  }
  console.log('\n"Esta feito. Essas sao as fissuras por onde o mundo te atravessa."');
}

async function dialogoFinal(){
  console.log('\nTodas as memorias emergem. O Anciao se manifesta.');
  const disponiveis = Object.entries(perguntasDialogo)
    .filter(([k]) => !jogador.perguntasBloqueadas.includes(k));
  if(disponiveis.length === 0){
    console.log('Voce nao tem perguntas a fazer.');
    console.log('Fim do Ato I.');
    process.exit(0);
  }
  disponiveis.forEach(([_, texto], i)=> console.log(`${i+1}. ${texto}`));
  let escolha;
  do {
    escolha = parseInt(await prompt('Escolha uma pergunta: '),10);
  } while (isNaN(escolha) || escolha < 1 || escolha > disponiveis.length);
  console.log('A resposta ecoa na sua mente...');
  console.log('Fim do Ato I.');
  process.exit(0);
}

await main();

}