import React, { useState } from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { colors, typography } from '../../styles/globalStyles';
import { getToken } from '../../api/services/foodService';
import { BASE_URL } from '../../api/axios';
import { ENDPOINTS } from '../../api/endpoint';
import Toast from 'react-native-toast-message';

interface IOfferItem {
  id: string;
  image: any;
  title: string;
  rating: number;
  oldPrice: number;
  newPrice: number;
  favorites: string[];
  ingredient?: string;
  nutritionalInfo?: string;
  description?: string;
  label?: string;
  additionalOption?: string;
  price: number;
}

interface FoodCardProps {
  item: IOfferItem;
  onPress?: () => void;
  onFavoriteToggle?: (updatedItem: IOfferItem) => void;
}

export const FoodCard: React.FC<FoodCardProps> = ({ item, onPress, onFavoriteToggle }) => {

  console.log("items is", item)
  const [isFavorited, setIsFavorited] = useState(item?.favorites?.length !== 0);



  const toggleFavorite = async () => {
    try {
      const token = await getToken();
      const response = await fetch(`${BASE_URL}${ENDPOINTS.ADD_TO_FAVOURITES}/${item.id}`, {
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

      // Update the item with the latest data
      const updatedItem = { ...item, favorites: data?.data?.favorites || [] };
     onFavoriteToggle&& onFavoriteToggle(updatedItem);

      // Show toast notification
      Toast.show({
        type: 'success',
        text1: newFavoritedState ? 'Added to Favorites' : 'Removed from Favorites',
        text2: `${item.title} has been ${newFavoritedState ? 'added to' : 'removed from'} your favorites.`,
      });
    } catch (error) {
      console.error("Error toggling favorite:", error);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Failed to update favorites. Please try again.',
      });
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={onPress}>
      <View style={styles.offerCard}>
        <Image source={{ uri: item?.image }} style={styles.offerImage} />
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}>
          <Image
            source={
              isFavorited
                ? require('../../assets/images/fillHeart.png')
                : require('../../assets/images/like.png')
            }
            style={styles.heartIcon}
          />
        </TouchableOpacity>
        <View style={styles.offerDetails}>
          <Text style={styles.offerTitle}>{item.title}</Text>
          <View style={styles.ratingContainer}>
            <Image
              source={require('../../assets/images/star.png')}
              style={styles.starIcon}
            />
            <Text style={styles.ratingText}>{item?.rating?.toFixed(1)}</Text>
          </View>
          <View style={styles.priceContainer}>
            {item.oldPrice !== item.newPrice && (
              <Text style={styles.oldPrice}>Rs {item.oldPrice}</Text>
            )}
            <Text style={styles.newPrice}>Rs {item.newPrice}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 8,
    ...Platform.select({
      ios: {
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
        shadowColor: colors.black,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
    }),
  },
  offerCard: {
    backgroundColor: colors.white,
    borderRadius: 8,
    overflow: 'hidden',
  },
  offerImage: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 4,
    height: 26,
    width: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    width: 16,
    height: 14,
  },
  offerDetails: {
    padding: 8,
  },
  offerTitle: {
    fontFamily: typography.robotoRegular,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 4,
    textTransform: 'capitalize'
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  starIcon: {
    width: 12,
    height: 12,
    marginRight: 4,
  },
  ratingText: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    color: colors.gray,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  oldPrice: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    color: colors.gray,
    textDecorationLine: 'line-through',
    marginRight: 4,
  },
  newPrice: {
    fontFamily: typography.robotoRegular,
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.primary,
  },
});
