import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, ActivityIndicator, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/AuthContext'
import api from '../services/api'
import IconeVoltar from '../components/icones/Voltar';
import LogoPerfil from '../components/icones/Perfil';
import CarrosselEstatisticas from '../components/CarrosselEstatisticas';
import CarrosselUltimasCompras from '../components/CarrosselUltimasCompras';

import { CORES, TAMANHOS, FONTES } from "../styles/styles";
import LogoTauste from '../../assets/Tauste.png'
import LogoConfianca from '../../assets/Confianca.png'
import LogoPaoAcucar from '../../assets/PaoAcucar.png'

export default function Perfil() {
    const navigation = useNavigation();
    const { autenticado, usuario } = useContext(AutenticadoContexto);
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const insets = useSafeAreaInsets();

    const DADOS_ULTIMAS_COMPRAS = [
        {
            id: '1',
            nome: 'Fraldinha Bovina Resfriada KG',
            imagem: require('../../assets/ImagensTemp/carneExemplo.png'),
            precoOriginal: 'R$40,00',
            precoComDesconto: 'R$5,00'
        },
        {
            id: '2',
            nome: 'Limão Taiti KG',
            imagem: require('../../assets/Limao.png'),
            precoOriginal: 'R$40,00',
            precoComDesconto: 'R$0,00'
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

                <View style={styles.secaoInfoMercados}>
                    <Text style={styles.secaoTitulo}>Informações por mercados</Text>
                    <View style={styles.containerMercadosLink}>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosMercado')}>
                            <Image source={LogoTauste} style={styles.logoMercado}/>
                            <Text style={styles.TextoLinkDadosMercado}>Veja suas compras</Text>
                        </Pressable>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosMercado')}>
                            <Image source={LogoConfianca}  style={styles.logoMercado}/>
                            <Text style={styles.TextoLinkDadosMercado}>Veja suas compras</Text>
                        </Pressable>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosMercado')}>
                            <Image source={LogoPaoAcucar} style={styles.logoMercado}/>
                            <Text style={styles.TextoLinkDadosMercado}>Veja suas compras</Text>
                        </Pressable>
                    </View>
                </View>

                <View style={styles.secaoCompras}>
                    <Text style={styles.secaoTitulo}>Última compra</Text>
                    <View style={styles.logoCompraContainer}>
                        <Image source={LogoConfianca} style={styles.logoMercado}/>
                    </View>
                    <CarrosselUltimasCompras data={DADOS_ULTIMAS_COMPRAS} />
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
        paddingBottom: TAMANHOS.espacamentoPequeno
    },
    iconVoltar: {
        color: CORES.amarelo
    },
    cabecalhoLink: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
        paddingBottom: TAMANHOS.espacamentoPequeno
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
        padding: TAMANHOS.espacamentoPequeno,
    },
    editarInfoButton: {
        alignItems: 'center',
    },
    perfilIcone: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: TAMANHOS.espacamentoPequeno,
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
        color: CORES.amarelo,
        alignSelf: 'baseline'
    },
    secaoEstatisticas: {
        paddingTop: TAMANHOS.espacamentoPequeno,
        height: 120
    },
    barraRolagem: {
        marginLeft: TAMANHOS.espacamentoPequeno
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
    containerMercadosLink: {
        flexDirection: 'row',
        padding: TAMANHOS.espacamentoPequeno
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
       marginVertical: TAMANHOS.espacamentoMaior
    },
    logoCompraContainer: {
        alignSelf: 'flex-start',
        marginLeft: TAMANHOS.espacamentoMenor,
        marginBottom: TAMANHOS.espacamentoPequeno,
    },
});