import { View, Text } from 'react-native'
import React from 'react'
import { Food } from '@/constants/FoodModal'

interface Props{
    Data:Food
}

const CartCard = ({Data}:Props) => {
  return (
    <View>
      <Text>CartCard</Text>
    </View>
  )
}

export default CartCard