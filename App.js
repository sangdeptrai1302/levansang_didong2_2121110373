import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';

import ProductDetails from './screens/ProductDetails';
import Cart from './screens/Cart';
import Checkout from './screens/Checkout';

import Payment from './screens/Payment';
import Mobile from './screens/Mobile';
import Laptop from './screens/Laptop';
import Desktop from './screens/Desktop';
import Account from './screens/Account';
import Notification from './screens/Notification';
import Headfones from './screens/Headfones';
import tablet from './screens/tablet';
import Login from './screens/Login';
// import Register from './screens/Register';
import OrderDetail from './screens/OrderDetail';
import Order from './screens/Order';
import { NativeBaseProvider } from 'native-base';

import AllProduct from './screens/AllProduct';






const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NativeBaseProvider>
<NavigationContainer>
      <Stack.Navigator initialRouteName="home">
      <Stack.Screen name="OrderDetail" component={OrderDetail}/>
          <Stack.Screen name="account" component={Account}/>

        <Stack.Screen name="home" component={Home} />
        <Stack.Screen name="login" component={Login} options={{ headerShown: false }} />
        {/* <Stack.Screen name="register" component={Register}/> */}
        
          <Stack.Screen name="cart" component={Cart}/>

          <Stack.Screen name="Orders" component={Order}/>
          <Stack.Screen name="notifications" component={Notification}/>
          
          <Stack.Screen name="productDetails" component={ProductDetails}/>
          <Stack.Screen name="checkout" component={Checkout}/>
          <Stack.Screen name="payment" component={Payment}/>
          <Stack.Screen name="mobile" component={Mobile}/>
          <Stack.Screen name="laptop" component={Laptop}/>
          <Stack.Screen name="Desktop" component={Desktop}/>
          <Stack.Screen name="AllProducts" component={Headfones}/>
          <Stack.Screen name="Tablet" component={tablet}/>
          <Stack.Screen name="Accessories" component={AllProduct}/>
        
        </Stack.Navigator>
    </NavigationContainer>
    </NativeBaseProvider>
  );
}


