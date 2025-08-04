// components/ResultadosDaBusca.js

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import CarrosselProdutos from './CarrosselProdutos'; // O seu carrossel "burro"
import { CORES, TAMANHOS,LOGOS } from '../styles/styles';

// Mapa de logos que este componente precisa

// Este componente agora recebe os dados da busca e o estado de loading como props
const ResultadosDaBusca = ({ dadosDaBusca, loading }) => {
    const [mercadoSelecionado, setMercadoSelecionado] = React.useState('');
    const [produtosParaCarrossel, setProdutosParaCarrossel] = React.useState([]);

    // Efeito que processa os dados sempre que uma nova busca é recebida
    React.useEffect(() => {
        if (!dadosDaBusca) {
            setProdutosParaCarrossel([]);
            return;
        }

        const nomesMercados = Object.keys(dadosDaBusca);
        const primeiroMercado = nomesMercados[0] || '';
        setMercadoSelecionado(primeiroMercado);

    }, [dadosDaBusca]);

    // Efeito que filtra os produtos quando o mercado selecionado muda
    React.useEffect(() => {
        if (!dadosDaBusca || !mercadoSelecionado) {
            setProdutosParaCarrossel([]);
            return;
        }

        const dadosDoMercado = dadosDaBusca[mercadoSelecionado];
        const produtosSimilares = dadosDoMercado?.produtosSimilares || [];

        const produtosFormatados = produtosSimilares.map(produto => ({
            id: produto.id.toString(),
            nome: produto.title,
            preco: produto.price,
            imagem: { uri: produto.imageUrl },
        }));

        setProdutosParaCarrossel(produtosFormatados);
    }, [mercadoSelecionado, dadosDaBusca]);

    // Se o pai está carregando, mostramos o indicador
    if (loading) {
        return <ActivityIndicator size="large" style={{ marginVertical: 50 }} />;
    }

    // Se não há dados para mostrar (ex: antes da primeira busca), não renderiza nada
    if (!dadosDaBusca) {
        return null;
    }
    
    return (
        <View>
            <View style={styles.mercados}>
                {Object.keys(dadosDaBusca).map(nome => (
                    <TouchableOpacity
                        key={nome}
                        onPress={() => setMercadoSelecionado(nome)}
                        style={[
                            styles.mercadosBotao,
                            mercadoSelecionado === nome && styles.mercadosBotaoAtivo,
                        ]}
                    >
                        <Image source={LOGOS[nome]} style={styles.mercadosImagem} />
                    </TouchableOpacity>
                ))}
            </View>

            <CarrosselProdutos
                key={mercadoSelecionado}
                data={produtosParaCarrossel}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    mercados: { flexDirection: 'row', justifyContent: 'space-around', paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: '#eee' },
    mercadosBotao: { padding: 8, borderRadius: 12, borderWidth: 2, borderColor: 'transparent' },
    mercadosBotaoAtivo: { borderColor: CORES.azul },
    mercadosImagem: { width: 80, height: 40, resizeMode: 'contain' },
});

export default ResultadosDaBusca;