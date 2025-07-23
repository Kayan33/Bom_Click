import { StyleSheet, Text, View, Modal, Pressable, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import IconeVoltar from './icones/Voltar';
import IconeOlho from './icones/IconeOlho';

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
                    <Pressable onPress={onClose} style={{ position: 'absolute', top: 10, right: 10 }}>
                        <Text style={{ color: 'white', fontSize: 18 }}>X</Text>
                    </Pressable>

                    <IconeVoltar/>

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
                            <IconeOlho/>
                            <Text style={{ color: '#333' }}>{senhaVisibilidade ? 'Ver' : 'Ocultar'}</Text>
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

                    <Pressable
                        onPress={dadosLogin}
                        disabled={email === '' || senha === ''}
                        style={[
                            styles.botao,
                            { backgroundColor: email === '' || senha === '' ? '#ffc200' : '#F2E205' }
                        ]}
                    >
                        <Text style={styles.botao_texto}>Login</Text>
                    </Pressable>

                </View>
            </View>
        </Modal>
    )
}


const styles = StyleSheet.create({
    botao_texto: {
        color: '#2f7339',
        fontWeight: 'bold',
        fontSize: 16,
    },
    modal: {
        alignItems: 'center',
        flex: 1,
        padding: 0,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modal_container: {
        backgroundColor: '#054aae',
        borderRadius: 8,
        justifyContent: 'space-evenly',
        height: 340,
        paddingHorizontal: 20,
        width: 340
    },
    modal_container_titulo: {
        color: '#f1f1f1',
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    modal_container_input: {
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        color: '#022859',
        paddingHorizontal: 16,
        height: 40
    },
    modal_container_passwordContainer: {
        alignItems: 'center',
        backgroundColor: '#f1f1f1',
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        height: 40
    },
    modal_container_passwordContainer_valor: {
        flex: 1,
        color: '#022859'
    },
    opcoes: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    opcoes_titulo: {
        color: '#ffc200',
        fontWeight: 'normal'
    },
    opcoes_titulo_bold: {
        color: '#ffc200',
        fontWeight: 'bold'
    },
    botao: {
        borderRadius: 8,
        paddingHorizontal: 24,
        paddingVertical: 10,
        alignItems: 'center'
    }
});