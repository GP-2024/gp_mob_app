import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, LayoutAnimation, UIManager, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
}

const CollapsibleContent = ({
    leftIconName = 'star',
    leftIconSize = 20,
    leftIconColor = 'black',
    title,
    children
}) => {
    const [collapsed, setCollapsed] = useState(true);
    const [animation] = useState(new Animated.Value(collapsed ? 0 : 1))

    const toggleCollapse = () => {
        Animated.timing(animation, {
            toValue: collapsed ? 1 : 0,
            duration: 300,
            useNativeDriver: true,
        }).start();
        setCollapsed(!collapsed);
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    };

    const arrowRotation = animation.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '180deg'],
    });

    const contentScale = animation.interpolate({
        inputRange: [1, 1],
        outputRange: [1, 1],
    });

    const contentOpacity = animation.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1],
    });

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.leftSection}>
                    <View style={{
                        minWidth: 25,
                        alignItems: "center",
                        justifyContent: 'center',

                    }}>
                        <Icon name={leftIconName} size={leftIconSize} color={leftIconColor} solid />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                </View>
                <TouchableOpacity onPress={toggleCollapse}>
                    <Animated.View style={{ transform: [{ rotate: arrowRotation }] }}>
                        <Icon name="chevron-up" size={leftIconSize} color={leftIconColor} />
                    </Animated.View>
                </TouchableOpacity>
            </View>
            <View style={styles.divider} />
            <Animated.View style={{ opacity: contentOpacity, transform: [{ scaleY: contentScale }] }}>
                {collapsed ? null : <View style={styles.content}>{children}</View>}
            </Animated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 15,
        backgroundColor: 'white',
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    title: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black',
    },
    divider: {
        height: 1,
        backgroundColor: 'grey',
        width: '100%',
    },
    content: {
        overflow: 'hidden',
    },
});

export default CollapsibleContent;
