import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native';
import React, { useState } from 'react';
import IconeVoltar from './icones/Voltar';
import { Feather } from '@expo/vector-icons';
import { CORES, TAMANHOS, FONTES } from '../styles/styles';

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
            <View style={styles.modalOverlay}>
                <View style={styles.modalContainer}>
                    <View style={styles.header}>
                        <Pressable onPress={onClose} style={styles.backButton}>
                            <IconeVoltar />
                        </Pressable>
                        <Text style={styles.headerTitle}>Login</Text>
                        <View style={styles.placeholder} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            autoComplete='email'
                            inputMode='email'
                            keyboardType='email-address'
                            placeholder='E-mail'
                            value={email}
                            onChangeText={setEmail}
                            style={styles.input}
                            placeholderTextColor={CORES.verde}
                        />
                        <View style={styles.passwordInputWrapper}>
                            <TextInput
                                placeholder='Senha:'
                                secureTextEntry={senhaVisibilidade}
                                style={styles.passwordInput}
                                value={senha}
                                onChangeText={setSenha}
                                placeholderTextColor={CORES.verde}
                            />
                            <Pressable onPress={() => setSenhaVisibilidade(!senhaVisibilidade)}>
                                <Feather
                                    name={senhaVisibilidade ? 'eye-off' : 'eye'}
                                    size={18}
                                    color={CORES.verde}
                                />
                            </Pressable>
                        </View>
                    </View>

                    <View style={styles.footer}>
                        <View style={styles.linksContainer}>
                            <Pressable>
                                <Text style={styles.linkText}>Esqueci a senha</Text>
                            </Pressable>
                            <Pressable onPress={onNavigateToCadastro}>
                                <Text style={styles.linkTextBold}>Cadastrar-se</Text>
                            </Pressable>
                        </View>
                        <Pressable
                            onPress={dadosLogin}
                            disabled={email === '' || senha === ''}
                            style={({ pressed }) => [
                                styles.loginButton,
                                {
                                    backgroundColor: email === '' || senha === '' ? '#b49738ff' : '#ffc200',
                                    opacity: pressed ? 0.8 : 1
                                }
                            ]}
                        >
                            <Text style={styles.loginButtonText}>Login</Text>
                        </Pressable>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContainer: {
        width: '90%',
        maxWidth: 340,
        backgroundColor: CORES.azul,
        borderRadius: 25,
        padding: TAMANHOS.espacamentoMenor,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: TAMANHOS.espacamentoMaior,
        gap: TAMANHOS.espacamentoPequeno
    },
    backButton: {
        alignSelf: 'center'
    },
    headerTitle: {
        fontFamily: FONTES.fonteBold,
        color: CORES.branco,
        fontSize: TAMANHOS.fonteTitulo,
        paddingTop: 10,
    },
    placeholder: {
        width: 24,
    },
    inputContainer: {
        width: '100%',
        marginBottom: TAMANHOS.espacamentoPequeno,
    },
    input: {
        fontFamily: FONTES.fonteMedium,
        width: '80%',
        height: 45,
        backgroundColor: CORES.branco,
        borderRadius: 50,
        paddingHorizontal: TAMANHOS.espacamentoMenor,
        fontSize: TAMANHOS.fonteMedia,
        marginBottom: TAMANHOS.espacamentoMenor,
        alignItems: 'center',
        alignSelf: 'center',
        color: CORES.verde,
        paddingLeft: TAMANHOS.espacamentoMenor,
    },
    passwordInputWrapper: {
        fontFamily: FONTES.fonteMedium,
        width: '80%',
        height: 45,
        backgroundColor: CORES.branco,
        borderRadius: 50,
        paddingHorizontal: 12,
        fontSize: TAMANHOS.fonteMedia,
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        color: CORES.verde,

    },
    passwordInput: {
        flex: 1,
        fontFamily: FONTES.fonteMedium,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: TAMANHOS.espacamentoPequeno,
    },
    linksContainer: {
        marginLeft: TAMANHOS.espacamentoMaior
    },
    linkText: {
        fontFamily: FONTES.fontePrincipal,
        color: CORES.amarelo,
        fontSize: TAMANHOS.fonteSegundaria,
        marginBottom: TAMANHOS.espacamentoMenor,
    },
    linkTextBold: {
        fontFamily: FONTES.fonteBold,
        color: CORES.amarelo,
        fontSize: TAMANHOS.fonteSegundaria,
    },
    loginButton: {
        width: 100,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    loginButtonText: {
        fontFamily: FONTES.fonteBold,
        color: CORES.azul,
        fontSize: TAMANHOS.fonteSegundaria,
    },
});