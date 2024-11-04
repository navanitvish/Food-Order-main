import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';
import { colors, typography } from '../../styles/globalStyles';


interface SwitchItemProps {
  title: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  trackColor?: { false: string; true: string };
  thumbColor?: string;
}

const SwitchItem: React.FC<SwitchItemProps> = ({
  title,
  value,
  onValueChange,
  trackColor = { false: colors.lightGray, true: colors.primary },
  thumbColor = colors.white,
}) => {
  return (
    <View style={styles.menuItem}>
      <Text style={styles.menuItemText}>{title}</Text>
      <Switch
        trackColor={trackColor}
        thumbColor={thumbColor}
        onValueChange={onValueChange}
        value={value}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    paddingHorizontal: 20,
  },
  menuItemText: {
    fontFamily: typography.regular,
    fontSize: 16,
    color: colors.black,
  },
});

export default SwitchItem;