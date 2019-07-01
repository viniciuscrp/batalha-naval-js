//#region Variáveis
let contaAcertos;
let jogoIniciado = false;
let matriz = [];
let embarcacao;
let elemID;
let arrID = [];
let celulaPreenchida;
let acertosJogadorEsquerda = 0;
let acertosJogadorDireita = 0;
let jogadorEsquerdaPronto = false;
let jogadorDireitaPronto = false;
let turnoJogadorEsquerda = false;
let turnoJogadorDireita = false;
const linhas = 10;
const colunas = 10;
const areaQuadrado = 50;
const navioTanque = 5;
const portaAvioes = 4;
const contraTorpedeiro = 3;
const submarino = 2;
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
const tabuleiro = document.getElementById('tabuleiro');
const tabuleiro2 = document.getElementById('tabuleiro2');
const textoAjuda = document.getElementById('texto-ajuda');
//#endregion

//#region Construção dos tabuleiros
for (i = 0; i < colunas; i++) {
	for (j = 0; j < linhas; j++) {
		let quadrado = document.createElement('div');
		tabuleiro.appendChild(quadrado);
		if (j === 0) {
			quadrado.id = 'tab-esq-' + i;	
		} else {
			quadrado.id = 'tab-esq-' + j + i;	
		}			
		let posicaoTopo = j * areaQuadrado;
		let posicaoEsquerda = i * areaQuadrado;	
		quadrado.style.top = posicaoTopo + 'px';
		quadrado.style.left = posicaoEsquerda + 'px';	
		quadrado.className = 'celula vazia';	
		quadrado.draggable = false;
		quadrado.addEventListener('click', dispararTorpedo);					
	}
}

for (i = 0; i < colunas; i++) {
	for (j = 0; j < linhas; j++) {
		let quadrado = document.createElement('div');
		tabuleiro2.appendChild(quadrado);
		if (j === 0) {
			quadrado.id = 'tab-dir-' + i;	
		} else {
			quadrado.id = 'tab-dir-' + j + i;	
		}	
		let posicaoTopo = j * areaQuadrado;
		let posicaoEsquerda = i * areaQuadrado;			
		quadrado.style.top = posicaoTopo + 'px';
		quadrado.style.left = posicaoEsquerda + 'px';
		quadrado.className = 'celula vazia'	;
		quadrado.draggable = false;	
		quadrado.addEventListener('click', dispararTorpedo);	
	}
}
//#endregion

//#region Construção das embarcações
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
//#endregion

//#region Atribui os eventos às células
const celulas = document.querySelectorAll('.celula');
for (const celula of celulas) {
	celula.addEventListener('dragover', dragOver);
	celula.addEventListener('dragenter', dragEnter);
	celula.addEventListener('dragleave', dragLeave);
	celula.addEventListener('drop', dragDrop);
	celula.addEventListener('click', dispararTorpedo);
}
//#endregion

//#region Atribui os eventos as embarcações
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
//#endregion

//#region Auditores dos eventos
function dragStart() {
	this.className += ' segurar';
	setTimeout(() => (this.className += ' transparente'), 0);
	embarcacao = this;
}

function dragEnd() {
	setTimeout(() => (this.classList.remove('segurar'), 0));
}

function dragOver(e) {
	e.preventDefault();
}

function dragEnter(e) {
	if (embarcacao === undefined) return;
	celulaPreenchida = this;
	e.preventDefault();
	this.className += ' sobreposto';
	elemID = this.id;
	arrID = elemID.split('-');
	switch (embarcacao.id) {
		case 'navioTanqueEsq':
			if (arrID[2] > 59) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'dir') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), navioTanque), 0));
			}
			break;

		case 'navioTanqueDir':
			if (arrID[2] > 59) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'esq') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), navioTanque), 0));
			}
			break;
	
		case 'portaAvioesEsq':
			if (arrID[2] > 69) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'dir') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), portaAvioes), 0));
			}
			break;
	
		case 'portaAvioesDir':
			if (arrID[2] > 69) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'esq') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), portaAvioes), 0));
			}
			break;

		case 'contraTorpedeiroEsq1':
			if (arrID[2] > 79) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'dir') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), contraTorpedeiro), 0));
			}
			break;

		case 'contraTorpedeiroEsq2':
			if (arrID[2] > 79) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'dir') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), contraTorpedeiro), 0));
			}
			break;

		case 'contraTorpedeiroDir1':
			if (arrID[2] > 79) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'esq') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), contraTorpedeiro), 0));
			}
			break;

		case 'contraTorpedeiroDir2':
			if (arrID[2] > 79) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'esq') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), contraTorpedeiro), 0));
			}
			break;

		case 'submarinoEsq':
			if (arrID[2] > 89) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'dir') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), submarino), 0));
			}
			break;

		case 'submarinoDir':
			if (arrID[2] > 89) {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else if (arrID[1] == 'esq') {
				this.classList.remove('sobreposto');
				this.className += ' celula-invalida';
			} else {
				setTimeout(() => (marcarSobreposto(parseInt(arrID[2]), submarino), 0));
			}
			break;

		default:
			break;
	}
}

function dragLeave(e) {
	e.preventDefault();
	if (embarcacao === undefined) return;
	let celulaAnterior = e.srcElement;
	if (celulaAnterior.classList.contains('celula-invalida')) {
		celulaAnterior.classList.remove('celula-invalida');
	}
	let celulaAnteriorArrayID = celulaAnterior.id.split('-');
	if (embarcacao.classList.contains('navio-tanque')) {
		removerSobreposto(parseInt(celulaAnteriorArrayID[2]), celulaAnteriorArrayID[1], navioTanque);
	} else if (embarcacao.classList.contains('porta-avioes')) {
		removerSobreposto(parseInt(celulaAnteriorArrayID[2]), celulaAnteriorArrayID[1], portaAvioes);
	} else if (embarcacao.classList.contains('contratorpedeiro')) {
		removerSobreposto(parseInt(celulaAnteriorArrayID[2]), celulaAnteriorArrayID[1], contraTorpedeiro);
	} else {
		removerSobreposto(parseInt(celulaAnteriorArrayID[2]), celulaAnteriorArrayID[1], submarino);
	}
}

function dragDrop(e) {
	let valor;
	e.preventDefault();
	if (e.target.classList.contains('preenchida')) return;
	if (embarcacao === undefined) return;
	this.classList.remove('sobreposto');
	if (this.classList.contains('celula-invalida')) {
		this.classList.remove('celula-invalida');
	}
	switch (embarcacao.id) {
		case 'navioTanqueEsq':
			if (arrID[2] > 59) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'dir') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, navioTanque)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * navioTanque; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-esq-${i}`);
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.className += ' preenchida';
						embarcacao.className += ' transparente'
					}
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], navioTanque);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'navioTanqueDir':
			if (arrID[2] > 59) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'esq') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, navioTanque)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * navioTanque; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-dir-${i}`);
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.className += ' preenchida';
						embarcacao.className += ' transparente'
					}
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], navioTanque);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'portaAvioesEsq':
			if (arrID[2] > 69) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'dir') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, portaAvioes)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * portaAvioes; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-esq-${i}`);
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.className += ' preenchida';
						embarcacao.className += ' transparente'
					}
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], portaAvioes);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'portaAvioesDir':
			if (arrID[2] > 69) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'esq') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, portaAvioes)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * portaAvioes; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-dir-${i}`);
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.className += ' preenchida';
						embarcacao.className += ' transparente';
					}
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], portaAvioes);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'contraTorpedeiroEsq1':
			if (arrID[2] > 79) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'dir') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, contraTorpedeiro)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * contraTorpedeiro; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-esq-${i}`);
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.className += ' preenchida';
						embarcacao.className += ' transparente';
					}
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], contraTorpedeiro);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'contraTorpedeiroEsq2':
			if (arrID[2] > 79) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'dir') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, contraTorpedeiro)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * contraTorpedeiro; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-esq-${i}`);
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.className += ' preenchida';
						embarcacao.className += ' transparente';
					}
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], contraTorpedeiro);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'contraTorpedeiroDir1':
			if (arrID[2] > 79) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'esq') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, contraTorpedeiro)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * contraTorpedeiro; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-dir-${i}`);
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.className += ' preenchida';
						embarcacao.className += ' transparente';
					}
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], contraTorpedeiro);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'contraTorpedeiroDir2':
			if (arrID[2] > 79) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'esq') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, contraTorpedeiro)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * contraTorpedeiro; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-dir-${i}`);
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.className += ' preenchida';
					}
					embarcacao.className += ' transparente'
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], contraTorpedeiro);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'submarinoEsq':
			if (arrID[2] > 89) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'dir') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, submarino)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * submarino; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-esq-${i}`);
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.className += ' preenchida';
					}
					embarcacao.className += ' transparente'
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], submarino);
					embarcacao.classList.remove('transparente');
				}
			}
			break;

		case 'submarinoDir':
			if (arrID[2] > 79) {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else if (arrID[1] == 'esq') {
				this.classList.remove('celula-invalida');
				embarcacao.classList.remove('transparente');
			} else {
				if (podePosicionar(e.target, submarino)) {
					let i = arrID[2];
					valor = i === undefined ? 0 : parseInt(arrID[2]);
					for (i = valor; i < valor +  10 * submarino; i = i + 10) {
						celulaPreenchida = document.getElementById(`tab-dir-${i}`);
						celulaPreenchida.classList.remove('sobreposto');
						celulaPreenchida.classList.remove('vazia');
						celulaPreenchida.className += ' preenchida';
					}
					embarcacao.className += ' transparente'
				} else {
					let celulaID = e.target.id;
					let celulaArrayID = celulaID.split('-');
					removerSobreposto(parseInt(celulaArrayID[2]), celulaArrayID[1], submarino);
					embarcacao.classList.remove('transparente');
				}
			}
			break;
			
		default:
			break;
	}
	if (embarcacoesEsqPosicionadas()) {
		frotaEsquerda.style.display = 'none';
	}
	if (embarcacoesDirPosicionadas()) {
		frotaDireita.style.display = 'none';
	}
	embarcacao = undefined;
}
//#endregion

function marcarSobreposto(celulaInicial, tamanhoEmbarcacao) {
	let celula;
	for (i = celulaInicial; i < celulaInicial + tamanhoEmbarcacao * 10; i += 10) {
		celula = document.getElementById(`tab-${arrID[1]}-${i}`);
		celula.className += ' sobreposto'
	}
}

function removerSobreposto(celulaInicial, tabuleiro, tamanhoEmbarcacao) {
	let celula;
	for (i = celulaInicial; i < celulaInicial + tamanhoEmbarcacao * 10; i += 10) {
		if (i > 99) {
			break;
		}
		celula = document.getElementById(`tab-${tabuleiro}-${i}`);
		celula.classList.remove('sobreposto');
	}
}

function embarcacoesEsqPosicionadas() {
	return document.querySelectorAll('#tabuleiro .preenchida').length === 17 ? true : false;
}

function embarcacoesDirPosicionadas() {
	return document.querySelectorAll('#tabuleiro2 .preenchida').length === 17 ? true : false;
}

function podePosicionar(celulaInicial, tamanhoEmbarcacao) {
	let celulaInicialID = celulaInicial.id;
	let celulaInicialArrayID = celulaInicialID.split('-');
	for (i = parseInt(celulaInicialArrayID[2]); i < parseInt(celulaInicialArrayID[2]) + tamanhoEmbarcacao * 10; i += 10) {
		let celula = document.getElementById(`${celulaInicialArrayID[0]}-${celulaInicialArrayID[1]}-${i}`);
		if (celula.classList.contains('preenchida')) {
			return false;
		}
	}
	return true;
}

function esconderEmbarcacoes(direita, botao) {
	if (!direita) {
		if (embarcacoesEsqPosicionadas()) {
			let celulas = tabuleiro.getElementsByClassName('preenchida');
			for (const celula of celulas) {
				celula.style.backgroundColor = '#0077be';
			}
			jogadorEsquerdaPronto = true;
			botao.disabled = true;
		} else {
			alert('É necessário posicionar todas as embarcações da esquerda');
		}
	} else {
		if (embarcacoesDirPosicionadas()) {
			let celulas = tabuleiro2.getElementsByClassName('preenchida');
			for (const celula of celulas) {
				celula.style.backgroundColor = '#0077be';
			}
			jogadorDireitaPronto = true;
			botao.disabled = true;
		} else {
			alert('É necessário posicionar todas as embarcações da direita');
		}
	}
	if (jogadorEsquerdaPronto && jogadorDireitaPronto) {
		let botao = document.getElementById('botao-iniciar-jogo');
		botao.disabled = false;
	}
}

function iniciarJogo() {
	jogoIniciado = true;
	turnoJogadorEsquerda = true;
	textoAjuda.textContent = 'Jogador da esquerda pode disparar um torpedo!';
}

function dispararTorpedo(e) {
	if (!jogoIniciado) {
		alert('Jogo ainda não foi iniciado!');
	} else {
		if (turnoJogadorEsquerda) {
			let celulaAtingida = e.target;
			let celulaAtingidaArrID = celulaAtingida.id.split('-');
			if (celulaAtingidaArrID[1] == 'esq') {
				alert('Disparo inválido. Dispare novamente');
			}
			else if (celulaAtingida.classList.contains('atingiu-agua') || celulaAtingida.classList.contains('atingiu-embarcacao')) {
				alert('Torpedo já foi disparado nesta célula. Dispare novamente');
			}
			else if (celulaAtingida.classList.contains('vazia')) {
				celulaAtingida.className += ' atingiu-agua';
				turnoJogadorEsquerda = false;
				turnoJogadorDireita = true;
				textoAjuda.textContent = 'Turno do jogador da direita';
			} else {
				celulaAtingida.className += ' atingiu-embarcacao';
				turnoJogadorEsquerda = true;
				turnoJogadorDireita = false;
				acertosJogadorEsquerda += 1;
				if (acertosJogadorEsquerda === 17) {
					let reiniciar = confirm('Jogador da esquerda venceu. Jogar novamente?');
					if (reiniciar) {
						window.location.reload();
					} else {
						window.close();
					}
				}
				textoAjuda.textContent = 'Jogador da esquerda pode disparar novamente';
			}
		} else {
			let celulaAtingida = e.target;
			let celulaAtingidaArrID = celulaAtingida.id.split('-');
			if (celulaAtingidaArrID[1] == 'dir') {
				alert('Disparo inválido. Dispare novamente');
			}
			else if (celulaAtingida.classList.contains('atingiu-agua') || celulaAtingida.classList.contains('atingiu-embarcacao')) {
				alert('Torpedo já foi disparado nesta célula. Dispare novamente');
			}
			else if (celulaAtingida.classList.contains('vazia')) {
				celulaAtingida.className += ' atingiu-agua';
				turnoJogadorEsquerda = true;
				turnoJogadorDireita = false;
				textoAjuda.textContent = 'Turno do jogador da esquerda';
			} else {
				celulaAtingida.className += ' atingiu-embarcacao';
				turnoJogadorEsquerda = false;
				turnoJogadorDireita = true;
				acertosJogadorDireita += 1;
				if (acertosJogadorDireita === 17) {
					let reiniciar = confirm('Jogador da direita venceu. Jogar novamente?');
					if (reiniciar) {
						window.location.reload();
					} else {
						window.close();
					}
				}
				textoAjuda.textContent = 'Jogador da direita pode disparar novamente';
			}
		}
	}
}