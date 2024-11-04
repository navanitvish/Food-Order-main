import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, textStyles } from '../../styles/globalStyles';
import { Grayscale } from 'react-native-color-matrix-image-filters';

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  address: string;
  rating: number;
  cuisine: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  distanceFromUser: number;
  minOrderAmount?:number;
  deliveryTime:string;
}

interface Coupon {
  couponcode: string;
  percent: number;
}

interface RestaurantItemProps {
  item: Restaurant;
  coupon?: Coupon[];
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({ item, coupon }) => {

  console.log("items coming", item.name)
  const navigation = useNavigation() as any;

  // console.log('Coupon:', coupon);

  const renderImage = () => {
    if (item.isOpen) {
      return (
        <Image source={{ uri: item.image }} style={styles.restaurantImage} />
      );
    } else {
      return (
        <Grayscale>
          <Image source={{ uri: item.image }} style={styles.restaurantImage} />
        </Grayscale>
      );
    }
  };

  const formatDistance = (distance: number) => {
    const distanceInKm = distance / 1000;
    return `${distanceInKm.toFixed(1)} KM away`;
  };

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('RestaurantListScreen', { restaurant: item, coupon: coupon });
      }}
      style={styles.restaurantItem}
    >
      <View style={styles.imageContainer}>
        {renderImage()}
        {coupon && coupon?.length > 0 && (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{coupon[0].percent}% OFF</Text>
            <Text style={styles.discountSubtext}>UPTO ₹50</Text>
          </View>
        )}
      </View>
      <View style={styles.restaurantInfo}>

        {/* {
          item?.isOpen ? ( <Text style={[styles.restaurantName]}>{item.name}</Text>):(  <Text style={[styles.restaurantName, !item.isOpen && styles.closedText]}>{item.name}</Text>)
        } */}
        {item.isOpen ? (
          <Text style={[styles.restaurantName]}>{item.name}</Text>
        ) : (
          <Text style={[styles.restaurantName, !item.isOpen && styles.closedText]}>{item.name}</Text>
        )}

        {/* <Text style={styles.restaurantName}>{item.name}</Text> */}
        <View style={styles.ratingContainer}>
          <Text style={[styles.rating, !item.isOpen && styles.closedText]}>★ {item.rating?.toFixed(1) || 'N/A'}</Text>
          <Text style={[styles.deliveryTime, !item.isOpen && styles.closedText]}>• {item?.deliveryTime}</Text>
          <Text style={[styles.distance, !item.isOpen && styles.closedText]}>{formatDistance(item.distanceFromUser)}</Text>
        </View>
        <Text style={[styles.cuisine, !item.isOpen && styles.closedText]}>{item.cuisine}</Text>
        <Text style={[styles.address, !item.isOpen && styles.closedText]} numberOfLines={1} ellipsizeMode="tail">{item.address}</Text>
        {item.isOpen ? (
          // <Text style={styles.freeDelivery}>FREE DELIVERY ABOVE ₹1999/-</Text>
            <Text style={styles.freeDelivery}></Text>
        ) : (
          <Text style={[styles.openingTime, styles.closedText]}>
            Accepting Orders {item.openingTime}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  restaurantItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  imageContainer: {
    marginRight: 16,
    position: 'relative',
  },
  restaurantImage: {
    width: 120,
    height: 140,
    borderRadius: 8,
  },
  discountBadge: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 4,
    alignItems: 'center',
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
  discountSubtext: {
    color: 'white',
    fontSize: 10,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    marginBottom: 4,
    color:colors.black,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  rating: {
    ...textStyles.medium,
    color: '#4CAF50',
    marginRight: 8,
  },
  deliveryTime: {
    ...textStyles.medium,
    color: colors.darkGray,
    marginRight: 8,
    fontSize: 14,
  },
  distance: {
    ...textStyles.medium,
    color: colors.darkGray,
    fontSize: 14,
  },
  cuisine: {
    ...textStyles.regular,
    color: colors.darkGray,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  address: {
    ...textStyles.regular,
    color: colors.darkGray,
    marginBottom: 2,
    width: '100%',
    fontSize: 14,
  },
  freeDelivery: {
    ...textStyles.medium,
    color: '#FF8C00'
  },
  openingTime: {
    ...textStyles.medium,
    color: colors.darkGray,
  },
  closedText: {
    color: '#888888',
  },
});

export default RestaurantItem;