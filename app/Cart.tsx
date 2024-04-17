import { View, Text, TouchableOpacity, ScrollView, FlatList, ActivityIndicator, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router'
import { Entypo } from '@expo/vector-icons'
import Colors from '@/constants/Colors'
import { db } from '@/firebase'
import { Food } from '@/constants/FoodModal'
import Animated, { FadeInDown, FadeInUp, SlideOutLeft } from 'react-native-reanimated'
import CartCard from '@/components/CartCard'
import AppleStyleSwipeableRow from '@/components/SwipeableRow'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

const Cart = () => {
    const navigate = useRouter();
    const [Cart, setCart] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchCart = async () => {
            setLoading(true)
            try {
                await db.collection('Cart').onSnapshot(
                    docs => {
                        const items = docs.docs.map((doc) => ({
                            id:doc.id,
                            data: doc.data()
                        }))
                        setCart(items)
                        setLoading(false)
                    }
                )
            } catch (err) {
                console.error(err)
                setLoading(false)
            }
        }
        fetchCart()
    }, [])

    const onDeleteCartHandler = async (id:any) => {
        try{
          await db.collection('Cart').doc(id).delete();
        }catch(err){
            console.error(err)
        }
    }
    return (
        <View style={{ flex: 1, backgroundColor: "#F6F6F9" }}>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigate.back()}
                        style={{ alignItems: "center",paddingVertical:7}}>
                        <Entypo name="chevron-left" size={30} color="black" />
                    </TouchableOpacity>
                ),
                headerTitleStyle:{
                    fontSize:20
                }
            }} />

            {
                loading ? (<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                    <ActivityIndicator size='large' color={Colors.backgroundRed} />
                </View>) : (
                    <View style={{ flex: 1, position: "relative" }}>
                        <ScrollView contentContainerStyle={{
                            paddingHorizontal: 20,
                            justifyContent: "center",
                            alignItems: "center",
                            paddingTop: 40
                        }}>
                            <FlatList
                                data={Cart}
                                keyExtractor={(item) => item?.data?.meals?.idMeal}
                                renderItem={({ item, index }) => (
                                    <Animated.View style={{paddingVertical:13}} entering={FadeInUp.delay(index * 10)} exiting={SlideOutLeft.delay(10)}>
                                        <AppleStyleSwipeableRow onDelete={()=>onDeleteCartHandler(item.id)}>
                                            <View style={{
                                                width: 330, backgroundColor: "#fff", borderRadius: 30, paddingVertical: 15,
                                                paddingHorizontal: 20, flexDirection: 'row', gap: 10, alignItems: 'center', justifyContent: 'center'
                                            }}>
                                                <View style={styles.plate}>
                                                    <Image source={{ uri: item?.data?.meals?.strMealThumb }}
                                                        style={{ width: 50, height: 50, borderRadius: 40 }} />
                                                </View>
                                                <View style={{ width: 200, gap: 5 }}>
                                                    <Text style={{ fontFamily: 'SFSemiBold', fontSize: 17 }}>{item?.data?.meals?.strMeal}</Text>
                                                    <Text style={{ fontFamily: 'SFSemiBold', fontSize: 17, color: Colors.backgroundRed }}>
                                                        $15.00
                                                    </Text>
                                                </View>
                                            </View>
                                        </AppleStyleSwipeableRow>
                                    </Animated.View>

                                )}
                            />
                        </ScrollView>
                        {/**Button */}
                        <Animated.View entering={FadeInDown.delay(10)} style={{
                            width: '100%',
                            justifyContent: "center", alignItems: 'center'
                        }} >
                            <View style={{ position: 'absolute', bottom: 50 }}>
                                <TouchableOpacity onPress={()=>navigate.navigate('/Checkout/Delivery')}
                                    style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, width: 314, }}>
                                    <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                                        Complete Order
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                )
            }
        </View >
    )
}

const styles = StyleSheet.create({
    plate: {
        flexDirection: 'column',
        height: 70,
        width: 70,
        backgroundColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 130
    }
})

export default Cart