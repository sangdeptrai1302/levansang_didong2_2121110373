import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import CartItem from "../components/Cart/CartItem";
import Layout from "../components/Layout/Layout";
import PriceTable from "../components/Cart/PriceTable";
import { useNavigation } from "@react-navigation/native";
import {api} from '../data/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = await AsyncStorage.getItem("accessToken");

        if (!token) {
          console.warn("Không tìm thấy accessToken trong AsyncStorage.");
          return;
        }

        const response = await axios.get(`http://${api[0].ip}:8080/cart`, {
          headers: {
            token: token,
          },
        });

        setCartItems(response.data.cartItems);
        setLoading(false);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin giỏ hàng:", error);
      }
    };

    fetchCartData();
  }, []);

  const calculateTotalPrice = () => {
    return cartItems.reduce(
      (total, item) =>
        total + item.cartProduct.price * item.cartItemQuantity,
      0
    );
  };

  const handleClearCart = async () => {
    try {
      const token = await AsyncStorage.getItem("accessToken");
      console.log(token)
      if (!token) {
        console.warn("Không tìm thấy accessToken trong AsyncStorage.");
        return;
      }
      const response = await axios.delete(`http://${api[0].ip}:8080/cart/clear`, {
        headers: {
          token: token
        },
      });
      if (response.status==202) {
        Alert.alert("Xóa giỏ hàng thành công");
        navigation.navigate("home")
      } else {
        Alert.alert("Có lỗi khi xóa giỏ hàng, cỏ thể giỏ hàng đang trống");
      }
    } catch (error) {
      console.error("Lỗi khi xóa giỏ hàng:", error);
    }
  };

  return (
    <ScrollView  style={styles.container}>
      <Text style={styles.heading}>
        {cartItems?.length > 0}
      </Text>
      {cartItems?.length > 0 && (
        <>
          <ScrollView>
            {cartItems?.map((item) => (
              <CartItem
                item={item.cartProduct}
                quantity={item.cartItemQuantity}
                key={item.cartItemId}
              />
            ))}
          </ScrollView>

          <View>
            {/* Display subtotal */}
            <PriceTable title={"Giá"} price={calculateTotalPrice()} />
            {/* Display tax (calculated dynamically as 10% of the total price) */}
            <PriceTable title={"Tax"} price={calculateTotalPrice() * 0.001} />
            {/* Display fixed shipping cost */}
            <PriceTable title={"Shipping"} price={2} />
            {/* Display grand total (subtotal + tax + shipping) */}
            <PriceTable
              title={"Grand Total"}
              price={
                calculateTotalPrice() +
                calculateTotalPrice() * 0.001 +
                10
              }
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity
              style={styles.btnCheckout}
              onPress={() => navigation.navigate("checkout")}
            >
              <Text style={styles.btnCheckoutText}>Thanh toán</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.btnClearCart}
              onPress={handleClearCart}
            >
              <Text style={styles.btnClearCartText}>xóa giỏ hàng</Text>
            </TouchableOpacity></View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  heading: {
    textAlign: "center",
    color: "green",
    marginTop: 10,
  },
  grandTotal: {
    borderWidth: 1,
    borderColor: "lightgray",
    backgroundColor: "#ffffff",
    padding: 5,
    margin: 5,
    marginHorizontal: 20,
  },
  btnCheckout: {
    marginTop: 15,
    height: 50,
    width: 150, // Thay đổi giá trị này thành một giá trị hợp lệ
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
    borderRadius: 25,
    alignSelf: 'center',
  },
  btnCheckoutText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  btnClearCart: {
    marginTop: 15,
    height: 50,
    width: 150, // Thay đổi giá trị này thành một giá trị hợp lệ
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'red',
    borderRadius: 25,
    alignSelf: 'center',
  },
  btnClearCartText: {
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
  },
});

export default Cart;
