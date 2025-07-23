import React, { useContext } from "react";
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image } from "react-native";
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from "@react-navigation/native";
import { AutenticadoContexto } from '../Context/authContext'
import LogoBomClick from "../components/icones/BomClick";
import LogoCarinho from "../components/icones/Carinho";
import LogoPerfil from "../components/icones/Perfil";

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
        <SafeAreaView style={{ flex: 1 }}>

            <View style={[styles.cabecalho, { paddingTop: insets.top }]}>

                <LogoBomClick />
                <LogoCarinho />

            </View>

            <Text style={styles.tituloPrincipal}>Tudo o que você precisa para economizar em um só lugar!</Text>

            <TouchableOpacity style={styles.botaoPerfil}
                onPress={navegar}
            >

                <LogoPerfil />
                <Text style={styles.botaoPerfilTexto}>Veja suas economias e estatisticas!</Text>

            </TouchableOpacity>

            <View style={styles.promocoes}>

                <Text style={styles.promocoesTitulo}>Promoções do dia!</Text>

                <View>

                    <View style={styles.promocoesCarossel}>

                        <Image></Image>

                        <View>

                            <Text>Fraldinha Bovina Resfriada KG</Text>

                            <View>

                                <Text>R$40,00</Text>

                                <Image></Image>

                                <TouchableOpacity>

                                    <Text>Adicionar a compra</Text>

                                </TouchableOpacity>

                            </View>

                        </View>

                    </View>

                </View>

            </View>



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

    tituloPrincipal: {

        color: CORES.azul,
        fontSize: TAMANHOS.fonteTitulo,
        fontWeight: "700",
        textAlign: "center",
        marginHorizontal: TAMANHOS.espacamentoMenor,
        marginVertical: TAMANHOS.espacamentoMaior
    },

    botaoPerfil: {

        alignItems: "center",
        backgroundColor: CORES.azul,
        borderRadius: TAMANHOS.bordaRaio,
        flexDirection: 'row',
        marginHorizontal: TAMANHOS.espacamentoMaior,
        padding: TAMANHOS.espacamentoPequeno

    },

    botaoPerfilTexto: {

        color: CORES.amarelo,
        fontSize: TAMANHOS.fonteSegundaria,
        fontWeight: "600",
        marginHorizontal: "auto"
    },

    promocoes: {

        backgroundColor: CORES.amarelo,
        marginVertical: TAMANHOS.espacamentoMaior,
        padding: TAMANHOS.espacamentoMenor,
    },

    promocoesTitulo: {

        color: CORES.azul,
        fontSize: TAMANHOS.fonteSegundaria,
        fontWeight: "700",

    },

    promocoesCarossel: {

        backgroundColor: CORES.branco,
        borderRadius: TAMANHOS.bordaRaio,
        padding: TAMANHOS.espacamentoPequeno
    }


})