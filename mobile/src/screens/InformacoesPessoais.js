import React, { useState, useEffect, useContext } from 'react';
import {
    SafeAreaView,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AutenticadoContexto } from '../Context/authContext';
import api from '../services/api';

import { Feather, FontAwesome } from '@expo/vector-icons';
import { CORES, TAMANHOS, FONTES } from '../styles/styles';

export default function InformacoesPessoais() {
    const navigation = useNavigation();
    const { autenticado, usuario, logout } = useContext(AutenticadoContexto);

    const [dadosUsuarios, setDadosUsuarios] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (autenticado && usuario?.id) {
            consultarDadosUsuarios();
        } else {
            setLoading(false);
            if (!usuario?.id) setError("Não foi possível identificar o usuário.");
        }
    }, [autenticado, usuario]);

    async function consultarDadosUsuarios() {
        setLoading(true);
        setError(null);
        try {
            const id = usuario.id;
            const resposta = await api.post(`/BuscaUsuariosUnico/${id}`);
            setDadosUsuarios(resposta.data);
        } catch (err) {
            setError("Falha ao carregar informações do perfil.");
            setDadosUsuarios(null);
        } finally {
            setLoading(false);
        }
    }

    function logOutUsuario() {
        logout();
    }

    if (loading) {
        return <View style={styles.center}><ActivityIndicator size="large" color={CORES.azul} /></View>;
    }

    if (error) {
        return <View style={styles.center}><Text style={styles.errorText}>{error}</Text></View>;
    }

    if (!dadosUsuarios) {
        return <View style={styles.center}><Text>Nenhum dado de usuário encontrado.</Text></View>;
    }

    const formatarData = (dataString) => {
        if (!dataString) return '';
        const data = new Date(dataString);
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = data.getFullYear();
        return `${dia}/${mes}/${ano}`;
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Feather name="arrow-left" size={24} color={CORES.amarelo} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Editar Informações</Text>
                <View style={{ width: 24 }} />
            </View>

            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Informações Pessoais</Text>
                    <InfoLinha label="Nome:" value={dadosUsuarios.nome || ''} />
                    <InfoLinha label="CPF:" value={dadosUsuarios.cpf || ''} />
                    <InfoLinha label="E-mail:" value={dadosUsuarios.email || ''} />
                    <View style={styles.secaoDataNascimento}>
                        <View>
                            <InfoLinha
                                label="Data de Nascimento:"
                                value={
                                    dadosUsuarios.data_nascimento
                                        ? formatarData(dadosUsuarios.data_nascimento)
                                        : 'Não informado'
                                }
                            />
                        </View>
                        <TouchableOpacity style={styles.botaoEditar}>
                            <Feather name="edit" size={TAMANHOS.espacamentoMenor} color={CORES.amarelo} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.secaoRedefinirSenha}>
                        <TouchableOpacity>
                            <Text style={styles.link}>Redefinir senha</Text>
                        </TouchableOpacity>

                    </View>
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Endereço</Text>
                    <View style={styles.sectionCep}>
                        <InfoLinha label="CEP:" value={dadosUsuarios.cep || ''} showEditIcon layout="inline" />
                    </View>
                    <InfoLinha label="Logradouro:" value={dadosUsuarios.rua || ''} />
                    <InfoLinha label="BAIRRO:" value={dadosUsuarios.bairro || ''} />
                    <InfoLinha label="Número:" value={dadosUsuarios.numero?.toString() || ''} />
                </View>

                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Formas de pagamento</Text>
                    <CartaoLinha bandeira="Alimentação Alelo" numero="0800 **** **** 0800" />
                    <CartaoLinha bandeira="Crédito Visa" numero="0800 **** **** 0800" />
                    <TouchableOpacity style={styles.addButton}>
                        <Text style={styles.addButtonText}>Adicionar cartão</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.deleteButton}>
                    <Text style={styles.deleteButtonText}>Apagar conta</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={logOutUsuario}>
                    <Feather name="log-out" size={28} color={CORES.vermelho} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const InfoLinha = ({ label, value, showEditIcon = false, layout = 'stacked' }) => (
    <View style={layout === 'inline' ? styles.infoRowInline : styles.infoRowStacked}>
        <View>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>{value}</Text>
        </View>
        {showEditIcon && (
            <TouchableOpacity>
                <Feather name="edit" size={TAMANHOS.espacamentoMenor} color={CORES.amarelo} style={{paddingTop:5}}/>
            </TouchableOpacity>
        )}
    </View>
);

const CartaoLinha = ({ bandeira, numero }) => (
    <View style={styles.cardRow}>
        <FontAwesome name="credit-card" size={24} color={CORES.azul} />
        <View style={styles.cardInfo}>
            <Text style={styles.cardBrand}>{bandeira}</Text>
            <Text style={styles.cardNumb}>{numero}</Text>
        </View>
        <TouchableOpacity>
            <Feather name="trash-2" size={20} color={CORES.vermelho} />
        </TouchableOpacity>
    </View>
);


const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: CORES.branco,

    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        color: CORES.vermelho,
        fontSize: TAMANHOS.fonteSegundaria,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        backgroundColor: CORES.azul,
        paddingTop: 55
    },
    headerTitle: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteTitulo,
        color: CORES.amarelo,
    },
    scrollContainer: {
        padding: TAMANHOS.espacamentoMenor,
        paddingBottom: 100,
    },
    section: {
        marginBottom: TAMANHOS.espacamentoMaior,
    },
    sectionTitle: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.amarelo,
        marginBottom: TAMANHOS.espacamentoMenor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    sectionCep: {
        flexDirection: 'column',
        justifyContent: 'flex-start',
        height:50,
    },
    secaoRedefinirSenha: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: CORES.branco,
        paddingBottom: TAMANHOS.espacamentoPequeno,
        marginBottom: TAMANHOS.espacamentoPequeno,
    },
     infoRowStacked: {
        borderBottomWidth: 1,
        borderBottomColor: CORES.branco,
        paddingBottom: TAMANHOS.espacamentoPequeno,
        marginBottom: TAMANHOS.espacamentoPequeno,
    },
    infoRowInline: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        borderBottomColor: CORES.branco,
        paddingBottom: TAMANHOS.espacamentoPequeno,
        marginBottom: TAMANHOS.espacamentoPequeno,
        gap: 10
    },
    label: {
        fontFamily: FONTES.fonteMedium,
        fontSize: TAMANHOS.fonteSegundaria,
        marginBottom: TAMANHOS.espacamentoPequeno,
        color: CORES.azul
    },
    secaoDataNascimento: {
        flexDirection: 'row',
        alignItems: 'baseline',
        gap: 10
    },
    botaoEditarTexto: {
        fontFamily: FONTES.fonteBold
    },
    value: {
        fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
    },
    link: {
        borderWidth: 1,
        borderColor: CORES.vermelho,
        borderRadius: 50,
        paddingVertical: TAMANHOS.espacamentoPequeno,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        color: CORES.vermelho
    },
    cardRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: TAMANHOS.espacamentoMenor,
    },
    cardInfo: {
        flex: 1,
        marginLeft: TAMANHOS.espacamentoMenor,
    },
    cardBrand: {
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
    },
    cardNumb: {
         fontFamily: FONTES.fonteBold,
        fontSize: TAMANHOS.fonteSegundaria,
        color: CORES.azul,
        marginTop: TAMANHOS.espacamentoPequeno,
    },
    addButton: {
        alignSelf: 'center',
        borderWidth: 1,
        borderColor: CORES.verde,
        borderRadius: 50,
        paddingVertical: TAMANHOS.espacamentoMenor,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
    },
    addButtonText: {
        color: CORES.verde,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: TAMANHOS.espacamentoMenor,
        backgroundColor: CORES.branco,
        borderTopWidth: 1,
        borderTopColor: CORES.branco,
        marginBottom: TAMANHOS.espacamentoMaior
    },
    deleteButton: {
        borderWidth: 1,
        borderColor: CORES.vermelho,
        borderRadius: 50,
        paddingVertical: TAMANHOS.espacamentoMenor,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
    },
    deleteButtonText: {
        color: CORES.vermelho,
        fontWeight: 'bold',
    },
});