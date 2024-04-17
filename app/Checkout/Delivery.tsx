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
                            <Text style={[styles.cardName, { borderBottomWidth: 1 }]}>
                                {user?.firstName}
                            </Text>
                            <Text style={styles.cardText}>
                                No 11 fountain street pako baruwo lagos Nigeria
                            </Text>
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
                        justifyContent: "center", alignItems: 'center'
                    }}>
                        <RadioButton.Group onValueChange={newValue => setDelivery(newValue)} value={delivery}>
                            <View style={{flexDirection:'row',alignItems:"center"}}>
                                <View style={{}}>
                                <RadioButton value="DoorDelivery" />
                                </View>
                                <Text>First</Text>
                            </View>
                            <View>
                                <Text>Second</Text>
                                <RadioButton value="Pickup" />
                            </View>
                        </RadioButton.Group>
                    </View>
                </Animated.View>

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
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: "#9F9F9F"
    }
})

export default Delivery