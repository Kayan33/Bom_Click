import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const FONTE_BASE = 24;

export const CORES = {
    azul: '#054AAE',
    verde: '#2F7339',
    amarelo: '#FFC200',
    vermelho: '#D90D1E',
    branco: '#FFFFFF',
};

export const TAMANHOS = {
    // Fontes (convertendo rem para números)
    fonteTitulo: FONTE_BASE * 1.25,      // 20
    fonteSegundaria: FONTE_BASE * 1,       // 16
    fontePequena: FONTE_BASE * 0.5,        // 8

    // Espaçamentos
    espacamentoMaior: FONTE_BASE * 2,    // 32
    espacamentoMenor: FONTE_BASE * 1,      // 16
    espacamentoPequeno: FONTE_BASE * 0.5,      // 8

    // Bordas
    bordaRaio: FONTE_BASE * 0.5,         // 8

    // Ícones e Imagens
    tamanhoIcone: FONTE_BASE * 1.5,      // 24
    tamanhoIconeGrande: FONTE_BASE * 2.5,  // 40
    tamanhoFotoGrande: FONTE_BASE * 7.938, // ~127

    // Dimensões da tela
    width,
    height,
};

export const FONTES = {
    fontePrincipal: 'Poppins-Regular', 
    fonteMedium: 'Poppins-Medium',
    fonteBold: 'Poppins-Bold',

    // Você pode criar estilos de texto completos para reutilizar
    h1: { fontFamily: 'Poppins-Bold', fontSize: TAMANHOS.fonteTitulo, color: CORES.verde },
    body: { fontFamily: 'Poppins-Regular', fontSize: TAMANHOS.fonteSegundaria, color: CORES.azul },
};


export const globalStyles = {
    screenContainer: {
        flex: 1,
        backgroundColor: CORES.branco,
        padding: TAMANHOS.espacamentoMenor,
    },
    defaultText: {
        fontFamily: FONTES.fontePrincipal,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
    },
};