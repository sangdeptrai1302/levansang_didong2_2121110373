import React from 'react';
import { View, StyleSheet,Image } from 'react-native';
import { SliderBox } from 'react-native-image-slider-box';

export default function Slider() {
  // Mảng chứa đường dẫn đến các hình ảnh bạn muốn hiển thị trong slider
  const images = [
   "https://tainguyen24h.com/wp-content/uploads/2023/12/psd-banner-tet-2024.jpg",
   "https://cdn.tgdd.vn/News/Thumb/1558869/Untitled-1200x628.jpg",
   "https://cdn.tgdd.vn//News/0//Salehoitrangram-800x350-1.jpg",
   "https://cdn.tgdd.vn/Files/2020/01/15/1231595/1urw-ryz_800x450.png",
"https://thiepmung.com/uploads/worigin/2023/10/14/tao-thong-bao-nghi-tet-2024-dep_69731.jpg"   
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
