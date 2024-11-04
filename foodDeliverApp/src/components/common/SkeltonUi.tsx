import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../../styles/globalStyles';


const SkeletonUI = () => {
  const renderCategoryItem = () => (
    <View style={styles.categoryItem}>
      <View style={styles.categoryImage} />
      <View style={styles.categoryText} />
    </View>
  );

  const renderRestaurantItem = () => (
    <View style={styles.restaurantItem}>
      <View style={styles.restaurantImage} />
      <View style={styles.restaurantInfo}>
        <View style={styles.restaurantName} />
        <View style={styles.restaurantRating} />
        <View style={styles.restaurantAddress} />
        <View style={styles.restaurantAddress} />
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoryContainer}>
        {[...Array(5)].map((_, index) => (
          <View key={index} style={styles.categoryWrapper}>
            {renderCategoryItem()}
          </View>
        ))}
      </ScrollView> */}
      {/* <View style={styles.filterContainer}>
        <View style={styles.filterText} />
        <View style={styles.filterButtons}>
          <View style={[styles.filterButton, styles.activeFilterButton]} />
          <View style={styles.filterButton} />
        </View>
      </View> */}
      {[...Array(3)].map((_, index) => (
        <View key={index}>{renderRestaurantItem()}</View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  categoryContainer: {
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  categoryWrapper: {
    marginRight: 16,
  },
  categoryItem: {
    alignItems: 'center',
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.lightGray,
    marginBottom: 8,
  },
  categoryText: {
    width: 60,
    height: 12,
    backgroundColor: colors.lightGray,
    borderRadius: 6,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: colors.bgGray,
  },
  filterText: {
    width: 150,
    height: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 8,
  },
  filterButtons: {
    flexDirection: 'row',
  },
  filterButton: {
    width: 80,
    height: 30,
    backgroundColor: colors.lightGray,
    borderRadius: 15,
    marginLeft: 8,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
  },
  restaurantItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.lightGray,
  },
  restaurantImage: {
    width: 120,
    height: 140,
    borderRadius: 8,
    backgroundColor: colors.lightGray,
    marginRight: 16,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    width: '80%',
    height: 20,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  restaurantRating: {
    width: '60%',
    height: 16,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginBottom: 8,
  },
  restaurantAddress: {
    width: '100%',
    height: 12,
    backgroundColor: colors.lightGray,
    borderRadius: 4,
    marginBottom: 4,
  },
});

export default SkeletonUI;