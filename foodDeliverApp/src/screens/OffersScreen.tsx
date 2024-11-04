import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Image,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { setAppliedCoupon } from '../redux/slices/cartSlice';

interface Coupon {
  _id: string;
  couponcode: string;
  percent: number;
  description: string;
  minOrderAmount: number;
  maxDiscountAmount: number;
  expiryDate: string;
  image: string;
}

const OffersScreen: React.FC = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [appliedCoupon, setApplied] = useState<Coupon | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [couponInput, setCouponInput] = useState('');
  const [invalidMessage, setInvalidMessage] = useState('');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const route = useRoute() as any;
  const { coupon } = route.params || {};

  useEffect(() => {
    setCoupons(coupon || []);
  }, []);

  const handleApplyCoupon = (coupon: any) => {
    setApplied(coupon);
    dispatch(setAppliedCoupon(coupon));
    setShowModal(true);
  };

  const showInvalidMessage = (message: string) => {
    setInvalidMessage(message);
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleCustomCouponApply = () => {
    const foundCoupon = coupons.find(coupon => coupon.couponcode === couponInput.toUpperCase());
    if (foundCoupon) {
      handleApplyCoupon(foundCoupon);
    } else {
      showInvalidMessage('Invalid Coupon: The entered coupon code is not valid.');
    }
  };

  const EmptyState = () => (
    <View style={styles.emptyStateContainer}>
      <Icon name="local-offer" size={80} color={colors.lightGray} />
      <Text style={styles.emptyStateTitle}>No Coupons Available</Text>
      <Text style={styles.emptyStateDescription}>
        Sorry, there are no active coupons at the moment. Please check back later!
      </Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.topHeader}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Icon name="arrow-back" size={24} color={colors.black} />
              <Text style={styles.headerTitle}>COUPONS & OFFERS</Text>
            </View>
          </TouchableOpacity>
        </View>

        <View style={styles.couponInputContainer}>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.couponInput}
              placeholder="COUPON"
              value={couponInput}
              onChangeText={setCouponInput}
              placeholderTextColor={colors.lightGray}
            />
            <TouchableOpacity style={styles.applyButton} onPress={handleCustomCouponApply}>
              <Text style={styles.applyButtonText}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.scrollView} contentContainerStyle={coupons.length === 0 && styles.scrollViewEmpty}>
          {coupons.length > 0 ? (
            coupons.map((coupon) => (
              <TouchableOpacity
                key={coupon._id}
                style={styles.couponCard}
                onPress={() => handleApplyCoupon(coupon)}
              >
                <View style={styles.couponIconContainer}>
                  <Icon name="card-giftcard" size={24} color={colors.black} />
                </View>
                <View style={styles.couponInfo}>
                  <Text style={styles.couponCode}>{coupon.couponcode}</Text>
                  <Text style={styles.couponPercent}>{coupon.percent}% Off</Text>
                </View>
                <Text style={styles.applyCouponText}>Apply</Text>
              </TouchableOpacity>
            ))
          ) : (
            <EmptyState />
          )}
        </ScrollView>

        <Modal
          animationType="fade"
          transparent={true}
          visible={showModal}
          onRequestClose={() => setShowModal(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image source={{ uri: appliedCoupon?.image }} style={styles.modalImage} />
              <View style={styles.modalTextContainer}>
                <Text style={styles.modalTitle}>
                  {appliedCoupon?.couponcode} Coupon Applied
                </Text>
                <Text style={styles.modalSavings}>You saved ₹{appliedCoupon?.maxDiscountAmount}</Text>
              </View>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => {
                  setShowModal(false);
                  setTimeout(() => {
                    navigation.goBack();
                  }, 1000);
                }}
              >
                <Text style={styles.modalButtonText}>AWESOME</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
      <Animated.View style={[styles.invalidMessage, { opacity: fadeAnim }]}>
        <Text style={styles.invalidMessageText}>{invalidMessage}</Text>
      </Animated.View>
    </SafeAreaView>
  );
};

const colors = {
  primary: '#006B54',
  secondary: '#4A90E2',
  white: '#FFFFFF',
  black: '#000000',
  gray: 'rgb(209, 215, 219)',
  inputBg: '#F2F2F7',
  lightGray: '#E5E5EA',
  darkGray: '#3A3A3C',
  transparent: 'transparent',
  bgGray: '#f3f4f9',
  lightGreen: '#62b349',
  cardBackground: '#FFFFFF',
  cardBorder: '#E0E0E0',
};

const styles = StyleSheet.create({




  safeArea: {
    flex: 1,
    backgroundColor: colors.white,
  },
  container: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.black,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewEmpty: {
    flex: 1,
    justifyContent: 'center',
  },
  couponInputContainer: {
    padding: 16,
    backgroundColor: colors.white,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.lightGray,
    borderRadius: 4,
  },
  couponInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    color:colors.black
  },
  applyButton: {
    backgroundColor: colors.lightGreen,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    height: 40,
    borderTopRightRadius: 4,
    borderBottomRightRadius: 4,
  },
  applyButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  // New styles for empty state
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.darkGray,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyStateDescription: {
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 60,
  },
  couponCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cardBackground,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.cardBorder,
  },
  couponIconContainer: {
    marginRight: 12,
  },
  couponInfo: {
    flex: 1,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  couponPercent: {
    fontSize: 14,
    color: colors.darkGray,
  },
  applyCouponText: {
    color: 'red',
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  modalImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 16,
  },
  modalTextContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.black,
    marginBottom: 10,
    textAlign: 'center',
  },
  modalSavings: {
    fontSize: 16,
    color: colors.primary,
  },
  modalButton: {
    backgroundColor: colors.lightGreen,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  modalButtonText: {
    color: colors.white,
    fontWeight: '600',
  },
  invalidMessage: {
    position: 'absolute',
    bottom: 70,
    left: 0,
    right: 0,
    backgroundColor: '#FF6347',
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  invalidMessageText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});

export default OffersScreen;