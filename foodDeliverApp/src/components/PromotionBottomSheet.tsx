import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import RBSheet from 'react-native-raw-bottom-sheet';

interface PromotionInfo {
  title: string;
  icon: any;
  description: string;
  duration: string;
  promoCode: string;
  applicableScope: string;
  discountAmount: string;
  termsAndConditions: string;
}

interface PromotionBottomSheetProps {
  rbSheetRef: React.RefObject<any>;
  promotionInfo: PromotionInfo | null;
  onClose: () => void;
}

const PromotionBottomSheet: React.FC<PromotionBottomSheetProps> = ({ rbSheetRef, promotionInfo, onClose }) => {
  if (!promotionInfo) return null;

  return (
    <RBSheet
      ref={rbSheetRef}
      //@ts-ignore
      closeOnDragDown={true}
      closeOnPressMask={true}
      customStyles={{
        wrapper: {
          backgroundColor: "rgb(203,202,201)",
        },
        container: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height:'90%'
        }
      }}
    >
      <View style={styles.bottomSheetContent}>
      <TouchableOpacity style={styles.indicator} onPress={onClose}>
            <Image source={require('../assets/images/Indicator.png')} style={styles.closeIcon} />
          </TouchableOpacity>
        <View style={styles.bottomSheetHeader}>
          <Text style={styles.bottomSheetTitle}>Promotion Information</Text>
        
        </View>

        <View style={styles.promotionIconContainer}>
          <Image source={promotionInfo.icon} style={styles.promotionIcon} />
        </View>

        <Text style={styles.promotionTitle}>{promotionInfo.title}</Text>

        <Text style={styles.infoLabel}>Description:</Text>
        <Text style={styles.infoText}>{promotionInfo.description}</Text>

        <Text style={styles.infoLabel}>Duration:</Text>
        <Text style={styles.infoText}>{promotionInfo.duration}</Text>

        <Text style={styles.infoLabel}>Promo Code:</Text>
        <Text style={styles.infoText}>{promotionInfo.promoCode}</Text>

        <Text style={styles.infoLabel}>Applicable Scope:</Text>
        <Text style={styles.infoText}>{promotionInfo.applicableScope}</Text>

        <Text style={styles.infoLabel}>Discount Amount:</Text>
        <Text style={styles.infoText}>{promotionInfo.discountAmount}</Text>

        <Text style={styles.infoLabel}>Terms and Conditions:</Text>
        <Text style={styles.infoText}>{promotionInfo.termsAndConditions}</Text>
      </View>
    </RBSheet>
  );
};

const styles = StyleSheet.create({
  bottomSheetContent: {
    padding: 20,
  },
  bottomSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  bottomSheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  closeIcon: {
    width: 62,
    height: 4,
  },
  promotionIconContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  promotionIcon: {
    width: 83,
    height: 66,
  },
  promotionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#666',
    marginTop: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 5,
  },
  indicator:{
    flexDirection:'row',
    justifyContent:'center',
    marginBottom:20
  }
});

export default PromotionBottomSheet;