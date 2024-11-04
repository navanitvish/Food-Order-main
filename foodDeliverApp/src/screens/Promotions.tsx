import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Image,
  Text,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
import { colors } from '../styles/globalStyles';
import RestaurantItem from '../components/common/RestrauntItem';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import SkeletonUI from '../components/common/SkeltonUI';

interface Coupon {
  _id: string;
  couponcode: string;
  percent: number;
  description: string;
  minOrderAmount: number;
  maxDiscountAmount: number;
  expiryDate: string;
}

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  address: string;
  rating: number;
  cuisine?: string;
  openingTime: string;
  closingTime: string;
  distanceFromUser: number;
  isOpen: boolean;
  formattedOpeningTime: string;
  formattedClosingTime: string;
  coupons: Coupon[];
}

const PromotionsScreen: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      
      if (!token) {
        console.error('No token found');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://192.168.1.40:4578/api/restaurant/offers', {
        headers: {
          'Authorization': `${token}`,
        }
      });
      
      if (response.data.success && response.data.data) {
        setRestaurants(response.data.data);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
      // Set empty array instead of showing error
      setRestaurants([]);
    } finally {
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Restaurant }) => (
    <RestaurantItem
      item={{
        _id: item._id,
        name: item.name,
        image: item.image,
        address: item.address,
        rating: item.rating,
        cuisine: item.cuisine || 'Various Cuisines',
        openingTime: item.formattedOpeningTime,
        closingTime: item.formattedClosingTime,
        isOpen: item.isOpen,
        distanceFromUser: item.distanceFromUser
      }}
      coupon={item.coupons}
    />
  );

  const NoOffersView = () => (
    <View style={styles.noOffersContainer}>
      <Image
        source={require('../assets/images/fastfood.png')} // Replace with your actual image path
        style={styles.noOffersImage}
        resizeMode="contain"
      />
      <Text style={styles.noOffersText}>No Offers Available</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Offers" />
      {loading ? (
<SkeletonUI/>
      ) : restaurants.length > 0 ? (
        <FlatList
          data={restaurants}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <NoOffersView />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 16,
  },
  noOffersContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noOffersImage: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    marginBottom: 20,
  },
  noOffersText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
});

export default PromotionsScreen;