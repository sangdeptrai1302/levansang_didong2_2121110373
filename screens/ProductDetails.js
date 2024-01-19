import { StyleSheet, Text, View, TouchableOpacity, Image, Alert, ScrollView } from 'react-native'
import {api} from '../data/api';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';

export default ProductDetail = ({ route }) => {
  const { product } = route.params;
  const [token, setAccessToken] = useState('');
  const id=product.productId;

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
  

  const handleAddToCart = async () => {
    try {
      // Thực hiện yêu cầu API với token được gửi qua header
      const response = await axios.post(
        `http://${api[0].ip}:8080/cart/add`,
        {
          productId: id
          // Các thông tin sản phẩm khác có thể được thêm vào dựa trên yêu cầu của bạn
        },
        {
          headers: {
            token: token,
          },
        }
      );
      console.log('API Response:', response);
      // Check if there's an appropriate property to use
      if (response.data) {
        // Use the data property if it exists
        console.log('Response data:', response.data);
        alert(`Sản phẩm "`+product.productName+`" đã được thêm vào giỏ hàng!`);
      } else {
        // Use other properties based on the structure of the response
        console.log('Response status:', response.message);
        console.log('Response headers:', response.headers);
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      // Log the error details
      if (error.response) {
        console.error('Response data:', error.response.data);
        alert(error.response.data.message)
        console.error('Response status:', error.response.status);
        console.error('Response headers:', error.response.headers);
        console.error('token:', token);
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };


  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center', marginHorizontal: 30 }}>
          <Image
            style={styles.productImg}
            source={{
              uri: product.manufacturer,
            }}
          />
          <Text style={styles.name}>{product.productName}</Text>
          <Text style={styles.price}>{`$ ${product.price}`}</Text>
          <Text style={styles.description}>{product.description}</Text>
        </View>
        <View style={styles.starContainer}>
        <Text style={styles.extraInfoText}>Chưa có đánh giá / Đã bán 15</Text>
          <Text>Đánh giá:</Text>
          <Icon name="star" size={20} color="gold" />
          <Icon name="star" size={20} color="gold" />
          <Icon name="star" size={20} color="gold" />
          <Icon name="star" size={20} color="gold" />
          <Icon name="star" size={20} color="gold" />
        </View>
        
        <View style={styles.container}>
        <TouchableOpacity style={styles.shareButton} onPress={() => handleAddToCart()}>
          <Text style={styles.shareButtonText}>Thêm giỏ hàng</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  productImg: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
  },
  name: {
    fontSize: 28,
    color: '#696969',
    fontWeight: 'bold',
    marginTop: 10,
  },
  price: {
    marginTop: 10,
    fontSize: 18,
    color: 'green',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    marginTop: 10,
    color: '#696969',
    fontSize: 18,
  },
  star: {
    width: 40,
    height: 40,
  },
  btnColor: {
    height: 30,
    width: 30,
    borderRadius: 30,
    marginHorizontal: 3,
  },
  starContainer: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  contentColors: {
    justifyContent: 'center',
    marginHorizontal: 30,
    flexDirection: 'row',
    marginTop: 20,
  },
  
shareButton: {
  marginTop: 15,
  height: 50,
  width: 150, // Thay đổi giá trị này thành một giá trị hợp lệ
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'green',
  borderRadius: 25,
  alignSelf: 'center',

},
});
