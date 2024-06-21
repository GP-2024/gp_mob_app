import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { Text } from 'react-native-paper'

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

const PlantCharacteristicsViewer = ({ characteristics, fontSizeProp=15 }) => {
    const renderItem = ({ item }) => (
        <View style={styles.row}>
            <View style={{ width: '50%', alignItems: 'flex-start' }}>
                <Text style={[styles.keyText, {fontSize:fontSizeProp}]}>{formatKey(item.key)}</Text>
            </View>

            <View style={{ width: '50%',alignItems: 'flex-start' }}>
                <Text style={[styles.valueText, {fontSize:fontSizeProp}]}>{formatValue(item.value)}</Text>
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
            ItemSeparatorComponent={() => <View style={styles.separator} />}
        />
    );
};

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        paddingRight: 15
    },
    keyText: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'left',
    },
    valueText: {
        color: 'black',
        textAlign: 'left',
    },
    separator: {
        height: 1,
        backgroundColor: '#D3D3D3',
        marginHorizontal: 15
    }
});

export default PlantCharacteristicsViewer;
