import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import {api} from '../../data/api';

const ProductsCard = ({ product }) => {
  const { productId, productName, price, description, manufacturer } = product;
  const [token, setAccessToken] = useState('');

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
          productId: productId,
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
        alert(`Sản phẩm "`+productName+`" đã được thêm vào giỏ hàng!`);
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
      } else if (error.request) {
        console.error('No response received:', error.request);
      } else {
        console.error('Error setting up the request:', error.message);
      }
    }
  };
  

  return (
    <View style={styles.productContainer}>
      <Image source={{ uri: manufacturer }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{productName}</Text>
        <Text style={styles.productDescription}>{description}</Text>
        <Text style={styles.productPrice}>{`Giá: ${price}`}</Text>
        <TouchableOpacity onPress={handleAddToCart} style={styles.addCartButton}>
          
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    margin: 8,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  productDetails: {
    flex: 1,
    alignItems: 'center',
  },
  productTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  productDescription: {
    fontSize: 12,
    marginTop: 4,
  },
  productPrice: {
    fontSize: 12,
    marginTop: 4,
    color: 'green',
  },
  addCartButton: {
    paddingTop: 50,
  },
});

export default ProductsCard;
