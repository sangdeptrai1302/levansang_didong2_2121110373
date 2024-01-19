// Order.js
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';
import { api } from '../data/api';
import OrderItem from './OrderItem';

const Order = ({ navigation }) => {
  const [orders, setOrders] = useState([]);

  // Fetch orders data from the API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(`http://${api[0].ip}:8080/orders`);
        const data = await response.json();
        setOrders(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, []);

  // Render each order item
  const renderOrderItem = ({ item }) => {
    return <OrderItem order={item} navigation={navigation} />;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Your Orders</Text>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.orderId.toString()}
        renderItem={renderOrderItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});

export default Order;
