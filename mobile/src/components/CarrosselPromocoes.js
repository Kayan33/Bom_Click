import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

import PagerView from 'react-native-pager-view';

import { CORES, TAMANHOS } from '../styles/styles';

const CarrosselComPagerView = ({ data }) => {
    const [activeIndex, setActiveIndex] = useState(0);

    const handlePageChange = (event) => {

        setActiveIndex(event.nativeEvent.position);
    };

    return (
        <View>
            <PagerView
                style={styles.pagerView}
                initialPage={0}
                onPageSelected={handlePageChange}
            >

                {data.map(item => (
                    <View style={styles.page} key={item.id}>

                        <View style={styles.promocoesCarossel}>

                            <Image
                                source={item.imagem}
                                style={styles.promocoesCarosselImagem}
                            />

                            <View style={styles.promocoesCarosselItem}>

                                <Text style={styles.promocoesCarosselItemTitulo}>{item.titulo}</Text>

                                <View style={styles.promocoesCarosselItemInformacoes}>

                                    <View style={styles.promocoesCarosselItemInformacoesContainer}>

                                        <Text style={styles.promocoesCarosselItemInformacoesContainerPreco}>{item.preco}</Text>

                                        <Image
                                            source={require('../../assets/ImagensTemp/images 3.png')}
                                            style={styles.promocoesCarosselItemInformacoesContainerImagem}
                                        />

                                    </View>

                                    <TouchableOpacity style={styles.promocoesCarosselItemInformacoesBotao}>

                                        <Text style={styles.promocoesCarosselItemInformacoesBotaoTexto}>Adicionar a compra</Text>

                                    </TouchableOpacity>

                                </View>

                            </View>

                        </View>

                    </View>
                ))}
            </PagerView>

            <View style={styles.paginationContainer}>
                {data.map((_, index) => (
                    <View
                        key={index}
                        style={[
                            styles.dot,
                            activeIndex === index ? styles.dotAtivo : {},
                        ]}
                    />
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({

    pagerView: {
        height: 180,
    },
    page: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    promocoesCarossel: {
        width: '100%',
        backgroundColor: CORES.branco,
        borderRadius: TAMANHOS.bordaRaio,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: 'center',
        padding: TAMANHOS.espacamentoPequeno,
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    promocoesCarosselImagem: {
        height: TAMANHOS.tamanhoFotoGrande,
        width: TAMANHOS.tamanhoFotoGrande,
        resizeMode: 'contain',
    },
    promocoesCarosselItem: {
        flex: 1,
        marginLeft: 15,
        justifyContent: "space-around",
        height: '100%',
    },
    promocoesCarosselItemTitulo: {
        color: CORES.verde,
        fontSize: TAMANHOS.fonteSegundaria,
        fontWeight: "700",
        flexShrink: 1,
    },
    promocoesCarosselItemInformacoes: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: 'flex-end',
        marginTop: 10,
    },
    promocoesCarosselItemInformacoesContainer: {
        gap: 16,
    },
    promocoesCarosselItemInformacoesContainerPreco: {
        color: CORES.azul,
        fontSize: TAMANHOS.fonteSegundaria,
        fontWeight: "700",
    },
    promocoesCarosselItemInformacoesContainerImagem: {
        height: TAMANHOS.tamanhoIconePequeno,
        width: 53,
    },
    promocoesCarosselItemInformacoesBotao: {
        justifyContent: "center",
        backgroundColor: CORES.azul,
        borderRadius: TAMANHOS.bordaRaio,
        paddingHorizontal: TAMANHOS.espacamentoPequeno,
        paddingVertical: 8,
    },
    promocoesCarosselItemInformacoesBotaoTexto: {
        color: CORES.amarelo,
        fontWeight: "700",
    },

    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: CORES.azulEscuro,
        marginHorizontal: 4,
    },
    dotAtivo: {
        backgroundColor: CORES.azul,
    },
});

export default CarrosselComPagerView;