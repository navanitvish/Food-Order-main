import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { colors } from '../styles/globalStyles';

interface Review {
  _id: string;
  comment: string;
  createdAt: string;
  star: number;
  image:any
  userId: {
    name: string;
    // Add other user properties as needed
  };
}

interface UserReviewComponentProps {
  activeFilter: string;
  setActiveFilter: (filter: string) => void;
  reviews: any;
}

const UserReviewComponent: React.FC<UserReviewComponentProps> = ({ activeFilter, setActiveFilter, reviews }) => {
  const filters = ['all', 'positive', 'negative', 5, 4, 3, 2, 1];

  console.log("reviewssssssss", reviews)


  

  const renderStars = (rating: number) => {
    const starCount = Math.round(rating); // Round to nearest integer
    return (
      <View style={styles.starContainer}>
        {[...Array(starCount)].map((_, index) => (
          <Image
            key={index}
            source={require('../assets/images/star.png')}
            style={styles.starIcon}
          />
        ))}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter}
            style={[styles.filterButton, activeFilter === filter && styles.activeFilterButton]}
            onPress={() => setActiveFilter(filter)}
          >
            {activeFilter === filter && (
              <Image
                source={require('../assets/images/check.png')}
                style={styles.checkmark}
              />
            )}
            <Text style={[styles.filterText, activeFilter === filter && styles.activeFilterText]}>
              {filter}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {reviews?.reviews?.length>0 ? (
        reviews?.reviews?.map((review:any) => (
          <View key={review._id} style={styles.reviewItem}>
           {
            review.image ? (   <Image 
              source={require('../assets/images/bottom/Avatar.png')}
              style={styles.userImage} 
            />):(
              <Image 
              source={require('../assets/images/bottom/Avatar.png')}
              style={styles.userImage} 
            />
            )
           }
            <View style={styles.reviewContent}>
              <View style={styles.reviewHeader}>
                <Text style={styles.userName}>{review.userId.name}</Text>
                {renderStars(review.star)}
              </View>
              <Text style={styles.reviewDate}>
                {new Date(review.createdAt).toLocaleDateString()}
              </Text>
              <Text style={styles.reviewComment}>{review.comment}</Text>
            </View>
          </View>
        ))
      ) : (
        <View style={styles.noDataContainer}>
          <Text style={styles.noDataText}>No reviews available for this filter</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  filterContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 10,
    backgroundColor: colors.lightGray,
    marginRight: 8,
  },
  activeFilterButton: {
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterText: {
    fontSize: 14,
    color: colors.darkGray,
    textTransform:'capitalize'
  },
  activeFilterText: {
    color: colors.white,
      textTransform:'capitalize'
  },
  reviewItem: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  reviewDate: {
    fontSize: 12,
    color: colors.darkGray,
    marginBottom: 4,
  },
  starContainer: {
    flexDirection: 'row',
  },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  reviewComment: {
    fontSize: 14,
    color: colors.gray,
    marginTop: 4,
  },
  checkmark: {
    width: 16,
    height: 16,
    tintColor: colors.white,
    marginRight: 5,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
  },
});

export default UserReviewComponent;