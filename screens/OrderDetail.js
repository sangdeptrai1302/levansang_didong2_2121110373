import React, { useEffect, useState } from "react";
import { ScrollView, Image } from "react-native";
import { Box, Button, Text } from "native-base";
import axios from "axios";
import { api } from "../data/api";
import { useNavigation } from "@react-navigation/native";
import BottomSheet from './BottomSheet';
import AsyncStorage from '@react-native-async-storage/async-storage';

const OrderDetail = ({ route }) => {
  const { order } = route.params;
  const [customerDetails, setCustomerDetails] = useState(null);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [token, setAccessToken] = useState('');
  const [paymentResponse, setPaymentResponse] = useState(null);
  const navigation=useNavigation();
  useEffect(() => {
    const fetchCustomerDetails = async () => {
      try {
        const response = await axios.get(
          `http://${api[0].ip}:8080/customer/${order.orderId}`
        );
        const data = await response.data;
        setCustomerDetails(data);
      } catch (error) {
        console.error("Error fetching customer details:", error);
      }
    };

    fetchCustomerDetails();
  }, [order.orderId]);


  const [bottomSheetVisible, setBottomSheetVisible] = useState(false);

  const openBottomSheet = () => {
    setBottomSheetVisible(true);
  };

  const closeBottomSheet = () => {
    setBottomSheetVisible(false);
    navigation.navigate("account")
  };

  const Delivered = () => {
    handlePayment()
    openBottomSheet();
  };

  useEffect(() => {
    const loadAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem('accessToken');
        if (token) {
          setAccessToken(token);
          console.log('Token loaded successfully:', token);
        } else {
          console.warn('Không tìm thấy accessToken trong AsyncStorage.');
        }
      } catch (error) {
        console.error('Lỗi khi load accessToken từ AsyncStorage:', error);
      }
    };
  
    loadAccessToken();
  }, []);


 const handlePayment = async () => {
    try {
      const response = await fetch(
        `http://${api[0].ip}:8080/orders/${order.orderId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            token:token // Sử dụng token từ state
          },
          body: JSON.stringify({
            cardNumber: {
              cardNumber: "1234567890123456",
              cardValidity: "12/25",
              cardCVV: "123",
            },
            addressType: "house",
          }),
        }
      );

      if (response.ok) {
        const responseData = await response.json();
        setPaymentResponse(responseData); // Lưu response vào state
        setPaymentSuccess(true);
        console.log(order.orderStatus)
      } else {
        const errorData = await response.json();
        console.error("Payment failed:", errorData);
        alert(`Payment failed: ${errorData.message}`);
      }
    } catch (error) {
      console.error("Error during payment:", error.message);
      alert("Payment failed. Please try again.");
    }
  };


  return (
    <ScrollView>
      <Box
        bg="gray.100"
        p={4}
        mb={4}
        borderRadius={8}
        borderWidth={1.5}
        borderColor="gray.300"
      >
        <Text fontSize="xl" fontWeight="bold">
          Shipping Address
        </Text>
        {customerDetails && customerDetails.address ? (
          <>
            <Text>{`Họ tên: ${customerDetails.firstName} ${customerDetails.lastName}`}</Text>
            <Text>{`Đường: ${customerDetails.address.house.streetNo}`}</Text>
            <Text>{`Tên nhà: ${customerDetails.address.house.buildingName}`}</Text>
            <Text>{`Quận: ${customerDetails.address.house.locality}`}</Text>
            <Text>{`Thành phố: ${customerDetails.address.house.city}`}</Text>
            <Text>{`Nước: ${customerDetails.address.house.state}`}</Text>
            <Text>{`Post code: ${customerDetails.address.house.pincode}`}</Text>
          </>
        ) : (
          <Text>No address information available</Text>
        )}
      </Box>

      <Box
        bg="gray.100"
        p={4}
        mb={4}
        borderRadius={8}
        borderWidth={1.5}
        borderColor="gray.300"
      >
        <Text fontSize="xl" fontWeight="bold">
          Order Details
        </Text>
        <Text>{`Order ID: ${order.orderId}`}</Text>
        <Text>{`Date: ${order.date}`}</Text>
        <Text>{`Status: ${order.orderStatus}`}</Text>
        <Text>{`Total Amount: ${order.total}`}</Text>
      </Box>

      <Box
        bg="gray.100"
        p={4}
        borderRadius={8}
        borderWidth={1.5}
        borderColor="gray.300"
      >
        <Text fontSize="xl" fontWeight="bold">
          Ordered Items
        </Text>
        {order.ordercartItems.map((item) => (
          <Box
            key={item.cartItemId}
            mb={4}
            bg="gray.100"
            p={4}
            borderRadius={8}
            borderWidth={1}
            borderColor="gray.300"
            flexDirection="row" // Set flexDirection to 'row'
            alignItems="center" // Align items in the center vertically
          >
            <Image
              source={{ uri: item.cartProduct.manufacturer }}
              style={{ width: 60, height: 60, borderRadius: 8 }}
            />
            <Box ml={2} flex={1}>
              {" "}
              {/* Adjusted ml and added flex */}
              <Text fontSize="lg" fontWeight="bold">
                {item.cartProduct.productName}
              </Text>
              <Text
                style={{ marginLeft: 150 }}
              >{`Quantity: ${item.cartItemQuantity}`}</Text>
              <Text
                style={{ marginLeft: 150 }}
              >{`Price: ${item.cartProduct.price}`}</Text>
            </Box>
          </Box>
        ))}
      </Box>
      {order.orderStatus === "PENDING" && (
        <Button onPress={Delivered}>Đã nhận được hàng</Button>
      )}
      <BottomSheet  isVisible={bottomSheetVisible} onClose={closeBottomSheet} order={order}/>
      
    </ScrollView>
  );
};

export default OrderDetail;
