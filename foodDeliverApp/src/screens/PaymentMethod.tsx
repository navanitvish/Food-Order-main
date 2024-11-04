import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { colors, typography, globalStyles } from '../styles/globalStyles';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
import { useDispatch , useSelector} from 'react-redux';
import { RootState } from '../redux/store';
import { setSelectedPaymentMethod } from '../redux/slices/paymentMethodSlice';

type PaymentMethod = {
  id: string;
  name: string;
  method:string;
  icon: any;
};

const Button: React.FC<{ title: string; onPress: () => void; style?: object; textStyle?: object; disabled?: boolean }> = ({ title, onPress, style, textStyle, disabled }) => (
  <TouchableOpacity style={[styles.button, style, disabled && styles.disabledButton]} onPress={onPress} disabled={disabled}>
    <Text style={[styles.buttonText, textStyle, disabled && styles.disabledButtonText]}>{title}</Text>
  </TouchableOpacity>
);

const PaymentItem: React.FC<{ method: PaymentMethod; isSelected: boolean; onSelect: () => void }> = ({ method, isSelected, onSelect }) => (
  <TouchableOpacity style={styles.paymentItem} onPress={onSelect}>
    <View style={styles.paymentCardContainer}>
      <Image source={method.icon} style={styles.paymentIcon} />
      <Text style={styles.methodName}>{method.name}</Text>
    </View>
    <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
);

const PaymentMethods: React.FC = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  
  // Redux selectors
  const { paymentMethods, selectedMethodId } = useSelector((state: RootState) => state.paymentMethods);
  const selectedFood = useSelector((state: RootState) => state.selectedFood.food);
  const selectedLocation = useSelector((state: RootState) => {
    const { locations, selectedLocationId } = state.locations;
    return locations.find(location => location.id === selectedLocationId);
  });
  const selectedOffer = useSelector((state: RootState) => state.coupon.selectedOffer);
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const cartTotals = useSelector((state: RootState) => ({
    subtotal: state.cart.subtotal,
    deliveryFee: state.cart.deliveryFee,
    discount: state.cart.discount,
    totalPrice: state.cart.totalPrice,
  }));

  const [modalVisible, setModalVisible] = useState(false);

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack();
  };

  const handleAddNewCard = () => {
    console.log('Add new card');
  };



  const handleApply = () => {
    if (selectedMethodId) {
      // Here you can call your API with all the selected values
      console.log('Selected Payment Method:', paymentMethods.find(method => method.id === selectedMethodId));
      console.log('Selected Food:', selectedFood);
      console.log('Selected Location:', selectedLocation);
      console.log('Selected Offer:', selectedOffer);
      console.log('Cart Items:', cartItems);
      console.log('Cart Totals:', cartTotals);
      
      // After API call, show the modal
      // setModalVisible(true);
      navigation.goBack()
    }
  };



  return (
    <View style={styles.container}>
    <Header title='Payment Methods' />
    
    <ScrollView style={styles.content}>
      {paymentMethods.map((method) => (
        <PaymentItem 
          key={method.id}
          method={method}
          isSelected={selectedMethodId === method.id}
          onSelect={() => dispatch(setSelectedPaymentMethod(method.id))}
        />
      ))}
      <TouchableOpacity style={styles.addNewCardButton} onPress={handleAddNewCard}>
        <Image source={require('../assets/images/plus.png')} style={styles.plusIcon} />
        <Text style={styles.addNewCardText}>Add New Card</Text>
      </TouchableOpacity>
    </ScrollView>

    <View style={styles.footer}>
      <Button
        title="Apply"
        onPress={handleApply}
        style={[styles.applyButton, !selectedMethodId && styles.disabledButton]}
        textStyle={[styles.applyButtonText, !selectedMethodId && styles.disabledButtonText]}
        // disabled={!selectedMethodId}
      />
    </View>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Payment Successful</Text>
            <Image
              source={require('../assets/images/celebrate.png')} // Make sure to add this image to your assets
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>Thank you for your order!</Text>
            <Text style={styles.modalSubText}>
            Your payment has been successfully processed.
            </Text>
            <TouchableOpacity style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okButtonText}>Ok, Great</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: colors.white,
    borderRadius: 8,       
    marginBottom: 10,
    borderWidth: 1,        
    borderColor: '#E9EAEB',  
  },
  methodName: {
    fontFamily: typography.robotoRegular,
    fontSize: 16,
    color: colors.black,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: colors.lightGray,
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
    padding: 20,
  },
  button: {
    ...globalStyles.button,
    marginTop: 10,
  },
  buttonText: {
    ...globalStyles.buttonText,
  },
  applyButton: {
    backgroundColor: colors.primary500,
  },
  applyButtonText: {
    color: colors.white,
  },
  disabledButton: {
    backgroundColor: '#FFCFC6',
  },
  disabledButtonText: {
    color: '#ffff',
  },
  addNewCardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 18,
    backgroundColor: '#d0e6a5',
    borderRadius: 8,
    marginTop: 12,
    marginBottom: 20,
  },
  plusIcon: {
    width: 24,
    height: 24,
    marginRight: 8,
  },
  addNewCardText: {
    color: '#3e4532',
    fontWeight: 'bold',
  },
  paymentCardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  paymentIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'gray',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    width: '80%',
    maxWidth: 330,
  },
  closeButton: {
    position: 'absolute',
    right: 15,
    top: 15,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#999999',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 15,
    color: '#000000',
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
    fontWeight: '600',
    color: '#000000',
  },
  modalSubText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666666',
    marginBottom: 20,
  },
  okButton: {
    backgroundColor: '#FF7F50',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 30,
    width: '100%',
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PaymentMethods;