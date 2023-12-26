import { View, Text, TouchableOpacity,StyleSheet } from 'react-native'
import React from 'react'
import Layout from '../components/Layout/Layout';


const Checkout = ({navigation}) => {
    const handleCOD =()=>{
        alert("đơn hàng của bạn đã được đặt thành công")
    };
    const handleOnline =()=>{
        alert("việc chuyển hướng của bạn đến cổng thanh toán")
        navigation.navigate("payment")
    };
  return (
    <Layout>
    <View style={Styles.container}>
      <Text style={Styles.heading}>Payment options</Text>
      <Text style={Styles.price}>Total  Amount:101 $</Text>
        <View style={Styles.paymentCard}>
            <Text style={Styles.paymentHeading}>Select you Payment Mode</Text>
            <TouchableOpacity style={Styles.paymentBtn}  onPress={handleCOD}>
                <Text style={Styles.paymentBtnText}> Cash On Devlivery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={Styles.paymentBtn} onPress={handleOnline}>
                <Text style={Styles.paymentBtnText}>  Online (CREDIT / DEBIT CARD) </Text>
            </TouchableOpacity>
        </View>
    </View>
    </Layout>
  )
}
const Styles = StyleSheet.create({
    container:{
            alignItems:"center",
            justifyContent:"center",
            height:"90%",
    },
    heading:{
        fontSize:30,
        fontWeight:"500",
        marginVertical:20,

    },
    price:{
        fontSize:20,
        marginBottom:10,
        color:"gray"
    },
    paymentCard:{
        backgroundColor:"#ffffff",
        width:"90%",
        borderRadius:10,
        padding :30,
        marginVertical:10,
    },
    paymentHeading:{
        color:"gray",
        marginBottom:10
    },
    paymentBtn:{
        backgroundColor:"#000000",
        height:40,
        borderRadius:10,
        justifyContent:"center",
        marginVertical:10
    },
    paymentBtnText:{
        color:"white",
        textAlign:"center"
    }
})
export default Checkout
