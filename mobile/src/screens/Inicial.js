import React, { useContext, useEffect, useState, useMemo } from "react";
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
import Comparativo from '../components/Comparativo';

const parsePrice = (priceString) => {
    if (typeof priceString !== 'string' || !priceString) {
        return Infinity;
    }
    const numero = parseFloat(
        priceString.replace('R$', '').trim().replace(/\./g, '').replace(',', '.')
    );
    return isNaN(numero) ? Infinity : numero;
};

const formatarUrlImagem = (url) => {
    if (url && url.startsWith('//')) {
        return `https:${url}`;
    }
    return url;
};

export default function Inicial() {
    const { autenticado, abrirModalLogin } = useContext(AutenticadoContexto);
    const { buscaPromocoes, buscaProdutos } = useContext(ApiContext);
    const insets = useSafeAreaInsets();
    const navigation = useNavigation();

    const [exibirComparativo, setExibirComparativo] = useState(false);
    const [termoBusca, setTermoBusca] = useState('');
    const [resultadoApi, setResultadoApi] = useState(null);
    const [loadingBusca, setLoadingBusca] = useState(false);
    const [mercadoSelecionado, setMercadoSelecionado] = useState(null);
    const [produtosExibidos, setProdutosExibidos] = useState([]);
    const [loadingPromocoes, setLoadingPromocoes] = useState(true);
    const [dadosFormatados, setDadosFormatados] = useState([]);

    const executarBusca = async (nomeProduto) => {
        if (!nomeProduto) return;
        setTermoBusca(nomeProduto);
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

    const handleCompararPress = async (nomeProduto) => {
        await executarBusca(nomeProduto);
        setExibirComparativo(true);
    };

    const handleTrocarProdutoPrincipal = (nomeMercado, novoProduto) => {
        setResultadoApi(prevResultado => {
            if (!prevResultado || !prevResultado[nomeMercado]) {
                return prevResultado;
            }
            const novoResultado = { ...prevResultado };
            novoResultado[nomeMercado] = {
                ...novoResultado[nomeMercado],
                dadosEncontrados: {
                    id: novoProduto.id,
                    title: novoProduto.title,
                    price: novoProduto.price,
                    imageUrl: novoProduto.imageUrl,
                }
            };
            return novoResultado;
        });
    };

    function navegar() {
        if (autenticado) {
            navigation.navigate('Perfil');
        } else {
            abrirModalLogin();
        }
    }

    const mercadosOrdenados = useMemo(() => {
        if (!resultadoApi) return [];

        return Object.keys(resultadoApi).sort((a, b) => {
            const precoA = parsePrice(resultadoApi[a]?.dadosEncontrados?.price);
            const precoB = parsePrice(resultadoApi[b]?.dadosEncontrados?.price);
            return precoA - precoB;
        });
    }, [resultadoApi]);

    useEffect(() => {
        const carregarEFormatarDados = async () => {
            try {
                const respostaApi = await buscaPromocoes();
                const listaDePromocoes = respostaApi.map((produto) => ({
                    id: produto.id,
                    titulo: produto.title,
                    preco: produto.price,
                    imagem: { uri: formatarUrlImagem(produto.imageUrl) },
                    logoMercado: produto.mercado.logo,
                }));
                setDadosFormatados(listaDePromocoes);
            } catch (error) {
                console.error("Erro ao carregar promoções:", error);
            } finally {
                setLoadingPromocoes(false);
            }
        };
        carregarEFormatarDados();
    }, []);

    useEffect(() => {
        if (mercadosOrdenados.length > 0) {
            setMercadoSelecionado(mercadosOrdenados[0]);
        } else {
            setMercadoSelecionado(null);
        }
    }, [mercadosOrdenados]);

    useEffect(() => {
        if (mercadoSelecionado && resultadoApi) {
            const dadosDoMercado = resultadoApi[mercadoSelecionado];
            let produtosFormatados = [];
            if (dadosDoMercado?.dadosEncontrados) {
                produtosFormatados.push({
                    id: `${mercadoSelecionado}-${dadosDoMercado.dadosEncontrados.id}-encontrado`,
                    nome: dadosDoMercado.dadosEncontrados.title,
                    preco: dadosDoMercado.dadosEncontrados.price,
                    imagem: { uri: formatarUrlImagem(dadosDoMercado.dadosEncontrados.imageUrl) },
                });
            }
            if (dadosDoMercado?.produtosSimilares?.length > 0) {
                const similaresFormatados = dadosDoMercado.produtosSimilares.map((prod, index) => ({
                    id: `${mercadoSelecionado}-${prod.id || index}-similar`,
                    nome: prod.title,
                    preco: prod.price,
                    imagem: { uri: formatarUrlImagem(prod.imageUrl) },
                }));
                produtosFormatados = [...produtosFormatados, ...similaresFormatados];
            }
            produtosFormatados.sort((a, b) => parsePrice(a.preco) - parsePrice(b.preco));
            setProdutosExibidos(produtosFormatados);
        } else {
            setProdutosExibidos([]);
        }
    }, [mercadoSelecionado, resultadoApi]);

    if (exibirComparativo) {
        return (
            <Comparativo
                dados={resultadoApi}
                termoBusca={termoBusca}
                logos={LOGOS}
                onClose={() => setExibirComparativo(false)}
                onTrocarProduto={handleTrocarProdutoPrincipal}
            />
        );
    }

    if (loadingPromocoes) {
        return <ActivityIndicator size="large" color={CORES.azul} style={{ flex: 1, justifyContent: 'center' }} />;
    }

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
                    <CarrosselPromocoes
                        data={dadosFormatados}
                        onCompararPress={handleCompararPress}
                    />
                </View>
                <View style={styles.containerBusca}>
                    <BarraPesquisa
                        valor={termoBusca}
                        onValorChange={setTermoBusca}
                        onBuscaSubmit={() => executarBusca(termoBusca)}
                    />
                    {loadingBusca && <ActivityIndicator size="large" color={CORES.azul} style={{ marginTop: 20 }} />}
                    {!loadingBusca && mercadosOrdenados.length > 0 && (
                        <View style={styles.mercados}>
                            {mercadosOrdenados.map(nomeMercado => (
                                <TouchableOpacity
                                    key={nomeMercado}
                                    style={[styles.mercadosBotao, mercadoSelecionado === nomeMercado && styles.mercadosBotaoSelecionado]}
                                    onPress={() => setMercadoSelecionado(nomeMercado)}
                                >
                                    <Image source={LOGOS[nomeMercado]} style={styles.mercadosImagem} resizeMode="contain" />
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}
                    {!loadingBusca && produtosExibidos.length > 0 && (
                        <View style={{ marginTop: TAMANHOS.espacamentoMaior }}>
                            <CarrosselProdutos data={produtosExibidos} onCompararPress={handleCompararPress} />
                        </View>
                    )}
                    {!loadingBusca && resultadoApi && mercadosOrdenados.length === 0 && (
                        <Text style={styles.semResultadosTexto}>Nenhum produto encontrado para "{termoBusca}"</Text>
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mercadosBotao: { borderColor: CORES.amarelo, borderRadius: TAMANHOS.bordaRaio, borderWidth: 2, padding: TAMANHOS.espacamentoPequeno },
    mercadosBotaoSelecionado: { borderColor: CORES.verde, backgroundColor: '#e8f5e9' },
    mercados: { alignItems: "center", flexDirection: 'row', justifyContent: "space-around", marginTop: TAMANHOS.espacamentoPequeno },
    safeArea: { flex: 1 },
    cabecalho: { alignItems: "center", backgroundColor: CORES.azul, flexDirection: 'row', height: 90, justifyContent: 'space-between', paddingHorizontal: TAMANHOS.espacamentoPequeno, paddingBottom: TAMANHOS.espacamentoMenor },
    tituloPrincipal: { color: CORES.azul, fontSize: TAMANHOS.fonteTitulo, fontWeight: "700", textAlign: "center", marginHorizontal: TAMANHOS.espacamentoMenor, marginVertical: TAMANHOS.espacamentoMaior },
    botaoPerfil: { alignItems: "center", backgroundColor: CORES.azul, borderRadius: TAMANHOS.bordaRaio, flexDirection: 'row', marginHorizontal: TAMANHOS.espacamentoMaior, padding: TAMANHOS.espacamentoPequeno },
    botaoPerfilTexto: { color: CORES.amarelo, fontSize: TAMANHOS.fonteSegundaria, fontWeight: "600", marginHorizontal: "auto" },
    promocoes: { backgroundColor: CORES.amarelo, marginVertical: TAMANHOS.espacamentoMaior, paddingVertical: TAMANHOS.espacamentoMenor },
    promocoesTitulo: { color: CORES.azul, fontSize: TAMANHOS.fonteSegundaria, fontWeight: "700", paddingHorizontal: TAMANHOS.espacamentoPequeno },
    containerBusca: { paddingHorizontal: TAMANHOS.espacamentoPequeno },
    mercadosImagem: { height: TAMANHOS.tamanhoIconeGrande, width: TAMANHOS.tamanhoIconeGrande * 2 },
    semResultadosTexto: { textAlign: 'center', marginTop: 20, fontSize: TAMANHOS.fontePequena, color: 'grey' }
});