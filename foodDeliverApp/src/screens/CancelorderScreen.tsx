import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Image, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Header from '../components/common/Header';
import { colors } from '../styles/globalStyles';

type CancelReason = {
  id: string;
  reason: string;
};

const Button: React.FC<{ title: string; onPress: () => void; style?: object; textStyle?: object }> = ({ title, onPress, style, textStyle }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
    <Text style={[styles.buttonText, textStyle]}>{title}</Text>
  </TouchableOpacity>
);

const ReasonItem: React.FC<{ reason: CancelReason; isSelected: boolean; onSelect: () => void }> = ({ reason, isSelected, onSelect }) => (
  <TouchableOpacity style={styles.reasonItem} onPress={onSelect}>
    <Text style={styles.reasonText}>{reason.reason}</Text>
    <View style={[styles.radioButton, isSelected && styles.radioButtonSelected]}>
      {isSelected && <View style={styles.radioButtonInner} />}
    </View>
  </TouchableOpacity>
);

const CancelOrderScreen: React.FC = () => {
  const [cancelReasons, setCancelReasons] = useState<CancelReason[]>([
    { id: '1', reason: 'Change of mind' },
    { id: '2', reason: 'Found better price elsewhere' },
    { id: '3', reason: 'Delivery delay' },
    { id: '4', reason: 'Incorrect item selected' },
    { id: '5', reason: 'Duplicate order' },
    { id: '6', reason: 'Unable to fulfill order' },
    { id: '7', reason: 'Other reasons' },
  ]);
  const [selectedReason, setSelectedReason] = useState<string>('');
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleCancel = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    navigation.goBack(); 
  };

  return (
    <View style={styles.container}>
      <Header title='Cancel Order' />
      
      <ScrollView style={styles.content}>
        {cancelReasons.map((reason) => (
          <ReasonItem 
            key={reason.id}
            reason={reason}
            isSelected={selectedReason === reason.id}
            onSelect={() => setSelectedReason(reason.id)}
          />
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Button
          title="Submit"
          onPress={handleCancel}
          style={styles.submitButton}
          textStyle={styles.submitButtonText}
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
            <Text style={styles.modalTitle}>Your Order Canceled</Text>
            <Image
              source={require('../assets/images/BigHeart.png')} // Make sure to add this image to your assets
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>We're sorry to see your order go. 😔</Text>
            <Text style={styles.modalSubText}>
              We're always striving to improve, and we hope to serve you better next time!
            </Text>
            <TouchableOpacity style={styles.okButton} onPress={closeModal}>
              <Text style={styles.okButtonText}>Ok</Text>
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
    backgroundColor: '#FFFFFF',
    paddingTop: 40,
  },
  content: {
    flex: 1,
    padding: 20,
  },
  reasonItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,       
    marginBottom: 10,
    borderWidth: 1,        
    borderColor: '#E9EAEB',  
  },
  reasonText: {
    fontSize: 16,
    color: '#000000',
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#CCCCCC',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonSelected: {
    borderColor: '#FF7F50',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#FF7F50',
  },
  footer: {
    padding: 20,
  },
  button: {
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  submitButton: {
    backgroundColor: '#FF7F50',
  },
  submitButtonText: {
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    width: '80%',
  },
  closeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  closeButtonText: {
    fontSize: 24,
    color: '#999999',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
color: colors.black,
  },
  modalImage: {
    width: 100,
    height: 100,
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: colors.black,
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
    paddingVertical: 10,
    borderRadius: 25,
    width: '100%',
  },
  okButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default CancelOrderScreen;