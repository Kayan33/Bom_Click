import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CORES, TAMANHOS } from '../styles/styles';
import ModalSimilares from './ModalSimilares';

const parsePrice = (priceString) => {
    if (typeof priceString !== 'string' || !priceString) return Infinity;
    const numero = parseFloat(priceString.replace('R$', '').trim().replace(/\./g, '').replace(',', '.'));
    return isNaN(numero) ? Infinity : numero;
};

const formatarUrlImagem = (url) => {
    if (url && url.startsWith('//')) return `https:${url}`;
    return url;
};

const Comparativo = ({ dados, termoBusca, logos, onClose, onTrocarProduto }) => {
    const insets = useSafeAreaInsets();

    const [modalVisivel, setModalVisivel] = useState(false);
    const [produtosSimilaresSelecionados, setProdutosSimilaresSelecionados] = useState([]);
    const [mercadoParaEditar, setMercadoParaEditar] = useState(null);

    const mercadosOrdenados = dados ? Object.keys(dados).sort((a, b) => {
        const precoA = parsePrice(dados[a]?.dadosEncontrados?.price);
        const precoB = parsePrice(dados[b]?.dadosEncontrados?.price);
        return precoA - precoB;
    }) : [];

    const handleProdutoIncorretoClick = (nomeMercado) => {
        const similares = dados[nomeMercado]?.produtosSimilares || [];
        setProdutosSimilaresSelecionados(similares);
        setMercadoParaEditar(nomeMercado);
        setModalVisivel(true);
    };

    const handleSelecionarSimilar = (produtoSimilar) => {
        if (mercadoParaEditar) {
            onTrocarProduto(mercadoParaEditar, produtoSimilar);
        }
        setModalVisivel(false);
        setMercadoParaEditar(null);
    };


    return (
        <SafeAreaView style={[styles.safeArea, { paddingTop: insets.top }]}>
            <View style={styles.header}>
                <TouchableOpacity onPress={onClose} style={styles.backButton}>
                    <Text style={styles.backButtonText}>{"< Voltar"}</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.titleContainer}>
                <Text style={styles.title}>Comparativo:</Text>
                <Text style={styles.titleHighlight}>{termoBusca}</Text>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContainer}>
                {mercadosOrdenados.map(nomeMercado => {
                    const mercadoInfo = dados[nomeMercado]?.dadosEncontrados;
                    if (!mercadoInfo) return null;

                    return (
                        <View key={nomeMercado} style={styles.card}>
                            <Image source={logos[nomeMercado]} style={styles.logo} resizeMode="contain" />
                            <Image source={{ uri: formatarUrlImagem(mercadoInfo.imageUrl) }} style={styles.productImage} resizeMode="contain" />
                            <Text style={styles.productName} numberOfLines={2}>{mercadoInfo.title}</Text>
                            <Text style={styles.price}>{mercadoInfo.price}</Text>

                            <TouchableOpacity
                                style={styles.incorrectButton}
                                onPress={() => handleProdutoIncorretoClick(nomeMercado)}
                            >
                                <Text style={styles.incorrectButtonText}>Produto incorreto?</Text>
                            </TouchableOpacity>

                        </View>
                    );
                })}
            </ScrollView>

            <ModalSimilares
                visible={modalVisivel}
                onClose={() => setModalVisivel(false)}
                produtos={produtosSimilaresSelecionados}
                onProdutoSelect={handleSelecionarSimilar}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f4f6f8',
    },
    header: {
        marginHorizontal: TAMANHOS.espacamentoMenor,
        marginVertical: TAMANHOS.espacamentoMenor
    },
    backButtonText: {
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
        fontWeight: 'bold',
    },
    titleContainer: {
        alignItems: 'center',
        flexDirection: 'row',
        gap: TAMANHOS.espacamentoPequeno,
        margin: TAMANHOS.espacamentoMenor,
    },
    title: {
        fontSize: TAMANHOS.fonteTitulo,
        fontWeight: 'bold',
        color: CORES.azul,
    },
    titleHighlight: {
        fontSize: TAMANHOS.fonteSegundaria - 2,
        fontWeight: 'bold',
        color: CORES.verde,
    },
    scrollContainer: {
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        paddingTop: TAMANHOS.espacamentoPequeno,
        alignItems: 'flex-start',
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 15,
        marginRight: 15,
        width: 220,
        alignItems: 'center',
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
    },
    logo: {
        height: 40,
        width: '80%',
        marginBottom: 15,
    },
    productImage: {
        width: '100%',
        height: 150,
        marginBottom: 15,
    },
    productName: {
        fontSize: 16,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: 10,
        minHeight: 40,
    },
    price: {
        fontSize: 20,
        fontWeight: 'bold',
        color: CORES.azul,
        marginBottom: 15,
    },
    incorrectButton: {
        backgroundColor: '#fee2e2',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    incorrectButtonText: {
        color: '#ef4444',
        fontWeight: '600',
        fontSize: 12,
    },
    addButton: {
        backgroundColor: CORES.azul,
        borderRadius: 8,
        paddingVertical: 12,
        width: '100%',
        alignItems: 'center',
    },
    addButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});

export default Comparativo;