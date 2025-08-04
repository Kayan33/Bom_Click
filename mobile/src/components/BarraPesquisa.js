import React, { useState, useRef } from "react";
import { View, StyleSheet, TouchableOpacity, TextInput, Animated, Keyboard } from "react-native";
import Lupa from "./icones/Lupa";
import { CORES, TAMANHOS } from "../styles/styles";

// O componente agora recebe as props para comunicação
export default function BarraPesquisa({ valor, onValorChange, onBuscaSubmit }) {

    const [barraAtiva, setBarraAtiva] = useState(false);
    const animationProgress = useRef(new Animated.Value(0)).current;
    const textInputRef = useRef(null);

    const toggleBarra = () => {
        if (!barraAtiva) {
            setBarraAtiva(true);
            Animated.timing(animationProgress, {
                toValue: 1,
                duration: 350,
                useNativeDriver: false,
            }).start();
        } else {
            Keyboard.dismiss();
            Animated.timing(animationProgress, {
                toValue: 0,
                duration: 350,
                useNativeDriver: false,
            }).start(() => {
                setBarraAtiva(false);
            });
        }
    };

    const animatedWidth = animationProgress.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 280],
    });

    const inputOpacity = animationProgress.interpolate({
        inputRange: [0, 0.7, 1],
        outputRange: [0, 0, 1],
    });

    return (
        <Animated.View style={[styles.barraPesquisaBase, { width: animatedWidth }]}>
            <TouchableOpacity onPress={toggleBarra}>
                <Lupa width={20} height={20} color={CORES.branco} />
            </TouchableOpacity>

            {barraAtiva && (
                <Animated.View style={[styles.inputContainer, { opacity: inputOpacity }]}>
                    <TextInput
                        ref={textInputRef}
                        style={styles.input}
                        placeholder="Pesquisar produto..."
                        placeholderTextColor={CORES.branco}
                        autoFocus={true}
                        // Usando as props para controlar o componente
                        value={valor}
                        onChangeText={onValorChange}
                        onSubmitEditing={() => onBuscaSubmit(valor)} // Chama a função de busca ao submeter
                        returnKeyType="search" // Muda o botão "Enter" para "Buscar" no teclado
                    />
                </Animated.View>
            )}
        </Animated.View>
    );
}

// Mova os estilos relevantes para cá também
const styles = StyleSheet.create({
    barraPesquisaBase: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: CORES.azul,
        height: 50,
        borderRadius: 25,
        paddingHorizontal: 15,
        overflow: 'hidden',
        marginLeft: TAMANHOS.espacamentoMenor
    },
    inputContainer: {
        flex: 1,
    },
    input: {
        flex: 1,
        marginLeft: 10,
        fontSize: 16,
        color: CORES.branco,
    },
});