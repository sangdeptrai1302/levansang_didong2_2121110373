// BottomSheet.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Modal from 'react-native-modal';
import OrderItem from './OrderItem';
import { Box } from 'native-base';
import Icon from 'react-native-vector-icons/FontAwesome';


const windowHeight = Dimensions.get('window').height;

const BottomSheet = ({ isVisible, onClose, paymentresponse }) => {
  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      animationIn="slideInUp"
      animationOut="slideOutDown"
      backdropTransitionOutTiming={0}
      style={styles.modal}
    >
      <View style={styles.content}>
      <Icon name="check-circle" size={300} color="#4F8EF7" />
      <Text >Cảm ơn bạn đã nhận hàng và thanh toán thành công</Text>
        
        

<TouchableOpacity onPress={onClose}>
      <Icon style={styles.close} name="close" size={300} color="#4F8EF7" />

        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  content: {
    backgroundColor: 'white',
    height: (2 / 3) * windowHeight - 100,
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    marginTop: 380,
  },
  close: {
    position: 'absolute',
    top: 50,
    right: -190,
    top:-400,
    fontSize: 20,
    color: 'red',
  },
});

export default BottomSheet;
