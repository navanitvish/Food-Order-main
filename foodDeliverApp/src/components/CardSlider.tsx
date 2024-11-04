import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  ScrollView,
  NativeSyntheticEvent,
  NativeScrollEvent,
  Animated,
  Text,
} from 'react-native';
import { colors } from '../styles/globalStyles';
import { foodService } from '../api/services/foodService';

// Constants
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH;
const CARD_HEIGHT = 190;
const CARD_PADDING = 16;
const AUTO_SLIDE_INTERVAL = 3000;

// Types
interface Banner {
  _id: string;
  name: string;
  description: string;
  image: string;
}

const CardSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const scrollViewRef = useRef<ScrollView>(null);
  const autoSlideTimer = useRef<NodeJS.Timeout | null>(null);

  // Scroll handling
  const handleScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    setActiveIndex(roundIndex);
  }, []);

  // Auto-slide functionality
  const scrollToIndex = useCallback((index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * CARD_WIDTH,
      animated: true,
    });
  }, []);

  const startAutoSlide = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
    autoSlideTimer.current = setInterval(() => {
      const nextIndex = (activeIndex + 1) % banners.length;
      scrollToIndex(nextIndex);
    }, AUTO_SLIDE_INTERVAL);
  }, [activeIndex, banners.length, scrollToIndex]);

  const stopAutoSlide = useCallback(() => {
    if (autoSlideTimer.current) {
      clearInterval(autoSlideTimer.current);
    }
  }, []);

  // Auto-slide effect
  useEffect(() => {
    startAutoSlide();
    return stopAutoSlide;
  }, [activeIndex, banners, startAutoSlide, stopAutoSlide]);

  // Fetch banners
  useEffect(() => {
    const fetchAllBanners = async () => {
      try {
        const response = await foodService.getAllBanners();
        if (response.data) {
          const data = response.data.map((d: any) => ({
            _id: d._id,
            name: d.name,
            description: d.description,
            image: d.image,
          }));
          setBanners(data.reverse());
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAllBanners();
  }, []);

  // Skeleton loader component
  const SkeletonCard = () => {
    const animatedValue = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      const startAnimation = () => {
        Animated.sequence([
          Animated.timing(animatedValue, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true,
          }),
          Animated.timing(animatedValue, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
          }),
        ]).start(() => startAnimation());
      };

      startAnimation();
      return () => animatedValue.resetAnimation();
    }, []);

    const opacity = animatedValue.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 0.7],
    });

    return (
      <View style={styles.cardContainer}>
        <Animated.View style={[styles.card, { backgroundColor: colors.lightGray, opacity }]}>
          <View style={styles.skeletonNameContainer} />
          <View style={styles.skeletonDescriptionContainer} />
        </Animated.View>
      </View>
    );
  };

  // Banner card component
  const renderBanner = useCallback(({ _id, image, description, name }: Banner) => (
    <View key={_id} style={styles.cardContainer}>
      <View style={styles.card}>
        <Image source={{ uri: image }} style={styles.cardImage} />
        <View style={styles.adTextContainer}>
          <Text style={styles.adText}>{description}</Text>
        </View>
        <View style={styles.adTextContainerName}>
          <Text style={styles.adText}>{name}</Text>
        </View>
      </View>
    </View>
  ), []);

  // Loading state
  if (isLoading) {
    return (
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
      >
        {[1, 2, 3].map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </ScrollView>
    );
  }

  // Main render
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16}
        onTouchStart={stopAutoSlide}
        onTouchEnd={startAutoSlide}
        decelerationRate="fast"
        snapToInterval={CARD_WIDTH}
        snapToAlignment="center"
      >
        {banners.length > 0 ? (
          banners.map(renderBanner)
        ) : (
          <View style={styles.cardContainer}>
            <View style={styles.card}>
              <Image
                source={require('../assets/images/Banner.png')}
                style={styles.cardImage}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    marginBottom: 16,
  },
  cardContainer: {
    width: CARD_WIDTH,
    paddingHorizontal: CARD_PADDING,
  },
  card: {
    width: CARD_WIDTH - CARD_PADDING * 2,
    height: CARD_HEIGHT,
    borderRadius: 20,
    overflow: 'hidden',
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  adTextContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  adText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  adTextContainerName: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  skeletonNameContainer: {
    position: 'absolute',
    top: '10%',
    left: '10%',
    width: '30%',
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
  },
  skeletonDescriptionContainer: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    width: '50%',
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 5,
  },
});

export default CardSlider;