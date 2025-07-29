import React, { useRef, useMemo } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, Animated } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');

const ITEM_WIDTH = 90;
const ESPACO_ENTRE_ITENS = 10;
const ITEM_FULL_WIDTH = ITEM_WIDTH + ESPACO_ENTRE_ITENS;
const ESPACO_INICIAL_ESQUERDA = 30;
const ESPACO_FINAL_DIREITA = windowWidth - ITEM_WIDTH - ESPACO_INICIAL_ESQUERDA;


const ItemDoCarrossel = ({ item, scrollX, index }) => {
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
        outputRange: [1, 1.5, 1],
        extrapolate: 'clamp',
    });

    return (
        <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
            <Text style={styles.itemLabel}>{item.label}</Text>
        </Animated.View>
    );
};


const CarrosselCategorias = ({ data }) => {
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef(null);

    const { loopedData, dataLength } = useMemo(() => {
        const dataLength = data.length;

        const firstItems = data.slice(0, dataLength);
        const lastItems = data.slice(-dataLength);
        return {
            loopedData: [
                { id: 'spacer-left', type: 'spacer', width: ESPACO_INICIAL_ESQUERDA - ESPACO_ENTRE_ITENS },
                ...lastItems,
                ...data,
                ...firstItems,
                { id: 'spacer-right', type: 'spacer', width: ESPACO_FINAL_DIREITA },
            ],
            dataLength,
        };
    }, [data]);

    const handleMomentumScrollEnd = (event) => {
        const scrollPosition = event.nativeEvent.contentOffset.x;
        const currentIndex = Math.floor(scrollPosition / ITEM_FULL_WIDTH);

        if (currentIndex < dataLength) {
            const newIndex = currentIndex + dataLength;
            const newOffset = newIndex * ITEM_FULL_WIDTH;
            flatListRef.current?.scrollToOffset({ offset: newOffset, animated: false });
        }

        else if (currentIndex >= dataLength * 2) {
            const newIndex = currentIndex - dataLength;
            const newOffset = newIndex * ITEM_FULL_WIDTH;
            flatListRef.current?.scrollToOffset({ offset: newOffset, animated: false });
        }
    };

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
                contentContainerStyle={{ gap: ESPACO_ENTRE_ITENS }}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: true }
                )}
                scrollEventThrottle={16}
                onMomentumScrollEnd={handleMomentumScrollEnd}
                initialScrollIndex={dataLength}
                getItemLayout={(_, index) => ({
                    length: ITEM_FULL_WIDTH,
                    offset: ITEM_FULL_WIDTH * index,
                    index,
                })}
                renderItem={({ item, index }) => (
                    <ItemDoCarrossel item={item} scrollX={scrollX} index={index} />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        width: ITEM_WIDTH,
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#003366',
        textAlign: 'center',
    },
});

export default CarrosselCategorias;