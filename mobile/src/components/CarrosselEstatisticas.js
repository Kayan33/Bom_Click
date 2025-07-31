import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Animated, Pressable } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

import { CORES, TAMANHOS, FONTES } from '../styles/styles';

const ITEM_WIDTH = 160;
const ESPACO_ENTRE_ITENS = 15;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ESPACO_ENTRE_ITENS;

const SPACER_WIDTH = (windowWidth - ITEM_WIDTH) / 2;

const ItemDoCarrossel = ({ item, scrollX, index, onPress }) => {
    if (item.type === 'spacer') {
        return <View style={{ width: item.width }} />;
    }

    const inputRange = [
        (index - 2) * ITEM_FULL_WIDTH,
        (index - 1) * ITEM_FULL_WIDTH,
        index * ITEM_FULL_WIDTH,
    ];
 
    const scale = scrollX.interpolate({
        inputRange,
        outputRange: [0.85, 1.1, 0.85],
        extrapolate: 'clamp',
    });

    return (
        <Pressable onPress={onPress}>
            <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
                <Text style={styles.itemTitulo}>{item.titulo}</Text>
                <Text style={styles.itemValor}>{item.valor}</Text>
            </Animated.View>
        </Pressable>
    );
};


const CarrosselEstatisticas = ({ data }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);
    
    const { loopedData, dataLength } = useMemo(() => {
        const dataLength = data.length;
        if (dataLength === 0) return { loopedData: [], dataLength: 0 };
        const firstItems = data.slice(0, 3);
        const lastItems = data.slice(-3);
        return {
            loopedData: [
                { id: 'spacer-left', type: 'spacer', width: SPACER_WIDTH - ESPACO_ENTRE_ITENS / 2 },
                ...lastItems,
                ...data,
                ...firstItems,
                { id: 'spacer-right', type: 'spacer', width: SPACER_WIDTH - ESPACO_ENTRE_ITENS / 2 },
            ],
            dataLength,
        };
    }, [data]);
    const handleMomentumScrollEnd = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(scrollPosition / ITEM_FULL_WIDTH);

        if (currentIndex < 3) {
            const newIndex = currentIndex + dataLength;
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: false });
        } else if (currentIndex >= dataLength + 3) {
            const newIndex = currentIndex - dataLength;
            flatListRef.current?.scrollToIndex({ index: newIndex, animated: false });
        }
    };

    if (data.length === 0) return null;

    return (
        <View>
            <Animated.FlatList
                ref={flatListRef}
                data={loopedData}
                keyExtractor={(item, index) => `${item.id}-${index}`}
                horizontal
                showsHorizontalScrollIndicator={false}
                snapToInterval={ITEM_FULL_WIDTH}
                decelerationRate="fast"
                bounces={false}
                contentContainerStyle={{ gap: ESPACO_ENTRE_ITENS, paddingVertical: 10 }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                initialScrollIndex={3}
                getItemLayout={(_, index) => ({
                    length: ITEM_FULL_WIDTH,
                    offset: ITEM_FULL_WIDTH * index,
                    index,
                })}
                renderItem={({ item, index }) => (
                    <ItemDoCarrossel
                        item={item}
                        scrollX={scrollX}
                        index={index}
                        onPress={() => {
                            if (item.type !== 'spacer') {
                                flatListRef.current?.scrollToIndex({ index, animated: true });
                            }
                        }}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: 160,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: CORES.azul,
        borderRadius: TAMANHOS.bordaRaio,
        padding: TAMANHOS.espacamentoPequeno,
    },
    itemTitulo: {
        color: CORES.amarelo,
        fontSize: TAMANHOS.fontePequena,
        fontFamily: FONTES.fonteBold,
        textAlign: 'center',
        marginBottom: 5,
    },
    itemValor: {
        fontSize: TAMANHOS.fonteSegundaria,
        fontFamily: FONTES.fonteBold,
        color: CORES.amarelo,
    },
});

export default CarrosselEstatisticas;