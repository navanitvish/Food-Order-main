// components/SessionExpirationModal.tsx
import React from 'react';
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useSession } from '../../context/sessionContext';
import { colors, globalStyles, typography } from '../../styles/globalStyles';


interface SessionExpirationModalProps {
  visible: boolean;
}

const SessionExpirationModal: React.FC<SessionExpirationModalProps> = ({
  visible,
}) => {
  const { handleLogout } = useSession();

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
      onRequestClose={() => {}}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.iconContainer}>
            <Icon name="time-outline" size={50} color={colors.primary} />
          </View>
          
          <Text style={styles.title}>Session Expired</Text>
          <Text style={styles.message}>
            Your session has expired after 24 hours. Please log in again to continue using the app.
          </Text>
          
          <TouchableOpacity
            style={[globalStyles.button, styles.button]}
            onPress={handleLogout}
          >
            <Text style={globalStyles.buttonText}>Login Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 24,
    width: width * 0.85,
    alignItems: 'center',
  },
  iconContainer: {
    marginBottom: 16,
  },
  title: {
    fontFamily: typography.primary,
    fontSize: 24,
    fontWeight: '600',
    color: colors.black,
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontFamily: typography.primary,
    fontSize: 16,
    color: colors.darkGray,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  button: {
    width: '100%',
    marginTop: 8,
  },
});

export default SessionExpirationModal;