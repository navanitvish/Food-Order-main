import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  View,
  TextInput,
} from 'react-native';
import {colors, globalStyles} from '../../styles/globalStyles';
import {CartItem} from '../../types';
import {getToken} from '../../api/services/foodService';
import { BASE_URL } from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoint';
import Toast from 'react-native-toast-message';

interface ICartItemProps {
  item: CartItem;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
  editable?: boolean;
  orderStatus?: string;
  quantity: number;
  userId?: any;
}

export const CartItemComponent: React.FC<ICartItemProps> = ({
  item,
  onUpdateQuantity,
  onRemoveItem,
  editable = true,
  orderStatus,
  quantity,
  userId,
}) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');

  console.log("item is ", item)

  async function handleSubmitReview() {
    const reviewData = {
      userId: userId && userId,
      menuId: item?.id,
      comment: review,
      star: rating,
    };

    console.log("review data is%%%%%%%%%%%%%%%", reviewData)

    try {
      const token = await getToken();

      const response = await fetch(`${BASE_URL}${ENDPOINTS.REVIEW}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `${token}`,
        },
        body: JSON.stringify(reviewData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Review submitted successfully:', result);

      // Clear the state
      setRating(0);
      setReview('');

      // Show toast notification
      Toast.show({
        type: 'success',
        text1: 'Review Submitted',
        text2: 'Your review has been successfully submitted.',
      });

      return result;
    } catch (error) {
      console.error('Error submitting review:', error);
      
      // Show error toast
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to submit review. Please try again.',
      });

      throw error;
    }
  }

  console.log(item, 'itetettetetettet');

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, item.quantity + change);
    if (newQuantity === 0) {
      onRemoveItem && onRemoveItem(item.id);
    } else {
      onUpdateQuantity && onUpdateQuantity(item.id, newQuantity);
    }
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity key={i} onPress={() => setRating(i)}>
          <Image
            source={
              i <= rating
                ? require('../../assets/images/star.png')
                : require('../../assets/images/EmptyStar.png')
            }
            style={styles.starIcon}
          />
        </TouchableOpacity>,
      );
    }
    return stars;
  };

  return (
    <View style={styles.itemContainer}>
      <View style={styles.itemContentContainer}>
        <Image source={{uri: item?.image}} style={styles.itemImage} />
        <View style={styles.itemDetails}>
          <View style={styles.itemNameContainer}>
            <Text style={styles.itemName}>{item.name}</Text>
            {editable && (
              <View style={styles.actionIcons}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/images/pencilGray.png')}
                    style={styles.editIcon}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onRemoveItem && onRemoveItem(item.id)}>
                  <Image
                    source={require('../../assets/images/x.png')}
                    style={styles.deleteIcon}
                  />
                </TouchableOpacity>
              </View>
            )}
            {orderStatus === 'complete' && (
              <TouchableOpacity style={styles.reorderButton}>
                <Image
                  source={require('../../assets/images/basketFill.png')}
                  style={styles.basketIocn}
                />
                <Text style={styles.reorderButtonText}>Reorder</Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.priceContainer}>
            {/* <Text style={styles.originalPrice}>
              Rs  {item?.oldPrice?.toFixed(2)}
            </Text> */}
            {orderStatus === 'complete' || orderStatus === 'active' ? (
              <Text style={styles.discountedPrice}>
                Rs {item?.originalPrice}
              </Text>
            ) : (
              <Text style={styles.discountedPrice}>
                Rs {item?.price * quantity}
              </Text>
            )}
          </View>
          {editable && (
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(-1)}>
                <View style={styles.cartButton}>
                  <Text style={styles.quantityButtonText}>-</Text>
                </View>
              </TouchableOpacity>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={() => handleQuantityChange(1)}>
                <View style={styles.cartButton}>
                  <Text style={styles.quantityButtonText}>+</Text>
                </View>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
      {item.addOns.length > 0 && (
        <>
          <View style={styles.divider} />
          {item.addOns.map((addOn, index) => (
            <View key={index} style={styles.addOnContainer}>
              <Text style={styles.addOnText}>{addOn.name}</Text>
              <Text style={styles.addOnPrice}>
                Rs {addOn?.price?.toFixed(2)}
              </Text>
            </View>
          ))}
        </>
      )}
      {orderStatus === 'complete' && (
        <View style={styles.reviewContainer}>
          <View style={styles.ratingContainer}>{renderStars()}</View>
          <TextInput
            style={styles.reviewInput}
            placeholder="Type your review ..."
            value={review}
            onChangeText={setReview}
            multiline
          />
          <View style={styles.ratingButtonContainer}>
            <TouchableOpacity
              onPress={handleSubmitReview}
              style={styles.submitButton}>
              <Text style={styles.reorderButtonText}>Submit Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    // paddingHorizontal: 20,////
    // paddingVertical: 15,
    // borderBottomWidth: 1,
    // borderBottomColor: '#E9EAEB',
    backgroundColor: colors.white,
    padding: 20,
    marginTop: 20,
  },
  scrollContainer: {
    flex: 1,
  },
  container: {
    paddingHorizontal: 20,
    paddingBottom: 80,
  },
  title: {
    ...globalStyles.title,
    flex: 1,
    // textAlign: 'center',
    fontWeight: '600',
    fontSize: 22,
    marginRight: 30,
  },
  orderSummary: {
    fontSize: 18,
    color: colors.black,
    // fontWeight: '600',
    marginBottom: 15,
  },
  cartButton: {
    height: 26,
    width: 26,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  addItemsButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  addItemsText: {
    color: '#FF6347',
    fontSize: 14,
  },
  addItemContainer: {
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 20,
  },
  itemContentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemContainer: {
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    // Shadow for iOS
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,

    // Shadow for Android
    elevation: 3,
  },
  divider: {
    height: 1, // Divider height
    backgroundColor: '#E9EAEB', // Light gray color
    marginVertical: 15, // Space above and below the divider
    width: '100%', // Full width of the container
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  itemDetails: {
    flex: 1,
    marginLeft: 10,
  },
  select: {
    color: '#BABDC1',
    fontSize: 16,
    fontWeight: '600',
  },
  itemNameContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,
    textTransform: 'capitalize',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 5,
  },
  originalPrice: {
    fontSize: 14,
    color: '#999999',
    textDecorationLine: 'line-through',
    marginRight: 5,
  },
  discountedPrice: {
    fontSize: 16,
    color: '#FF6347',
    fontWeight: '600',
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.black,
  },
  quantity: {
    marginHorizontal: 10,
    fontSize: 16,
    color: colors.black,
  },
  actionIcons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  editIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  deleteIcon: {
    width: 20,
    height: 20,
  },
  addOnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  addOnText: {
    fontSize: 14,
    color: '#666666',
    textTransform:'capitalize'
  },
  addOnPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  deliveryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  locationIcon: {
    width: 20,
    height: 20,
  },
  deliveryDetails: {
    flex: 1,
    marginLeft: 10,
  },
  deliveryText: {
    fontSize: 16,
    fontWeight: '600',
  },
  deliveryAddress: {
    fontSize: 14,
    color: '#666666',
  },
  chevronIcon: {
    width: 11,
    height: 23,
  },
  paymentContainer: {
    // alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 20,
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  selectContainer: {
    flexDirection: 'row',
  },
  paymentIcon: {
    width: 17,
    height: 14,
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.black,

    // marginLeft: 10,
  },
  paymentMethod: {
    fontSize: 14,
    marginRight: 10,
  },
  paymentMethodContainer: {
    flex: 1,
    marginLeft: 10,
  },
  ratingButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },

  totalText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
  },
  placeOrderButton: {
    backgroundColor: '#FF6347',
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  placeOrderText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  bottomNavigationContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: colors.white,
    // borderTopWidth: 1,
    // borderTopColor: '#E9EAEB',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  bottomNavigation: {
    flexDirection: 'row',
    justifyContent: 'center', // Boom, center everything!
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    paddingHorizontal: 40,
    height: 77,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  totalContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
  orderSummaryContainer: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginTop: 20,
    marginBottom: 80,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryText: {
    fontSize: 16,
    color: '#333',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  freeText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#4CAF50',
  },
  discountText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    paddingTop: 10,
    marginTop: 5,
  },
  totalTextBottom: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  reviewContainer: {
    marginTop: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginBottom: 10,
  },
  starIcon: {
    width: 24,
    height: 24,
    marginHorizontal: 2,
  },
  reviewInput: {
    backgroundColor: '#1F2A370D',
    borderRadius: 8,
    padding: 10,
    minHeight: 100, // Adjust the value as needed
    textAlignVertical: 'top',
    color: colors.black,
  },

  reviewActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  reviewIcon: {
    width: 24,
    height: 24,
    marginLeft: 10,
  },
  reorderButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 10,
    top: 30,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },
  submitButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    alignSelf: 'flex-end',
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  basketIocn: {
    height: 14,
    width: 14,
  },
  reorderButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
});
