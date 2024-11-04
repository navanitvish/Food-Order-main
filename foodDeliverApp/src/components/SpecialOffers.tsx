import React, { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/globalStyles';
import { FoodCard } from './common/FoodCard';
import { foodService } from '../api/services/foodService';
import { useDispatch } from 'react-redux';
import { setSelectedFood } from '../redux/slices/selectedFoodSlice';
import { useNavigation } from '@react-navigation/native';

interface OfferItem {
  id: string;
  image: any;
  title: string;
  rating: number;
  oldPrice: number;
  newPrice: number;
  favorites: string[];
  ingredient: string;
  nutritionalInfo: string;
  description: string;
  label: string;
  additionalOption: string;
  price: number;
}

const SpecialOffers: React.FC = () => {
  const [offerData, setOfferData] = useState<OfferItem[]>([]);
  const dispatch = useDispatch();
  const navigation = useNavigation() as any;

  const fetchAllSpecialOffers = async () => {
    try {
      const res = await foodService.getAllSpecial();
      console.log('Special offers data:', res.data.data);

      const formattedData = res?.data?.data?.map((d: any) => ({
        id: d._id,
        image: d.image,
        title: d.name,
        rating: d.rating,
        oldPrice: d.price, // You might want to update this if there's an actual old price
        newPrice: d.specialOfferPrice,
        favorites: d.favorites,
        ingredient: d.ingredient,
        nutritionalInfo: d.nutritionalInfo,
        description: d.description,
        label: d.label,
        additionalOption: d.additionalOption,
        price: d.price,
      }));

      if (formattedData) {
        setOfferData(formattedData);
      }
    } catch (error) {
      console.log('Error fetching special offers:', error);
    }
  };

  useEffect(() => {
    fetchAllSpecialOffers();
  }, []);

  const handleFoodCardPress = (item: OfferItem) => {
    dispatch(setSelectedFood(item));
    navigation.navigate('FoodDetailsScreen');
  };

  const handleFavoriteToggle = (updatedItem: OfferItem) => {
    setOfferData(prevData =>
      prevData.map(item => (item.id === updatedItem.id ? updatedItem : item))
    );
    // If the currently selected food is the one that was updated, update it in the Redux store
    dispatch(setSelectedFood(updatedItem));
  };

  return (
    <ScrollView contentContainerStyle={styles.offersList}>
      <View style={styles.gridContainer}>
        {offerData.map(item => (
          <FoodCard
            key={`offer-${item.id}`}
            item={item}
            onPress={() => handleFoodCardPress(item)}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  offersList: {
    paddingHorizontal: 16,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});

export default SpecialOffers;