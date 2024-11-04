import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { colors, globalStyles, textStyles } from '../styles/globalStyles';
import { foodService } from '../api/services/foodService';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Grayscale } from 'react-native-color-matrix-image-filters';
import SpinnerLoader from './common/SppinerLoader';
import RestaurantItem from './common/RestrauntItem';
import SkeletonUI from './common/SkeltonUI';

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  address: string;
  rating: number;
  cuisine: string;
  openinghour: string;
  recomended?: string;
  openingTime: string;
  closingTime: string;
  isOpen: boolean;
  coupon?: any;
  deliveryTime: string;
  minimumOrder: number;
}

const RestaurantImage: React.FC<{ item: Restaurant; imageStyle: any }> = ({ item, imageStyle }) => {
  const imageComponent = (
    <Image 
      source={{ uri: item.image }} 
      style={imageStyle} 
      defaultSource={require('../assets/images/ordersFood.png')}
    />
  );

  return item.isOpen ? imageComponent : (
    <Grayscale>
      {imageComponent}
    </Grayscale>
  );
};

const Slider: React.FC<{ data: Restaurant[] }> = ({ data }) => {
  const navigation = useNavigation() as any;

  return (
    <View style={styles.sliderContainer}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {data.map((item) => (
          <TouchableOpacity
            key={item._id}
            style={styles.recommendedItem}
            onPress={() => navigation.navigate('RestaurantListScreen', { restaurant: item })}
          >
            <RestaurantImage item={item} imageStyle={styles.recommendedImage} />
            <View style={styles.discount}>
              <Text style={styles.discountText}>5% OFF</Text>
              <Text style={styles.discountSubtext}>Upto ₹50</Text>
            </View>
            <Text style={[
              styles.recommendedName,
              !item.isOpen && styles.closedText
            ]}>
              {item.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Text style={[styles.rating, !item.isOpen && styles.closedText]}>
                ★ {item.rating?.toFixed(1) || 'N/A'}
              </Text>
              <Text style={[styles.deliveryTime, !item.isOpen && styles.closedText]}>
                • {item?.deliveryTime}
              </Text>
            </View>
            <Text 
              style={[
                styles.address,
                !item.isOpen && styles.closedText
              ]} 
              numberOfLines={1} 
              ellipsizeMode="tail"
            >
              {item.address}
            </Text>
            {!item.isOpen ? (
              <Text style={[styles.openingTime, styles.closedText]}>
                Opens at {item.openingTime}
              </Text>
            ) : (
              // <Text style={styles.freeDelivery}>FREE DELIVERY ABOVE ₹1999/-</Text>
              <Text style={styles.freeDelivery}></Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const Restaurant: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filterOption, setFilterOption] = useState<'delivery' | 'selfPickup'>('delivery');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigation = useNavigation() as any;

  const fetchRestaurants = useCallback(async () => {
    try {
      setIsLoading(true);
      const isSelfPickup = filterOption === 'selfPickup';
      console.log('Fetching restaurants with isSelfPickup:', isSelfPickup);
      const response = await foodService.getAllRestaurants(isSelfPickup);

      // console.log('Fetched restaurants:', response.data.data);
      if (response && response.data && Array.isArray(response.data.data)) {
        // console.log('Fetched restaurants:%%%%%%%%%%', response.data.data);

        setRestaurants(response.data.data);
      } else {
        throw new Error('Invalid data format received from API');
      }
    } catch (error) {
      console.error('Error fetching restaurants:', error);
      setError('Failed to fetch restaurants. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, [filterOption]);

  useFocusEffect(
    useCallback(() => {
      fetchRestaurants();
    }, [fetchRestaurants])
  );

  const recommendedRestaurants = restaurants.filter(restaurant => restaurant.recomended);
  const firstTwoRestaurants = restaurants.slice(0, 2);
  const remainingRestaurants = restaurants.slice(2);

  const renderRestaurantItem = ({ item }: { item: Restaurant }) => (
    <RestaurantItem 
      item={{
        ...item,
        openingTime: item.openingTime,
        closingTime: item.closingTime,
        isOpen: item.isOpen,
        deliveryTime: item.deliveryTime,
        minimumOrder: item.minimumOrder ||150,
      }}
      coupon={item.coupons}
    />
  );

  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.restaurantCount}>{restaurants.length} RESTAURANTS NEAR YOU</Text>
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterOption === 'delivery' && styles.activeFilterButton]}
          onPress={() => setFilterOption('delivery')}
        >
          <Text
            style={[styles.filterButtonText, filterOption === 'delivery' && styles.activeFilterButtonText]}
          >
            Delivery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterOption === 'selfPickup' && styles.activeFilterButton]}
          onPress={() => setFilterOption('selfPickup')}
        >
          <Text
            style={[styles.filterButtonText, filterOption === 'selfPickup' && styles.activeFilterButtonText]}
          >
            Self Pickup
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return <SkeletonUI />;
  }

  if (error) {
    return (
      <View style={[globalStyles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <FlatList
        data={remainingRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={(item) => item._id}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {renderHeader()}
            {firstTwoRestaurants.map((item) => (
              <React.Fragment key={item._id}>
                {renderRestaurantItem({ item })}
              </React.Fragment>
            ))}
            {recommendedRestaurants.length > 0 && (
              <>
                <Text style={styles.title}>RECOMMENDED</Text>
                <Slider data={recommendedRestaurants} />
                <Text>dhjdhdh</Text>
              </>
            )}
          </>
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    backgroundColor: colors.bgGray,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...textStyles.mediumBlack,
    fontSize: 18,
    marginLeft: 16,
    marginBottom: 12,
    marginTop: 12,
  },
  restaurantCount: {
    ...textStyles.mediumBlack,
    marginBottom: 8,
    fontSize: 12
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    backgroundColor: 'white',
    borderRadius: 25,
  },
  filterButton: {
    paddingVertical: 2,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignItems: 'center',
  },
  activeFilterButton: {
    backgroundColor: '#FF8C00',
  },
  filterButtonText: {
    ...textStyles.medium,
    color: colors.darkGray,
    fontSize: 12,
  },
  activeFilterButtonText: {
    color: colors.white,
  },
  sliderContainer: {
    marginBottom: 14,
    marginTop: 8,
    backgroundColor: colors.bgGray,
  },
  recommendedItem: {
    width: 150,
    marginLeft: 16,
    marginBottom: 16,
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
  },
  address: {
    ...textStyles.regular,
    color: colors.darkGray,
    marginBottom: 2,
    width: '100%',
  },
  freeDelivery: {
    ...textStyles.medium,
    color: '#FF8C00',
    fontSize: 12,
  },
  openingTime: {
    ...textStyles.medium,
    color: colors.darkGray,
    fontSize: 12,
  },
  closedText: {
    color: '#888888',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    ...textStyles.medium,
    color: colors.error,
    textAlign: 'center',
  },
});

export default Restaurant;