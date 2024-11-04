import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { colors, textStyles } from '../styles/globalStyles';

interface OrderConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  orderNumber: string;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ visible, onClose, orderNumber }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Icon name="check-circle" size={60} color={colors.success} style={styles.icon} />
          <Text style={[styles.modalTitle, {color:colors.black}]}>Order Placed Successfully!</Text>
          {/* <Text style={[styles.modalText, {color:colors.black}]}>Your order number is:</Text> */}
          <Text style={[styles.orderNumber, {color:colors.black}]}>{orderNumber}</Text>
          <Text style={[styles.modalInfo, {color:colors.black}]}>You can track your order in the Orders section</Text>
          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text style={[styles.buttonText, {color:colors.white, }]}>OK</Text>
          </TouchableOpacity>
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
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  icon: {
    marginBottom: 15,
  },
  modalTitle: {
    ...textStyles.bold,
    fontSize: 20,
    marginBottom: 15,
    textAlign: 'center',
  },
  modalText: {
    ...textStyles.medium,
    marginBottom: 5,
    textAlign: 'center',
  },
  orderNumber: {
    ...textStyles.bold,
    fontSize: 24,
    color: colors.primary,
    marginBottom: 15,
  },
  modalInfo: {
    ...textStyles.regular,
    marginBottom: 20,
    textAlign: 'center',
    color: colors.gray,
  },
  button: {
    backgroundColor: colors.lightGreen,
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    minWidth: 100,
  },
  buttonText: {
    ...textStyles.bold,
    color: 'white',
    textAlign: 'center',
  },
});

export default OrderConfirmationModal;