import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const ProductsCard = ({ p }) => {
  const navigation = useNavigation();

  // More details btn
  const handleMoreButton = (id) => {
    navigation.navigate('productDetails', { _id: id });
    console.log(id);
  };

  // Add to cart
  const handleAddToCart = () => {
    alert('Added to cart');
  };

  return (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() => handleMoreButton(p._id)}
    >
      <View style={styles.card}>
        <Image style={styles.cardImage} source={{ uri: p?.imageUrl }} />
        <Text style={styles.cardTitle}>{p?.name}</Text>
        <Text style={styles.cardTitle}>{p?.price}</Text>
        <Text style={styles.cardDesc}>{p?.description.substring(0, 30)} ...more</Text>
        <View style={styles.btnContainer}>
          <TouchableOpacity style={styles.btn} onPress={handleAddToCart}>
            <Text style={styles.btnText}>Thêm Giỏ </Text>
          </TouchableOpacity>
        </View>
      </View>
     
    </TouchableOpacity>
  );
  
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection:"row",
    
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '48%', // Thay đổi chiều rộng để tạo thành 2 cột
    marginBottom: 10,
  },
  card: {
    borderWidth: 1,
    borderColor: 'lightgray',
    width: '100%',
    padding: 10,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  cardImage: {
    height: 120,
    width: '100%',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardDesc: {
    fontSize: 10,
    textAlign: 'left',
  },
  btnContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn: {
    backgroundColor: 'green',
    height: 20,
    width: '100%',
    borderRadius: 5,
    justifyContent: 'center',
  },
  btnText: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 10,
    fontWeight: 'bold',
  },
});

export default ProductsCard;
