import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
  TextInput,
  TouchableWithoutFeedback,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import {useRoute, useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors, textStyles} from '../styles/globalStyles';
import {foodService} from '../api/services/foodService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {addItem, removeItem, setRestaurant} from '../redux/slices/cartSlice';
import {RootState} from '../redux/store';
import Clipboard from '@react-native-clipboard/clipboard';
import {Grayscale} from 'react-native-color-matrix-image-filters';
import ItemRecommendedSlider from '../components/ItemRecommendSlider';

interface Restaurant {
  _id: string;
  name: string;
  image?: string;
  cuisine?: string;
  rating: number;
  openinghour: string;
  address: string;
  favorites?: any[];
  deliveryTime?: string;
  minimumOrder?: number;
  isOpen?: boolean;
}

interface Category {
  _id: string;
  name: string;
  image: string;
  type: string;
}

interface MenuItem {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  category: Category;
  specialOffer: boolean;
  specialOfferPrice?: number;
}

interface CategorizedMenuItem {
  name: string;
  items: MenuItem[];
}

const RestaurantListScreen: React.FC = () => {
  const route = useRoute<any>();
  const {restaurant, coupon} = route.params as any;
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart);

  const isOpenRestraunt = restaurant?.isOpen;
  console.log('restaurant36363636', restaurant);

  const [menuData, setMenuData] = useState<CategorizedMenuItem[]>([]);
  const [filteredMenuData, setFilteredMenuData] = useState<
    CategorizedMenuItem[]
  >([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [isMenuModalVisible, setMenuModalVisible] = useState(false);
  const [isFavorite, setIsFavorite] = useState(
    restaurant?.favorites?.length !== 0,
  );
  const [coupons, setCoupons] = useState(coupon || []);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);
  const [copiedCouponCode, setCopiedCouponCode] = useState('');

  // Animated values
  const scrollX = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  // Initial data fetch
  useEffect(() => {
    fetchMenuData();
    dispatch(setRestaurant(restaurant));
  }, []);
  const getTextColor = () => {
    return isOpenRestraunt ? colors.black : colors.gray;
  };

  // Search functionality
  useEffect(() => {
    if (searchQuery.trim()) {
      setIsSearching(true);
      const filtered = menuData
        .map(category => ({
          name: category.name,
          items: category.items.filter(
            item =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.description
                .toLowerCase()
                .includes(searchQuery.toLowerCase()),
          ),
        }))
        .filter(category => category.items.length > 0);
      setFilteredMenuData(filtered);
      // Expand all categories when searching
      setExpandedCategories(filtered.map(cat => cat.name));
    } else {
      setIsSearching(false);
      setFilteredMenuData(menuData);
    }
  }, [searchQuery, menuData]);

  const fetchMenuData = async () => {
    try {
      const response = await foodService.getDishesByRestaurant(restaurant._id);
      const categorizedMenu = categorizeMenu(response.data.data);
      setMenuData(categorizedMenu);
      setFilteredMenuData(categorizedMenu);
      setExpandedCategories(categorizedMenu.slice(0, 3).map(cat => cat.name));
    } catch (error) {
      console.error('Error fetching menu data:', error);
    }
  };

  const recommendedItems = React.useMemo(() => {
    return menuData
      .flatMap(category => category.items)
      .filter(item => item.specialOffer);
  }, [menuData]);

  const categorizeMenu = (data: MenuItem[]): CategorizedMenuItem[] => {
    const categories: {[key: string]: MenuItem[]} = {};
    data.forEach(item => {
      if (!categories[item.category.name]) {
        categories[item.category.name] = [];
      }
      categories[item.category.name].push(item);
    });
    return Object.entries(categories).map(([name, items]) => ({name, items}));
  };

  const toggleCategory = (categoryName: string) => {
    // Only allow toggling if restaurant is open
    if (isOpenRestraunt) {
      setExpandedCategories(prev =>
        prev.includes(categoryName)
          ? prev.filter(cat => cat !== categoryName)
          : [...prev, categoryName],
      );
    }
  };

  const toggleFavorite = async () => {
    try {
      await foodService.addFavoriteRestaurant(restaurant._id);
      setIsFavorite(prev => !prev);
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const copyCouponToClipboard = (couponCode: string) => {
    Clipboard.setString(couponCode);
    setCopiedCouponCode(couponCode);
    setShowCopiedMessage(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setShowCopiedMessage(false);
        setCopiedCouponCode('');
      });
    }, 2700);
  };

  const addToCart = (item: MenuItem) => {
    dispatch(addItem(item));
  };

  const removeFromCart = (item: MenuItem) => {
    dispatch(removeItem(item._id));
  };
  const handleRemoveFromCart = (itemId: string) => {
    dispatch(removeItem(itemId));
  };
  
  
  const renderNoResults = () => (
    <View style={styles.noResultsContainer}>
      <Icon name="search-off" size={48} color={colors.gray} />
      <Text style={styles.noResultsText}>
        No food items found for "{searchQuery}"
      </Text>
      <Text style={styles.noResultsSubText}>
        Try searching for something else
      </Text>
    </View>
  );

  const renderMenuItem = ({item}: {item: MenuItem}) => {
    const itemInCart = cart.items.find(cartItem => cartItem._id === item._id);
    const itemCount = itemInCart ? itemInCart.quantity : 0;

    console.log('menu ite,');

    return (
      <View style={[styles.menuItem, !isOpenRestraunt && {opacity: 0.5}]}>
        <View style={styles.menuItemInfo}>
          {item.specialOffer && (
            <View style={styles.recommendedContainer}>
              <Icon
                name="fiber-manual-record"
                size={8}
                color={isOpenRestraunt ? 'red' : colors.gray}
              />
              <Text style={[styles.recommendedText, {color: getTextColor()}]}>
                Recommended
              </Text>
            </View>
          )}
          <Text
            style={[
              textStyles.mediumBlack,
              {color: getTextColor(), textTransform: 'capitalize'},
            ]}>
            {item.name}
          </Text>
          <Text style={[textStyles.regular, {color: getTextColor()}]}>
            ₹{item.price}
          </Text>
          <Text
            style={[
              textStyles.regular,
              {
                color: getTextColor(),
                marginTop: 4,
                textTransform: 'capitalize',
              },
            ]}>
            {item.description}
          </Text>
        </View>
        <View style={styles.menuItemImageContainer}>
          {isOpenRestraunt ? (
            <Image
              source={{uri: item.image}}
              style={[styles.menuItemImage, !isOpenRestraunt && {opacity: 0.5}]}
            />
          ) : (
            <Grayscale>
              <Image
                source={{uri: item.image}}
                style={[
                  styles.menuItemImage,
                  !isOpenRestraunt && {opacity: 0.5},
                ]}
              />
            </Grayscale>
          )}
          {isOpenRestraunt &&
            (itemCount > 0 ? (
              <View style={styles.itemCountContainer}>
                <TouchableOpacity
                  onPress={() => removeFromCart(item)}
                  style={styles.countButton}>
                  <Icon name="remove" size={20} color={colors.lightGreen} />
                </TouchableOpacity>
                <Text style={styles.itemCountText}>{itemCount}</Text>
                <TouchableOpacity
                  onPress={() => addToCart(item)}
                  style={styles.countButton}>
                  <Icon name="add" size={20} color={colors.lightGreen} />
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => addToCart(item)}>
                <Text style={[textStyles.medium, {color: colors.lightGreen}]}>
                  ADD
                </Text>
              </TouchableOpacity>
            ))}
        </View>
      </View>
    );
  };

  const renderCategory = ({item}: {item: CategorizedMenuItem}) => (
    <View style={styles.categoryContainer}>
      <TouchableOpacity
        onPress={() => toggleCategory(item.name)}
        style={[
          styles.categoryHeader,
          // Add visual feedback for disabled state when restaurant is closed
          !isOpenRestraunt && {opacity: 0.5},
        ]}
        disabled={!isOpenRestraunt} // Disable the touchable when restaurant is closed
      >
        <Text
          style={[
            textStyles.semiBold,
            {color: colors.black, fontSize: 20, textTransform: 'uppercase'},
          ]}>
          {item.name}
        </Text>
        <Icon
          name={
            expandedCategories.includes(item.name)
              ? 'keyboard-arrow-up'
              : 'keyboard-arrow-down'
          }
          size={24}
          color={isOpenRestraunt ? colors.black : colors.gray}
        />
      </TouchableOpacity>
      {expandedCategories.includes(item.name) && (
        <FlatList
          data={item.items}
          renderItem={renderMenuItem}
          keyExtractor={item => item._id}
        />
      )}
    </View>
  );

  const renderCouponItem = ({item, index}: {item: any; index: number}) => {
    const inputRange = [
      (index - 1) * Dimensions.get('window').width,
      index * Dimensions.get('window').width,
      (index + 1) * Dimensions.get('window').width,
    ];
    const scale = scrollX.interpolate({
      inputRange,
      outputRange: [0.8, 1, 0.8],
      extrapolate: 'clamp',
    });

    return (
      <TouchableOpacity
        onPress={() =>
          isOpenRestraunt && copyCouponToClipboard(item.couponcode)
        }
        style={styles.couponItem}>
        <Animated.View style={[styles.couponInner, {transform: [{scale}]}]}>
          <View style={styles.couponImageContainer}>
            {isOpenRestraunt ? (
              <Image source={{uri: item.image}} style={styles.couponImage} />
            ) : (
              <Grayscale>
                <Image source={{uri: item.image}} style={styles.couponImage} />
              </Grayscale>
            )}
          </View>
          <View style={styles.couponContent}>
            <View style={{flexDirection: 'row', gap: 2, alignItems: 'center'}}>
              <Text
                style={[
                  styles.couponDiscount,
                  !isOpenRestraunt && {color: colors.gray},
                ]}>
                {item.percent}%{' '}
                {item.maxDiscountAmount
                  ? `Upto ₹${item.maxDiscountAmount}`
                  : 'Off'}
              </Text>
              <Text
                style={[
                  styles.couponCondition,
                  !isOpenRestraunt && {color: colors.gray},
                ]}>
                | {item.minOrderAmount ? `Above ₹${item.minOrderAmount}` : ''}
              </Text>
            </View>
            <Text
              style={[
                styles.couponUseCode,
                !isOpenRestraunt && {color: colors.gray},
              ]}>
              Use code {item.couponcode}
            </Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.black} />
        </TouchableOpacity>
        <View style={styles.rightheader}>
          <TouchableOpacity>
            <Icon name="home" size={24} color={colors.black} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="share" size={24} color={colors.black} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView>
        <View style={{backgroundColor: colors.white, padding: 16}}>
          <View style={styles.restaurantInfo}>
            <Text style={[styles.restaurantName, {color: getTextColor()}]}>
              {restaurant.name}
            </Text>
            <Text style={[styles.restaurantSubtitle, {color: getTextColor()}]}>
              {restaurant.cuisine || 'North Indian'}
            </Text>
            {!isOpenRestraunt && (
              <Text style={[textStyles.medium, {color: 'red', marginTop: 8}]}>
                Restaurant is currently closed
              </Text>
            )}
          </View>

          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}
            disabled={!isOpenRestraunt}>
            <Icon
              name={isFavorite ? 'favorite' : 'favorite-border'}
              size={24}
              color={
                !isOpenRestraunt
                  ? colors.gray
                  : isFavorite
                  ? 'gray'
                  : colors.gray
              }
            />
          </TouchableOpacity>

          <View
            style={[
              styles.restaurantDetails,
              !isOpenRestraunt && {opacity: 0.5},
            ]}>
            <View style={styles.ratingContainer}>
              <View style={styles.starContainer}>
                <Icon name="star" size={16} color={getTextColor()} />
                <Text style={[styles.rating, {color: getTextColor()}]}>
                  {restaurant.rating}
                </Text>
              </View>
              <Text style={[styles.ratingCount, {color: getTextColor()}]}>
                100+ ratings
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={[styles.rating, {color: getTextColor()}]}>
                {restaurant?.deliveryTime}
              </Text>
              <Text style={[styles.ratingCount, {color: getTextColor()}]}>
                Delivery Time
              </Text>
            </View>
            <View style={styles.ratingContainer}>
              <Text style={[styles.rating, {color: getTextColor()}]}>
                ₹{restaurant?.minimumOrder}
              </Text>
              <Text style={[styles.ratingCount, {color: getTextColor()}]}>
                Minimum Order
              </Text>
            </View>
          </View>

          <>
            <Animated.FlatList
              data={coupons}
              renderItem={renderCouponItem}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.couponSlider}
              snapToInterval={Dimensions.get('window').width - 60}
              decelerationRate="fast"
              onScroll={Animated.event(
                [{nativeEvent: {contentOffset: {x: scrollX}}}],
                {useNativeDriver: true},
              )}
            />

            <View
              style={[
                styles.searchContainer,
                !isOpenRestraunt && {opacity: 0.5},
              ]}>
              <TextInput
                style={[
                  styles.searchInput,
                  !isOpenRestraunt && {color: colors.gray},
                ]}
                placeholder="Search for items..."
                placeholderTextColor={colors.gray}
                value={searchQuery}
                onChangeText={isOpenRestraunt ? setSearchQuery : undefined}
                editable={isOpenRestraunt}
                selectTextOnFocus={isOpenRestraunt}
                disableFullscreenUI
              />
              <TouchableOpacity
                onPress={() => isOpenRestraunt && setSearchQuery('')}
                style={styles.searchIcon}
                disabled={!isOpenRestraunt}>
                <Icon
                  name={searchQuery ? 'close' : 'search'}
                  size={24}
                  color={colors.gray}
                />
              </TouchableOpacity>
            </View>
          </>
        </View>
        {recommendedItems.length > 0 && searchQuery=== '' && (
          <ItemRecommendedSlider
            items={recommendedItems}
            isOpenRestraunt={isOpenRestraunt}
            addToCart={addToCart}
            removeFromCart={handleRemoveFromCart}
            cart={cart}
          />
        )}

        <View style={{backgroundColor: '#f1f2f6'}}>
          <View style={{marginTop: 16, marginBottom: 16}}>
            {isSearching && filteredMenuData.length === 0 ? (
              renderNoResults()
            ) : (
              <FlatList
                data={isSearching ? filteredMenuData : menuData}
                renderItem={renderCategory}
                keyExtractor={item => item.name}
                scrollEnabled={false}
              />
            )}
          </View>
        </View>
     
      </ScrollView>
     {isOpenRestraunt &&(
       <TouchableOpacity
        style={styles.menuButton}
        onPress={() => setMenuModalVisible(true)}>
        <Text style={[textStyles.medium, {color: colors.white}]}>MENU</Text>
      </TouchableOpacity>
     )}
     {
      !isOpenRestraunt &&(
        <View style={styles.cartContainerDisabled}>
        <Text style={{textAlign:'center'}}>Currently Not Accepting Orders!</Text>
      </View>
      )
     }
      {isOpenRestraunt && (
        <>
          <TouchableOpacity
            style={styles.menuButton}
            onPress={() => setMenuModalVisible(true)}>
            <Text style={[textStyles.medium, {color: colors.white}]}>MENU</Text>
          </TouchableOpacity>

          {cart.items.length > 0 && (
            <View style={styles.cartContainer}>
              <Text style={[textStyles.medium, {color: colors.white}]}>
                {cart.items.reduce((total, item) => total + item.quantity, 0)}{' '}
                Items | ₹{cart.subtotal}
              </Text>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('MyBasketScreen', {coupon: coupon})
                }
                style={styles.viewCartButton}>
                <Text style={[textStyles.medium, {color: colors.white}]}>
                  VIEW CART
                </Text>
              </TouchableOpacity>
            </View>
          )}
        </>
      )}

      {showCopiedMessage && (
        <Animated.View style={[styles.copiedMessage, {opacity: fadeAnim}]}>
          <Text style={styles.copiedMessageText}>
            {copiedCouponCode} Coupon Copied to clipboard
          </Text>
        </Animated.View>
      )}
      <Modal
        visible={isMenuModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setMenuModalVisible(false)}>
        <TouchableWithoutFeedback onPress={() => setMenuModalVisible(false)}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View style={styles.modalContent}>
                <View style={styles.modalHeader}>
                  <Text
                    style={[
                      textStyles.semiBold,
                      styles.modalTitle,
                      {color: 'gray'},
                    ]}>
                    MENU
                  </Text>
                  <TouchableOpacity onPress={() => setMenuModalVisible(false)}>
                    <Icon name="close" size={24} color={colors.black} />
                  </TouchableOpacity>
                </View>
                <ScrollView>
                  {menuData.map(category => (
                    <TouchableOpacity
                      key={category.name}
                      style={styles.modalItem}
                      onPress={() => {
                        toggleCategory(category.name);
                        setMenuModalVisible(false);
                      }}>
                      <Text style={[textStyles.medium, {color: 'gray'}]}>
                        {category.name}
                      </Text>
                      <Text style={[textStyles.regular, {color: 'gray'}]}>
                        {category.items.length}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
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
  restaurantDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    marginBottom: 8,
    paddingBottom: 16,
  },
  restaurantInfo: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  restaurantName: {
    ...textStyles.semiBold,
    fontSize: 24,
    color: colors.black,
  },
  restaurantSubtitle: {
    ...textStyles.regular,
    color: 'gray',
    marginTop: 4,
  },
  ratingContainer: {
    marginTop: 8,
    textAlign: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  starContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  rating: {
    ...textStyles.medium,
    marginLeft: 4,
    color: colors.black,
  },
  ratingCount: {
    ...textStyles.regular,
    color: 'gray',
    marginLeft: 8,
  },
  deliveryInfo: {
    ...textStyles.regular,
    color: colors.gray,
    marginTop: 4,
  },
  favoriteButton: {
    position: 'absolute',
    top: 40,
    right: 16,
    backgroundColor: colors.white,
    padding: 8,
    borderRadius: 20,
    elevation: 2,
  },
  offerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.lightGray,
  },
  offerText: {
    ...textStyles.regular,
    marginLeft: 8,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderColor: colors.bgGray,
    borderWidth: 1,
    marginBottom: 16,
    marginTop: 16,
  },
  searchInput: {
    ...textStyles.regular,
    flex: 1,
    paddingVertical: 8,
  },
  searchIcon: {
    marginLeft: 8,
  },
  viewCartButton: {
    backgroundColor: colors.lightGreen,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  viewCartIcon: {
    marginLeft: 8,
  },
  categoryContainer: {
    marginBottom: 16,
  },
  cartContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.lightGreen,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  cartContainerDisabled: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 7,
    backgroundColor: 'black',
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
  },

  menuItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
    backgroundColor: colors.white,
  },
  menuItemInfo: {
    flex: 1,
    marginRight: 16,
  },
  menuItemImageContainer: {
    alignItems: 'center',
    width: 120, // Increased to accommodate the shadow of the add button
  },
  menuItemImage: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginBottom: 16, // Increased to make room for the add button
  },
  addButton: {
    backgroundColor: colors.white,
    paddingHorizontal: 24,
    paddingVertical: 6,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  itemCountContainer: {
    backgroundColor: colors.white,
    paddingHorizontal: 8,
    paddingVertical: 1,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 0,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  countButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },
  itemCountText: {
    ...textStyles.medium,
    color: colors.lightGreen,
    paddingHorizontal: 12,
  },

  recommendedContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  recommendedText: {
    ...textStyles.regular,
    color: 'red',
    marginLeft: 4,
  },
  menuButton: {
    position: 'absolute',
    bottom: 40,
    left: '50%',
    transform: [{translateX: -50}],
    backgroundColor: '#5d8dd4',
    paddingHorizontal: 30,
    paddingVertical: 8,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '80%',
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: 16,
    fontSize: 18,
  },
  modalItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  couponSlider: {
    paddingVertical: 10,
  },
  couponItem: {
    width: Dimensions.get('window').width - 60,
    marginHorizontal: 10,
  },
  couponInner: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    flexDirection: 'row',
    alignItems: 'center',
  },
  couponImageContainer: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  couponImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  couponContent: {
    flex: 1,
  },
  couponDiscount: {
    ...textStyles.semiBold,
    fontSize: 14,
    color: '#d32f2f',
    marginBottom: 2,
  },
  couponCondition: {
    ...textStyles.regular,
    fontSize: 14,
    color: '#757575',
    marginBottom: 2,
  },
  couponUseCode: {
    ...textStyles.medium,
    fontSize: 12,
    color: '#212121',
  },
  copiedMessage: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: '#4A90E2',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  copiedMessageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  noResultsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: colors.white,
  },
  noResultsText: {
    ...textStyles.medium,
    fontSize: 16,
    color: colors.black,
    marginTop: 16,
    textAlign: 'center',
  },
  noResultsSubText: {
    ...textStyles.regular,
    fontSize: 14,
    color: colors.gray,
    marginTop: 8,
    textAlign: 'center',
  },
});

export default RestaurantListScreen;
