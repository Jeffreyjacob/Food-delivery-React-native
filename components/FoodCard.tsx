import { View, Text, ScrollView, FlatList, ActivityIndicator } from 'react-native'
import React from 'react'
import Animated, { FadeInLeft, FadeInRight, FadeOutLeft } from 'react-native-reanimated'
import Colors from '@/constants/Colors'
import Food from './Food'


interface Props {
    FoodData: any[],
    loading: boolean
}

const FoodCard = ({ FoodData, loading }: Props) => {
    return (
        <View>
            {
                loading ? (<View style={{paddingTop:100}}>
                    <ActivityIndicator size='large' color={Colors.backgroundRed} />
                </View>) : (
                    <FlatList
                        data={FoodData}
                        keyExtractor={(item) => item.idMeal}
                        renderItem={({ item, index }) => (
                            <ScrollView horizontal >
                                <Animated.View entering={FadeInLeft} 
                                style={{marginTop:80}}>
                                 <Food image={item?.strMealThumb} name={item?.strMeal}/>
                                </Animated.View>
                            </ScrollView>
                        )}
                        horizontal={true}
                    />
                )
            }
        </View>
    )
}

export default FoodCard