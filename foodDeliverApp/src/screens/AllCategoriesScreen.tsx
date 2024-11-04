import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, typography } from '../styles/globalStyles';
import Header from '../components/common/Header';
import { foodService } from '../api/services/foodService';
import SpinnerLoader from '../components/common/SppinerLoader';
import OptimizedImage from '../components/common/OptimzedImageComponent';


interface FoodCategory {
  id: string;
  name: string;
  icon: string;
}

const AllCategoriesScreen: React.FC = () => {
  const [foodCategories, setFoodCategories] = useState<FoodCategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigation = useNavigation() as any;

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const response = await foodService.getFoodCategories();
      if (Array.isArray(response?.data?.data)) {
        const formattedCategories: FoodCategory[] = response.data.data.map(
          (category: any) => ({
            id: category._id || category.id,
            name: category.name || '',
            icon: category.image,
          }),
        );
        console.log(formattedCategories.length, 'lenfghjfygtfy');
        setFoodCategories(formattedCategories);
      } else {
        console.error('Invalid data structure received from API');
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const renderItem = ({ item }: { item: FoodCategory }) => {
    console.log('categoryId:', item.id);
    return (
      <View style={styles.categoryItemWrapper}>
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() =>
            navigation.navigate('CategoryScreen', {
              categoryId: item.id,
              categoryName: item.name,
              icon: item.icon,
            })
          }>
          {/* <OptimizedImage uri={item.icon} style={styles.categoryIcon} /> */}
          <Text numberOfLines={1} ellipsizeMode='tail' style={styles.categoryName}>{item.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title='Categories'/>
        {isLoading ? (
          <View style={styles.loaderContainer}>
            <SpinnerLoader size="lg" color="primary" />
          </View>
        ) : (
          <FlatList
            data={foodCategories}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={4}
            contentContainerStyle={styles.listContent}
          />
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
  listContent: {
    padding: 16,
  },
  categoryItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 2,
  },
  categoryItemWrapper: {
    flex: 1,
    flexBasis: '25%',
    maxWidth: '25%',
    aspectRatio: 1,
    padding: 10,
  },
  categoryIcon: {
    width: '40%',
    height: '40%',
    marginBottom: 4,
  },
  categoryName: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    color: colors.black,
    textAlign: 'center',
    textTransform: 'capitalize',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AllCategoriesScreen;