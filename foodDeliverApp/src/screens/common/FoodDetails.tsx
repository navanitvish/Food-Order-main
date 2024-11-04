import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Platform,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { addItem } from '../../redux/slices/cartSlice';
import { colors } from '../../styles/globalStyles';
import BackButton from '../../components/common/BackButton';
import { getToken } from '../../api/services/foodService';
import { BASE_URL } from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoint';
import Toast from 'react-native-toast-message';
import { setSelectedFood } from '../../redux/slices/selectedFoodSlice';

const FoodDetailsScreen: React.FC<any> = ({ navigation }) => {
  // const [isFavorited, setIsFavorited] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<{ [key: string]: boolean }>({});
  const [showNutritionalInfo, setShowNutritionalInfo] = useState(false);
  
  const selectedFood = useSelector((state: RootState) => state.selectedFood.food);
  const [trueEnabled, setTrueEnabled] = useState(false);
  const dispatch = useDispatch();
  const [isFavorited, setIsFavorited] = useState(selectedFood?.favorites?.length !== 0);

  const toggleNutritionalInfo = () => {
    setShowNutritionalInfo(!showNutritionalInfo);
  };

  const toggleFavorite = async() => {
    try {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}${ENDPOINTS.ADD_TO_FAVOURITES}/${selectedFood.id}`, {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Favorite toggled successfully:", data);
      const newFavoritedState = data?.data?.favorites?.length !== 0;
      setIsFavorited(newFavoritedState);

      // Update the Redux store with the new data
      dispatch(setSelectedFood({
        ...selectedFood,
        favorites: data.data.favorites
      }));

      // Show toast notification
      Toast.show({
        type: 'success',
        text1: newFavoritedState ? 'Added to Favorites' : 'Removed from Favorites',
        text2: `${selectedFood.title} has been ${newFavoritedState ? 'added to' : 'removed from'} your favorites.`,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update favorites. Please try again.',
      });
    }
  }

  const handleOptionChange = (optionId: string) => {
    setSelectedOptions(prev => ({ ...prev, [optionId]: !prev[optionId] }));
  };

  const handleFoodAdd = () => {
    if (!trueEnabled) {
      setTrueEnabled(true);
      // setQuantity(prev => prev + 1);
      handleAddToBasket();
    } else {
      navigation.navigate("MyBasket");
    }
  };

  const handleAddToBasket = () => {
    const selectedAddOns = selectedFood?.additionalOption.filter(
      option => selectedOptions[option._id]
    );

    const cartItem = {
      id: selectedFood.id,
      name: selectedFood.name,
      image: selectedFood.image,
      newPrice: selectedFood.newPrice,
      oldPrice: selectedFood.oldPrice,
      quantity: quantity,
      addOns: selectedAddOns,
      type: selectedFood.type,
      description: selectedFood.description,
      dietry: selectedFood.dietry,
      dishtype: selectedFood.dishtype,
      ingredient: selectedFood.ingredient,
      rating: selectedFood.rating,
      restaurantId: selectedFood.restaurantId,
      price: selectedFood.price,
      category:selectedFood?.category
    };

    dispatch(addItem(cartItem));
    navigation.navigate('MyBasket');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.backContainer}>
            <BackButton />
          </View>
          <TouchableOpacity
            style={styles.favoriteButton}
            onPress={toggleFavorite}>
            <Image
              source={
                isFavorited
                  ? require('../../assets/images/fillHeart.png')
                  : require('../../assets/images/like.png')
              }
              style={styles.heartIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.foodImageOuterContainer}>
          <View style={styles.foodImageContainer}>
            <Image source={{uri: selectedFood?.image}} style={styles.foodImage} />
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.foodTitle}>{selectedFood?.name}</Text>
          <View style={styles.priceContainer}>
            <Text style={styles.oldPrice}>Rs {selectedFood?.oldPrice}</Text>
            <Text style={styles.newPrice}>Rs {selectedFood?.newPrice}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <View style={{flexDirection: 'row'}}>
              <Image
                source={require('../../assets/images/star.png')}
                style={styles.starIcon}
              />
              <Text style={styles.ratingText}>{selectedFood?.rating?.toFixed(1)} </Text>
            </View>
            <TouchableOpacity
              onPress={() => navigation.navigate('ReviewScreen', {selectedFood:selectedFood})}>
              <Text style={styles.seeAllReview}>See all review</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.description}>{selectedFood?.description}</Text>
          <TouchableOpacity onPress={toggleNutritionalInfo}>
            <Text style={styles.seeMore}>
              {selectedFood?.nutritionalInfo?.length > 0 && (
                showNutritionalInfo ? 'See less' : 'See more'
              )}
            </Text>
          </TouchableOpacity>

          {showNutritionalInfo && (
            <View style={styles.nutritionalInfo}>
              <Text style={styles.sectionTitle}>Nutritional Information</Text>
              {/* Add nutritional info here */}
            </View>
          )}

          <View style={styles.additionalOptions}>
            {
              selectedFood?.additionalOption?.length >0 && (

                <Text style={styles.sectionTitleAddition}>Additional Options:</Text>
              )
            }
            {selectedFood?.additionalOption?.length > 0 && selectedFood.additionalOption.map((data: any) => (
              <View key={data._id} style={styles.optionRow}>
                <Text style={{color: colors.black}}>Add {data.name}</Text>
                <View style={styles.optionPriceContainer}>
                  <Text style={styles.item}>+ Rs {data.price}</Text>
                  <TouchableOpacity
                    onPress={() => handleOptionChange(data._id)}
                    style={styles.rightContent}>
                    {selectedOptions[data._id] ? (
                      <Image
                        source={require('../../assets/images/checkboxChecked.png')}
                        style={styles.checkbox}
                      />
                    ) : (
                      <View style={styles.checkboxBox} />
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
      <View style={styles.bottomNavigationContainer}>
        <View style={styles.bottomNavigation}>
          <TouchableOpacity onPress={handleFoodAdd} style={styles.addToBasketButton}>
            {!trueEnabled && (
              <Image
                source={require('../../assets/images/basketFill.png')}
                style={styles.basketIocn}
              />
            )}
            <Text style={styles.addToBasketText}>
              {trueEnabled ? "Go To Cart" : "Add to Basket"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: Platform.OS === 'ios' ? 0 : StatusBar.currentHeight,
    padding: 8,
  },
  container: {
    flex: 1,
    marginBottom: 40,
  },
  
  rightContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxBox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 4,
  },
  checkbox: {
    width: 20,
    height: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1,
  },
  favoriteButton: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 8,
    top: '60%',
  },
  heartIcon: {
    width: 23,
    height: 20,
  },
  foodImageOuterContainer: {
    width: '100%',
    paddingHorizontal: 4,
    marginTop: 16,
    marginBottom: 16,
  },
  foodImageContainer: {
    width: '100%',
    aspectRatio: 16 / 12,
    borderRadius: 10,
    overflow: 'hidden',
  },
  foodImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  foodTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.black,
    textTransform: 'capitalize',
    
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  oldPrice: {
    fontSize: 16,
    color: colors.gray,
    textDecorationLine: 'line-through',
    marginRight: 8,
  },
  newPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailsContainer: {
    padding: 16,
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 4,
  },
  ratingText: {
    fontSize: 14,
    color: colors.gray,
    marginRight: 8,
  },
  seeAllReview: {
    fontSize: 14,
    // color: colors.primary,
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: colors.black,
  },
  item: {
    marginRight: 8,
    color: colors.black,
  },
  description: {
    fontSize: 14,
    color: colors.gray,
    marginBottom: 8,
  },
  seeMore: {
    fontSize: 14,
    // color: colors.primary,
    marginBottom: 16,
    textAlign: 'right',
    textDecorationLine: 'underline',
    color: colors.black,
  },
  nutritionalInfo: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    // fontWeight: 'bold',
    color: colors.gray,
    marginBottom: 8,
  },
  sectionTitleAddition: {
    fontSize: 18,
    fontWeight: 'bold',
    // color: colors.gray,
    marginBottom: 8,
    color: colors.black,
  },
  nutritionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
    width: '60%',
    textAlign: 'left',
    marginTop: 9,

    color: colors.gray,
  },
  additionalOptions: {
    marginBottom: 16,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  optionPriceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: colors.gray,
    borderRadius: 10,
    marginLeft: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: colors.primary,
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.primary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 30,
    height: 30,
    borderWidth: 1,
    borderColor: '#E9EAEB',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color:colors.black
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 16,
    color:colors.black
  },
  addToBasketButton: {
    backgroundColor: colors.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  basketIocn: {
    width: 18.42,
    height: 20,
    marginRight: 8,
  },
  addToBasketText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  backContainer: {
    top: 20,
  },
  bottomNavigationContainer: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    backgroundColor: 'transparent',
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
    paddingHorizontal: 20,
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
  textSmall: {
    color: colors.gray,
  },
});

export default FoodDetailsScreen;
