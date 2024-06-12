import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const formatKey = (key) => {
    if (!key) return '';
    return key
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};

const formatValue = (value) => {
    if (!value) return '';
    if (Array.isArray(value)) {
        return value.map(item => formatKey(item)).join(', and ');
    }
    return formatKey(value.toString());
};

const PlantCharacteristicsViewer = ({ characteristics }) => {
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={{ width: '50%', alignItems: 'flex-start' }}>
                <Text style={styles.keyText}>{formatKey(item.key)}</Text>
            </View>

            <View style={{ width: '50%',alignItems: 'flex-start' }}>
                <Text style={styles.valueText}>{formatValue(item.value)}</Text>
            </View>

        </View>
    );

    const data = Object.keys(characteristics).map(key => ({
        key,
        value: characteristics[key]
    }));

    return (
        <FlatList
            style={{
                // borderWidth: 1,
                // borderColor: 'red',
                width: '100%',
            }}
            data={data}
            renderItem={renderItem}
            keyExtractor={item => item.key}
            // ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
        paddingRight: 15
    },
    keyText: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
        fontSize: 12,
    },
    valueText: {
        color: 'black',
        textAlign: 'left',
        fontSize: 12,
    },
    separator: {
        height: 1,
        backgroundColor: '#D3D3D3',
        marginHorizontal: 15
    }
});

export default PlantCharacteristicsViewer;
