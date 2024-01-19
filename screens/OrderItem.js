// OrderItem.js
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';

const OrderItem = ({ order }) => {
  const navigation = useNavigation();

  const firstProduct = order.ordercartItems[0].cartProduct;

  const goToOrderDetail = () => {
    navigation.navigate('OrderDetail', { order });
  };

  return (
    <TouchableOpacity style={styles.orderItem} onPress={goToOrderDetail}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderTitle}>Order #{order.orderId}</Text>
        <Text>Status: {order.orderStatus}</Text>
      </View>
      <View style={styles.productContainer}>
        <Image source={{ uri: firstProduct.manufacturer }} style={styles.productImage} />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{firstProduct.productName}</Text>
          <Text style={styles.productPrice}>Price: {firstProduct.price}</Text>
        </View>
      </View>
      <Text>Total: {order.total}</Text>
      <Text style={{ marginTop: 5 }}>Items: {order.ordercartItems.length}</Text>
      <Text style={{ marginLeft: 210, marginBottom: 20 }}>Date: {order.date}</Text>
    </TouchableOpacity>
  );
};

OrderItem.propTypes = {
  order: PropTypes.object.isRequired,
};

const styles = StyleSheet.create({
  orderItem: {
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  productImage: {
    width: 80,
    height: 80,
    resizeMode: 'cover',
    borderRadius: 8,
  },
  productInfo: {
    marginLeft: 12,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  productPrice: {
    fontSize: 14,
    color: 'green',
  },
});

export default OrderItem;
