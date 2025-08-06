import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, Modal, ActivityIndicator, ScrollView } from 'react-native';
import { AutenticadoContexto } from '../Context/AuthContext';
import api from '../services/api';
import { CORES, FONTES, TAMANHOS } from '../styles/styles';

const ModalEditarEndereco = ({ visible, onClose, enderecoAtual, onSaveSuccess }) => {
    const [cep, setCep] = useState('');
    const [logradouro, setLogradouro] = useState('');
    const [bairro, setBairro] = useState('');
    const [numero, setNumero] = useState('');

    const [loading, setLoading] = useState(false);
    const [loadingCep, setLoadingCep] = useState(false);

       const { usuario } = useContext(AutenticadoContexto);


  
    useEffect(() => {
        if (enderecoAtual) {
            setCep(enderecoAtual.cep || '');
            setLogradouro(enderecoAtual.logradouro || '');
            setBairro(enderecoAtual.bairro || '');
            setNumero(enderecoAtual.numero?.toString() || '');
        }
    }, [visible]); 

    
    const buscarCep = async (cepDigitado) => {
        const cepLimpo = cepDigitado.replace(/\D/g, '');
        if (cepLimpo.length !== 8) return;

        setLoadingCep(true);
        try {
            const { data } = await api.get(`https://viacep.com.br/ws/${cepLimpo}/json/`);
            if (data.erro) {
                Alert.alert("CEP não encontrado");
            } else {
                setLogradouro(data.logradouro);
                setBairro(data.bairro);
            }
        } catch (error) {
            Alert.alert("Erro", "Não foi possível buscar o CEP.");
        } finally {
            setLoadingCep(false);
        }
    };
   
    const handleSalvar = async () => {
        if (!cep || !logradouro || !bairro || !numero) {
            Alert.alert("Atenção", "Preencha todos os campos do endereço.");
            return;
        }
        setLoading(true);
        try {
           
            await api.put(`/AlteraDadosUsuario/${usuario.id}`, {
                cep,
                logradouro,
                bairro,
                numero: Number(numero), 
            });

            Alert.alert("Sucesso", "Endereço atualizado!");
            onSaveSuccess(); 
            onClose(); 
        } catch (error) {
            console.error(error.response?.data || error.message);
            Alert.alert("Erro", "Não foi possível atualizar o endereço.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>Editar Endereço</Text>

                        <View style={styles.cepInputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="CEP"
                                keyboardType="numeric"
                                maxLength={9}
                                value={cep}
                                onChangeText={(texto) => {
                                    setCep(texto);
                                    if (texto.replace(/\D/g, '').length === 8) {
                                        buscarCep(texto);
                                    }
                                }}
                            />
                            {loadingCep && <ActivityIndicator style={styles.loader} />}
                        </View>

                        <TextInput style={styles.input} placeholder="Logradouro (Rua/Avenida)" value={logradouro} onChangeText={setLogradouro} />
                        <TextInput style={styles.input} placeholder="Bairro" value={bairro} onChangeText={setBairro} />
                        <TextInput style={styles.input} placeholder="Número" value={numero} onChangeText={setNumero} keyboardType="numeric" />

                        <View style={styles.buttonContainer}>
                            <Button title="Cancelar" onPress={onClose} color="gray" />
                            <Button title={loading ? "Salvando..." : "Salvar"} onPress={handleSalvar} disabled={loading} />
                        </View>
                    </View>
                </ScrollView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center'
    },
    modalContainer: {
        margin: 20,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        gap: 15
    },
    title:
    {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16
    },
    cepInputContainer: {
        justifyContent: 'center'
    },
    loader: {
        position: 'absolute',
        right: 15,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10
    }
});

export default ModalEditarEndereco;