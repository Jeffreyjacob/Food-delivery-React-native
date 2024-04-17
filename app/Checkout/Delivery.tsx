import { View, Text, TouchableOpacity, Animated, StyleSheet } from 'react-native'
import React from 'react'
import { Stack, useRouter } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import { useUser } from '@clerk/clerk-expo'
import { RadioButton } from 'react-native-paper'

const Delivery = () => {
    const navigate = useRouter()
    const { user } = useUser();
    const [delivery, setDelivery] = React.useState('DoorDelivery');
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
                {/**Address details*/}
                <Animated.View>
                    <Text style={{ fontSize: 34, fontFamily: "SFSemiBold" }}>Delivery</Text>

                    <View style={{ paddingTop: 35, justifyContent: "center", alignItems: 'center' }}>
                        <View style={{
                            flexDirection: 'row', justifyContent: "space-between",
                            paddingHorizontal: 15, width: "100%", paddingBottom: 20
                        }}>
                            <Text style={{ fontFamily: "SFSemiBold", fontSize: 18 }}>
                                Address details
                            </Text>
                            <Text style={{ fontFamily: "SFRegular", fontSize: 16, color: "#F47B0A" }}>
                                Change
                            </Text>
                        </View>

                        <View style={{
                            backgroundColor: '#fff', width: 315, height: 156, borderRadius: 20,
                            justifyContent: "center", alignItems: 'center'
                        }}>
                            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#9F9F9F" }}>
                                <Text style={[styles.cardName, { borderBottomWidth: 1 }]}>
                                    {user?.firstName}
                                </Text>
                            </View>

                            <View style={{ borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: "#9F9F9F" }}>
                                <Text style={styles.cardText}>
                                    No 11 fountain street pako baruwo lagos Nigeria
                                </Text>
                            </View>

                            <Text style={styles.cardText}>
                                +2347082406281
                            </Text>
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
                                justifyContent:'space-between'
                            }}>
                                <Text style={{ fontFamily: "SFRegular", fontSize: 18 }}>
                                    Door delivery
                                </Text>
                                <View>
                                    <RadioButton value="DoorDelivery" />
                                </View>
                            </View>
                            <View style={{ flexDirection: "row", alignItems: "center", gap: 10,
                                justifyContent:'space-between'
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

                <View style={{ paddingHorizontal: 15, paddingTop: 30,flexDirection:'row',justifyContent:"space-between",
                    alignItems:'center'
                 }}>
                    <Text style={{fontFamily:"SFRegular",fontSize:17}}>
                        Total
                    </Text>
                    <Text style={{fontFamily:"SFSemiBold",fontSize:22}}>
                        $125.00
                    </Text>
                </View>

                {/**Button */}
                <View style={{ justifyContent: 'center', alignItems: "center", paddingTop: 40 }}>
                    <TouchableOpacity onPress={()=>navigate.navigate('/Checkout/Payment')}
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

const styles = StyleSheet.create({
    cardText: {
        fontFamily: "SFRegular",
        fontSize: 16,
        width: 270,
        paddingVertical: 13,
    },
    cardName: {
        fontFamily: "SFMeduim",
        fontSize: 18,
        width: 270,
        paddingVertical: 13,
    }
})

export default Delivery