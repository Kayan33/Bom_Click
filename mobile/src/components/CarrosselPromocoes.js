import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import PagerView from 'react-native-pager-view';
import { CORES, TAMANHOS, LOGOS } from '../styles/styles';

const getLogoMercadoLocal = (item) => {
    if (!item?.logoMercado) return null;
    const url = item.logoMercado.toLowerCase();

    if (url.includes('confianca')) return LOGOS.Confianca;
    if (url.includes('tauste')) return LOGOS.Tauste;
    if (url.includes('paodeacucar') || url.includes('gpa.digital')) return LOGOS.PaoDeAcucar;
    return null;
};

const CarrosselPromocoes = ({ data, onCompararPress }) => {
    if (!data || data.length === 0) {
        return (
            <View style={{ height: 180, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Nenhuma promoção encontrada.</Text>
            </View>
        );
    }

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
                key={data.length} 
            >
                {data.map(item => {
                    const logoLocal = getLogoMercadoLocal(item);

                    return (
                        <View style={styles.page} key={`promo-${item.id}`}>
                            <View style={styles.promocoesCarossel}>
                                <Image
                                    source={item.imagem}
                                    style={styles.promocoesCarosselImagem}
                                />
                                <View style={styles.promocoesCarosselItem}>
                                    <Text style={styles.promocoesCarosselItemTitulo} numberOfLines={3}>{item.titulo}</Text>
                                    <View style={styles.promocoesCarosselItemInformacoes}>
                                        <View style={styles.promocoesCarosselItemInformacoesContainer}>
                                            <Text style={styles.promocoesCarosselItemInformacoesContainerPreco}>{item.preco}</Text>
                                            {logoLocal && (
                                                <Image
                                                    source={logoLocal}
                                                    style={styles.promocoesCarosselItemInformacoesContainerImagem}
                                                />
                                            )}
                                        </View>
                                        <TouchableOpacity
                                            style={styles.promocoesCarosselItemInformacoesBotao}
                                            onPress={() => onCompararPress(item.titulo)}
                                        >
                                            <Text style={styles.promocoesCarosselItemInformacoesBotaoTexto}>Comparar preços</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </PagerView>

            <View style={styles.paginationContainer}>
                {data.map((_, index) => (
                    <View
                        key={`dot-${index}`}
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
        paddingHorizontal: 15,
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
        height: 16,
        width: 65,
        resizeMode: 'contain',
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
        fontSize: 12,
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

export default CarrosselPromocoes;