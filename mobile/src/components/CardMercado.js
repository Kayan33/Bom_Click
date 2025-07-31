import React from 'react';
import { Text, Pressable, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { CORES, TAMANHOS, FONTES } from "../styles/styles";

const CardMercado = ({ item }) => {
    const navigation = useNavigation();
    const { LogoComponent } = item; 

    return (
        <Pressable 
            style={styles.infoCompras} 
            onPress={() => navigation.navigate('DadosMercado', { mercadoId: item.id })}
        >
            <LogoComponent />
            <Text style={styles.TextoLinkDadosMercado}>Veja suas compras</Text>
        </Pressable>
    );
};


const styles = StyleSheet.create({
    infoCompras: {
        alignItems: 'center',
        marginHorizontal: TAMANHOS.espacamentoMenor,
    },
    TextoLinkDadosMercado: {
        fontFamily: FONTES.fonteBold,
        color: CORES.azul,
        fontSize: TAMANHOS.fontePequena,
        marginTop: TAMANHOS.espacamentoPequeno,
    },
});

export default CardMercado;