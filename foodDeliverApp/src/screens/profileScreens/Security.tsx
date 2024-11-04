import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { colors, globalStyles, typography } from '../../styles/globalStyles';
import Header from '../../components/common/Header';
import SwitchItem from '../../components/common/SwitchItem';

const SecurityScreen: React.FC = () => {
  const navigation = useNavigation() as any;

  // State management for the switches
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isTouchIDEnabled, setIsTouchIDEnabled] = useState(false);
  const [isPinSecurityEnabled, setIsPinSecurityEnabled] = useState(false);

  // Toggle functions for the switches
  const toggleSwitch = (setter: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    setter((previousValue) => !previousValue);
  };

  return (
    <View style={styles.container}>
      <Header title='Security' showMoreIcon />
      
      <SwitchItem
        title="Face ID"
        value={isFaceIDEnabled}
        onValueChange={toggleSwitch(setIsFaceIDEnabled)}
      />
      <SwitchItem
        title="Touch ID"
        value={isTouchIDEnabled}
        onValueChange={toggleSwitch(setIsTouchIDEnabled)}
      />
      <SwitchItem
        title="Pin Security"
        value={isPinSecurityEnabled}
        onValueChange={toggleSwitch(setIsPinSecurityEnabled)}
      />

      <View style={styles.footer}>
        <TouchableOpacity style={[styles.button, styles.button]} onPress={() => {}}>
          <Text style={[styles.buttonText]}>Change Pin</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingTop: 20,
    justifyContent: 'flex-start',
  },
  footer: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    padding: 20,
  
  },
  button: {
    ...globalStyles.buttonWithOutBg,
  },
  buttonText: {
    ...globalStyles.buttonTextWithOutBg,
  },
});

export default SecurityScreen;
