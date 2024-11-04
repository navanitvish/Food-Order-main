import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import { colors, typography } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import RestaurantItem from '../components/common/RestrauntItem';
import axios from 'axios';
import { foodService, getToken } from '../api/services/foodService';

import { useDispatch } from 'react-redux';
import { setSelectedFood } from '../redux/slices/selectedFoodSlice';



interface IFavoriteItem {
  id: string;
  image: string;
  title: string;
  rating: number;
  oldPrice: number;
  newPrice: number;
  favorites: any[];
}

const FavoritesScreen: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);
  const [restaurants, setRestaurants] = useState<any[]>([]);

  const dispatch = useDispatch();
  const navigation = useNavigation() as any;

  const fetchFavorites = useCallback(async () => {
    setLoading(true);
    setNoResults(false);
    try {
      const response = await foodService.getAllFavorites();
      const data = response.data?.data;

      if (data && Array.isArray(data)) {
        setRestaurants(data);
        setNoResults(data.length === 0);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error("Error fetching favorites:", error);
      setRestaurants([]);
      setNoResults(true);
    } finally {
      setLoading(false);
    }
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      fetchFavorites();
    }, [fetchFavorites])
  );

  const handleFoodCardPress = (item: any) => {
    // dispatch(setSelectedFood(item));
    // navigation.navigate('FoodDetailsScreen');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={styles.headerLeft}>
              <Icon name="arrow-back" size={24} color={colors.black} />
              <Text style={styles.headerTitle}>MY FAVOURITES STORES</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightheader}>
            <TouchableOpacity onPress={() => navigation.navigate('MainTabs')}>
              <Icon name="home" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={colors.primary} />
          </View>
        ) : noResults ? (
          <View style={styles.notFoundContainer}>
            {/* <Image 
              source={require('../assets/images/no-favorites.png')} // Make sure to add this image
              style={styles.noResultsImage}
            /> */}
            <Text style={styles.notFoundText}>No favorites found</Text>
            {/* <Text style={styles.notFoundSubText}>
              Try adding some restaurants to your favorites
            </Text> */}
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.restaurantList}>
              {restaurants.map((item) => (
                <RestaurantItem key={item._id} item={item} />
              ))}
            </View>
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.black,
    fontFamily: typography.medium,
  },
  rightheader: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noResultsImage: {
    width: 120,
    height: 120,
    marginBottom: 20,
    opacity: 0.5,
  },
  notFoundText: {
    fontFamily: typography.medium,
    fontSize: 18,
    color: colors.black,
    marginBottom: 8,
  },
  notFoundSubText: {
    fontFamily: typography.regular,
    fontSize: 14,
    color: colors.gray,
    textAlign: 'center',
  },
  restaurantList: {
    padding: 16,
  },
});

export default FavoritesScreen;