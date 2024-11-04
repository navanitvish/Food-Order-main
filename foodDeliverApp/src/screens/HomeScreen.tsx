import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  Image,
  TextInput,
  Dimensions,
  ScrollView,
  RefreshControl,
} from 'react-native';
import {useFocusEffect, useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {RootState} from '../redux/store';
import {foodService} from '../api/services/foodService';
import {colors, globalStyles, typography} from '../styles/globalStyles';
import CardSlider from '../components/CardSlider';
import {userService} from '../api/services/userService';
import Restaurant from '../components/Restraunt';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface FoodCategory {
  id: string;
  name: string;
  icon: string;
}

const {width} = Dimensions.get('window');
const numColumns = 4;
const itemWidth = width / numColumns;

const HomePage: React.FC = () => {
  const [location, setLocation] = useState('Other');
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [fullName, setFullName] = useState('');
  const navigation = useNavigation() as any;
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<any>(null);
  const [refreshing, setRefreshing] = useState(false);

  const handleLocationPress = () => {
    navigation.navigate('LocationDetails');
  };

  useEffect(() => {
    if (isSearchFocused) {
      navigation.navigate('EXPLORE');
      setIsSearchFocused(false);
    }
  }, [isSearchFocused, navigation]);

  const fetchCategories = async () => {
    try {
      const response = await foodService.getFoodCategories();
      if (Array.isArray(response?.data?.data)) {
        const formattedCategories: FoodCategory[] = response.data.data.map(
          (category: any) => ({
            id: category._id || category.id,
            name: category.name || '',
            icon: category.image,
          }),
        );
        setFoodCategories(formattedCategories);
      } else {
        console.error('Invalid data structure received from API');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    }
  };

  const fetchUserProfile = async () => {
    try {
      const response = await userService.getProfile();
      if (response.data.success) {
        const profileData = response.data.data;
        setFullName(profileData.name || '');
        setLocation(profileData.tag || '');
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const handleSearch = (text: string) => {
    setSearchQuery(text);
  };

  // Combined refresh function for all API calls
  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Execute all fetch operations in parallel
      await Promise.all([
        fetchCategories(),
        fetchUserProfile(),
        // Add any other API calls here that need refreshing
      ]);
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  // Use useFocusEffect for fetchUserProfile to run on every focus
  useFocusEffect(
    useCallback(() => {
      fetchUserProfile();
    }, [])
  );

  // Initial data fetch
  useEffect(() => {
    fetchCategories();
  }, []);

  const renderCategoryItem = (item: FoodCategory) => (
    <TouchableOpacity
      key={item.id}
      style={styles.categoryItem}
      onPress={() =>
        navigation.navigate('CategoryScreen', {
          categoryId: item.id,
          categoryName: item.name,
          icon: item.icon,
          itemCategories:
            foodCategories?.length > 0 &&
            foodCategories?.map((d: any) => ({
              id: d.id,
              name: d.name,
            })),
        })
      }>
      <Image source={{uri: item.icon}} style={styles.categoryIcon} />
      <Text style={styles.categoryName} numberOfLines={2} ellipsizeMode="tail">
        {item.name}
      </Text>
    </TouchableOpacity>
  );

  const categoriesWrapperWidth =
    itemWidth * Math.ceil(foodCategories.length / 2);

  const renderHeader = () => (
    <>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.locationButton}
          onPress={handleLocationPress}>
          <Icon name="location-on" size={24} color={colors.primary} />
          <Text style={styles.locationText}>
            {location ? location : 'Select Location'}
          </Text>
          <Icon name="keyboard-arrow-down" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Promotions')}>
          <Icon name="local-offer" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      <Text style={styles.titleText}>What would you like to eat?</Text>

      <View style={styles.searchContainer}>
        <Icon
          name="search"
          size={24}
          color={colors.gray}
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.searchInput}
          placeholder="Search for stores or items..."
          value={searchQuery}
          onChangeText={handleSearch}
          placeholderTextColor={colors.black}
          onFocus={() => setIsSearchFocused(true)}
        />
        <TouchableOpacity
          onPress={() => {
            /* Handle voice search */
          }}>
          <Icon name="mic" size={24} color={colors.gray} />
        </TouchableOpacity>
      </View>

      <CardSlider />

      <Text style={styles.sectionTitle}>{fullName}, What's on your mind?</Text>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.categoriesContainer}>
        <View
          style={[styles.categoriesWrapper, {width: categoriesWrapperWidth}]}>
          {foodCategories.map(renderCategoryItem)}
        </View>
      </ScrollView>
    </>
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={renderHeader}
        ListFooterComponent={<Restaurant />}
        data={[]} // Empty array as we don't need to render any items in the main list
        renderItem={null}
        keyExtractor={() => 'key'}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[colors.primary]} // Android
            tintColor={colors.primary} // iOS
            title="Pull to refresh" // iOS
          />
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...globalStyles.container,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    ...globalStyles.subtitle,
    marginHorizontal: 8,
    textTransform: 'capitalize',
  },
  titleText: {
    ...globalStyles.title,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.bgGray,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    ...globalStyles.input,
    flex: 1,
    backgroundColor: 'transparent',
    paddingVertical: 8,
  },
  sectionTitle: {
    ...globalStyles.subheading,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  categoriesContainer: {
    height: 200,
    marginBottom: 16,
  },
  categoriesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    alignContent: 'flex-start',
  },
  categoryItem: {
    width: itemWidth,
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  categoryIcon: {
    width: 70,
    height: 70,
    borderRadius: 50,
    marginBottom: 4,
  },
  categoryName: {
    ...globalStyles.text,
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
    maxWidth: itemWidth - 16,
  },
});

export default HomePage;
