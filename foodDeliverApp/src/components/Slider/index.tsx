import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';
import { colors, textStyles } from '../../styles/globalStyles';


const recommendedData = [
  {
    id: '1',
    name: 'Pondy Delight',
   image:"https://firebasestorage.googleapis.com/v0/b/food-web-app-85704.appspot.com/o/salvahotel.jpg%2Fimage_1728472037043_6633%20salva%20hotel.jpg?alt=media&token=f6727bcc-9ec4-4f33-b6cd-0c539ad59e90",
    cuisine: 'Sandwich, Pizza, Pasta',
  },
  {
    id: '2',
    name: 'L.V.T. Spice Family',
   image:"https://firebasestorage.googleapis.com/v0/b/food-web-app-85704.appspot.com/o/salvahotel.jpg%2Fimage_1728472037043_6633%20salva%20hotel.jpg?alt=media&token=f6727bcc-9ec4-4f33-b6cd-0c539ad59e90",
    cuisine: 'Biryani, Chinese, Arabian',
  },
  {
    id: '3',
    name: 'New Punjabi Dhaba',
   image:"https://firebasestorage.googleapis.com/v0/b/food-web-app-85704.appspot.com/o/salvahotel.jpg%2Fimage_1728472037043_6633%20salva%20hotel.jpg?alt=media&token=f6727bcc-9ec4-4f33-b6cd-0c539ad59e90",
    cuisine: 'North Indian',
  },
];

const Slider: React.FC = () => {
  return (
    <View style={styles.container}>

      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {recommendedData.map((item) => (
          <View key={item.id} style={styles.recommendedItem}>
            <Image source={{uri:item?.image}} style={styles.recommendedImage} />
            <View style={styles.discount}>
              <Text style={styles.discountText}>5% OFF</Text>
              <Text style={styles.discountSubtext}>Upto ₹50</Text>
            </View>
            <Text style={styles.recommendedName}>{item.name}</Text>
            <Text style={styles.recommendedCuisine}>{item.cuisine}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    backgroundColor: colors.bgGray,
  },
  title: {
    ...textStyles.mediumBlack,
    fontSize: 18,
    marginLeft: 16,
    marginBottom: 8,
  },
  recommendedItem: {
    width: 200,
    marginLeft: 16,
  },
  recommendedImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 8,
  },
  discount: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: colors.primary,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  discountText: {
    ...textStyles.medium,
    color: colors.white,
    fontSize: 12,
  },
  discountSubtext: {
    ...textStyles.regular,
    color: colors.white,
    fontSize: 10,
  },
  recommendedName: {
    ...textStyles.mediumBlack,
    fontSize: 16,
    marginBottom: 2,
  },
  recommendedCuisine: {
    ...textStyles.regular,
    color: colors.darkGray,
    fontSize: 12,
  },
});

export default Slider;