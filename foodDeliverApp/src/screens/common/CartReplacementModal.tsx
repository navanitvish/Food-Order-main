import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { cancelReplaceCart, replaceCart } from '../../redux/slices/cartSlice';
import { colors, textStyles } from '../../styles/globalStyles';

const CartReplacementModal: React.FC = () => {
  const dispatch = useDispatch();
  const showPopup = useSelector((state: RootState) => state.cart.showReplaceCartPopup);
  const newItem = useSelector((state: RootState) => state.cart.itemToAdd);
  const currentRestaurant = useSelector((state: RootState) => state.cart.restaurant);

  if (!showPopup || !newItem || !currentRestaurant) return null;

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={showPopup}
      onRequestClose={() => dispatch(cancelReplaceCart())}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={[textStyles.semiBold, styles.modalTitle]}>
            Replace Cart Items?
          </Text>
          <Text style={[textStyles.regular, styles.modalText]}>
            {`You're trying to add an item from ${newItem.restaurantId.name}. This will replace your current items from ${currentRestaurant.name}. Do you want to proceed?`}
          </Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={[styles.button, styles.cancelButton]}
              onPress={() => dispatch(cancelReplaceCart())}
            >
              <Text style={[textStyles.medium, styles.cancelButtonText]}>
                Cancel
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.replaceButton]}
              onPress={() => dispatch(replaceCart())}
            >
              <Text style={[textStyles.medium, styles.replaceButtonText]}>
                Replace Cart
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    color: colors.black,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 20,
    textAlign: 'center',
    color: colors.darkGray,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
    minWidth: '40%',
  },
  cancelButton: {
    backgroundColor: colors.lightGray,
  },
  replaceButton: {
    backgroundColor: colors.lightGreen,
  },
  cancelButtonText: {
    color: colors.black,
    textAlign: 'center',
  },
  replaceButtonText: {
    color: colors.white,
    textAlign: 'center',
  },
});

export default CartReplacementModal;