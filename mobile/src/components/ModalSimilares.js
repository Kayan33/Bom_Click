import React from 'react';
import { Modal, View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, FlatList } from 'react-native';
import { CORES, TAMANHOS } from '../styles/styles';

const formatarUrlImagem = (url) => {
    if (url && url.startsWith('//')) return `https:${url}`;
    return url;
};

const ListItem = ({ item, onSelect }) => (
    <TouchableOpacity style={styles.listItem} onPress={onSelect}>
        <Image source={{ uri: formatarUrlImagem(item.imageUrl) }} style={styles.itemImage} />
        <View style={styles.itemInfo}>
            <Text style={styles.itemTitle} numberOfLines={2}>{item.title}</Text>
            <Text style={styles.itemPrice}>{item.price}</Text>
        </View>
    </TouchableOpacity>
);

const ModalSimilares = ({ visible, onClose, produtos, onProdutoSelect }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.modalOverlay}>
                <SafeAreaView style={styles.modalContainer}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={onClose} style={styles.backButton}>
                            <Text style={styles.backButtonText}>{"<"}</Text>
                        </TouchableOpacity>
                        <Text style={styles.headerTitle}>Produtos similares</Text>
                    </View>
                    <FlatList
                        data={produtos}
                        renderItem={({ item }) => (
                            <ListItem
                                item={item}
                                onSelect={() => onProdutoSelect(item)}
                            />
                        )}
                        keyExtractor={(item) => `${item.id}-${item.title}`}
                        contentContainerStyle={styles.listContent}
                    />
                </SafeAreaView>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        backgroundColor: CORES.azul,
        borderRadius: 24, // Aumentei o raio para ficar mais parecido com a imagem
        width: '90%',
        height: '70%',
        padding: TAMANHOS.espacamentoPequeno,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingBottom: TAMANHOS.espacamentoPequeno,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.2)',
    },
    backButton: {
        padding: 10,
    },
    backButtonText: {
        color: CORES.branco,
        fontSize: 24,
        fontWeight: 'bold',
    },
    headerTitle: {
        color: CORES.branco,
        fontSize: 20, // Ajustei o tamanho
        fontWeight: 'bold',
        marginLeft: 15,
    },
    listContent: {
        paddingTop: 10,
    },
    listItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    },
    itemImage: {
        width: 60,
        height: 60,
        borderRadius: TAMANHOS.bordaRaio,
        backgroundColor: CORES.branco,
    },
    itemInfo: {
        flex: 1,
        marginLeft: 15,
    },
    itemTitle: {
        color: CORES.branco,
        fontSize: 16, // Aumentei um pouco para melhor leitura
        fontWeight: '600',
    },
    itemPrice: {
        color: CORES.amarelo,
        fontSize: 16, // Aumentei um pouco para melhor leitura
        fontWeight: 'bold',
        marginTop: 5,
    },
});

export default ModalSimilares;