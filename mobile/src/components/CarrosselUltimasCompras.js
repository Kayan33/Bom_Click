
import React from 'react';
import { View, Text, Image, FlatList, StyleSheet } from 'react-native';
import { CORES, TAMANHOS, FONTES } from "../styles/styles";

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
        width: 150, 
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    produtoImagem: {
        width: '100%',
        height: 100,
        resizeMode: 'contain', 
        borderRadius: TAMANHOS.bordaRaio,
    },
    produtoTitulo: {
        fontFamily: FONTES.fonteMedium,
        height: 40,
        color: CORES.verde,
    },
    produtoValores: {
        height: 40,
        flexDirection: 'row',
        paddingTop: TAMANHOS.espacamentoPequeno,
        alignItems: 'center',
        gap: TAMANHOS.espacamentoPequeno

    },
    produtoPrecoOriginal: {
        fontFamily: FONTES.fonteBold,
        color: CORES.azul,
    },
    produtoPrecoDesconto: {
        fontFamily: FONTES.fonteBold,
        color: CORES.amarelo,
    },
});

export default CarrosselUltimasCompras;