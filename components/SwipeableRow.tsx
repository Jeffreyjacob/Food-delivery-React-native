import Colors from '@/constants/Colors';
import { MaterialIcons } from '@expo/vector-icons';
import React, { Component, PropsWithChildren } from 'react';
import { Animated, StyleSheet, Text, View, I18nManager, TouchableOpacity } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';


type SwipableProps = {
    children: React.ReactNode;
    onDelete: () => void;
}

export default class AppleStyleSwipeableRow extends Component<
    PropsWithChildren<SwipableProps>
> {
    private renderRightAction = (
        text: string,
        color: string,
        x: number,
        progress: Animated.AnimatedInterpolation<number>
    ) => {
        const trans = progress.interpolate({
            inputRange: [0, 1],
            outputRange: [x, 0],
        });
        const pressHandler = () => {
            this.close()
            {
             text === 'More' ? this.props.onDelete():null
            }
        };

        return (
            <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
                <RectButton
                    style={[styles.rightAction, { backgroundColor: color }]}
                    onPress={pressHandler}>
                    <TouchableOpacity 
                    style={{backgroundColor:"#DF2C2C",padding:15,borderRadius:30}}>
                        <MaterialIcons name={text === 'More' ? "delete-outline":"favorite-border" } size={28} color="#fff" />
                    </TouchableOpacity>
                </RectButton>
            </Animated.View>
        );
    };

    private renderRightActions = (
        progress: Animated.AnimatedInterpolation<number>,
        _dragAnimatedValue: Animated.AnimatedInterpolation<number>
    ) => (
        <View
            style={{
                width: 152,
                flexDirection: I18nManager.isRTL ? 'row-reverse' : 'row',
            }}>
            {this.renderRightAction('Flag', '#F6F6F9', 98, progress)}
            {this.renderRightAction('More', '#F6F6F9', 34, progress)}
        </View>
    );

    private swipeableRow?: Swipeable;

    private updateRef = (ref: Swipeable) => {
        this.swipeableRow = ref;
    };
    private close = () => {
        this.swipeableRow?.close();
    };
    render() {
        const { children } = this.props;
        return (
            <Swipeable
                ref={this.updateRef}
                friction={2}
                enableTrackpadTwoFingerGesture
                rightThreshold={40}
                renderRightActions={this.renderRightActions}>
                {children}
            </Swipeable>
        );
    }
}

const styles = StyleSheet.create({
    leftAction: {
        flex: 1,
        backgroundColor: '#497AFC',
        justifyContent: 'center',
    },
    actionText: {
        color: 'white',
        fontSize: 16,
        backgroundColor: 'transparent',
        padding: 10,
    },
    rightAction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
    },
});