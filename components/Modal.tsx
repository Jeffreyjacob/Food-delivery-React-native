import { View, Text, Modal, StyleSheet, Touchable, TouchableOpacity, } from 'react-native'
import React from 'react';
import Colors from '@/constants/Colors';
import Animated, { FadeInLeft, FadeOutRight } from 'react-native-reanimated';
import { AntDesign } from '@expo/vector-icons';

interface Props {
    visible: boolean,
    text: string,
    onclose: () => void
}

const ModalCard = ({ visible, text, onclose }: Props) => {
    return (

        <Modal
            animationType='fade'
            visible={visible}
            transparent={true}
            onRequestClose={onclose}
        >
            <Animated.View entering={FadeInLeft} exiting={FadeOutRight}
                style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <TouchableOpacity onPress={onclose}>
                    <View style={styles.card}>
                        <Text style={{ textAlign: "center", fontFamily: "SFSemiBold", fontSize: 22,
                        paddingBottom:20 }}>
                            {text}
                        </Text>
                        <AntDesign name="checkcircle" size={50} color="green" />
                    </View>
                </TouchableOpacity>
            </Animated.View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        width: 160,
        height: 160,
        elevation: 4,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 30
    }
})

export default ModalCard