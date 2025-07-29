import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';

import { CORES, TAMANHOS } from '../styles/styles';

const { width } = Dimensions.get('window');
const NUM_COLUNAS = 2;
const ESPACO_HORIZONTAL = TAMANHOS.espacamentoMenor;
const ESPACO_ENTRE_ITENS = TAMANHOS.espacamentoPequeno;
const ITEM_LARGURA = (width - ESPACO_HORIZONTAL * 2 - ESPACO_ENTRE_ITENS * (NUM_COLUNAS - 1)) / NUM_COLUNAS;


const ProdutoCard = ({ item }) => (

    <View style={[styles.produtosCard, { width: ITEM_LARGURA }]}>

        <Image

            source={item.imagem}
            style={styles.produtosCardImagem}

        />

        <Text style={styles.produtosCardTexto}>{item.nome}</Text>

        <View style={styles.produtosCardInfo}>

            <Text style={styles.produtosCardPreco}>{item.preco}</Text>

            <TouchableOpacity style={[styles.produtosCardBotao, styles.comparar]}>

                <Text style={[styles.produtosCardBotaoTexto, styles.compararTexto]}>Comparar</Text>

            </TouchableOpacity>

        </View>

        <TouchableOpacity style={[styles.produtosCardBotao, styles.comprar]}>

            <Text style={styles.produtosCardBotaoTexto}>Adicionar</Text>

        </TouchableOpacity>

    </View>
);

const CarrosselProdutos = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const groupedData = [];
    for (let i = 0; i < data.length; i += NUM_COLUNAS) {
        groupedData.push(data.slice(i, i + NUM_COLUNAS));
    }

    const handleScroll = (event) => {

        const scrollPosition = event.nativeEvent.contentOffset.x;

        const index = Math.round(scrollPosition / width);
        setActiveIndex(index);
    };

    const renderPage = ({ item: pageItems }) => (

        <View style={styles.page}>

            {pageItems.map(product => (

                <ProdutoCard item={product} key={product.id} />

            ))}

        </View>
    );

    return (

        <View>

            <FlatList

                data={groupedData}
                keyExtractor={(_, index) => `page-${index}`}
                renderItem={renderPage}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
            />

            <View style={styles.paginationContainer}>

                {groupedData.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.dotAtivo : {}
                        ]}
                    />

                ))}

            </View>

        </View>
    );
};


const styles = StyleSheet.create({

    page: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        gap: TAMANHOS.espacamentoMenor,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        paddingBottom: TAMANHOS.espacamentoPequeno
    },

    produtosCard: {
        backgroundColor: CORES.branco,
        borderRadius: TAMANHOS.bordaRaio,
        padding: TAMANHOS.espacamentoPequeno,
        gap: TAMANHOS.espacamentoMenor,
        elevation: 3,
        shadowColor: '#000',
    },

    produtosCardImagem: {
        height: TAMANHOS.tamanhoFotoGrande,
        width: '100%',
        resizeMode: 'contain',
    },
    produtosCardTexto: {
        color: CORES.verde,
        fontWeight: "700",
    },
    produtosCardInfo: {
        alignItems: 'center',
        flexDirection: "row",
        justifyContent: 'space-between'
    },
    produtosCardPreco: {
        color: CORES.azul,
        fontWeight: "700",
    },
    produtosCardBotao: {
        borderRadius: TAMANHOS.bordaRaio,
        paddingVertical: 6,
        paddingHorizontal: 8,
    },
    produtosCardBotaoTexto: {
        color: CORES.branco,
        fontWeight: "700",
        fontSize: TAMANHOS.fontePequena,
        textAlign: 'center',
    },
    comparar: {

        backgroundColor: CORES.azul
    },

    compararTexto: {

        color: CORES.branco

    },

    comprar: {

        backgroundColor: CORES.verde

    },

    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: TAMANHOS.espacamentoMenor,
        marginBottom: TAMANHOS.espacamentoMaior,
    },
    dot: {
        width: TAMANHOS.tamanhoIconePequeno,
        height: TAMANHOS.tamanhoIconePequeno,
        borderRadius: TAMANHOS.bordaRaio,
        backgroundColor: CORES.azulEscuro,
        marginHorizontal: 4,
    },
    dotAtivo: {
        backgroundColor: CORES.azul,
        width: TAMANHOS.tamanhoIconePequeno + 4,
    },
});

export default CarrosselProdutos;