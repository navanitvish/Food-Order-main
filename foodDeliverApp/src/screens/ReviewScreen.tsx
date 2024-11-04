import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { colors, typography, globalStyles } from '../styles/globalStyles';
import BackButton from '../components/common/BackButton';
import UserReviewComponent from '../components/UserReviewComponent';
import Header from '../components/common/Header';
import { useRoute } from '@react-navigation/native';
import { foodService } from '../api/services/foodService';
import SpinnerLoader from '../components/common/SppinerLoader';

interface RatingBarProps {
  starNumber: number;
  percentage: number;
}

const RatingBar: React.FC<RatingBarProps> = ({ starNumber, percentage }) => (
  <View style={styles.ratingBar}>
    <Text style={styles.ratingLabel}>{starNumber}</Text>
    <View style={styles.barBackground}>
      <View style={[styles.barFill, { width: `${percentage}%` }]} />
    </View>
  </View>
);

interface ReviewData {
  reviewCount: number;
  reviews: any[];
  totalRange: { [key: string]: number };
}

const ReviewScreen: React.FC = () => {
  const route = useRoute() as any;
  const [reviewData, setReviewData] = useState<ReviewData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  console.log("reviewdataa", reviewData)

  const rating: number = route.params.selectedFood.rating;

  const fetchReviews = async (foodId: string, ratingFilter: any) => {
    setLoading(true);
    try {
      const fetchedReviews = await foodService.getReviewsByRating(foodId, ratingFilter);

      console.log("fetched Reviews", fetchedReviews)
      setReviewData(fetchedReviews?.data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch reviews');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (route.params.selectedFood?.id) {
      fetchReviews(route.params.selectedFood.id, activeFilter);
    }
  }, [route.params.selectedFood?.id, activeFilter]);

  const renderStar = (index: number): React.ReactNode => {
    const starOpacity = index <= Math.floor(rating) ? 1 : 0.3;
    const partialStarOpacity = index === Math.ceil(rating) ? rating % 1 : 0;

    return (
      <View key={index} style={styles.starContainer}>
        <Image
          source={require('../assets/images/star.png')}
          style={[styles.starImage, { opacity: starOpacity }]}
        />
        {partialStarOpacity > 0 && (
          <View
            style={[
              styles.partialStar,
              { width: `${partialStarOpacity * 100}%` },
            ]}>
            <Image
              source={require('../assets/images/star.png')}
              style={styles.starImage}
            />
          </View>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header title="Reviews" />
          <View style={styles.centeredLoaderContainer}>
        <SpinnerLoader size='xl' />
      </View>
        </View>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header title="Reviews" />
          <Text>Error: {error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!reviewData) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <Header title="Reviews" />
         <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
         <Text>No review data available.</Text>
         </View>
        </View>
      </SafeAreaView>
    );
  }

  const totalReviews: number = reviewData.totalReviewCount|| 0;
  const ratingDistribution: number[] = [
    reviewData.totalRange["5"] || 0,
    reviewData.totalRange["4"] || 0,
    reviewData.totalRange["3"] || 0,
    reviewData.totalRange["2"] || 0,
    reviewData.totalRange["1"] || 0
  ];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Header title="Reviews" />
        <View style={styles.reviewContainer}>
          <Text style={styles.reviewTitle}>{route?.params?.selectedFood?.title}</Text>
          <View style={styles.reviewContent}>
            <View style={styles.ratingContainer}>
              <Text style={styles.ratingNumber}>{rating.toFixed(1)}</Text>
              <View style={styles.starsContainer}>
                {[1, 2, 3, 4, 5].map(renderStar)}
              </View>
              <Text style={styles.reviewCount}>({totalReviews})</Text>
            </View>
            <View style={styles.ratingBarsContainer}>
              {ratingDistribution?.map((count, index) => (
                <RatingBar
                  key={5 - index}
                  starNumber={5 - index}
                  percentage={(count / totalReviews) * 100}
                />
              ))}
            </View>
          </View>
        </View>
        <UserReviewComponent
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
          reviews={reviewData}
        />
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 20,
  },
  title: {
    ...globalStyles.title,
    flex: 1,
    textAlign: 'center',
    marginRight: 34,
  },
  reviewContainer: {
    paddingHorizontal: 16,
    paddingVertical: 1, // Add padding inside the container
    backgroundColor: colors.white,
    borderRadius: 8,
    marginHorizontal: 16,
    marginTop: 16, // Adjust margin for spacing from top
    marginBottom: 20, // Extra margin at the bottom for better spacing
  },
  reviewTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: colors.black,
    textTransform:'capitalize'
  },
  reviewContent: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Ensure spacing between rating and bars
    alignItems: 'center',
  },
  ratingContainer: {
    alignItems: 'center',
    marginRight: 20, // Add margin to prevent crowding with the rating bars
  },
  ratingNumber: {
    fontSize: 40,
    fontWeight: 'bold',
    marginBottom: 8,
    color: colors.black,
  },
  starsContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  starContainer: {
    width: 24,
    height: 24,
    marginRight: 2,
    position: 'relative',
  },
  starImage: {
    width: '100%',
    height: '100%',
  },
  partialStar: {
    position: 'absolute',
    top: 0,
    left: 0,
    overflow: 'hidden',
  },
  reviewCount: {
    color: '#666',
  },
  ratingBarsContainer: {
    flex: 1, // Make sure this takes up remaining space
  },
  ratingBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  ratingLabel: {
    width: 20,
    marginRight: 8,
    textAlign: 'right',
    color: colors.black,
  },
  barBackground: {
    flex: 1,
    height: 8,
    backgroundColor: '#F0F0F0',
    borderRadius: 4,
  },
  barFill: {
    height: '100%',
    backgroundColor: '#3e4532',
    borderRadius: 4,
  },
  percentageLabel: {
    width: 40,
    marginLeft: 8,
    textAlign: 'left',
  },
  filterContainer: {
    maxHeight: 50,
    marginBottom: 15,
    paddingHorizontal: 8,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    backgroundColor: colors.inputBg,
    marginRight: 10,
    marginLeft: 5,
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontFamily: typography.robotoRegular,
    color: colors.darkGray,
    marginRight: 5,
  },
  activeTabText: {
    color: colors.white,
  },
  checkmark: {
    width: 16,
    height: 16,
    tintColor: colors.white,
    marginRight: 5,
  },
  orderList: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  orderItem: {
    flexDirection: 'row',
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 8,
    marginBottom: 10,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  orderImage: {
    width: 105,
    height: 75,
    borderRadius: 8,
  },
  orderDetails: {
    flex: 1,
    marginLeft: 10,
  },
  orderId: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    color: colors.darkGray,
  },
  orderPrice: {
    fontFamily: typography.bold,
    fontSize: 16,
    color: colors.primary,
    marginVertical: 4,
  },
  //   ratingContainer: {
  //     flexDirection: 'row',
  //   },
  starIcon: {
    width: 16,
    height: 16,
    marginRight: 2,
  },
  starIconInactive: {
    opacity: 0.3,
  },
  orderStatusContainer: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1,
  },
  orderStatus: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    fontWeight: '500',
    overflow: 'hidden',
    textAlign: 'center',
  },
  orderStatusActive: {
    color: colors.primary,
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  orderStatusCompleted: {
    color: 'green',
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  orderStatusCancelled: {
    color: 'gray',
    borderWidth: 1,
    borderColor: '#E9EAEB',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: colors.lightGray,
  },
  navItem: {
    alignItems: 'center',
  },
  navIcon: {
    width: 24,
    height: 24,
  },
  navText: {
    fontFamily: typography.robotoRegular,
    fontSize: 12,
    color: colors.darkGray,
    marginTop: 4,
  },
  activeNavText: {
    color: colors.primary,
  },
  notFoundContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notFoundText: {
    fontFamily: typography.robotoRegular,
    fontSize: 18,
    color: colors.darkGray,
  },
  centeredLoaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReviewScreen;
