import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

export default function Slider() {
  // Mảng chứa đường dẫn đến các hình ảnh bạn muốn hiển thị trong slider
  const images = [
   "https://cdn.tgdd.vn/Products/Images/86/195377/Slider/chuot-khong-day-bluetooth-rapoo-t200-den-xam-111020-0243350.jpg",
   "https://cdn.tgdd.vn/Products/Images/86/73125/Slider/chuot-khong-day-genius-nx-7010-111020-0242500.jpg",
   "https://maytinhhaidang.net/img/chuot-khong-day-forter-v189.jpg",
   "https://maytinhhaidang.net/img/chuot-k-day-forter-v189.jpg",
   "https://maytinhvietphong.vn/media/news/1701_Chutmytnhkhngdymtuusb.png",
   
    // ...Thêm hình ảnh khác nếu cần
  ];

  return (
    <View style={styles.container}>
      {/* Component SliderBox để hiển thị slider */}
      <SliderBox
        images={images}
        sliderBoxHeight={200}
        onCurrentImagePressed={(index) =>
          console.warn(`image ${index} pressed`)
        }
        dotColor="#FFEE58"
        inactiveDotColor="#90A4AE"
        paginationBoxVerticalPadding={20}
        autoplay
        circleLoop
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
   
    alignContent: "center",
  },
});
