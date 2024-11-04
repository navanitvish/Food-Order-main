import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Dimensions,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {colors, textStyles} from '../styles/globalStyles';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  useFocusEffect,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {useSelector, useDispatch} from 'react-redux';

import {RootState} from '../redux/store';
import OrderConfirmationModal from '../components/OrderModal';
import Toast from 'react-native-toast-message';
import {foodService} from '../api/services/foodService';
import {
  addItem,
  clearAppliedCoupon,
  clearCart,
  removeItem,
  setDiscount,
} from '../redux/slices/cartSlice';
import usePhonePePayment from '../hooks/usePaymentHook';
import {BASE_URL} from '../api/axios';
import {ENDPOINTS} from '../api/endpoint';
import {userService} from '../api/services/userService';

interface TipOptionProps {
  value: number;
  isSelected: boolean;
  onSelect: (value: number) => void;
}

const CartItemComponent: React.FC<{item: any}> = ({item}) => {
  const dispatch = useDispatch();

  return (
    <View style={styles.cartItem}>
      <Icon name="fiber-manual-record" size={16} color="red" />
      <Text style={[textStyles.mediumBlack, styles.itemName]}>{item.name}</Text>
      <View style={styles.quantityControl}>
        <TouchableOpacity onPress={() => dispatch(removeItem(item._id))}>
          <Icon name="remove" size={24} color="gray" />
        </TouchableOpacity>
        <Text
          style={[textStyles.medium, styles.quantity, {color: colors.black}]}>
          {item.quantity}
        </Text>
        <TouchableOpacity onPress={() => dispatch(addItem(item))}>
          <Icon name="add" size={24} color={colors.lightGreen} />
        </TouchableOpacity>
      </View>
      <Text style={[textStyles.mediumBlack, styles.price]}>
        ₹
        {(item.specialOffer && item.specialOfferPrice
          ? item.specialOfferPrice
          : item.price) * item.quantity}
      </Text>
    </View>
  );
};

const TipOption: React.FC<TipOptionProps> = ({value, isSelected, onSelect}) => (
  <TouchableOpacity
    style={[styles.tipOption, isSelected && styles.selectedTipOption]}
    onPress={() => onSelect(value)}>
    <Text
      style={[
        textStyles.medium,
        {color: colors.black},
        isSelected && styles.selectedTipText,
      ]}>
      ₹{value}
    </Text>
  </TouchableOpacity>
);

const MyBasketScreen: React.FC = () => {
  const navigation = useNavigation() as any;
  const dispatch = useDispatch();
  const route = useRoute() as any;

  const calculateCouponDiscount = (subtotal: number, coupon: any) => {
    if (!coupon) return 0;
    if (subtotal < coupon.minOrderAmount) return 0;
    const discountAmount = (subtotal * coupon.percent) / 100;
    return Math.min(discountAmount, coupon.maxDiscountAmount);
  };

  const {
    items,
    subtotal,
    deliveryFee,
    discount,
    couponDiscount,
    totalPrice,
    restaurant,
    appliedCoupon,
  } = useSelector((state: RootState) => state.cart);

  useEffect(() => {
    let calculatedCouponDiscount = 0;
    let calculatedTotalPrice = subtotal + deliveryFee;

    if (appliedCoupon) {
      const {percent, minOrderAmount, maxDiscountAmount} = appliedCoupon;
      console.log('subtotal', subtotal);
      console.log('percent', typeof percent);

      // Calculate coupon discount
      if (subtotal >= minOrderAmount) {
        calculatedCouponDiscount = Math.min(
          (subtotal * percent) / 100,
          maxDiscountAmount,
        );
      }
    }

    // Apply all discounts
    calculatedTotalPrice -= discount + calculatedCouponDiscount;

    // Ensure total price doesn't go below zero
    calculatedTotalPrice = Math.max(calculatedTotalPrice, 0);

    console.log('calculatedCouponDiscount', calculatedCouponDiscount);
    console.log('calculatedTotalPrice', calculatedTotalPrice);

    // Here, you should update your state or perform any other necessary actions
    // with the calculatedCouponDiscount and calculatedTotalPrice values
  }, [appliedCoupon, subtotal, deliveryFee, discount]);

  console.log('copune discount', discount);

  const [selectedTip, setSelectedTip] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [orderNumber, setOrderNumber] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {submitHandler} = usePhonePePayment();
  const [location, setLocation] = useState('');

  const selectedLocation = useSelector((state: RootState) => {
    const {locations, selectedLocationId} = state.locations;
    return locations.find(location => location.id === selectedLocationId);
  });

  // Use useFocusEffect for fetchUserProfile to run on every focus
  useFocusEffect(
    useCallback(() => {
      const fetchUserProfile = async () => {
        try {
          const response = await userService.getProfile();
          if (response.data.success) {
            const profileData = response.data.data;
            console.log('Profile Data:', profileData);
            setLocation(profileData.address || '');
          }
        } catch (error) {
          console.error('Error fetching user profile:', error);
        }
      };

      fetchUserProfile();
    }, []),
  );

  const handleTipSelection = (value: number) => {
    setSelectedTip(value);
    dispatch(setDiscount(-value));
  };

  const handleCloseModal = () => {
    setModalVisible(false);
    navigation.navigate('OrderScreen');
  };
  const createOrder = async (mehtod: any) => {
    if (items.length === 0) {
      Toast.show({
        type: 'error',
        text1: 'Empty Cart',
        text2: 'Please add items to your cart before placing an order.',
      });
      return;
    }

    const formattedData = {
      items: items.map((item: any) => ({
        menuItemId: item._id,
        price: Number(item.price),
        totalprice: Number(item.price * item.quantity),
        quantity: Number(item.quantity),
      })),
      coupon: appliedCoupon?._id || null,
      address: location|| '',
      totalAmount: Number(totalPrice), // Ensure it's a number
      payment: {
        method: 'UPI',
        status: 'complete',
      },
      orderStatus: 'complete',
      restaurant: restaurant?._id || '',
    };

    try {
      // Log the exact request that will be sent
      console.log('Request Body:', JSON.stringify(formattedData, null, 2));

      // Get token and log it (mask sensitive parts)
      // const token = await getToken();
      // console.log("Token being used:", token ? `${token.substring(0, 10)}...` : 'No token');

      // Make the request with detailed logging
      console.log(`Making request to: ${BASE_URL}${ENDPOINTS.CREATE_ORDER}`);
      const response = await foodService.createOrder(formattedData);
      console.log('Response headers:', response.headers);
      console.log('Response data:', response.data);

      setModalVisible(true);
      dispatch(clearCart());
    } catch (error: any) {
      console.error('Error details:', {
        message: error.message,
        status: error.response?.status,
        statusText: error.response?.statusText,
        data: error.response?.data,
        headers: error.response?.headers,
      });

      // Try to get more detailed error information
      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'An error occurred while creating your order. Please try again.';

      Toast.show({
        type: 'error',
        text1: 'Order Creation Failed',
        text2: errorMessage,
      });
    }
  };

  const handlePlaceOrder = async () => {
    setIsLoading(true);
    try {
      // Initiate PhonePe payment
      const paymentResult = await submitHandler();
      console.log('Payment Result:', paymentResult);

      if (paymentResult) {
        if (paymentResult.status === 'SUCCESS') {
          // If payment is successful, create the order
          await createOrder(paymentResult?.paymentMethod);
        } else {
          Toast.show({
            type: 'error',
            text1: 'Payment Failed',
            text2: 'The payment was not successful. Please try again.',
          });
        }
      }
    } catch (error) {
      console.error('Error during payment or order creation:', error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  const renderEmptyCart = () => (
    <View style={styles.emptyCartContainer}>
      <Image
        source={require('../assets/images/emptyCart.png')}
        style={styles.emptyCartImage}
      />
      <Text style={styles.emptyCartText}>Your cart is empty</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.scrollContent}
        contentContainerStyle={styles.scrollContentContainer}>
        {items.length > 0 ? (
          <>
            <View style={styles.header}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Icon name="arrow-back" size={24} color={colors.black} />
              </TouchableOpacity>
              <View style={styles.headerTextContainer}>
                <Text style={[textStyles.bold, styles.headerTitle]}>
                  {restaurant?.name || 'Restaurant Name'}
                </Text>
                <Text style={[textStyles.regular, {color: colors.black}]}>
                  {items.length} Item{items.length !== 1 ? 's' : ''} | ETA{' '}
                  {restaurant?.openinghour || 'N/A'}
                </Text>
              </View>
            </View>
            <View style={{backgroundColor: 'white'}}>
              <Text
                style={[
                  textStyles.semibold,
                  styles.sectionTitle,
                  {color: colors.black},
                ]}>
                ITEMS IN CART
              </Text>
              <View style={{paddingHorizontal: 20}}>
                <View
                  style={{
                    borderBottomWidth: 0.2,
                    borderBottomColor: 'gray',
                    paddingHorizontal: 5,
                    marginVertical: 10,
                  }}
                />
              </View>
              {items.map(item => (
                <CartItemComponent key={item._id} item={item} />
              ))}
            </View>

            <View style={styles.tipSection}>
              <Icon
                name="account-balance-wallet"
                size={24}
                color={colors.black}
              />
              <Text
                style={[
                  textStyles.bold,
                  styles.tipTitle,
                  {color: colors.black},
                ]}>
                Tip your delivery partner
              </Text>
            </View>

            <View style={styles.tipOptions}>
              {[10, 20, 30].map(value => (
                <TipOption
                  key={value}
                  value={value}
                  isSelected={selectedTip === value}
                  onSelect={handleTipSelection}
                />
              ))}
              <TouchableOpacity style={styles.tipOption}>
                <Text style={textStyles.medium}>Other</Text>
              </TouchableOpacity>
            </View>

            <View style={{paddingHorizontal: 20, borderRadius: 9}}>
              {appliedCoupon ? (
                <View style={styles.appliedCouponContainer}>
                  <View style={styles.appliedCouponHeader}>
                    <Icon name="local-offer" size={24} color={colors.primary} />
                    <Text style={[textStyles.medium, styles.appliedCouponText]}>
                      '{appliedCoupon.couponcode}' Applied
                    </Text>
                    <TouchableOpacity
                      onPress={() => dispatch(clearAppliedCoupon())}>
                      <Text style={styles.removeCouponText}>Remove</Text>
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.savedText}>
                    You saved ₹{couponDiscount.toFixed(2)}
                  </Text>
                  <Text style={styles.couponDetailsText}>
                    {appliedCoupon.description}
                  </Text>
                </View>
              ) : (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Offers', {
                      coupon: route?.params?.coupon,
                    })
                  }
                  style={styles.couponButton}>
                  <Icon name="local-offer" size={24} color={colors.primary} />
                  <Text style={[textStyles.medium, styles.couponText]}>
                    Apply Coupon
                  </Text>
                  <Icon name="chevron-right" size={24} color={colors.black} />
                </TouchableOpacity>
              )}
            </View>

            <View style={styles.billDetails}>
              <Text
                style={[
                  textStyles.bold,
                  styles.billTitle,
                  {color: colors.black},
                ]}>
                Bill Details
              </Text>
              <View style={styles.billRow}>
                <Text style={[textStyles.regular, {color: colors.black}]}>
                  Item Total
                </Text>
                <Text style={textStyles.mediumBlack}>
                  ₹{subtotal.toFixed(2)}
                </Text>
              </View>
              {appliedCoupon && (
                <View style={styles.billRow}>
                  <Text style={[textStyles.regular, {color: colors.black}]}>
                    Coupon Discount ({appliedCoupon.percent}% off)
                  </Text>
                  <Text
                    style={[
                      textStyles.mediumBlack,
                      {color: colors.lightGreen},
                    ]}>
                    -₹{couponDiscount.toFixed(2)}
                  </Text>
                </View>
              )}
              {discount > 0 && (
                <View style={styles.billRow}>
                  <Text style={[textStyles.regular, {color: colors.black}]}>
                    Other Discounts
                  </Text>
                  <Text
                    style={[
                      textStyles.mediumBlack,
                      {color: colors.lightGreen},
                    ]}>
                    -₹{discount.toFixed(2)}
                  </Text>
                </View>
              )}
              <View style={styles.billRow}>
                <Text style={[textStyles.regular, {color: colors.black}]}>
                  Delivery Charges | '0.0'km
                </Text>
                <Text style={textStyles.mediumBlack}>
                  ₹{deliveryFee.toFixed(2)}
                </Text>
              </View>
              <View style={[styles.billRow, styles.totalRow]}>
                <Text
                  style={[
                    textStyles.bold,
                    styles.totalText,
                    {color: colors.black},
                  ]}>
                  To Pay Amount
                </Text>
                <Text style={[textStyles.bold, styles.totalAmount]}>
                  ₹{totalPrice.toFixed(2)}
                </Text>
              </View>
            </View>
          </>
        ) : (
          renderEmptyCart()
        )}
      </ScrollView>

      {items.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.deliverTo}>
            <Text
              style={[
                textStyles.bold,
                styles.deliverToTitle,
                {color: colors.black},
              ]}>
              DELIVER TO
            </Text>
            <View style={styles.deliverToContent}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={[textStyles.mediumBlack, {width: 300}]}>
                {location || 'Select delivery location'}
              </Text>
              <TouchableOpacity
                onPress={() => navigation.navigate('Locations')}>
                <Text style={[textStyles.medium, styles.changeButton]}>
                  CHANGE
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            onPress={handlePlaceOrder}
            style={styles.placeOrderButton}>
            <Text style={[textStyles.bold, styles.placeOrderText]}>
              PLACE ORDER
            </Text>
          </TouchableOpacity>
        </View>
      )}

      <OrderConfirmationModal
        visible={modalVisible}
        onClose={handleCloseModal}
        orderNumber={orderNumber}
      />
    </SafeAreaView>
  );
};
const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  headerTextContainer: {
    marginLeft: 16,
  },
  headerTitle: {
    fontSize: 18,
    color: colors.black,
  },
  scrollContent: {
    flex: 1,
    backgroundColor: colors.bgGray,
  },
  scrollContentContainer: {
    paddingBottom: 120, // Add padding to the bottom of the scroll content
  },
  sectionTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
    paddingHorizontal: 16,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  itemName: {
    flex: 1,
    marginLeft: 8,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 0.2,
    padding: 4,
    borderRadius: 4,
    borderColor: 'gray',
  },
  quantity: {
    marginHorizontal: 8,
  },
  price: {
    minWidth: 60,
    textAlign: 'right',
  },
  commentSection: {
    backgroundColor: colors.white,
    padding: 16,
    marginTop: 16,
  },
  tipSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tipTitle: {
    marginLeft: 8,
  },
  tipDescription: {
    paddingHorizontal: 16,
    marginTop: 8,
  },
  tipOptions: {
    flexDirection: 'row',
    gap: 8,
    // justifyContent: 'space-between',
    marginTop: 16,
    paddingHorizontal: 16,
  },
  tipOption: {
    backgroundColor: colors.white,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
    color: colors.black,
  },
  selectedTipOption: {
    backgroundColor: colors.lightGreen,
  },
  selectedTipText: {
    color: colors.white,
  },
  couponButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.white,
    marginTop: 16,
    padding: 16,
  },
  couponText: {
    flex: 1,
    marginLeft: 8,
    color: colors.black,
  },
  billDetails: {
    backgroundColor: colors.white,
    marginTop: 16,
    padding: 16,
  },
  billTitle: {
    marginBottom: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  freeDeliveryText: {
    color: colors.black,
    marginBottom: 8,
    fontSize: 12,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    paddingTop: 8,
  },
  totalText: {
    fontSize: 16,
  },
  totalAmount: {
    fontSize: 16,
    color: colors.primary,
  },
  footer: {
    backgroundColor: colors.white,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  deliverTo: {
    padding: 16,
  },
  deliverToTitle: {
    marginBottom: 8,
  },
  deliverToContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeButton: {
    color: colors.primary,
  },
  placeOrderButton: {
    backgroundColor: colors.lightGreen,
    padding: 16,
    alignItems: 'center',
  },
  placeOrderText: {
    color: colors.white,
    fontSize: 16,
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height - 200,
  },
  emptyCartImage: {
    width: width * 0.5,
    height: width * 0.5,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  emptyCartText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
    textAlign: 'center',
  },
  appliedCouponContainer: {
    backgroundColor: colors.white,
    marginTop: 16,
    padding: 16,
    borderRadius: 8,
  },
  appliedCouponHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  appliedCouponText: {
    flex: 1,
    marginLeft: 8,
    color: colors.black,
  },
  removeCouponText: {
    color: colors.primary,
    fontWeight: '500',
  },
  savedText: {
    color: colors.lightGreen,
    fontSize: 14,
    marginLeft: 32,
  },
  // freeDeliveryText: {
  //   color: colors.black,
  //   fontSize: 12,
  //   marginTop: 4,
  //   marginBottom: 8,
  // },
  couponDetailsText: {
    color: colors.gray,
    fontSize: 12,
    marginTop: 5,
  },
});

export default MyBasketScreen;
