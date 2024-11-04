import React, {useEffect, useState, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Alert,
  Image,
  Dimensions,
} from 'react-native';
import {colors, globalStyles, textStyles} from '../../styles/globalStyles';
import BackButton from '../../components/common/BackButton';
import {foodService} from '../../api/services/foodService';
import SpinnerLoader from '../../components/common/SppinerLoader';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SkeletonUI from '../../components/common/SkeltonUI';
import RestaurantItem from '../../components/common/RestrauntItem';

interface Restaurant {
  _id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  address: string;
  deliveryTime: string;
  offer?: string;
}

interface CategoryItem {
  id: string;
  name: string;
}

const CategoryScreen: React.FC<any> = ({route, navigation}) => {
  const {categoryName, itemCategories} = route.params;
  const [loading, setLoading] = useState(false);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortedCategories, setSortedCategories] =
    useState<CategoryItem[]>(itemCategories);

  const shuffleArray = (array: any[]) => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

  const updateSortedCategories = useCallback(
    (filters: string[]) => {
      const activeCategories = itemCategories.filter(cat =>
        filters.includes(cat.id),
      );
      const inactiveCategories = itemCategories.filter(
        cat => !filters.includes(cat.id),
      );
      const shuffledInactiveCategories = shuffleArray(inactiveCategories);
      setSortedCategories([...activeCategories, ...shuffledInactiveCategories]);
    },
    [itemCategories],
  );

  const fetchRestaurants = useCallback(async (categoryIds: string[]) => {
    console.log('Fetching restaurants with category IDs:', categoryIds);
    try {
      setLoading(true);
      const response = await foodService.filterRestaurantsByCategory(
        categoryIds,
      );


      console.log('Response:', response);


      if (response?.data?.data) {
        setRestaurants(response.data?.data);
      } else {
        setRestaurants([]);
      }
    } catch (err) {
      console.error('Error fetching restaurants:', err);
      // Alert.alert(
      //   'Error',
      //   'There was a problem fetching the restaurants. Please try again later.',
      //   [{text: 'OK'}],
      // );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const initialCategory = itemCategories.find(
      (cat: any) => cat.name === categoryName,
    );
    if (initialCategory) {
      setActiveFilters([initialCategory.id]);
      fetchRestaurants([initialCategory.id]);
      updateSortedCategories([initialCategory.id]);
    }
  }, [categoryName, itemCategories, fetchRestaurants, updateSortedCategories]);

  useEffect(() => {
    if (activeFilters.length > 0) {
      fetchRestaurants(activeFilters);
    }
  }, [activeFilters, fetchRestaurants]);

  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => {
      let newFilters;
      if (prev.includes(filterId)) {
        newFilters = prev.filter(id => id !== filterId);
      } else {
        newFilters = [filterId, ...prev];
      }

      if (newFilters.length === 0) {
        navigation.goBack();
        return prev;
      }

      updateSortedCategories(newFilters);
      return newFilters;
    });
  };

  const renderFilterItem = ({item}: {item: CategoryItem}) => (
    <TouchableOpacity
      style={[
        styles.filterItem,
        activeFilters.includes(item.id) && styles.activeFilterItem,
      ]}
      onPress={() => toggleFilter(item.id)}>
      <Text
        style={[
          styles.filterItemText,
          activeFilters.includes(item.id) && styles.activeFilterItemText,
        ]}>
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const renderRestaurantItem = ({item}: {item: Restaurant}) => (
 <RestaurantItem item={item} coupon={item.coupon}/>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Icon name="arrow-back" size={24} color={colors.black} />
              <Text
                style={{
                  fontSize: 18,
                  textTransform: 'capitalize',
                  color: colors.black,
                }}>
                {sortedCategories[0].name}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={styles.rightheader}>
            <TouchableOpacity>
              <Icon name="home" size={24} color={colors.black} />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.filtersContainer}>
          <TouchableOpacity style={styles.filterButton}>
            <Text style={styles.filterButtonText}>
              Filters {activeFilters.length > 0 ? activeFilters.length : ''}
            </Text>
          </TouchableOpacity>
          <FlatList
            data={sortedCategories}
            renderItem={renderFilterItem}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.filterList}
          />
        </View>
        {loading ? (
          <SkeletonUI />
        ) : restaurants.length > 0 ? (
          <FlatList
            data={restaurants}
            renderItem={renderRestaurantItem}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.noDataContainer}>
            <Image
              source={require('../../assets/images/chef.png')}
              style={styles.noDataImage}
              resizeMode="contain"
            />
            <Text style={styles.noDataText}>No Restaurants Found.</Text>
          </View>
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
  },
  rightheader: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
    borderBottomColor: colors.lightGray,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },
  title: {
    ...textStyles.mediumBlack,
    fontSize: 18,
    marginLeft: 16,
  },
  filtersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  filterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#f77f22',
    marginRight: 12,
  },
  filterButtonText: {
    ...textStyles.medium,
    color: '#f77f22',
  },
  filterList: {
    flex: 1,
  },
  filterItem: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.lightGray,
  },
  activeFilterItem: {
    backgroundColor: '#62b349',
    borderColor: '#62b349',
  },
  filterItemText: {
    ...textStyles.medium,
    color: colors.darkGray,
    textTransform:'capitalize'
  },
  activeFilterItemText: {
    color: colors.white,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    ...textStyles.medium,
    color: colors.darkGray,
    textAlign: 'center',
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  restaurantImage: {
    width: 120,
    height: 150,
    borderRadius: 8,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    ...textStyles.mediumBlack,
    fontSize: 16,
    marginBottom: 4,
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
  cuisine: {
    ...textStyles.regular,
    color: colors.darkGray,
    marginBottom: 2,
  },
  address: {
    ...textStyles.regular,
    color: colors.darkGray,
    marginBottom: 2,
  },
  offer: {
    ...textStyles.medium,
    color: colors.primary,
  },
  noDataContainer1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noDataImage: {
    width: Dimensions.get('window').width * 0.7,
    height: Dimensions.get('window').width * 0.7,
    marginBottom: 0,
  },
  noDataText1: {
    ...textStyles.medium,
    color: colors.darkGray,
    textAlign: 'center',
    fontSize: 16,
  },
});

export default CategoryScreen;
