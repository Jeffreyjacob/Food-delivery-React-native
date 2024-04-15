import FoodCategories from '@/components/FoodCategories';
import Colors from '@/constants/Colors';
import { Feather } from '@expo/vector-icons';
import { Link, Stack, useRouter } from 'expo-router';
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';


export default function TabOneScreen() {
  const navigate = useRouter();
  return (
    <View style={{flex:1,backgroundColor:Colors.backgroundGrey}}>
      <Stack.Screen options={{
        headerRight:()=>(
          <TouchableOpacity style={{marginRight:30}}>
            <Feather name="shopping-cart" size={24} color={Colors.grey} />
          </TouchableOpacity>
        )
      }}/>
      <Animated.View style={{paddingHorizontal:20}}>
        <View style={{width:320,paddingHorizontal:30,marginTop:15}}>
        <Text style={{fontSize:50,fontFamily:'SFBold',}}>
            Delicious Food for you
          </Text>
          {/**search bar */}
          <Link href={'/Search'} asChild>
          <TouchableOpacity style={{backgroundColor:"#EFEEEE",padding:15,
            borderWidth:StyleSheet.hairlineWidth,borderRadius:30,marginTop:20
          }}>
            <View style={{flexDirection:'row',alignItems:'center',gap:10}}>
            <Feather name="search" size={24} color="black" />
            <Text style={{fontSize:18,fontFamily:"SFRegular",color:Colors.grey}}>Search</Text>
            </View>
          </TouchableOpacity>
          </Link>

        </View>

         <View>
           <FoodCategories/>

         </View>
          
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  
});
