import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const Notification = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thông báo</Text>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Chúc mừng! Đơn hàng của bạn đã được gửi.</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Chúc mừng! Đơn hàng của bạn đã được gửi.</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Chúc mừng! Đơn hàng của bạn đã được gửi.</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Xem chi tiết</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.notification}>
        <Text style={styles.notificationText}>Ưu đãi đặc biệt! Giảm giá 20% cho đơn hàng tiếp theo.</Text>
        <TouchableOpacity style={styles.viewButton}>
          <Text style={styles.viewButtonText}>Xem ngay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    alignItems:'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  notification: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  notificationText: {
    fontSize: 16,
    color: '#333',
  },
  viewButton: {
    marginTop: 10,
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  viewButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Notification;
