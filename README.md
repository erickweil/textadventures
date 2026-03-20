# TextAdventures
Aventuras de Texto, desenvolvidos por alunos do curso ADS

- Front no Github Pages: https://erickweil.github.io/textadventures/
- API hospedada na Vercel: https://textadventures.vercel.app/

## Como jogar

A ideia é simples: você está em um cenário, e deve escolher entre as opções disponíveis para avançar na história. Cada escolha pode levar a diferentes caminhos e finais.

**É ONLINE!** então você poderá ver outros jogadores na mesma sala que você, e poderá trocar itens (largando e pegando do chão), etc...

Comandos:
- **N**, **S**, **L**, **O**, (entre outros): Movimentação (Norte, Sul, Leste, Oeste)
- **OLHAR**: Descreve o cenário atual
- **MOCHILA**: Ver itens na mochila
- **PEGAR** <ins>**item**</ins> : Pegar um item
- **PEGAR** <ins>**quantidade**</ins> <ins>**item**</ins> : Pegar vários itens
- **LARGAR** <ins>**item**</ins>: Largar um item
- **LARGAR** <ins>**quantidade**</ins> <ins>**item**</ins>: Largar vários itens
- **SAIR**: Sair do jogo (deslogar)

## Como rodar o projeto na sua máquina

Se quiser testar as aventuras de texto localmente, o jeito mais fácil e rápido é usando o `tsx`. Segue o passo a passo:


1. Clone este repositório:
   ```bash
   git clone https://github.com/erickweil/textadventures.git
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Escolha uma aventura e rode direto no terminal:
   ```bash
   npx tsx nome-do-arquivo.ts
   ```

