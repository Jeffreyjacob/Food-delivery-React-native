import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { Modal, Portal } from 'react-native-paper'
import Animated, { FadeInLeft, FadeInUp, FadeOutDown, FadeOutRight } from 'react-native-reanimated'
import Colors from '@/constants/Colors'

interface Props {
    visible: boolean,
    onClose: () => void
}

const PaymentModal = ({ visible, onClose }: Props) => {
    return (
        <Portal>
            <Modal visible={visible} onDismiss={onClose}
                contentContainerStyle={{
                    backgroundColor: 'white',
                    marginHorizontal: 30,
                    borderRadius: 30
                }}>
                <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
                    <View>
                        {/**header */}
                        <View style={{
                            paddingVertical: 20, backgroundColor: "#EDEDED", borderTopRightRadius: 30,
                            borderTopLeftRadius: 30,paddingHorizontal:10
                        }}>
                            <Text style={{ fontFamily: "SFSemiBold", fontSize: 22,paddingHorizontal:40 }}>
                                Please note
                            </Text>
                        </View>
                        {/**body */}
                        <View style={{ paddingTop: 30, justifyContent: "center", alignItems: "center", gap: 15 }}>
                            <View style={{width:230,borderBottomWidth:StyleSheet.hairlineWidth}}>
                                <Text style={{ fontFamily: "SFSemiBold", fontSize: 18, color: "#9F9F9F", textTransform: "uppercase" }}>
                                    Delivery to Mainland
                                </Text>
                                <Text style={{ fontFamily: "SFSemiBold", fontSize: 18, textTransform: "uppercase",
                                    paddingBottom:15
                                 }}>
                                    $5.00 - $10.00
                                </Text>
                            </View>
                            <View style={{paddingBottom:15,width:230}} >
                                <Text style={{ fontFamily: "SFSemiBold", fontSize: 18, color: "#9F9F9F", textTransform: "uppercase" }}>
                                    Delivery to Mainland
                                </Text>
                                <Text style={{ fontFamily: "SFSemiBold", fontSize: 18, textTransform: "uppercase" }}>
                                    $5.00 - $10.00
                                </Text>
                            </View>
                        </View>
                        {/**Button */}
                        <View style={{ flexDirection: 'row',paddingTop:20,paddingBottom:30,justifyContent:"center" }}>
                            <TouchableOpacity style={{width:150, borderRadius: 30,height:60,
                                    alignItems:"center",justifyContent:"center"}}>
                                <Text style={{ fontFamily: "SFSemiBold", color:'#9F9F9F', textAlign: "center", fontSize: 18 }}>
                                    Cancel
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={onClose}
                                style={{ width: 150, backgroundColor: Colors.backgroundRed, borderRadius: 30,height:60,
                                    alignItems:"center",justifyContent:"center"
                                }}
                            >
                                <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                                    Proceed
                                </Text>
                            </TouchableOpacity>

                        </View>

                    </View>
                </Animated.View>
            </Modal>
        </Portal>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
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

export default PaymentModal