import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import IconeVoltar from './icones/Voltar';
import IconeOlho from './icones/IconeOlho';
import { CORES, TAMANHOS } from '../styles/styles';

export default function LoginModal({ visible, onLoginSubmit, onClose, onNavigateToCadastro }) {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const [senhaVisibilidade, setSenhaVisibilidade] = useState(true);

    async function dadosLogin() {
        if (!email || !senha) {
            console.log("Preencha todos os campos");
            return;
        }
        try {
            const loginSucesso = await onLoginSubmit(email, senha);
            if (loginSucesso) {
            } else {
                console.log('Login falhou. Verifique suas credenciais.');
            }
        } catch (err) {
            console.log("Erro ao tentar fazer login:", err);
        }
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modal}>
                <View style={styles.modal_container}>
                    <Pressable onPress={onClose} style={styles.iconVoltar_Container}>
                        <IconeVoltar />
                    </Pressable>
                    <Text style={styles.modal_container_titulo}>Login</Text>
                    <TextInput
                        autoComplete='email'
                        inputMode='email'
                        keyboardType='email-address'
                        placeholder='Email:'
                        value={email}
                        onChangeText={setEmail}
                        style={styles.modal_container_input}
                        placeholderTextColor="#555"
                    />
                    <View style={styles.modal_container_passwordContainer}>
                        <TextInput
                            placeholder='Senha:'
                            secureTextEntry={senhaVisibilidade}
                            style={styles.modal_container_passwordContainer_valor}
                            value={senha}
                            onChangeText={setSenha}
                            placeholderTextColor="#555"
                        />
                        <Pressable onPress={() => setSenhaVisibilidade(!senhaVisibilidade)}>
                            <IconeOlho />
                        </Pressable>
                    </View>

                    <View style={styles.opcoes}>
                        <Pressable>
                            <Text style={styles.opcoes_titulo}>Esqueceu senha?</Text>
                        </Pressable>
                        <Pressable onPress={onNavigateToCadastro}>
                            <Text style={styles.opcoes_titulo_bold}>Cadastre-se</Text>
                        </Pressable>
                    </View>
                    <View style={styles.botaoContainer}>
                        <Pressable
                            onPress={dadosLogin}
                            disabled={email === '' || senha === ''}
                            style={[
                                styles.botao,
                                { backgroundColor: email === '' || senha === '' ?  '#b49738ff': '#ffc200' }
                            ]}
                        >
                            <Text style={styles.botao_texto}>Login</Text>
                        </Pressable>
                    </View>
                </View>

            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    botao_texto: {
        color: CORES.verde,
        fontWeight: 'bold',
        fontSize: TAMANHOS.fonteSegundaria,
    },
    modal: {
        alignItems: 'center',
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_container: {
        backgroundColor: CORES.azul,
        borderRadius: 50,
        justifyContent: 'space-evenly',
        height: 300,
        paddingHorizontal: TAMANHOS.espacamentoMaior,
        width: 340
    },
    iconVoltar_Container: {
        flexDirection: 'row',
        alignItems: 'flex-end'
    },
    modal_container_titulo: {
        color: CORES.branco,
        fontSize: TAMANHOS.fonteTitulo,
        fontWeight: 'bold',
        textAlign: 'center',
        textAlignVertical: 'top',
    },
    modal_container_input: {
        width: 250,
        height: 40,
        backgroundColor: CORES.branco,
        borderRadius: 50,
        color: CORES.verde,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        alignSelf: 'center',
        textAlign: 'justify',
    },
    modal_container_passwordContainer: {
        width: 250,
        height: 40,
        backgroundColor: CORES.branco,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        alignSelf: 'center',
        alignItems: 'center',
    },
    modal_container_passwordContainer_valor: {
        flex: 1,
        color: CORES.azul
    },
    opcoes: {
        flexDirection: 'column',
        rowGap: TAMANHOS.espacamentoMenor,
        alignItems: 'center',
        width: 150,
        
    },
    opcoes_titulo: {
        color: CORES.amarelo,
        fontWeight: 'normal'
    },
    opcoes_titulo_bold: {
        color: CORES.amarelo,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        paddingRight: TAMANHOS.espacamentoMaior
    },
    botaoContainer: {
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row'
    },
    botao: {
        width: 100,
        alignItems: 'center',
        borderRadius: 50,
        padding: TAMANHOS.espacamentoPequeno,
        backgroundColor: CORES.amarelo
    },
    botao_texto: {
        justifyContent: 'flex-end',
        color: CORES.verde,
        fontWeight: 'bold'
    }
});