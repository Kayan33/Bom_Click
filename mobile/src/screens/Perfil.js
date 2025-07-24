import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/authContext'
import api from '../services/api'
import IconeVoltar from '../components/icones/Voltar';
import LogoPerfil from '../components/icones/Perfil';

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
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraRolagem}>
                        <View style={[styles.scrollItem, styles.scrollItemAmarelo]}>
                            <Text style={styles.scrollItemTexto}>Valores economizados</Text>
                            <Text style={styles.scrollItemTexto}>R$ 40,50</Text>
                        </View>
                        <View style={[styles.scrollItem, styles.scrollItemAmarelo]}>
                            <Text style={styles.scrollItemTexto}>Valores economizados</Text>
                            <Text style={styles.scrollItemTexto}>R$ 40,50</Text>
                        </View>
                        <View style={[styles.scrollItem, styles.scrollItemAmarelo]}>
                            <Text style={styles.scrollItemTexto}>Valores economizados</Text>
                            <Text style={styles.scrollItemTextoValor}>R$ 40,50</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.secaoInfoMercados}>
                    <Text style={styles.secaoTitulo}>Informações por mercados</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraRolagemMercados}>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosMercado')}>
                           <LogoTauste/>
                            <Text style={styles.TextoLinkDadosMercado}>Veja suas compras</Text>
                        </Pressable>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosMercado')}>
                          <LogoConfianca/>
                            <Text style={styles.TextoLinkDadosMercado}>Veja suas compras</Text>
                        </Pressable>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosMercado')}>
                           <LogoPanelao/>
                            <Text style={styles.TextoLinkDadosMercado}>Veja suas compras</Text>
                        </Pressable>
                    </ScrollView>
                </View>

                <View style={styles.secaoCompras}>
                    <Text style={styles.secaoTitulo}>Últimas Compras</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraRolagem}>
                        <View style={styles.produtoCard}>
                           <Image source={Carne} style={styles.produtoImagem}/>
                            <Text style={styles.produtoTitulo}>Fraldinha Bovina Resfriada KG</Text>
                            <View style={styles.produtoValores}>
                                <Text style={styles.produtoPrecoRiscado}>R$40,00</Text>
                                <Text style={styles.produtoPrecoDestaque}>R$40,00</Text>
                            </View>
                        </View>
                        <View style={styles.produtoCard}>
                            <Image source={Limao}  style={styles.produtoImagem}/>
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
        flex: 1,
        textAlign: 'center',
        color: CORES.amarelo,
        fontSize: 20,
        fontWeight: 'bold',
        paddingTop: 50
    },
    secaoPerfil: {
        alignItems: 'center',
        padding: 20,
    },
    editarInfoButton: {
        alignItems: 'center',
    },
    perfilIcone: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
    },
    editarInfoText: {
        color: '#007BFF',
        fontSize: FONTES.f1,
        fontWeight: 'bold'
    },
    saudacao: {
        fontSize: TAMANHOS.fonteTitulo,
        fontWeight: 'bold',
        marginTop: 15,
        color: CORES.verde
    },
    secaoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 10,
        marginBottom: 10,
        color: CORES.amarelo
    },
    secaoEstatisticas: {
        marginTop: 20,
    },
    barraRolagem: {
        paddingHorizontal: 5,
    },
    barraRolagemMercados: {
        paddingHorizontal: 10,
    },
    scrollItem: {
        padding: TAMANHOS.espacamentoMenor,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
        backgroundColor: CORES.azul,
    },
    scrollItemTexto: {
        color: CORES.amarelo,
        fontWeight: 'bold'
    },
    scrollItemTextoValor: {
        color: CORES.amarelo,
        
    },
    secaoInfoMercados: {
        marginTop: 30,
    },
    TextoLinkDadosMercado: {
        fontSize: 13,
        fontWeight: 'bold',
        color: CORES.azul
    },
    infoCompras: {
        alignItems: 'center',
        marginRight: 15,
    },
    logoMercado: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    secaoCompras: {
        marginTop: 30,
    },
    produtoCard: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginRight: 10,
        width: 150,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        alignItems: 'center',
       marginBottom: 5
    },
    produtoImagem: {
        width: '50%',
        height: 50,
        resizeMode: 'cover',
        borderRadius: 4,
    },
    produtoTitulo: {
        marginTop: 5,
        fontSize: 14,
        height: 50
    },
    produtoValores: {
        flexDirection: 'row',
        marginTop: 5,
        gap: 25,
        alignItems: 'flex-end',
    },
    produtoPrecoRiscado: {
        textDecorationLine: 'line-through',
        color: 'gray',
    },
    produtoPrecoDestaque: {
        color: 'green',
        fontWeight: 'bold',
    },
});