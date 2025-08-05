import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, ScrollView, ActivityIndicator } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { AutenticadoContexto } from '../Context/AuthContext';
import LogoBomClick from "../components/icones/BomClick";
import LogoCarinho from "../components/icones/Carinho";
import LogoPerfil from "../components/icones/Perfil";

import { ApiContext } from "../Context/ApiContext";

import { CORES, TAMANHOS, LOGOS } from "../styles/styles";

import CarrosselProdutos from "../components/CarrosselProdutos";
import CarrosselPromocoes from "../components/CarrosselPromocoes";
import BarraPesquisa from "../components/BarraPesquisa";

// MUDANÇA 1: Função auxiliar para corrigir a URL da imagem
const formatarUrlImagem = (url) => {
    // Se a URL existir e começar com "//", adiciona "https:" no início.
    if (url && url.startsWith('//')) {
        return `https:${url}`;
    }
    // Caso contrário, retorna a URL original.
    return url;
};


export default function Inicial() {
    const { autenticado, abrirModalLogin } = useContext(AutenticadoContexto);
    const { buscaPromocoes, buscaProdutos } = useContext(ApiContext);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    // --- Estados da Página ---
    const [termoBusca, setTermoBusca] = useState('');
    const [resultadoApi, setResultadoApi] = useState(null);
    const [loadingBusca, setLoadingBusca] = useState(false); 
    const [mercadoSelecionado, setMercadoSelecionado] = useState(null);
    const [produtosExibidos, setProdutosExibidos] = useState([]);
    const [loadingPromocoes, setLoadingPromocoes] = useState(true);
    const [dadosFormatados, setDadosFormatados] = useState([]);

    // --- Funções ---
    const executarBusca = async (nomeProduto) => {
        if (!nomeProduto) return;
        setLoadingBusca(true);
        setResultadoApi(null);
        setMercadoSelecionado(null);
        setProdutosExibidos([]);

        try {
            const resposta = await buscaProdutos(nomeProduto);
            setResultadoApi(resposta);
        } catch (error) {
            console.error("Erro ao buscar produtos:", error);
            setResultadoApi({});
        } finally {
            setLoadingBusca(false);
        }
    };

    function navegar() {
        if (autenticado) {
            navigation.navigate('Perfil');
        } else {
            abrirModalLogin();
        }
    }

    // --- Effects ---

    // Effect para promoções (sem alteração)
    useEffect(() => {
        const carregarEFormatarDados = async () => {
<<<<<<< HEAD
          const respostaApi = await promocoesDados();
            const listaDePromocoes = [];

            for (const nomeMercado in respostaApi) {
                const produtosDoMercado = respostaApi[nomeMercado];
                produtosDoMercado.forEach((produto, index) => {
                    
                    listaDePromocoes.push({
                        id: `${nomeMercado}-${index}`,
                        titulo: produto.title,
                        preco: produto.price,
                        imagem: { uri: produto.imageUrl },
                        logoMercado: LOGOS[nomeMercado],
                    });
                });
            }

            setDadosFormatados(listaDePromocoes);
            setLoading(false);  
=======
            try {
                const respostaApi = await buscaPromocoes();
                const listaDePromocoes = respostaApi.map((produto) => ({
                    id: produto.id,
                    titulo: produto.title,
                    preco: produto.price,
                    // MUDANÇA AQUI TAMBÉM (BOA PRÁTICA): Garante que as URLs de promoção também sejam corrigidas
                    imagem: { uri: formatarUrlImagem(produto.imageUrl) }, 
                    logoMercado: produto.mercado.logo,
                }));
                setDadosFormatados(listaDePromocoes);
            } catch (error) {
                console.error("Erro ao carregar promoções:", error);
            } finally {
                setLoadingPromocoes(false);
            }
>>>>>>> 4259d63ab8d3a2dfec4f8ce7bf0e491f19c976c0
        };
        carregarEFormatarDados();
    }, []);

    // Effect que define o mercado padrão (sem alteração)
    useEffect(() => {
        if (resultadoApi && Object.keys(resultadoApi).length > 0) {
            const primeiroMercado = Object.keys(resultadoApi)[0];
            setMercadoSelecionado(primeiroMercado);
        }
    }, [resultadoApi]);

    // MUDANÇA 2: Usar a função auxiliar ao formatar os produtos
    useEffect(() => {
        if (mercadoSelecionado && resultadoApi) {
            const dadosDoMercado = resultadoApi[mercadoSelecionado];
            let produtosFormatados = [];

            if (dadosDoMercado?.dadosEncontrados) {
                produtosFormatados.push({
                    id: `${mercadoSelecionado}-${dadosDoMercado.dadosEncontrados.id}-encontrado`,
                    nome: dadosDoMercado.dadosEncontrados.title,
                    preco: dadosDoMercado.dadosEncontrados.price,
                    imagem: { uri: formatarUrlImagem(dadosDoMercado.dadosEncontrados.imageUrl) }, // <-- CORREÇÃO APLICADA
                });
            }

            if (dadosDoMercado?.produtosSimilares?.length > 0) {
                const similaresFormatados = dadosDoMercado.produtosSimilares.map((prod, index) => ({
                    id: `${mercadoSelecionado}-${prod.id || index}-similar`,
                    nome: prod.title,
                    preco: prod.price,
                    imagem: { uri: formatarUrlImagem(prod.imageUrl) }, // <-- CORREÇÃO APLICADA
                }));
                produtosFormatados = [...produtosFormatados, ...similaresFormatados];
            }
            
            setProdutosExibidos(produtosFormatados);
        }
    }, [mercadoSelecionado, resultadoApi]);


    // --- Renderização (sem alterações na estrutura JSX) ---

    if (loadingPromocoes) {
        return <ActivityIndicator size="large" color={CORES.azul} style={{ flex: 1, justifyContent: 'center' }} />;
    }

    const mercadosComResultados = resultadoApi ? Object.keys(resultadoApi) : [];

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: CORES.branco }}>
            <View style={[styles.cabecalho, { paddingTop: insets.top }]}>
                <LogoBomClick />
                <LogoCarinho />
            </View>

            <ScrollView>
                <Text style={styles.tituloPrincipal}>Tudo o que você precisa para economizar em um só lugar!</Text>

                <TouchableOpacity style={styles.botaoPerfil} onPress={navegar}>
                    <LogoPerfil />
                    <Text style={styles.botaoPerfilTexto}>Veja suas economias e estatisticas!</Text>
                </TouchableOpacity>

                <View style={styles.promocoes}>
                    <Text style={styles.promocoesTitulo}>Promoções do dia!</Text>
                    <CarrosselPromocoes data={dadosFormatados} />
                </View>

                <View style={styles.containerBusca}>
                    <BarraPesquisa
                        valor={termoBusca}
                        onValorChange={setTermoBusca}
                        onBuscaSubmit={() => executarBusca(termoBusca)}
                    />

                    {loadingBusca && <ActivityIndicator size="large" color={CORES.azul} style={{ marginTop: 20 }} />}
                    
                    {!loadingBusca && mercadosComResultados.length > 0 && (
                        <View style={styles.mercados}>
                            {mercadosComResultados.map(nomeMercado => (
                                <TouchableOpacity 
                                    key={nomeMercado}
                                    style={[
                                        styles.mercadosBotao, 
                                        mercadoSelecionado === nomeMercado && styles.mercadosBotaoSelecionado
                                    ]}
                                    onPress={() => setMercadoSelecionado(nomeMercado)}
                                >
                                    <Image 
                                        source={LOGOS[nomeMercado]} 
                                        style={styles.mercadosImagem} 
                                        resizeMode="contain" 
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    {!loadingBusca && produtosExibidos.length > 0 && (
                        <View style={{marginTop: TAMANHOS.espacamentoMaior}}>
                            <CarrosselProdutos data={produtosExibidos} />
                        </View>
                    )}
                    
                    {!loadingBusca && resultadoApi && mercadosComResultados.length === 0 && (
                         <Text style={styles.semResultadosTexto}>Nenhum produto encontrado para "{termoBusca}"</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

// Estilos (sem alterações)
const styles = StyleSheet.create({
    mercadosBotao: {
        borderColor: CORES.amarelo,
        borderRadius: TAMANHOS.bordaRaio,
        borderWidth: 2,
        padding: TAMANHOS.espacamentoPequeno,
    },
    mercadosBotaoSelecionado: {
        borderColor: CORES.verde,
        backgroundColor: '#e8f5e9',
    },
    mercados: {
        alignItems: "center",
        flexDirection: 'row',
        justifyContent: "space-around",
        marginTop: TAMANHOS.espacamentoPequeno,
    },
    safeArea: { flex: 1 },
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
        paddingVertical: TAMANHOS.espacamentoMenor,
    },
    promocoesTitulo: {
        color: CORES.azul,
        fontSize: TAMANHOS.fonteSegundaria,
        fontWeight: "700",
        paddingHorizontal: TAMANHOS.espacamentoPequeno,
    },
    containerBusca: {
        paddingHorizontal: TAMANHOS.espacamentoPequeno
    },
    mercadosImagem: {
        height: TAMANHOS.tamanhoIconeGrande,
        width: TAMANHOS.tamanhoIconeGrande * 2,
    },
    semResultadosTexto: {
        textAlign: 'center',
        marginTop: 20,
        fontSize: TAMANHOS.fontePequena,
        color: 'grey',
    }
});