import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/AuthContext'
import api from '../services/api'
import IconeVoltar from '../components/icones/Voltar';
import LogoPerfil from '../components/icones/Perfil';
import CarrosselEstatisticas from '../components/CarrosselEstatisticas';
import CardMercado from '../components/CardMercado';

import { CORES, TAMANHOS, FONTES } from "../styles/styles";
import LogoTauste from '../components/icones/LogoTauste';
import LogoConfianca from '../components/icones/LogoConfianca';
import LogoPanelao from '../components/icones/LogoPanelao';
import Carne from '../../assets/Carne.png';
import Limao from '../../assets/Limao.png';

export default function Perfil() {
    const navigation = useNavigation();
    const { autenticado, usuario } = useContext(AutenticadoContexto);
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const insets = useSafeAreaInsets();


    const DADOS_MERCADOS = [
        {
            id: '1',
            LogoComponent: LogoTauste,
        },
        {
            id: '2',
            LogoComponent: LogoConfianca,
        },
        {
            id: '3',
            LogoComponent: LogoPanelao,
        },
    ];



    const ESTATISTICAS_DATA = [
        { id: '1', titulo: 'Valores economizados', valor: 'R$ 40,50' },
        { id: '2', titulo: 'Valores economizados', valor: 'R$ 40,50' },
        { id: '3', titulo: 'Valores economizados', valor: 'R$ 40,50' },
    ];

    useEffect(() => {
        async function consultarDadosUsuarios() {
            if (!usuario?.id) {
                console.log("ID do usuário não encontrado no contexto.");
                setLoading(false);
                setError("Não foi possível identificar o usuário.");
                return;
            }

            setLoading(true);
            setError(null);

            try {
                const id = usuario.id;
                const resposta = await api.post(`/BuscaUsuariosUnico/${id}`);
                setDadosUsuarios(resposta.data);
                console.log("Dados do usuário:", resposta.data);
            } catch (err) {
                console.error("Erro ao buscar dados do usuário:", err);
                setError("Falha ao carregar informações do perfil.");
                setDadosUsuarios(null);
            } finally {
                setLoading(false);
            }
        }

        if (autenticado) {
            consultarDadosUsuarios();
        } else {
            setLoading(false);
        }
    }, [autenticado, usuario]);

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#F2E205" />
                <Text>Carregando Dados...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text>Erro ao buscar dados: {error}</Text>
            </View>
        );
    }

    if (!autenticado) {
        return null;
    }

    return (
        <View style={styles.container}>
            <View style={styles.cabecalho}>
                <Pressable onPress={() => navigation.navigate('Inicial')} style={[styles.cabecalhoLink, { paddingTop: insets.top }]}>
                    <IconeVoltar style={styles.iconVoltar} />
                </Pressable>
                <Text style={styles.cabecalhoTitulo}>Perfil</Text>
            </View>
            <ScrollView>
                <View style={styles.secaoPerfil}>
                    <Pressable style={styles.editarInfoButton} onPress={() => navigation.navigate('InformacoesPessoais')}>
                        <LogoPerfil width={60} height={60} />
                        <Text style={styles.editarInfoText}>Editar Informações</Text>
                    </Pressable>
                    <Text style={styles.saudacao}>Olá {dadosUsuarios?.nome || 'Usuario'}</Text>
                </View>

                <View style={styles.secaoEstatisticas}>
                    <Text style={styles.secaoTitulo}>Suas estatísticas!</Text>
                    <CarrosselEstatisticas data={ESTATISTICAS_DATA} />
                </View>

                // Dentro do return de Perfil.js

                <View style={styles.secaoInfoMercados}>
                    <Text style={styles.secaoTitulo}>Informações por mercados</Text>

                    <FlatList
                        data={DADOS_MERCADOS}
                        renderItem={({ item }) => <CardMercado item={item} />}
                        keyExtractor={item => item.id}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.barraRolagemMercados}
                    />
                </View>

                <View style={styles.secaoCompras}>
                    <Text style={styles.secaoTitulo}>Últimas Compras</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraRolagem}>
                        <View style={styles.produtoCard}>
                            <Image source={Carne} style={styles.produtoImagem} />
                            <Text style={styles.produtoTitulo}>Fraldinha Bovina Resfriada KG</Text>
                            <View style={styles.produtoValores}>
                                <Text style={styles.produtoPrecoRiscado}>R$40,00</Text>
                                <Text style={styles.produtoPrecoDestaque}>R$40,00</Text>
                            </View>
                        </View>
                        <View style={styles.produtoCard}>
                            <Image source={Limao} style={styles.produtoImagem} />
                            <Text style={styles.produtoTitulo}>Limao Taiti KG</Text>
                            <View style={styles.produtoValores}>
                                <Text style={styles.produtoPrecoRiscado}>R$10,00</Text>
                                <Text style={styles.produtoPrecoDestaque}>R$40,00</Text>
                            </View>
                        </View>
                    </ScrollView>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
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
    iconVoltar: {
        color: CORES.amarelo
    },
    cabecalhoLink: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
        paddingBottom: TAMANHOS.espacamentoMenor
    },
    cabecalhoTitulo: {
        fontFamily: FONTES.fonteMedium,
        flex: 1,
        textAlign: 'center',
        color: CORES.amarelo,
        fontSize: TAMANHOS.fonteTitulo,
        paddingTop: 50
    },
    secaoPerfil: {
        alignItems: 'center',
        padding: TAMANHOS.espacamentoMenor,
    },
    editarInfoButton: {
        alignItems: 'center',
    },
    perfilIcone: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: TAMANHOS.espacamentoMenor,
    },
    editarInfoText: {
        fontFamily: FONTES.fonteBold,
        color: CORES.azul,
        fontSize: TAMANHOS.fonteSegundaria,
    },
    saudacao: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteTitulo,
        marginTop: TAMANHOS.espacamentoPequeno,
        color: CORES.verde
    },
    secaoTitulo: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteSegundaria,
        marginLeft: TAMANHOS.espacamentoMenor,
        marginBottom: TAMANHOS.espacamentoPequeno,
        color: CORES.amarelo,
        alignSelf: 'baseline'
    },
    secaoEstatisticas: {
        paddingTop: TAMANHOS.espacamentoMenor,
        height: 150
    },
    barraRolagem: {
        marginLeft: TAMANHOS.espacamentoPequeno
    },
    barraRolagemMercados: {
        paddingHorizontal: TAMANHOS.espacamentoMenor,
    },
    scrollItem: {
        padding: TAMANHOS.espacamentoPequeno,
        borderRadius: TAMANHOS.bordaRaio,
        marginHorizontal: TAMANHOS.espacamentoPequeno,
        alignItems: 'center',
        backgroundColor: CORES.azul,
        justifyContent: 'center',
    },
    scrollItemTexto: {
        color: CORES.amarelo,
        fontSize: TAMANHOS.fontePequena,
        fontFamily: FONTES.fonteBold,
    },
    scrollItemTextoValor: {
        fontSize: TAMANHOS.fonteSegundaria,
        fontFamily: FONTES.fonteBold,
        color: CORES.amarelo,
    },
    secaoInfoMercados: {
        marginTop: TAMANHOS.espacamentoMaior,
        alignItems: 'center'
    },
    TextoLinkDadosMercado: {
        fontFamily: FONTES.fonteBold,
        color: CORES.azul,
        fontSize: TAMANHOS.fontePequena,
        alignSelf: 'center'
    },
    infoCompras: {
        alignItems: 'center',
        marginHorizontal: TAMANHOS.espacamentoMenor,
    },
    logoMercado: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    secaoCompras: {
        marginTop: TAMANHOS.espacamentoMaior,
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
        alignItems: 'center',
        marginBottom: TAMANHOS.espacamentoPequeno
    },
    produtoImagem: {
        width: '50%',
        height: 50,
        resizeMode: 'cover',
        borderRadius: TAMANHOS.bordaRaio,
    },
    produtoTitulo: {
        fontFamily: FONTES.fonteMedium,
        marginTop: TAMANHOS.espacamentoPequeno,
        fontSize: TAMANHOS.fonteSegundaria,
        height: 50,
        color: CORES.verde
    },
    produtoValores: {
        flexDirection: 'row',
        marginTop: TAMANHOS.espacamentoPequeno,
        gap: TAMANHOS.espacamentoMaior,
        alignItems: 'flex-end',
    },
    produtoPrecoRiscado: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    produtoPrecoDestaque: {
        color: CORES.verde,
        fontWeight: 'bold',
    },
});