import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { AutenticadoContexto } from '../Context/authContext'
import LogoBomClick from "../components/icones/BomClick";
import LogoCarinho from "../components/icones/Carinho";
import LogoPerfil from "../components/icones/Perfil";

import CarrosselComPagerView from '../components/CarrosselPromocoes'

import { CORES, TAMANHOS } from "../styles/styles";
import CarrosselProdutos from "../components/CarrosselProdutos";
import CarrosselSessoes from "../components/CarrosselSessoes";

export default function Inicial() {

    const { autenticado, abrirModalLogin } = useContext(AutenticadoContexto);

    const insets = useSafeAreaInsets();

    const navigation = useNavigation();

    function navegar() {
        if (autenticado) {
            navigation.navigate('Perfil');
        } else {
            abrirModalLogin();
        }
    }

    const DADOS_EXEMPLO = [
        {
            id: '1',
            titulo: 'Fraldinha Bovina Resfriada KG',
            preco: 'R$40,00',
            imagem: require('../../assets/ImagensTemp/carneExemplo.png'),
        },
        {
            id: '2',
            titulo: 'Picanha Premium Peça KG',
            preco: 'R$79,90',
            imagem: require('../../assets/ImagensTemp/carneExemplo.png'),
        },
        {
            id: '3',
            titulo: 'Linguiça Toscana Sadia KG',
            preco: 'R$25,50',
            imagem: require('../../assets/ImagensTemp/carneExemplo.png'),
        },
    ];

    const DADOS_PRODUTOS = [
        { id: '1', nome: 'Limão Taiti KG', preco: 'R$2,00', imagem: require('../../assets/Limao.png') },
        { id: '2', nome: 'Batata Lavada KG', preco: 'R$4,50', imagem: require('../../assets/Limao.png') },
        { id: '3', nome: 'Cebola KG', preco: 'R$3,80', imagem: require('../../assets/Limao.png') },
        { id: '4', nome: 'Tomate KG', preco: 'R$5,99', imagem: require('../../assets/Limao.png') },
        { id: '5', nome: 'Tomate KG', preco: 'R$5,99', imagem: require('../../assets/Limao.png') },
    ];

    const CATEGORIAS = [
        { id: '1', label: "Padaria" },
        { id: '2', label: "Açougue" },
        { id: '3', label: "Frios" },
        { id: '4', label: "Hortifruti" },
        { id: '5', label: "Bebidas" },
        { id: '6', label: "Limpeza" },
        { id: '7', label: "Higiene" },
    ];

    return (
        <SafeAreaView style={{ flex: 1 }}>

            <View style={[styles.cabecalho, { paddingTop: insets.top }]}>

                <LogoBomClick />
                <LogoCarinho />

            </View>

            <ScrollView>

                <Text style={styles.tituloPrincipal}>Tudo o que você precisa para economizar em um só lugar!</Text>

                <TouchableOpacity style={styles.botaoPerfil}
                    onPress={navegar}
                >
                    <LogoPerfil />
                    <Text style={styles.botaoPerfilTexto}>Veja suas economias e estatisticas!</Text>

                </TouchableOpacity>

                <View style={styles.promocoes}>

                    <Text style={styles.promocoesTitulo}>Promoções do dia!</Text>

                    <CarrosselComPagerView data={DADOS_EXEMPLO} />

                </View>

                <View>

                    <View style={styles.mercados}>

                        <TouchableOpacity style={styles.mercadosBotao}>

                            <Image
                                source={require('../../assets/TausteGrande.png')}
                                style={styles.mercadosImagem}
                            >

                            </Image>

                        </TouchableOpacity>

                        <TouchableOpacity>

                            <Image
                                source={require('../../assets/TausteGrande.png')}
                                style={styles.mercadosImagem}
                            >

                            </Image>

                        </TouchableOpacity>

                        <TouchableOpacity>

                            <Image
                                source={require('../../assets/TausteGrande.png')}
                                style={styles.mercadosImagem}
                            >

                            </Image>

                        </TouchableOpacity>

                    </View>

                    {/* <View style={[styles.mercados, styles.mercadosSetores]}>

                        <TouchableOpacity>

                            <Text style={[styles.mercadosBotao, styles.mercadosSetoresTexto]}>Frios</Text>

                        </TouchableOpacity>

                        <TouchableOpacity>

                            <Text style={styles.mercadosSetoresTexto}>Açougue</Text>

                        </TouchableOpacity>

                        <TouchableOpacity>

                            <Text style={styles.mercadosSetoresTexto}>Hortifrut</Text>

                        </TouchableOpacity>

                        <TouchableOpacity>

                            <Text style={styles.mercadosSetoresTexto}>Higiene</Text>

                        </TouchableOpacity>


                    </View> */}

                    <CarrosselSessoes data={CATEGORIAS} />

                    {/* <View style={styles.produtos}>

                        <View style={styles.produtosCard}>

                            <Image
                                source={require('../../assets/Limao.png')}
                                style={styles.produtosCardImagem}
                            >

                            </Image>

                            <Text style={styles.produtosCardTexto}>Limão Taiti KG</Text>

                            <View style={styles.produtosCardInfo}>

                                <Text style={styles.produtosCardPreco}>R$2,00</Text>

                                <TouchableOpacity style={[styles.produtosCardBotao, styles.comparar]}>

                                    <Text style={[styles.produtosCardTexto, styles.comparar]}>Comparar preços</Text>

                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity style={[styles.produtosCardBotao, styles.comprar]}>

                                <Text style={[styles.produtosCardBotao, styles.comprar]}>Adicionar a compra</Text>

                            </TouchableOpacity>
                        </View>

                        <View style={styles.produtosCard}>

                            <Image
                                source={require('../../assets/ImagensTemp/batata.png')}
                                style={styles.produtosCardImagem}
                            >

                            </Image>

                            <Text style={styles.produtosCardTexto}>Limão Taiti KG</Text>

                            <View style={styles.produtosCardInfo}>

                                <Text style={styles.produtosCardPreco}>R$2,00</Text>

                                <TouchableOpacity style={[styles.produtosCardBotao, styles.comparar]}>

                                    <Text style={[styles.produtosCardTexto, styles.comparar]}>Comparar preços</Text>

                                </TouchableOpacity>

                            </View>

                            <TouchableOpacity style={[styles.produtosCardBotao, styles.comprar]}>

                                <Text style={[styles.produtosCardBotao, styles.comprar]}>Adicionar a compra</Text>

                            </TouchableOpacity>
                        </View>


                    </View> */}

                    <CarrosselProdutos data={DADOS_PRODUTOS} />

                </View>



            </ScrollView>
        </SafeAreaView >
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
    },

    cabecalho: {

        alignItems: "center",
        backgroundColor: CORES.azul,
        flexDirection: 'row',
        height: 90,
        justifyContent: 'space-between',
        paddingHorizontal: TAMANHOS.espacamentoPequeno,
        paddingBottom: TAMANHOS.espacamentoMenor
    },

    tituloPrincipal: {

        color: CORES.azul,
        fontSize: TAMANHOS.fonteTitulo,
        fontWeight: "700",
        textAlign: "center",
        marginHorizontal: TAMANHOS.espacamentoMenor,
        marginVertical: TAMANHOS.espacamentoMaior
    },

    botaoPerfil: {

        alignItems: "center",
        backgroundColor: CORES.azul,
        borderRadius: TAMANHOS.bordaRaio,
        flexDirection: 'row',
        marginHorizontal: TAMANHOS.espacamentoMaior,
        padding: TAMANHOS.espacamentoPequeno

    },

    botaoPerfilTexto: {

        color: CORES.amarelo,
        fontSize: TAMANHOS.fonteSegundaria,
        fontWeight: "600",
        marginHorizontal: "auto"
    },

    promocoes: {

        backgroundColor: CORES.amarelo,
        marginVertical: TAMANHOS.espacamentoMaior,
        padding: TAMANHOS.espacamentoMenor,
    },

    promocoesTitulo: {

        color: CORES.azul,
        fontSize: TAMANHOS.fonteSegundaria,
        fontWeight: "700",

    },

    mercados: {

        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "space-around",

    },

    mercadosBotao: {

        borderColor: CORES.amarelo,
        borderRadius: TAMANHOS.bordaRaio,
        borderWidth: 2,
        padding: TAMANHOS.espacamentoPequeno,


    },

    mercadosImagem: {

        height: TAMANHOS.tamanhoIconeGrande
    },

    mercadosSetores: {

        marginVertical: TAMANHOS.espacamentoMaior
    },

    mercadosSetoresTexto: {

        color: CORES.verde,
        fontWeight: "700"
    },

    produtos: {

        flexDirection: 'row',
        justifyContent: "space-around",
        marginHorizontal: TAMANHOS.espacamentoMenor
    },

    produtosCard: {

        gap: TAMANHOS.espacamentoMenor,
        marginVertical: TAMANHOS.espacamentoMaior,
        width: TAMANHOS.tamanhoCard
    },

    produtosCardImagem: {

        height: TAMANHOS.tamanhoFotoGrande,
        width: "auto"

    },

    produtosCardTexto: {

        color: CORES.verde,
        fontWeight: "700"

    },

    produtosCardInfo: {

        alignItems: 'center',
        flexDirection: "row",
        gap: TAMANHOS.espacamentoMenor

    },

    produtosCardPreco: {

        color: CORES.azul,
        fontWeight: "700",

    },

    produtosCardBotao: {

        borderRadius: TAMANHOS.bordaRaio,
        color: CORES.branco,
        padding: TAMANHOS.espacamentoPequeno,

    },

    comparar: {

        backgroundColor: CORES.azul,
        color: CORES.branco,
        fontSize: TAMANHOS.fontePequena,
        textAlign: 'center'
    },

    comprar: {

        backgroundColor: CORES.verde,
        color: CORES.branco,
        fontWeight: "700",
        fontSize: TAMANHOS.fontePequena,
        textAlign: 'center'
    }


})