import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import About from './screens/About';
import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';

import Payment from './screens/Payment';




const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="home " 
          component={Home}
           options={{
            headerShown:false
            }}/>


          <Stack.Screen name="cart" component={Cart}/>
          
          <Stack.Screen name="productDetails" component={ProductDetails}/>
          <Stack.Screen name="checkout" component={Checkout}/>
          <Stack.Screen name="payment" component={Payment}/>
          <Stack.Screen name="mobile" component={About}/>
        </Stack.Navigator>
    </NavigationContainer>
   
  );
}


