import React, { useState, useContext, useEffect } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/authContext'
import api from '../services/api'
import IconeVoltar from '../components/icones/Voltar';

export default function Perfil() {
    const navigation = useNavigation();
    const { autenticado, usuario } = useContext(AutenticadoContexto);
    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                <Pressable onPress={() => navigation.navigate('Inicial')} style={styles.cabecalhoLink}>
                     <IconeVoltar/>
                    <Text style={{color: 'white', fontSize: 24}}>←</Text> 
                </Pressable>
                <Text style={styles.cabecalhoTitulo}>Perfil</Text>
            </View>

            <ScrollView>
                <View style={styles.secaoPerfil}>
                    <Pressable style={styles.editarInfoButton} onPress={() => navigation.navigate('EditarInformacoes')}>
                         {/* <PerfilIcone width={60} height={60} /> */}
                        {/* <Image source={require('../../imagens/perfil-pagePerfil.png')} style={styles.perfilIcone} /> */}
                        <Text style={styles.editarInfoText}>Editar Informações</Text>
                    </Pressable>
                    <Text style={styles.saudacao}>Olá {dadosUsuarios?.nome || 'Usuario'}</Text>
                </View>

                <View style={styles.secaoEstatisticas}>
                    <Text style={styles.secaoTitulo}>Suas estatísticas!</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraRolagem}>
                        <View style={[styles.scrollItem, styles.scrollItemAmarelo]}>
                            <Text>Valores economizados</Text>
                            <Text>R$ 40,50</Text>
                        </View>
                    </ScrollView>
                </View>

                <View style={styles.secaoInfoMercados}>
                    <Text style={styles.secaoTitulo}>Informações por mercados</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraRolagem}>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosPorMercado')}>
                            {/* <Image source={require('../../imagens/tausteLogo.png')} style={styles.logoMercado} /> */}
                            <Text>Veja suas compras</Text>
                        </Pressable>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosPorMercado')}>
                            {/* <Image source={require('../../imagens/confiancaLogo.png')} style={styles.logoMercado} /> */}
                            <Text>Veja suas compras</Text>
                        </Pressable>
                        <Pressable style={styles.infoCompras} onPress={() => navigation.navigate('DadosPorMercado')}>
                            {/* <Image source={require('../../imagens/panelaoLogo.png')} style={styles.logoMercado} /> */}
                            <Text>Veja suas compras</Text>
                        </Pressable>
                    </ScrollView>
                </View>

                <View style={styles.secaoCompras}>
                    <Text style={styles.secaoTitulo}>Últimas Compras</Text>
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.barraRolagem}>
                        <View style={styles.produtoCard}>
                            {/* <Image source={require('../../imagens/carne.png')} style={styles.produtoImagem} /> */}
                            <Text style={styles.produtoTitulo}>Fraldinha Bovina Resfriada KG</Text>
                            <View style={styles.produtoValores}>
                                <Text style={styles.produtoPrecoRiscado}>R$40,00</Text>
                                <Text style={styles.produtoPrecoDestaque}>R$40,00</Text>
                            </View>
                        </View>
                        <View style={styles.produtoCard}>
                            {/* <Image source={require('../../imagens/limao.png')} style={styles.produtoImagem} /> */}
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
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#012340',
        height: 60,
    },
    cabecalhoLink: {
        position: 'absolute',
        left: 15,
        zIndex: 1,
    },
    cabecalhoTitulo: {
        flex: 1,
        textAlign: 'center',
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
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
    },
    saudacao: {
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 15,
    },
    secaoTitulo: {
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 15,
        marginBottom: 10,
    },
    secaoEstatisticas: {
        marginTop: 20,
    },
    barraRolagem: {
        paddingLeft: 15,
    },
    scrollItem: {
        backgroundColor: '#f0f0f0',
        padding: 15,
        borderRadius: 8,
        marginRight: 10,
        alignItems: 'center',
    },
    scrollItemAmarelo: {
        backgroundColor: '#FFFACD',
    },
    secaoInfoMercados: {
        marginTop: 30,
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
    },
    produtoImagem: {
        width: '100%',
        height: 100,
        resizeMode: 'cover',
        borderRadius: 4,
    },
    produtoTitulo: {
        marginTop: 5,
        fontSize: 14,
    },
    produtoValores: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
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