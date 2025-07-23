import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { AutenticadoContexto } from '../Context/authContext'
import LogoBomClick from "../components/icones/BomClick";
import LogoCarinho from "../components/icones/Carinho";

import { CORES, TAMANHOS } from "../styles/styles";

export default function Inicial() {

     const { autenticado, abrirModalLogin } = useContext(AutenticadoContexto);

    const insets = useSafeAreaInsets();

    const navigation = useNavigation();

     function navegar() {
    if (autenticado) {
      navigation.navigate('Perfil');
    } else {
      abrirModalLogin();
    }
  }

    return (
        <SafeAreaView style={{ flex: 1}}>

            <View style={[styles.cabecalho, { paddingTop: insets.top }]}>

                <LogoBomClick />
                <LogoCarinho />

            </View>


            <Text> Página Inicial</Text>

            <View>

            </View>

            <TouchableOpacity onPress={navegar}>

                <Text>Olá!</Text>

            </TouchableOpacity>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1
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

    titulo: {

    }
})