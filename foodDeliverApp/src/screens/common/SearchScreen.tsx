import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, globalStyles, textStyles } from '../../styles/globalStyles';
import { debounce } from 'lodash';
import { foodService } from '../../api/services/foodService';
import RestaurantItem from '../../components/common/RestrauntItem';
import SkeletonUI from '../../components/common/SkeltonUI';
import { useNavigation } from '@react-navigation/native';
import { ColorMatrix } from 'react-native-color-matrix-image-filters';

const placeholderImage = '/api/placeholder/100/100';

interface Restaurant {
  _id: string;
  name: string;
  rating: number;
  deliveryTime: string;
  cuisines: string[];
  location: string;
  acceptingOrders: string;
  image: string[];
  coupon?: any[];
  distanceFromUser: number;
  minimumOrder:number;
}

interface MenuItem {
  _id: string;
  name: string;
  restaurant: string;
  price: number;
  restaurantId: {
    _id: string;
    name: string;
  };
  coupon?: any[];
}

interface ApiRestaurant {
  _id: string;
  name: string;
  rating: number;
  address: string;
  resturantCategory?: string;
  isOpen: boolean;
  formattedOpeningTime: string;
  image?: string[];
  coupons?: any[];
}

interface ApiMenuItem {
  _id: string;
  name: string;
  price: number;
  restaurantId?:Restaurant
}

interface ApiResponse {
  success: boolean;
  data: {
    restaurants: ApiRestaurant[];
    menu: ApiMenuItem[];
  };
}

const SearchScreen: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>([]);
  const [filteredMenuItems, setFilteredMenuItems] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigation = useNavigation() as any;

  const searchRestaurantsAndMenuItems = useCallback(async (query: string) => {
    if (query.length > 0) {
      setIsLoading(true);
      try {
        const result = await foodService.searchRestaurantsAndMenuItems(query);
        if (result.status === 200) {
          const formattedRestaurants = formatRestaurants(result?.data?.data?.restaurants || []);
          const formattedMenuItems = formatMenuItems(result?.data?.data?.menu || []);
          
          setFilteredRestaurants(formattedRestaurants);
          setFilteredMenuItems(formattedMenuItems);
        } else {
          setFilteredRestaurants([]);
          setFilteredMenuItems([]);
        }
      } catch (error) {
        console.error('Error searching:', error);
        setFilteredRestaurants([]);
        setFilteredMenuItems([]);
      } finally {
        setIsLoading(false);
      }
    } else {
      setFilteredRestaurants([]);
      setFilteredMenuItems([]);
    }
  }, []);

  const debouncedSearch = useCallback(
    debounce((query: string) => searchRestaurantsAndMenuItems(query), 300),
    [searchRestaurantsAndMenuItems]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
    return () => debouncedSearch.cancel();
  }, [searchQuery, debouncedSearch]);

  const formatRestaurants = (restaurants: any[]): Restaurant[] => {
    return restaurants.map((restaurant) => ({
      _id: restaurant._id,
      name: restaurant.name,
      image: restaurant.image?.[0] || placeholderImage,
      rating: restaurant.rating || 0,
      deliveryTime: restaurant.deliveryTime || 'N/A',
      cuisines: [restaurant.resturantCategory || 'General'],
      location: restaurant.address || 'Location not available',
      acceptingOrders: restaurant.isOpen ? 'Accepting Orders' : 'Closed',
      coupon: restaurant.coupons || [],
      distanceFromUser:restaurant?.distanceFromUser,
      minimumOrder:restaurant?.minimumOrder,
    }));
  };

  const formatMenuItems = (menuItems: any[]): MenuItem[] => {
    return menuItems.map(item => ({
      _id: item._id,
      name: item.name,
      restaurant: item?.restaurantId?.name || "Restaurant Name",
      price: item.price,
      restaurantId: item?.restaurantId,
      coupon: item?.restaurantId?.coupons || [],
    }));
  };

  // Updated key extractors to ensure uniqueness
  const restaurantKeyExtractor = (item: Restaurant) => `restaurant-${item._id}`;
  const menuItemKeyExtractor = (item: MenuItem) => `menu-${item._id}`;
  const contentKeyExtractor = (item: { key: string }) => `content-${item.key}`;

  const renderRestaurantItem = useCallback(({ item }: { item: Restaurant }) => (
    <RestaurantItem coupon={item?.coupon} item={item} />
  ), []);

  const renderMenuItem = useCallback(({ item }: { item: MenuItem }) => (
    <TouchableOpacity onPress={()=>  navigation.navigate('RestaurantListScreen', { restaurant: item?.restaurantId, coupon: item?.coupon })} style={styles.menuItem}>
      <View style={styles.menuItemDot} />
      <View style={styles.menuItemInfo}>
        <Text style={styles.menuItemName}>{item.name}</Text>
        <Text style={styles.menuItemRestaurant}>By {item.restaurant}</Text>
        <Text style={styles.menuItemPrice}>₹{item.price}</Text>
      </View>
    </TouchableOpacity>
  ), []);

  const RestaurantsSection = useCallback(() => (
    <View>
      <Text style={styles.sectionTitle}>RESTAURANTS</Text>
      <FlatList
        data={filteredRestaurants}
        renderItem={renderRestaurantItem}
        keyExtractor={restaurantKeyExtractor}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  ), [filteredRestaurants, renderRestaurantItem]);

  const MenuItemsSection = useCallback(() => (
    <View>
      <Text style={styles.sectionTitle}>ITEMS</Text>
      <FlatList
        data={filteredMenuItems}
        renderItem={renderMenuItem}
        keyExtractor={menuItemKeyExtractor}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
        windowSize={5}
      />
    </View>
  ), [filteredMenuItems, renderMenuItem]);

  const NoResultsView = useCallback(() => (
    <View style={styles.noResultsContainer}>
      <ColorMatrix
        matrix={[
          0.33, 0.33, 0.33, 0, 0,
          0.33, 0.33, 0.33, 0, 0,
          0.33, 0.33, 0.33, 0, 0,
          0, 0, 0, 1, 0,
        ]}
      >
        <Image
          source={require('../../assets/images/chef.png')}
          style={styles.noResultsImage}
          resizeMode="contain"
        />
      </ColorMatrix>
    </View>
  ), []);

  const renderContent = useCallback(() => {
    if (isLoading) {
      return <SkeletonUI />;
    }

    if (filteredRestaurants.length === 0 && filteredMenuItems.length === 0) {
      return <NoResultsView />;
    }

    return (
      <>
        {filteredRestaurants.length > 0 && <RestaurantsSection />}
        {filteredMenuItems.length > 0 && <MenuItemsSection />}
      </>
    );
  }, [isLoading, filteredRestaurants, filteredMenuItems]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="arrow-back" size={24} color={colors.black} />
          </TouchableOpacity>
          <View style={styles.searchContainer}>
            <TextInput
              style={styles.searchInput}
              placeholder="Search for restaurants"
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor={colors.black}
            />
            <TouchableOpacity style={styles.searchIcon}>
              <Icon name="search" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList
          data={[{ key: 'content' }]}
          renderItem={() => renderContent()}
          keyExtractor={contentKeyExtractor}
          ListHeaderComponentStyle={{ flex: 1 }}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  searchContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
    backgroundColor: colors.inputBg,
    borderRadius: 8,
  },
  searchInput: {
    ...globalStyles.input,
    backgroundColor:"white",
    flex: 1,
    paddingRight: 40,
  },
  searchIcon: {
    position: 'absolute',
    right: 8,
  },
  sectionTitle: {
    ...textStyles.semiBold,
    fontSize: 18,
    color: colors.black,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  menuItemDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.primary,
    marginRight: 12,
  },
  menuItemInfo: {
    flex: 1,
  },
  menuItemName: {
    ...textStyles.medium,
    fontSize: 16,
    color: colors.black,
    marginBottom: 2,
    textTransform: 'capitalize',
  },
  menuItemRestaurant: {
    ...textStyles.regular,
    fontSize: 14,
    color: colors.darkGray,
    marginBottom: 2,
  },
  menuItemPrice: {
    ...textStyles.medium,
    fontSize: 14,
    color: colors.black,
  },
  // noResultsContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   paddingTop: 50,
  // },
  noResultsText: {
    ...textStyles.medium,
    fontSize: 18,
    color: colors.darkGray,
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 50,
  },
  noResultsImage: {
    width: 500,
    height: 500,
  },
});

export default SearchScreen;