import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useLocalSearchParams, useRouter } from 'expo-router'
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';
import Colors from '@/constants/Colors';
import { Food } from '@/constants/FoodModal';
import ModalCard from '@/components/Modal';
import { db } from '@/firebase';

interface ItemAddedCart {
    mealId: string;
    mealName: string;
    mealPrice: string;
    mealImage: string;
}

const Page = () => {
    const navigate = useRouter();
    const { id } = useLocalSearchParams();
    const [foodDetails, setFoodDetails] = useState<Food>();
    const [loading, setLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [CartLoading, setCartLoading] = useState(false);
    const [ItemAddedToCart, setItemAddedToCart] = useState<any[]>();

    useEffect(() => {
        const FetchFoodDetails = async () => {
            setLoading(true)
            try {
                const food = await axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`).then(
                    res => {
                        setFoodDetails(res.data.meals[0])
                        setLoading(false)
                    }
                )
            } catch (err: any) {
                console.log(err.toJson())
                setLoading(false)
            }
        }
        const fetchData = async () => {
            try {
                const querySnapshot = await db.collection('Cart').onSnapshot(
                    docs => {
                        const items = docs.docs.map((doc) => ({
                            data: doc.data()
                        }))

                        console.log(items.map(item => item?.data.meals))
                        setItemAddedToCart(items.map(item => item.data.meals))
                    }
                )
            } catch (err) {
                console.error(err);
            }
        }
        fetchData()
        FetchFoodDetails()
    }, [id])

    const onModalClose = (modal: any) => {
        setModalVisible(modal)
    }
    const AddToCart = async () => {
        setCartLoading(true)
        try {
            await db.collection('Cart').add({
                meals: foodDetails
            })
            setCartLoading(false)
            onModalClose(true)
        } catch (err: any) {
            console.error(err)
            setCartLoading(false)
        }
    }

    const itemAddedId = ItemAddedToCart?.map((item) => item.idMeal);

    return (
        <View style={{ flex: 1, backgroundColor: "#F6F6F9" }}>
            <Stack.Screen options={{
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigate.back()}>
                        <Entypo name="chevron-left" size={30} color="black" />
                    </TouchableOpacity>
                ),
                headerRight: () => (
                    <TouchableOpacity style={{ paddingRight: 10 }}>
                        <MaterialIcons name="favorite-outline" size={26} color='black' />
                    </TouchableOpacity>
                )
            }} />
            {
                loading ? (<View style={{ flex: 1, justifyContent: 'center', alignItems: "center" }}>
                    <ActivityIndicator size='large' color={Colors.backgroundRed} />
                </View>) : (
                    <View style={{ flex: 1 }}>
                        {
                            modalVisible && (
                                <View>
                                    <ModalCard text='Item Added' visible={modalVisible} onclose={() => setModalVisible(false)} />
                                </View>
                            )
                        }

                        <View style={{ justifyContent: "center", alignItems: "center", paddingHorizontal: 25, paddingTop: 30 }}>
                            <View style={styles.plate}>
                                <Image source={{ uri: foodDetails?.strMealThumb }}
                                    style={{ width: 150, height: 150, borderRadius: 80 }}
                                />
                            </View>
                            <Text style={{
                                fontSize: 28, fontFamily: "SFSemiBold", width: 320, paddingTop: 20,
                                textAlign: 'center'
                            }}>
                                {foodDetails?.strMeal}
                            </Text>
                            <Text style={{
                                fontSize: 20, fontFamily: "SFSemiBold", color: Colors.backgroundRed,
                                paddingTop: 20
                            }}>
                                $15.00
                            </Text>
                            <View style={{ width: '100%', paddingTop: 20 }}>
                                <Text style={{ fontSize: 28, fontFamily: "SFSemiBold" }}>Ingredients</Text>
                                <Text style={{ fontSize: 18, fontFamily: "SFSemiBold", paddingTop: 10 }}>
                                    {foodDetails?.strIngredient1}, {foodDetails?.strIngredient2}, {foodDetails?.strIngredient3}, {foodDetails?.strIngredient4},
                                    {foodDetails?.strIngredient5}, {foodDetails?.strIngredient6}, {foodDetails?.strIngredient7}, {foodDetails?.strIngredient8},
                                    {foodDetails?.strIngredient9}, {foodDetails?.strIngredient10}
                                </Text>
                            </View>
                            <View style={{ paddingTop: 25 }}>
                                <Text style={{ fontSize: 22, fontFamily: "SFSemiBold" }}>Return Policy</Text>
                                <Text style={{ fontSize: 18, fontFamily: "SFRegular", paddingTop: 10 }}>
                                    All our foods are double checked before leaving our stores so by any case
                                    you found a broken food please contact our hotline immediately.
                                </Text>

                            </View>
                        </View>

                        <View style={{
                            justifyContent: 'center', alignItems: 'center', position: 'absolute', bottom: 50,
                            width: '100%'
                        }}>
                            {
                                CartLoading ? (
                                    <TouchableOpacity  style={{ padding: 25, backgroundColor: "#fc926d", borderRadius: 30, width: 314 }}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 10 }}>
                                            <ActivityIndicator color='#fff' />
                                            <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                                                ...Adding to Cart
                                            </Text>
                                        </View>
                                    </TouchableOpacity>
                                ) : (
                                    <View>
                                        {
                                            itemAddedId?.includes(foodDetails?.idMeal) ? (
                                                <TouchableOpacity style={{ padding: 25, backgroundColor: "#fc926d", borderRadius: 30, width: 314 }}>
                                                    <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                                                        Item Added to Cart
                                                    </Text>
                                                </TouchableOpacity>
                                            ) : (
                                                <TouchableOpacity onPress={AddToCart}
                                                    style={{ padding: 25, backgroundColor: "#FA4A0C", borderRadius: 30, width: 314 }}>
                                                    <Text style={{ fontFamily: "SFSemiBold", color: 'white', textAlign: "center", fontSize: 18 }}>
                                                        Add to Cart
                                                    </Text>
                                                </TouchableOpacity>
                                            )
                                        }

                                    </View>
                                )
                            }
                        </View>

                    </View>
                )
            }
        </View>
    )
}

const styles = StyleSheet.create({
    plate: {
        flexDirection: 'column',
        height: 210,
        width: 210,
        backgroundColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 130
    }
})

export default Page