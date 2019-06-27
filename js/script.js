const linhas = 10;
const colunas = 10;
const areaQuadrado = 50;
const navioTanque = 5;
const portaAvioes = 4;
const contraTorpedeiro = 3;
const submarino = 2;
let contaAcertos;
let jogoIniciado = false;
let matriz = [];

const tabuleiro = document.getElementById('tabuleiro');
const tabuleiro2 = document.getElementById('tabuleiro2');

// variáveis que contém as divs que constituem cada embarcação da frota
const navioTanqueEsq = document.getElementById('navioTanqueEsq');
const navioTanqueDir = document.getElementById('navioTanqueDir');
const contraTorpedeiroEsq1 = document.getElementById('contraTorpedeiroEsq1');
const contraTorpedeiroDir1 = document.getElementById('contraTorpedeiroDir1');
const contraTorpedeiroEsq2 = document.getElementById('contraTorpedeiroEsq2');
const contraTorpedeiroDir2 = document.getElementById('contraTorpedeiroDir2');
const portaAvioesEsq = document.getElementById('portaAvioesEsq');
const portaAvioesDir = document.getElementById('portaAvioesDir');
const submarinoEsq = document.getElementById('submarinoEsq');
const submarinoDir = document.getElementById('submarinoDir');

const frotaEsquerda = document.getElementById('frota-esquerda');
const frotaDireita = document.getElementById('frota-direita');

// constrói o tabuleiro da esquerda
for (i = 0; i < colunas; i++) {
	for (j = 0; j < linhas; j++) {
		let quadrado = document.createElement('div');
        tabuleiro.appendChild(quadrado);
		quadrado.id = 'tab-esq' + j + i;		
		let posicaoTopo = j * areaQuadrado;
		let posicaoEsquerda = i * areaQuadrado;	
		quadrado.style.top = posicaoTopo + 'px';
		quadrado.style.left = posicaoEsquerda + 'px';	
		quadrado.className = 'celula vazia';						
	}
}

// constrói o tabuleiro da direita
for (i = 0; i < colunas; i++) {
	for (j = 0; j < linhas; j++) {
		let quadrado = document.createElement('div');
		tabuleiro2.appendChild(quadrado);
		quadrado.id = 'tab-dir' + j + i;			
		let posicaoTopo = j * areaQuadrado;
		let posicaoEsquerda = i * areaQuadrado;			
		quadrado.style.top = posicaoTopo + 'px';
		quadrado.style.left = posicaoEsquerda + 'px';
		quadrado.className = 'celula vazia'		
	}
}


/*
* Laços abaixo constroem as embarcações
* navio-tanque -> 5 casas
* porta-aviões -> 4 casas
* contra-torpedeiro -> 3 casas
* submarino -> 2 casas
*/
for (i = 0; i < navioTanque; i++) {
	let quadradoEsq = document.createElement('div');
	let quadradoDir = document.createElement('div');
	navioTanqueEsq.appendChild(quadradoEsq);
	navioTanqueDir.appendChild(quadradoDir);
	quadradoEsq.id = `nt1Esq-${i}`;
	quadradoEsq.className = 'quadrado'
	quadradoDir.id = `nt1Dir-${i}`;
	quadradoDir.className = 'quadrado'
	quadradoEsq.style.top = i * areaQuadrado + 'px';
	quadradoEsq.style.cursor = 'pointer';
	quadradoDir.style.top = i * areaQuadrado + 'px';
	quadradoDir.style.cursor = 'pointer';
}

for (i = 0; i < portaAvioes; i++) {
	let quadradoEsq = document.createElement('div');
	let quadradoDir = document.createElement('div');
	portaAvioesEsq.appendChild(quadradoEsq);
	portaAvioesDir.appendChild(quadradoDir);
	quadradoEsq.id = `pa1Esq-${i}`;
	quadradoEsq.className = 'quadrado'
	quadradoDir.id = `pa1Dir-${i}`;
	quadradoDir.className = 'quadrado'
	quadradoEsq.style.top = i * areaQuadrado + 'px';
	quadradoEsq.style.cursor = 'pointer';
	quadradoDir.style.top = i * areaQuadrado + 'px';
	quadradoDir.style.cursor = 'pointer';
}

for (i = 0; i < contraTorpedeiro; i++ ) {
	let quadradoEsq1 = document.createElement('div');
	let quadradoEsq2 = document.createElement('div');
	let quadradoDir1 = document.createElement('div');
	let quadradoDir2 = document.createElement('div');
	contraTorpedeiroEsq1.appendChild(quadradoEsq1);
	contraTorpedeiroEsq2.appendChild(quadradoEsq2);
	contraTorpedeiroDir1.appendChild(quadradoDir1);
	contraTorpedeiroDir2.appendChild(quadradoDir2);
	quadradoEsq1.id = `ct1Esq-${i}`;
	quadradoEsq1.className = 'quadrado vazio'
	quadradoEsq2.id = `ct2Esq-${i}`;
	quadradoEsq2.className = 'quadrado vazio'
	quadradoDir1.id = `ct1Dir-${i}`;
	quadradoDir1.className = 'quadrado vazio'
	quadradoDir2.id = `ct2Dir-${i}`;
	quadradoDir2.className = 'quadrado vazio'
	quadradoEsq1.style.top = i * areaQuadrado + 'px';
	quadradoEsq1.style.cursor = 'pointer';
	quadradoEsq2.style.top = i * areaQuadrado + 'px';
	quadradoEsq2.style.cursor = 'pointer';
	quadradoDir1.style.top = i * areaQuadrado + 'px';
	quadradoDir1.style.cursor = 'pointer';
	quadradoDir2.style.top = i * areaQuadrado + 'px';
	quadradoDir2.style.cursor = 'pointer';
}

for (i = 0; i < submarino; i++) {
	let quadradoEsq = document.createElement('div');
	let quadradoDir = document.createElement('div');
	submarinoEsq.appendChild(quadradoEsq);
	submarinoDir.appendChild(quadradoDir);
	quadradoEsq.id = `nt1Esq-${i}`;
	quadradoEsq.className = 'quadrado vazio'
	quadradoDir.id = `nt1Dir-${i}`;
	quadradoDir.className = 'quadrado vazio'
	quadradoEsq.style.top = i * areaQuadrado + 'px';
	quadradoEsq.style.cursor = 'pointer';
	quadradoDir.style.top = i * areaQuadrado + 'px';
	quadradoDir.style.cursor = 'pointer';
}

const celulas = document.querySelectorAll('.celula');

navioTanqueEsq.addEventListener('dragstart', dragStart);
navioTanqueDir.addEventListener('dragstart', dragStart);
contraTorpedeiroEsq1.addEventListener('dragstart', dragStart);
contraTorpedeiroDir1.addEventListener('dragstart', dragStart);
contraTorpedeiroEsq2.addEventListener('dragstart', dragStart);
contraTorpedeiroDir2.addEventListener('dragstart', dragStart);
portaAvioesEsq.addEventListener('dragstart', dragStart);
portaAvioesDir.addEventListener('dragstart', dragStart);
submarinoEsq.addEventListener('dragstart', dragStart);
submarinoDir.addEventListener('dragstart', dragStart);

navioTanqueEsq.addEventListener('dragend', dragEnd);
navioTanqueDir.addEventListener('dragend', dragEnd);
contraTorpedeiroEsq1.addEventListener('dragend', dragEnd);
contraTorpedeiroDir1.addEventListener('dragend', dragEnd);
contraTorpedeiroEsq2.addEventListener('dragend', dragEnd);
contraTorpedeiroDir2.addEventListener('dragend', dragEnd);
portaAvioesEsq.addEventListener('dragend', dragEnd);
portaAvioesDir.addEventListener('dragend', dragEnd);
submarinoEsq.addEventListener('dragend', dragEnd);
submarinoDir.addEventListener('dragend', dragEnd);

function dragStart() {
	setTimeout(() => (this.className += ' transparente'), 0);
	console.log("dragStart")
}

function dragEnd() {
	setTimeout(() => (this.classList.remove('transparente'), 0));
}