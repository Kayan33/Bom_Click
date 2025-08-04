// no seu arquivo components/CarrosselUltimasCompras.js

import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { CORES, TAMANHOS, FONTES } from "../styles/styles";

// Componente para renderizar um único card de produto
const CardProduto = ({ item }) => (
    <View style={styles.produtoCard}>
        <Image source={item.imagem} style={styles.produtoImagem} />
        <Text style={styles.produtoTitulo} numberOfLines={2}>{item.nome}</Text>
        <View style={styles.produtoValores}>
            <Text style={styles.produtoPrecoOriginal}>{item.precoOriginal}</Text>
            <Text style={styles.produtoPrecoDesconto}>{item.precoComDesconto}</Text>
        </View>
    </View>
);

// Componente principal do carrossel
const CarrosselUltimasCompras = ({ data }) => {
    return (
        <FlatList
            data={data}
            renderItem={({ item }) => <CardProduto item={item} />}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listaContainer}
        />
    );
};

const styles = StyleSheet.create({
    listaContainer: {
        paddingLeft: TAMANHOS.espacamentoMenor,
        paddingVertical: TAMANHOS.espacamentoPequeno,
    },
    produtoCard: {
        backgroundColor: CORES.branco,
        borderRadius: TAMANHOS.bordaRaio,
        padding: TAMANHOS.espacamentoPequeno,
        marginRight: TAMANHOS.espacamentoPequeno,
        width: 150, // Largura fixa para cada card
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    produtoImagem: {
        width: '100%',
        height: 100, // Altura da imagem
        resizeMode: 'contain', // 'contain' para ver a imagem toda
        borderRadius: TAMANHOS.bordaRaio,
    },
    produtoTitulo: {
        fontFamily: FONTES.fonteMedium,
        fontSize: 14,
        height: 40, // Altura fixa para o título ter 2 linhas
        color: CORES.verde,
    },
    produtoValores: {
        marginTop: 'auto', // Empurra os preços para o final do card
        paddingTop: 5,
    },
    produtoPrecoOriginal: {
        fontFamily: FONTES.fonteRegular,
        fontSize: 14,
        color: 'gray',
    },
    produtoPrecoDesconto: {
        fontFamily: FONTES.fonteBold,
        fontSize: 16,
        color: '#e67e22', // Um tom de laranja/dourado para o desconto
    },
});

export default CarrosselUltimasCompras;