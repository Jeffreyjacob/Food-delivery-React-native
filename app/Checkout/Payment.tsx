import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { AntDesign, Entypo, MaterialCommunityIcons } from '@expo/vector-icons'
import { RadioButton } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import Colors from '@/constants/Colors'

const Payment = () => {
    const navigate = useRouter()
    const [delivery, setDelivery] = React.useState('DoorDelivery');
    const [payment, setPayment] = React.useState('Card');
    return (
        <View style={{ flex: 1, backgroundColor: "#F6F6F9" }}>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigate.back()}
                        style={{ alignItems: "center" }}>
                        <Entypo name="chevron-left" size={30} color="black" />
                    </TouchableOpacity>
                ),
                headerTitleStyle: {
                    fontSize: 20
                }
            }} />
            <View style={{ paddingHorizontal: 30, paddingVertical: 25 }}>
                {/**payment Method*/}
                <Animated.View>
                    <Text style={{ fontSize: 34, fontFamily: "SFSemiBold" }}>Payment</Text>

                    <View style={{ paddingTop: 35, justifyContent: "center", alignItems: 'center' }}>
                        <View style={{ paddingHorizontal: 15, width: "100%", paddingBottom: 20 }}>
                            <Text style={{ fontFamily: "SFSemiBold", fontSize: 18 }}>
                                Payment Method
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: '#fff', width: 315, height: 156, borderRadius: 20,
                            justifyContent: "center", paddingHorizontal: 25
                        }}>
                            <RadioButton.Group onValueChange={newValue => setPayment(newValue)} value={payment}>
                                <View style={{
                                    flexDirection: 'row', alignItems: "center", gap: 10, marginBottom: 15,
                                    borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "9F9F9F", paddingBottom: 10,
                                    justifyContent:'space-between'
                                }}>

                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        {/**Icon */}
                                        <View style={{ padding: 10, backgroundColor: Colors.paymentCard, borderRadius: 10 }}>
                                            <AntDesign name="creditcard" size={20} color="white" />
                                        </View>
                                        <Text style={{ fontFamily: "SFRegular", fontSize: 18 }}>
                                            Card
                                        </Text>
                                    </View>

                                    <View>
                                        <RadioButton value="Card" />
                                    </View>

                                </View>
                                <View style={{ flexDirection: "row", alignItems: "center", gap: 10,
                                justifyContent:"space-between"}}>

                                    <View style={{ flexDirection: 'row', gap: 10, alignItems: 'center' }}>
                                        {/**Icon */}
                                        <View style={{ padding: 10, backgroundColor: Colors.paymentBank, borderRadius: 10 }}>
                                        <MaterialCommunityIcons name="bank" size={20} color="white" />
                                        </View>
                                        <Text style={{ fontFamily: "SFRegular", fontSize: 18 }}>
                                            Bank Account
                                        </Text>
                                    </View>

                                    <View>
                                        <RadioButton value="BankTransfer" />
                                    </View>

                                </View>
                            </RadioButton.Group>


                        </View>

                    </View>
                </Animated.View>

                {/**Delievery method */}
                <Animated.View style={{ paddingTop: 50, paddingHorizontal: 16 }}>
                    <Text style={{ fontFamily: "SFSemiBold", fontSize: 18, paddingBottom: 20 }}>
                        Delivery Method
                    </Text>
                    <View style={{
                        backgroundColor: '#fff', width: 315, height: 156, borderRadius: 20,
                        justifyContent: "center", paddingHorizontal: 20
                    }}>
                        <RadioButton.Group onValueChange={newValue => setDelivery(newValue)} value={delivery}>
                            <View style={{
                                flexDirection: 'row', alignItems: "center", gap: 10, marginBottom: 15,
                                borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "9F9F9F", paddingBottom: 10,
                                justifyContent:"space-between"
                            }}>
                                <Text style={{ fontFamily: "SFRegular", fontSize: 18 }}>
                                    Door delivery
                                </Text>
                                <View>
                                    <RadioButton value="DoorDelivery" />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10,
                                justifyContent:"space-between"
                             }}>
                                <Text style={{ fontFamily: "SFRegular", fontSize: 18 }}>
                                    Pickup
                                </Text>
                                <View>
                                    <RadioButton value="Pickup" />
                                </View>

                            </View>
                        </RadioButton.Group>
                    </View>
                </Animated.View>

                <View style={{
                    paddingHorizontal: 15, paddingTop: 30, flexDirection: 'row', justifyContent: "space-between",
                    alignItems: 'center'
                }}>
                    <Text style={{ fontFamily: "SFRegular", fontSize: 17 }}>
                        Total
                    </Text>
                    <Text style={{ fontFamily: "SFSemiBold", fontSize: 22 }}>
                        $125.00
                    </Text>
                </View>

                {/**Button */}
                <View style={{ justifyContent: 'center', alignItems: "center", paddingTop: 40 }}>
                    <TouchableOpacity onPress={() => navigate.navigate('/Checkout/Payment')}
                        style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, width: 314, }}
                    >
                        <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                            Proceed to Payment
                        </Text>
                    </TouchableOpacity>
                </View>

            </View>
        </View>
    )
}

export default Payment