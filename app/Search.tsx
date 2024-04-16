import { View, Text, TouchableOpacity, TextInput, StyleSheet, ActivityIndicator, FlatList, ScrollView, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Stack, useRouter } from 'expo-router';
import { Entypo, Feather, Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';
import axios from 'axios';
import Animated, { FadeInUp } from 'react-native-reanimated';
import Food from '@/components/Food';

const Search = () => {
    const navigate = useRouter();
    const [search, setSearch] = useState('');
    const [SearchFoodData, setSearchFoodData] = useState<any[]>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const SearchResult = async () => {
            setLoading(true)
            try {
                const result = await axios.get(`https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`).then(
                    res => {
                        setSearchFoodData(res.data.meals)
                        console.log(res.data.meals)
                        setLoading(false)
                    }
                )
            } catch (err: any) {
                console.log(err.toJSON());
                setLoading(false);
            }
        }
        SearchResult()
    }, [search])
    const itemRow = 2
    return (
        <View style={{ flex: 1 }}>
            <Stack.Screen options={{
                headerStyle: { backgroundColor: Colors.backgroundGrey },
                headerTitle: () => (
                    <TouchableOpacity style={{ flexDirection: "row", gap: 10, width: 250, alignItems: "center" }}>
                        <TextInput placeholder='Search Here' placeholderTextColor={'grey'}
                            style={{ fontFamily: "SFRegular", paddingVertical: 20, fontSize: 20 }} onChangeText={setSearch} />
                    </TouchableOpacity>
                ),
                headerLeft: () => (
                    <TouchableOpacity onPress={() => navigate.back()}
                        style={{ alignItems: "center", paddingVertical: 15 }}>
                        <Entypo name="chevron-left" size={30} color="black" />
                    </TouchableOpacity>
                )
            }} />
            <View style={styles.searchContainer}>
                {
                    loading ? (<View style={{ paddingTop: 100 }}>
                        <ActivityIndicator size='large' color={Colors.backgroundRed} />
                    </View>) : (
                        <View>
                            <Text style={{ textAlign: 'center', fontFamily: "SFRegular",fontSize:25,padding:30}}>
                                Found {SearchFoodData?.length} Results
                            </Text>
                            {
                                   SearchFoodData === null ? ( // Check if SearchFoodData is empty
                                <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
                                  <Text style={{ fontFamily: 'SFRegular', fontSize: 18 }}>No results found.</Text>
                                </View>):(
                                     <FlatList
                                     data={SearchFoodData}
                                     keyExtractor={(item) => item?.idMeal}
                                     renderItem={({ item, index }) => (
                                         <Animated.View style={{ marginTop: 70 }} entering={FadeInUp.delay(index * 10)}>
                                            <TouchableOpacity onPress={()=>navigate.navigate(`/FoodDetails/${item.idMeal}`)}>
                                             <View style={{
                                                 backgroundColor: "#fff", height: 150, width: 150, marginHorizontal: 20, borderRadius: 30,
                                                 position: 'relative'
                                             }}>
                                                 <View style={{ position: 'absolute', top: -40, width: '100%' }}>
                                                     <View style={{ justifyContent: 'center', alignItems: "center", }}>
                                                         <View style={styles.plate}>
                                                             <Image source={{ uri: item?.strMealThumb }} style={{ width: 70, height: 70, borderRadius: 55, objectFit: "contain" }} />
                                                         </View>
                                                     </View>
                                                 </View>
     
                                                 <View style={{ justifyContent: "center", alignItems: "center", marginTop: 80 }}>
                                                     <Text style={{
                                                         fontFamily: 'SFRegular', fontSize: 12, color: Colors.backgroundRed,
                                                         paddingBottom: 10
                                                     }}>
                                                         Country: {item?.strArea}
                                                     </Text>
                                                     <Text style={{ fontSize: 16, textAlign: "center", width: 120, fontFamily: "SFSemiBold" }}>
                                                         {item?.strMeal}
                                                     </Text>
                                                 </View>
                                             </View>
                                             </TouchableOpacity>
                                         </Animated.View>
                                     )}
                                     numColumns={itemRow}
                                 />
                                )
                            }
                           
                        </View>
                    )
                }
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    searchContainer: {
        width: '100%',
        backgroundColor: '#F9F9F9',
        height: "100%",
        marginTop: 30,
        borderRadius: 40,
        elevation: 4,
        shadowColor: '#000',
        shadowOpacity: 0.3,
        shadowRadius: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        }
    },
    plate: {
        flexDirection: 'column',
        height: 105,
        width: 105,
        backgroundColor: '#e4e4e4',
        justifyContent: 'center',
        alignItems: "center",
        borderRadius: 80
    }
})

export default Search